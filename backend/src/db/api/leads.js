const db = require('../models');
const FileDBApi = require('./file');
const crypto = require('crypto');
const Utils = require('../utils');

const Sequelize = db.Sequelize;
const Op = Sequelize.Op;

module.exports = class LeadsDBApi {
  static async create(data, options) {
    const currentUser = (options && options.currentUser) || { id: null };
    const transaction = (options && options.transaction) || undefined;

    const leads = await db.leads.create(
      {
        id: data.id || undefined,

        name: data.name || null,
        status: data.status || null,
        category: data.category || null,
        importHash: data.importHash || null,
        createdById: currentUser.id,
        updatedById: currentUser.id,
      },
      { transaction },
    );

    await leads.setOwner(data.owner || null, {
      transaction,
    });

    await leads.setOrganizations(data.organizations || null, {
      transaction,
    });

    await leads.setContacts(data.contacts || [], {
      transaction,
    });

    return leads;
  }

  static async bulkImport(data, options) {
    const currentUser = (options && options.currentUser) || { id: null };
    const transaction = (options && options.transaction) || undefined;

    // Prepare data - wrapping individual data transformations in a map() method
    const leadsData = data.map((item, index) => ({
      id: item.id || undefined,

      name: item.name || null,
      status: item.status || null,
      category: item.category || null,
      importHash: item.importHash || null,
      createdById: currentUser.id,
      updatedById: currentUser.id,
      createdAt: new Date(Date.now() + index * 1000),
    }));

    // Bulk create items
    const leads = await db.leads.bulkCreate(leadsData, { transaction });

    // For each item created, replace relation files

    return leads;
  }

  static async update(id, data, options) {
    const currentUser = (options && options.currentUser) || { id: null };
    const transaction = (options && options.transaction) || undefined;
    const globalAccess = currentUser.app_role?.globalAccess;

    const leads = await db.leads.findByPk(id, {}, { transaction });

    const updatePayload = {};

    if (data.name !== undefined) updatePayload.name = data.name;

    if (data.status !== undefined) updatePayload.status = data.status;

    if (data.category !== undefined) updatePayload.category = data.category;

    updatePayload.updatedById = currentUser.id;

    await leads.update(updatePayload, { transaction });

    if (data.owner !== undefined) {
      await leads.setOwner(
        data.owner,

        { transaction },
      );
    }

    if (data.organizations !== undefined) {
      await leads.setOrganizations(
        data.organizations,

        { transaction },
      );
    }

    if (data.contacts !== undefined) {
      await leads.setContacts(data.contacts, { transaction });
    }

    return leads;
  }

  static async deleteByIds(ids, options) {
    const currentUser = (options && options.currentUser) || { id: null };
    const transaction = (options && options.transaction) || undefined;

    const leads = await db.leads.findAll({
      where: {
        id: {
          [Op.in]: ids,
        },
      },
      transaction,
    });

    await db.sequelize.transaction(async (transaction) => {
      for (const record of leads) {
        await record.update({ deletedBy: currentUser.id }, { transaction });
      }
      for (const record of leads) {
        await record.destroy({ transaction });
      }
    });

    return leads;
  }

  static async remove(id, options) {
    const currentUser = (options && options.currentUser) || { id: null };
    const transaction = (options && options.transaction) || undefined;

    const leads = await db.leads.findByPk(id, options);

    await leads.update(
      {
        deletedBy: currentUser.id,
      },
      {
        transaction,
      },
    );

    await leads.destroy({
      transaction,
    });

    return leads;
  }

  static async findBy(where, options) {
    const transaction = (options && options.transaction) || undefined;

    const leads = await db.leads.findOne({ where }, { transaction });

    if (!leads) {
      return leads;
    }

    const output = leads.get({ plain: true });

    output.activities_related_lead = await leads.getActivities_related_lead({
      transaction,
    });

    output.contacts_lead = await leads.getContacts_lead({
      transaction,
    });

    output.notes_related_lead = await leads.getNotes_related_lead({
      transaction,
    });

    output.owner = await leads.getOwner({
      transaction,
    });

    output.contacts = await leads.getContacts({
      transaction,
    });

    output.organizations = await leads.getOrganizations({
      transaction,
    });

    return output;
  }

  static async findAll(filter, globalAccess, options) {
    const limit = filter.limit || 0;
    let offset = 0;
    let where = {};
    const currentPage = +filter.page;

    const user = (options && options.currentUser) || null;
    const userOrganizations = (user && user.organizations?.id) || null;

    if (userOrganizations) {
      if (options?.currentUser?.organizationsId) {
        where.organizationsId = options.currentUser.organizationsId;
      }
    }

    offset = currentPage * limit;

    const orderBy = null;

    const transaction = (options && options.transaction) || undefined;

    let include = [
      {
        model: db.users,
        as: 'owner',

        where: filter.owner
          ? {
              [Op.or]: [
                {
                  id: {
                    [Op.in]: filter.owner
                      .split('|')
                      .map((term) => Utils.uuid(term)),
                  },
                },
                {
                  firstName: {
                    [Op.or]: filter.owner
                      .split('|')
                      .map((term) => ({ [Op.iLike]: `%${term}%` })),
                  },
                },
              ],
            }
          : {},
      },

      {
        model: db.organizations,
        as: 'organizations',
      },

      {
        model: db.contacts,
        as: 'contacts',
        required: false,
      },
    ];

    if (filter) {
      if (filter.id) {
        where = {
          ...where,
          ['id']: Utils.uuid(filter.id),
        };
      }

      if (filter.name) {
        where = {
          ...where,
          [Op.and]: Utils.ilike('leads', 'name', filter.name),
        };
      }

      if (filter.active !== undefined) {
        where = {
          ...where,
          active: filter.active === true || filter.active === 'true',
        };
      }

      if (filter.status) {
        where = {
          ...where,
          status: filter.status,
        };
      }

      if (filter.category) {
        where = {
          ...where,
          category: filter.category,
        };
      }

      if (filter.organizations) {
        const listItems = filter.organizations.split('|').map((item) => {
          return Utils.uuid(item);
        });

        where = {
          ...where,
          organizationsId: { [Op.or]: listItems },
        };
      }

      if (filter.contacts) {
        const searchTerms = filter.contacts.split('|');

        include = [
          {
            model: db.contacts,
            as: 'contacts_filter',
            required: searchTerms.length > 0,
            where:
              searchTerms.length > 0
                ? {
                    [Op.or]: [
                      {
                        id: {
                          [Op.in]: searchTerms.map((term) => Utils.uuid(term)),
                        },
                      },
                      {
                        first_name: {
                          [Op.or]: searchTerms.map((term) => ({
                            [Op.iLike]: `%${term}%`,
                          })),
                        },
                      },
                    ],
                  }
                : undefined,
          },
          ...include,
        ];
      }

      if (filter.createdAtRange) {
        const [start, end] = filter.createdAtRange;

        if (start !== undefined && start !== null && start !== '') {
          where = {
            ...where,
            ['createdAt']: {
              ...where.createdAt,
              [Op.gte]: start,
            },
          };
        }

        if (end !== undefined && end !== null && end !== '') {
          where = {
            ...where,
            ['createdAt']: {
              ...where.createdAt,
              [Op.lte]: end,
            },
          };
        }
      }
    }

    if (globalAccess) {
      delete where.organizationsId;
    }

    const queryOptions = {
      where,
      include,
      distinct: true,
      order:
        filter.field && filter.sort
          ? [[filter.field, filter.sort]]
          : [['createdAt', 'desc']],
      transaction: options?.transaction,
      logging: console.log,
    };

    if (!options?.countOnly) {
      queryOptions.limit = limit ? Number(limit) : undefined;
      queryOptions.offset = offset ? Number(offset) : undefined;
    }

    try {
      const { rows, count } = await db.leads.findAndCountAll(queryOptions);

      return {
        rows: options?.countOnly ? [] : rows,
        count: count,
      };
    } catch (error) {
      console.error('Error executing query:', error);
      throw error;
    }
  }

  static async findAllAutocomplete(
    query,
    limit,
    offset,
    globalAccess,
    organizationId,
  ) {
    let where = {};

    if (!globalAccess && organizationId) {
      where.organizationId = organizationId;
    }

    if (query) {
      where = {
        [Op.or]: [
          { ['id']: Utils.uuid(query) },
          Utils.ilike('leads', 'name', query),
        ],
      };
    }

    const records = await db.leads.findAll({
      attributes: ['id', 'name'],
      where,
      limit: limit ? Number(limit) : undefined,
      offset: offset ? Number(offset) : undefined,
      orderBy: [['name', 'ASC']],
    });

    return records.map((record) => ({
      id: record.id,
      label: record.name,
    }));
  }
};
