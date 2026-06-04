import React from 'react';
import PageHeader from '../components/PageHeader';
import Contact from '../components/Contact';

export default function ContactPage() {
  return (
    <>
      <PageHeader title="Get in Touch" subtitle="We'd Love to Hear from You" breadcrumbs={[{ label: 'Contact' }]} image="/Images/contactHero.jpg" />
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
