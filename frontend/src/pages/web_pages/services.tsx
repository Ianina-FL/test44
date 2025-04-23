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
  TestimonialsDesigns,
} from '../../components/WebPageComponents/designs';

import HeroSection from '../../components/WebPageComponents/HeroComponent';

import FeaturesSection from '../../components/WebPageComponents/FeaturesComponent';

import TestimonialsSection from '../../components/WebPageComponents/TestimonialsComponent';

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
      name: 'Client Management',
      description:
        'Effortlessly manage client information and interactions. Keep all client data organized and accessible to improve service delivery.',
      icon: 'mdiAccountCircle',
    },
    {
      name: 'Document Automation',
      description:
        'Streamline document creation and management with automated templates. Save time and reduce errors in legal documentation.',
      icon: 'mdiFileDocumentOutline',
    },
    {
      name: 'Task Scheduling',
      description:
        'Organize and prioritize tasks with an intuitive scheduling system. Ensure deadlines are met and workloads are balanced.',
      icon: 'mdiCalendarCheck',
    },
    {
      name: 'Secure Data Storage',
      description:
        'Protect sensitive client information with robust security measures. Ensure compliance with legal data protection standards.',
      icon: 'mdiLock',
    },
    {
      name: 'Custom Reporting',
      description:
        "Generate detailed reports tailored to your firm's needs. Gain insights into performance metrics and make informed decisions.",
      icon: 'mdiChartPie',
    },
    {
      name: 'Mobile Access',
      description:
        'Stay connected on the go with mobile access to ${projectName}. Manage your practice from anywhere, anytime.',
      icon: 'mdiCellphoneLink',
    },
  ];

  const testimonials = [
    {
      text: "${projectName} has streamlined our operations and improved client satisfaction. It's an essential tool for any modern law firm.",
      company: 'Legal Innovators Group',
      user_name: 'Anna White, Managing Partner',
    },
    {
      text: 'The document automation feature has saved us countless hours. ${projectName} is a game-changer for our practice.',
      company: 'Justice Solutions Co.',
      user_name: 'Mark Johnson, Senior Attorney',
    },
    {
      text: "With ${projectName}, we can manage our clients more effectively and securely. It's a must-have for legal professionals.",
      company: 'Advocate Alliance',
      user_name: 'Sophia Brown, Client Relations Manager',
    },
    {
      text: 'The custom reporting feature provides us with valuable insights. ${projectName} helps us make data-driven decisions.',
      company: 'Counsel Connect',
      user_name: 'James Lee, Data Analyst',
    },
    {
      text: "Mobile access to ${projectName} keeps us connected on the go. It's perfect for our dynamic work environment.",
      company: 'LawTech Partners',
      user_name: 'Emily Davis, IT Specialist',
    },
    {
      text: 'The secure data storage feature gives us peace of mind. ${projectName} ensures our client information is protected.',
      company: 'Legal Pioneers',
      user_name: 'David Green, Security Officer',
    },
  ];

  return (
    <div className='flex flex-col min-h-screen'>
      <Head>
        <title>{`Our Services - ${projectName}`}</title>
        <meta
          name='description'
          content={`Explore the comprehensive services offered by ${projectName}, designed to enhance efficiency and productivity for law firms.`}
        />
      </Head>
      <WebSiteHeader projectName={'test44'} pages={pages} />
      <main className={`flex-grow    bg-white  rounded-none  `}>
        <HeroSection
          projectName={'test44'}
          image={['Law firm team in discussion']}
          mainText={`Transform Your Practice with ${projectName}`}
          subTitle={`Discover the range of services offered by ${projectName} to streamline your law firm's operations and enhance client satisfaction. Our solutions are tailored to meet the unique needs of the legal industry.`}
          design={HeroDesigns.IMAGE_RIGHT || ''}
          buttonText={`Explore Our Services`}
        />

        <FeaturesSection
          projectName={'test44'}
          image={['Icons representing service features']}
          withBg={0}
          features={features_points}
          mainText={`Unleash the Power of ${projectName}`}
          subTitle={`Explore the innovative features of ${projectName} designed to optimize your law firm's operations and client management.`}
          design={FeaturesDesigns.CARDS_GRID_WITH_ICONS_DIVERSITY || ''}
        />

        <TestimonialsSection
          projectName={'test44'}
          design={TestimonialsDesigns.MULTI_CARD_DISPLAY || ''}
          testimonials={testimonials}
          mainText={`Client Success Stories with ${projectName} `}
        />
      </main>
      <WebSiteFooter projectName={'test44'} pages={pages} />
    </div>
  );
}

WebSite.getLayout = function getLayout(page: ReactElement) {
  return <LayoutGuest>{page}</LayoutGuest>;
};
