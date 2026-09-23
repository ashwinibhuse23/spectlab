import React, { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Search, Plus, ArrowRight, ChevronDown, Menu, X } from 'lucide-react';

const navItems = [
  { label: 'Home', to: '/' },
  { label: 'About Us', to: '/about' },
  { label: 'Services', to: '/services' },
  { label: 'Publications', to: '/publications' },
  { label: 'Newsletter', to: '/newsletter' },
  { label: 'Gallery', to: '/gallery' },
  { label: 'Contact', to: '/contact' },
];

const Logo = () => (
  <Link to="/" className="flex items-center gap-2 sm:gap-2.5 group transition-transform duration-300 hover:scale-[1.01] shrink-0">
    <img
      src="/Spectlab-1.svg"
      alt="SpectLab - Nuclear Medicine Services"
      className="h-9 sm:h-[38px] md:h-10 lg:h-[42px] xl:h-[45px] w-auto object-contain transition-all duration-300"
    />
    <div className="h-6 sm:h-6.5 w-px bg-navy/15 shrink-0 mx-0.5 sm:mx-1" />
    <div className="flex items-center gap-1.5 bg-white/95 border border-slate-200/90 px-2 sm:px-2.5 py-1 rounded-full shadow-2xs group-hover:border-[#3b7a24]/50 transition-all shrink-0">
      <img
        src="/nabh.png"
        alt="NABH Accredited"
        className="h-6 w-6 sm:h-6.5 sm:w-6.5 xl:h-7 xl:w-7 object-contain shrink-0"
      />
      <div className="flex flex-col text-left leading-none pr-0.5">
        <span className="text-[9.5px] sm:text-[10px] font-extrabold tracking-wider text-navy uppercase">NABH</span>
        <span className="text-[8px] sm:text-[8.5px] text-[#3b7a24] font-bold tracking-wide uppercase">Accredited</span>
      </div>
    </div>
  </Link>
);

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 30);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => { setOpen(false); }, [location.pathname]);

  const isActive = (to) => location.pathname === to;

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? 'py-1.5 sm:py-2' : 'py-2 sm:py-2.5'}`}>
      <div className="max-w-[1440px] 2xl:max-w-[1536px] mx-auto px-3 sm:px-4 md:px-6">
        <div
          className={`w-full flex items-center justify-between rounded-full px-3.5 sm:px-5 lg:px-4 xl:px-6 py-1.5 sm:py-2 transition-all duration-300 border border-white/70 shadow-sm shadow-navy/5
            ${scrolled
              ? 'bg-white/95 backdrop-blur-xl shadow-md shadow-navy/10 border-white/80'
              : 'bg-white/90 backdrop-blur-md border-white/60'
            }`}
        >
          <Logo />

          <nav className="hidden lg:flex items-center gap-3.5 lg:gap-4.5 xl:gap-6 2xl:gap-7 shrink-0">
            {navItems.map((item) => (
              <div key={item.label} className="relative group py-1">
                <Link
                  to={item.to}
                  className={`relative flex items-center gap-1 font-display font-semibold text-[11.5px] lg:text-[12px] xl:text-[13px] 2xl:text-[13.5px] whitespace-nowrap tracking-wide uppercase transition-colors duration-200 py-1
                    ${isActive(item.to) ? 'text-[#3b7a24]' : 'text-navy/85 hover:text-[#3b7a24]'}
                  `}
                >
                  <span>{item.label}</span>
                  {item.children && <ChevronDown className="w-3.5 h-3.5 transition-transform duration-300 group-hover:rotate-180" />}

                  {/* Underline hover animation */}
                  <span className={`absolute -bottom-0.5 left-0 h-[2px] rounded-full bg-[#3b7a24] transition-all duration-300 
                    ${isActive(item.to) ? 'w-full' : 'w-0 group-hover:w-full'}
                  `} />
                </Link>

                {item.children && (
                  <div className="absolute top-full left-0 pt-3 opacity-0 invisible translate-y-2 group-hover:opacity-100 group-hover:visible group-hover:translate-y-0 transition-all duration-300 z-50">
                    <div className="bg-white/95 backdrop-blur-md rounded-xl shadow-2xl py-2.5 min-w-[210px] border border-navy/5 overflow-hidden">
                      {item.children.map((c) => (
                        <Link
                          key={c.to}
                          to={c.to}
                          className="block px-5 py-2.5 text-[13.5px] font-display font-semibold text-navy hover:bg-[#3b7a24]/10 hover:text-[#3b7a24] transition-all duration-200 hover:pl-6"
                        >
                          {c.label}
                        </Link>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            ))}
          </nav>

          <div className="flex items-center gap-2 sm:gap-2.5 shrink-0">
            <Link
              to="/appointment"
              className="group hidden sm:inline-flex items-center gap-2 bg-gradient-to-r from-[#3b7a24] via-[#32691e] to-[#255417] text-white font-display font-bold text-[11.5px] xl:text-[12.5px] tracking-wider uppercase pl-3.5 sm:pl-4 xl:pl-4.5 pr-1 py-1 xl:py-1.5 rounded-full hover:from-[#255417] hover:to-[#3b7a24] transition-all duration-300 hover:scale-[1.02] shadow-sm shadow-[#3b7a24]/20 border border-white/20 active:scale-95 shrink-0"
            >
              <span>Appointment</span>
              <span className="w-6 h-6 xl:w-7 xl:h-7 bg-white text-[#3b7a24] rounded-full flex items-center justify-center shadow-xs group-hover:rotate-45 transition-transform duration-300 shrink-0">
                <ArrowRight className="w-3.5 h-3.5" />
              </span>
            </Link>

            <button
              onClick={() => setOpen(!open)}
              className="lg:hidden w-8.5 h-8.5 sm:w-9 sm:h-9 rounded-full bg-navy/5 text-navy flex items-center justify-center transition-transform duration-200 active:scale-95"
              aria-label="Toggle menu"
            >
              {open ? <X className="w-5 h-5 animate-in fade-in zoom-in duration-200" /> : <Menu className="w-5 h-5 animate-in fade-in zoom-in duration-200" />}
            </button>
          </div>
        </div>

        {open && (
          <div className="lg:hidden mt-2 bg-white/95 backdrop-blur-xl border border-white/60 rounded-2xl p-5 shadow-xl space-y-2 animate-in slide-in-from-top-4 duration-300">
            {navItems.map((item) => (
              <div key={item.label}>
                <Link
                  to={item.to}
                  className={`block font-display font-bold text-base md:text-lg py-3 border-b border-navy/5 transition-colors ${isActive(item.to) ? 'text-[#3b7a24]' : 'text-navy hover:text-[#3b7a24]'}`}
                >
                  {item.label}
                </Link>
                {item.children && (
                  <div className="pl-4 py-1 space-y-1">
                    {item.children.map((c) => (
                      <Link
                        key={c.to}
                        to={c.to}
                        className={`block py-2 text-base font-semibold transition-colors ${isActive(c.to) ? 'text-[#3b7a24]' : 'text-navy/70 hover:text-[#3b7a24]'}`}
                      >
                        {c.label}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            ))}
            <Link to="/appointment" className="block bg-gradient-to-r from-[#3b7a24] to-[#2d661b] text-white text-center font-display font-bold text-base py-3.5 rounded-full mt-3 hover:from-[#2d661b] hover:to-[#3b7a24] transition-all duration-300">
              Appointment
            </Link>
          </div>
        )}
      </div>
    </header>
  );
}


