import React, { useState } from 'react';
import { whyChooseTabs } from '../mock';
import { Stethoscope, HeartHandshake, Activity, ArrowRight } from 'lucide-react';

const tabIcons = { support: Stethoscope, patient: HeartHandshake, clinical: Activity };

export default function WhyChoose() {
  const [active, setActive] = useState(whyChooseTabs[0].id);
  const activeTab = whyChooseTabs.find((t) => t.id === active);

  return (
    <section className="py-24 lg:py-32 bg-[#f3f1fb]">
      <div className="max-w-[1400px] mx-auto px-4 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 text-mint font-display font-semibold mb-4">
            <span className="w-10 h-px bg-mint" />
            Trusted Source for Health Insights
            <span className="w-10 h-px bg-mint" />
          </div>
          <h2 className="font-display font-extrabold text-navy text-4xl lg:text-[52px] leading-[1.08] mb-5">
            Why Choose SPECT LAB Health Care Center?
          </h2>
          <p className="text-navy/70">
            Read the latest news about SPECT LAB as well as news around the world. Our patient-first approach combines empathy with expertise.
          </p>
        </div>

        {/* Tabs */}
        <div className="flex flex-wrap justify-center gap-3 mb-12">
          {whyChooseTabs.map((t) => {
            const Icon = tabIcons[t.id] || Stethoscope;
            const isActive = active === t.id;
            return (
              <button
                key={t.id}
                onClick={() => setActive(t.id)}
                className={`group inline-flex items-center gap-3 px-6 py-3 rounded-full font-display font-bold text-sm transition-all ${isActive ? 'bg-navy text-white' : 'bg-white text-navy hover:bg-navy hover:text-white'}`}
              >
                <span className={`w-8 h-8 rounded-full flex items-center justify-center transition-colors ${isActive ? 'bg-mint text-white' : 'bg-mint/15 text-mint group-hover:bg-mint group-hover:text-white'}`}>
                  <Icon className="w-4 h-4" />
                </span>
                {t.label}
              </button>
            );
          })}
        </div>

        {/* Items */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {activeTab.items.map((it, i) => (
            <div key={it.title} className="group bg-white rounded-3xl p-7 soft-shadow hover:bg-navy transition-colors duration-500" style={{ animation: `fadeUp 0.5s ease ${i * 0.05}s both` }}>
              <div className="flex items-start gap-4">
                <span className="w-12 h-12 shrink-0 rounded-full bg-mint/15 text-mint group-hover:bg-mint group-hover:text-white flex items-center justify-center font-display font-extrabold transition-colors">
                  {String(i + 1).padStart(2, '0')}
                </span>
                <div>
                  <h3 className="font-display font-bold text-navy group-hover:text-white text-lg mb-2 transition-colors">{it.title}</h3>
                  <p className="text-navy/70 group-hover:text-white/70 text-sm leading-relaxed transition-colors">{it.desc}</p>
                  <span className="mt-3 inline-flex items-center gap-1 text-mint font-display font-bold text-xs opacity-0 group-hover:opacity-100 transition-opacity">
                    Read more <ArrowRight className="w-3.5 h-3.5" />
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      <style>{`@keyframes fadeUp { from { opacity: 0; transform: translateY(20px); } to { opacity: 1; transform: translateY(0); } }`}</style>
    </section>
  );
}
