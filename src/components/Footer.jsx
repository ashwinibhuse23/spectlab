import React from 'react';
import { Link } from 'react-router-dom';
import { Facebook, Linkedin, Mail, MapPin, Phone, ArrowUp } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="relative bg-gradient-to-br from-[#0e1a6b] via-[#14267e] to-[#2542a1] text-white pt-20 pb-8 overflow-hidden">
      <div className="absolute inset-0 dot-pattern opacity-20 pointer-events-none" />
      <div className="relative max-w-[1400px] mx-auto px-4 lg:px-8">
        <div className="grid lg:grid-cols-12 gap-10 pb-12 border-b border-white/10">
          <div className="lg:col-span-4">
            <Link to="/" className="inline-block mb-2">
              <img src="/Spectlab-2.svg" alt="SPECT LAB" className="h-20 md:h-24 w-auto object-contain" />
            </Link>
            <p className="text-white/60 text-sm leading-relaxed mb-6 max-w-sm">
              SPECT LAB is a proprietary organization started in the year 2001 by Dr. Shrikant Solav who holds a post graduate degree in medicine and nuclear medicine.
            </p>
            <div className="flex items-center gap-3">
              <a href="https://www.facebook.com/people/SPECT-LAB-Nuclear-Medicine-Service-and-Diagnostic-Center/100068087030012/#" target="_blank" rel="noopener noreferrer" className="w-8 h-8 rounded-full bg-white hover:bg-[#3b7a24] text-[#3b7a24] hover:text-white flex items-center justify-center transition-colors">
                <Facebook className="w-4 h-4" />
              </a>
              <a href="https://x.com/Spectlab" target="_blank" rel="noopener noreferrer" className="w-8 h-8 rounded-full bg-white hover:bg-[#3b7a24] text-[#3b7a24] hover:text-white flex items-center justify-center transition-colors">
                <svg viewBox="0 0 24 24" className="w-3.5 h-3.5" fill="currentColor">
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.008 5.975H5.03z" />
                </svg>
              </a>
              <a href="https://www.linkedin.com/company/spect-lab-nuclear-medicine-service-and-diagnostic-center/?originalSubdomain=in" target="_blank" rel="noopener noreferrer" className="w-8 h-8 rounded-full bg-white hover:bg-[#3b7a24] text-[#3b7a24] hover:text-white flex items-center justify-center transition-colors">
                <Linkedin className="w-4 h-4" />
              </a>
            </div>
          </div>

          <div className="lg:col-span-2 pt-2">
            <h4 className="font-display font-bold text-lg mb-5">Quick Links</h4>
            <ul className="space-y-3 text-white/70 text-sm">
              {[
                { label: 'Home', to: '/' },
                { label: 'About Us', to: '/about' },
                { label: 'Services', to: '/services' },
                { label: 'Contact', to: '/contact' },
              ].map((l) => (
                <li key={l.to}><Link to={l.to} className="hover:text-[#3b7a24] transition-colors">{l.label}</Link></li>
              ))}
            </ul>
          </div>

          <div className="lg:col-span-3 pt-2 lg:-ml-12">
            <h4 className="font-display font-bold text-lg mb-5">Opening Hours</h4>
            <div className="space-y-3 text-white/70 text-sm">
              <div className="flex justify-between items-center border-b border-white/10 pb-2">
                <span>Monday - Sat</span>
                <span className="font-bold text-white bg-white/10 px-3 py-1 rounded-full text-xs">7 AM TO 7 PM</span>
              </div>
              <div className="flex justify-between items-center">
                <span>Sunday</span>
                <span className="font-bold text-rose-400 bg-rose-400/10 px-3 py-1 rounded-full text-xs">Closed</span>
              </div>
            </div>
          </div>

          <div className="lg:col-span-3 pt-2">
            <h4 className="font-display font-bold text-lg mb-5">Contact Info</h4>
            <ul className="space-y-3 text-white/70 text-sm">
              <li className="flex items-start gap-3"><MapPin className="w-5 h-5 mt-0.5 text-white shrink-0" /> Sr. No. 268, Behind Crystal Honda Showroom, Near Mantri Alpine and DSK Toyota, Mumbai - Banglore Highway, Bavdhan, Pune - 411 021</li>
              <li className="flex items-start gap-3">
                <Phone className="w-5 h-5 mt-0.5 text-white shrink-0" />
                <div className="flex flex-col gap-1">
                  <a href="tel:+919527070000" className="hover:text-[#3b7a24] transition-colors">+91-9527070000</a>
                  <a href="tel:+918975758509" className="hover:text-[#3b7a24] transition-colors">+91-8975758509</a>
                  <a href="tel:+918975758566" className="hover:text-[#3b7a24] transition-colors">+91-8975758566</a>
                </div>
              </li>
              <li className="flex items-start gap-3"><Mail className="w-5 h-5 mt-0.5 text-white shrink-0" /> drsolav1@gmail.com</li>
              <li className="flex items-start gap-3"><Mail className="w-5 h-5 mt-0.5 text-white shrink-0" /> kiran.ayre@spectlab.com</li>
            </ul>
          </div>
        </div>

        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-white/50 text-sm">© {new Date().getFullYear()} SPECT LAB. All rights reserved.</p>
          <div className="flex items-center gap-6 text-sm text-white/60">
            <a href="#" className="hover:text-[#3b7a24]">Privacy Policy</a>
            <a href="#" className="hover:text-[#3b7a24]">Terms</a>
            <a href="#" className="hover:text-[#3b7a24]">Cookies</a>
          </div>
        </div>
      </div>

      <button onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} className="fixed bottom-6 right-6 z-40 w-8 h-8 rounded-full bg-[#3b7a24] hover:bg-[#2d661b] text-white flex items-center justify-center shadow-2xl transition-colors">
        <ArrowUp className="w-4 h-4" />
      </button>
    </footer>
  );
}
