import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';

export default function AnniversaryModal() {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    // Show popup whenever the website is opened or refreshed
    const timer = setTimeout(() => {
      setIsOpen(true);
    }, 500);
    return () => clearTimeout(timer);
  }, []);

  const handleClose = () => {
    setIsOpen(false);
  };

  // Close on Escape key
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape' && isOpen) {
        handleClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen]);

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-3 sm:p-4 overflow-y-auto">
          {/* Backdrop with Frosted Deep Navy Blur */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            onClick={handleClose}
            className="fixed inset-0 bg-[#070e3d]/75 backdrop-blur-md"
          />

          {/* Modal Container: Compact, Elegant Warm Champagne Silk Card */}
          <motion.div
            initial={{ opacity: 0, scale: 0.92, y: 15 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.94, y: 10 }}
            transition={{ type: 'spring', damping: 28, stiffness: 320 }}
            className="relative w-full max-w-lg md:max-w-xl lg:max-w-[660px] bg-[#fdfbf7] rounded-[24px] sm:rounded-[30px] shadow-2xl shadow-amber-950/25 border border-[#e8d7bb] overflow-hidden z-10 my-auto"
          >
            {/* Ambient Golden Shimmer Background Glows */}
            <div className="absolute -top-24 -right-24 w-72 h-72 bg-gradient-to-br from-amber-100/50 via-amber-50/20 to-transparent rounded-full blur-2xl pointer-events-none" />
            <div className="absolute -bottom-24 -left-24 w-72 h-72 bg-gradient-to-tr from-amber-100/40 via-amber-50/15 to-transparent rounded-full blur-2xl pointer-events-none" />

            {/* Top Header: SPECT LAB Logo & Compact Close Button */}
            <div className="relative z-20 flex items-center justify-between gap-3 px-5 sm:px-6 pt-3.5 sm:pt-4">
              {/* Brand Logo & NABH Accredited Badge */}
              <div className="flex items-center gap-2 sm:gap-2.5">
                <img
                  src="/Spectlab-1.svg"
                  alt="Dr. Solav's SPECT LAB Nuclear Medicine Services"
                  className="h-9.5 sm:h-10.5 md:h-11 w-auto object-contain"
                />
                <div className="h-6 sm:h-7 w-px bg-slate-300/70 shrink-0 mx-0.5" />
                <div className="flex items-center gap-1.5 bg-white border border-slate-200/90 px-2.5 sm:px-3 py-1 sm:py-1.5 rounded-full shadow-2xs shrink-0">
                  <img
                    src="/nabh.png"
                    alt="NABH Accredited"
                    className="h-5 w-5 sm:h-5.5 sm:w-5.5 object-contain shrink-0"
                  />
                  <div className="flex flex-col text-left leading-none pr-0.5">
                    <span className="text-[9px] sm:text-[10px] font-extrabold tracking-wider text-navy uppercase">NABH</span>
                    <span className="text-[7.5px] sm:text-[8.5px] text-[#3b7a24] font-bold tracking-wide uppercase mt-0.5">Accredited</span>
                  </div>
                </div>
              </div>

              {/* Close Button */}
              <button
                onClick={handleClose}
                className="w-7.5 h-7.5 sm:w-8 sm:h-8 rounded-full bg-white/90 hover:bg-white text-navy/70 hover:text-navy border border-slate-200/80 shadow-xs flex items-center justify-center transition-all duration-200 cursor-pointer active:scale-95 shrink-0"
                aria-label="Close on modal"
              >
                <X className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
              </button>
            </div>

            {/* Center Visual: Complete 3D Golden Circle & Flowing Silk Ribbons */}
            <div className="relative z-10 w-full flex justify-center -mt-1 sm:-mt-2">
              <img
                src="/anniversary-ribbon-seamless.png"
                alt="25 Years of Services "
                className="w-full max-h-[175px] sm:max-h-[200px] md:max-h-[220px] object-contain select-none pointer-events-none"
              />
            </div>

            {/* Headline & Subtitle Typography */}
            <div className="relative z-20 text-center px-4 sm:px-6 mt-1.5 sm:mt-2.5">
              <h2 className="font-['Minion_Pro',_Georgia,_'Times_New_Roman',_serif] italic font-bold text-xl sm:text-2xl md:text-[24px] lg:text-[26px] text-[#005932] tracking-tight leading-snug">
                25 Years of Services
                <br />
                with Care, Compassion and Conviction
              </h2>
            </div>

            {/* Bottom Action Row: Compact Read Our Story Link & Continue to Website Button */}
            <div className="relative z-20 flex flex-col-reverse sm:flex-row items-center justify-between gap-3 sm:gap-4 px-5 sm:px-7 pb-4 sm:pb-5 pt-2.5 sm:pt-3">
              {/* Read Our Story Link */}
            
              {/* Continue to Website Golden Pill Button */}
              <button
                onClick={handleClose}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-1 bg-gradient-to-r from-[#b37a1f] via-[#c68e2b] to-[#a36d19] text-white font-display font-bold text-[10px] sm:text-[11px] uppercase tracking-wider py-1 sm:py-1.5 px-3.5 sm:px-4 rounded-full hover:from-[#a36d19] hover:to-[#b37a1f] transition-all duration-300 shadow-sm shadow-amber-900/20 hover:scale-[1.02] active:scale-95 cursor-pointer"
              >
                <span>CONTINUE TO WEBSITE</span>
                <span className="text-[11px] leading-none">→</span>
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
