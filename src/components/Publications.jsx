import React from 'react';
import { cases } from '../mock';
import { ArrowUpRight } from 'lucide-react';

export default function Publications() {
  return (
    <section id="publications" className="py-14 lg:py-20 relative overflow-hidden bg-[#fafafa]">
      <div className="absolute inset-0 dot-pattern opacity-30 pointer-events-none" />
      <div className="relative max-w-[1400px] mx-auto px-4 lg:px-8">
        <div className="flex flex-col gap-4 mb-8 max-w-2xl">
          <div>
            <div className="inline-flex items-center gap-2 text-[#3b7a24] font-display font-semibold mb-4">
              <span className="w-10 h-px bg-[#3b7a24]" />
              Health Insights & Diagnostic Updates
            </div>
            <h2 className="font-display font-extrabold text-navy text-xl lg:text-2xl leading-snug mb-3">
              Stay informed with the latest advancements in Nuclear Medicine, PET-CT, SPECT-CT, and diagnostic imaging technologies.
            </h2>
            <p className="text-[#0e1a6bbf] leading-relaxed max-w-lg">
              At SPECT LAB, we are committed to sharing valuable healthcare insights, diagnostic innovations, and patient-centered information.
            </p>
          </div>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {cases.map((c, i) => (
            <a key={c.title + i} href="#publications" className="group relative rounded-3xl overflow-hidden bg-white block">
              <div className="relative aspect-[4/3] overflow-hidden">
                <img src={c.image} alt={c.title} className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                <div className="absolute inset-0 bg-gradient-to-t from-[#3b7a24] via-[#3b7a24]/50 to-transparent opacity-80" />
                <div className="absolute inset-0 p-6 flex flex-col justify-end">
                  <h3 className="font-display font-bold text-white text-xl leading-snug">{c.title}</h3>
                </div>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
