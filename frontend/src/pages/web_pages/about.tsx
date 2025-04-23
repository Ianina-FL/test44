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
  AboutUsDesigns,
  FeaturesDesigns,
  TestimonialsDesigns,
} from '../../components/WebPageComponents/designs';

import HeroSection from '../../components/WebPageComponents/HeroComponent';

import AboutUsSection from '../../components/WebPageComponents/AboutUsComponent';

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
      name: 'Integrated Communication',
      description:
        'Facilitate seamless communication across departments with integrated messaging and collaboration tools. Enhance teamwork and ensure everyone stays informed.',
      icon: 'mdiMessageTextOutline',
    },
    {
      name: 'Advanced Analytics',
      description:
        "Gain insights into your firm's performance with advanced analytics. Make data-driven decisions to improve efficiency and client satisfaction.",
      icon: 'mdiChartBar',
    },
    {
      name: 'Customizable Workflows',
      description:
        "Tailor workflows to fit your firm's unique needs. Adapt and optimize processes to ensure maximum productivity and client service.",
      icon: 'mdiCogOutline',
    },
  ];

  const testimonials = [
    {
      text: '${projectName} has transformed our operations. The intuitive interface and robust features have made our team more efficient and effective.',
      company: 'Legal Visionaries',
      user_name: 'Alice Thompson, Operations Manager',
    },
    {
      text: 'The customer support from ${projectName} is outstanding. They are always ready to help and ensure we get the most out of the platform.',
      company: 'Justice Innovators',
      user_name: 'Robert King, IT Specialist',
    },
    {
      text: "Our firm has seen a significant increase in productivity since adopting ${projectName}. It's a must-have tool for any law firm.",
      company: 'Advocate Solutions',
      user_name: 'Jessica Lee, Senior Partner',
    },
    {
      text: 'The analytics feature in ${projectName} provides us with valuable insights that help us make informed decisions and improve our services.',
      company: 'Counsel Connect',
      user_name: 'Michael Green, Data Analyst',
    },
    {
      text: 'We love how customizable ${projectName} is. It adapts perfectly to our unique workflows and enhances our overall efficiency.',
      company: 'LawTech Partners',
      user_name: 'Emily Davis, Workflow Coordinator',
    },
    {
      text: '${projectName} has been a game-changer for our client management. Keeping track of client interactions has never been easier.',
      company: 'Legal Pioneers',
      user_name: 'David Brown, Client Relations Manager',
    },
  ];

  return (
    <div className='flex flex-col min-h-screen'>
      <Head>
        <title>{`About Us - ${projectName}`}</title>
        <meta
          name='description'
          content={`Learn more about ${projectName}, our mission, values, and the innovative CRM solutions we provide for the law industry.`}
        />
      </Head>
      <WebSiteHeader projectName={'test44'} pages={pages} />
      <main className={`flex-grow    bg-white  rounded-none  `}>
        <HeroSection
          projectName={'test44'}
          image={['Team brainstorming in modern office']}
          mainText={`Discover the Heart of ${projectName}`}
          subTitle={`Explore the mission and values that drive ${projectName} to deliver exceptional CRM solutions for the law industry. Join us on our journey to innovate and empower legal professionals.`}
          design={HeroDesigns.IMAGE_BG || ''}
          buttonText={`Learn More About Us`}
        />

        <AboutUsSection
          projectName={'test44'}
          image={['Team members discussing project goals']}
          mainText={`Our Journey with ${projectName}`}
          subTitle={`At ${projectName}, we are committed to transforming the legal industry with innovative CRM solutions. Our team is passionate about creating tools that empower law firms to achieve their goals efficiently and effectively.`}
          design={AboutUsDesigns.IMAGE_LEFT || ''}
          buttonText={`Meet Our Team`}
        />

        <FeaturesSection
          projectName={'test44'}
          image={['Icons representing key features']}
          withBg={1}
          features={features_points}
          mainText={`Explore ${projectName}'s Core Features`}
          subTitle={`Discover the powerful features of ${projectName} that streamline operations and enhance productivity for law firms.`}
          design={FeaturesDesigns.CARDS_GRID_WITH_ICONS || ''}
        />

        <TestimonialsSection
          projectName={'test44'}
          design={TestimonialsDesigns.HORIZONTAL_CAROUSEL_DIVERSITY || ''}
          testimonials={testimonials}
          mainText={`Hear from Our Satisfied Clients `}
        />
      </main>
      <WebSiteFooter projectName={'test44'} pages={pages} />
    </div>
  );
}

WebSite.getLayout = function getLayout(page: ReactElement) {
  return <LayoutGuest>{page}</LayoutGuest>;
};
