import React, { useEffect } from 'react';
import { CheckCircle2, AlertCircle, Clock, Activity, Timer, Download } from 'lucide-react';
import { gsap } from 'gsap';

export default function ThalliumScanPage() {
  useEffect(() => {
    window.scrollTo(0, 0);
    const ctx = gsap.context(() => {
      gsap.from('h1, .w-24.h-1, section', {
        y: 30,
        opacity: 0,
        duration: 0.8,
        stagger: 0.15,
        ease: 'power3.out'
      });
      
      gsap.utils.toArray('li').forEach((el) => {
        gsap.from(el, {
          scrollTrigger: {
            trigger: el,
            start: "top 90%"
          },
          y: 20,
          opacity: 0,
          duration: 0.5,
          ease: 'power2.out'
        });
      });
    });
    return () => ctx.revert();
  }, []);

  const prerequisites = [
    "Off beta blockers 48 prior the study.",
    "4hrs fasting.",
    "No medication on the day of scan."
  ];

  const procedureSteps = [
    "Patient has to undergo physiological / pharmacological stress.",
    "99mTc Sestamibi is injected when patient achieves 85% THR.",
    "45 mins post injection scan is performed.",
    "Almost after 1hour 99mTc Sestamibi is again injected to the patient in the resting position (SOS post nitrate).",
    "45 mins post injection scan is performed."
  ];

  const indications = [
    "Diagnosis of coronary artery disease.",
    "Prognosis of known coronary artery disease.",
    "Risk stratification in known or suspected CAD.",
    "Suspected restenosis after CABG.",
    "Evaluation of PTCA / stent, anti – angina drugs.",
    "Pre – operative cardiac risk assessment.",
    "Assessment of myocardial viability."
  ];

  return (
    <div className="bg-white min-h-screen pt-28 pb-20 lg:pt-36 lg:pb-28">
      <div className="max-w-7xl mx-auto px-4 lg:px-8">
        
        {/* Title */}
        <div className="text-center mb-20">
          <h1 className="font-display font-extrabold text-navy text-xl md:text-2xl lg:text-3xl mb-6 flex flex-col gap-3 max-w-2xl mx-auto">
            <span>STRESS & REST MYOCARDIAL PERFUSION</span>
            <span>IMAGING (THALLIUM SCAN)</span>
          </h1>
          <div className="w-24 h-1 bg-[#3b7a24] mx-auto rounded-full" />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-[2fr_3fr] gap-12 items-start">
          <div className="space-y-10">
          
          {/* Prerequisites */}
          <section>
            <div className="flex items-center gap-3 mb-6">
              <AlertCircle className="w-7 h-7 text-[#3b7a24]" />
              <h2 className="font-display font-bold text-navy text-xl md:text-2xl">Prerequisites</h2>
            </div>
            <ul className="space-y-4 ml-1 md:ml-3">
              {prerequisites.map((item, index) => (
                <li data-reveal key={index} className="flex items-start gap-4">
                  <div className="w-2 h-2 rounded-full bg-[#3b7a24] mt-2.5 flex-shrink-0" />
                  <p className="text-navy text-[17px] leading-relaxed">{item}</p>
                </li>
              ))}
            </ul>
          </section>

          <hr className="border-slate-100" />

          {/* Time Required */}
          <section>
            <div className="flex items-center gap-3 mb-6">
              <Timer className="w-7 h-7 text-[#3b7a24]" />
              <h2 className="font-display font-bold text-navy text-xl md:text-2xl">Time Required</h2>
            </div>
            <div className="ml-1 md:ml-3">
              <p className="text-navy text-[17px] leading-relaxed">
                Scan Time 30 – 45 minutes.
              </p>
            </div>
          </section>

          <hr className="border-slate-100" />

          {/* Procedure */}
          <section>
            <div className="flex items-center gap-3 mb-6">
              <Clock className="w-7 h-7 text-[#3b7a24]" />
              <h2 className="font-display font-bold text-navy text-xl md:text-2xl">Procedure</h2>
            </div>
            <ul className="space-y-5 ml-1 md:ml-3">
              {procedureSteps.map((step, index) => (
                <li data-reveal key={index} className="flex items-start gap-4">
                  <span className="flex-shrink-0 w-6 h-6 rounded-full bg-[#3b7a24]/10 text-[#3b7a24] flex items-center justify-center font-bold text-[13px] mt-1">
                    {index + 1}
                  </span>
                  <p className="text-navy text-[17px] leading-relaxed">{step}</p>
                </li>
              ))}
            </ul>
          </section>

          <hr className="border-slate-100" />

          {/* Indications */}
          <section>
            <div className="flex items-center gap-3 mb-6">
              <Activity className="w-7 h-7 text-[#3b7a24]" />
              <h2 className="font-display font-bold text-navy text-xl md:text-2xl">Indications</h2>
            </div>
            <ul className="space-y-4 ml-1 md:ml-3">
              {indications.map((item, index) => (
                <li data-reveal key={index} className="flex items-start gap-4">
                  <CheckCircle2 className="w-5 h-5 text-[#3b7a24] flex-shrink-0 mt-1" />
                  <p className="text-navy text-[17px] leading-relaxed">{item}</p>
                </li>
              ))}
            </ul>
          </section>
          </div>

          {/* Right Column - PDF (60%) */}
          <div className="lg:sticky lg:top-32 lg:mt-8">
            <div className="bg-white p-3 sm:p-5 rounded-3xl border border-slate-100 shadow-[0_8px_30px_rgb(0,0,0,0.04)]">
              <div className="flex items-center justify-between mb-4 px-2">
                <h3 className="font-display font-bold text-navy text-xl">Related Documents</h3>
                <a
                  href="/pdf/Spectlab_Services.pdf"
                  download
                  className="flex items-center gap-2 text-[#3b7a24] text-sm font-semibold hover:text-[#2d5f1a] transition-colors bg-[#3b7a24]/10 hover:bg-[#3b7a24]/20 py-2 px-4 rounded-full"
                  title="Download Document"
                >
                  <Download className="w-4 h-4" />
                  <span className="hidden sm:inline">Download</span>
                </a>
              </div>

              <div className="h-[75vh] min-h-[600px] w-full bg-[#f8f9fa] rounded-2xl border border-slate-100 overflow-hidden shadow-inner relative">
                <iframe
                  src="/pdf/Spectlab_Services.pdf#toolbar=0&view=FitH"
                  title="Spectlab Services PDF"
                  className="w-full h-full absolute inset-0"
                />
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
