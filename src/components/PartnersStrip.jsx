import React from 'react';
import { partnerLogos } from '../mock';
import { Plus, ChevronLeft, ChevronRight, Stethoscope } from 'lucide-react';

export default function PartnersStrip() {
  const logos = [...partnerLogos, ...partnerLogos];
  return (
    <section className="py-12 bg-[#f3f1fb]">
      <div className="max-w-[1400px] mx-auto px-4 lg:px-8">
        <div className="bg-navy rounded-[32px] px-6 lg:px-10 py-10 grid lg:grid-cols-[1fr_auto] gap-8 items-center">
          <div className="flex items-center gap-6">
            <div className="w-16 h-16 rounded-full bg-mint/15 text-mint flex items-center justify-center shrink-0">
              <Stethoscope className="w-7 h-7" />
            </div>
            <h3 className="font-display font-extrabold text-white text-2xl lg:text-3xl leading-snug">
              Customer Satisfaction is Our Working Motivation!
            </h3>
          </div>
          <div className="flex items-center gap-4">
            <button className="w-12 h-12 rounded-full border border-white/30 hover:bg-mint hover:border-mint text-white flex items-center justify-center transition-colors">
              <ChevronLeft className="w-5 h-5" />
            </button>
            <div className="overflow-hidden w-[460px] max-w-full">
              <div className="flex gap-4 animate-marquee" style={{ width: 'max-content' }}>
                {logos.map((n, i) => (
                  <div key={i} className="shrink-0 w-44 h-20 rounded-2xl bg-white/[0.07] hover:bg-white/[0.12] border border-white/10 flex items-center justify-center gap-2 transition-colors">
                    <Plus className="w-5 h-5 text-mint" strokeWidth={3} />
                    <div className="font-display font-extrabold text-white tracking-wide">{n}</div>
                  </div>
                ))}
              </div>
            </div>
            <button className="w-12 h-12 rounded-full border border-white/30 hover:bg-mint hover:border-mint text-white flex items-center justify-center transition-colors">
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
