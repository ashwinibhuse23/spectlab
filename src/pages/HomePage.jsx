import React from 'react';
import Hero from '../components/Hero';
import Stats from '../components/Stats';
import About from '../components/About';
import Services from '../components/Services';
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
      <Hero />
      {/* <Stats /> */}

      <About />

      <Services />
      {/* <WhyChoose />
      <Process /> */}
      <AppointmentCTA />
      {/* <Testimonials /> */}
      {/* <PartnersStrip /> */}
      {/* <Doctors /> */}
      <Blog />
      {/* <Marquee /> */}
      <Contact />
    </>
  );
}
