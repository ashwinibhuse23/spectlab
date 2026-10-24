import React, { useEffect, useState, useRef } from 'react';
import { useLocation, Link } from 'react-router-dom';
import { CheckCircle2, AlertCircle, Clock, Timer, Activity, Calendar, Languages } from 'lucide-react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { scansData } from '../data/scansData';
import { scansDataMarathi } from '../data/scansDataMarathi';
import SEO from '../components/SEO';
import PageHeader from '../components/PageHeader';

gsap.registerPlugin(ScrollTrigger);

export default function ScansPage() {
  const location = useLocation();
  const sectionRefs = useRef({});
  const [lang, setLang] = useState('en'); // 'en' | 'mr'
  const [cardLang, setCardLang] = useState({});

  useEffect(() => {
    if (location.hash) {
      const id = location.hash.replace('#', '');
      const scrollToTarget = () => {
        let element = document.getElementById(id);
        if (!element) {
          if (id === 'targeted-radionuclide-therapy' || id === 'radioiodine-therapy') {
            element = document.getElementById('high-dose-radioiodine-therapy');
          } else if (id.includes('mibg') && id.includes('therapy')) {
            element = document.getElementById('mibg-therapy');
          } else if (id.includes('dotatate') || id.includes('prrt')) {
            element = document.getElementById('lu177-dotatate-therapy');
          } else if (id.includes('lu177') || id.includes('psma')) {
            element = document.getElementById('lu177-psma-therapy');
          }
        }
        if (element) {
          const yOffset = -120;
          const y = element.getBoundingClientRect().top + window.pageYOffset + yOffset;
          window.scrollTo({ top: y, behavior: 'smooth' });
        }
      };

      const t1 = setTimeout(scrollToTarget, 150);
      const t2 = setTimeout(scrollToTarget, 550);
      return () => {
        clearTimeout(t1);
        clearTimeout(t2);
      };
    } else {
      window.scrollTo(0, 0);
    }
  }, [location]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.header-anim', {
        y: 30,
        opacity: 0,
        duration: 0.8,
        stagger: 0.1,
        ease: 'power3.out'
      });

      gsap.utils.toArray('.scan-section').forEach((section) => {
        gsap.from(section, {
          scrollTrigger: {
            trigger: section,
            start: 'top 85%'
          },
          y: 30,
          opacity: 0,
          duration: 0.6,
          ease: 'power2.out'
        });
      });
    });

    return () => {
      ctx.revert();
    };
  }, []);

  return (
    <>
      <SEO
        title={lang === 'mr' ? 'डायग्नोस्टिक स्कॅन्स आणि थेरपी मार्गदर्शक | स्पेक्ट लॅब पुणे' : 'Diagnostic Scans & Procedures Guide | Spect lab Nuclear Medicine Services'}
        description="Comprehensive guide to nuclear medicine scans at Spect lab Nuclear Medicine Services. Detailed prerequisites, procedure duration, clinical indications, and preparation guidelines for patients."
        keywords="nuclear scans Pune, scan preparations, DTPA scan, DMSA scan, bone scan procedure, PET scan preparation, Spect lab Nuclear Medicine Services"
        canonical="/services/scans"
      />
      <PageHeader
        title={lang === 'mr' ? 'न्यूक्लियर मेडिसिन स्कॅन्स' : 'Nuclear Medicine Scans'}
        subtitle={lang === 'mr' ? 'आमच्या सर्व प्रगत इमेजिंग आणि टार्गेटेड थेरपी सेवांची संपूर्ण माहिती व पूर्वतयारी.' : 'Explore our comprehensive range of specialized imaging and therapy services.'}
        image="/Images/servicesHero.png"
      />

      <div className="bg-[#f3f1fb] min-h-screen py-10 lg:py-14">
        <div className="max-w-[1100px] mx-auto px-4 lg:px-8">

          {/* ── Top Language Toggle Bar ── */}
          <div className="header-anim bg-white rounded-2xl p-4 sm:p-5 shadow-xs border border-slate-200 mb-8 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-[#3b7a24]/10 text-[#3b7a24] flex items-center justify-center font-bold shrink-0">
                <Languages className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-display font-bold text-[#0b1559] text-[15px] sm:text-base leading-tight">
                  {lang === 'en' ? 'Select Language / भाषा निवडा' : 'भाषा निवडा / Select Language'}
                </h3>
                <p className="text-[#0b1559]/60 text-xs mt-0.5">
                  {lang === 'en'
                    ? 'View all scan details, preparations, and indications in Marathi or English'
                    : 'सर्व स्कॅनची पूर्वतयारी, प्रक्रिया आणि उद्देश मराठी किंवा इंग्रजीमध्ये पहा'}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-1.5 bg-[#f3f1fb] p-1.5 rounded-xl border border-slate-200 shrink-0 self-start sm:self-auto">
              <button
                type="button"
                onClick={() => { setLang('en'); setCardLang({}); }}
                className={`px-4 py-2 rounded-lg text-xs font-display font-bold transition-all ${
                  lang === 'en'
                    ? 'bg-[#0b1559] text-white shadow-sm'
                    : 'text-[#0b1559]/70 hover:text-[#0b1559]'
                }`}
              >
                English
              </button>
              <button
                type="button"
                onClick={() => { setLang('mr'); setCardLang({}); }}
                className={`px-4 py-2 rounded-lg text-xs font-display font-bold transition-all ${
                  lang === 'mr'
                    ? 'bg-[#3b7a24] text-white shadow-sm'
                    : 'text-[#0b1559]/70 hover:text-[#3b7a24]'
                }`}
              >
                मराठी
              </button>
            </div>
          </div>

          <div className="w-full space-y-8 pb-24">
            {scansData.map((scan) => {
              const currentLang = cardLang[scan.id] || lang;
              const mrData = scansDataMarathi[scan.id];
              const title = currentLang === 'mr' && mrData?.title ? mrData.title : scan.title;
              const prerequisites = currentLang === 'mr' && mrData?.prerequisites ? mrData.prerequisites : scan.prerequisites;
              const timeRequired = currentLang === 'mr' && mrData?.timeRequired ? mrData.timeRequired : scan.timeRequired;
              const procedure = currentLang === 'mr' && mrData?.procedure ? mrData.procedure : scan.procedure;
              const indications = currentLang === 'mr' && mrData?.indications ? mrData.indications : scan.indications;

              return (
                <React.Fragment key={scan.id}>
                  {scan.aliases && scan.aliases.map((alias) => (
                    <span
                      key={alias}
                      id={alias}
                      className="scroll-mt-32 block -translate-y-28 invisible pointer-events-none"
                    />
                  ))}
                  <section
                    id={scan.id}
                    ref={el => sectionRefs.current[scan.id] = el}
                    className="scan-section bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden scroll-mt-32 w-full transition-all duration-300"
                  >
                    {/* Section Header */}
                    <div className="border-b border-slate-100 px-6 py-5 md:px-8 bg-gradient-to-r from-white to-slate-50 flex items-center justify-between gap-4 flex-wrap">
                      <h2 className="font-display font-extrabold text-[#0b1559] text-[18px] md:text-[22px] leading-tight">
                        {title}
                      </h2>

                      {/* Card-level language toggle */}
                      <div className="flex items-center gap-1 bg-[#f3f1fb] p-1 rounded-lg border border-slate-200 shrink-0 ml-auto">
                        <button
                          type="button"
                          onClick={() => setCardLang(prev => ({ ...prev, [scan.id]: 'en' }))}
                          className={`px-2.5 py-1 rounded text-[11px] font-display font-bold transition-all ${
                            currentLang === 'en'
                              ? 'bg-white text-[#0b1559] shadow-xs'
                              : 'text-[#0b1559]/50 hover:text-[#0b1559]'
                          }`}
                        >
                          EN
                        </button>
                        <button
                          type="button"
                          onClick={() => setCardLang(prev => ({ ...prev, [scan.id]: 'mr' }))}
                          className={`px-2.5 py-1 rounded text-[11px] font-display font-bold transition-all ${
                            currentLang === 'mr'
                              ? 'bg-[#3b7a24] text-white shadow-xs'
                              : 'text-[#0b1559]/50 hover:text-[#3b7a24]'
                          }`}
                        >
                          मराठी
                        </button>
                      </div>
                    </div>

                    <div className="p-6 md:p-8 grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">

                      {/* Left Column */}
                      <div className="space-y-6">
                        {prerequisites && (
                          <div>
                            <div className="flex items-center gap-2.5 mb-2.5">
                              <AlertCircle className="w-4 h-4 text-[#3b7a24]" />
                              <h3 className="font-display font-bold text-[#0b1559] text-[15px] uppercase tracking-wide">
                                {currentLang === 'mr' ? 'पूर्वअपेक्षित आणि पूर्वतयारी' : 'Prerequisites & Prep'}
                              </h3>
                            </div>
                            <p className="text-[#0b1559]/75 text-[13px] leading-relaxed pl-6 whitespace-pre-line">
                              {prerequisites}
                            </p>
                          </div>
                        )}

                        {timeRequired && (
                          <div>
                            <div className="flex items-center gap-2.5 mb-2.5">
                              <Timer className="w-4 h-4 text-[#3b7a24]" />
                              <h3 className="font-display font-bold text-[#0b1559] text-[15px] uppercase tracking-wide">
                                {currentLang === 'mr' ? 'आवश्यक वेळ' : 'Time Required'}
                              </h3>
                            </div>
                            <p className="text-[#0b1559]/75 text-[13px] leading-relaxed pl-6">
                              {timeRequired}
                            </p>
                          </div>
                        )}

                        {procedure && (
                          <div>
                            <div className="flex items-center gap-2.5 mb-2.5">
                              <Clock className="w-4 h-4 text-[#3b7a24]" />
                              <h3 className="font-display font-bold text-[#0b1559] text-[15px] uppercase tracking-wide">
                                {currentLang === 'mr' ? 'प्रक्रिया / कार्यपद्धत' : 'Procedure'}
                              </h3>
                            </div>
                            <p className="text-[#0b1559]/75 text-[13px] leading-relaxed pl-6">
                              {procedure}
                            </p>
                          </div>
                        )}
                      </div>

                      {/* Right Column */}
                      <div className="space-y-6 flex flex-col">
                        {indications && indications.length > 0 && (
                          <div className="bg-[#f3f1fb] rounded-xl p-5 border border-slate-100 flex-1">
                            <div className="flex items-center gap-2.5 mb-4">
                              <Activity className="w-4 h-4 text-[#3b7a24]" />
                              <h3 className="font-display font-bold text-[#0b1559] text-[15px] uppercase tracking-wide">
                                {currentLang === 'mr' ? 'उद्देश आणि लक्षणे' : 'Indications / Purpose'}
                              </h3>
                            </div>
                            <ul className="space-y-2.5">
                              {indications.map((ind, i) => (
                                <li key={i} className="flex items-start gap-2.5">
                                  <CheckCircle2 className="w-3.5 h-3.5 text-[#3b7a24] flex-shrink-0 mt-0.5" />
                                  <span className="text-[#0b1559]/75 text-[13px] leading-relaxed">{ind}</span>
                                </li>
                              ))}
                            </ul>
                          </div>
                        )}

                        {/* Book CTA */}
                        <div className="bg-[#0b1559] rounded-xl p-5 text-white shadow-md mt-4">
                          <h3 className="font-display font-bold text-[15px] mb-1.5">
                            {currentLang === 'mr' ? 'अपॉइंटमेंट बुक करण्यास तयार आहात?' : 'Ready to schedule?'}
                          </h3>
                          <p className="text-white/70 text-[12.5px] mb-4">
                            {currentLang === 'mr'
                              ? `स्पेक्ट लॅबमध्ये ${title} साठी आजच आपली अपॉइंटमेंट बुक करा.`
                              : `Book your appointment for ${scan.title} at Spectlabs today.`}
                          </p>
                          <Link
                            to="/appointment"
                            className="inline-flex items-center justify-center gap-2 w-full bg-[#3b7a24] text-white text-[13px] font-display font-bold py-2.5 px-4 rounded-lg hover:bg-white hover:text-[#0b1559] transition-colors"
                          >
                            <Calendar className="w-4 h-4" />
                            {currentLang === 'mr' ? 'अपॉइंटमेंट बुक करा' : 'Book Appointment'}
                          </Link>
                        </div>
                      </div>

                    </div>
                  </section>
                </React.Fragment>
              );
            })}
          </div>

        </div>
      </div>
    </>
  );
}
