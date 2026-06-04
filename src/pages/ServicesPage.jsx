import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import PageHeader from '../components/PageHeader';
import Process from '../components/Process';
import AppointmentCTA from '../components/AppointmentCTA';
import WhyChoose from '../components/WhyChoose';
import {
  ArrowRight,
  HeartPulse,
  Activity,
  Bone,
  ScanLine,
  Brain,
  Monitor,
  Droplet,
  Wind,
  ShieldPlus,
  Microscope,
  CheckCircle2,
  ShieldCheck,
  Heart
} from 'lucide-react';

const serviceData = [
  {
    title: "PET-CT IMAGING PROCEDURE(FDG)",
    description: "Detect cancer. Determine whether a cancer has spread in the body. Assess the effectiveness of a treatment plan, such as cancer therapy. Determine if a cancer has returned after treatment. Determine blood flow to the heart muscle.",
    image: "/services/PETCT.jpg",
    link: "/services/pet-ct-imaging"
  },
  {
    title: "THALLIUM SCAN",
    description: "Diagnosis of coronary artery disease. Prognosis of known coronary artery disease. Risk stratification in known or suspected CAD. Suspected restenosis after CABG. Evaluation of PTCA / stent, anti – angina drugs. Pre – operative cardiac risk assessment. Assessment of myocardial viability",
    image: "/services/Thallium scan.jpg",
    link: "/services/thallium-scan"
  },
  {
    title: "Bone Scans",
    description: "Screen for bone metastases in patient with malignancy. Infection (osteomyelitis vs. cellulitis). Evaluation of suspected fracture and stress fractures. Evaluation of avascular necrosis and vascularity of bone graft.",
    image: "/services/Bone Scans.jpg",
    link: "/services/bone-scan"
  },
  {
    title: "DTPA RENAL SCAN",
    description: "Evaluation of differential renal function. Evaluation of obstructive uropathy. Evaluation of unequal sized kidney / ? agenesis of kidney. Indirect radio nuclide cystography of VU reflux. Follow up renal transplantation.",
    image: "/services/DTPA RENAL SCAN.jpg",
    link: "/services/dtpa-renal-scan"
  },
  {
    title: "Thyroid Scans",
    description: "Determination of thyroid size, function and position. Evaluation of functional status of thyroid nodules. Differentiating Thyroiditis from Grave’s disease. Evaluation of Thyroid and neck masses. Quantitative thyroid uptake.",
    image: "/services/Thyroid Scans.jpg",
    link: "/services/thyroid-scan"
  },
  {
    title: "CAPTOPRIL RENAL SCAN",
    description: "Evaluation of reno – vascular hypertension.",
    image: "/services/Captopril Renal Scan.jpg",
    link: "/services/captopril-renal-scan"
  },
  {
    title: "COLLOID LIVER SCAN",
    description: "To assess hepatocellular dysfunction in diffuse liver disease. Suspected chronic liver disease (cirrhosis). Assess hepatic function in chronic alcoholics. Evaluation of splenomegaly.",
    image: "/services/Colloid liver scan.jpg",
    link: "/services/colloid-liver-scan"
  },
  {
    title: "MILK SCAN (GE REFLUX)",
    description: "Detection of GE reflux in infants having LRTI",
    image: "/services/MILK SCAN (GE REFLUX).jpg",
    link: "/services/milk-scan"
  },
  {
    title: "MUGA SCAN",
    description: "For assessing the patency of nasolacrymal duct in patients having epiphora",
    image: "/services/MUGA SCAN.jpg",
    link: "/services/muga-scan"
  },
  // {
  //   title: "Oncology Follow-Up",
  //   description: "Comprehensive imaging evaluations designed to monitor cancer treatment progress, detect recurrence, and guide ongoing patient management.",
  //   image: "/services/Oncology Follow-Up.jpg"
  // }
];

export default function ServicesPage() {
  return (
    <>
      <PageHeader
        title="Our Services"
        subtitle="We'll Help You Manage a Range of Conditions"
        image="/Images/servicesHero.jpg"
      />

      {/* Intro Section */}
      <section className="py-20 lg:py-28 bg-white">
        <div className="max-w-[1300px] mx-auto px-4 lg:px-8">
          <div className="max-w-5xl mx-auto">
            <div className="text-center mb-12">
              <div className="inline-flex items-center justify-center gap-2 text-[#3b7a24] font-display font-semibold mb-4">
                <span className="w-8 h-px bg-[#3b7a24]" />
                Advanced Nuclear Medicine Services
                <span className="w-8 h-px bg-[#3b7a24]" />
              </div>
              <h2 className="font-display font-extrabold text-navy text-xl md:text-2xl lg:text-3xl leading-tight">
                Advanced Nuclear Medicine for Accurate Diagnosis & Care
              </h2>
            </div>

            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-50px" }}
              variants={{
                visible: {
                  transition: {
                    staggerChildren: 0.15
                  }
                }
              }}
              className="space-y-6 text-navy/70 leading-relaxed text-base"
            >
              <motion.p variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0, transition: { duration: 0.5 } } }}>
                Nuclear Medicine is a medical speciality that uses small amounts of radioactive materials, known as radiopharmaceuticals, for diagnostic, therapeutic, purposes.
              </motion.p>
              <motion.p variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0, transition: { duration: 0.5 } } }}>
                These radiopharmaceuticals are specific for the organ, tumour or tissue desired to be studied. Once injected into a patient these radiopharmaceuticals localise
                in the area of interest, which is then imaged using a special camera. Highly simplified, it is something like taking an X-ray from the inside-out.
                Nuclear Medicine provides unique information about both structure and function of nearly every human organ. It is the ability to characterise and quantify
                physiologic function that makes nuclear medicine different from an X-ray / CT or MRI. As radiopharmaceuticals become more sophisticated, it is becoming possible to see inside of human beings at the molecular level.
              </motion.p>
              <motion.p variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0, transition: { duration: 0.5 } } }}>
                Nuclear medical procedures are safe, both for the patient and the physicians and technologist performing the tests.
                Patients experience little or no discomfort and do not require anaesthesia. Exposure to radioactivity is monitored closely, and kept well below safety limits.
                The radiation exposure is usually as much and often lower than the exposure produced by a similar radiological study such as CT.
              </motion.p>
            </motion.div>
          </div>
        </div>
      </section>



      {/* Services Grid */}
      <section className="py-12 lg:py-16 bg-[#f3f1fb]">
        <div className="max-w-[1400px] mx-auto px-4 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-10">
            <div className="inline-flex items-center gap-2 text-[#3b7a24] font-display font-semibold mb-3">
              <span className="w-8 h-px bg-[#3b7a24]" />
              Diagnostic Excellence
            </div>
            <h2 className="font-display font-extrabold text-navy text-3xl lg:text-4xl leading-tight mb-4">
              Nuclear Scan Services
            </h2>
            <p className="text-navy/70 text-base lg:text-lg">
              Our Nuclear Scan services provide detailed functional imaging for various organs and systems, helping clinicians make informed treatment decisions. We offer:
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-12">
            {serviceData.map((s, index) => (
              <div
                key={index}
                className="group bg-white rounded-[20px] overflow-hidden shadow-sm hover:shadow-xl transition-all duration-500 hover:-translate-y-2 flex flex-col h-full border border-slate-100 text-left"
              >
                {/* Image Section */}
                <div className="relative h-[200px] overflow-hidden bg-slate-50">
                  <img
                    src={process.env.PUBLIC_URL + s.image}
                    alt={s.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-navy/90 via-navy/50 to-navy/10 opacity-70 group-hover:opacity-100 transition-opacity duration-500 mix-blend-multiply" />
                  <div className="absolute bottom-4 left-4 right-4 flex justify-between items-end">
                    <div className="w-10 h-10 rounded-full bg-white/20 backdrop-blur-md border border-white/30 flex items-center justify-center text-white translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500 delay-100">
                      <ArrowRight className="w-4 h-4 -rotate-45" />
                    </div>
                  </div>
                </div>

                {/* Content Section */}
                <div className="p-6 flex flex-col flex-1">
                  <h3 className="font-display font-bold text-navy text-lg mb-2 group-hover:text-[#3b7a24] transition-colors duration-300">
                    {s.title}
                  </h3>
                  <p className="text-navy/70 leading-relaxed text-[13px] mb-4 flex-1">
                    {s.description}
                  </p>

                  <Link to={s.link || "/contact"} className="inline-flex items-center gap-2 text-[#3b7a24] font-display font-bold text-sm hover:text-navy transition-colors mt-auto w-fit group/btn">
                    Learn More
                    <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover/btn:translate-x-1.5" />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>


      {/* <Process /> */}
      {/* <WhyChoose />
      <AppointmentCTA /> */}
    </>
  );
}
