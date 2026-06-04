import React from 'react';
import { processSteps } from '../mock';
import { ArrowRight, CalendarCheck, Stethoscope, ClipboardList, HeartPulse } from 'lucide-react';

const icons = [CalendarCheck, Stethoscope, ClipboardList, HeartPulse];

export default function Process() {
  return (
    <section className="relative py-24 lg:py-32 bg-navy overflow-hidden">
      <div className="absolute inset-0 opacity-[0.07] pointer-events-none" style={{ backgroundImage: 'radial-gradient(circle at 50% 0%, rgba(255,255,255,0.5), transparent 50%)' }} />
      <div className="absolute top-0 right-0 w-1/2 h-full opacity-10" style={{ backgroundImage: "url('https://mediverse.casethemes.net/wp-content/themes/mediverse/assets/img/shape-bg.png')", backgroundSize: 'cover' }} />

      <div className="relative max-w-[1400px] mx-auto px-4 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-10 mb-16">
          <div>
            <div className="inline-flex items-center gap-2 text-mint font-display font-semibold mb-4">
              <span className="w-10 h-px bg-mint" />
              How We Work to Put Your Health First
            </div>
            <h2 className="font-display font-extrabold text-white text-4xl lg:text-[52px] leading-[1.08]">
              Featured news and insights
            </h2>
          </div>
          <p className="text-white/60 leading-relaxed self-end max-w-lg">
            Stay updated with the latest news from SPECT LAB, along with important developments and healthcare trends from around the world.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {processSteps.map((step, i) => {
            const Icon = icons[i] || CalendarCheck;
            return (
              <div key={step.n} className="relative group">
                <div className="absolute -top-6 -left-2 text-[120px] leading-none font-display font-extrabold text-white/[0.06] select-none">{step.n}</div>
                <div className="relative bg-white/[0.04] hover:bg-mint border border-white/10 rounded-3xl p-7 backdrop-blur-sm transition-all duration-500 h-full">
                  <div className="w-14 h-14 rounded-2xl bg-mint group-hover:bg-white text-white group-hover:text-mint flex items-center justify-center mb-5 transition-colors">
                    <Icon className="w-7 h-7" strokeWidth={1.8} />
                  </div>
                  <div className="text-white/40 group-hover:text-white/80 font-display font-bold text-sm mb-2 transition-colors">Step {step.n}</div>
                  <h3 className="font-display font-bold text-white text-xl leading-snug mb-3">{step.title}</h3>
                  <p className="text-white/60 group-hover:text-white/80 text-sm leading-relaxed transition-colors">{step.desc}</p>
                  <span className="mt-5 inline-flex items-center gap-2 text-mint group-hover:text-white font-display font-bold text-sm transition-colors">
                    Get Started <ArrowRight className="w-4 h-4" />
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
