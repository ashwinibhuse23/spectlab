import React, { useState, useRef, useCallback } from 'react';
import {
  X, ArrowRight, ChevronDown, Calendar, Clock, User, Mail,
  Phone as PhoneIcon, Check, Info
} from 'lucide-react';
import { services } from '../mock';

// Auto-timing per test
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

// Preparation instructions
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

export default function BookingModal({ isOpen, onClose }) {
  const [form, setForm] = useState({
    name: '', email: '', phone: '', date: '', time: '', Tests: '', message: '', agree: false,
  });
  const [done, setDone] = useState(false);
  const [showPolicy, setShowPolicy] = useState(false);
  const [scrolledToBottom, setScrolledToBottom] = useState(false);
  const [innerAgree, setInnerAgree] = useState(false);
  const [lang, setLang] = useState('en');
  const scrollRef = useRef(null);

  const handleScroll = useCallback(() => {
    const el = scrollRef.current;
    if (!el) return;
    if (el.scrollTop + el.clientHeight >= el.scrollHeight - 10) {
      setScrolledToBottom(true);
    }
  }, []);

  const handleCheckboxClick = (e) => {
    e.preventDefault();
    if (form.agree) {
      setForm((f) => ({ ...f, agree: false }));
      setShowPolicy(false);
      setScrolledToBottom(false);
      setInnerAgree(false);
    } else {
      setShowPolicy(true);
    }
  };

  const handlePolicySubmit = () => {
    if (!innerAgree) return;
    setForm((f) => ({ ...f, agree: true }));
    setShowPolicy(false);
  };

  const submit = (e) => {
    e.preventDefault();
    setDone(true);
    setTimeout(() => {
      setDone(false);
      onClose(); // Close modal after success
    }, 3000);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-navy/60 backdrop-blur-sm">
      {/* Click outside to close */}
      <div className="absolute inset-0" onClick={onClose}></div>
      
      <div className="relative w-full max-w-2xl bg-white rounded-3xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100 bg-white z-10 shrink-0">
          <div>
            <h2 className="font-display font-extrabold text-navy text-lg sm:text-xl">
              Book Appointment
            </h2>
            <p className="text-navy/60 text-[11px] sm:text-xs mt-0.5">
              Fill out the form and we'll confirm your visit soon.
            </p>
          </div>
          <button 
            onClick={onClose}
            className="p-1.5 rounded-full hover:bg-slate-100 transition-colors text-slate-400 hover:text-navy"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Scrollable Form Content */}
        <div className="overflow-y-auto">
          <div className="p-5">
            <form onSubmit={submit} className="flex flex-col">
              {/* Row 1 */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-3">
                <div className="relative">
                  <User className="w-3.5 h-3.5 absolute left-4 top-1/2 -translate-y-1/2 text-navy/40" />
                  <input
                    required value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                    placeholder="Full Name *"
                    className="w-full bg-[#f3f1fb] rounded-full pl-9 pr-3 py-2.5 outline-none text-xs focus:ring-2 focus:ring-[#3b7a24]/40"
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
                    className="w-full bg-[#f3f1fb] rounded-full pl-9 pr-3 py-2.5 outline-none text-xs focus:ring-2 focus:ring-[#3b7a24]/40"
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
                    className="w-full bg-[#f3f1fb] rounded-full pl-9 pr-3 py-2.5 outline-none text-xs focus:ring-2 focus:ring-[#3b7a24]/40"
                  />
                </div>
                <div className="relative">
                  <select
                    required value={form.Tests}
                    onChange={(e) => {
                      const selectedTest = e.target.value;
                      setForm({ ...form, Tests: selectedTest, time: testTimings[selectedTest] || '' });
                    }}
                    className="appearance-none w-full bg-[#f3f1fb] rounded-full px-4 py-2.5 outline-none text-xs focus:ring-2 focus:ring-[#3b7a24]/40"
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
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-3">
                <div className="relative">
                  <Calendar className="w-3.5 h-3.5 absolute left-4 top-1/2 -translate-y-1/2 text-navy/40 pointer-events-none" />
                  <input
                    required type="date" value={form.date}
                    onChange={(e) => setForm({ ...form, date: e.target.value })}
                    className="w-full bg-[#f3f1fb] rounded-full pl-9 pr-3 py-2.5 outline-none text-xs focus:ring-2 focus:ring-[#3b7a24]/40"
                  />
                </div>
                <div className="relative">
                  <Clock className="w-3.5 h-3.5 absolute left-4 top-1/2 -translate-y-1/2 text-navy/40" />
                  <input
                    readOnly
                    value={form.time}
                    placeholder={form.Tests ? 'Timing auto-filled' : 'Select a Test first'}
                    className={`w-full bg-[#f3f1fb] rounded-full pl-9 pr-3 py-2.5 outline-none text-xs cursor-default ${
                      form.time ? 'text-navy font-medium' : 'text-navy/40'
                    }`}
                  />
                </div>
              </div>

              {/* ── Per-test Instructions Panel ── */}
              {form.Tests && testInstructions[form.Tests] && (
                <div className="mb-3 rounded-lg border border-slate-200 bg-white overflow-hidden">
                  <div className="flex items-center gap-1.5 px-3 py-2 bg-slate-50 border-b border-slate-200">
                    <Info className="w-3 h-3 text-slate-400 shrink-0" />
                    <span className="font-display font-semibold text-slate-500 text-[10px] tracking-wide uppercase">
                      {lang === 'en' ? 'Preparation' : 'तयारी'}
                    </span>
                    <div className="ml-auto flex items-center gap-1 bg-slate-200 rounded-full p-0.5">
                      <button
                        type="button"
                        onClick={() => setLang('en')}
                        className={`px-2 py-0.5 rounded-full text-[9px] font-semibold transition-all ${
                          lang === 'en' ? 'bg-white text-slate-700 shadow-sm' : 'text-slate-400 hover:text-slate-600'
                        }`}
                      >EN</button>
                      <button
                        type="button"
                        onClick={() => setLang('mr')}
                        className={`px-2 py-0.5 rounded-full text-[9px] font-semibold transition-all ${
                          lang === 'mr' ? 'bg-white text-slate-700 shadow-sm' : 'text-slate-400 hover:text-slate-600'
                        }`}
                      >मराठी</button>
                    </div>
                  </div>
                  <ul className="px-3 py-2 space-y-1.5">
                    {(lang === 'en' ? testInstructions[form.Tests] : testInstructionsMr[form.Tests]).map((step, i) => (
                      <li key={i} className="flex items-start gap-2 text-slate-600 text-[11px] leading-snug">
                        <span className="mt-0.5 w-3.5 h-3.5 rounded-full border border-slate-300 bg-slate-100 text-slate-500 flex items-center justify-center text-[8px] font-semibold shrink-0">
                          {i + 1}
                        </span>
                        {step}
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              <textarea
                value={form.message}
                onChange={(e) => setForm({ ...form, message: e.target.value })}
                placeholder="Describe your concern (optional)"
                rows={2}
                className="w-full bg-[#f3f1fb] rounded-xl px-4 py-2.5 outline-none text-xs focus:ring-2 focus:ring-[#3b7a24]/40 mb-4 resize-none"
              />

              <div className="flex justify-start">
                <button
                  type="submit"
                  className="group inline-flex items-center gap-2 bg-[#3b7a24] hover:bg-[#2d661b] text-white font-display font-bold pl-4 pr-1.5 py-2 rounded-full transition-colors"
                >
                  <span className="text-xs">
                    {done ? 'Request Sent!' : 'Book Appointment'}
                  </span>
                  <span className="w-7 h-7 rounded-full bg-white text-[#3b7a24] flex items-center justify-center group-hover:rotate-45 transition-transform shrink-0">
                    {done ? <Check className="w-3 h-3" /> : <ArrowRight className="w-3 h-3" />}
                  </span>
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
