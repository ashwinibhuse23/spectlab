import React, { useState } from 'react';
import PageHeader from '../components/PageHeader';
import { ArrowRight, ChevronDown, Calendar, Clock, User, Mail, Phone as PhoneIcon, Check, Stethoscope, ShieldCheck, HeartPulse } from 'lucide-react';
import { services } from '../mock';

const times = ['09:00 AM', '10:00 AM', '11:00 AM', '12:00 PM', '02:00 PM', '03:00 PM', '04:00 PM', '05:00 PM'];

export default function AppointmentPage() {
  const [form, setForm] = useState({ name: '', email: '', phone: '', date: '', time: '', department: '', message: '', agree: false });
  const [done, setDone] = useState(false);

  const submit = (e) => {
    e.preventDefault();
    setDone(true);
    setTimeout(() => setDone(false), 5000);
  };

  return (
    <>
      <PageHeader title="Book Your Appointment" subtitle="Care Without the Wait" breadcrumbs={[{ label: 'Appointment' }]} image="/Images/servicesHero.jpg" />

      <section className="py-24 ">
        <div className="max-w-[1400px] mx-auto px-4 lg:px-8 grid lg:grid-cols-5 gap-10">
          <div className="lg:col-span-2 space-y-6">
            <div className="bg-white rounded-3xl p-8 text-navy border border-slate-100">
              <h3 className="font-display font-extrabold text-2xl mb-4 text-navy">Why book with SPECT LAB?</h3>
              <ul className="space-y-4">
                {[
                  { icon: Stethoscope, t: 'Board-Certified Specialists', d: 'Access top doctors across 20+ specialties.' },
                  { icon: Clock, t: 'Same-Day Diagnostics', d: 'Imaging and lab work scheduled in one visit.' },
                  { icon: ShieldCheck, t: 'Insurance Friendly', d: 'We accept 100+ plans and offer clear estimates.' },
                  { icon: HeartPulse, t: '24/7 Nurse Hotline', d: 'Talk to a clinician anytime you need guidance.' },
                ].map(({ icon: Icon, t, d }) => (
                  <li key={t} className="flex gap-4">
                    <span className="w-11 h-11 shrink-0 rounded-2xl bg-blue-100 text-navy flex items-center justify-center"><Icon className="w-5 h-5" /></span>
                    <div>
                      <div className="font-display font-bold">{t}</div>
                      <div className="text-navy/70 text-sm">{d}</div>
                    </div>
                  </li>
                ))}
              </ul>
            </div>

            <div className="bg-white rounded-3xl p-8 soft-shadow">
              <h4 className="font-display font-bold text-navy text-lg mb-3">Need help right now?</h4>
              <p className="text-navy/70 text-sm mb-4">Our care navigators can answer questions and help you choose the right provider.</p>
              <div className="flex flex-col gap-3">
                <a href="tel:+919527070000" className="inline-flex items-center gap-3 text-[#0e1a6b] hover:opacity-80 font-display font-bold py-2 transition-opacity w-full sm:w-fit">
                  <PhoneIcon className="w-4 h-4" /> +91-9527070000
                </a>
                <a href="tel:+918975758509" className="inline-flex items-center gap-3 text-[#0e1a6b] hover:opacity-80 font-display font-bold py-2 transition-opacity w-full sm:w-fit">
                  <PhoneIcon className="w-4 h-4" /> +91-8975758509
                </a>
                <a href="tel:+918975758566" className="inline-flex items-center gap-3 text-[#0e1a6b] hover:opacity-80 font-display font-bold py-2 transition-opacity w-full sm:w-fit">
                  <PhoneIcon className="w-4 h-4" /> +91-8975758566
                </a>
              </div>
            </div>
          </div>

          <form onSubmit={submit} className="lg:col-span-3 bg-white rounded-3xl p-8 lg:p-10 soft-shadow">
            <h2 className="font-display font-extrabold text-navy text-3xl lg:text-4xl mb-2">Patient information</h2>
            <p className="text-navy/60 mb-8">Fill out the form and we’ll confirm your visit within 1 business hour.</p>

            <div className="grid sm:grid-cols-2 gap-4 mb-4">
              <div className="relative">
                <User className="w-4 h-4 absolute left-5 top-1/2 -translate-y-1/2 text-navy/40" />
                <input required value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} placeholder="Full Name *" className="w-full bg-[#f3f1fb] rounded-full pl-12 pr-5 py-4 outline-none text-sm focus:ring-2 focus:ring-mint/40" />
              </div>
              <div className="relative">
                <Mail className="w-4 h-4 absolute left-5 top-1/2 -translate-y-1/2 text-navy/40" />
                <input required type="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} placeholder="Email *" className="w-full bg-[#f3f1fb] rounded-full pl-12 pr-5 py-4 outline-none text-sm focus:ring-2 focus:ring-mint/40" />
              </div>
            </div>

            <div className="grid sm:grid-cols-2 gap-4 mb-4">
              <div className="relative">
                <PhoneIcon className="w-4 h-4 absolute left-5 top-1/2 -translate-y-1/2 text-navy/40" />
                <input required value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} placeholder="Phone *" className="w-full bg-[#f3f1fb] rounded-full pl-12 pr-5 py-4 outline-none text-sm focus:ring-2 focus:ring-mint/40" />
              </div>
              <div className="relative">
                <select required value={form.department} onChange={(e) => setForm({ ...form, department: e.target.value })} className="appearance-none w-full bg-[#f3f1fb] rounded-full px-5 py-4 outline-none text-sm focus:ring-2 focus:ring-mint/40">
                  <option value="">Department *</option>
                  {services.map((s) => <option key={s.name}>{s.name}</option>)}
                </select>
                <ChevronDown className="w-4 h-4 absolute right-5 top-1/2 -translate-y-1/2 text-navy/40 pointer-events-none" />
              </div>
            </div>

            <div className="grid sm:grid-cols-2 gap-4 mb-4">
              <div className="relative">
                <Calendar className="w-4 h-4 absolute left-5 top-1/2 -translate-y-1/2 text-navy/40 pointer-events-none" />
                <input required type="date" value={form.date} onChange={(e) => setForm({ ...form, date: e.target.value })} className="w-full bg-[#f3f1fb] rounded-full pl-12 pr-5 py-4 outline-none text-sm focus:ring-2 focus:ring-mint/40" />
              </div>
              <div className="relative">
                <Clock className="w-4 h-4 absolute left-5 top-1/2 -translate-y-1/2 text-navy/40" />
                <select required value={form.time} onChange={(e) => setForm({ ...form, time: e.target.value })} className="appearance-none w-full bg-[#f3f1fb] rounded-full pl-12 pr-5 py-4 outline-none text-sm focus:ring-2 focus:ring-mint/40">
                  <option value="">Preferred Time *</option>
                  {times.map((t) => <option key={t}>{t}</option>)}
                </select>
                <ChevronDown className="w-4 h-4 absolute right-5 top-1/2 -translate-y-1/2 text-navy/40 pointer-events-none" />
              </div>
            </div>

            <textarea value={form.message} onChange={(e) => setForm({ ...form, message: e.target.value })} placeholder="Describe your concern (optional)" rows={4} className="w-full bg-[#f3f1fb] rounded-3xl px-5 py-4 outline-none text-sm focus:ring-2 focus:ring-mint/40 mb-4 resize-none" />

            <label className="flex items-center gap-2 text-navy/70 text-sm mb-6 cursor-pointer">
              <input type="checkbox" required checked={form.agree} onChange={(e) => setForm({ ...form, agree: e.target.checked })} className="accent-mint w-4 h-4" />
              I agree to the privacy policy and consent to be contacted.
            </label>

            <div className="flex justify-center mt-12">
              <button type="submit" className="group inline-flex items-center gap-3 bg-navy hover:bg-navy-deep text-white font-display font-bold pl-6 pr-2 py-2 rounded-full transition-colors">
                {done ? (
                  <><Check className="w-4 h-4" /> Request Sent!</>
                ) : (
                  <>Book Appointment</>
                )}
                <span className="w-10 h-10 rounded-full bg-mint text-white flex items-center justify-center group-hover:rotate-45 transition-transform">
                  <ArrowRight className="w-4 h-4" />
                </span>
              </button>
            </div>
          </form>
        </div>
      </section>
    </>
  );
}
