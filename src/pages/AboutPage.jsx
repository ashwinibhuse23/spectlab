import React, { useState } from 'react';
import PageHeader from '../components/PageHeader';
import AppointmentCTA from '../components/AppointmentCTA';
import { Award, Heart, Microscope, ShieldCheck, Users, Clock, Check, Activity, Monitor } from 'lucide-react';
import { motion } from 'framer-motion';

const containerVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.15 }
  }
};




// jhk



const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6 } }
};

export default function AboutPage() {
  const [vmLang, setVmLang] = useState('en');
  return (
    <>
      <PageHeader
        title="About SPECT LAB"
        subtitle="Caring for You Starts with Who We Are"
        description={
          <>
            Delivering Excellence in Nuclear Medicine, PET-CT
            <br />
            and SPECT-CT Imaging Since 2001
          </>
        }
        image="/Images/aboutHero.png"
        bgPosition="center 40%"
      />

      {/* Our Story Section */}
      <section className="pt-11 pb-16 lg:pt-20 lg:pb-24 bg-white overflow-hidden">
        <div className="max-w-[1400px] mx-auto px-4 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8 }}
            className="max-w-4xl mx-auto text-center"
          >
            <div className="inline-flex items-center gap-3 text-[#3b7a24] font-display font-semibold mb-4 text-sm sm:text-base">
              <span className="w-8 sm:w-12 h-px bg-[#3b7a24]" />
              Our Story
              <span className="w-8 sm:w-12 h-px bg-[#3b7a24]" />
            </div>
            <h2 className="font-display font-extrabold text-[#0e1a6b] text-3xl md:text-4xl lg:text-[40px] leading-[1.2] mb-8 lg:mb-10">
              Trusted Excellence in Diagnostic Imaging
            </h2>
            <div className="space-y-6 text-[#0e1a6b]/85 text-[16px] md:text-[18px] leading-[1.8] text-center md:text-justify">
              <p>
                SPECT LAB is a proprietary organization started in the year 2001 by Dr. Shrikant Solav who holds a post graduate degree in medicine and nuclear medicine. Initially, there was single equipment and a team of three technologists to support the work.
                In the year 2004, there was an addition of a second Gamma camera to the clinic.
              </p>

              <p>
                In the year 2006 there was introduction of a satellite unit of SPECT Lab in KEM Hospital, Pune which was subsequently closed. The first PET CT facility in Pune was introduced in SPECT LAB in 2007.
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── Vision, Mission & Values ── */}
      {(() => {
        const cards = [
          {
            key: 'vision',
            labelEn: 'Vision', labelMr: 'व्हिजन',
            accentColor: '#0e1a6b',
            iconBg: 'linear-gradient(135deg, #0e1a6b 0%, #1a2d8f 100%)',
            labelBarColor: '#3b7a24',
            icon: (
              <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.6}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.964-7.178z" />
                <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
            ),
            pointsEn: [
              'To provide compassionate nuclear medicine services to the referred patients.',
              'To keep up with academic excellence in the field of nuclear medicine.',
              'To take care of working members as well as create a friendly working atmosphere.',
            ],
            pointsMr: [
              'संदर्भित रुग्णांना करुणामय न्यूक्लियर मेडिसिन सेवा प्रदान करणे.',
              'न्यूक्लियर मेडिसिन क्षेत्रात शैक्षणिक उत्कृष्टता राखणे.',
              'कार्यरत सदस्यांची काळजी घेणे तसेच कामकाजासाठी अनुकूल वातावरण निर्माण करणे.',
            ],
          },
          {
            key: 'mission',
            labelEn: 'Mission', labelMr: 'मिशन',
            accentColor: '#3b7a24',
            iconBg: 'linear-gradient(135deg, #3b7a24 0%, #2d5e1a 100%)',
            labelBarColor: '#0e1a6b',
            icon: (
              <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.6}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            ),
            pointsEn: [
              'To upgrade quality of equipments from time to time.',
              'To create motivational working environment for team members.',
              'To provide best possible standards of care to patients in the field of Nuclear Medicine.',
            ],
            pointsMr: [
              'उपकरणांची गुणवत्ता वेळोवेळी सुधारणे.',
              'कार्यसंघ सदस्यांसाठी प्रेरणादायी कार्य वातावरण तयार करणे.',
              'न्यूक्लियर मेडिसिनच्या क्षेत्रातील रुग्णांना काळजीचे सर्वोत्तम मानक प्रदान करणे.',
            ],
          },
          {
            key: 'values',
            labelEn: 'Values', labelMr: 'मूल्ये',
            accentColor: '#b45309',
            iconBg: 'linear-gradient(135deg, #b45309 0%, #92400e 100%)',
            labelBarColor: '#b45309',
            icon: (
              <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.6}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z" />
              </svg>
            ),
            pointsEn: [
              'To build a team that believes in extending compassionate patient care.',
              'To maintain transparency in billing system as well as on the scientific front.',
              "To keep the patient's interest foremost.",
            ],
            pointsMr: [
              'रुग्णांची काळजी घेण्यावर विश्वास ठेवणारा संघ तयार करणे.',
              'बिलिंग प्रणालीमध्ये तसेच वैज्ञानिक आघाडीवर पारदर्शकता राखणे.',
              'रुग्णाचे हित सर्वोपरि ठेवणे.',
            ],
          },
        ];
        return (
          <section className="pt-2 pb-8 lg:pt-4 lg:pb-12 bg-[#f3f1fb] overflow-hidden">
            <div className="max-w-[1400px] mx-auto px-4 lg:px-8">
              {/* Header + toggle */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="text-center mb-8"
              >
                <div className="inline-flex items-center gap-2 text-[#3b7a24] font-display font-semibold mb-3 text-xs uppercase tracking-wider">
                  <span className="w-6 sm:w-10 h-px bg-[#3b7a24]" />
                  Our Purpose
                  <span className="w-6 sm:w-10 h-px bg-[#3b7a24]" />
                </div>
                <h2 className="font-display font-extrabold text-[#0e1a6b] text-xl md:text-2xl lg:text-3xl leading-tight mb-4">
                  Vision, Mission &amp; Values
                </h2>
                {/* Language toggle */}
                <div className="inline-flex items-center gap-1 bg-white border border-slate-200 rounded-full p-1 shadow-sm">
                  <button
                    onClick={() => setVmLang('en')}
                    className={`px-4 py-1.5 rounded-full text-xs font-semibold transition-all duration-200 ${vmLang === 'en' ? 'bg-[#0e1a6b] text-white shadow' : 'text-slate-500 hover:text-slate-700'
                      }`}
                  >English</button>
                  <button
                    onClick={() => setVmLang('mr')}
                    className={`px-4 py-1.5 rounded-full text-xs font-semibold transition-all duration-200 ${vmLang === 'mr' ? 'bg-[#0e1a6b] text-white shadow' : 'text-slate-500 hover:text-slate-700'
                      }`}
                  >मराठी</button>
                </div>
              </motion.div>

              {/* Cards grid */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                {cards.map((card, idx) => (
                  <motion.div
                    key={card.key}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: '-60px' }}
                    transition={{ duration: 0.6, delay: idx * 0.12 }}
                    className="relative bg-white rounded-2xl p-6 overflow-hidden soft-shadow group"
                  >
                    {/* Decorative bg circle */}
                    <div
                      className="absolute -top-6 -right-6 w-28 h-28 rounded-full opacity-[0.06] group-hover:scale-110 transition-transform duration-500"
                      style={{ background: card.accentColor }}
                    />
                    {/* Icon */}
                    <div className="relative mb-3 w-10 h-10 rounded-lg flex items-center justify-center" style={{ background: card.iconBg }}>
                      {card.icon}
                    </div>
                    {/* Label */}
                    <div className="inline-flex items-center gap-1.5 mb-2">
                      <span className="w-4 h-[2px] rounded-full" style={{ background: card.labelBarColor }} />
                      <span className="font-display font-bold text-sm uppercase tracking-widest" style={{ color: card.labelBarColor }}>
                        {vmLang === 'en' ? card.labelEn : card.labelMr}
                      </span>
                    </div>
                    {/* Bullet points */}
                    <ul className="space-y-2">
                      {(vmLang === 'en' ? card.pointsEn : card.pointsMr).map((pt, i) => (
                        <li key={i} className="flex items-start gap-2 text-[#0e1a6b]/70 text-sm leading-relaxed">
                          <span className="mt-1.5 w-1.5 h-1.5 rounded-full shrink-0" style={{ background: card.accentColor }} />
                          {pt}
                        </li>
                      ))}
                    </ul>
                    {/* Hover bottom bar */}
                    <div
                      className="absolute bottom-0 left-5 right-5 h-[2px] rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-400"
                      style={{ background: `linear-gradient(90deg, ${card.accentColor}, ${card.labelBarColor})` }}
                    />
                  </motion.div>
                ))}
              </div>
            </div>
          </section>
        );
      })()}


     
    

      {/* ── Dr. Shrikant V. Solav – About Section ── */}
      <section className="pt-14 sm:pt-18 lg:pt-20 pb-12 sm:pb-16 lg:pb-20 bg-[#f3f1fb] overflow-hidden">
        <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">

          {/* ── Section header ── */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-8 sm:mb-10"
          >
            <div className="inline-flex items-center gap-2 text-[#3b7a24] font-display font-semibold mb-2.5 text-xs sm:text-[13px] uppercase tracking-wider">
              <span className="w-6 sm:w-10 h-px bg-[#3b7a24]" />
              Meet the Expert
              <span className="w-6 sm:w-10 h-px bg-[#3b7a24]" />
            </div>
            <h2 className="font-display font-extrabold text-[#0e1a6b] text-2xl sm:text-[28px] lg:text-[32px] leading-tight">
              Dr. Shrikant V. Solav
            </h2>
            <p className="text-[#0e1a6b]/70 text-[13.5px] sm:text-[14.5px] mt-1 font-display font-medium">
              Nuclear Medicine Physician &amp; Founder, SPECT LAB
            </p>
          </motion.div>

          {/* ── Two-column layout ── */}
          <div className="flex flex-col lg:flex-row items-start gap-6 sm:gap-8 lg:gap-12">

            {/* ── LEFT: Video ── */}
            <motion.div
              initial={{ opacity: 0, x: -40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: '-80px' }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="relative w-full lg:w-[48%] shrink-0 flex justify-center lg:justify-start lg:mt-11 sm:mt-6"
            >
              <a 
                href="https://www.youtube.com/watch?v=S1kDCbwG36s"
                target="_blank"
                rel="noopener noreferrer"
                className="block relative rounded-[1.5rem] overflow-hidden w-full max-w-[560px] shadow-[0_20px_50px_-20px_rgba(14,26,107,0.22)] border-[1.5px] border-[#0e1a6b]/10 group transition-transform duration-300 hover:scale-[1.02]"
              >
                <img 
                  src={process.env.PUBLIC_URL + '/aboutthumbnail.png'} 
                  alt="About SPECT LAB"
                  className="w-full h-auto object-cover"
                />
              </a>
              <div className="absolute -top-6 -left-6 w-32 h-32 bg-[#3b7a24]/20 rounded-full blur-3xl pointer-events-none z-[-1]" />
              <div className="absolute -bottom-6 -right-6 w-32 h-32 bg-navy/10 rounded-full blur-3xl pointer-events-none z-[-1]" />
            </motion.div>

            {/* ── RIGHT: Content ── */}
            <motion.div
              initial={{ opacity: 0, x: 40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: '-80px' }}
              transition={{ duration: 0.8, delay: 0.15 }}
              className="flex-1 flex flex-col lg:mt-6 sm:mt-4"
            >
              {/* Headline */}
              <h3 className="font-display font-extrabold text-[#0e1a6b] text-xl sm:text-[22px] lg:text-[25px] leading-tight mb-1.5">
                Guided by Expertise, Driven by Care
              </h3>

              {/* Green accent line */}
              <div className="flex items-center gap-2 mb-3">
                <div className="h-[3px] w-9 rounded-full bg-[#3b7a24]" />
                <div className="h-[3px] w-3 rounded-full bg-[#0e1a6b]/30" />
              </div>

              {/* Sub-headline */}
              <p className="text-[#3b7a24] font-semibold text-[13.5px] sm:text-[14.5px] leading-snug mb-2">
                Delivering Excellence in Nuclear Medicine Through Experience, Innovation, and Compassion.
              </p>

              {/* Body */}
              <p className="text-[#0e1a6b]/80 text-[14px] sm:text-[14.5px] leading-relaxed mb-4">
                Dr. Shrikant V. Solav is a highly experienced Nuclear Medicine physician with over 35 years
                of expertise in diagnostic and molecular imaging. He is dedicated to providing accurate
                diagnosis, advanced imaging solutions, and compassionate care to every patient.
              </p>

              {/* ── 4 Pillars ── */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 sm:gap-3 mb-4">
                {[
                  {
                    icon: (
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={1.6} viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    ),
                    title: 'Experience',
                    desc: '35+ Years in Nuclear Medicine',
                  },
                  {
                    icon: (
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={1.6} viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M4.26 10.147a60.438 60.438 0 00-.491 6.347A48.63 48.63 0 0112 20.904a48.63 48.63 0 018.232-4.41 60.46 60.46 0 00-.491-6.347m-15.482 0a50.636 50.636 0 00-2.658-.813A59.906 59.906 0 0112 3.493a59.903 59.903 0 0110.399 5.84c-.896.248-1.783.52-2.658.814m-15.482 0A50.717 50.717 0 0112 13.489a50.702 50.702 0 017.74-3.342M6.75 15a.75.75 0 100-1.5.75.75 0 000 1.5zm0 0v-3.675A55.378 55.378 0 0112 8.443m-7.007 11.55A5.981 5.981 0 006.75 15.75v-1.5" />
                      </svg>
                    ),
                    title: 'Expertise',
                    desc: 'PET-CT, SPECT & Molecular Imaging',
                  },
                  {
                    icon: (
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={1.6} viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M18 18.72a9.094 9.094 0 003.741-.479 3 3 0 00-4.682-2.72m.94 3.198l.001.031c0 .225-.012.447-.037.666A11.944 11.944 0 0112 21c-2.17 0-4.207-.576-5.963-1.584A6.062 6.062 0 016 18.719m12 0a5.971 5.971 0 00-.941-3.197m0 0A5.995 5.995 0 0012 12.75a5.995 5.995 0 00-5.058 2.772m0 0a3 3 0 00-4.681 2.72 8.986 8.986 0 003.74.477m.94-3.197a5.971 5.971 0 00-.94 3.197M15 6.75a3 3 0 11-6 0 3 3 0 016 0zm6 3a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0zm-13.5 0a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0z" />
                      </svg>
                    ),
                    title: 'Commitment',
                    desc: 'Patient-centric, precise & compassionate',
                  },
                  {
                    icon: (
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={1.6} viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 00-.182.557l1.285 5.385a.562.562 0 01-.84.61l-4.725-2.885a.563.563 0 00-.586 0L6.982 20.54a.562.562 0 01-.84-.61l1.285-5.386a.562.562 0 00-.182-.557l-4.204-3.602a.563.563 0 01.321-.988l5.518-.442a.563.563 0 00.475-.345L11.48 3.5z" />
                      </svg>
                    ),
                    title: 'Excellence',
                    desc: '1st PET-CT in Pune',
                  },
                ].map((pillar, i) => (
                  <div
                    key={i}
                    className="bg-white rounded-xl p-3 soft-shadow border border-[#0e1a6b]/06 flex flex-col gap-1.5 group hover:-translate-y-0.5 hover:border-[#3b7a24]/20 transition-all duration-300"
                  >
                    <div className="w-8 h-8 rounded-lg bg-[#f3f9f1] text-[#3b7a24] group-hover:bg-[#3b7a24] group-hover:text-white transition-colors duration-300 flex items-center justify-center shrink-0">
                      {pillar.icon}
                    </div>
                    <p className="font-display font-bold text-[#0e1a6b] text-[12.5px] sm:text-[13px]">{pillar.title}</p>
                    <p className="text-[#0e1a6b]/60 text-[11.5px] sm:text-[12px] leading-tight">{pillar.desc}</p>
                  </div>
                ))}
              </div>

              {/* ── Divider ── */}
              <div className="w-full h-px bg-[#0e1a6b]/10 mb-3.5" />

              {/* ── Qualifications & Currently ── */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <div className="inline-flex items-center gap-2 text-[#3b7a24] font-display font-semibold mb-2 text-[11px] sm:text-[11.5px] uppercase tracking-widest">
                    <span className="w-4 h-px bg-[#3b7a24]" />
                    Qualifications
                  </div>
                  <ul className="space-y-1.5">
                    {[
                      'MD (Medicine) – Bhopal University',
                      'DRM (Nuclear Medicine) – Bombay University',
                      'FANMB – Fellow of Academy of Nuclear Medicine',
                    ].map((q, i) => (
                      <li key={i} className="flex items-start gap-2 text-[#0e1a6b]/80 text-[13px] sm:text-[13.5px] leading-snug">
                        <span className="mt-[6px] w-[5px] h-[5px] rounded-full bg-[#0e1a6b]/40 shrink-0" />
                        {q}
                      </li>
                    ))}
                  </ul>
                </div>
                <div>
                  <div className="inline-flex items-center gap-2 text-[#3b7a24] font-display font-semibold mb-2 text-[11px] sm:text-[11.5px] uppercase tracking-widest">
                    <span className="w-4 h-px bg-[#3b7a24]" />
                    Currently
                  </div>
                  <ul className="space-y-1.5">
                    {[
                      'Incharge – Dedicated Nuclear Medicine Unit (SPECT LAB)',
                      'Pune',
                    ].map((c, i) => (
                      <li key={i} className="flex items-start gap-2 text-[#0e1a6b]/80 text-[13px] sm:text-[13.5px] leading-snug">
                        <span className="mt-[6px] w-[5px] h-[5px] rounded-full bg-[#3b7a24]/60 shrink-0" />
                        {c}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </motion.div>
          </div>

        </div>
      </section>

      {/* ── Topline Management Section ── */}
      <section className="pt-7 pb-4 sm:pt-9 sm:pb-6 lg:pt-12 lg:pb-8 bg-[#f0f4f8] overflow-hidden">
        <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8">

          {/* ── Section Header ── */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-6 sm:mb-8"
          >
            <div className="inline-flex items-center gap-2 text-[#3b7a24] font-display font-semibold mb-3 text-xs uppercase tracking-wider">
              <span className="w-6 sm:w-8 h-[2px] bg-[#3b7a24]" />
              Topline Management
              <span className="w-6 sm:w-8 h-[2px] bg-[#3b7a24]" />
            </div>
            <h2 className="font-display font-extrabold text-[#0e1a6b] text-2xl md:text-3xl leading-tight mb-2">
              Leadership in Imaging Excellence
            </h2>
            <p className="text-[#0e1a6b]/80 text-[13px] md:text-[14px] max-w-xl mx-auto leading-relaxed">
              A team of highly qualified and experienced radiologists committed to advanced imaging, accurate diagnosis and exceptional patient care.
            </p>
            <div className="w-10 h-[3px] rounded-full bg-[#3b7a24] mx-auto mt-4" />
          </motion.div>

          {/* ── Two Doctor Cards ── */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-5">

            {/* Person 1 — Kiran Ayre */}
            <div className="md:col-span-2 flex justify-center mb-2">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-60px' }}
                transition={{ duration: 0.7 }}
                className="w-full max-w-[800px] bg-white rounded-2xl overflow-hidden flex flex-col sm:flex-row"
                style={{ boxShadow: '0 4px 30px rgba(14,26,107,0.09)', border: '1.5px solid rgba(14,26,107,0.07)', minHeight: '220px' }}
              >
                {/* Photo */}
                <div
                  className="relative w-full sm:w-[200px] h-56 sm:h-auto shrink-0"
                  style={{ background: 'linear-gradient(160deg, #e8ecf5 0%, #d0d8ee 100%)' }}
                >
                  <img
                    src="/kiran.png"
                    alt="Kiran Ayre"
                    className="absolute inset-0 w-full h-full object-cover object-top"
                  />
                </div>
                {/* Content */}
                <div className="flex-1 p-5">
                  <h3 className="font-display font-extrabold text-[#0e1a6b] text-xl leading-tight mb-1">
                    Kiran Ayre
                  </h3>
                  <p className="text-[#3b7a24] font-semibold text-[12px] leading-snug mb-3">
                    Strategic Business Leader &amp; Sales Expert<br />23+ Years of Industry Experience
                  </p>
                  <div className="flex items-center gap-2 mb-3 pb-3 border-b border-[#0e1a6b]/08">
                    <div className="w-7 h-7 rounded-lg bg-[#f3f4fb] flex items-center justify-center shrink-0">
                      <svg className="w-4 h-4 text-[#0e1a6b]/60" fill="none" stroke="currentColor" strokeWidth={1.6} viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M18 18.72a9.094 9.094 0 003.741-.479 3 3 0 00-4.682-2.72m.94 3.198l.001.031c0 .225-.012.447-.037.666A11.944 11.944 0 0112 21c-2.17 0-4.207-.576-5.963-1.584A6.062 6.062 0 016 18.719m12 0a5.971 5.971 0 00-.941-3.197m0 0A5.995 5.995 0 0012 12.75a5.995 5.995 0 00-5.058 2.772m0 0a3 3 0 00-4.681 2.72 8.986 8.986 0 003.74.477m.94-3.197a5.971 5.971 0 00-.94 3.197M15 6.75a3 3 0 11-6 0 3 3 0 016 0zm6 3a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0zm-13.5 0a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0z" />
                      </svg>
                    </div>
                    <p className="text-[#0e1a6b] font-display font-bold text-[12px]">Former Leadership Roles at Airtel, Tata Sky, LG Electronics &amp; Tata Indicom</p>
                  </div>
                  <ul className="space-y-1.5">
                    {[
                      'Sales Leadership & Business Development',
                      'Telecom, DTH & Consumer Electronics Specialist',
                      'Channel Sales & Distribution Management',
                      'Revenue Growth & Market Expansion',
                      'Team Building & Performance Leadership',
                      'Key Account & Strategic Business Management',
                    ].map((point, i) => (
                      <li key={i} className="flex items-start gap-2 text-[#0e1a6b]/70 text-[12px] leading-snug">
                        <svg className="w-3.5 h-3.5 text-[#3b7a24] shrink-0 mt-0.5" fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        {point}
                      </li>
                    ))}
                  </ul>
                </div>
              </motion.div>
            </div>

            {/* Doctor 2 — Dr. Shailendra Savale */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.7, delay: 0.12 }}
              className="bg-white rounded-2xl overflow-hidden flex flex-col sm:flex-row mt-2 lg:mt-4"
              style={{ boxShadow: '0 4px 30px rgba(14,26,107,0.09)', border: '1.5px solid rgba(14,26,107,0.07)', minHeight: '220px' }}
            >
              {/* Doctor 2 Photo — absolutely fills the column */}
              <div
                className="relative w-full sm:w-[200px] h-56 sm:h-auto shrink-0"
                style={{ background: 'linear-gradient(160deg, #e8ecf5 0%, #d0d8ee 100%)' }}
              >
                <img
                  src="/shilendra.png"
                  alt="Dr. Shailendra Savale"
                  className="absolute inset-0 w-full h-full object-cover object-center"
                />
              </div>
              {/* Content */}
              <div className="flex-1 p-5">
                <h3 className="font-display font-extrabold text-[#0e1a6b] text-xl leading-tight mb-1">
                  Dr. Shailendra Savale
                </h3>
                <p className="text-[#3b7a24] font-semibold text-[12px] leading-snug mb-3">
                  MBBS, DNB (Radiodiagnosis), MNAMS<br />Fellowship in PET-CT (Zurich, Switzerland)
                </p>
                <div className="flex items-center gap-2 mb-3 pb-3 border-b border-[#0e1a6b]/08">
                  <div className="w-7 h-7 rounded-lg bg-[#f3f4fb] flex items-center justify-center shrink-0">
                    <svg className="w-4 h-4 text-[#0e1a6b]/60" fill="none" stroke="currentColor" strokeWidth={1.6} viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M18 18.72a9.094 9.094 0 003.741-.479 3 3 0 00-4.682-2.72m.94 3.198l.001.031c0 .225-.012.447-.037.666A11.944 11.944 0 0112 21c-2.17 0-4.207-.576-5.963-1.584A6.062 6.062 0 016 18.719m12 0a5.971 5.971 0 00-.941-3.197m0 0A5.995 5.995 0 0012 12.75a5.995 5.995 0 00-5.058 2.772m0 0a3 3 0 00-4.681 2.72 8.986 8.986 0 003.74.477m.94-3.197a5.971 5.971 0 00-.94 3.197M15 6.75a3 3 0 11-6 0 3 3 0 016 0zm6 3a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0zm-13.5 0a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0z" />
                    </svg>
                  </div>
                  <p className="text-[#0e1a6b] font-display font-bold text-[12px]">Consultant Radiologist &amp; Hybrid Imaging Specialist</p>
                </div>
                <ul className="space-y-1.5">
                  {[
                    '17+ Years of Experience in Radiology',
                    '8+ Years in PET-CT & PET-MRI Imaging',
                    'Expert in Hybrid Imaging, CT, MRI & Ultrasound',
                    'Author of 19+ Publications & Textbook Contributor',
                    'Member of National & International Radiology Societies',
                  ].map((point, i) => (
                    <li key={i} className="flex items-start gap-2 text-[#0e1a6b]/70 text-[12px] leading-snug">
                      <svg className="w-3.5 h-3.5 text-[#3b7a24] shrink-0 mt-0.5" fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      {point}
                    </li>
                  ))}
                </ul>
              </div>
            </motion.div>

            {/* Doctor 3 — Dr. Swaragandha Jadhav */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.7, delay: 0.24 }}
              className="bg-white rounded-2xl overflow-hidden flex flex-col sm:flex-row mt-2 lg:mt-4"
              style={{ boxShadow: '0 4px 30px rgba(14,26,107,0.09)', border: '1.5px solid rgba(14,26,107,0.07)', minHeight: '220px' }}
            >
              {/* Doctor 3 Photo — absolutely fills the column */}
              <div
                className="relative w-full sm:w-[200px] h-56 sm:h-auto shrink-0"
                style={{ background: 'linear-gradient(160deg, #e8ecf5 0%, #d0d8ee 100%)' }}
              >
                <img
                  src="/swara.png"
                  alt="Dr. Swaragandha Jadhav"
                  className="absolute inset-0 w-full h-full object-cover object-top"
                />
              </div>
              {/* Content */}
              <div className="flex-1 p-5">
                <h3 className="font-display font-extrabold text-[#0e1a6b] text-xl leading-tight mb-1">
                  Dr. Swaragandha Jadhav (Kadam)
                </h3>
                <p className="text-[#3b7a24] font-semibold text-[12px] leading-snug mb-3">
                  MBBS, MD, DNB (Radiodiagnosis)<br />Fellowship in Onco-Imaging
                </p>
                <div className="flex items-center gap-2 mb-3 pb-3 border-b border-[#0e1a6b]/08">
                  <div className="w-7 h-7 rounded-lg bg-[#f3f4fb] flex items-center justify-center shrink-0">
                    <svg className="w-4 h-4 text-[#0e1a6b]/60" fill="none" stroke="currentColor" strokeWidth={1.6} viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M18 18.72a9.094 9.094 0 003.741-.479 3 3 0 00-4.682-2.72m.94 3.198l.001.031c0 .225-.012.447-.037.666A11.944 11.944 0 0112 21c-2.17 0-4.207-.576-5.963-1.584A6.062 6.062 0 016 18.719m12 0a5.971 5.971 0 00-.941-3.197m0 0A5.995 5.995 0 0012 12.75a5.995 5.995 0 00-5.058 2.772m0 0a3 3 0 00-4.681 2.72 8.986 8.986 0 003.74.477m.94-3.197a5.971 5.971 0 00-.94 3.197M15 6.75a3 3 0 11-6 0 3 3 0 016 0zm6 3a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0zm-13.5 0a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0z" />
                    </svg>
                  </div>
                  <p className="text-[#0e1a6b] font-display font-bold text-[12px]">Consultant Radiologist &amp; Onco-Imaging Specialist</p>
                </div>
                <ul className="space-y-1.5">
                  {[
                    'Specialist in Onco-Imaging & PET-CT Reporting',
                    'Expert in USG, Doppler, CT-MRI & Mammography',
                    'Image-guided Procedures & Interventions',
                    'Multiple Gold Medalist & Academic Achiever',
                    'Researcher with Numerous National & International Publications',
                  ].map((point, i) => (
                    <li key={i} className="flex items-start gap-2 text-[#0e1a6b]/70 text-[12px] leading-snug">
                      <svg className="w-3.5 h-3.5 text-[#3b7a24] shrink-0 mt-0.5" fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      {point}
                    </li>
                  ))}
                </ul>
              </div>
            </motion.div>
          </div>

          {/* ── 5 Pillars ── */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.65, delay: 0.1 }}
            className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4"
          >
            {[
              {
                icon: (
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M18 18.72a9.094 9.094 0 003.741-.479 3 3 0 00-4.682-2.72m.94 3.198l.001.031c0 .225-.012.447-.037.666A11.944 11.944 0 0112 21c-2.17 0-4.207-.576-5.963-1.584A6.062 6.062 0 016 18.719m12 0a5.971 5.971 0 00-.941-3.197m0 0A5.995 5.995 0 0012 12.75a5.995 5.995 0 00-5.058 2.772m0 0a3 3 0 00-4.681 2.72 8.986 8.986 0 003.74.477m.94-3.197a5.971 5.971 0 00-.94 3.197M15 6.75a3 3 0 11-6 0 3 3 0 016 0zm6 3a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0zm-13.5 0a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0z" />
                  </svg>
                ),
                title: 'Expert Leadership',
                desc: 'Highly qualified radiologists with rich clinical experience',
              },
              {
                icon: (
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M4.26 10.147a60.438 60.438 0 00-.491 6.347A48.63 48.63 0 0112 20.904a48.63 48.63 0 018.232-4.41 60.46 60.46 0 00-.491-6.347m-15.482 0a50.636 50.636 0 00-2.658-.813A59.906 59.906 0 0112 3.493a59.903 59.903 0 0110.399 5.84c-.896.248-1.783.52-2.658.814m-15.482 0A50.717 50.717 0 0112 13.489a50.702 50.702 0 017.74-3.342M6.75 15a.75.75 0 100-1.5.75.75 0 000 1.5zm0 0v-3.675A55.378 55.378 0 0112 8.443m-7.007 11.55A5.981 5.981 0 006.75 15.75v-1.5" />
                  </svg>
                ),
                title: 'Academic Excellence',
                desc: 'Award winners, researchers & publication contributors',
              },
              {
                icon: (
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9.75 3.104v5.714a2.25 2.25 0 01-.659 1.591L5 14.5M9.75 3.104c-.251.023-.501.05-.75.082m.75-.082a24.301 24.301 0 014.5 0m0 0v5.714c0 .597.237 1.17.659 1.591L19.8 15.3M14.25 3.104c.251.023.501.05.75.082M19.8 15.3l-1.57.393A9.065 9.065 0 0112 15a9.065 9.065 0 00-6.23-.693L5 14.5m14.8.8l1.402 1.402c1.232 1.232.65 3.318-1.067 3.611A48.309 48.309 0 0112 21c-2.773 0-5.491-.235-8.135-.687-1.718-.293-2.3-2.379-1.067-3.61L5 14.5" />
                  </svg>
                ),
                title: 'Advanced Imaging',
                desc: 'Specialized in PET-CT, PET-MRI, CT, MRI, USG & more',
              },
              {
                icon: (
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z" />
                  </svg>
                ),
                title: 'Patient First Approach',
                desc: 'Committed to accurate diagnosis and compassionate care',
              },
              {
                icon: (
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15 19.128a9.38 9.38 0 002.625.372 9.337 9.337 0 004.121-.952 4.125 4.125 0 00-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 018.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0111.964-3.07M12 6.375a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zm8.25 2.25a2.625 2.625 0 11-5.25 0 2.625 2.625 0 015.25 0z" />
                  </svg>
                ),
                title: 'Stronger Together',
                desc: 'A dedicated team working for better outcomes',
              },
            ].map((pillar, i) => (
              <div
                key={i}
                className="bg-white rounded-xl p-3 flex flex-col items-center text-center gap-1.5 hover:-translate-y-1 transition-transform duration-300"
                style={{ border: '1.5px solid rgba(14,26,107,0.07)', boxShadow: '0 2px 16px rgba(14,26,107,0.06)' }}
              >
                <div className="w-9 h-9 rounded-full bg-[#f3f4fb] text-[#0e1a6b]/60 flex items-center justify-center mb-0.5">
                  {pillar.icon}
                </div>
                <p className="font-display font-bold text-[#0e1a6b] text-[12px] leading-tight">{pillar.title}</p>
                <p className="text-[#0e1a6b]/55 text-[11px] leading-snug">{pillar.desc}</p>
              </div>
            ))}
          </motion.div>



        </div>
      </section>

      {/* Why Choose Section */}
      <section className="py-12 lg:py-20 bg-[#f8f9fa] overflow-hidden">
        <div className="max-w-[1400px] mx-auto px-4 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8 }}
            className="text-center max-w-3xl mx-auto mb-10 lg:mb-14"
          >
            <div className="inline-flex items-center justify-center gap-2 text-[#3b7a24] font-display font-bold mb-3 uppercase tracking-wider text-xs">
              <span className="w-6 sm:w-8 h-[2px] bg-[#3b7a24]" />
              Why Choose SPECT LAB
              <span className="w-6 sm:w-8 h-[2px] bg-[#3b7a24]" />
            </div>
            <h2 className="font-display font-extrabold text-[#0e1a6b] text-3xl md:text-4xl leading-tight mb-4">
              Why Patients & Physicians Trust Us
            </h2>

          </motion.div>

          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-100px" }}
            className="grid md:grid-cols-2 lg:grid-cols-4 gap-6"
          >
            {[
              { icon: Microscope, title: 'Advanced Imaging', desc: 'Utilizing modern PET-CT and SPECT-CT systems for accurate diagnostic results.' },
              { icon: Users, title: 'Expert Team', desc: 'Experienced nuclear medicine physicians and technologists dedicated to clinical excellence.' },
              { icon: Heart, title: 'Patient-Centered', desc: 'Ensuring comfort, safety, and personalized attention throughout every diagnostic process.' },
              { icon: ShieldCheck, title: 'Trusted Excellence', desc: 'Providing dependable imaging services that support early disease detection and treatment.' }
            ].map((item, idx) => (
              <motion.div
                key={idx}
                variants={itemVariants}
                className="bg-white rounded-3xl p-6 lg:p-8 border border-gray-100 shadow-lg shadow-navy/[0.03] flex flex-col items-center text-center gap-5 hover:-translate-y-1.5 hover:shadow-xl hover:shadow-[#3b7a24]/10 hover:border-[#3b7a24]/20 transition-all duration-300 group"
              >
                <div className="w-16 h-16 rounded-2xl bg-[#f3f9f1] text-[#3b7a24] group-hover:bg-[#3b7a24] group-hover:text-white transition-colors duration-300 flex items-center justify-center shrink-0">
                  <item.icon className="w-7 h-7" strokeWidth={1.5} />
                </div>
                <div>
                  <h4 className="font-display font-bold text-[#0e1a6b] text-[19px] mb-3">{item.title}</h4>
                  <p className="text-[#0e1a6b]/70 leading-relaxed text-[14px]">{item.desc}</p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>



      {/* <Stats /> */}

      {/* Values */}
      {/* <section className="py-24 bg-white">
        <div className="max-w-[1400px] mx-auto px-4 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-14">
            <div className="inline-flex items-center gap-2 text-mint font-display font-semibold mb-4">
              <span className="w-10 h-px bg-mint" />Our Core Values<span className="w-10 h-px bg-mint" />
            </div>
            <h2 className="font-display font-extrabold text-navy text-4xl lg:text-[52px] leading-[1.08]">
              The principles guiding every decision we make
            </h2>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {values.map(({ icon: Icon, title, desc }) => (
              <div key={title} className="group bg-[#f3f1fb] hover:bg-navy rounded-3xl p-8 transition-colors duration-500">
                <div className="w-14 h-14 rounded-2xl bg-mint/15 text-mint group-hover:bg-mint group-hover:text-white flex items-center justify-center mb-5 transition-colors">
                  <Icon className="w-7 h-7" strokeWidth={1.8} />
                </div>
                <h3 className="font-display font-bold text-navy group-hover:text-white text-xl mb-3 transition-colors">{title}</h3>
                <p className="text-navy/70 group-hover:text-white/70 leading-relaxed transition-colors">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section> */}

      {/* Timeline */}
      {/* <section className="py-24 bg-[#f3f1fb]">
        <div className="max-w-[1100px] mx-auto px-4 lg:px-8">
          <div className="text-center mb-14">
            <div className="inline-flex items-center gap-2 text-mint font-display font-semibold mb-4">
              <span className="w-10 h-px bg-mint" />Our Journey<span className="w-10 h-px bg-mint" />
            </div>
            <h2 className="font-display font-extrabold text-navy text-4xl lg:text-[52px] leading-[1.08]">
              17 years of growing with our communities
            </h2>
          </div>
          <div className="relative">
            <div className="absolute left-1/2 top-0 bottom-0 w-px bg-navy/15 hidden md:block" />
            <div className="space-y-10">
              {timeline.map((t, i) => (
                <div key={t.year} className={`md:grid md:grid-cols-2 md:gap-12 items-center ${i % 2 === 1 ? 'md:[&>*:first-child]:order-2' : ''}`}>
                  <div className={`md:text-right ${i % 2 === 1 ? 'md:text-left' : ''}`}>
                    <div className="font-display font-extrabold text-mint text-5xl mb-2">{t.year}</div>
                    <h4 className="font-display font-bold text-navy text-2xl mb-2">{t.title}</h4>
                    <p className="text-navy/70 max-w-md md:ml-auto">{t.desc}</p>
                  </div>
                  <div className="relative hidden md:block">
                    <span className="absolute -left-2 top-1/2 -translate-y-1/2 w-4 h-4 rounded-full bg-mint border-4 border-white" />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section> */}



      {/* <Testimonials />  */}
    </>
  );
}
