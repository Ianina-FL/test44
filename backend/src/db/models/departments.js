const config = require('../../config');
const providers = config.providers;
const crypto = require('crypto');
const bcrypt = require('bcrypt');
const moment = require('moment');

module.exports = function (sequelize, DataTypes) {
  const departments = sequelize.define(
    'departments',
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
      },

      name: {
        type: DataTypes.TEXT,
      },

      importHash: {
        type: DataTypes.STRING(255),
        allowNull: true,
        unique: true,
      },
    },
    {
      timestamps: true,
      paranoid: true,
      freezeTableName: true,
    },
  );

  departments.associate = (db) => {
    db.departments.belongsToMany(db.users, {
      as: 'members',
      foreignKey: {
        name: 'departments_membersId',
      },
      constraints: false,
      through: 'departmentsMembersUsers',
    });

    db.departments.belongsToMany(db.users, {
      as: 'members_filter',
      foreignKey: {
        name: 'departments_membersId',
      },
      constraints: false,
      through: 'departmentsMembersUsers',
    });

    /// loop through entities and it's fields, and if ref === current e[name] and create relation has many on parent entity

    //end loop

    db.departments.belongsTo(db.organizations, {
      as: 'organizations',
      foreignKey: {
        name: 'organizationsId',
      },
      constraints: false,
    });

    db.departments.belongsTo(db.users, {
      as: 'createdBy',
    });

    db.departments.belongsTo(db.users, {
      as: 'updatedBy',
    });
  };

  return departments;
};
