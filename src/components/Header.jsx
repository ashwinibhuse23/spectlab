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
  <Link to="/" className="flex items-center group transition-transform duration-300 hover:scale-105">
    <img
      src="/Spectlab-1.svg"
      alt="SpectLab - Nuclear Medicine Services"
      className="h-12 md:h-14 lg:h-15 w-auto object-contain transition-all duration-300"
    />
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
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${scrolled ? 'py-3' : 'py-5'}`}>
      <div className="max-w-[1400px] mx-auto px-4 lg:px-8">
        <div
          className={`flex items-center justify-between rounded-2xl px-4 lg:px-6 xl:px-8 py-2 transition-all duration-500 border border-white/40 shadow-sm
            ${scrolled
              ? 'bg-white/80 backdrop-blur-xl shadow-xl shadow-navy/5 border-white/60'
              : 'bg-white/45 backdrop-blur-lg border-white/30'
            }`}
        >
          <Logo />

          <nav className="hidden lg:flex items-center gap-6 lg:gap-8 xl:gap-10">
            {navItems.map((item) => (
              <div key={item.label} className="relative group py-2.5">
                <Link
                  to={item.to}
                  className={`relative flex items-center gap-1.5 font-display font-semibold text-[11px] xl:text-[12px] whitespace-nowrap tracking-wide uppercase transition-colors duration-300 py-1
                    ${isActive(item.to) ? 'text-[#3b7a24]' : 'text-navy/90 hover:text-[#3b7a24]'}
                  `}
                >
                  <span>{item.label}</span>
                  {item.children && <ChevronDown className="w-3.5 h-3.5 transition-transform duration-300 group-hover:rotate-180" />}

                  {/* Underline hover animation */}
                  <span className={`absolute bottom-0 left-0 h-[2px] bg-[#3b7a24] transition-all duration-300 
                    ${isActive(item.to) ? 'w-full' : 'w-0 group-hover:w-full'}
                  `} />
                </Link>

                {item.children && (
                  <div className="absolute top-full left-0 pt-3 opacity-0 invisible translate-y-2 group-hover:opacity-100 group-hover:visible group-hover:translate-y-0 transition-all duration-300 z-50">
                    <div className="bg-white/95 backdrop-blur-md rounded-xl shadow-2xl py-2 min-w-[200px] border border-navy/5 overflow-hidden">
                      {item.children.map((c) => (
                        <Link
                          key={c.to}
                          to={c.to}
                          className="block px-5 py-2.5 text-sm font-display font-semibold text-navy hover:bg-[#3b7a24]/10 hover:text-[#3b7a24] transition-all duration-200 hover:pl-6"
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

          <div className="flex items-center gap-3">
            <Link
              to="/appointment"
              className="hidden md:inline-flex items-center gap-2.5 bg-gradient-to-r from-[#3b7a24] to-[#2d661b] text-white font-display font-bold text-[14px] tracking-wide uppercase pl-5 pr-1 py-1 rounded-full hover:from-[#2d661b] hover:to-[#3b7a24] transition-all duration-300 hover:scale-105 shadow-md shadow-navy/10 hover:shadow-[#3b7a24]/20"
            >
              Appointment
              <span className="w-8 h-8 bg-white text-navy rounded-full flex items-center justify-center">
                <ArrowRight className="w-3.5 h-3.5" />
              </span>
            </Link>

            <button
              onClick={() => setOpen(!open)}
              className="lg:hidden w-10 h-10 rounded-full bg-navy/5 text-navy flex items-center justify-center transition-transform duration-200 active:scale-95"
            >
              {open ? <X className="w-5 h-5 animate-in fade-in zoom-in duration-200" /> : <Menu className="w-5 h-5 animate-in fade-in zoom-in duration-200" />}
            </button>
          </div>
        </div>

        {open && (
          <div className="lg:hidden mt-2 bg-white/95 backdrop-blur-xl border border-white/60 rounded-2xl p-4 shadow-xl space-y-1 animate-in slide-in-from-top-4 duration-300">
            {navItems.map((item) => (
              <div key={item.label}>
                <Link
                  to={item.to}
                  className={`block font-display font-bold py-2.5 border-b border-navy/5 transition-colors ${isActive(item.to) ? 'text-[#3b7a24]' : 'text-navy hover:text-[#3b7a24]'}`}
                >
                  {item.label}
                </Link>
                {item.children && (
                  <div className="pl-4 py-1 space-y-1">
                    {item.children.map((c) => (
                      <Link
                        key={c.to}
                        to={c.to}
                        className={`block py-2 text-sm font-semibold transition-colors ${isActive(c.to) ? 'text-[#3b7a24]' : 'text-navy/70 hover:text-[#3b7a24]'}`}
                      >
                        {c.label}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            ))}
            <Link to="/appointment" className="block bg-gradient-to-r from-[#3b7a24] to-[#2d661b] text-white text-center font-display font-bold py-3 rounded-full mt-3 hover:from-[#2d661b] hover:to-[#3b7a24] transition-all duration-300">
              Appointment
            </Link>
          </div>
        )}
      </div>
    </header>
  );
}
