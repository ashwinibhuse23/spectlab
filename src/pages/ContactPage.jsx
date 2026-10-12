import React from 'react';
import SEO from '../components/SEO';
import PageHeader from '../components/PageHeader';
import Contact from '../components/Contact';

export default function ContactPage() {
  return (
    <>
      <SEO
        title="Contact Us & Center Location | Spect lab Nuclear Medicine Services"
        description="Get in touch with Spect lab Nuclear Medicine Services in Bavdhan, Pune. Find phone numbers, email address, working hours, and Google Maps directions to our diagnostic facility."
        keywords="contact Spect lab Nuclear Medicine Services, Bavdhan Pune diagnostic center, nuclear medicine contact number, address, map location, directions"
        canonical="/contact"
      />
      <PageHeader title="Get in Touch" subtitle="We'd Love to Hear from You" breadcrumbs={[{ label: 'Contact' }]} image="/Images/contactHero.png" />
      <Contact />
      <section className="pb-24 bg-[#f3f1fb]">
        <div className="max-w-[1400px] mx-auto px-4 lg:px-8">
          <div className="rounded-[28px] overflow-hidden soft-shadow">
            <iframe
              title="SPECT LAB Location"
              src="https://maps.google.com/maps?q=Sr.+No.+268,+Behind+Crystal+Honda+Showroom,+Near+Mantri+Alpine,+Bavdhan,+Pune+-+411021&t=&z=15&ie=UTF8&iwloc=&output=embed"
              className="w-full h-[420px] border-0"
              loading="lazy"
            />
          </div>
        </div>
      </section>
    </>
  );
}
