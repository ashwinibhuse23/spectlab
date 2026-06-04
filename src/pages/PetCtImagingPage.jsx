import React, { useEffect } from 'react';
import { CheckCircle2, AlertCircle, Clock, Activity, Download } from 'lucide-react';
import { gsap } from 'gsap';

export default function PetCtImagingPage() {
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

  const procedureSteps = [
    "You would be then directed to a room where a small dosage of 18 F – FDG / Sodium Fluoride will be injected in your vein.",
    "After injection, you would be asked to quietly relax and rest in a separate room at our Centre for about an hour before you are taken up for the scan.",
    "During this resting period, unless recommended by our staff, no attendants or relatives would be permitted to stay with you in this separate waiting room.",
    "You are advised to stay calm, restrict physical movements and avoid talking to others while present in the room.",
    "In case you feel any vomiting sensation or giddiness, inform the staff immediately by pressing the call bell.",
    "You may be given oral contrast to drink. You will have to finish drinking it in around 30 minutes. This helps to get a better image quality. However, don't force yourself to drink it in case you are feeling nauseatic. You would be required to drink plenty of water after the injection and till you are in the waiting room.",
    "You will be asked to void (pass urine) before starting the scanning procedure. Take care to ensure that you don't spill urine on any of your body parts.",
    "You would be asked to lie down flat on your back on the bed of the PET-CT scanner and are expected to remain still during the entire scanning period of 15-20 minutes.",
    "Your body would pass through a dough-nut like structure for obtaining the scan. Please let us know if you are claustrophobic or anxious.",
    "You would be informed about the beginning and end of the scanning procedure by our staff.",
    "After the completion of the scanning, you will be asked to sit in another room for some time. The Nuclear staff in the mean time will evaluate your PET-CT images and if needed may repeat your whole body scan.",
    "Your PET-CT scan would be finally evaluated by our experienced Nuclear Medicine Physician."
  ];

  const indications = [
    "Detect cancer.",
    "Determine whether a cancer has spread in the body.",
    "Assess the effectiveness of a treatment plan, such as cancer therapy.",
    "Determine if a cancer has returned after treatment.",
    "Determine blood flow to the heart muscle."
  ];

  return (
    <div className="bg-white min-h-screen pt-28 pb-20 lg:pt-36 lg:pb-28">
      <div className="max-w-7xl mx-auto px-4 lg:px-8">

        {/* Title */}
        <div className="text-center mb-20">
          <h1 className="font-display font-extrabold text-navy text-2xl md:text-3xl lg:text-4xl mb-4">
            PET-CT IMAGING PROCEDURE (FDG)
          </h1>
          <div className="w-24 h-1 bg-[#3b7a24] mx-auto rounded-full" />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-[2fr_3fr] gap-12 items-start">

          {/* Left Column - Information (40%) */}
          <div className="space-y-10">

            {/* Prerequisites */}
            <section>
              <div className="flex items-center gap-3 mb-6">
                <AlertCircle className="w-7 h-7 text-[#3b7a24]" />
                <h2 className="font-display font-bold text-navy text-xl md:text-2xl">Prerequisites</h2>
              </div>
              <ul className="space-y-4 ml-1 md:ml-3">
                <li data-reveal className="flex items-start gap-4">
                  <div className="w-2 h-2 rounded-full bg-[#3b7a24] mt-2.5 flex-shrink-0" />
                  <p className="text-navy text-[17px] leading-relaxed">6 hours of fasting.</p>
                </li>
                <li data-reveal className="flex items-start gap-4">
                  <div className="w-2 h-2 rounded-full bg-[#3b7a24] mt-2.5 flex-shrink-0" />
                  <p className="text-navy text-[17px] leading-relaxed">Blood sugar level below 200mg/dl.</p>
                </li>
              </ul>
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
                <h2 className="font-display font-bold text-navy text-xl md:text-2xl">PET and PET/CT Scans are performed to:</h2>
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
