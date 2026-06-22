import React, { useEffect } from 'react';
import { AlertCircle, Clock, Activity, Timer, Download } from 'lucide-react';
import { gsap } from 'gsap';

export default function Gallium68OctreotideScanPage() {
  useEffect(() => {
    window.scrollTo(0, 0);
    const ctx = gsap.context(() => {
      gsap.from('h1, .w-24.h-1, section', {
        y: 0,
        opacity: 1,
        duration: 0,
        stagger: 0,
        ease: 'power3.out'
      });
      
      gsap.utils.toArray('li, .procedure-text, .time-text, .prerequisite-text, .technique-text').forEach((el) => {
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

  return (
    <div className="bg-white min-h-screen pt-28 pb-20 lg:pt-36 lg:pb-28">
      <div className="max-w-7xl mx-auto px-4 lg:px-8">
        
        {/* Title */}
        <div className="text-center mb-20">
          <h1 className="font-display font-extrabold text-navy text-xl md:text-2xl lg:text-3xl mb-4 max-w-3xl mx-auto uppercase">
            Gallium-68 OCTREOTIDE /DOTA/SOMATOSTATIN Scan
          </h1>
          <div className="w-24 h-1 bg-[#3b7a24] mx-auto rounded-full" />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-[2fr_3fr] gap-12 items-start">
          <div className="space-y-6">
          
          {/* Prerequisites */}
          <section>
            <div className="flex items-center gap-3 mb-6">
              <AlertCircle className="w-7 h-7 text-[#3b7a24]" />
              <h2 className="font-display font-bold text-navy text-lg md:text-xl">Prerequisites</h2>
            </div>
            <div className="ml-1 md:ml-3 prerequisite-text">
              <p className="text-navy text-[15px] leading-relaxed">
                No Prerequisite.
              </p>
            </div>
          </section>

          <hr className="border-slate-100" />

          {/* Time Required */}
          <section>
            <div className="flex items-center gap-3 mb-6">
              <Timer className="w-7 h-7 text-[#3b7a24]" />
              <h2 className="font-display font-bold text-navy text-lg md:text-xl">Time Required</h2>
            </div>
            <div className="ml-1 md:ml-3 time-text">
              <p className="text-navy text-[15px] leading-relaxed">
                Duration of the procedure: 1 - 2hr
              </p>
            </div>
          </section>

          <hr className="border-slate-100" />

          {/* Technique */}
          <section>
            <div className="flex items-center gap-3 mb-6">
              <Activity className="w-7 h-7 text-[#3b7a24]" />
              <h2 className="font-display font-bold text-navy text-lg md:text-xl">Technique</h2>
            </div>
            <div className="ml-1 md:ml-3 technique-text">
              <p className="text-navy text-[15px] leading-relaxed">
                DOTA studies are able to determine the extent of neuro endocrine tumor (NET) cancer and whether it has spread to the lymph nodes or other parts of the body, unlike traditional imaging technologies such as magnetic resonance imaging (MRI) and computed tomography (CT), which are often unable to detect the spread of NET cancer cells. Molecular imaging technologies help physicians select the most effective therapy for NET cancer, taking into account a tumor's unique molecular properties and whether the cancer is localized or diffuse, or spread out.
              </p>
            </div>
          </section>

          <hr className="border-slate-100" />

          {/* Procedure */}
          <section>
            <div className="flex items-center gap-3 mb-6">
              <Clock className="w-7 h-7 text-[#3b7a24]" />
              <h2 className="font-display font-bold text-navy text-lg md:text-xl">Procedure</h2>
            </div>
            <div className="ml-1 md:ml-3 procedure-text">
              <p className="text-navy text-[15px] leading-relaxed">
                The study involves a special molecule called a monoclonal antibody developed in a laboratory and designed to bind to the somastatin receptors. This antibody is paired with a radioactive material called 68-Gallium that can be detected by a PET CT camera. When injected into the patient's bloodstream, the radioactive antibody travels and attaches to cancer cells. The PET CT then produces three-dimensional images of the tumor and its location inside the body.
              </p>
            </div>
          </section>
          </div>

          {/* Right Column - PDF (60%) */}
          <div className="lg:sticky lg:top-32 lg:mt-8">
            <div className="bg-white p-3 sm:p-5 rounded-3xl border border-slate-100 shadow-[0_8px_30px_rgb(0,0,0,0.04)]">
              <div className="flex items-center justify-between mb-4 px-2">
                <h3 className="font-display font-bold text-navy text-lg">Related Documents</h3>
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
