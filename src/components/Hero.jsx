import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Phone, ChevronLeft, ChevronRight, Check, Search, HelpCircle } from 'lucide-react';
import { motion } from 'framer-motion';
import { heroSlides, services } from '../mock';
import BookingModal from './BookingModal';

const heroImages = [
  process.env.PUBLIC_URL + '/hero1.png',
  process.env.PUBLIC_URL + '/hero2.png',
];

export default function Hero() {
  const [active, setActive] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const filteredScans = services.filter(s => s.name.replace(/\n/g, ' ').toLowerCase().includes(searchQuery.toLowerCase()));

  useEffect(() => {
    const t = setInterval(() => setActive((a) => (a + 1) % heroSlides.length), 7000);
    return () => clearInterval(t);
  }, []);

  const slide = heroSlides[active];

  return (
    <section id="home" className="relative pt-24 sm:pt-28 lg:pt-32 pb-8 sm:pb-10 lg:pb-12 overflow-hidden bg-[#f3f1fb]">
      <BookingModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
      
      <div className="max-w-[1920px] mx-auto px-3 md:px-4 lg:px-5">
        <div className="relative rounded-[20px] sm:rounded-[32px] min-h-[520px] sm:min-h-[580px] lg:min-h-[640px] bg-white flex flex-col justify-center">
          {/* Background image */}
          <div className="absolute inset-0 rounded-[20px] sm:rounded-[32px] overflow-hidden pointer-events-none">
            {heroSlides.map((s, i) => (
              <img
                key={i}
                src={heroImages[i]}
                alt=""
                className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-[1500ms] ${i === 1 ? 'object-[center_55%]' : 'object-center'} ${i === active ? 'opacity-100' : 'opacity-0'}`}
              />
            ))}
            <div className="absolute inset-0 bg-gradient-to-r from-[#172547]/75 via-[#172547]/45 to-transparent md:via-[#172547]/35 lg:via-[#172547]/15" />
            <div className="absolute -bottom-6 -right-6 w-32 h-32 sm:w-40 sm:h-40 rounded-full bg-mint/10 blur-2xl" />
          </div>

          {/* Content */}
          <div className="relative z-10 w-full max-w-[1400px] mx-auto px-5 sm:px-10 lg:px-16 pt-16 sm:pt-20 lg:pt-24 pb-28 sm:pb-32 lg:pb-36">
            <motion.div
              key={`content-${active}`}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, staggerChildren: 0.2 }}
              className="max-w-[800px]"
            >
              {slide.eyebrow && (
                <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.2 }} className="inline-flex items-center gap-2 text-white/90 font-display font-semibold mb-3 sm:mb-4 text-xs sm:text-sm">
                  <span className="w-8 sm:w-10 h-px bg-white/90" />
                  {slide.eyebrow}
                </motion.div>
              )}
              <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.4 }} className="font-display font-extrabold text-white text-[31px] sm:text-[37px] md:text-[45px] lg:text-[51px] xl:text-[55px] leading-[1.2] md:leading-[1.15] tracking-tight mb-3 sm:mb-5 whitespace-pre-line">
                {slide.title}
              </motion.h1>
              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.8 }} className="flex flex-col items-start gap-4 sm:gap-5 mt-6 sm:mt-8">
                <div className="flex flex-row flex-wrap items-center gap-3 sm:gap-4 mt-2 sm:mt-4">
                  <button onClick={() => setIsModalOpen(true)} className="group inline-flex items-center gap-3 bg-gradient-to-r from-[#3b7a24] via-[#32691e] to-[#255417] text-white font-display font-bold pl-6 pr-2 py-2 rounded-full transition-all duration-300 hover:scale-105 shadow-lg shadow-[#3b7a24]/25 hover:shadow-[#3b7a24]/40 border border-white/20 active:scale-95">
                    <span className="text-sm sm:text-base tracking-wide">Book Appointment</span>
                    <span className="w-9 h-9 rounded-full bg-white text-[#3b7a24] flex items-center justify-center group-hover:rotate-45 transition-transform duration-300 shrink-0 shadow-sm">
                      <ArrowRight className="w-4 h-4" />
                    </span>
                  </button>
                  
                  <div className="relative">
                    <div className="group flex items-center gap-2.5 bg-white/10 hover:bg-white/20 backdrop-blur-sm border border-white/20 text-white font-display font-bold pl-5 pr-1.5 py-1.5 rounded-full transition-colors focus-within:bg-white/20">
                      <input 
                        type="text"
                        placeholder="Search Scans..."
                        value={searchQuery}
                        onChange={(e) => {
                          setSearchQuery(e.target.value);
                          setIsDropdownOpen(true);
                        }}
                        onFocus={() => setIsDropdownOpen(true)}
                        onBlur={() => setTimeout(() => setIsDropdownOpen(false), 250)}
                        className="bg-transparent outline-none w-32 sm:w-40 placeholder:text-white/80 text-sm font-display font-bold text-white"
                      />
                      <div className="w-9 h-9 rounded-full bg-white text-navy flex items-center justify-center shrink-0 cursor-pointer" onClick={() => setIsDropdownOpen(!isDropdownOpen)}>
                        <Search className="w-4 h-4" />
                      </div>
                    </div>
                    
                    {isDropdownOpen && (
                      <div className="absolute top-full left-0 mt-2.5 w-[310px] sm:w-[350px] bg-white rounded-2xl shadow-2xl border border-navy/10 overflow-hidden z-50 animate-in fade-in slide-in-from-top-2 duration-200">
                        <div className="px-4 py-2 bg-slate-50 border-b border-slate-100 flex items-center justify-between">
                          <span className="text-[11px] font-bold text-navy uppercase tracking-wider">Select or Search Scan</span>
                          <span className="text-[10px] text-slate-500 font-bold bg-slate-200/60 px-2 py-0.5 rounded-full">{filteredScans.length} Scans</span>
                        </div>
                        
                        <ul className="max-h-[145px] overflow-y-auto py-1 divide-y divide-slate-100">
                          {filteredScans.length > 0 ? (
                            filteredScans.map((scan, i) => {
                              const scanCleanName = scan.name.replace(/\n/g, ' ');
                              return (
                                <li key={i}>
                                  <Link 
                                    to="/services"
                                    state={{ targetScan: scanCleanName }} 
                                    className="group flex items-center justify-between px-4 py-2 text-xs sm:text-sm font-semibold text-navy hover:bg-[#3b7a24]/10 hover:text-[#3b7a24] transition-all rounded-lg mx-1 my-0.5"
                                  >
                                    <span>{scanCleanName}</span>
                                    <ArrowRight className="w-3.5 h-3.5 opacity-0 -translate-x-1 group-hover:opacity-100 group-hover:translate-x-0 transition-all text-[#3b7a24] shrink-0" />
                                  </Link>
                                </li>
                              );
                            })
                          ) : (
                            <li className="px-5 py-4 text-xs text-slate-500 font-semibold text-center">
                              No matching scans found.
                            </li>
                          )}
                        </ul>

                        {/* Compulsory "Don't Know" Section Pinned at Bottom */}
                        <div className="bg-gradient-to-r from-[#f0f7ec] to-[#e6f4e1] border-t border-[#3b7a24]/25 p-3 flex items-center justify-between gap-2 shrink-0">
                          <div className="flex items-center gap-2">
                            <div className="w-7 h-7 rounded-full bg-[#3b7a24] text-white flex items-center justify-center shrink-0 shadow-xs">
                              <HelpCircle className="w-4 h-4" />
                            </div>
                            <div>
                              <p className="text-[12px] font-bold text-navy leading-tight">Don't know which scan?</p>
                              <p className="text-[10px] font-semibold text-[#3b7a24]">We will guide & help you</p>
                            </div>
                          </div>
                          <a
                            href="https://wa.me/9527070000?text=Hello%2C%20I%20don%27t%20know%20which%20scan%20I%20need.%20Please%20guide%20me."
                            target="_blank"
                            rel="noopener noreferrer"
                            className="bg-[#3b7a24] hover:bg-[#2d661b] text-white text-[11px] font-bold tracking-wide uppercase px-3 py-1.5 rounded-full transition-all shadow-xs shrink-0 flex items-center gap-1"
                          >
                            <span>Need Help?</span>
                            <ArrowRight className="w-3 h-3" />
                          </a>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </motion.div>
            </motion.div>
          </div>

          {/* Slide controls */}
          <div className="absolute right-5 sm:right-10 lg:right-16 bottom-6 sm:bottom-8 lg:bottom-10 z-10 flex items-center gap-1.5 sm:gap-2 w-max">
            <button
              onClick={() => setActive((a) => (a - 1 + heroSlides.length) % heroSlides.length)}
              className="w-8 h-8 sm:w-9 sm:h-9 rounded-full border border-navy/20 hover:bg-navy hover:text-white text-navy flex items-center justify-center transition-colors bg-white/80"
            >
              <ChevronLeft className="w-3 h-3 sm:w-4 sm:h-4" />
            </button>
            <div className="flex items-center gap-1 sm:gap-1.5">
              {heroSlides.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setActive(i)}
                  className={`rounded-full transition-all ${i === active ? 'bg-[#3b7a24] h-1.5 w-4 sm:w-6' : 'bg-navy/30 h-1.5 w-1.5 sm:w-2'}`}
                />
              ))}
            </div>
            <button
              onClick={() => setActive((a) => (a + 1) % heroSlides.length)}
              className="w-8 h-8 sm:w-9 sm:h-9 rounded-full border border-navy/20 hover:bg-navy hover:text-white text-navy flex items-center justify-center transition-colors bg-white/80"
            >
              <ChevronRight className="w-3 h-3 sm:w-4 sm:h-4" />
            </button>
          </div>

        </div>
      </div>

      <style>{`
        @keyframes fadeUp { from { opacity: 0; transform: translateY(20px); } to { opacity: 1; transform: translateY(0); } }
      `}</style>
    </section>
  );
}
