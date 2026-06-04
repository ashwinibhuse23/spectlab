import React, { useState } from 'react';
import { testimonials } from '../mock';
import { ArrowRight, Quote, Star } from 'lucide-react';

export default function Testimonials() {
  const [active, setActive] = useState(0);
  const t = testimonials[active];

  return (
    <section className="py-24 lg:py-32 bg-[#f3f1fb]">
      <div className="max-w-[1400px] mx-auto px-4 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 text-mint font-display font-semibold mb-4">
            <span className="w-10 h-px bg-mint" />
            Testimonials
            <span className="w-10 h-px bg-mint" />
          </div>
          <h2 className="font-display font-extrabold text-navy text-4xl lg:text-[52px] leading-[1.08]">
            Customer Satisfaction Drives Us!
          </h2>
        </div>

        <div className="grid lg:grid-cols-2 gap-10 lg:gap-16 items-center">
          <div className="relative">
            <div className="relative rounded-[32px] overflow-hidden">
              <img src="https://images.unsplash.com/photo-1612531386530-97286d97c2d2?w=900&h=900&fit=crop" alt="Team" className="w-full h-[520px] object-cover" />
            </div>
            <div className="absolute -top-4 -left-4 w-16 h-16 rounded-2xl bg-mint flex items-center justify-center text-white soft-shadow">
              <Quote className="w-7 h-7" />
            </div>
            <div className="absolute bottom-6 right-6 bg-white rounded-2xl px-5 py-3 soft-shadow flex items-center gap-3">
              <div className="flex -space-x-2">
                {testimonials.slice(0, 4).map((tm, i) => (
                  <img key={i} src={tm.avatar} alt="" className="w-9 h-9 rounded-full border-2 border-white object-cover" />
                ))}
              </div>
              <div>
                <div className="font-display font-extrabold text-navy text-lg leading-none">30k+</div>
                <div className="text-xs text-navy/60">Happy Clients</div>
              </div>
            </div>
          </div>

          <div>
            <div className="flex items-center gap-1 mb-5">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star key={i} className="w-5 h-5 fill-mint text-mint" />
              ))}
            </div>
            <p className="text-navy/80 text-lg lg:text-xl leading-relaxed font-display font-medium mb-8">
              “{t.quote}”
            </p>
            <div className="flex items-center gap-4 mb-8">
              <img src={t.avatar} alt={t.name} className="w-14 h-14 rounded-full object-cover" />
              <div>
                <div className="font-display font-extrabold text-navy text-lg">{t.name}</div>
                <div className="text-sm text-navy/60">{t.role}</div>
              </div>
            </div>

            <div className="flex items-center gap-3">
              {testimonials.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setActive(i)}
                  className={`h-1.5 rounded-full transition-all ${i === active ? 'bg-mint w-10' : 'bg-navy/20 w-4'}`}
                />
              ))}
              <a href="#contact" className="ml-auto group inline-flex items-center gap-3 bg-navy hover:bg-navy-deep text-white font-display font-bold pl-5 pr-2 py-2 rounded-full transition-colors">
                Read more
                <span className="w-9 h-9 rounded-full bg-mint text-white flex items-center justify-center group-hover:rotate-45 transition-transform">
                  <ArrowRight className="w-4 h-4" />
                </span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
