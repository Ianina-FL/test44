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
  FaqDesigns,
} from '../../components/WebPageComponents/designs';

import HeroSection from '../../components/WebPageComponents/HeroComponent';

import FaqSection from '../../components/WebPageComponents/FaqComponent';

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

  const faqs = [
    {
      question: 'What is ${projectName} and how does it benefit law firms?',
      answer:
        '${projectName} is a CRM solution designed specifically for law firms. It streamlines operations by connecting departments, managing client information, and automating tasks, ultimately enhancing productivity and client satisfaction.',
    },
    {
      question: 'How secure is the data stored in ${projectName}?',
      answer:
        '${projectName} employs robust security measures, including encryption and role-based access controls, to ensure that all client and firm data is protected and compliant with legal standards.',
    },
    {
      question: "Can ${projectName} be customized to fit our firm's needs?",
      answer:
        "Yes, ${projectName} offers customizable workflows and reporting features, allowing you to tailor the system to your firm's unique processes and requirements.",
    },
    {
      question: 'Is there a mobile version of ${projectName}?',
      answer:
        'Yes, ${projectName} provides mobile access, enabling you to manage your practice on the go from any device, ensuring you stay connected and productive wherever you are.',
    },
    {
      question: 'What kind of support does ${projectName} offer?',
      answer:
        '${projectName} offers comprehensive customer support, including onboarding assistance, training resources, and a dedicated support team available to address any questions or issues you may encounter.',
    },
    {
      question: 'How does ${projectName} handle document management?',
      answer:
        '${projectName} includes document automation and management features, allowing you to create, store, and organize legal documents efficiently, reducing errors and saving time.',
    },
    {
      question: 'Can I track client interactions with ${projectName}?',
      answer:
        'Absolutely, ${projectName} provides tools to manage and track all client interactions, ensuring that you have a complete view of client history and can deliver personalized service.',
    },
  ];

  return (
    <div className='flex flex-col min-h-screen'>
      <Head>
        <title>{`Frequently Asked Questions - ${projectName}`}</title>
        <meta
          name='description'
          content={`Find answers to common questions about ${projectName} and learn how our CRM solutions can benefit your law firm.`}
        />
      </Head>
      <WebSiteHeader projectName={'test44'} pages={pages} />
      <main className={`flex-grow    bg-white  rounded-none  `}>
        <HeroSection
          projectName={'test44'}
          image={['Open book with question marks']}
          mainText={`Your Questions Answered with ${projectName}`}
          subTitle={`Explore our comprehensive FAQ section to find answers to common questions about ${projectName}. Learn how our CRM solutions can streamline your law firm's operations.`}
          design={HeroDesigns.IMAGE_BG || ''}
          buttonText={`Explore FAQs`}
        />

        <FaqSection
          projectName={'test44'}
          design={FaqDesigns.ACCORDION || ''}
          faqs={faqs}
          mainText={`Frequently Asked Questions About ${projectName} `}
        />
      </main>
      <WebSiteFooter projectName={'test44'} pages={pages} />
    </div>
  );
}

WebSite.getLayout = function getLayout(page: ReactElement) {
  return <LayoutGuest>{page}</LayoutGuest>;
};
