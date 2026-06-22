import React, { useState } from 'react';
import { Mail, MapPin, Clock, ArrowRight, ChevronDown } from 'lucide-react';
import { motion } from 'framer-motion';

export default function Contact() {
  const [form, setForm] = useState({ name: '', email: '', phone: '', date: '', gender: '', age: '', scans: [], message: '', agree: false });
  const [submitted, setSubmitted] = useState(false);
  const [isScanOpen, setIsScanOpen] = useState(false);

  const scanOptions = [
    "PET-CT IMAGING PROCEDURE(FDG)", "RADIO IODINE THERAPY", "GALLIUM-68 PSMA SCAN",
    "DOTA SCAN", "THALLIUM SCAN", "BONE SCAN", "DTPA RENAL SCAN",
    "CAPTOPRIL RENAL SCAN", "COLLOID LIVER SCAN", "MUGA SCAN",
    "MILK SCAN (GE REFLUX)", "THYROID SCAN"
  ];

  const toggleScan = (scan) => {
    if (form.scans.includes(scan)) {
      setForm({ ...form, scans: form.scans.filter(s => s !== scan) });
    } else {
      setForm({ ...form, scans: [...form.scans, scan] });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 4000);
    setForm({ name: '', email: '', phone: '', date: '', gender: '', age: '', scans: [], message: '', agree: false });
  };

  return (
    <section id="contact" className="py-6 lg:py-10 bg-[#f3f1fb]">
      <div className="max-w-[1400px] mx-auto px-4 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12">
          {/* Left info */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8 }}
          >
            <div className="inline-flex items-center gap-2 text-[#3b7a24] font-display font-semibold mb-3">
              <span className="w-8 h-px bg-[#3b7a24]" />
              <span className="text-sm">We'd love to hear from you</span>
            </div>
            <h2 className="font-display font-extrabold text-navy text-2xl lg:text-3xl leading-[1.1] mb-8">
              Let's talk with us!
            </h2>

            <div className="space-y-4">
              {[
                { icon: Mail, title: 'Contact Us', desc: 'For inquiries, please contact us at:', link: 'drsolav1@gmail.com', href: 'mailto:drsolav1@gmail.com' },
                { icon: MapPin, title: 'Address', desc: 'Location Address Details:', link: 'Sr. No. 268, Behind Crystal Honda Showroom, Near Mantri Alpine and DSK Toyota, Mumbai - Banglore Highway, Bavdhan, Pune - 411 021', href: '#' },
                { icon: Clock, title: 'Work Time Information', desc: 'Working Hours Details:', link: 'Monday – Saturday: 7.00am – 7.00pm', href: '#' },
              ].map(({ icon: Icon, title, desc, link, href }) => (
                <div key={title} className="group bg-white rounded-2xl p-5 flex items-start gap-4 soft-shadow hover:-translate-y-1 transition-all">
                  <div className="w-12 h-12 rounded-xl bg-[#3b7a24] text-white flex items-center justify-center shrink-0">
                    <Icon className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="font-display font-bold text-navy text-base">{title}</h4>
                    <p className="text-navy/60 text-xs mb-1">{desc}</p>
                    <a href={href} className="font-display font-semibold text-navy text-sm group-hover:text-[#3b7a24] transition-colors">{link}</a>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Right form */}
          <motion.form 
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, delay: 0.2 }}
            onSubmit={handleSubmit} 
            className="bg-white rounded-[24px] p-5 lg:p-7 shadow-xl shadow-[#0e1a6b]/5 border border-gray-100"
          >
            <p className="text-navy/70 text-xs mb-6">By submitting this form you are agreeing to our Privacy Policy. We guarantee not to disclose your information.</p>
            
            <div className="grid sm:grid-cols-2 gap-4 mb-4">
              <input value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} type="text" placeholder="Your Name *" required className="bg-gray-50 border border-gray-200 rounded-full px-4 py-3 text-sm text-navy placeholder:text-navy/50 outline-none focus:border-[#3b7a24] transition-colors" />
              <input value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} type="email" placeholder="Your Email *" required className="bg-gray-50 border border-gray-200 rounded-full px-4 py-3 text-sm text-navy placeholder:text-navy/50 outline-none focus:border-[#3b7a24] transition-colors" />
            </div>

            <div className="grid sm:grid-cols-2 gap-4 mb-4">
              <input value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} type="tel" placeholder="Your Mobile Number *" required className="bg-gray-50 border border-gray-200 rounded-full px-4 py-3 text-sm text-navy placeholder:text-navy/50 outline-none focus:border-[#3b7a24] transition-colors" />
              <div className="relative">
                <input value={form.date} onChange={(e) => setForm({ ...form, date: e.target.value })} type="date" required className="w-full bg-gray-50 border border-gray-200 rounded-full px-4 py-3 text-sm text-navy outline-none focus:border-[#3b7a24] transition-colors appearance-none" style={{ colorScheme: 'light' }} />
              </div>
            </div>

            <div className="grid sm:grid-cols-2 gap-4 mb-4">
              <div className="relative">
                <select value={form.gender} onChange={(e) => setForm({ ...form, gender: e.target.value })} required className="appearance-none w-full bg-gray-50 border border-gray-200 rounded-full px-4 py-3 text-sm text-navy outline-none focus:border-[#3b7a24] transition-colors">
                  <option value="" className="text-navy">Gender *</option>
                  <option value="Male" className="text-navy">Male</option>
                  <option value="Female" className="text-navy">Female</option>
                  <option value="Other" className="text-navy">Other</option>
                </select>
                <ChevronDown className="w-4 h-4 text-navy/50 absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none" />
              </div>
              <input value={form.age} onChange={(e) => setForm({ ...form, age: e.target.value })} type="number" placeholder="Your Age *" required min="0" max="150" className="bg-gray-50 border border-gray-200 rounded-full px-4 py-3 text-sm text-navy placeholder:text-navy/50 outline-none focus:border-[#3b7a24] transition-colors" />
            </div>

            <div className="mb-4 relative">
              <label className="block text-navy font-bold text-xs mb-2">Select Scan(s) *</label>
              
              <div 
                onClick={() => setIsScanOpen(!isScanOpen)}
                className="w-full bg-gray-50 border border-gray-200 rounded-full px-4 py-3 text-sm text-navy flex justify-between items-center cursor-pointer transition-colors"
              >
                <span className={form.scans.length === 0 ? "text-navy/50" : "text-navy"}>
                  {form.scans.length === 0 ? "Select Scans..." : `${form.scans.length} selected`}
                </span>
                <ChevronDown className={`w-4 h-4 text-navy/50 transition-transform ${isScanOpen ? 'rotate-180' : ''}`} />
              </div>

              {isScanOpen && (
                <div className="absolute top-full left-0 right-0 mt-2 bg-white rounded-2xl shadow-xl overflow-hidden z-10 border border-gray-100 max-h-48 overflow-y-auto">
                  {scanOptions.map(scan => (
                    <label key={scan} className="flex items-center gap-3 px-4 py-2 hover:bg-gray-50 cursor-pointer border-b border-gray-50 last:border-0">
                      <input 
                        type="checkbox" 
                        checked={form.scans.includes(scan)}
                        onChange={() => toggleScan(scan)}
                        className="accent-[#3b7a24] w-3.5 h-3.5 shrink-0"
                      />
                      <span className="text-navy text-xs font-medium">{scan}</span>
                    </label>
                  ))}
                </div>
              )}
            </div>

            <textarea value={form.message} onChange={(e) => setForm({ ...form, message: e.target.value })} placeholder="Your Message..." rows={2} className="w-full bg-gray-50 border border-gray-200 rounded-[20px] px-4 py-3 text-sm text-navy placeholder:text-navy/50 outline-none focus:border-[#3b7a24] transition-colors mb-4 resize-none" />
            
            <label className="flex items-start gap-2 text-navy text-xs mb-6 cursor-pointer font-bold">
              <input type="checkbox" checked={form.agree} onChange={(e) => setForm({ ...form, agree: e.target.checked })} required className="accent-[#3b7a24] w-4 h-4 mt-0.5 shrink-0" />
              Procedure are done on FIRST COME FIRST SERVED BASIS
            </label>
            
<div className='flex justify-center'>
              <button type="submit" className="group inline-flex items-center gap-2 bg-[#3b7a24]  text-white font-display font-bold pl-5 pr-1.5 py-1.5 rounded transition-colors w-full sm:w-auto justify-center text-sm">
              {submitted ? 'Submitted!' : 'SUBMIT'}
              <span className="w-8 h-8 rounded-full bg-white text-[#3b7a24] flex items-center justify-center group-hover:rotate-45 transition-transform">
                <ArrowRight className="w-3.5 h-3.5" />
              </span>
            </button>
</div>
          </motion.form>
        </div>
      </div>
    </section>
  );
}
