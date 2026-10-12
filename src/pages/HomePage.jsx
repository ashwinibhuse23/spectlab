import React from 'react';
import SEO from '../components/SEO';
import Hero from '../components/Hero';
import Stats from '../components/Stats';
import About from '../components/About';
import Services from '../components/Services';
import Reviews from '../components/Reviews';
import WhyChoose from '../components/WhyChoose';
import Process from '../components/Process';
import AppointmentCTA from '../components/AppointmentCTA';
import Testimonials from '../components/Testimonials';
import PartnersStrip from '../components/PartnersStrip';
import Doctors from '../components/Doctors';
import Blog from '../components/Blog';
import Marquee from '../components/Marquee';
import Contact from '../components/Contact';

export default function HomePage() {
  return (
    <>
      <SEO
        title="Spect lab Nuclear Medicine Services | Advanced Nuclear Medicine & PET-CT Center"
        description="Welcome to Spect lab Nuclear Medicine Services. Providing pioneering Nuclear Medicine, PET-CT, SPECT-CT scans, and radionuclide therapy in Pune since 2001. NABH accredited excellence in diagnostic care."
        keywords="Spect lab Nuclear Medicine Services, nuclear medicine Pune, PET-CT scan Pune, SPECT-CT, radionuclide therapy, gamma camera, diagnostic center Pune"
        canonical="/"
      />
      <Hero />
      {/* <Stats /> */}

      {/* <About /> */}

      <Services />
      <Reviews />

      {/* <WhyChoose />
      <Process /> */}
      {/* <AppointmentCTA /> */}
      {/* <Testimonials /> */}
      {/* <PartnersStrip /> */}
      {/* <Doctors /> */}
      {/* <Blog /> */}
      {/* <Marquee /> */}
      {/* <Contact /> */}
    </>
  );
}
