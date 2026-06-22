import React, { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import PageHeader from '../components/PageHeader';
import { ArrowRight, Activity, Zap, Phone } from 'lucide-react';

/* ─────────────────────────────────────────────
   DATA
───────────────────────────────────────────── */
const nuclearServices = [

  {
    title: 'THYROID SCAN',
    description: 'Assessment of thyroid function, nodules, and conditions like hyperthyroidism.',
    image: '/services/Thyroid Scans_result.jpg',
    link: '/services/thyroid-scan',
  },

  {
    title: 'DTPA RENOGRAM (GLOMERULAR FUNCTION) / EC (MAG-3) RENOGRAM (GLOM+ TUBULAR FUNCTION)',
    description: 'Evaluation of kidney function and detects urinary obstruction or reflux.',
    image: '/services/DTPA RENAL SCAN_result.jpg',
    link: '/services/dtpa-renal-scan',
  },

  {
    title: 'DMSA RENAL SCAN (CORTICAL FUNCTION)',
    description: 'Diagnosis of acute pyelonephritis. Diagnosis of renal scarring.',
    image: '/services/DMSA RENAL SCAN_result.png',
    link: '/services/dmsa-renal-scan',
  },

  {
    title: 'BONE SCAN',
    description: 'Detection of bone metastases, infections, fractures, and other bone abnormalities.',
    image: '/services/Bone Scans_result.jpg',
    link: '/services/bone-scan',
  },
  {
    title: 'THALLIUM SCAN',
    description: 'Diagnosis of coronary artery disease. Evaluation of blood flow to the heart muscle.',
    image: '/services/THALLIUM SCAN_result.jpg',
    link: '/services/thallium-scan',
  },

  {
    title: "MECKEL'S DIVERTICULUM IMAGING",
    description: "Detection and localization of Meckel's diverticulum.",
    image: '/services/MECKEL\'S DIVERTICULUM IMAGING_result.png',
    link: '/services/meckels-diverticulum',
  },


    {
    title: 'MILK SCAN (GE REFLUX)',
    description: 'Detection of gastroesophageal reflux in infants.',
    image: '/services/MILK SCAN (GE REFLUX)_result.jpg',
    link: '/services/milk-scan',
  },


  
    {
    title: 'PARATHYROID SCAN',
    description: 'Evaluation of primary or secondary hyperparathyroidism.',
    image: '/services/PARATHYROID SCAN_result.png',
    link: '/services/parathyroid-scan',
  },


   {
    title: 'MUGA SCAN',
    description: 'Evaluation of heart function and ejection fraction.',
    image: '/services/MUGA SCAN_result.jpg',
    link: '/services/muga-scan',
  },

  {
    title: 'MIBG SCAN',
    description: 'Pheochromocytoma. Neuroblastoma. Testicular Scan. Lymphoscintigraphy.',
    image: '/services/MIBG SCAN_result.png',
    link: '/services/mibg-scan',
  },


  {
    title: 'DIRECT CYSTOGRAM',
    description: 'To rule out VU (Vesico-Ureteral) Reflux.',
    image: '/services/DIRECT CYSTOGRAM_result.png',
    link: '/services/direct-cystogram',
  },

  {
    title: 'RADIO IODINE THERAPY',
    description: 'Treatment for hyperthyroidism and thyroid cancer using Radioactive Iodine I-131.',
    image: '/services/RADIO IODINE THERAPY_result.png',
    link: '/services/radio-iodine-therapy',
  },

  {
    title: 'POST CAPTOPRIL RENOGRAM',
    description: 'Evaluation of renovascular hypertension and kidney asymmetry.',
    image: '/services/CAPTOPRIL RENAL SCAN_result.jpg',
    link: '/services/captopril-renal-scan',
  },


   {
    title: 'DACRYOSCINTIGRAPHY',
    description: 'For assessing the patency of nasolacrymal duct in patients having epiphora.',
    image: '/services/DACRYOSCINTIGRAPHY_result.png',
    link: '/services/dacryoscintigraphy',
  },

  {
    title: 'BRAIN SPECT (CEREBRAL PERFUSION SCAN)',
    description: "Alzheimer's disease. Differential diagnosis of various forms of dementia. Detection of epileptogenic foci.",
    image: '/services/BRAIN SPECT_result.png',
    link: '/services/brain-spect',
  },

  {
    title: 'LYMPHOSCINTIGRAPHY',
    description: 'Interdigital with no side or after effects.',
    image: '/services/LYMPHOSCINTIGRAPHY_result.png',
    link: '/services/lymphoscintigraphy',
  },


  {
    title: 'COLLOID LIVER SCAN',
    description: 'Assessment of liver size, function, and detection of diffuse liver diseases.',
    image: '/services/COLLOID LIVER SCAN_result.jpg',
    link: '/services/colloid-liver-scan',
  },


  {
    title: 'I-131 WHOLE BODY SCAN',
    description: 'Detection of residual thyroid tissue and local or distant mets after total thyroidectomy for Ca thyroid.',
    image: '/services/WHOLE BODY SCAN_result.png',
    link: '/services/whole-body-scan',
  },



  {
    title: 'RBC BLOOD POOL SCAN/GI BLEED SCAN',
    description: 'Liver hemangiomas. Detection and localization of gastrointestinal bleeding. ',
    image: '/services/RBC BLOOD_result.png',
    link: '/services/rbc-blood-pool-scan',
  },


   {
    title: 'HEPATOBILIARY SCINTIGRAPHY (HIDA SCAN)',
    description: 'Evaluation of suspected acute cholecystitis. Congenital abnormalities of biliary tract disorders.',
    image: '/services/Hepatobiliary_result.png',
    link: '/services/hida-scan',
  },

 
];

const petServices = [
  {
    title: 'PET-CT IMAGING (FDG)',
    description: 'Detects cancer, determines spread, and evaluates treatment response.',
    image: '/services/PETCT_result.jpg',
    link: '/services/pet-ct-imaging',
  },
  {
    title: 'Gallium-68 PSMA Scan',
    description: 'To detect occult prostate cancer.To determine its spread.',
    image: '/services/Gallium_result.png',
    link: '/services/gallium-68-psma-scan',
  },
  {
    title: 'Gallium-68 OCTREOTIDE /DOTA/SOMATOSTATIN Scan',
    description: 'nuclear medicine imaging study used to detect and evaluate neuroendocrine tumors that express somatostatin receptors.',
    image: '/services/OCTREOTIDE_result.png',
    link: '/services/gallium-68-octreotide-scan',
  },
  
];

/* ─────────────────────────────────────────────
   FADE-IN ON SCROLL HOOK
   Uses IntersectionObserver — no layout thrash
───────────────────────────────────────────── */
function useFadeIn(threshold = 0.15) {
  const ref = useRef(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.style.opacity = '1';
          el.style.transform = 'translateY(0)';
          obs.disconnect();
        }
      },
      { threshold }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [threshold]);
  return ref;
}

/* ─────────────────────────────────────────────
   SERVICE CARD
───────────────────────────────────────────── */
function ServiceCard({ service, index }) {
  return (
    <div
      className="bg-white rounded-2xl shadow-sm hover:shadow-xl border border-slate-100
                 group cursor-pointer overflow-hidden
                 flex flex-col will-change-transform"
      style={{
        opacity: 0,
        transform: 'translateY(20px)',
        transition: `opacity 0.45s ease ${index * 0.07}s,
                     transform 0.45s ease ${index * 0.07}s,
                     box-shadow 0.3s ease,
                     translate 0.3s ease`,
      }}
      ref={(el) => {
        if (!el) return;
        const obs = new IntersectionObserver(
          ([entry]) => {
            if (entry.isIntersecting) {
              el.style.opacity = '1';
              el.style.transform = 'translateY(0)';
              obs.disconnect();
            }
          },
          { threshold: 0.1 }
        );
        obs.observe(el);
      }}
    >
      {/* Image */}
      <div className="relative h-[200px] overflow-hidden bg-slate-100 flex-shrink-0">
        <img
          src={encodeURI(process.env.PUBLIC_URL + service.image)}
          alt={service.title}
          loading="lazy"
          decoding="async"
          className="w-full h-full object-cover transition-transform duration-500 ease-out group-hover:scale-105"
          onError={(e) => {
            e.target.onerror = null;
            e.target.src =
              'https://images.unsplash.com/photo-1559757175-5700dde675bc?w=400&h=200&fit=crop';
          }}
        />
        <div
          className="absolute inset-0 bg-gradient-to-t from-[#0b1559]/60 via-transparent to-transparent
                     opacity-0 group-hover:opacity-100 transition-opacity duration-300"
        />
      </div>

      {/* Body */}
      <div className="p-5 flex flex-col flex-1">
        <h3
          className="font-display font-extrabold text-[#0b1559] text-[14px] tracking-wider
                     uppercase mb-2 group-hover:text-[#3b7a24] transition-colors duration-300
                     leading-snug min-h-[36px]"
          style={{ fontWeight: 650 }}
        >
          {service.title}
        </h3>
        <p className="text-[#0b1559]/60 text-[14px] leading-relaxed mb-4 flex-1">
          {service.description}
        </p>
        <Link
          to={service.link || '/contact'}
          className="inline-flex items-center gap-1.5 text-[#3b7a24] font-display font-bold
                     text-[12.5px] hover:text-[#0b1559] transition-colors mt-auto w-fit group/btn"
        >
          Learn More
          <ArrowRight
            className="w-3.5 h-3.5 transition-transform duration-300 group-hover/btn:translate-x-1"
          />
        </Link>
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────────
   SERVICE SECTION BLOCK
 ───────────────────────────────────────────── */
function ServiceSection({ icon: Icon, title, subtitle, services }) {
  return (
    <div>
      <div className="flex items-center gap-3 mb-3">
        <div className="w-9 h-9 rounded-full bg-[#0b1559]/10 flex items-center justify-center flex-shrink-0">
          <Icon className="w-[18px] h-[18px] text-[#0b1559]" />
        </div>
        <div>
          <h3 className="font-display font-extrabold text-[#0b1559] text-[18px] leading-tight">
            {title}
          </h3>
          <p className="text-[#0b1559]/55 text-[14px] mt-0.5">{subtitle}</p>
        </div>
      </div>
      <div className="w-full h-px bg-slate-200 mb-7" />

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
        {services.map((s, i) => (
          <ServiceCard key={s.title} service={s} index={i} />
        ))}
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────────
   PAGE
───────────────────────────────────────────── */
export default function ServicesPage() {
  const [activeTab, setActiveTab] = useState('nuclear');

  const introRef = useFadeIn(0.1);

  const tabs = [
    { id: 'nuclear', label: 'Nuclear Scan Services', icon: Activity },
    { id: 'pet', label: 'PET CT Scan Services', icon: Zap },
  ];

  return (
    <>
      <PageHeader
        title="Our  Services"
        subtitle="We'll Help You Manage a Range of Conditions."
        image="/Images/servicesHero.jpg"
      />

      {/* ── Intro Section ── */}
      <section className="py-14 lg:py-20 bg-white">
        <div className="max-w-[1100px] mx-auto px-4 lg:px-8">

          {/* Heading */}
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center gap-2 text-[#3b7a24] font-display font-semibold text-sm mb-3">
              <span className="w-8 h-px bg-[#3b7a24]" />
              Advanced Nuclear Medicine Services
              <span className="w-8 h-px bg-[#3b7a24]" />
            </div>
            <h2 className="font-display font-extrabold text-[#0b1559] text-2xl md:text-3xl leading-tight">
              Advanced Nuclear Medicine for Accurate Diagnosis &amp; Care
            </h2>
          </div>

          {/* Paragraphs — smooth fade via IntersectionObserver, no framer glitch */}
          <div
            ref={introRef}
            className="space-y-5 text-[#0b1559]/70 leading-relaxed text-[12px]"
            style={{
              opacity: 0,
              transform: 'translateY(20px)',
              transition: 'opacity 0.6s ease, transform 0.6s ease',
            }}
          >
            <p>
              Nuclear Medicine is a medical speciality that uses small amounts of radioactive
              materials, known as radiopharmaceuticals, for diagnostic, therapeutic, purposes.
            </p>
            <p>
              These radiopharmaceuticals are specific for the organ, tumour or tissue desired to be studied. Once injected into a patient these radiopharmaceuticals localise in the area of interest, which is then imaged using a special camera. Highly simplified, it is something like taking an X-ray from the inside-out. Nuclear Medicine provides unique information about both structure and function of nearly every human organ. It is the ability to characterise and quantify physiologic function that makes nuclear medicine different from an X-ray / CT or MRI. As radiopharmaceuticals become more sophisticated, it is becoming possible to see inside of human beings at the molecular level.
            </p>
            <p>
              Nuclear medical procedures are safe, both for the patient and the physicians and technologist performing the tests. Patients experience little or no discomfort and do not require anaesthesia. Exposure to radioactivity is monitored closely, and kept well below safety limits. The radiation exposure is usually as much and often lower than the exposure produced by a similar radiological study such as CT.
            </p>
          </div>
        </div>
      </section>

      {/* ── Services Grid Section ── */}
      <section className="py-12 lg:py-16 bg-[#f3f1fb]">
        <div className="max-w-[1300px] mx-auto px-4 lg:px-8">

          {/* Header */}
          <div className="text-center max-w-xl mx-auto mb-8">
            <div className="inline-flex items-center gap-2 text-[#3b7a24] font-display font-semibold text-sm mb-2">
              <span className="w-8 h-px bg-[#3b7a24]" />
              Diagnostic Excellence
              <span className="w-8 h-px bg-[#3b7a24]" />
            </div>
            <h2 className="font-display font-extrabold text-[#0b1559] text-3xl leading-tight mb-2">
              Our Scan Services
            </h2>
            <p className="text-[#0b1559]/60 text-[16px] leading-relaxed">
              Advanced imaging for accurate diagnosis and better treatment decisions.
            </p>
          </div>

          {/* Tab Switcher */}
          <div className="flex justify-center mb-8">
            <div className="inline-flex bg-white rounded-full p-1 shadow-sm border border-slate-200 gap-1">
              {tabs.map(({ id, label, icon: Icon }) => (
                <button
                  key={id}
                  onClick={() => setActiveTab(id)}
                  className={`inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-[13px]
                    font-display font-semibold transition-all duration-300 ${activeTab === id
                      ? 'bg-[#0b1559] text-white shadow-md'
                      : 'text-[#0b1559]/65 hover:text-[#0b1559] hover:bg-slate-50'
                    }`}
                >
                  <Icon className="w-4 h-4" />
                  {label}
                </button>
              ))}
            </div>
          </div>

          {/* Tab Content
              — AnimatePresence with layout prop prevents height jump
              — No y movement on exit to avoid scroll jank                */}
          <AnimatePresence mode="wait" initial={false}>
            <motion.div
              key={activeTab}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2, ease: 'easeInOut' }}
            >
              {activeTab === 'nuclear' ? (
                <ServiceSection
                  icon={Activity}
                  title="Nuclear Scan Services"
                  subtitle="Specialized imaging using radioactive tracers to evaluate organ function and detect abnormalities."
                  services={nuclearServices}
                />
              ) : (
                <ServiceSection
                  icon={Zap}
                  title="PET CT Scan Services"
                  subtitle="Advanced imaging using PET technology to detect cancer, monitor treatment, and assess metabolic activity."
                  services={petServices}
                />
              )}
            </motion.div>
          </AnimatePresence>

          {/* Bottom CTA Banner */}
          <div
            className="mt-10 bg-[#0b1559] rounded-2xl px-8 py-5
                        flex flex-col sm:flex-row items-center justify-between gap-4"
          >
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center flex-shrink-0">
                <Phone className="w-5 h-5 text-white" />
              </div>
              <div>
                <p className="text-white font-display font-bold text-[15px] leading-tight">
                  Need Help Choosing the Right Scan?
                </p>
                <p className="text-white/60 text-[12.5px] mt-0.5">
                  Our experts are here to guide you to the best scan for accurate diagnosis and care.
                </p>
              </div>
            </div>
            <Link
              to="/contact"
              className="group flex-shrink-0 inline-flex items-center gap-2 bg-[#3b7a24] text-white text-sm font-display font-bold pl-5 pr-1.5 py-1.5 rounded-full hover:bg-[#0b1559] transition-colors duration-300"
            >
              CONTACT US
              <span className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center group-hover:rotate-45 transition-transform duration-300">
                <ArrowRight className="w-4 h-4" />
              </span>
            </Link>
          </div>

        </div>
      </section>
    </>
  );
}
