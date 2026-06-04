import React, { useEffect, useRef, useState } from 'react';
import { Award, HeartPulse, Sparkles, Check, ArrowUpRight } from 'lucide-react';

const Counter = ({ end, suffix }) => {
  const [val, setVal] = useState(0);
  const ref = useRef(null);
  const started = useRef(false);

  useEffect(() => {
    setVal(0);
    started.current = false;

    const obs = new IntersectionObserver((entries) => {
      entries.forEach((e) => {
        if (e.isIntersecting && !started.current) {
          started.current = true;
          const duration = 1600;
          const start = performance.now();
          const tick = (now) => {
            const p = Math.min((now - start) / duration, 1);
            const eased = 1 - Math.pow(1 - p, 3);
            setVal(Math.floor(eased * end));
            if (p < 1) requestAnimationFrame(tick);
            else setVal(end);
          };
          requestAnimationFrame(tick);
        }
      });
    }, { threshold: 0.2 });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, [end]);

  // Format big numbers with commas
  const formatNumber = (num) => {
    return num.toLocaleString();
  };

  return (
    <span ref={ref} className="font-display font-extrabold text-navy text-4xl lg:text-5xl bg-gradient-to-r from-navy via-navy to-[#3b7a24] bg-clip-text text-transparent">
      {formatNumber(val)}{suffix}
    </span>
  );
};

const statSets = [
  {
    id: 'excellence',
    tabLabel: 'Clinical Excellence',
    icon: Award,
    cards: [
      {
        value: 25,
        suffix: '+',
        label: 'Years of Clinical Excellence',
        description: 'For over two decades, SPECT LAB has been delivering reliable nuclear medicine and diagnostic imaging services, helping patients receive accurate diagnoses and better healthcare outcomes.'
      },
      {
        value: 18,
        suffix: '+',
        label: 'Advanced Diagnostic Procedures',
        description: 'Offering a comprehensive range of specialized diagnostic investigations, including PET-CT, SPECT-CT, cardiac imaging, bone scans, thyroid studies, and more.'
      },
      {
        value: 15,
        suffix: '+',
        label: 'Expert Professionals',
        description: 'A dedicated team of experienced nuclear medicine physicians, radiologists, technologists, and healthcare professionals committed to delivering exceptional patient care.'
      },
      {
        value: 32,
        suffix: '+',
        label: 'Healthcare Partners & Referring Centers',
        description: 'Trusted by leading hospitals, clinics, and healthcare providers across the region for advanced imaging, diagnostic support, and collaborative patient management.'
      }
    ]
  },
  {
    id: 'impact',
    tabLabel: 'Patient & Care Impact',
    icon: HeartPulse,
    cards: [
      {
        value: 50000,
        suffix: '+',
        label: 'Patients Served',
        description: 'Providing accurate diagnostic solutions and compassionate care to thousands of patients every year.'
      },
      {
        value: 24,
        suffix: '+',
        label: 'Years of Experience',
        description: 'A legacy of excellence in nuclear medicine and diagnostic imaging since 2001.'
      },
      {
        value: 100,
        suffix: '+',
        label: 'Diagnostic Services',
        description: 'Comprehensive imaging and nuclear medicine procedures under one roof.'
      },
      {
        value: 98,
        suffix: '%',
        label: 'Patient Satisfaction',
        description: 'Committed to delivering quality healthcare experiences with precision, comfort, and trust.'
      }
    ]
  },
  {
    id: 'innovation',
    tabLabel: 'Innovation & Collaboration',
    icon: Sparkles,
    cards: [
      {
        value: 24,
        suffix: '+',
        label: 'Years of Innovation',
        description: 'Advancing healthcare through cutting-edge nuclear medicine technologies and clinical expertise.'
      },
      {
        value: 75000,
        suffix: '+',
        label: 'Successful Diagnostic Studies',
        description: 'Supporting physicians with accurate and timely diagnostic insights.'
      },
      {
        value: 15,
        suffix: '+',
        label: 'Specialized Services',
        description: 'Comprehensive nuclear medicine and molecular imaging solutions tailored to patient needs.'
      },
      {
        value: 30,
        suffix: '+',
        label: 'Healthcare Collaborations',
        description: 'Building strong partnerships with hospitals and professionals to improve patient outcomes.'
      }
    ]
  }
];

export default function Stats() {
  const [activeTab, setActiveTab] = useState('excellence');
  const activeSet = statSets.find((set) => set.id === activeTab) || statSets[0];

  return (
    <section className="pt-20 lg:pt-28 pb-8 lg:pb-12 bg-gradient-to-b from-[#f3f1fb] via-[#f8f7fd] to-white relative overflow-hidden">
      {/* Background abstract shapes */}
      <div className="absolute top-0 left-1/4 w-[500px] h-[500px] rounded-full bg-mint/5 blur-3xl pointer-events-none -translate-y-1/2" />
      <div className="absolute bottom-0 right-1/4 w-[600px] h-[600px] rounded-full bg-purple-200/10 blur-3xl pointer-events-none translate-y-1/2" />

      <div className="max-w-[1400px] mx-auto px-4 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-4xl mx-auto mb-16">
          <div className="inline-flex items-center gap-3 bg-white/80 border border-[#3b7a24]/10 rounded-full px-5 py-2 text-[#3b7a24] font-display font-bold text-xs sm:text-sm shadow-sm mb-6 animate-[fadeUp_0.8s_ease]">
            <span className="w-2.5 h-2.5 rounded-full bg-[#3b7a24] animate-pulse" />
            Trusted Nuclear Medicine Excellence Since 2001
          </div>
          <h2 className="font-display font-extrabold text-navy text-3xl sm:text-4xl lg:text-[42px] leading-relaxed lg:leading-[1.35] tracking-tight mb-8 text-slate-900">
            Leading the Way in PET-CT, SPECT-CT, and Nuclear Medicine Diagnostics.
          </h2>

          {/* Premium Tab Selectors */}
          <div className="inline-flex flex-wrap justify-center p-1.5 bg-navy/5 backdrop-blur-sm rounded-2xl sm:rounded-full gap-1 border border-navy/5 max-w-full">
            {statSets.map((set) => {
              const Icon = set.icon;
              const isActive = set.id === activeTab;
              return (
                <button
                  key={set.id}
                  onClick={() => setActiveTab(set.id)}
                  className={`flex items-center gap-2 px-5 py-3 rounded-xl sm:rounded-full font-display font-bold text-sm transition-all duration-300 ${
                    isActive
                      ? 'bg-[#3b7a24] text-white shadow-md shadow-[#3b7a24]/20 scale-105'
                      : 'text-navy/70 hover:text-navy hover:bg-navy/5'
                  }`}
                >
                  <Icon className={`w-4 h-4 ${isActive ? 'text-white' : 'text-navy/60'}`} />
                  <span>{set.tabLabel}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Dynamic Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
          {activeSet.cards.map((card, i) => (
            <div
              key={`${activeTab}-${i}`}
              className="bg-white rounded-3xl p-8 border border-navy/5 shadow-[0_8px_30px_rgb(0,0,0,0.02)] hover:shadow-[0_20px_40px_rgba(59,122,36,0.06)] hover:-translate-y-2 transition-all duration-500 ease-out group relative overflow-hidden flex flex-col justify-between min-h-[250px]"
            >
              {/* Subtle top color bar */}
              <div className="absolute top-0 left-0 right-0 h-[4px] bg-gradient-to-r from-[#3b7a24] to-[#2d661b] opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              
              <div>
                <div className="flex justify-between items-start mb-4">
                  <Counter end={card.value} suffix={card.suffix} />
                  <span className="w-8 h-8 rounded-full bg-[#3b7a24]/5 text-[#3b7a24] flex items-center justify-center opacity-0 group-hover:opacity-100 group-hover:rotate-45 transition-all duration-500">
                    <ArrowUpRight className="w-4 h-4" />
                  </span>
                </div>
                
                <h3 className="font-display font-extrabold text-navy text-lg group-hover:text-[#3b7a24] transition-colors duration-300 leading-snug mb-3">
                  {card.label}
                </h3>
                
                <p className="text-navy/60 text-sm leading-relaxed font-medium">
                  {card.description}
                </p>
              </div>

              {/* Decorative accent blob */}
              <div className="absolute -bottom-6 -right-6 w-20 h-20 rounded-full bg-[#3b7a24]/5 group-hover:bg-[#3b7a24]/10 transition-colors duration-500 blur-xl pointer-events-none" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
