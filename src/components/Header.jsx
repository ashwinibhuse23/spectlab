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
  <Link to="/" className="flex items-center gap-2.5 sm:gap-3 group transition-transform duration-300 hover:scale-[1.01] shrink-0">
    <img
      src="/Spectlab-1.svg"
      alt="SpectLab - Nuclear Medicine Services"
      className="h-10 sm:h-11 md:h-12 lg:h-[48px] w-auto object-contain transition-all duration-300"
    />
    <div className="h-7 w-px bg-navy/15 shrink-0 mx-0.5 sm:mx-1" />
    <div className="flex items-center gap-2 bg-white/95 border border-slate-200/90 px-3 py-1.5 rounded-full shadow-2xs group-hover:border-[#3b7a24]/50 transition-all shrink-0">
      <img
        src="/nabh.png"
        alt="NABH Accredited"
        className="h-8 w-8 max-h-8 max-w-8 object-contain shrink-0"
      />
      <div className="flex flex-col text-left leading-tight pr-1">
        <span className="text-[11px] font-extrabold tracking-wider text-navy uppercase">NABH</span>
        <span className="text-[9.5px] text-[#3b7a24] font-bold tracking-wide uppercase">Accredited</span>
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
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${scrolled ? 'py-2' : 'py-3'}`}>
      <div className="max-w-[1680px] mx-auto px-3 sm:px-5 lg:px-8">
        <div
          className={`flex items-center justify-between rounded-full px-5 sm:px-7 lg:px-8 py-2.5 transition-all duration-500 border border-white/60 shadow-md shadow-navy/5
            ${scrolled
              ? 'bg-white/95 backdrop-blur-xl shadow-lg shadow-navy/10 border-white/80'
              : 'bg-white/85 backdrop-blur-md border-white/50'
            }`}
        >
          <Logo />

          <nav className="hidden lg:flex items-center gap-5 lg:gap-7 xl:gap-9">
            {navItems.map((item) => (
              <div key={item.label} className="relative group py-1">
                <Link
                  to={item.to}
                  className={`relative flex items-center gap-1 font-display font-semibold text-[13.5px] lg:text-[14.5px] xl:text-[15px] whitespace-nowrap tracking-wider uppercase transition-colors duration-300 py-1
                    ${isActive(item.to) ? 'text-[#3b7a24]' : 'text-navy/90 hover:text-[#3b7a24]'}
                  `}
                >
                  <span>{item.label}</span>
                  {item.children && <ChevronDown className="w-4 h-4 transition-transform duration-300 group-hover:rotate-180" />}

                  {/* Underline hover animation */}
                  <span className={`absolute -bottom-1 left-0 h-[2.5px] rounded-full bg-[#3b7a24] transition-all duration-300 
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
                          className="block px-5 py-2.5 text-[14.5px] font-display font-semibold text-navy hover:bg-[#3b7a24]/10 hover:text-[#3b7a24] transition-all duration-200 hover:pl-6"
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

          <div className="flex items-center gap-3 shrink-0">
            <Link
              to="/appointment"
              className="group hidden md:inline-flex items-center gap-2.5 bg-gradient-to-r from-[#3b7a24] via-[#32691e] to-[#255417] text-white font-display font-bold text-[13.5px] xl:text-[14.5px] tracking-wider uppercase pl-5 pr-1.5 py-1.5 rounded-full hover:from-[#255417] hover:to-[#3b7a24] transition-all duration-300 hover:scale-[1.02] shadow-md shadow-[#3b7a24]/20 border border-white/20 active:scale-95"
            >
              <span>Appointment</span>
              <span className="w-8 h-8 bg-white text-[#3b7a24] rounded-full flex items-center justify-center shadow-sm group-hover:rotate-45 transition-transform duration-300 shrink-0">
                <ArrowRight className="w-4 h-4" />
              </span>
            </Link>

            <button
              onClick={() => setOpen(!open)}
              className="lg:hidden w-11 h-11 rounded-full bg-navy/5 text-navy flex items-center justify-center transition-transform duration-200 active:scale-95"
            >
              {open ? <X className="w-6 h-6 animate-in fade-in zoom-in duration-200" /> : <Menu className="w-6 h-6 animate-in fade-in zoom-in duration-200" />}
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


