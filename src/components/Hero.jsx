import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Phone, ChevronLeft, ChevronRight, Check, Search } from 'lucide-react';
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

  const filteredScans = services.filter(s => s.name.toLowerCase().includes(searchQuery.toLowerCase()));

  useEffect(() => {
    const t = setInterval(() => setActive((a) => (a + 1) % heroSlides.length), 7000);
    return () => clearInterval(t);
  }, []);

  const slide = heroSlides[active];

  return (
    <section id="home" className="relative pt-24 sm:pt-32 lg:pt-36 pb-8 sm:pb-10 lg:pb-12 overflow-hidden bg-[#f3f1fb]">
      <BookingModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
      
      <div className="max-w-[1920px] mx-auto px-3 md:px-4 lg:px-5">
        <div className="relative rounded-[20px] sm:rounded-[32px] min-h-[500px] sm:min-h-[550px] lg:min-h-[650px] bg-white flex flex-col justify-center">
          {/* Background image */}
          <div className="absolute inset-0 rounded-[20px] sm:rounded-[32px] overflow-hidden pointer-events-none">
            {heroSlides.map((s, i) => (
              <img
                key={i}
                src={heroImages[i]}
                alt=""
                className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-[1500ms] ${i === 1 ? 'object-top' : 'object-center'} ${i === active ? 'opacity-100' : 'opacity-0'}`}
              />
            ))}
            <div className="absolute inset-0 bg-gradient-to-r from-[#172547]/95 via-[#172547]/80 to-[#172547]/40 md:via-[#172547]/60 md:to-transparent lg:via-[#172547]/30" />
            <div className="absolute -bottom-6 -right-6 w-32 h-32 sm:w-40 sm:h-40 rounded-full bg-mint/10 blur-2xl" />
          </div>

          {/* Content */}
          <div className="relative z-10 w-full max-w-[1400px] mx-auto px-5 sm:px-10 lg:px-16 pt-12 pb-32 sm:pt-16 sm:pb-36 lg:pt-28 lg:pb-28">
            <motion.div
              key={`content-${active}`}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, staggerChildren: 0.2 }}
              className="max-w-[800px]"
            >
              {slide.eyebrow && (
                <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.2 }} className="inline-flex items-center gap-2 text-white/90 font-display font-semibold mb-4 sm:mb-5 text-xs sm:text-sm">
                  <span className="w-8 sm:w-10 h-px bg-white/90" />
                  {slide.eyebrow}
                </motion.div>
              )}
              <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.4 }} className="font-display font-extrabold text-white text-[31px] sm:text-[37px] md:text-[45px] lg:text-[51px] xl:text-[55px] leading-[1.2] md:leading-[1.15] tracking-tight mb-4 sm:mb-6 whitespace-pre-line">
                {slide.title}
              </motion.h1>
              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.8 }} className="flex flex-col items-start gap-5 sm:gap-6 mt-8 sm:mt-12">
                <div className="flex flex-row flex-wrap items-center gap-3 sm:gap-4 mt-4 sm:mt-6">
                  <button onClick={() => setIsModalOpen(true)} className="group inline-flex items-center gap-2.5 bg-[#3b7a24] hover:bg-[#2d661b] text-white font-display font-bold pl-5 pr-1.5 py-1.5 rounded-full transition-colors">
                    <span className="text-sm">Book Appointment</span>
                    <span className="w-9 h-9 rounded-full bg-white text-[#3b7a24] flex items-center justify-center group-hover:rotate-45 transition-transform shrink-0">
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
                        onBlur={() => setTimeout(() => setIsDropdownOpen(false), 200)}
                        className="bg-transparent outline-none w-32 sm:w-40 placeholder:text-white/80 text-sm font-display font-bold text-white"
                      />
                      <div className="w-9 h-9 rounded-full bg-white text-navy flex items-center justify-center shrink-0">
                        <Search className="w-4 h-4" />
                      </div>
                    </div>
                    
                    {isDropdownOpen && searchQuery && (
                      <div className="absolute top-full left-0 mt-2 w-[280px] bg-white rounded-xl shadow-xl border border-slate-200 overflow-hidden z-50">
                        <ul className="max-h-60 overflow-y-auto py-2">
                          {filteredScans.length > 0 ? (
                            filteredScans.map((scan, i) => (
                              <li key={i}>
                                <Link 
                                  to="/services"
                                  state={{ targetScan: scan.name }} 
                                  className="block px-5 py-2.5 text-sm font-medium text-[#0e1a6b] hover:bg-[#1a5fcd] hover:text-white transition-colors"
                                >
                                  {scan.name}
                                </Link>
                              </li>
                            ))
                          ) : (
                            <li className="px-5 py-3 text-sm text-slate-500 font-medium">No scans found</li>
                          )}
                          <li className="border-t border-slate-100 mt-1 pt-1">
                            <a 
                              href="https://wa.me/9527070000?text=Hello%2C%20I%20would%20like%20to%20inquire%20about%20your%20services."
                              target="_blank"
                              rel="noopener noreferrer"
                              className="block px-5 py-2.5 text-sm font-medium text-slate-500 hover:bg-[#1a5fcd] hover:text-white transition-colors"
                            >
                              Don't know
                            </a>
                          </li>
                        </ul>
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
