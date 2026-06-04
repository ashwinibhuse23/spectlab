import React from 'react';
import { Plus } from 'lucide-react';

const items = ['SPECT LAB', 'Smart Testing', 'Lab', 'Trusted Care', 'Health First'];

export default function Marquee() {
  const list = [...items, ...items, ...items];
  return (
    <section className="py-3 bg-[#3b7a24] border-y border-white/10 overflow-hidden -mt-4 relative z-10">
      <div className="flex gap-12 animate-marquee whitespace-nowrap" style={{ width: 'max-content' }}>
        {list.map((t, i) => (
          <div key={i} className="flex items-center gap-6">
            <h3 className="font-display font-extrabold text-white text-3xl lg:text-5xl tracking-tight" style={{ WebkitTextStroke: i % 2 === 0 ? '' : '1px #ffffff', color: i % 2 === 0 ? '#ffffff' : 'transparent' }}>
              {t}
            </h3>
            <span className="w-8 h-8 rounded-full bg-white flex items-center justify-center text-[#3b7a24] shrink-0">
              <Plus className="w-4 h-4" strokeWidth={3} />
            </span>
          </div>
        ))}
      </div>
    </section>
  );
}
