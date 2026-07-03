import React, { useState, useRef, useCallback } from 'react';
import PageHeader from '../components/PageHeader';
import {
  ArrowRight, ChevronDown, Calendar, Clock, User, Mail,
  Phone as PhoneIcon, Check, Stethoscope, Building2, BadgeCheck, ScanLine, Info,
} from 'lucide-react';
import { services } from '../mock';

// Auto-timing per test — displayed automatically when test is selected
const testTimings = {
  'PET-CT Imaging Procedure (FDG)': '10:00 AM – 07:00 PM',
  'Thallium Scan':                  '11:00 AM – 05:00 PM',
  'Bone Scan':                      '09:00 AM – 01:00 PM',
  'DTPA Renal Scan':                '09:00 AM – 02:00 PM',
  'Thyroid Scan':                   '10:00 AM – 03:00 PM',
  'Captopril Renal Scan':           '08:00 AM – 12:00 PM',
  'Colloid Liver Scan':             '10:00 AM – 03:00 PM',
  'Milk Scan (GE Reflux)':          '09:00 AM – 01:00 PM',
  'MUGA Scan':                      '10:00 AM – 04:00 PM',
};

// Preparation instructions per test
const testInstructions = {
  'PET-CT Imaging Procedure (FDG)': [
    'Compulsory 6 hrs fasting (No tea, coffee). No IV fluid after midnight for hospital patients — only plain water allowed.',
    'Bring all previous reports: Previous PET Report & CD, MRI, CT, USG, Blood, Biopsy, Chemo, Radiation card, Operation details etc.',
    'Sugar level should be below 200 mg/dL.',
    'Please come between 7:00 AM to 9:00 AM.',
    'Referring doctor’s note is compulsory.',
    'Se. Creatinine Blood Test is compulsory.',
    'Patient should be accompanied by one relative only.',
    'Patient should not wear any Jewellery or Ornaments.',
  ],
  'Thallium Scan': [
    'Fast for 4–6 hours before the test.',
    'Avoid caffeine, tobacco, and alcohol for 24 hours prior.',
    'Inform us of any heart medications you are currently taking.',
    'Wear comfortable clothing suitable for a treadmill stress test.',
    'Bring your referral letter and previous cardiac reports.',
  ],
  'Bone Scan': [
    'No special fasting required unless instructed otherwise.',
    'Drink plenty of water before and after the scan to flush the tracer.',
    'Remove all jewelry and metal accessories before the scan.',
    'The scan takes approximately 3–4 hours — plan your day accordingly.',
    'Inform us if you are pregnant or breastfeeding.',
  ],
  'DTPA Renal Scan': [
    'Drink 2–3 glasses of water 30 minutes before the scan.',
    'Empty your bladder just before the test begins.',
    'Continue taking your regular medications unless advised otherwise.',
    'Bring your referral letter and previous kidney function reports.',
    'Inform us about any known allergies.',
  ],
  'Thyroid Scan': [
    'Stop thyroid medications 4–6 weeks before the scan if instructed.',
    'Avoid iodine-rich foods (seafood, iodized salt) for 2 weeks prior.',
    'Fasting is not required for this scan.',
    'Bring all previous thyroid reports and blood test results.',
    'Inform us if you have had any contrast CT scans recently.',
  ],
  'Captopril Renal Scan': [
    'Take the Captopril tablet as directed 1 hour before the scan.',
    'Drink 2–3 glasses of water before arriving.',
    'Stop ACE inhibitor medications 5 days before if instructed.',
    'Bring a list of all current blood pressure medications.',
    'Monitor your blood pressure on the day of the scan.',
  ],
  'Colloid Liver Scan': [
    'No fasting required for this scan.',
    'Inform us of any recent abdominal surgeries or procedures.',
    'Bring all previous liver ultrasound or CT reports.',
    'Remove metal objects and jewelry before the scan.',
    'The scan typically takes 30–60 minutes.',
  ],
  'Milk Scan (GE Reflux)': [
    'The patient (usually a child) should fast for 4 hours before.',
    'A parent or guardian must accompany the patient.',
    'Bring the feeding bottle with formula or breast milk.',
    'Wear comfortable and loose-fitting clothing.',
    'Inform us about any gastrointestinal symptoms or medications.',
  ],
  'MUGA Scan': [
    'No special fasting required unless advised by your doctor.',
    'Inform us of all current heart medications.',
    'Bring previous ECG and echocardiography reports.',
    'The scan involves two phases and may take 2–3 hours.',
    'Avoid strenuous activity on the day of the scan.',
  ],
};

// Marathi translations
const testInstructionsMr = {
  'PET-CT Imaging Procedure (FDG)': [
    '६ तास उपवास अनिवार्य (चहा-कॉफी घ्यायचा नाही), रुग्णालयातील रुग्णांसाठी मध्यरात्री नंतर IV fluid बंद असावा, फक्त साधे पाणी पिण्याची परवानगी आहे.',
    'आपले सर्व मागील रिपोर्ट (मागील पेटसिटी रिपोर्ट आणि सीडी, एमआरआय स्कॅन, सीटी स्कॅन, सोनोग्राफी, रक्त तपासण्या, बायोप्सी (हिस्टोपॅथोलॉजी), केमो व रेडिएशन कार्ड, ऑपरेशन डिस्चार्ज कार्ड, इत्यादी) सोबत आणा.',
    'शुगर लेवल २०० च्या खाली असावी.',
    'कृपया सकाळी ७ ते ९ च्या दरम्यान या.',
    'डॉक्टरांची प्रिस्क्रिप्शन (चिठ्ठी) अनिवार्य आहे.',
    'पेशंट सोबत फक्त एक नातेवाईक असावा.',
  ],
  'Thallium Scan': [
    'चाचणीच्या ४–६ तास आधी उपवास करा.',
    'आधी २४ तास कॅफीन, तंबाखू आणि दारू टाळा.',
    'तुम्ही सध्या घेत असलेल्या हृदय औषधांबद्दल आम्हाला सांगा.',
    'ट्रेडमिल स्ट्रेस टेस्टसाठी योग्य आरामदायक कपडे घाला.',
    'रेफरल पत्र आणि मागील हृदय अहवाल आणा.',
  ],
  'Bone Scan': [
    'विशेष उपवासाची आवश्यकता नाही जोपर्यंत सांगितले जात नाही.',
    'स्कॅनपूर्वी आणि नंतर भरपूर पाणी प्या.',
    'स्कॅनपूर्वी सर्व दागिने आणि धातूचे सामान काढा.',
    'स्कॅनला साधारण ३–४ तास लागतात — त्यानुसार नियोजन करा.',
    'गर्भवती किंवा स्तनपान करणाऱ्या असल्यास आम्हाला सांगा.',
  ],
  'DTPA Renal Scan': [
    'स्कॅनच्या ३० मिनिटे आधी २–३ ग्लास पाणी प्या.',
    'चाचणी सुरू होण्यापूर्वी लघवी करा.',
    'अन्यथा सल्ला दिला नसल्यास नियमित औषधे घेत राहा.',
    'रेफरल पत्र आणि मागील मूत्रपिंड कार्य अहवाल आणा.',
    'कोणत्याही ज्ञात ऍलर्जींबद्दल आम्हाला सांगा.',
  ],
  'Thyroid Scan': [
    'सांगितले असल्यास स्कॅनच्या ४–६ आठवडे आधी थायरॉइड औषधे थांबवा.',
    '२ आठवडे आधी आयोडीनयुक्त अन्न (सीफूड, आयोडीनयुक्त मीठ) टाळा.',
    'या स्कॅनसाठी उपवासाची आवश्यकता नाही.',
    'सर्व मागील थायरॉइड अहवाल आणि रक्त तपासणी निकाल आणा.',
    'अलीकडे कॉन्ट्रास्ट CT स्कॅन केला असल्यास आम्हाला सांगा.',
  ],
  'Captopril Renal Scan': [
    'सांगितल्याप्रमाणे स्कॅनच्या १ तास आधी Captopril गोळी घ्या.',
    'येण्यापूर्वी २–३ ग्लास पाणी प्या.',
    'सांगितले असल्यास ५ दिवस आधी ACE इनहिबिटर औषधे थांबवा.',
    'सर्व सध्याच्या रक्तदाब औषधांची यादी आणा.',
    'स्कॅनच्या दिवशी रक्तदाब तपासा.',
  ],
  'Colloid Liver Scan': [
    'या स्कॅनसाठी उपवासाची आवश्यकता नाही.',
    'कोणत्याही अलीकडील ओटीपोटाच्या शस्त्रक्रियांबद्दल आम्हाला सांगा.',
    'सर्व मागील यकृत अल्ट्रासाऊंड किंवा CT अहवाल आणा.',
    'स्कॅनपूर्वी धातूचे सामान आणि दागिने काढा.',
    'स्कॅन साधारण ३०–६० मिनिटे चालतो.',
  ],
  'Milk Scan (GE Reflux)': [
    'रुग्ण (सहसा मूल) स्कॅनच्या ४ तास आधी उपवास करावा.',
    'पालक किंवा पालकाने रुग्णासोबत असणे आवश्यक आहे.',
    'फॉर्म्युला किंवा आईचे दूध असलेली फीडिंग बाटली आणा.',
    'आरामदायक आणि सैल कपडे घाला.',
    'कोणत्याही पोटाच्या लक्षणांबद्दल किंवा औषधांबद्दल आम्हाला सांगा.',
  ],
  'MUGA Scan': [
    'डॉक्टरांनी सांगितल्याशिवाय विशेष उपवासाची आवश्यकता नाही.',
    'सर्व सध्याच्या हृदय औषधांबद्दल आम्हाला सांगा.',
    'मागील ECG आणि इकोकार्डियोग्राफी अहवाल आणा.',
    'स्कॅनचे दोन टप्पे असतात आणि त्याला २–३ तास लागू शकतात.',
    'स्कॅनच्या दिवशी कठोर व्यायाम टाळा.',
  ],
};

export default function AppointmentPage() {
  const [form, setForm] = useState({
    name: '', email: '', phone: '', date: '', time: '', Tests: '', message: '', agree: false,
  });
  const [done, setDone] = useState(false);
  const [showPolicy, setShowPolicy] = useState(false);
  const [scrolledToBottom, setScrolledToBottom] = useState(false);
  const [innerAgree, setInnerAgree] = useState(false);
  const [lang, setLang] = useState('en'); // 'en' | 'mr'
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

      <section className="py-3 md:py-6 lg:py-10">
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
                  { icon: Clock, t: 'Same-Day Diagnostics', d: 'Imaging and lab work scheduled in one visit.' },
                  { icon: Building2, t: 'Standalone Diagnostic Center', d: 'Advanced diagnostic and imaging services under one roof.' },
                  { icon: BadgeCheck, t: 'National Accreditation Board for Hospitals & Healthcare Providers', d: 'NABH accredited for quality, safety, and patient-centered care.' },
                  { icon: ScanLine, t: 'Fusion PET MRI', d: 'Combines PET and MRI technologies for precise and comprehensive diagnosis.' },
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
                {['+91-9527070000', '+91-8975758509'].map((num) => (
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
          <form onSubmit={submit} className="col-span-1 lg:col-span-3 bg-white rounded-2xl sm:rounded-3xl p-5 sm:p-7 lg:p-10 soft-shadow flex flex-col">
            <h2 className="font-display font-extrabold text-navy text-xl sm:text-2xl lg:text-3xl mb-1">
              Patient information
            </h2>
            <p className="text-navy/60 text-xs sm:text-sm mb-5 sm:mb-8">
              Fill out the form and we'll confirm your visit within 1 business hour.
            </p>

            {/* Row 1 */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-4">
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
                  required
                  type="email"
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                  placeholder="Email Address *"
                  aria-required="true"
                  className="w-full bg-[#f3f1fb] rounded-full pl-10 pr-4 py-3 outline-none text-xs focus:ring-2 focus:ring-mint/40"
                  onInvalid={(e) => e.target.setCustomValidity('Please enter your email address.')}
                  onInput={(e) => e.target.setCustomValidity('')}
                />
              </div>
            </div>

            {/* Row 2 */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-4">
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
                  required value={form.Tests}
                  onChange={(e) => {
                    const selectedTest = e.target.value;
                    setForm({ ...form, Tests: selectedTest, time: testTimings[selectedTest] || '' });
                  }}
                  className="appearance-none w-full bg-[#f3f1fb] rounded-full px-4 py-3 outline-none text-xs focus:ring-2 focus:ring-mint/40"
                >
                  <option value="">Tests *</option>
                  {services.map((s) => (
                    <option key={s.name} value={s.name.replace(/\n/g, ' ')}>
                      {s.name.replace(/\n/g, ' ')}
                    </option>
                  ))}
                </select>
                <ChevronDown className="w-3.5 h-3.5 absolute right-4 top-1/2 -translate-y-1/2 text-navy/40 pointer-events-none" />
              </div>
            </div>

            {/* Row 3 */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-4">
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
                <input
                  readOnly
                  value={form.time}
                  placeholder={form.Tests ? 'Timing auto-filled' : 'Select a Test first'}
                  className={`w-full bg-[#f3f1fb] rounded-full pl-10 pr-4 py-3 outline-none text-xs cursor-default ${
                    form.time ? 'text-navy font-medium' : 'text-navy/40'
                  }`}
                />
              </div>
            </div>

            {/* ── Per-test Instructions Panel ── */}
            {form.Tests && testInstructions[form.Tests] && (
              <div className="mb-4 rounded-xl border border-slate-200 bg-white overflow-hidden">
                {/* Header row */}
                <div className="flex items-center gap-2 px-4 py-2 bg-slate-50 border-b border-slate-200">
                  <Info className="w-3 h-3 text-slate-400 shrink-0" />
                  <span className="font-display font-semibold text-slate-500 text-[11px] tracking-wide uppercase">
                    {lang === 'en' ? 'Preparation Instructions' : 'तयारीच्या सूचना'}
                  </span>
                  {/* Language toggle */}
                  <div className="ml-auto flex items-center gap-1 bg-slate-200 rounded-full p-0.5">
                    <button
                      type="button"
                      onClick={() => setLang('en')}
                      className={`px-2.5 py-0.5 rounded-full text-[10px] font-semibold transition-all ${
                        lang === 'en' ? 'bg-white text-slate-700 shadow-sm' : 'text-slate-400 hover:text-slate-600'
                      }`}
                    >EN</button>
                    <button
                      type="button"
                      onClick={() => setLang('mr')}
                      className={`px-2.5 py-0.5 rounded-full text-[10px] font-semibold transition-all ${
                        lang === 'mr' ? 'bg-white text-slate-700 shadow-sm' : 'text-slate-400 hover:text-slate-600'
                      }`}
                    >मराठी</button>
                  </div>
                </div>
                {/* Steps */}
                <ul className="px-4 py-3 space-y-2.5">
                  {(lang === 'en' ? testInstructions[form.Tests] : testInstructionsMr[form.Tests]).map((step, i) => (
                    <li key={i} className="flex items-start gap-3 text-slate-600 text-xs leading-relaxed">
                      <span className="mt-0.5 w-4 h-4 rounded-full border border-slate-300 bg-slate-100 text-slate-500 flex items-center justify-center text-[9px] font-semibold shrink-0">
                        {i + 1}
                      </span>
                      {step}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Message */}
            <textarea
              value={form.message}
              onChange={(e) => setForm({ ...form, message: e.target.value })}
              placeholder="Describe your concern (optional)"
              rows={3}
              className="w-full bg-[#f3f1fb] rounded-2xl sm:rounded-3xl px-4 py-3 outline-none text-xs focus:ring-2 focus:ring-mint/40 mb-5 resize-none"
            />

            {/* ── Privacy checkbox trigger ── */}
            <label
              className="flex items-start gap-3 text-navy/70 text-xs cursor-pointer select-none mb-0"
              onClick={handleCheckboxClick}
            >
              <span
                className={`w-5 h-5 mt-0.5 rounded border-2 flex items-center justify-center shrink-0 transition-all duration-200 ${form.agree ? 'bg-[#0e1a6b] border-[#0e1a6b]' : 'border-slate-400 bg-white'
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
                    className={`flex items-center gap-3 text-xs select-none ${scrolledToBottom ? 'cursor-pointer text-navy/80' : 'cursor-not-allowed text-navy/30'
                      }`}
                    onClick={() => scrolledToBottom && setInnerAgree((v) => !v)}
                  >
                    <span
                      className={`w-5 h-5 rounded border-2 flex items-center justify-center shrink-0 transition-all duration-200 ${innerAgree
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
                      className={`group inline-flex items-center gap-2 font-display font-bold text-xs pl-4 pr-1.5 py-1.5 rounded-full transition-all duration-200 ${innerAgree
                        ? 'bg-navy text-white hover:bg-navy-deep shadow-md hover:shadow-lg'
                        : 'bg-slate-200 text-slate-400 cursor-not-allowed'
                        }`}
                    >
                      Submit
                      <span className={`w-7 h-7 rounded-full flex items-center justify-center transition-transform ${innerAgree ? 'bg-mint text-white group-hover:rotate-45' : 'bg-slate-300 text-slate-400'
                        }`}>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </span>
                    </button>
                  </div>
                </div>
              </div>
            )}

            {/* ── Book Appointment button ── */}
            <div className="flex justify-start mt-auto pt-4">
              <button
                type="submit"
                disabled={!form.agree}
                className={`group inline-flex items-center gap-3 font-display font-bold pl-6 pr-2 py-2 rounded-full transition-all duration-200 ${form.agree
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
                  className={`w-10 h-10 rounded-full flex items-center justify-center transition-transform ${form.agree
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
