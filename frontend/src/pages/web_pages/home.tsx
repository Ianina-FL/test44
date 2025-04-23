import React, { useEffect, useState } from 'react';
import type { ReactElement } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import { useAppSelector } from '../../stores/hooks';
import LayoutGuest from '../../layouts/Guest';
import WebSiteHeader from '../../components/WebPageComponents/Header';
import WebSiteFooter from '../../components/WebPageComponents/Footer';
import {
  HeroDesigns,
  FeaturesDesigns,
  AboutUsDesigns,
  TestimonialsDesigns,
  ContactFormDesigns,
} from '../../components/WebPageComponents/designs';

import HeroSection from '../../components/WebPageComponents/HeroComponent';

import FeaturesSection from '../../components/WebPageComponents/FeaturesComponent';

import AboutUsSection from '../../components/WebPageComponents/AboutUsComponent';

import TestimonialsSection from '../../components/WebPageComponents/TestimonialsComponent';

import ContactFormSection from '../../components/WebPageComponents/ContactFormComponent';

export default function WebSite() {
  const cardsStyle = useAppSelector((state) => state.style.cardsStyle);
  const bgColor = useAppSelector((state) => state.style.bgLayoutColor);
  const projectName = 'test44';

  useEffect(() => {
    const darkElement = document.querySelector('body .dark');
    if (darkElement) {
      darkElement.classList.remove('dark');
    }
  }, []);
  const pages = [
    {
      href: '/home',
      label: 'home',
    },

    {
      href: '/about',
      label: 'about',
    },

    {
      href: '/services',
      label: 'services',
    },

    {
      href: '/contact',
      label: 'contact',
    },

    {
      href: '/faq',
      label: 'FAQ',
    },
  ];

  const features_points = [
    {
      name: 'Unified Dashboard',
      description:
        "Access all your department's data in one place. Stay informed with real-time updates and insights to make informed decisions quickly.",
      icon: 'mdiViewDashboard',
    },
    {
      name: 'Lead Tracking',
      description:
        'Efficiently manage and track leads from initial contact to conversion. Categorize and assign leads to ensure no opportunity is missed.',
      icon: 'mdiAccountSearch',
    },
    {
      name: 'Collaborative Notes',
      description:
        'Enable seamless communication across departments with shared notes. Keep everyone on the same page and improve team collaboration.',
      icon: 'mdiNoteMultipleOutline',
    },
    {
      name: 'Activity Metrics',
      description:
        'Monitor and analyze team performance with detailed activity metrics. Identify areas for improvement and celebrate successes.',
      icon: 'mdiChartLine',
    },
    {
      name: 'Contact Management',
      description:
        'Organize and manage client contacts effortlessly. Ensure all client information is up-to-date and easily accessible.',
      icon: 'mdiAccountBox',
    },
    {
      name: 'Role-Based Access',
      description:
        'Secure your data with role-based access controls. Ensure that team members have the appropriate permissions for their roles.',
      icon: 'mdiLockOutline',
    },
  ];

  const testimonials = [
    {
      text: '${projectName} has revolutionized our workflow. The seamless integration between departments has saved us countless hours and improved our client interactions.',
      company: 'Legal Innovators Inc.',
      user_name: 'John Doe, Managing Partner',
    },
    {
      text: "The lead tracking feature is a game-changer. We've seen a significant increase in conversions since implementing ${projectName}.",
      company: 'Justice Solutions LLC',
      user_name: 'Jane Smith, Head of Sales',
    },
    {
      text: 'Our team collaboration has never been better. ${projectName} keeps everyone on the same page, making us more efficient and effective.',
      company: 'LawTech Partners',
      user_name: 'Emily Johnson, Senior Paralegal',
    },
    {
      text: 'The user-friendly interface and robust features of ${projectName} have made it an indispensable tool for our firm.',
      company: 'Advocate Alliance',
      user_name: 'Michael Brown, IT Director',
    },
    {
      text: "With ${projectName}, we can easily manage client information and track our progress. It's a must-have for any modern law firm.",
      company: 'Counsel Connect',
      user_name: 'Sarah Williams, Client Relations Manager',
    },
    {
      text: 'The role-based access controls give us peace of mind knowing our data is secure. ${projectName} is a reliable partner in our success.',
      company: 'Legal Pioneers',
      user_name: 'David Lee, Security Officer',
    },
  ];

  return (
    <div className='flex flex-col min-h-screen'>
      <Head>
        <title>{`Comprehensive CRM for the Law Industry`}</title>
        <meta
          name='description'
          content={`Discover our CRM solution tailored for the law industry, connecting departments and streamlining operations for sales, customer service, and marketing teams.`}
        />
      </Head>
      <WebSiteHeader projectName={'test44'} pages={pages} />
      <main className={`flex-grow    bg-white  rounded-none  `}>
        <HeroSection
          projectName={'test44'}
          image={['Law professionals collaborating efficiently']}
          mainText={`Revolutionize Your Law Firm Operations`}
          subTitle={`Experience seamless integration with ${projectName}, the CRM designed to connect sales, customer service, and marketing in the legal industry. Streamline your workflow and enhance productivity.`}
          design={HeroDesigns.IMAGE_RIGHT || ''}
          buttonText={`Get Started Now`}
        />

        <FeaturesSection
          projectName={'test44'}
          image={['Dashboard showcasing CRM features']}
          withBg={1}
          features={features_points}
          mainText={`Discover Key Features of ${projectName}`}
          subTitle={`Unlock the full potential of your law firm with ${projectName}'s powerful features designed to streamline operations and enhance collaboration.`}
          design={FeaturesDesigns.CARDS_GRID_WITH_ICONS || ''}
        />

        <AboutUsSection
          projectName={'test44'}
          image={['Team collaborating in modern office']}
          mainText={`Empowering Law Firms with ${projectName}`}
          subTitle={`At ${projectName}, we are dedicated to transforming the way law firms operate. Our CRM solution is designed to connect departments, streamline processes, and enhance productivity, ensuring your firm stays ahead in the competitive legal landscape.`}
          design={AboutUsDesigns.IMAGE_LEFT || ''}
          buttonText={`Learn More About Us`}
        />

        <TestimonialsSection
          projectName={'test44'}
          design={TestimonialsDesigns.MULTI_CARD_DISPLAY || ''}
          testimonials={testimonials}
          mainText={`What Our Clients Say About ${projectName} `}
        />

        <ContactFormSection
          projectName={'test44'}
          design={ContactFormDesigns.WITH_IMAGE || ''}
          image={['Person typing on a laptop']}
          mainText={`Get in Touch with ${projectName} `}
          subTitle={`Reach out to us anytime. Our team is ready to assist you with any inquiries or support you need. Expect a prompt response from ${projectName}.`}
        />
      </main>
      <WebSiteFooter projectName={'test44'} pages={pages} />
    </div>
  );
}

WebSite.getLayout = function getLayout(page: ReactElement) {
  return <LayoutGuest>{page}</LayoutGuest>;
};
