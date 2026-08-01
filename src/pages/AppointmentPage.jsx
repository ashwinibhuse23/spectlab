import React, { useState, useRef, useCallback } from 'react';
import PageHeader from '../components/PageHeader';
import {
  ArrowRight, ChevronDown, Calendar, Clock, User, Mail,
  Phone as PhoneIcon, Check, Stethoscope, Building2, BadgeCheck, ScanLine, Info,
} from 'lucide-react';
import { services, petServicesList, nuclearServicesList, therapyServicesList } from '../mock';

// Auto-timing per test — displayed automatically when test is selected
// Auto-timing per test — displayed automatically when test is selected
const testTimings = {
  // PET Scans (07:00 AM – 07:00 PM)
  'PET-CT IMAGING (FDG)': '07:00 AM – 07:00 PM',
  'PET-CT Imaging Procedure (FDG)': '07:00 AM – 07:00 PM',
  'Gallium-68 PSMA Scan': '07:00 AM – 07:00 PM',
  'Gallium-68 OCTREOTIDE /DOTA/SOMATOSTATIN Scan': '07:00 AM – 07:00 PM',
  'F-18 FDG PET CT Scan': '07:00 AM – 07:00 PM',
  'Ga68 PSMA PET CT Scan': '07:00 AM – 07:00 PM',
  'Ga68 DOTA PET CT Scan': '07:00 AM – 07:00 PM',
  'Cardiac PET Scan': '07:00 AM – 07:00 PM',
  'FAPI PET CT Scan': '07:00 AM – 07:00 PM',
  'F-18 FDOPA PET CT Scan': '07:00 AM – 07:00 PM',
  'Trivehexin PET CT Scan': '07:00 AM – 07:00 PM',
  'Exendine PET CT Scan': '07:00 AM – 07:00 PM',
  'Exendin PET CT Scan': '07:00 AM – 07:00 PM',
  'Fusion- PET MRI': '07:00 AM – 07:00 PM',
  'Fusion PET MRI': '07:00 AM – 07:00 PM',

  // Nuclear Medicine & Other Scans
  'THALLIUM SCAN': '11:00 AM – 05:00 PM',
  'Thallium Scan': '11:00 AM – 05:00 PM',
  'BONE SCAN': '09:00 AM – 01:00 PM',
  'Bone Scan': '09:00 AM – 01:00 PM',
  'DTPA / EC (MAG-3) RENOGRAM SCAN': '09:00 AM – 02:00 PM',
  'DTPA Renal Scan': '09:00 AM – 02:00 PM',
  'DMSA RENAL SCAN (CORTICAL FUNCTION)': '09:00 AM – 02:00 PM',
  'THYROID SCAN': '10:00 AM – 03:00 PM',
  'Thyroid Scan': '10:00 AM – 03:00 PM',
  'POST CAPTOPRIL RENOGRAM': '08:00 AM – 12:00 PM',
  'Captopril Renal Scan': '08:00 AM – 12:00 PM',
  'COLLOID LIVER SCAN': '10:00 AM – 03:00 PM',
  'Colloid Liver Scan': '10:00 AM – 03:00 PM',
  'MILK SCAN (GE REFLUX)': '09:00 AM – 01:00 PM',
  'Milk Scan (GE Reflux)': '09:00 AM – 01:00 PM',
  'MUGA SCAN': '10:00 AM – 04:00 PM',
  'MUGA Scan': '10:00 AM – 04:00 PM',
  'PARATHYROID SCAN': '10:00 AM – 03:00 PM',
  'MIBG SCAN': '10:00 AM – 04:00 PM',
};

// Robust timing lookup helper
const getTestTiming = (testName) => {
  if (!testName) return '';
  if (testTimings[testName]) return testTimings[testName];

  const upper = testName.toUpperCase().trim();
  for (const [key, val] of Object.entries(testTimings)) {
    if (key.toUpperCase().trim() === upper) return val;
  }

  if (upper.includes('PET') || upper.includes('FDG') || upper.includes('PSMA') || upper.includes('DOTA') || upper.includes('FAPI') || upper.includes('FDOPA') || upper.includes('EXENDIN') || upper.includes('TRIVEHEXIN') || upper.includes('GALLIUM')) return '07:00 AM – 07:00 PM';
  if (upper.includes('THALLIUM')) return '11:00 AM – 05:00 PM';
  if (upper.includes('BONE')) return '09:00 AM – 01:00 PM';
  if (upper.includes('CAPTOPRIL')) return '08:00 AM – 12:00 PM';
  if (upper.includes('DTPA') || upper.includes('DMSA') || upper.includes('RENOGRAM') || upper.includes('RENAL')) return '09:00 AM – 02:00 PM';
  if (upper.includes('THYROID') || upper.includes('PARATHYROID')) return '10:00 AM – 03:00 PM';
  if (upper.includes('COLLOID') || upper.includes('LIVER')) return '10:00 AM – 03:00 PM';
  if (upper.includes('MILK') || upper.includes('REFLUX')) return '09:00 AM – 01:00 PM';
  if (upper.includes('MUGA') || upper.includes('MIBG')) return '10:00 AM – 04:00 PM';

  return '09:00 AM – 05:00 PM';
};

// Preparation instructions per test
const testInstructions = {
  'PET-CT IMAGING (FDG)': [
    'Compulsory 6 hrs fasting (No tea, coffee). No IV fluid after midnight for hospital patients — only plain water allowed.',
    'Bring all previous reports: Previous PET Report & CD, MRI, CT, USG, Blood, Biopsy, Chemo, Radiation card, Operation details etc.',
    'Sugar level should be below 200 mg/dL.',
    'Please come between 7:00 AM to 9:00 AM.',
    'Referring doctor’s note is compulsory.',
    'Se. Creatinine Blood Test is compulsory.',
    'Patient should be accompanied by one relative only.',
    'Patient should not wear any Jewellery or Ornaments.',
  ],
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
  'F-18 FDG PET CT Scan': [
    'Compulsory 6 hrs fasting (No tea, coffee). Water is encouraged.',
    'Diabetic patients should follow specific instructions provided by the doctor.',
    'Bring all previous reports and imaging studies.',
    'Patient should not wear any Jewellery or Ornaments.',
  ],
  'Gallium-68 PSMA Scan': [
    'Fasting is generally not required.',
    'Drink plenty of water before and after the scan.',
    'Bring previous PSA reports, biopsy reports, and imaging.',
  ],
  'Ga68 PSMA PET CT Scan': [
    'Fasting is generally not required.',
    'Drink plenty of water before and after the scan.',
    'Bring previous PSA reports, biopsy reports, and imaging.',
  ],
  'Gallium-68 OCTREOTIDE /DOTA/SOMATOSTATIN Scan': [
    'Fasting is usually not required.',
    'Bring previous PET/CT, MRI, CT, and pathology reports.',
  ],
  'Ga68 DOTA PET CT Scan': [
    'Fasting is usually not required.',
    'Bring previous PET/CT, MRI, CT, and pathology reports.',
  ],
  'Cardiac PET Scan': [
    'Fast for 6–8 hours.',
    'Avoid caffeine for 24 hours.',
    'Certain heart medications may require temporary adjustment.',
  ],
  'FAPI PET CT Scan': [
    'Usually no fasting required.',
    'Stay well hydrated.',
    'Bring previous imaging and pathology reports.',
  ],
  'F-18 FDOPA PET CT Scan': [
    'Fast for at least 4 hours.',
    'Certain medications may need adjustment.',
    'Bring previous neurological or oncology reports.',
  ],
  'Trivehexin PET CT Scan': [
    'Follow physician-specific preparation.',
    'Stay hydrated.',
    'Bring previous medical records and imaging.',
  ],
  'Exendine PET CT Scan': [
    'Fast for 4–6 hours.',
    'Blood sugar levels may be checked before the scan.',
    'Bring previous endocrine investigations.',
  ],
  'Exendin PET CT Scan': [
    'Fast for 4–6 hours.',
    'Blood sugar levels may be checked before the scan.',
    'Bring previous endocrine investigations.',
  ],
  'Fusion PET MRI': [
    'Fast for 4–6 hours (depending on tracer).',
    'Remove all metallic objects.',
    'Inform your doctor about implants, pacemakers, or claustrophobia.',
    'Bring previous MRI, CT, PET, and laboratory reports.',
  ],
  'THALLIUM SCAN': [
    'Fast for 4–6 hours before the test.',
    'Avoid caffeine, tobacco, and alcohol for 24 hours prior.',
    'Inform us of any heart medications you are currently taking.',
    'Wear comfortable clothing suitable for a treadmill stress test.',
    'Bring your referral letter and previous cardiac reports.',
  ],
  'Thallium Scan': [
    'Fast for 4–6 hours before the test.',
    'Avoid caffeine, tobacco, and alcohol for 24 hours prior.',
    'Inform us of any heart medications you are currently taking.',
    'Wear comfortable clothing suitable for a treadmill stress test.',
    'Bring your referral letter and previous cardiac reports.',
  ],
  'BONE SCAN': [
    'No special fasting required unless instructed otherwise.',
    'Drink plenty of water before and after the scan to flush the tracer.',
    'Remove all jewelry and metal accessories before the scan.',
    'The scan takes approximately 3–4 hours — plan your day accordingly.',
    'Inform us if you are pregnant or breastfeeding.',
  ],
  'Bone Scan': [
    'No special fasting required unless instructed otherwise.',
    'Drink plenty of water before and after the scan to flush the tracer.',
    'Remove all jewelry and metal accessories before the scan.',
    'The scan takes approximately 3–4 hours — plan your day accordingly.',
    'Inform us if you are pregnant or breastfeeding.',
  ],
  'DTPA / EC (MAG-3) RENOGRAM SCAN': [
    'Drink 2–3 glasses of water 30 minutes before the scan.',
    'Empty your bladder just before the test begins.',
    'Continue taking your regular medications unless advised otherwise.',
    'Bring your referral letter and previous kidney function reports.',
    'Inform us about any known allergies.',
  ],
  'DTPA Renal Scan': [
    'Drink 2–3 glasses of water 30 minutes before the scan.',
    'Empty your bladder just before the test begins.',
    'Continue taking your regular medications unless advised otherwise.',
    'Bring your referral letter and previous kidney function reports.',
    'Inform us about any known allergies.',
  ],
  'THYROID SCAN': [
    'Stop thyroid medications 4–6 weeks before the scan if instructed.',
    'Avoid iodine-rich foods (seafood, iodized salt) for 2 weeks prior.',
    'Fasting is not required for this scan.',
    'Bring all previous thyroid reports and blood test results.',
    'Inform us if you have had any contrast CT scans recently.',
  ],
  'Thyroid Scan': [
    'Stop thyroid medications 4–6 weeks before the scan if instructed.',
    'Avoid iodine-rich foods (seafood, iodized salt) for 2 weeks prior.',
    'Fasting is not required for this scan.',
    'Bring all previous thyroid reports and blood test results.',
    'Inform us if you have had any contrast CT scans recently.',
  ],
  'POST CAPTOPRIL RENOGRAM': [
    'Take the Captopril tablet as directed 1 hour before the scan.',
    'Drink 2–3 glasses of water before arriving.',
    'Stop ACE inhibitor medications 5 days before if instructed.',
    'Bring a list of all current blood pressure medications.',
    'Monitor your blood pressure on the day of the scan.',
  ],
  'Captopril Renal Scan': [
    'Take the Captopril tablet as directed 1 hour before the scan.',
    'Drink 2–3 glasses of water before arriving.',
    'Stop ACE inhibitor medications 5 days before if instructed.',
    'Bring a list of all current blood pressure medications.',
    'Monitor your blood pressure on the day of the scan.',
  ],
  'COLLOID LIVER SCAN': [
    'No fasting required for this scan.',
    'Inform us of any recent abdominal surgeries or procedures.',
    'Bring all previous liver ultrasound or CT reports.',
    'Remove metal objects and jewelry before the scan.',
    'The scan typically takes 30–60 minutes.',
  ],
  'Colloid Liver Scan': [
    'No fasting required for this scan.',
    'Inform us of any recent abdominal surgeries or procedures.',
    'Bring all previous liver ultrasound or CT reports.',
    'Remove metal objects and jewelry before the scan.',
    'The scan typically takes 30–60 minutes.',
  ],
  'MILK SCAN (GE REFLUX)': [
    'The patient (usually a child) should fast for 4 hours before.',
    'A parent or guardian must accompany the patient.',
    'Bring the feeding bottle with formula or breast milk.',
    'Wear comfortable and loose-fitting clothing.',
    'Inform us about any gastrointestinal symptoms or medications.',
  ],
  'Milk Scan (GE Reflux)': [
    'The patient (usually a child) should fast for 4 hours before.',
    'A parent or guardian must accompany the patient.',
    'Bring the feeding bottle with formula or breast milk.',
    'Wear comfortable and loose-fitting clothing.',
    'Inform us about any gastrointestinal symptoms or medications.',
  ],
  'MUGA SCAN': [
    'No special fasting required unless advised by your doctor.',
    'Inform us of all current heart medications.',
    'Bring previous ECG and echocardiography reports.',
    'The scan involves two phases and may take 2–3 hours.',
    'Avoid strenuous activity on the day of the scan.',
  ],
  'MUGA Scan': [
    'No special fasting required unless advised by your doctor.',
    'Inform us of all current heart medications.',
    'Bring previous ECG and echocardiography reports.',
    'The scan involves two phases and may take 2–3 hours.',
    'Avoid strenuous activity on the day of the scan.',
  ],
};

const getTestInstructions = (testName, language = 'en') => {
  if (!testName) return [];
  const instructionsObj = language === 'mr' ? testInstructionsMr : testInstructions;
  if (instructionsObj[testName]) return instructionsObj[testName];

  const upper = testName.toUpperCase().trim();
  for (const [key, val] of Object.entries(instructionsObj)) {
    if (key.toUpperCase().trim() === upper) return val;
  }

  return instructionsObj['PET-CT Imaging Procedure (FDG)'] || instructionsObj['Bone Scan'] || [];
};

// Marathi translations
const testInstructionsMr = {
  'PET-CT IMAGING (FDG)': [
    '६ तास उपवास अनिवार्य (चहा-कॉफी घ्यायचा नाही), रुग्णालयातील रुग्णांसाठी मध्यरात्री नंतर IV fluid बंद असावा, फक्त साधे पाणी पिण्याची परवानगी आहे.',
    'आपले सर्व मागील रिपोर्ट सोबत आणा.',
    'शुगर लेवल २०० च्या खाली असावी.',
    'कृपया सकाळी ७ ते ९ च्या दरम्यान या.',
  ],
  'PET-CT Imaging Procedure (FDG)': [
    '६ तास उपवास अनिवार्य (चहा-कॉफी घ्यायचा नाही), रुग्णालयातील रुग्णांसाठी मध्यरात्री नंतर IV fluid बंद असावा, फक्त साधे पाणी पिण्याची परवानगी आहे.',
    'आपले सर्व मागील रिपोर्ट सोबत आणा.',
    'शुगर लेवल २०० च्या खाली असावी.',
    'कृपया सकाळी ७ ते ९ च्या दरम्यान या.',
  ],
  'BONE SCAN': [
    'विशेष उपवासाची आवश्यकता नाही जोपर्यंत सांगितले जात नाही.',
    'स्कॅनपूर्वी आणि नंतर भरपूर पाणी प्या.',
    'स्कॅनपूर्वी सर्व दागिने आणि धातूचे सामान काढा.',
    'स्कॅनला साधारण ३–४ तास लागतात — त्यानुसार नियोजन करा.',
  ],
  'Bone Scan': [
    'विशेष उपवासाची आवश्यकता नाही जोपर्यंत सांगितले जात नाही.',
    'स्कॅनपूर्वी आणि नंतर भरपूर पाणी प्या.',
    'स्कॅनपूर्वी सर्व दागिने आणि धातूचे सामान काढा.',
    'स्कॅनला साधारण ३–४ तास लागतात — त्यानुसार नियोजन करा.',
  ],
};

const defaultPrice = { regular: 15000, extra: 18000, skip: 25000 };

const testPrices = {
  'PET-CT IMAGING (FDG)': { regular: 14000, extra: 16000, skip: 21000 },
  'PET-CT Imaging Procedure (FDG)': { regular: 15000, extra: 18000, skip: 25000 },
  'Gallium-68 PSMA Scan': { regular: 18000, extra: 21000, skip: 28000 },
  'Gallium-68 OCTREOTIDE /DOTA/SOMATOSTATIN Scan': { regular: 18000, extra: 21000, skip: 28000 },
  'F-18 FDG PET CT Scan': { regular: 15000, extra: 18000, skip: 25000 },
  'Ga68 PSMA PET CT Scan': { regular: 18000, extra: 21000, skip: 28000 },
  'Ga68 DOTA PET CT Scan': { regular: 18000, extra: 21000, skip: 28000 },
  'Cardiac PET Scan': { regular: 16000, extra: 19000, skip: 26000 },
  'FAPI PET CT Scan': { regular: 18000, extra: 21000, skip: 28000 },
  'F-18 FDOPA PET CT Scan': { regular: 18000, extra: 21000, skip: 28000 },
  'Trivehexin PET CT Scan': { regular: 18000, extra: 21000, skip: 28000 },
  'Exendine PET CT Scan': { regular: 18000, extra: 21000, skip: 28000 },
  'Exendin PET CT Scan': { regular: 18000, extra: 21000, skip: 28000 },
  'Fusion- PET MRI': { regular: 22000, extra: 25000, skip: 32000 },
  'Fusion PET MRI': { regular: 22000, extra: 25000, skip: 32000 },
  'THALLIUM SCAN': { regular: 12000, extra: 15000, skip: 20000 },
  'Thallium Scan': { regular: 12000, extra: 15000, skip: 20000 },
  'BONE SCAN': { regular: 5000, extra: 7000, skip: 10000 },
  'Bone Scan': { regular: 5000, extra: 7000, skip: 10000 },
  'DTPA / EC (MAG-3) RENOGRAM SCAN': { regular: 8000, extra: 10000, skip: 15000 },
  'DTPA Renal Scan': { regular: 8000, extra: 10000, skip: 15000 },
  'THYROID SCAN': { regular: 3000, extra: 4500, skip: 7000 },
  'Thyroid Scan': { regular: 3000, extra: 4500, skip: 7000 },
  'POST CAPTOPRIL RENOGRAM': { regular: 9000, extra: 11000, skip: 16000 },
  'Captopril Renal Scan': { regular: 9000, extra: 11000, skip: 16000 },
  'COLLOID LIVER SCAN': { regular: 7500, extra: 9500, skip: 13000 },
  'Colloid Liver Scan': { regular: 7500, extra: 9500, skip: 13000 },
  'MILK SCAN (GE REFLUX)': { regular: 6000, extra: 8000, skip: 12000 },
  'Milk Scan (GE Reflux)': { regular: 6000, extra: 8000, skip: 12000 },
  'MUGA SCAN': { regular: 10000, extra: 12500, skip: 18000 },
  'MUGA Scan': { regular: 10000, extra: 12500, skip: 18000 },
};

const getTestPrice = (testName) => {
  if (!testName) return defaultPrice;
  if (testPrices[testName]) return testPrices[testName];

  const upper = testName.toUpperCase().trim();
  for (const [key, val] of Object.entries(testPrices)) {
    if (key.toUpperCase().trim() === upper) return val;
  }

  return defaultPrice;
};

export default function AppointmentPage() {
  const [form, setForm] = useState({
    name: '', email: '', phone: '', date: '', time: '', Tests: '', chargeType: '', message: '', agree: false,
  });
  const [skipPriceRevealed, setSkipPriceRevealed] = useState(false);
  const [chargeType, setChargeType] = useState('');
  const [done, setDone] = useState(false);
  const [showPolicy, setShowPolicy] = useState(false);
  const [scrolledToBottom, setScrolledToBottom] = useState(false);
  const [innerAgree, setInnerAgree] = useState(false);
  const [lang, setLang] = useState('en'); // 'en' | 'mr'
  const scrollRef = useRef(null);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [tests, setTests] = useState("");
  const [date, setDate] = useState("");
  const [testTime, setTestTime] = useState("");
  const [textMessage, setTextMessage] = useState("");
  const [errors, setErrors] = useState({});

  const validateField = (field, val) => {
    let err = '';
    if (field === 'name') {
      if (!val || !val.trim()) err = 'Full name is required.';
      else if (val.trim().length < 2) err = 'Name must be at least 2 characters.';
    } else if (field === 'email') {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!val || !val.trim()) err = 'Email address is required.';
      else if (!emailRegex.test(val.trim())) err = 'Please enter a valid email address (e.g. name@domain.com).';
    } else if (field === 'phone') {
      const digits = val ? val.replace(/\D/g, '') : '';
      const mobileDigits = digits.length === 12 && digits.startsWith('91') ? digits.slice(2) : digits;
      if (!val || !val.trim()) err = 'Phone number is required.';
      else if (mobileDigits.length !== 10) err = 'Please enter a valid 10-digit mobile number.';
      else if (!/^[6-9]\d{9}$/.test(mobileDigits)) err = 'Mobile number must start with 6, 7, 8, or 9.';
    } else if (field === 'tests') {
      if (!val) err = 'Please select a test.';
    } else if (field === 'date') {
      if (!val) err = 'Please select an appointment date.';
    }
    return err;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const nameErr = validateField('name', name);
    const emailErr = validateField('email', email);
    const phoneErr = validateField('phone', phone);
    const testsErr = validateField('tests', tests || form.Tests);
    const dateErr = validateField('date', date);

    let agreeErr = '';
    if (!form.agree) {
      agreeErr = 'Please accept the privacy policy before booking.';
    }

    const newErrors = {};
    if (nameErr) newErrors.name = nameErr;
    if (emailErr) newErrors.email = emailErr;
    if (phoneErr) newErrors.phone = phoneErr;
    if (testsErr) newErrors.tests = testsErr;
    if (dateErr) newErrors.date = dateErr;
    if (agreeErr) newErrors.agree = agreeErr;

    setErrors(newErrors);

    if (Object.keys(newErrors).length > 0) {
      return;
    }

    setDone(true);
    setTimeout(() => setDone(false), 3000);

    const phoneNumber = "9527070000"; // Optimized for wa.me
    const message = `Name: ${name}\nEmail: ${email}\nPhone: ${phone}\nTests: ${tests || form.Tests}\nDate: ${date}\nTime: ${testTime || form.time}\nMessage: ${textMessage}`;
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;

    window.open(whatsappUrl, '_blank');
  };



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
              <ul className="space-y-3.5">
                {[
                  { img: '/Board.png', t: 'Board-Certified Specialists', d: 'Access top doctors across 20+ specialties.' },
                  { img: '/SameDay.png', t: 'Same-Day Diagnostics', d: 'Imaging and lab work scheduled in one visit.' },
                  { img: '/Standalone.png', t: 'Standalone Diagnostic Center', d: 'Advanced diagnostic and imaging services under one roof.' },
                  { img: '/nabhlogo.png', t: 'National Accreditation Board for Hospitals & Healthcare Providers (NABH)', d: 'NABH accredited for quality, safety, and patient-centered care.' },
                  { img: '/fusion.png', t: 'Fusion PET MRI', d: 'Combines PET and MRI technologies for precise and comprehensive diagnosis.' },
                ].map(({ img, t, d }) => (
                  <li key={t} className="flex gap-4 items-center bg-[#f8f7fd] p-3.5 rounded-2xl border border-slate-100 hover:border-[#3b7a24]/30 hover:shadow-md transition-all duration-300 group">
                    <span className="w-16 h-16 sm:w-20 sm:h-20 shrink-0 rounded-2xl bg-white flex items-center justify-center p-2 border border-slate-200/60 shadow-xs group-hover:scale-105 transition-transform duration-300">
                      <img src={process.env.PUBLIC_URL + img} alt={t} className="w-full h-full object-contain" />
                    </span>
                    <div className="flex-1">
                      <div className="font-display font-extrabold text-[15px] text-[#0e1a6b] leading-snug group-hover:text-[#3b7a24] transition-colors">{t}</div>
                      <div className="text-[#0e1a6b]/70 text-[12.5px] mt-1 leading-relaxed">{d}</div>
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
          <form onSubmit={handleSubmit} noValidate className="col-span-1 lg:col-span-3 bg-white rounded-2xl sm:rounded-3xl p-5 sm:p-7 lg:p-10 soft-shadow flex flex-col">
            <h2 className="font-display font-extrabold text-navy text-xl sm:text-2xl lg:text-3xl mb-1">
              Patient information
            </h2>
            <p className="text-navy/60 text-xs sm:text-sm mb-5 sm:mb-8">
              Fill out the form and we'll confirm your visit within 1 business hour.
            </p>

            {/* Row 1 */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-4">
              <div>
                <div className="relative">
                  <User className="w-3.5 h-3.5 absolute left-4 top-1/2 -translate-y-1/2 text-navy/40" />
                  <input
                    value={name}
                    onChange={(e) => {
                      const val = e.target.value;
                      setName(val);
                      if (errors.name) setErrors(prev => ({ ...prev, name: validateField('name', val) }));
                    }}
                    onBlur={() => setErrors(prev => ({ ...prev, name: validateField('name', name) }))}
                    placeholder="Full Name *"
                    className={`w-full bg-[#f3f1fb] rounded-full pl-10 pr-4 py-3 outline-none text-xs transition-all ${
                      errors.name ? 'border border-red-500 ring-1 ring-red-500/30' : 'focus:ring-2 focus:ring-mint/40'
                    }`}
                  />
                </div>
                {errors.name && <span className="text-red-500 text-[11px] ml-4 mt-1 block font-medium">{errors.name}</span>}
              </div>

              <div>
                <div className="relative">
                  <Mail className="w-3.5 h-3.5 absolute left-4 top-1/2 -translate-y-1/2 text-navy/40" />
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => {
                      const val = e.target.value;
                      setEmail(val);
                      if (errors.email) setErrors(prev => ({ ...prev, email: validateField('email', val) }));
                    }}
                    onBlur={() => setErrors(prev => ({ ...prev, email: validateField('email', email) }))}
                    placeholder="Email Address *"
                    aria-required="true"
                    className={`w-full bg-[#f3f1fb] rounded-full pl-10 pr-4 py-3 outline-none text-xs transition-all ${
                      errors.email ? 'border border-red-500 ring-1 ring-red-500/30' : 'focus:ring-2 focus:ring-mint/40'
                    }`}
                  />
                </div>
                {errors.email && <span className="text-red-500 text-[11px] ml-4 mt-1 block font-medium">{errors.email}</span>}
              </div>
            </div>

            {/* Row 2 */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-4">
              <div>
                <div className="relative">
                  <PhoneIcon className="w-3.5 h-3.5 absolute left-4 top-1/2 -translate-y-1/2 text-navy/40" />
                  <input
                    type="tel"
                    value={phone}
                    maxLength={14}
                    onChange={(e) => {
                      const val = e.target.value.replace(/[^0-9\s+-]/g, '');
                      setPhone(val);
                      if (errors.phone) setErrors(prev => ({ ...prev, phone: validateField('phone', val) }));
                    }}
                    onBlur={() => setErrors(prev => ({ ...prev, phone: validateField('phone', phone) }))}
                    placeholder="Phone (10-digit mobile) *"
                    className={`w-full bg-[#f3f1fb] rounded-full pl-10 pr-4 py-3 outline-none text-xs transition-all ${
                      errors.phone ? 'border border-red-500 ring-1 ring-red-500/30' : 'focus:ring-2 focus:ring-mint/40'
                    }`}
                  />
                </div>
                {errors.phone && <span className="text-red-500 text-[11px] ml-4 mt-1 block font-medium">{errors.phone}</span>}
              </div>

              <div>
                <div className="relative">
                  <select
                    value={tests || form.Tests}
                    onChange={(e) => {
                      const selectedTest = e.target.value;
                      const timing = getTestTiming(selectedTest);
                      setForm({ ...form, Tests: selectedTest, time: timing, chargeType: '' });
                      setTests(selectedTest);
                      setTestTime(timing);
                      setSkipPriceRevealed(false);
                      if (errors.tests) setErrors(prev => ({ ...prev, tests: validateField('tests', selectedTest) }));
                    }}
                    onBlur={() => setErrors(prev => ({ ...prev, tests: validateField('tests', tests || form.Tests) }))}
                    className={`appearance-none w-full bg-[#f3f1fb] rounded-full px-4 py-3 outline-none text-xs text-[#0e1a6b] font-medium transition-all ${
                      errors.tests ? 'border border-red-500 ring-1 ring-red-500/30' : 'focus:ring-2 focus:ring-mint/40'
                    }`}
                  >
                    <option value="">Select Test *</option>
                    <optgroup label="PET-CT SCANS">
                      {petServicesList.map((name) => (
                        <option key={name} value={name}>
                          {name}
                        </option>
                      ))}
                    </optgroup>
                    <optgroup label="NUCLEAR MEDICINE SCANS">
                      {nuclearServicesList.map((name) => (
                        <option key={name} value={name}>
                          {name}
                        </option>
                      ))}
                    </optgroup>
                    <optgroup label="RADIONUCLIDE THERAPY">
                      {therapyServicesList.map((name) => (
                        <option key={name} value={name}>
                          {name}
                        </option>
                      ))}
                    </optgroup>
                  </select>
                  <ChevronDown className="w-3.5 h-3.5 absolute right-4 top-1/2 -translate-y-1/2 text-navy/40 pointer-events-none" />
                </div>
                {errors.tests && <span className="text-red-500 text-[11px] ml-4 mt-1 block font-medium">{errors.tests}</span>}
              </div>
            </div>

            {/* Row 3 */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-4">
              <div>
                <div className="relative">
                  <Calendar className="w-3.5 h-3.5 absolute left-4 top-1/2 -translate-y-1/2 text-navy/40 pointer-events-none" />
                  <input
                    type="date"
                    min={new Date().toLocaleDateString('en-CA')}
                    value={date}
                    onChange={(e) => {
                      const val = e.target.value;
                      setDate(val);
                      if (errors.date) setErrors(prev => ({ ...prev, date: validateField('date', val) }));
                    }}
                    onBlur={() => setErrors(prev => ({ ...prev, date: validateField('date', date) }))}
                    className={`w-full bg-[#f3f1fb] rounded-full pl-10 pr-4 py-3 outline-none text-xs transition-all ${
                      errors.date ? 'border border-red-500 ring-1 ring-red-500/30' : 'focus:ring-2 focus:ring-mint/40'
                    }`}
                  />
                </div>
                {errors.date && <span className="text-red-500 text-[11px] ml-4 mt-1 block font-medium">{errors.date}</span>}
              </div>

              <div className="relative">
                <Clock className="w-3.5 h-3.5 absolute left-4 top-1/2 -translate-y-1/2 text-navy/40" />
                <input
                  readOnly
                  value={testTime || form.time || ''}
                  placeholder={(tests || form.Tests) ? 'Timing auto-filled' : 'Select a Test first'}
                  className={`w-full bg-[#f3f1fb] rounded-full pl-10 pr-4 py-3 outline-none text-xs cursor-default ${(testTime || form.time) ? 'text-navy font-medium' : 'text-navy/40'
                    }`}
                />
              </div>
            </div>

            {/* ── Charging Options ── */}
            {(form.Tests || tests) && (
              <div className="mb-5">
                <label className="font-display font-semibold text-navy text-sm mb-3 block">Select Charge Type *</label>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <button
                    type="button"
                    onClick={() => setForm({ ...form, chargeType: 'regular' })}
                    className={`flex flex-col items-center justify-center p-3 rounded-xl border transition-all duration-200 ${form.chargeType === 'regular' ? 'border-[#3b7a24] bg-white ring-1 ring-[#3b7a24] shadow-sm' : 'border-slate-200 bg-[#f3f1fb] hover:border-[#3b7a24]/40 hover:bg-white'}`}
                  >
                    <span className={`font-display font-bold text-sm mb-1 ${form.chargeType === 'regular' ? 'text-[#0e1a6b]' : 'text-navy/70'}`}>Economy</span>
                    <span className={`font-bold ${form.chargeType === 'regular' ? 'text-[#3b7a24]' : 'text-navy'}`}>₹{getTestPrice(form.Tests || tests).regular.toLocaleString()}</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setForm({ ...form, chargeType: 'extra' })}
                    className={`flex flex-col items-center justify-center p-3 rounded-xl border transition-all duration-200 ${form.chargeType === 'extra' ? 'border-[#3b7a24] bg-white ring-1 ring-[#3b7a24] shadow-sm' : 'border-slate-200 bg-[#f3f1fb] hover:border-[#3b7a24]/40 hover:bg-white'}`}
                  >
                    <span className={`font-display font-bold text-sm mb-1 ${form.chargeType === 'extra' ? 'text-[#0e1a6b]' : 'text-navy/70'}`}>Regular</span>
                    <span className={`font-bold ${form.chargeType === 'extra' ? 'text-[#3b7a24]' : 'text-navy'}`}>₹{getTestPrice(form.Tests || tests).extra.toLocaleString()}</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => {
                      setChargeType('skip');
                      setForm({ ...form, chargeType: 'skip' });
                      setSkipPriceRevealed(true);
                    }}
                    className={`flex flex-col items-center justify-center p-3 rounded-xl border transition-all duration-200 ${chargeType === 'skip' || form.chargeType === 'skip' ? 'border-[#3b7a24] bg-white ring-1 ring-[#3b7a24] shadow-sm' : 'border-slate-200 bg-[#f3f1fb] hover:border-[#3b7a24]/40 hover:bg-white'}`}
                  >
                    <span className={`font-display font-bold text-sm mb-1 ${chargeType === 'skip' || form.chargeType === 'skip' ? 'text-[#0e1a6b]' : 'text-navy/70'}`}>Skip the Queue</span>
                    <span className={`font-bold transition-all ${skipPriceRevealed ? (form.chargeType === 'skip' || chargeType === 'skip' ? 'text-[#3b7a24]' : 'text-navy') : 'text-navy/40 text-[11px] uppercase tracking-wider'}`}>
                      {skipPriceRevealed ? `₹${getTestPrice(form.Tests || tests).skip.toLocaleString()}` : 'Click to reveal'}
                    </span>
                  </button>
                </div>
              </div>
            )}
            {form.chargeType && (
              <div className="mt-3 flex items-center gap-3 rounded-xl border border-[#dbe7ff] bg-[#f8fbff] px-4 py-3 shadow-sm transition-all">

                {/* Icon */}
                <div
                  className={`w-10 h-10 rounded-lg flex items-center justify-center shrink-0
      ${form.chargeType === "skip"
                      ? "bg-green-100 text-green-600"
                      : form.chargeType === "extra"
                        ? "bg-blue-100 text-blue-600"
                        : "bg-orange-100 text-orange-600"
                    }`}
                >
                  <span className="text-lg">
                    {form.chargeType === "skip"
                      ? "⚡"
                      : form.chargeType === "extra"
                        ? "🕕"
                        : "📅"}
                  </span>
                </div>

                {/* Text */}
                <div className="flex-1 leading-tight">
                  <h4 className="text-[15px] font-semibold text-[#0e1a6b]">
                    {form.chargeType === "skip"
                      ? "Skip the Queue"
                      : form.chargeType === "extra"
                        ? "Regular"
                        : "Economy"}
                  </h4>

                  <p className="mt-1 text-[13px] text-gray-600">
                    {form.chargeType === "skip" && (
                      <>
                        <span className="font-semibold text-gray-800">
                          Scan Report:
                        </span>{" "}
                        Available immediately after the scan.
                      </>
                    )}

                    {form.chargeType === "extra" && (
                      <>
                        <span className="font-semibold text-gray-800">
                          Report Delivery:
                        </span>{" "}
                        Same day between
                        <span className="font-semibold text-[#0e1a6b]">
                          {" "}6:00 PM – 7:00 PM
                        </span>.
                      </>
                    )}

                    {form.chargeType === "regular" && (
                      <>
                        <span className="font-semibold text-gray-800">
                          Report Delivery:
                        </span>{" "}
                        Available on the
                        <span className="font-semibold text-[#0e1a6b]">
                          {" "}next day
                        </span>.
                      </>
                    )}
                  </p>
                </div>
              </div>
            )}

            {/* ── Per-test Instructions Panel ── */}
            {(form.Tests || tests) && (
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
                      className={`px-2.5 py-0.5 rounded-full text-[10px] font-semibold transition-all ${lang === 'en' ? 'bg-white text-slate-700 shadow-sm' : 'text-slate-400 hover:text-slate-600'
                        }`}
                    >EN</button>
                    <button
                      type="button"
                      onClick={() => setLang('mr')}
                      className={`px-2.5 py-0.5 rounded-full text-[10px] font-semibold transition-all ${lang === 'mr' ? 'bg-white text-slate-700 shadow-sm' : 'text-slate-400 hover:text-slate-600'
                        }`}
                    >मराठी</button>
                  </div>
                </div>
                {/* Steps */}
                <ul className="px-4 py-3 space-y-2.5">
                  {getTestInstructions(form.Tests || tests, lang).map((step, i) => (
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
              value={textMessage}
              onChange={(e) => setTextMessage(e.target.value)}
              placeholder="Describe your concern (optional)"
              rows={3}
              className="w-full bg-[#f3f1fb] rounded-2xl sm:rounded-3xl px-4 py-3 outline-none text-xs focus:ring-2 focus:ring-mint/40 mb-5 resize-none"
            />

            {/* ── Privacy checkbox trigger ── */}
            <div>
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
              {errors.agree && <span className="text-red-500 text-[11px] ml-8 mt-1 block font-medium">{errors.agree}</span>}
            </div>


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
                aria-label="Book Appointment"
                className="group inline-flex items-center gap-3 font-display font-bold pl-6 pr-2 py-2 rounded-full bg-[#3b7a24] hover:bg-[#2e621c] text-white shadow-md shadow-[#3b7a24]/25 transition-all duration-200 cursor-pointer active:scale-95"
              >
                {done ? (
                  <><Check className="w-4 h-4 text-white" /> Request Sent!</>
                ) : (
                  <>Book Appointment</>
                )}
                <span
                  className="w-10 h-10 rounded-full flex items-center justify-center transition-transform bg-white text-[#3b7a24] group-hover:rotate-45 shadow-xs"
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
