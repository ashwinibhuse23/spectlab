import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Sparkles, ArrowRight, Award } from 'lucide-react';

export default function AnniversaryModal() {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    // Show popup whenever the website is opened or refreshed
    const timer = setTimeout(() => {
      setIsOpen(true);
    }, 600);
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
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-3 sm:p-5 md:p-6 overflow-y-auto">
          {/* Backdrop with Frosted Deep Blur */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            onClick={handleClose}
            className="fixed inset-0 bg-[#070e3d]/75 backdrop-blur-md"
          />

          {/* Modal Container: Horizontal Landscape Orientation */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 25 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.92, y: 15 }}
            transition={{ type: 'spring', damping: 28, stiffness: 320 }}
            className="relative w-full max-w-xl md:max-w-4xl lg:max-w-[940px] bg-white rounded-[28px] sm:rounded-[36px] shadow-2xl border border-emerald-500/20 overflow-hidden z-10 my-auto"
          >
            {/* Top Close Button */}
            <button
              onClick={handleClose}
              className="absolute top-3.5 right-3.5 sm:top-4 sm:right-4 w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-white/90 hover:bg-[#3b7a24] hover:text-white text-navy/70 flex items-center justify-center transition-all duration-200 z-30 shadow-md border border-slate-200/80 active:scale-95 cursor-pointer"
              aria-label="Close celebration modal"
            >
              <X className="w-4 h-4 sm:w-5 sm:h-5" />
            </button>

            {/* Main Horizontal Two-Column Layout */}
            <div className="flex flex-col md:flex-row items-stretch">

              {/* Left Column: PET-CT Scan Machine Showcase */}
              <div className="relative w-full md:w-[44%] min-h-[240px] sm:min-h-[280px] md:min-h-[420px] overflow-hidden bg-slate-900 flex flex-col justify-between">
                {/* PET-CT Machine Background Image */}
                <img
                  src="/petctscan.png"
                  alt="Advanced PET-CT Scanner at SPECT LAB"
                  className="absolute inset-0 w-full h-full object-cover object-center"
                />

                {/* Gentle ambient gradient overlay for sleek contrast */}
                <div className="absolute inset-0 bg-gradient-to-t from-navy/85 via-transparent to-black/20 pointer-events-none" />

                {/* Bottom Scanner Caption Tag */}
                <div className="relative z-10 mt-auto p-4 sm:p-5 bg-gradient-to-t from-navy/95 via-navy/70 to-transparent">
                  <span className="inline-block px-2.5 py-0.5 rounded-full bg-[#3b7a24]/90 text-white text-[9.5px] sm:text-[10px] font-bold uppercase tracking-wider mb-1 shadow-xs">
                    Advanced Diagnostics
                  </span>
                  <p className="text-white text-xs sm:text-[13px] font-display font-bold leading-tight">
                    State-of-the-Art PET-CT & SPECT-CT Suite
                  </p>
                  <p className="text-white/75 text-[10.5px] sm:text-[11px] font-medium tracking-wide mt-0.5">
                    Pioneering precision molecular imaging in Pune
                  </p>
                </div>
              </div>

              {/* Right Column: Brand Header, 25-Year Medallion, Story & Action */}
              <div className="w-full md:w-[56%] p-6 sm:p-7 lg:p-8 flex flex-col justify-between text-left relative bg-white">
                <div>
                  {/* Brand Header: Logo & Single-Line NABH Tag */}
                  <div className="flex items-center gap-2.5 sm:gap-3 mb-4 sm:mb-5">
                    <img
                      src="/Spectlab-1.svg"
                      alt="SPECT LAB"
                      className="h-8 sm:h-8.5 w-auto object-contain"
                    />
                    <div className="h-5 w-px bg-slate-200" />
                    <div className="flex items-center gap-1.5 bg-white border border-slate-200/90 px-2.5 sm:px-3 py-1 rounded-full shadow-2xs">
                      <img
                        src="/nabh.png"
                        alt="NABH Accredited"
                        className="h-5 w-5 sm:h-5.5 sm:w-5.5 object-contain shrink-0"
                      />
                      <span className="text-[10px] sm:text-[11px] font-extrabold tracking-wider text-navy uppercase whitespace-nowrap">
                        NABH <span className="text-[#3b7a24]">Accredited</span>
                      </span>
                    </div>
                  </div>

                  {/* Compact 25-Year Silver Jubilee Badge */}
                  <div className="inline-flex items-center gap-2.5 px-3 py-1.5 rounded-full bg-gradient-to-r from-[#f4fbf1] via-white to-[#f4fbf1] border border-emerald-500/25 shadow-2xs mb-3.5">
                    {/* Small 25 Yrs Medallion */}
                    <div className="relative w-7 h-7 sm:w-7.5 sm:h-7.5 rounded-full bg-gradient-to-br from-[#3b7a24] via-[#2f661c] to-[#1c4710] text-white flex flex-col items-center justify-center shrink-0 shadow-xs border border-emerald-300/40">
                      <span className="font-display font-black text-xs leading-none">25</span>
                      <span className="text-[6px] font-bold uppercase tracking-tight text-emerald-200 -mt-0.5">Yrs</span>
                      <span className="absolute -top-0.5 -right-0.5 w-2.5 h-2.5 rounded-full bg-amber-400 border border-white flex items-center justify-center">
                        <Sparkles className="w-1.5 h-1.5 text-white" />
                      </span>
                    </div>

                    {/* Milestone Titles */}
                    <div className="flex flex-col text-left leading-tight pr-1">
                      <div className="flex items-center gap-1 text-[9.5px] sm:text-[10px] font-extrabold text-[#3b7a24] uppercase tracking-wider">
                        <Award className="w-3 h-3 text-[#3b7a24]" />
                        <span>2001 – 2026 • Silver Jubilee</span>
                      </div>
                      <span className="text-[11px] sm:text-[11.5px] font-bold text-navy">
                        A Quarter-Century of Clinical Trust
                      </span>
                    </div>
                  </div>

                  {/* Headline */}
                  <h2 className="font-display font-extrabold text-xl sm:text-2xl text-navy tracking-tight leading-snug mb-2.5">
                    Celebrating <span className="text-[#3b7a24]">25 Glorious Years</span> of Healing & Precision
                  </h2>

                  {/* Subtitle / Story */}
                  <p className="text-navy/70 text-xs sm:text-[12.5px] leading-relaxed mb-5 font-normal">
                    Founded in 2001 by <strong className="text-navy font-semibold">Dr. Shrikant Solav</strong>, SPECT LAB introduced the <strong className="text-navy font-semibold">1st PET-CT facility in Pune</strong> and has dedicated 25 years to advancing nuclear medicine, diagnostic precision, and compassionate patient care.
                  </p>
                </div>

                {/* Primary & Secondary Action Buttons */}
                <div className="pt-1 flex flex-col sm:flex-row items-center gap-3">
                  <button
                    onClick={handleClose}
                    className="w-full sm:w-auto inline-flex items-center justify-center gap-1.5 bg-gradient-to-r from-[#3b7a24] via-[#32691e] to-[#255417] text-white font-display font-bold text-[11px] sm:text-xs uppercase tracking-wider py-2 sm:py-2.5 px-4.5 sm:px-5 rounded-full hover:from-[#255417] hover:to-[#3b7a24] transition-all duration-300 shadow-sm shadow-[#3b7a24]/20 hover:scale-[1.01] active:scale-95 cursor-pointer"
                  >
                    <span>Continue to Website</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>

                  <Link
                    to="/about"
                    onClick={handleClose}
                    className="w-full sm:w-auto inline-flex items-center justify-center text-[11px] sm:text-xs text-[#3b7a24] hover:text-navy font-display font-bold uppercase tracking-wider transition-colors py-2 px-3 group"
                  >
                    <span>Read Our Story</span>
                    <span className="transition-transform group-hover:translate-x-1">→</span>
                  </Link>
                </div>
              </div>

            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
