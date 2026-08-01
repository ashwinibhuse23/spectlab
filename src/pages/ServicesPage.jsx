import React, { useState, useRef, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import PageHeader from '../components/PageHeader';
import { ArrowRight, Activity, Zap, Phone, Heart, ChevronLeft, ChevronRight } from 'lucide-react';

/* ─────────────────────────────────────────────
   DATA
───────────────────────────────────────────── */
const nuclearServices = [
  {
    title: 'THYROID SCAN',
    description: 'Assessment of thyroid function, nodules, and conditions like hyperthyroidism.',
    image: '/services/Thyroid Scans_result.jpg',
    link: '/services/scans#thyroid-scan',
  },
  {
    title: 'DTPA / EC (MAG-3) RENOGRAM SCAN',
    description: 'Evaluation of renal blood flow, glomerular function & tubular drainage to detect urinary obstruction.',
    image: '/services/DTPA RENAL SCAN_result.jpg',
    link: '/services/scans#dtparenal-scan',
  },
  {
    title: 'DMSA RENAL SCAN (CORTICAL FUNCTION)',
    description: 'Diagnosis of acute pyelonephritis. Diagnosis of renal scarring.',
    image: '/services/DMSA RENAL SCAN_result.png',
    link: '/services/scans#dmsarenal-scan',
  },
  {
    title: 'BONE SCAN',
    description: 'Detection of bone metastases, infections, fractures, and other bone abnormalities.',
    image: '/services/Bone Scans_result.jpg',
    link: '/services/scans#bone-scan',
  },
  {
    title: 'THALLIUM SCAN',
    description: 'Diagnosis of coronary artery disease. Evaluation of blood flow to the heart muscle.',
    image: '/services/THALLIUM SCAN_result.jpg',
    link: '/services/scans#thallium-scan',
  },
  {
    title: "MECKEL'S DIVERTICULUM IMAGING",
    description: "Detection and localization of Meckel's diverticulum.",
    image: '/services/MECKEL\'S DIVERTICULUM IMAGING_result.png',
    link: '/services/scans#meckels-diverticulum',
  },
  {
    title: 'MILK SCAN (GE REFLUX)',
    description: 'Detection of gastroesophageal reflux in infants.',
    image: '/services/MILK SCAN (GE REFLUX)_result.jpg',
    link: '/services/scans#milk-scan',
  },
  {
    title: 'PARATHYROID SCAN',
    description: 'Evaluation of primary or secondary hyperparathyroidism.',
    image: '/services/PARATHYROID SCAN_result.png',
    link: '/services/scans#parathyroid-scan',
  },
  {
    title: 'MUGA SCAN',
    description: 'Evaluation of heart function and ejection fraction.',
    image: '/services/MUGA SCAN_result.jpg',
    link: '/services/scans#muga-scan',
  },
  {
    title: 'MIBG SCAN',
    description: 'Pheochromocytoma. Neuroblastoma. Testicular Scan. Lymphoscintigraphy.',
    image: '/services/MIBG SCAN_result.png',
    link: '/services/scans#mibg-scan',
  },
  {
    title: 'DIRECT CYSTOGRAM',
    description: 'To rule out VU (Vesico-Ureteral) Reflux.',
    image: '/services/DIRECT CYSTOGRAM_result.png',
    link: '/services/scans#direct-cystogram',
  },
  {
    title: 'RADIO IODINE THERAPY',
    description: 'Treatment for hyperthyroidism and thyroid cancer using Radioactive Iodine I-131.',
    image: '/services/RADIO IODINE THERAPY_result.png',
    link: '/services/scans#radioiodine-therapy',
  },
  {
    title: 'POST CAPTOPRIL RENOGRAM',
    description: 'Evaluation of renovascular hypertension and kidney asymmetry.',
    image: '/services/CAPTOPRIL RENAL SCAN_result.jpg',
    link: '/services/scans#captoprilrenal-scan',
  },
  {
    title: 'DACRYOSCINTIGRAPHY',
    description: 'For assessing the patency of nasolacrymal duct in patients having epiphora.',
    image: '/services/DACRYOSCINTIGRAPHY_result.png',
    link: '/services/scans#dacryoscintigraphy',
  },
  {
    title: 'BRAIN SPECT (CEREBRAL PERFUSION SCAN)',
    description: "Alzheimer's disease. Differential diagnosis of various forms of dementia. Detection of epileptogenic foci.",
    image: '/services/BRAIN SPECT_result.png',
    link: '/services/scans#brain-spect',
  },
  {
    title: 'LYMPHOSCINTIGRAPHY',
    description: 'Interdigital with no side or after effects.',
    image: '/services/LYMPHOSCINTIGRAPHY_result.png',
    link: '/services/scans#lymphoscintigraphy',
  },
  {
    title: 'COLLOID LIVER SCAN',
    description: 'Assessment of liver size, function, and detection of diffuse liver diseases.',
    image: '/services/COLLOID LIVER SCAN_result.jpg',
    link: '/services/scans#colloidliver-scan',
  },
  {
    title: 'I-131 WHOLE BODY SCAN',
    description: 'Detection of residual thyroid tissue and local or distant mets after total thyroidectomy for Ca thyroid.',
    image: '/services/WHOLE BODY SCAN_result.png',
    link: '/services/scans#wholebody-scan',
  },
  {
    title: 'RBC BLOOD POOL SCAN/GI BLEED SCAN',
    description: 'Liver hemangiomas. Detection and localization of gastrointestinal bleeding. ',
    image: '/services/RBC BLOOD_result.png',
    link: '/services/scans#rbcbloodpool-scan',
  },
  {
    title: 'HEPATOBILIARY SCINTIGRAPHY (HIDA SCAN)',
    description: 'Evaluation of suspected acute cholecystitis. Congenital abnormalities of biliary tract disorders.',
    image: '/services/Hepatobiliary_result.png',
    link: '/services/scans#hepatobiliary-scintigraphy',
  }
];

const petServices = [
  {
    title: 'PET-CT IMAGING (FDG)',
    description: 'Detects cancer, determines spread, and evaluates treatment response.',
    image: '/services/PETCT_result.jpg',
    link: '/services/scans#petct-imaging',
  },
  {
    title: 'Gallium-68 PSMA Scan',
    description: 'To detect occult prostate cancer. To determine its spread.',
    image: '/services/Gallium_result.png',
    link: '/services/scans#gallium68psma-scan',
  },
  {
    title: 'Gallium-68 OCTREOTIDE /DOTA/SOMATOSTATIN Scan',
    description: 'Nuclear medicine imaging study used to detect and evaluate neuroendocrine tumors that express somatostatin receptors.',
    image: '/services/OCTREOTIDE_result.png',
    link: '/services/scans#gallium68octreotide-scan',
  },
  {
    title: 'F-18 FDG PET CT Scan',
    description: 'Advanced high-resolution PET-CT imaging using F-18 FDG tracer for cancer detection, tumor staging, evaluating metabolic activity, and monitoring treatment response.',
    image: '/services/F-18.png',
    link: '/services/scans#f18-fdg-petct',
  },
  {
    title: 'Ga68 PSMA PET CT Scan',
    description: 'Targeted prostate-specific membrane antigen (PSMA) molecular imaging for highly accurate prostate cancer detection, nodal staging, and recurrence mapping.',
    image: '/services/Ga68.png',
    link: '/services/scans#ga68-psma-petct',
  },
  {
    title: 'Ga68 DOTA PET CT Scan',
    description: 'Somatostatin receptor PET CT study for precise localization, staging, and PRRT treatment candidacy evaluation in neuroendocrine tumors (NETs).',
    image: '/services/DOTA PET CT.png',
    link: '/services/scans#ga68-dota-petct',
  },
  {
    title: 'Cardiac PET Scan',
    description: 'Gold-standard myocardial perfusion and viability imaging to evaluate hibernating myocardium, coronary artery disease, and cardiac blood flow.',
    image: '/services/Cardiac.png',
    link: '/services/scans#cardiac-pet',
  },
  {
    title: 'FAPI PET CT Scan',
    description: 'Fibroblast Activation Protein Inhibitor (FAPI) PET CT targeting tumor stroma for enhanced visualization of epithelial carcinomas and complex solid tumors.',
    image: '/services/FAPI PET CT.png',
    link: '/services/scans#fapi-pet',
  },
  {
    title: 'F-18 FDOPA PET CT Scan',
    description: 'Specialized neuro-imaging tracer for evaluating parkinsonian movement disorders, brain gliomas, and neuroendocrine neoplasms.',
    image: '/services/F-18 FDOPA.png',
    link: '/services/scans#f18-fdopa-petct',
  },
  {
    title: 'Trivehexin PET CT Scan',
    description: 'Novel αvβ6-integrin targeted radiotracer providing breakthrough molecular imaging for pancreatic ductal adenocarcinoma and head & neck cancers.',
    image: '/services/Trivehexin PET CT.png',
    link: '/services/scans#trivehexin-pet',
  },
  {
    title: 'Exendin PET CT Scan',
    description: 'GLP-1 receptor-targeted PET imaging for precise localization of insulinomas and benign or malignant pancreatic islet cell tumors.',
    image: '/services/Exendin PET CT.png',
    link: '/services/scans#exendin-pet',
  },
  {
    title: 'Fusion PET MRI',
    description: 'State-of-the-art sequential multimodality PET-MRI fusion combining high soft-tissue contrast MRI with PET metabolic imaging for superior diagnostic accuracy.',
    image: '/services/Fusion PET MRI.png',
    link: '/services/scans#fusion-pet-mri',
  },
];

const therapyServices = [
  {
    title: 'TARGETED RADIONUCLIDE THERAPY',
    description: 'Precision treatment delivering radiation directly to cancer cells while minimizing damage to healthy tissue.',
    image: '/chemotherapy.jpg',
    link: '#',
  },
  {
    title: 'PEPTIDE RECEPTOR RADIONUCLIDE THERAPY (PRRT)',
    description: 'A highly targeted therapy used specifically to treat neuroendocrine tumors (NETs).',
    image: '/chemotherapy.jpg',
    link: '#',
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
   SERVICE CARD (Uniform Equal Height)
───────────────────────────────────────────── */
function ServiceCard({ service, index, isHighlighted }) {
  const cardId = service.title.replace(/\s+/g, '-').replace(/[^a-zA-Z0-9-]/g, '');
  return (
    <div
      id={cardId}
      className={`bg-white rounded-2xl shadow-sm hover:shadow-xl border transition-all duration-500
                 group cursor-pointer overflow-hidden
                 flex flex-col h-[410px] w-full will-change-transform ${
                   isHighlighted ? 'border-[#3b7a24] ring-4 ring-[#3b7a24]/30 shadow-2xl scale-[1.02]' : 'border-slate-100'
                 }`}
      style={{
        opacity: isHighlighted ? 1 : 0,
        transform: isHighlighted ? 'translateY(0)' : 'translateY(20px)',
        transition: `opacity 0.45s ease ${index * 0.07}s,
                     transform 0.45s ease ${index * 0.07}s,
                     box-shadow 0.3s ease,
                     border-color 0.3s ease`,
      }}
      ref={(el) => {
        if (!el) return;
        if (isHighlighted) {
          el.style.opacity = '1';
          el.style.transform = 'translateY(0)';
          return;
        }
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
      <div className="relative h-[190px] overflow-hidden bg-slate-100 flex-shrink-0 w-full">
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
      <div className="p-5 flex flex-col flex-1 justify-between">
        <div>
          <h3
            className="font-display font-extrabold text-[#0b1559] text-[13.5px] tracking-wider
                       uppercase mb-2 group-hover:text-[#3b7a24] transition-colors duration-300
                       leading-tight min-h-[40px] flex items-center line-clamp-2"
            style={{ fontWeight: 650 }}
          >
            {service.title}
          </h3>
          <p className="text-[#0b1559]/65 text-[13.5px] leading-relaxed line-clamp-3 overflow-hidden text-ellipsis">
            {service.description}
          </p>
        </div>
        <Link
          to={service.link || '/contact'}
          className="inline-flex items-center gap-1.5 text-[#3b7a24] font-display font-bold
                     text-[12.5px] hover:text-[#0b1559] transition-colors pt-2 mt-auto w-fit group/btn"
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
   SERVICE SECTION BLOCK (3-Card Automatic Slider)
 ───────────────────────────────────────────── */
function ServiceSection({ icon: Icon, title, subtitle, services, highlightedId }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const cardsPerView = 3;
  const maxIndex = Math.max(0, services.length - cardsPerView);

  // Auto-slide interval (slides every 4 seconds unless hovered)
  useEffect(() => {
    if (services.length <= cardsPerView || isPaused) return;

    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev < maxIndex ? prev + 1 : 0));
    }, 4000);

    return () => clearInterval(timer);
  }, [services.length, cardsPerView, maxIndex, isPaused]);

  useEffect(() => {
    if (highlightedId) {
      const foundIdx = services.findIndex(
        s => s.title.replace(/\s+/g, '-').replace(/[^a-zA-Z0-9-]/g, '') === highlightedId
      );
      if (foundIdx !== -1) {
        setCurrentIndex(Math.min(foundIdx, maxIndex));
      }
    }
  }, [highlightedId, services, maxIndex]);

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev > 0 ? prev - 1 : maxIndex));
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev < maxIndex ? prev + 1 : 0));
  };

  const totalPages = Math.ceil(services.length / cardsPerView);
  const activeDot = Math.floor(currentIndex / cardsPerView);

  return (
    <div
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      {/* Header & Controls */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-3">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-[#3b7a24]/10 flex items-center justify-center flex-shrink-0 text-[#3b7a24]">
            <Icon className="w-5 h-5" />
          </div>
          <div>
            <h3 className="font-display font-extrabold text-[#0b1559] text-[20px] leading-tight">
              {title}
            </h3>
            <p className="text-[#0b1559]/55 text-[14px] mt-0.5">{subtitle}</p>
          </div>
        </div>

        {/* Carousel Navigation Buttons & Autoplay status */}
        {services.length > cardsPerView && (
          <div className="flex items-center gap-3 self-end sm:self-center">
            <span className="text-xs font-semibold text-[#0b1559]/60 font-display">
              {currentIndex + 1} – {Math.min(currentIndex + cardsPerView, services.length)} of {services.length}
            </span>
            <div className="flex items-center gap-1.5">
              <button
                onClick={handlePrev}
                aria-label="Previous services"
                className="w-10 h-10 rounded-full border border-slate-200 bg-white text-[#0b1559]
                           hover:bg-[#3b7a24] hover:text-white hover:border-[#3b7a24] transition-all duration-300
                           flex items-center justify-center shadow-sm active:scale-95 cursor-pointer"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              <button
                onClick={handleNext}
                aria-label="Next services"
                className="w-10 h-10 rounded-full border border-slate-200 bg-white text-[#0b1559]
                           hover:bg-[#3b7a24] hover:text-white hover:border-[#3b7a24] transition-all duration-300
                           flex items-center justify-center shadow-sm active:scale-95 cursor-pointer"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>
          </div>
        )}
      </div>

      <div className="w-full h-px bg-slate-200 mb-6" />

      {/* Slider Viewport Container */}
      <div className="relative overflow-hidden py-2 px-1">
        <div
          className="flex transition-transform duration-500 ease-out gap-6"
          style={{
            transform: `translateX(calc(-${currentIndex * (100 / cardsPerView)}% - ${currentIndex * 8}px))`,
          }}
        >
          {services.map((s, i) => (
            <div
              key={s.title}
              className="w-full md:w-[calc(50%-12px)] lg:w-[calc(33.333%-16px)] flex-shrink-0 flex flex-col"
            >
              <ServiceCard
                service={s}
                index={i}
                isHighlighted={highlightedId === s.title.replace(/\s+/g, '-').replace(/[^a-zA-Z0-9-]/g, '')}
              />
            </div>
          ))}
        </div>
      </div>

      {/* Pagination Indicator Dots */}
      {totalPages > 1 && (
        <div className="flex justify-center items-center gap-2 mt-6">
          {Array.from({ length: totalPages }).map((_, idx) => (
            <button
              key={idx}
              onClick={() => setCurrentIndex(Math.min(idx * cardsPerView, maxIndex))}
              className={`h-2.5 rounded-full transition-all duration-300 cursor-pointer ${
                activeDot === idx ? 'w-8 bg-[#3b7a24]' : 'w-2.5 bg-slate-200 hover:bg-slate-300'
              }`}
              aria-label={`Go to slide page ${idx + 1}`}
            />
          ))}
        </div>
      )}
    </div>
  );
}

/* ─────────────────────────────────────────────
   PAGE
───────────────────────────────────────────── */
export default function ServicesPage() {
  const [activeTab, setActiveTab] = useState('nuclear');
  const [highlightedId, setHighlightedId] = useState(null);
  const location = useLocation();

  useEffect(() => {
    if (location.state?.targetTab) {
      setActiveTab(location.state.targetTab);
      const scrollToGrid = () => {
        const el = document.getElementById('services-grid');
        if (el) {
          const y = el.getBoundingClientRect().top + window.scrollY - 100;
          window.scrollTo({ top: y, behavior: 'smooth' });
        }
      };
      setTimeout(scrollToGrid, 200);
      setTimeout(scrollToGrid, 500);
    } else if (location.state?.targetScan) {
      const targetScanRaw = location.state.targetScan;
      const targetScan = targetScanRaw.toLowerCase();
      
      let matchedService = null;
      let matchedTab = 'nuclear';

      // 1. Search in petServices first
      const foundPet = petServices.find(s => 
        s.title.toLowerCase().includes(targetScan) || 
        targetScan.includes(s.title.toLowerCase()) ||
        s.title.toLowerCase().replace(/[^a-z0-9]/g, '').includes(targetScan.replace(/[^a-z0-9]/g, ''))
      );

      if (foundPet || targetScan.includes('pet') || targetScan.includes('fdg') || targetScan.includes('gallium') || targetScan.includes('psma') || targetScan.includes('dota') || targetScan.includes('cardiac') || targetScan.includes('fapi') || targetScan.includes('fdopa') || targetScan.includes('trivehexin') || targetScan.includes('exendine') || targetScan.includes('mri')) {
        matchedService = foundPet || petServices[0];
        matchedTab = 'pet';
      }
      // 2. Search in therapyServices
      else if (targetScan.includes('therapy') || targetScan.includes('prrt') || targetScan.includes('radionuclide')) {
        matchedService = therapyServices.find(s => s.title.toLowerCase().includes(targetScan) || targetScan.includes(s.title.toLowerCase())) || therapyServices[0];
        matchedTab = 'therapy';
      }
      // 3. Search in nuclearServices
      else {
        matchedService = nuclearServices.find(s => 
          s.title.toLowerCase().includes(targetScan) || targetScan.includes(s.title.toLowerCase())
        );
        if (matchedService) {
          matchedTab = 'nuclear';
        } else {
          matchedService = nuclearServices[0];
          matchedTab = 'nuclear';
        }
      }

      if (matchedService) {
        setActiveTab(matchedTab);
        const targetId = matchedService.title.replace(/\s+/g, '-').replace(/[^a-zA-Z0-9-]/g, '');
        setHighlightedId(targetId);

        // Attempt scrolling with retry loop to wait for Framer Motion tab render
        let attempts = 0;
        const scrollInterval = setInterval(() => {
          attempts++;
          const el = document.getElementById(targetId);
          if (el) {
            clearInterval(scrollInterval);
            const y = el.getBoundingClientRect().top + window.scrollY - 120;
            window.scrollTo({ top: Math.max(0, y), behavior: 'smooth' });
          } else if (attempts > 20) {
            clearInterval(scrollInterval);
          }
        }, 60);
      }
    }
  }, [location.state]);

  const introRef = useFadeIn(0.1);

  const tabs = [
    { id: 'nuclear', label: 'Nuclear Scan Services', icon: Activity },
    { id: 'pet', label: 'PET CT Scan Services', icon: Zap },
    { id: 'therapy', label: 'Therapy Services', icon: Heart },
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
      <section id="services-grid" className="py-12 lg:py-16 bg-[#f3f1fb]">
        <div className="max-w-[1300px] mx-auto px-4 lg:px-8">

          {/* Header */}
          <div className="text-center max-w-xl mx-auto mb-8">
            <div className="inline-flex items-center gap-2 text-[#3b7a24] font-display font-semibold text-sm mb-2">
              <span className="w-8 h-px bg-[#3b7a24]" />
              Diagnostic Excellence
              <span className="w-8 h-px bg-[#3b7a24]" />
            </div>
            <h2 className="font-display font-extrabold text-[#0b1559] text-3xl leading-tight mb-2">
              Our Services
            </h2>
            <p className="text-[#0b1559]/60 text-[16px] leading-relaxed">
              Advanced imaging for accurate diagnosis and better treatment decisions.
            </p>
          </div>

          {/* Tab Switcher */}
          <div className="flex justify-center mb-8 px-4 w-full">
            <div className="inline-flex bg-white rounded-full p-1 shadow-sm border border-slate-200 gap-1 overflow-x-auto no-scrollbar max-w-full" style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}>
              {tabs.map(({ id, label, icon: Icon }) => (
                <button
                  key={id}
                  onClick={() => setActiveTab(id)}
                  className={`whitespace-nowrap inline-flex flex-shrink-0 items-center gap-2 px-4 sm:px-5 py-2.5 rounded-full text-[13px]
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
                  highlightedId={highlightedId}
                />
              ) : activeTab === 'pet' ? (
                <ServiceSection
                  icon={Zap}
                  title="PET CT Scan Services"
                  subtitle="Advanced imaging using PET technology to detect cancer, monitor treatment, and assess metabolic activity."
                  services={petServices}
                  highlightedId={highlightedId}
                />
              ) : (
                <ServiceSection
                  icon={Heart}
                  title="Therapy Services"
                  subtitle="Targeted radionuclide therapies delivering precision treatment directly to cellular targets with minimal side effects."
                  services={therapyServices}
                  highlightedId={highlightedId}
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
