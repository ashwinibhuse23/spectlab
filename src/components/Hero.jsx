import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Phone, ChevronLeft, ChevronRight, Check } from 'lucide-react';
import { motion } from 'framer-motion';
import { heroSlides } from '../mock';

const heroImages = [
  process.env.PUBLIC_URL + '/hero1.png',
  process.env.PUBLIC_URL + '/hero2.png',
];

export default function Hero() {
  const [active, setActive] = useState(0);

  useEffect(() => {
    const t = setInterval(() => setActive((a) => (a + 1) % heroSlides.length), 7000);
    return () => clearInterval(t);
  }, []);

  const slide = heroSlides[active];

  return (
    <section id="home" className="relative pt-24 sm:pt-32 lg:pt-36 pb-10 sm:pb-12 lg:pb-16 overflow-hidden bg-[#f3f1fb]">
      <div className="max-w-[1400px] mx-auto px-3 sm:px-4 lg:px-8">
        <div className="relative rounded-[20px] sm:rounded-[28px] overflow-hidden min-h-[500px] sm:min-h-[520px] lg:min-h-[580px] bg-white flex flex-col justify-center">
          {/* Background image */}
          <div className="absolute inset-0">
            {heroSlides.map((s, i) => (
              <img
                key={i}
                src={heroImages[i]}
                alt=""
                className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-[1500ms] ${i === 1 ? 'object-top' : 'object-center'} ${i === active ? 'opacity-100' : 'opacity-0'}`}
              />
            ))}
            <div className="absolute inset-0 bg-gradient-to-r from-[#172547]/95 via-[#172547]/80 to-[#172547]/40 md:via-[#172547]/60 md:to-transparent lg:via-[#172547]/30" />
          </div>

          {/* Content */}
          <div className="relative z-10 grid lg:grid-cols-2 gap-8 px-5 sm:px-10 lg:px-16 pt-12 pb-32 sm:pt-16 sm:pb-32 lg:pt-28 lg:pb-20">
            <motion.div 
              key={`content-${active}`}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, staggerChildren: 0.2 }}
              className="max-w-xl"
            >
              {slide.eyebrow && (
                <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.2 }} className="inline-flex items-center gap-2 text-white/90 font-display font-semibold mb-4 sm:mb-5 text-xs sm:text-sm">
                  <span className="w-8 sm:w-10 h-px bg-white/90" />
                  {slide.eyebrow}
                </motion.div>
              )}
              <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.4 }} className="font-display font-extrabold text-white text-[28px] sm:text-[34px] md:text-[40px] lg:text-[44px] xl:text-[48px] leading-[1.2] md:leading-[1.15] tracking-tight mb-4 sm:mb-6">
                {slide.title}
              </motion.h1>
              <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.6 }} className="text-white/80 text-sm sm:text-base md:text-lg mb-8 sm:mb-10 max-w-lg leading-relaxed">
                {slide.desc}
              </motion.p>
              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.8 }} className="flex flex-col items-start gap-5 sm:gap-6 mt-4 sm:mt-8">
                <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 sm:gap-6 text-white lg:mr-2">
                  <div className="flex items-center gap-2">
                    <span className="w-5 h-5 rounded-full bg-[#3b7a24] text-white flex items-center justify-center shrink-0"><Check className="w-3 h-3" /></span>
                    <span className="font-display font-semibold text-sm">Innovative Healthcare</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="w-5 h-5 rounded-full bg-[#3b7a24] text-white flex items-center justify-center shrink-0"><Check className="w-3 h-3" /></span>
                    <span className="font-display font-semibold text-sm">Focused Services</span>
                  </div>
                </div>

                <Link to="/services" className="group inline-flex items-center gap-3 bg-[#3b7a24] hover:bg-[#2d661b] text-white font-display font-bold pl-5 sm:pl-6 pr-2 py-2 rounded-full transition-colors mt-2 sm:mt-4">
                  <span className="text-sm sm:text-base">View Our Services</span>
                  <span className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-white text-[#3b7a24] flex items-center justify-center group-hover:rotate-45 transition-transform shrink-0">
                    <ArrowRight className="w-4 h-4" />
                  </span>
                </Link>
              </motion.div>
            </motion.div>
          </div>

          {/* Slide controls */}
          <div className="absolute left-5 sm:left-10 lg:left-1/2 lg:-translate-x-1/2 bottom-6 sm:bottom-8 lg:bottom-10 z-10 flex items-center gap-2 sm:gap-3 w-max">
            <button
              onClick={() => setActive((a) => (a - 1 + heroSlides.length) % heroSlides.length)}
              className="w-10 h-10 sm:w-12 sm:h-12 rounded-full border border-navy/20 hover:bg-navy hover:text-white text-navy flex items-center justify-center transition-colors bg-white/80"
            >
              <ChevronLeft className="w-4 h-4 sm:w-5 sm:h-5" />
            </button>
            <div className="flex items-center gap-1.5 sm:gap-2">
              {heroSlides.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setActive(i)}
                  className={`h-1.5 rounded-full transition-all ${i === active ? 'bg-[#3b7a24] w-6 sm:w-8' : 'bg-navy/30 w-2 sm:w-3'}`}
                />
              ))}
            </div>
            <button
              onClick={() => setActive((a) => (a + 1) % heroSlides.length)}
              className="w-10 h-10 sm:w-12 sm:h-12 rounded-full border border-navy/20 hover:bg-navy hover:text-white text-navy flex items-center justify-center transition-colors bg-white/80"
            >
              <ChevronRight className="w-4 h-4 sm:w-5 sm:h-5" />
            </button>
          </div>

          {/* Decorative shape */}
          <div className="absolute -bottom-6 -right-6 w-32 h-32 sm:w-40 sm:h-40 rounded-full bg-mint/10 blur-2xl" />
        </div>
      </div>

      <style>{`
        @keyframes fadeUp { from { opacity: 0; transform: translateY(20px); } to { opacity: 1; transform: translateY(0); } }
      `}</style>
    </section>
  );
}
