import React, { useState } from 'react';
import { doctors } from '../mock';
import { ArrowRight, ChevronLeft, ChevronRight, Star, Mail, Phone, Facebook, Twitter, Instagram } from 'lucide-react';

export default function Doctors() {
  const [index, setIndex] = useState(0);
  const perPage = 4;
  const max = Math.max(0, doctors.length - perPage);
  const visible = doctors.slice(index, index + perPage);

  return (
    <section className="py-24 lg:py-32 bg-[#f3f1fb]">
      <div className="max-w-[1400px] mx-auto px-4 lg:px-8">
        <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-8 mb-12">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 text-mint font-display font-semibold mb-4">
              <span className="w-10 h-px bg-mint" />
              Meet Our Trusted Team
            </div>
            <h2 className="font-display font-extrabold text-navy text-4xl lg:text-[52px] leading-[1.08] mb-4">
              Specialists Behind Every Smile
            </h2>
            <p className="text-navy/70 max-w-lg">
              Stay informed with expert advice from our doctors and important health updates from around the world.
            </p>
          </div>
          <div className="flex items-center gap-4">
            <button onClick={() => setIndex(Math.max(0, index - 1))} className="w-12 h-12 rounded-full border border-navy/20 hover:bg-navy hover:text-white text-navy flex items-center justify-center transition-colors">
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button onClick={() => setIndex(Math.min(max, index + 1))} className="w-12 h-12 rounded-full border border-navy/20 hover:bg-navy hover:text-white text-navy flex items-center justify-center transition-colors">
              <ChevronRight className="w-5 h-5" />
            </button>
            <a href="#contact" className="group inline-flex items-center gap-3 bg-navy hover:bg-navy-deep text-white font-display font-bold pl-5 pr-2 py-2 rounded-full transition-colors">
              Read more
              <span className="w-9 h-9 rounded-full bg-mint text-white flex items-center justify-center group-hover:rotate-45 transition-transform">
                <ArrowRight className="w-4 h-4" />
              </span>
            </a>
          </div>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {visible.map((d) => (
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
  );
}
