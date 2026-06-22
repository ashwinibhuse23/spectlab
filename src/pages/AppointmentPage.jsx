import React, { useState, useRef, useCallback } from 'react';
import PageHeader from '../components/PageHeader';
import {
  ArrowRight, ChevronDown, Calendar, Clock, User, Mail,
  Phone as PhoneIcon, Check, Stethoscope, ShieldCheck, HeartPulse, Info,
} from 'lucide-react';
import { services } from '../mock';

const times = ['09:00 AM', '10:00 AM', '11:00 AM', '12:00 PM', '02:00 PM', '03:00 PM', '04:00 PM', '05:00 PM'];

export default function AppointmentPage() {
  const [form, setForm] = useState({
    name: '', email: '', phone: '', date: '', time: '', department: '', message: '', agree: false,
  });
  const [done, setDone] = useState(false);
  const [showPolicy, setShowPolicy] = useState(false);
  const [scrolledToBottom, setScrolledToBottom] = useState(false);
  const [innerAgree, setInnerAgree] = useState(false);
  const scrollRef = useRef(null);

  /* Track scroll inside the policy box */
  const handleScroll = useCallback(() => {
    const el = scrollRef.current;
    if (!el) return;
    if (el.scrollTop + el.clientHeight >= el.scrollHeight - 10) {
      setScrolledToBottom(true);
    }
  }, []);

  /* Click on the main checkbox label */
  const handleCheckboxClick = (e) => {
    e.preventDefault();
    if (form.agree) {
      /* Already agreed → uncheck and collapse */
      setForm((f) => ({ ...f, agree: false }));
      setShowPolicy(false);
      setScrolledToBottom(false);
      setInnerAgree(false);
    } else {
      /* Not agreed → expand policy panel */
      setShowPolicy(true);
    }
  };

  /* Submit inside policy panel */
  const handlePolicySubmit = () => {
    if (!innerAgree) return;
    setForm((f) => ({ ...f, agree: true }));
    setShowPolicy(false);
  };

  /* Final form submit */
  const submit = (e) => {
    e.preventDefault();
    setDone(true);
    setTimeout(() => setDone(false), 5000);
  };

  return (
    <>
      <PageHeader
        title="Book Your Appointment"
        subtitle="Care Without the Wait"
        breadcrumbs={[{ label: 'Appointment' }]}
        image="/Images/servicesHero.jpg"
      />

      <section className="py-10 md:py-16 lg:py-24">
        <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 grid lg:grid-cols-5 gap-6 lg:gap-10">

          {/* ── Left info panel ── */}
          <div className="hidden lg:block lg:col-span-2 space-y-6">
            <div className="bg-white rounded-3xl p-8 text-navy border border-slate-100">
              <h3 className="font-display font-extrabold text-xl mb-4 text-navy">
                Why book with SPECT LAB?
              </h3>
              <ul className="space-y-4">
                {[
                  { icon: Stethoscope, t: 'Board-Certified Specialists', d: 'Access top doctors across 20+ specialties.' },
                  { icon: Clock,       t: 'Same-Day Diagnostics',        d: 'Imaging and lab work scheduled in one visit.' },
                  { icon: ShieldCheck, t: 'Insurance Friendly',          d: 'We accept 100+ plans and offer clear estimates.' },
                  { icon: HeartPulse,  t: '24/7 Nurse Hotline',          d: 'Talk to a clinician anytime you need guidance.' },
                ].map(({ icon: Icon, t, d }) => (
                  <li key={t} className="flex gap-4">
                    <span className="w-11 h-11 shrink-0 rounded-2xl bg-blue-100 text-navy flex items-center justify-center">
                      <Icon className="w-5 h-5" />
                    </span>
                    <div>
                      <div className="font-display font-bold text-sm">{t}</div>
                      <div className="text-navy/70 text-xs">{d}</div>
                    </div>
                  </li>
                ))}
              </ul>
            </div>

            <div className="bg-white rounded-3xl p-8 soft-shadow">
              <h4 className="font-display font-bold text-navy text-base mb-3">Need help right now?</h4>
              <p className="text-navy/70 text-xs mb-4">
                Our care navigators can answer questions and help you choose the right provider.
              </p>
              <div className="flex flex-col gap-3">
                {['+91-9527070000', '+91-8975758509', '+91-8975758566'].map((num) => (
                  <a
                    key={num}
                    href={`tel:${num.replace(/-/g, '')}`}
                    className="group inline-flex items-center gap-3 text-[#0e1a6b] hover:text-emerald-500 font-display font-bold text-sm py-1.5 transition-colors duration-200"
                  >
                    <PhoneIcon className="w-4 h-4 group-hover:text-emerald-500 transition-colors duration-200" /> {num}
                  </a>
                ))}
              </div>
            </div>
          </div>

          {/* ── Booking form ── */}
          <form onSubmit={submit} className="col-span-1 lg:col-span-3 bg-white rounded-2xl sm:rounded-3xl p-5 sm:p-7 lg:p-10 soft-shadow">
            <h2 className="font-display font-extrabold text-navy text-xl sm:text-2xl lg:text-3xl mb-1">
              Patient information
            </h2>
            <p className="text-navy/60 text-xs sm:text-sm mb-5 sm:mb-8">
              Fill out the form and we'll confirm your visit within 1 business hour.
            </p>

            {/* Row 1 */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-3">
              <div className="relative">
                <User className="w-3.5 h-3.5 absolute left-4 top-1/2 -translate-y-1/2 text-navy/40" />
                <input
                  required value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  placeholder="Full Name *"
                  className="w-full bg-[#f3f1fb] rounded-full pl-10 pr-4 py-3 outline-none text-xs focus:ring-2 focus:ring-mint/40"
                />
              </div>
              <div className="relative">
                <Mail className="w-3.5 h-3.5 absolute left-4 top-1/2 -translate-y-1/2 text-navy/40" />
                <input
                  required type="email" value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                  placeholder="Email *"
                  className="w-full bg-[#f3f1fb] rounded-full pl-10 pr-4 py-3 outline-none text-xs focus:ring-2 focus:ring-mint/40"
                />
              </div>
            </div>

            {/* Row 2 */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-3">
              <div className="relative">
                <PhoneIcon className="w-3.5 h-3.5 absolute left-4 top-1/2 -translate-y-1/2 text-navy/40" />
                <input
                  required value={form.phone}
                  onChange={(e) => setForm({ ...form, phone: e.target.value })}
                  placeholder="Phone *"
                  className="w-full bg-[#f3f1fb] rounded-full pl-10 pr-4 py-3 outline-none text-xs focus:ring-2 focus:ring-mint/40"
                />
              </div>
              <div className="relative">
                <select
                  required value={form.department}
                  onChange={(e) => setForm({ ...form, department: e.target.value })}
                  className="appearance-none w-full bg-[#f3f1fb] rounded-full px-4 py-3 outline-none text-xs focus:ring-2 focus:ring-mint/40"
                >
                  <option value="">Department *</option>
                  {services.map((s) => <option key={s.name}>{s.name}</option>)}
                </select>
                <ChevronDown className="w-3.5 h-3.5 absolute right-4 top-1/2 -translate-y-1/2 text-navy/40 pointer-events-none" />
              </div>
            </div>

            {/* Row 3 */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-3">
              <div className="relative">
                <Calendar className="w-3.5 h-3.5 absolute left-4 top-1/2 -translate-y-1/2 text-navy/40 pointer-events-none" />
                <input
                  required type="date" value={form.date}
                  onChange={(e) => setForm({ ...form, date: e.target.value })}
                  className="w-full bg-[#f3f1fb] rounded-full pl-10 pr-4 py-3 outline-none text-xs focus:ring-2 focus:ring-mint/40"
                />
              </div>
              <div className="relative">
                <Clock className="w-3.5 h-3.5 absolute left-4 top-1/2 -translate-y-1/2 text-navy/40" />
                <select
                  required value={form.time}
                  onChange={(e) => setForm({ ...form, time: e.target.value })}
                  className="appearance-none w-full bg-[#f3f1fb] rounded-full pl-10 pr-4 py-3 outline-none text-xs focus:ring-2 focus:ring-mint/40"
                >
                  <option value="">Preferred Time *</option>
                  {times.map((t) => <option key={t}>{t}</option>)}
                </select>
                <ChevronDown className="w-3.5 h-3.5 absolute right-4 top-1/2 -translate-y-1/2 text-navy/40 pointer-events-none" />
              </div>
            </div>

            {/* Message */}
            <textarea
              value={form.message}
              onChange={(e) => setForm({ ...form, message: e.target.value })}
              placeholder="Describe your concern (optional)"
              rows={3}
              className="w-full bg-[#f3f1fb] rounded-2xl sm:rounded-3xl px-4 py-3 outline-none text-xs focus:ring-2 focus:ring-mint/40 mb-4 resize-none"
            />

            {/* ── Privacy checkbox trigger ── */}
            <label
              className="flex items-start gap-3 text-navy/70 text-xs cursor-pointer select-none mb-0"
              onClick={handleCheckboxClick}
            >
              <span
                className={`w-5 h-5 mt-0.5 rounded border-2 flex items-center justify-center shrink-0 transition-all duration-200 ${
                  form.agree ? 'bg-[#0e1a6b] border-[#0e1a6b]' : 'border-slate-400 bg-white'
                }`}
              >
                {form.agree && <Check className="w-3 h-3 text-white" />}
              </span>
              <span className="leading-relaxed">
                I agree to the{' '}
                <span className="text-[#0e1a6b] font-semibold underline underline-offset-2 whitespace-nowrap">privacy policy</span>
                {' '}and consent to be contacted.
              </span>
            </label>


            {/* ── Inline Privacy Policy panel (expands below checkbox) ── */}
            {showPolicy && (
              <div className="mt-4 rounded-2xl border border-slate-200 bg-white overflow-hidden">
                {/* Panel header */}
                <div className="px-6 pt-6 pb-3 border-b border-slate-100">
                  <h3 className="font-display font-extrabold text-navy text-lg mb-1">Privacy Policy</h3>
                  <p className="text-navy/55 text-xs">
                    Please read the following privacy policy carefully before submitting the form.
                  </p>
                </div>

                {/* Scrollable policy text */}
                <div
                  ref={scrollRef}
                  onScroll={handleScroll}
                  className="overflow-y-auto bg-[#f8f7fd] mx-3 my-3 sm:mx-4 sm:my-4 rounded-xl border border-slate-200"
                  style={{ height: 'min(260px, 40vh)' }}
                >
                  <div className="p-5 space-y-5 text-navy/75 text-xs leading-relaxed">
                    <div>
                      <h4 className="font-bold text-navy mb-1">1. Introduction</h4>
                      <p>We value your privacy and are committed to protecting your personal data. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you use our website and services.</p>
                    </div>
                    <div>
                      <h4 className="font-bold text-navy mb-1">2. Information We Collect</h4>
                      <p>We may collect personal information that you voluntarily provide to us, including but not limited to your name, email address, phone number, and other contact details.</p>
                    </div>
                    <div>
                      <h4 className="font-bold text-navy mb-1">3. How We Use Your Information</h4>
                      <p>We use the information we collect to provide, maintain, and improve our services, communicate with you, and ensure the security of our platform.</p>
                    </div>
                    <div>
                      <h4 className="font-bold text-navy mb-1">4. Data Security</h4>
                      <p>We implement appropriate technical and organizational measures to protect your personal data from unauthorized access, alteration, disclosure, or destruction.</p>
                    </div>
                    <div>
                      <h4 className="font-bold text-navy mb-1">5. Your Rights</h4>
                      <p>You have the right to access, update, or delete your personal information. You may also object to or restrict certain processing of your data.</p>
                    </div>
                    <div>
                      <h4 className="font-bold text-navy mb-1">6. Changes to This Policy</h4>
                      <p>We may update this Privacy Policy from time to time. We will notify you of any significant changes by posting the new policy on our website and updating the effective date.</p>
                    </div>
                    <div>
                      <h4 className="font-bold text-navy mb-1">7. Contact Us</h4>
                      <p>If you have any questions about this Privacy Policy, please contact us at <span className="text-[#0e1a6b] font-medium">privacy@spectlab.in</span>.</p>
                    </div>
                    <div>
                      <h4 className="font-bold text-navy mb-1">8. Consent to Be Contacted</h4>
                      <p>By booking an appointment, you consent to being contacted by our team via email, phone, or SMS regarding your appointment, test results, and health-related communications from SPECT LAB.</p>
                    </div>
                  </div>
                </div>

                {/* Scroll hint */}
                {!scrolledToBottom && (
                  <div className="flex items-center gap-2 text-navy/45 text-xs px-6 pb-3">
                    <Info className="w-4 h-4 shrink-0 text-[#0e1a6b]/50" />
                    Please scroll to the bottom to enable the checkbox.
                  </div>
                )}

                {/* Inner agree checkbox + submit */}
                <div className="px-6 pb-6 pt-2 space-y-4">
                  <label
                    className={`flex items-center gap-3 text-xs select-none ${
                      scrolledToBottom ? 'cursor-pointer text-navy/80' : 'cursor-not-allowed text-navy/30'
                    }`}
                    onClick={() => scrolledToBottom && setInnerAgree((v) => !v)}
                  >
                    <span
                      className={`w-5 h-5 rounded border-2 flex items-center justify-center shrink-0 transition-all duration-200 ${
                        innerAgree
                          ? 'bg-[#0e1a6b] border-[#0e1a6b]'
                          : scrolledToBottom
                          ? 'border-slate-400 bg-white'
                          : 'border-slate-200 bg-slate-100'
                      }`}
                    >
                      {innerAgree && <Check className="w-3 h-3 text-white" />}
                    </span>
                    I have read and agree to the{' '}
                    <span className="text-[#0e1a6b] font-semibold">Privacy Policy</span>{' '}
                    and consent to be contacted.
                  </label>

                  <div className="flex justify-start">
                    <button
                      type="button"
                      onClick={handlePolicySubmit}
                      disabled={!innerAgree}
                      className={`group inline-flex items-center gap-2 font-display font-bold text-xs pl-4 pr-1.5 py-1.5 rounded-full transition-all duration-200 ${
                        innerAgree
                          ? 'bg-navy text-white hover:bg-navy-deep shadow-md hover:shadow-lg'
                          : 'bg-slate-200 text-slate-400 cursor-not-allowed'
                      }`}
                    >
                      Submit
                      <span className={`w-7 h-7 rounded-full flex items-center justify-center transition-transform ${
                        innerAgree ? 'bg-mint text-white group-hover:rotate-45' : 'bg-slate-300 text-slate-400'
                      }`}>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </span>
                    </button>
                  </div>
                </div>
              </div>
            )}

            {/* ── Book Appointment button ── */}
            <div className="flex justify-start mt-12 sm:mt-16">
              <button
                type="submit"
                disabled={!form.agree}
                className={`group inline-flex items-center gap-3 font-display font-bold pl-6 pr-2 py-2 rounded-full transition-all duration-200 ${
                  form.agree
                    ? 'bg-navy hover:bg-navy-deep text-white'
                    : 'bg-slate-200 text-slate-400 cursor-not-allowed'
                }`}
              >
                {done ? (
                  <><Check className="w-4 h-4" /> Request Sent!</>
                ) : (
                  <>Book Appointment</>
                )}
                <span
                  className={`w-10 h-10 rounded-full flex items-center justify-center transition-transform ${
                    form.agree
                      ? 'bg-mint text-white group-hover:rotate-45'
                      : 'bg-slate-300 text-slate-400'
                  }`}
                >
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
