import React, { useEffect } from 'react';
import { CheckCircle2, AlertCircle, Clock, Activity, ShieldAlert, CalendarCheck, FileText, Download } from 'lucide-react';
import { gsap } from 'gsap';

export default function RadioIodineTherapyPage() {
  useEffect(() => {
    window.scrollTo(0, 0);
    const ctx = gsap.context(() => {
      gsap.from('h1, .w-24.h-1, section', {
        y: 0,
        opacity: 1,
        duration: 0,
        stagger: 0,
        ease: 'power3.out',
      });

      gsap.utils.toArray('li').forEach((el) => {
        gsap.from(el, {
          scrollTrigger: { trigger: el, start: 'top 92%' },
          y: 16,
          opacity: 0,
          duration: 0.5,
          ease: 'power2.out',
        });
      });
    });
    return () => ctx.revert();
  }, []);

  const postProcedure = [
    'Use private toilet facilities, if possible, and flush twice after each use.',
    'Bathe daily and wash hands frequently.',
    'Drink a normal amount of fluids.',
    'Use disposable eating utensils or wash your utensils separately from others.',
    'Sleep alone and avoid prolonged intimate contact with other persons. Brief periods of close contact, such as handshaking and hugging, are permitted.',
    'Launder your linens, towels, and clothes daily at home, separately. No special cleaning of the washing machine is required between loads.',
    'Do not prepare food for others that requires prolonged handling with bare hands.',
    'If you are breast-feeding, you must stop several days before to ensure that milk production has also stopped.',
    'You should avoid becoming pregnant from six months to one year after treatment.',
  ];

  const onTheDayItems = [
    'Carry all your relevant medical records, reports, film and/or CD of X-rays, CT, MRI, PET-CT or any other investigation done till date.',
    'Take along an adult attendant.',
    'Avoid children and pregnant women accompanying you.',
    'Wear loose and comfortable clothing and preferably carry an additional set.',
    'Do not wear any metallic objects, jewellery or valuables. Leave all such items at home or keep them with your attendant.',
    'You may be required to remain at our Centre for at least 4 hours from the scheduled time of appointment.',
  ];

  const procedureSteps = [
    'Registration and billing for the PET/CT.',
    'After registration you would be directed to a room where a small dosage of 18 F – FDG / Sodium Fluoride will be injected in your vein.',
    'You should avoid children and pregnant women accompanying you.',
    'After injection, you would be asked to quietly relax and rest in a separate room at our Centre for about an hour before you are taken up for the scan.',
    'During this resting period, unless recommended by our staff, no attendants or relatives would be permitted to stay with you in this separate waiting room.',
    'You are advised to stay calm, restrict physical movements and avoid talking to others while present in the room.',
    'You may be given oral contrast to drink. You will have to finish drinking it in around 30 minutes. This helps to get a better image quality. However, don\'t force yourself to drink it in case you are feeling nauseatic. You would be required to drink plenty of water after the injection and till you are in the waiting room.',
    'You should avoid children and pregnant women accompanying you.',
    'You will be asked to void (pass urine) before starting the scanning procedure. Take care to ensure that you don\'t spill urine on any of your body parts.',
    'You would be asked to lie down flat on your back on the bed of the PET-CT scanner and are expected to remain still during the entire scanning period of 15–20 minutes.',
    'Your body would pass through a dough-nut like structure for obtaining the scan. Please let us know if you are claustrophobic or anxious. You would be informed about the beginning and end of the scanning procedure by our staff.',
    'After the completion of the scanning, you will be asked to sit in another room for some time. The Nuclear staff in the mean time will evaluate your PET-CT images and if needed may repeat your whole body scan.',
    'Your PET-CT scan would be finally evaluated by our experienced Nuclear Medicine Physician.',
  ];

  const performedFor = [
    'Treatment of hyperthyroidism (overactive thyroid).',
    'Treatment of thyroid cancer (using high dose I-131).',
    'Ablation of residual thyroid tissue after surgical removal.',
    'Determine if thyroid cancer has returned after treatment.',
  ];

  return (
    <div className="bg-white min-h-screen pt-28 pb-20 lg:pt-36 lg:pb-28">
      <div className="max-w-7xl mx-auto px-4 lg:px-8">

        {/* Title */}
        <div className="text-center mb-20">
          <h1 className="font-display font-extrabold text-navy text-lg md:text-xl lg:text-2xl mb-6 max-w-2xl mx-auto">
            RADIO IODINE THERAPY
          </h1>
          <div className="w-24 h-1 bg-[#3b7a24] mx-auto rounded-full" />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-[2fr_3fr] gap-12 items-start">
          <div className="space-y-10">

            {/* Prerequisite */}
            <section>
              <div className="flex items-center gap-3 mb-6">
                <AlertCircle className="w-7 h-7 text-[#3b7a24]" />
                <h2 className="font-display font-bold text-navy text-lg md:text-xl">Prerequisites</h2>
              </div>
              <div className="ml-1 md:ml-3 space-y-3 text-navy text-[15px] leading-relaxed">
                <p>
                  Patient should not eat or drink after midnight on the day of the procedure.
                  If you have been taking anti-thyroid medications, you must stop at least three days
                  before the therapy is given. Frequently, the anti-thyroid medication is stopped for
                  five to seven days before therapy.
                </p>
                <p>
                  Radioactive Iodine I-131 (also called Radioiodine I-131) therapy is a treatment for
                  an overactive thyroid, a condition called hyperthyroidism. Radioactive Iodine I-131
                  may also be used to treat thyroid cancer.
                </p>
                <p>
                  <span className="font-semibold">Low dose</span> of iodine is used for hyperthyroidism.{' '}
                  <span className="font-semibold">High dose</span> used for thyroid cancer patients
                  requires admission after therapy.
                </p>
              </div>
            </section>

            <hr className="border-slate-100" />

            {/* Post Procedure */}
            <section>
              <div className="flex items-center gap-3 mb-6">
                <ShieldAlert className="w-7 h-7 text-[#3b7a24]" />
                <h2 className="font-display font-bold text-navy text-lg md:text-xl">Post Procedure</h2>
              </div>
              <ul className="space-y-4 ml-1 md:ml-3">
                {postProcedure.map((item, index) => (
                  <li data-reveal key={index} className="flex items-start gap-4">
                    <div className="w-2 h-2 rounded-full bg-[#3b7a24] mt-2.5 flex-shrink-0" />
                    <p className="text-navy text-[15px] leading-relaxed">{item}</p>
                  </li>
                ))}
              </ul>
            </section>

            <hr className="border-slate-100" />

            {/* Pre Requisite (On day) */}
            <section>
              <div className="flex items-center gap-3 mb-6">
                <FileText className="w-7 h-7 text-[#3b7a24]" />
                <h2 className="font-display font-bold text-navy text-lg md:text-xl">Pre Requisite</h2>
              </div>
              <div className="ml-1 md:ml-3 text-navy text-[15px] leading-relaxed space-y-3">
                <p>
                  You are requested to report one hour before the scheduled appointment time.
                  You should not eat and drink for at least 6 hours before your scheduled time
                  of appointment. You are, however, permitted to drink plain water, but should
                  strictly avoid coffee, tea, fruit juices, coconut water, prasad, chocolates,
                  and chewing gum.
                </p>
                <p>
                  You should not undertake any intense and strenuous physical activity or exercise
                  for 24 hours before the scan appointment.
                </p>
              </div>
            </section>

            <hr className="border-slate-100" />

            {/* On the Day of Scan */}
            <section>
              <div className="flex items-center gap-3 mb-6">
                <CalendarCheck className="w-7 h-7 text-[#3b7a24]" />
                <h2 className="font-display font-bold text-navy text-lg md:text-xl">On the Day of Scan</h2>
              </div>
              <ul className="space-y-4 ml-1 md:ml-3">
                {onTheDayItems.map((item, index) => (
                  <li data-reveal key={index} className="flex items-start gap-4">
                    <div className="w-2 h-2 rounded-full bg-[#3b7a24] mt-2.5 flex-shrink-0" />
                    <p className="text-navy text-[15px] leading-relaxed">{item}</p>
                  </li>
                ))}
              </ul>
            </section>

            <hr className="border-slate-100" />

            {/* Procedure */}
            <section>
              <div className="flex items-center gap-3 mb-6">
                <Clock className="w-7 h-7 text-[#3b7a24]" />
                <h2 className="font-display font-bold text-navy text-lg md:text-xl">Procedure</h2>
              </div>
              <ul className="space-y-5 ml-1 md:ml-3">
                {procedureSteps.map((step, index) => (
                  <li data-reveal key={index} className="flex items-start gap-4">
                    <span className="flex-shrink-0 w-6 h-6 rounded-full bg-[#3b7a24]/10 text-[#3b7a24] flex items-center justify-center font-bold text-[13px] mt-1">
                      {index + 1}
                    </span>
                    <p className="text-navy text-[15px] leading-relaxed">{step}</p>
                  </li>
                ))}
              </ul>
            </section>

            <hr className="border-slate-100" />

            {/* Performed For */}
            <section>
              <div className="flex items-center gap-3 mb-6">
                <Activity className="w-7 h-7 text-[#3b7a24]" />
                <h2 className="font-display font-bold text-navy text-lg md:text-xl">Radio Iodine Therapy is Performed For</h2>
              </div>
              <ul className="space-y-4 ml-1 md:ml-3">
                {performedFor.map((item, index) => (
                  <li data-reveal key={index} className="flex items-start gap-4">
                    <CheckCircle2 className="w-5 h-5 text-[#3b7a24] flex-shrink-0 mt-1" />
                    <p className="text-navy text-[15px] leading-relaxed">{item}</p>
                  </li>
                ))}
              </ul>
            </section>

          </div>

          {/* Right Column — Sticky PDF Viewer */}
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
