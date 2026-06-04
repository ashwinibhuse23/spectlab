import React from 'react';
import PageHeader from '../components/PageHeader';
import Doctors from '../components/Doctors';
import AppointmentCTA from '../components/AppointmentCTA';
import Testimonials from '../components/Testimonials';
import { doctors } from '../mock';
import { Star, Mail, Phone, Facebook, Twitter, Instagram } from 'lucide-react';

const departments = ['All', 'Internal Medicine Doctor', 'Senior Oncologist', 'Dermatologist', 'Cardiac Surgery', 'Gynecologist'];

const extraDoctors = [
  { name: 'Dr. Sarah Mitchell', specialty: 'Pediatrician', exp: '8 year', rating: 4.8, image: 'https://images.unsplash.com/photo-1622253692010-333f2da6031d?w=800&h=1000&fit=crop' },
  { name: 'Dr. Michael Chen', specialty: 'Neurologist', exp: '14 year', rating: 4.9, image: 'https://images.unsplash.com/photo-1582750433449-648ed127bb54?w=800&h=1000&fit=crop' },
  { name: 'Dr. Ana Lopez', specialty: 'Radiologist', exp: '11 year', rating: 4.9, image: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=800&h=1000&fit=crop' },
];

const all = [...doctors, ...extraDoctors];

export default function DoctorsPage() {
  return (
    <>
      <PageHeader title="Meet Our Doctors" subtitle="Trusted Team" breadcrumbs={[{ label: 'Doctors' }]} />

      <section className="py-24 bg-[#f3f1fb]">
        <div className="max-w-[1400px] mx-auto px-4 lg:px-8">
          <div className="flex flex-wrap justify-center gap-3 mb-12">
            {departments.map((d, i) => (
              <button key={d} className={`px-5 py-2 rounded-full text-sm font-display font-bold transition-colors ${i === 0 ? 'bg-navy text-white' : 'bg-white text-navy hover:bg-navy hover:text-white'}`}>
                {d}
              </button>
            ))}
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {all.map((d) => (
              <div key={d.name} className="group bg-white rounded-3xl overflow-hidden soft-shadow">
                <div className="relative aspect-[4/5] overflow-hidden">
                  <img src={d.image} alt={d.name} className="w-full h-full object-cover grayscale group-hover:grayscale-0 group-hover:scale-105 transition-all duration-700" />
                  <div className="absolute top-4 left-4 bg-white rounded-full px-3 py-1 flex items-center gap-1 text-xs font-display font-bold text-navy">
                    <Star className="w-3.5 h-3.5 fill-mint text-mint" />
                    {d.rating}
                  </div>
                  <div className="absolute right-4 top-4 flex flex-col gap-2 opacity-0 group-hover:opacity-100 translate-x-4 group-hover:translate-x-0 transition-all">
                    <a href="#" className="w-9 h-9 rounded-full bg-white text-navy hover:bg-mint hover:text-white flex items-center justify-center transition-colors"><Facebook className="w-4 h-4" /></a>
                    <a href="#" className="w-9 h-9 rounded-full bg-white text-navy hover:bg-mint hover:text-white flex items-center justify-center transition-colors"><Twitter className="w-4 h-4" /></a>
                    <a href="#" className="w-9 h-9 rounded-full bg-white text-navy hover:bg-mint hover:text-white flex items-center justify-center transition-colors"><Instagram className="w-4 h-4" /></a>
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="font-display font-bold text-navy text-xl mb-1">{d.name}</h3>
                  <p className="text-mint font-display font-semibold text-sm mb-3">{d.specialty}</p>
                  <div className="text-xs text-navy/60 mb-3">Experience: {d.exp}</div>
                  <div className="flex items-center gap-3 text-xs text-navy/70">
                    <a href="mailto:kiran.ayre@spectlab.com" className="flex items-center gap-1 hover:text-mint"><Mail className="w-3.5 h-3.5" /> kiran.ayre@spectlab.com</a>
                  </div>
                  <div className="flex items-center gap-3 text-xs text-navy/70 mt-1">
                    <a href="tel:0123456789" className="flex items-center gap-1 hover:text-mint"><Phone className="w-3.5 h-3.5" /> +(012) 345 678 89</a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <AppointmentCTA />
      <Testimonials />
    </>
  );
}
