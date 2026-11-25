import React, { useState, useRef, useCallback } from 'react';
import SEO from '../components/SEO';
import PageHeader from '../components/PageHeader';
import {
  ArrowRight, ChevronDown, Calendar, Clock, User, Mail,
  Phone as PhoneIcon, Check, Stethoscope, Building2, BadgeCheck, ScanLine, Info, Loader2
} from 'lucide-react';
import { sendAppointmentEmail } from '../lib/api';
import { services, petServicesList, nuclearServicesList, therapyServicesList, bookingTestsList } from '../mock';

// Auto-timing per test — displayed automatically when test is selected (from official schedule)
const testTimings = {
  // #1 THYROID SCAN
  'THYROID SCAN': '2 Hrs',
  'Thyroid Scan': '2 Hrs',

  // #2 RADIO-IODINE ABLATION 08 mCi
  'RADIO-IODINE ABLATION 08 mCi': '1 day',
  'RADIO-IODINE ABLATION 08 mci': '1 day',

  // #3 RADIO-IODINE ABLATION 10 mCi
  'RADIO-IODINE ABLATION 10 mCi': '1 day',
  'RADIO-IODINE ABLATION 10 mci': '1 day',

  // #4 RADIO-IODINE ABLATION 12 mCi
  'RADIO-IODINE ABLATION 12 mCi': '1 day',
  'RADIO-IODINE ABLATION 12 mci': '1 day',
  'RADIO-IODINE ABLATION 15 mci': '1 day',

  // #5 RADIO-IODINE ABLATION 100 mCi
  'RADIO-IODINE ABLATION 100 mCi': '2 days',
  'RADIO-IODINE ABLATION 100 mci': '2 days',

  // #6 THALLIUM SCAN
  'THALLIUM SCAN': '4–5 Hrs',
  'Thallium Scan': '4–5 Hrs',

  // #7 CAPTOPRIL RENAL SCAN
  'CAPTOPRIL RENAL SCAN': '3 Hrs',
  'Captopril Renal Scan': '3 Hrs',

  // #9 baseline
  'baseline': '2–3 Hrs',
  'BASELINE RENAL SCAN': '2–3 Hrs',
  'CAPTOPRIL RENAL SCAN and baseline': '3 Hrs',

  // #10 DTPA RENAL SCAN
  'DTPA RENAL SCAN': '3 Hrs',
  'DTPA Renal Scan': '3 Hrs',
  'DTPA / EC (MAG-3) RENOGRAM SCAN': '3 Hrs',

  // #11 EC RENAL SCAN
  'EC RENAL SCAN': '3 Hrs',
  'EC Renal Scan': '3 Hrs',

  // #12 DMSA RENAL
  'DMSA RENAL': '3 Hrs',
  'DMSA Renal Scan': '3 Hrs',
  'DMSA RENAL SCAN (CORTICAL FUNCTION)': '3 Hrs',

  // #13 VUR STUDY / MCU
  'VUR STUDY / MCU': '2 Hrs',

  // #14 BONE SCAN
  'BONE SCAN': '5–6 Hrs',
  'Bone Scan': '5–6 Hrs',

  // #15 LUNG PERFUSION SCAN
  'LUNG PERFUSION SCAN': '2 Hrs',

  // #16 LUNG VENTILATION SCAN
  'LUNG VENTILATION SCAN': '2 Hrs',

  // #17 LIVER COLLOID SCAN
  'LIVER COLLOID SCAN': '1 Hr',
  'Colloid Liver Scan': '1 Hr',
  'COLLOID LIVER SCAN': '1 Hr',

  // #18 HEPATOBILLARY SCAN (HIDA)
  'HEPATOBILLARY SCAN (HIDA)': '2 days',
  'HIDA Scan': '2 days',

  // #19 MECKEL'S SCAN
  "MECKEL'S SCAN": '2 Hrs',
  'Meckels Scan': '2 Hrs',

  // #20 GI BLEED SCAN / RBC SCAN
  'GI BLEED SCAN / RBC SCAN': '5–6 Hrs',
  'GI Bleed Scan': '5–6 Hrs',

  // #21 MIBG(conditions apply)
  'MIBG (conditions apply)': '5–6 days',
  'MIBG(conditions apply)': '5–6 days',
  'MIBG SCAN': '5–6 days',

  // #22 BRAIN SPECT
  'BRAIN SPECT': '5–6 days',
  'BRAIN SPECT (EPILEPSY / ALZEIMERS)': '5–6 days',

  // #23 GASTRIC EMPTING
  'GASTRIC EMPTING': '1–2 days',
  'Gastric Emptying Scan': '1–2 days',

  // #24 G.E. REFLUX / MILK SCAN
  'G.E. REFLUX / MILK SCAN': '4–5 Hrs',
  'MILK SCAN (GE REFLUX)': '4–5 Hrs',
  'Milk Scan (GE Reflux)': '4–5 Hrs',

  // #25 TESTICULAR SCAN FOR TORSION
  'TESTICULAR SCAN FOR TORSION': '3–4 Hrs',

  // #26 MUGA
  'MUGA': '3–4 Hrs',
  'MUGA SCAN': '3–4 Hrs',
  'MUGA Scan': '3–4 Hrs',

  // #27 PARATHYROID SCAN
  'PARATHYROID SCAN': '4–5 Hrs',
  'Parathyroid Scan': '4–5 Hrs',

  // #28 IODINE SCAN
  'IODINE SCAN': '2 days',
  'Iodine Scan': '2 days',

  // #29 PHARMACOLOGICAL STRESS THALLIUM
  'PHARMACOLOGICAL STRESS THALLIUM': '4–5 Hrs',

  // #30 LYMPHOSCINTIGRAPHY
  'LYMPHOSCINTIGRAPHY': '5 Hrs',
  'Lymphoscintigraphy': '5 Hrs',

  // #31 DACROSCINTIGRAPHY
  'DACROSCINTIGRAPHY': '4 Hrs',
  'Dacroscintigraphy': '4 Hrs',

  // #32 Colonic Transit Time
  'Colonic Transit Time': '5–6 days',
  'COLONIC TRANSIT TIME': '5–6 days',

  // #33 FDG Whole Body Pet
  'FDG Whole Body Pet': '3–4 Hrs',
  'FDG Whole Body PET': '3–4 Hrs',
  'PET-CT IMAGING (FDG)': '3–4 Hrs',
  'PET-CT Imaging Procedure (FDG)': '3–4 Hrs',
  'F-18 FDG PET CT Scan': '3–4 Hrs',

  // #34 Cardiac Pet
  'Cardiac Pet': '6–7 Hrs',
  'Cardiac PET': '6–7 Hrs',
  'Cardiac PET Scan': '6–7 Hrs',

  // #35 Neurology Brain Pet
  'Neurology Brain Pet': '3–4 Hrs',
  'Neurology Brain PET': '3–4 Hrs',

  // #36 GA 68 Dota Scan (By Appointment)
  'GA 68 Dota Scan (By Appointment)': 'By Appointment (3 Hrs)',
  'Ga68 DOTA PET CT Scan': 'By Appointment (3 Hrs)',
  'Gallium-68 OCTREOTIDE /DOTA/SOMATOSTATIN Scan': 'By Appointment (3 Hrs)',

  // #37 GA 68 PSMA Scan
  'GA 68 PSMA Scan': 'By Appointment (3 Hrs)',
  'Ga68 PSMA PET CT Scan': 'By Appointment (3 Hrs)',
  'Gallium-68 PSMA Scan': 'By Appointment (3 Hrs)',

  // #38 Anesthesiologist
  'Anesthesiologist': 'By Appointment',

  // #39 fapi
  'fapi': '3 Hrs',
  'FAPI': '3 Hrs',
  'FAPI PET Scan': '3 Hrs',
  'FAPI PET CT Scan': '3 Hrs',

  // #40 FLUORODOPA
  'FLUORODOPA': '4–5 Hrs',
  'F-18 FDOPA PET CT Scan': '4–5 Hrs',

  // #41 PENTIXAFOR PET SCAN
  'PENTIXAFOR PET SCAN': '2–3 Hrs',
  'Pentixafor PET Scan': '2–3 Hrs',

  // #42 TRIVEHXEXIN
  'TRIVEHXEXIN': '2–3 Hrs',
  'Trivehexin': '2–3 Hrs',
  'Trivehexin PET CT Scan': '2–3 Hrs',

  // #43 EXENDIN
  'EXENDIN': '2–3 Hrs',
  'Exendin': '2–3 Hrs',
  'Exendine PET CT Scan': '2–3 Hrs',
  'Exendin PET CT Scan': '2–3 Hrs',
  'Fusion- PET MRI': '2–3 Hrs',
  'Fusion PET MRI': '2–3 Hrs',
};

// Robust timing lookup helper
const getTestTiming = (testName) => {
  if (!testName) return '';
  if (testTimings[testName]) return testTimings[testName];

  const upper = testName.toUpperCase().trim();
  for (const [key, val] of Object.entries(testTimings)) {
    if (key.toUpperCase().trim() === upper) return val;
  }

  if (upper.includes('THYROID')) return '2 Hrs';
  if (upper.includes('ABLATION 100')) return '2 days';
  if (upper.includes('ABLATION')) return '1 day';
  if (upper.includes('THALLIUM')) return '4–5 Hrs';
  if (upper.includes('BONE')) return '5–6 Hrs';
  if (upper.includes('CAPTOPRIL')) return '3 Hrs';
  if (upper.includes('DTPA') || upper.includes('DMSA') || upper.includes('EC RENAL') || upper.includes('RENOGRAM')) return '3 Hrs';
  if (upper.includes('CARDIAC PET')) return '6–7 Hrs';
  if (upper.includes('BRAIN PET') || upper.includes('FDG') || upper.includes('WHOLE BODY PET')) return '3–4 Hrs';
  if (upper.includes('DOTA') || upper.includes('PSMA')) return 'By Appointment (3 Hrs)';
  if (upper.includes('ANESTHESIOLOGIST')) return 'By Appointment';
  if (upper.includes('SPECT') || upper.includes('COLONIC') || upper.includes('MIBG')) return '5–6 days';
  if (upper.includes('GASTRIC') || upper.includes('HIDA') || upper.includes('IODINE')) return '1–2 days';
  if (upper.includes('MUGA') || upper.includes('TORSION')) return '3–4 Hrs';
  if (upper.includes('LUNG') || upper.includes('MECKEL') || upper.includes('MCU') || upper.includes('VUR')) return '2 Hrs';
  if (upper.includes('LIVER')) return '1 Hr';
  if (upper.includes('PARATHYROID') || upper.includes('MILK') || upper.includes('REFLUX') || upper.includes('FLUORODOPA')) return '4–5 Hrs';
  if (upper.includes('PET') || upper.includes('FAPI') || upper.includes('EXENDIN') || upper.includes('TRIVEH')) return '2–3 Hrs';

  return '2–3 Hrs';
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

const defaultPrice = { regular: 6000, extra: 6000, skip: 8500 };

const testPrices = {
  // #1 THYROID SCAN: 6,500
  'THYROID SCAN': { regular: 6500, extra: 6500, skip: 9000 },
  'Thyroid Scan': { regular: 6500, extra: 6500, skip: 9000 },

  // #2 RADIO-IODINE ABLATION 08 mCi: 8,000
  'RADIO-IODINE ABLATION 08 mCi': { regular: 8000, extra: 8000, skip: 11000 },
  'RADIO-IODINE ABLATION 08 mci': { regular: 8000, extra: 8000, skip: 11000 },

  // #3 RADIO-IODINE ABLATION 10 mCi: 10,000
  'RADIO-IODINE ABLATION 10 mCi': { regular: 10000, extra: 10000, skip: 14000 },
  'RADIO-IODINE ABLATION 10 mci': { regular: 10000, extra: 10000, skip: 14000 },

  // #4 RADIO-IODINE ABLATION 12 mCi: 12,000
  'RADIO-IODINE ABLATION 12 mCi': { regular: 12000, extra: 12000, skip: 16000 },
  'RADIO-IODINE ABLATION 12 mci': { regular: 12000, extra: 12000, skip: 16000 },
  'RADIO-IODINE ABLATION 15 mci': { regular: 12000, extra: 12000, skip: 16000 },

  // #5 RADIO-IODINE ABLATION 100 mCi: 55,000
  'RADIO-IODINE ABLATION 100 mCi': { regular: 55000, extra: 55000, skip: 65000 },
  'RADIO-IODINE ABLATION 100 mci': { regular: 55000, extra: 55000, skip: 65000 },

  // #6 THALLIUM SCAN: 14,000
  'THALLIUM SCAN': { regular: 14000, extra: 14000, skip: 19000 },
  'Thallium Scan': { regular: 14000, extra: 14000, skip: 19000 },

  // #7 CAPTOPRIL RENAL SCAN: 5,500
  'CAPTOPRIL RENAL SCAN': { regular: 5500, extra: 5500, skip: 7500 },
  'Captopril Renal Scan': { regular: 5500, extra: 5500, skip: 7500 },

  // #9 baseline: 5,500
  'baseline': { regular: 5500, extra: 5500, skip: 7500 },
  'BASELINE RENAL SCAN': { regular: 5500, extra: 5500, skip: 7500 },
  'CAPTOPRIL RENAL SCAN and baseline': { regular: 11000, extra: 11000, skip: 15000 },

  // #10 DTPA RENAL SCAN: 6,000
  'DTPA RENAL SCAN': { regular: 6000, extra: 6000, skip: 8500 },
  'DTPA Renal Scan': { regular: 6000, extra: 6000, skip: 8500 },
  'DTPA / EC (MAG-3) RENOGRAM SCAN': { regular: 6000, extra: 6000, skip: 8500 },

  // #11 EC RENAL SCAN: 6,000
  'EC RENAL SCAN': { regular: 6000, extra: 6000, skip: 8500 },
  'EC Renal Scan': { regular: 6000, extra: 6000, skip: 8500 },

  // #12 DMSA RENAL: 6,000
  'DMSA RENAL': { regular: 6000, extra: 6000, skip: 8500 },
  'DMSA Renal Scan': { regular: 6000, extra: 6000, skip: 8500 },
  'DMSA RENAL SCAN (CORTICAL FUNCTION)': { regular: 6000, extra: 6000, skip: 8500 },

  // #13 VUR STUDY / MCU: 6,000
  'VUR STUDY / MCU': { regular: 6000, extra: 6000, skip: 8500 },

  // #14 BONE SCAN: 7,000
  'BONE SCAN': { regular: 7000, extra: 7000, skip: 9500 },
  'Bone Scan': { regular: 7000, extra: 7000, skip: 9500 },

  // #15 LUNG PERFUSION SCAN: 4,000
  'LUNG PERFUSION SCAN': { regular: 4000, extra: 4000, skip: 5500 },

  // #16 LUNG VENTILATION SCAN: 4,000
  'LUNG VENTILATION SCAN': { regular: 4000, extra: 4000, skip: 5500 },

  // #17 LIVER COLLOID SCAN: 6,000
  'LIVER COLLOID SCAN': { regular: 6000, extra: 6000, skip: 8500 },
  'Colloid Liver Scan': { regular: 6000, extra: 6000, skip: 8500 },
  'COLLOID LIVER SCAN': { regular: 6000, extra: 6000, skip: 8500 },

  // #18 HEPATOBILLARY SCAN (HIDA): 6,000
  'HEPATOBILLARY SCAN (HIDA)': { regular: 6000, extra: 6000, skip: 8500 },
  'HIDA Scan': { regular: 6000, extra: 6000, skip: 8500 },

  // #19 MECKEL'S SCAN: 6,000
  "MECKEL'S SCAN": { regular: 6000, extra: 6000, skip: 8500 },
  'Meckels Scan': { regular: 6000, extra: 6000, skip: 8500 },

  // #20 GI BLEED SCAN / RBC SCAN: 10,000
  'GI BLEED SCAN / RBC SCAN': { regular: 10000, extra: 10000, skip: 14000 },
  'GI Bleed Scan': { regular: 10000, extra: 10000, skip: 14000 },

  // #21 MIBG(conditions apply): 25,000
  'MIBG (conditions apply)': { regular: 25000, extra: 25000, skip: 30000 },
  'MIBG(conditions apply)': { regular: 25000, extra: 25000, skip: 30000 },
  'MIBG SCAN': { regular: 25000, extra: 25000, skip: 30000 },

  // #22 BRAIN SPECT: 5,000
  'BRAIN SPECT': { regular: 5000, extra: 5000, skip: 7000 },
  'BRAIN SPECT (EPILEPSY / ALZEIMERS)': { regular: 5000, extra: 5000, skip: 7000 },

  // #23 GASTRIC EMPTING: 6,000
  'GASTRIC EMPTING': { regular: 6000, extra: 6000, skip: 8500 },
  'Gastric Emptying Scan': { regular: 6000, extra: 6000, skip: 8500 },

  // #24 G.E. REFLUX / MILK SCAN: 6,000
  'G.E. REFLUX / MILK SCAN': { regular: 6000, extra: 6000, skip: 8500 },
  'MILK SCAN (GE REFLUX)': { regular: 6000, extra: 6000, skip: 8500 },
  'Milk Scan (GE Reflux)': { regular: 6000, extra: 6000, skip: 8500 },

  // #25 TESTICULAR SCAN FOR TORSION: 6,000
  'TESTICULAR SCAN FOR TORSION': { regular: 6000, extra: 6000, skip: 8500 },

  // #26 MUGA: 6,000
  'MUGA': { regular: 6000, extra: 6000, skip: 8500 },
  'MUGA SCAN': { regular: 6000, extra: 6000, skip: 8500 },
  'MUGA Scan': { regular: 6000, extra: 6000, skip: 8500 },

  // #27 PARATHYROID SCAN: 10,000
  'PARATHYROID SCAN': { regular: 10000, extra: 10000, skip: 14000 },
  'Parathyroid Scan': { regular: 10000, extra: 10000, skip: 14000 },

  // #28 IODINE SCAN: 7,000
  'IODINE SCAN': { regular: 7000, extra: 7000, skip: 9500 },
  'Iodine Scan': { regular: 7000, extra: 7000, skip: 9500 },

  // #29 PHARMACOLOGICAL STRESS THALLIUM: 15,000
  'PHARMACOLOGICAL STRESS THALLIUM': { regular: 15000, extra: 15000, skip: 20000 },

  // #30 LYMPHOSCINTIGRAPHY: 10,000
  'LYMPHOSCINTIGRAPHY': { regular: 10000, extra: 10000, skip: 14000 },
  'Lymphoscintigraphy': { regular: 10000, extra: 10000, skip: 14000 },

  // #31 DACROSCINTIGRAPHY: 6,000
  'DACROSCINTIGRAPHY': { regular: 6000, extra: 6000, skip: 8500 },
  'Dacroscintigraphy': { regular: 6000, extra: 6000, skip: 8500 },

  // #32 Colonic Transit Time: 10,000
  'Colonic Transit Time': { regular: 10000, extra: 10000, skip: 14000 },
  'COLONIC TRANSIT TIME': { regular: 10000, extra: 10000, skip: 14000 },

  // #33 FDG Whole Body Pet: 16000 - 21000
  'FDG Whole Body Pet': { regular: 16000, extra: 16000, skip: 21000 },
  'FDG Whole Body PET': { regular: 16000, extra: 16000, skip: 21000 },
  'PET-CT IMAGING (FDG)': { regular: 16000, extra: 16000, skip: 21000 },
  'PET-CT Imaging Procedure (FDG)': { regular: 16000, extra: 16000, skip: 21000 },
  'F-18 FDG PET CT Scan': { regular: 16000, extra: 16000, skip: 21000 },

  // #34 Cardiac Pet: 17,000
  'Cardiac Pet': { regular: 17000, extra: 17000, skip: 22000 },
  'Cardiac PET': { regular: 17000, extra: 17000, skip: 22000 },
  'Cardiac PET Scan': { regular: 17000, extra: 17000, skip: 22000 },

  // #35 Neurology Brain Pet: 16,000
  'Neurology Brain Pet': { regular: 16000, extra: 16000, skip: 21000 },
  'Neurology Brain PET': { regular: 16000, extra: 16000, skip: 21000 },

  // #36 GA 68 Dota Scan (By Appointment): 25,000
  'GA 68 Dota Scan (By Appointment)': { regular: 25000, extra: 25000, skip: 30000 },
  'Ga68 DOTA PET CT Scan': { regular: 25000, extra: 25000, skip: 30000 },
  'Gallium-68 OCTREOTIDE /DOTA/SOMATOSTATIN Scan': { regular: 25000, extra: 25000, skip: 30000 },

  // #37 GA 68 PSMA Scan: 25,000
  'GA 68 PSMA Scan': { regular: 25000, extra: 25000, skip: 30000 },
  'Ga68 PSMA PET CT Scan': { regular: 25000, extra: 25000, skip: 30000 },
  'Gallium-68 PSMA Scan': { regular: 25000, extra: 25000, skip: 30000 },

  // #38 Anesthesiologist: 6,000
  'Anesthesiologist': { regular: 6000, extra: 6000, skip: 8500 },

  // #39 fapi / FAPI PET Scan: 25,000
  'fapi': { regular: 25000, extra: 25000, skip: 30000 },
  'FAPI': { regular: 25000, extra: 25000, skip: 30000 },
  'FAPI PET Scan': { regular: 25000, extra: 25000, skip: 30000 },
  'FAPI PET CT Scan': { regular: 25000, extra: 25000, skip: 30000 },

  // #40 FLUORODOPA: 25,000
  'FLUORODOPA': { regular: 25000, extra: 25000, skip: 30000 },
  'F-18 FDOPA PET CT Scan': { regular: 25000, extra: 25000, skip: 30000 },

  // #41 PENTIXAFOR PET SCAN: 25,000
  'PENTIXAFOR PET SCAN': { regular: 25000, extra: 25000, skip: 30000 },
  'Pentixafor PET Scan': { regular: 25000, extra: 25000, skip: 30000 },

  // #42 TRIVEHXEXIN: 25,000
  'TRIVEHXEXIN': { regular: 25000, extra: 25000, skip: 30000 },
  'Trivehexin': { regular: 25000, extra: 25000, skip: 30000 },
  'Trivehexin PET CT Scan': { regular: 25000, extra: 25000, skip: 30000 },

  // #43 EXENDIN: 25,000
  'EXENDIN': { regular: 25000, extra: 25000, skip: 30000 },
  'Exendin': { regular: 25000, extra: 25000, skip: 30000 },
  'Exendine PET CT Scan': { regular: 25000, extra: 25000, skip: 30000 },
  'Exendin PET CT Scan': { regular: 25000, extra: 25000, skip: 30000 },

  // Additional PET
  'Fusion- PET MRI': { regular: 25000, extra: 25000, skip: 32000 },
  'Fusion PET MRI': { regular: 25000, extra: 25000, skip: 32000 },
};

const getTestPrice = (testName) => {
  if (!testName) return defaultPrice;
  if (testPrices[testName]) return testPrices[testName];

  const upper = testName.toUpperCase().trim();
  for (const [key, val] of Object.entries(testPrices)) {
    if (key.toUpperCase().trim() === upper) return val;
  }

  // Fallbacks by keywords
  if (upper.includes('THYROID')) return { regular: 6500, extra: 6500, skip: 9000 };
  if (upper.includes('ABLATION 100')) return { regular: 55000, extra: 55000, skip: 65000 };
  if (upper.includes('ABLATION 12') || upper.includes('ABLATION 15')) return { regular: 12000, extra: 12000, skip: 16000 };
  if (upper.includes('ABLATION 10')) return { regular: 10000, extra: 10000, skip: 14000 };
  if (upper.includes('ABLATION 08') || upper.includes('ABLATION 8')) return { regular: 8000, extra: 8000, skip: 11000 };
  if (upper.includes('THALLIUM') && upper.includes('STRESS')) return { regular: 15000, extra: 15000, skip: 20000 };
  if (upper.includes('THALLIUM')) return { regular: 14000, extra: 14000, skip: 19000 };
  if (upper.includes('BONE')) return { regular: 7000, extra: 7000, skip: 9500 };
  if (upper.includes('CAPTOPRIL')) return { regular: 5500, extra: 5500, skip: 7500 };
  if (upper.includes('DTPA') || upper.includes('DMSA') || upper.includes('EC RENAL') || upper.includes('MCU') || upper.includes('VUR')) return { regular: 6000, extra: 6000, skip: 8500 };
  if (upper.includes('CARDIAC PET')) return { regular: 17000, extra: 17000, skip: 22000 };
  if (upper.includes('BRAIN PET') || upper.includes('FDG') || upper.includes('WHOLE BODY PET')) return { regular: 16000, extra: 16000, skip: 21000 };
  if (upper.includes('DOTA') || upper.includes('PSMA') || upper.includes('FAPI') || upper.includes('FLUORODOPA') || upper.includes('PENTIXAFOR') || upper.includes('TRIVEH') || upper.includes('EXENDIN')) return { regular: 25000, extra: 25000, skip: 30000 };
  if (upper.includes('ANESTHESIOLOGIST')) return { regular: 6000, extra: 6000, skip: 8500 };
  if (upper.includes('BRAIN SPECT')) return { regular: 5000, extra: 5000, skip: 7000 };
  if (upper.includes('MIBG')) return { regular: 25000, extra: 25000, skip: 30000 };
  if (upper.includes('PARATHYROID') || upper.includes('LYMPHO') || upper.includes('COLONIC') || upper.includes('GI BLEED')) return { regular: 10000, extra: 10000, skip: 14000 };
  if (upper.includes('IODINE')) return { regular: 7000, extra: 7000, skip: 9500 };
  if (upper.includes('LUNG')) return { regular: 4000, extra: 4000, skip: 5500 };

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
  const [loading, setLoading] = useState(false);
  const [statusMsg, setStatusMsg] = useState({ type: '', text: '' });
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

  const handleSubmit = async (e) => {
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

    setLoading(true);
    setStatusMsg({ type: '', text: '' });

    try {
      const result = await sendAppointmentEmail({
        name,
        email,
        phone,
        date,
        time: testTime || form.time,
        tests: tests || form.Tests,
        message: textMessage,
        chargeType: form.chargeType === 'skip' ? 'Skip the Queue' : form.chargeType === 'extra' ? 'Regular' : (form.chargeType || chargeType),
      });

      if (result.success) {
        setDone(true);
        setStatusMsg({ type: 'success', text: 'Appointment request emailed to our team!' });
        setTimeout(() => setDone(false), 5000);
      } else {
        setStatusMsg({ type: 'error', text: result.error || 'Could not send email, but opening WhatsApp...' });
      }
    } catch (err) {
      console.error('Error submitting appointment:', err);
    } finally {
      setLoading(false);
    }

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
      <SEO
        title="Book an Appointment | Spect lab Nuclear Medicine Services"
        description="Schedule your PET-CT or Nuclear Medicine scan online at Spect lab Nuclear Medicine Services. Convenient booking, transparent timings, and personalized patient assistance in Pune."
        keywords="book nuclear scan Pune, schedule PET-CT appointment, Spect lab Nuclear Medicine Services appointment, online scan booking, PET CT booking Pune"
        canonical="/appointment"
      />
      <PageHeader
        title="Book Your Appointment"
        subtitle="Care Without the Wait"
        breadcrumbs={[{ label: 'Appointment' }]}
        image="/Images/servicesHero.png"
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
          <form onSubmit={handleSubmit} noValidate className="col-span-1 lg:col-span-3 bg-white rounded-2xl sm:rounded-3xl p-5 sm:p-7 lg:p-10 soft-shadow flex flex-col h-fit self-start">
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
                    {bookingTestsList.map((name) => (
                      <option key={name} value={name}>
                        {name}
                      </option>
                    ))}
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
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <button
                    type="button"
                    onClick={() => {
                      setChargeType('extra');
                      setForm({ ...form, chargeType: 'extra' });
                    }}
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
                      : "bg-blue-100 text-blue-600"
                    }`}
                >
                  <span className="text-lg">
                    {form.chargeType === "skip"
                      ? "⚡"
                      : "🕕"}
                  </span>
                </div>

                {/* Text */}
                <div className="flex-1 leading-tight">
                  <h4 className="text-[15px] font-semibold text-[#0e1a6b]">
                    {form.chargeType === "skip"
                      ? "Skip the Queue"
                      : "Regular"}
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

            {/* ── Status Message Banner ── */}
            {statusMsg.text && (
              <div className={`mt-4 p-3.5 rounded-xl text-xs font-medium ${
                statusMsg.type === 'success' ? 'bg-[#3b7a24]/10 text-[#3b7a24] border border-[#3b7a24]/20' : 'bg-red-50 text-red-600 border border-red-100'
              }`}>
                {statusMsg.text}
              </div>
            )}

            {/* ── Book Appointment button ── */}
            <div className="flex justify-start mt-6">
              <button
                type="submit"
                disabled={loading}
                aria-label="Book Appointment"
                className="group inline-flex items-center gap-3 font-display font-bold pl-6 pr-2 py-2 rounded-full bg-[#3b7a24] hover:bg-[#2e621c] text-white shadow-md shadow-[#3b7a24]/25 transition-all duration-200 cursor-pointer active:scale-95 disabled:opacity-70 disabled:cursor-not-allowed"
              >
                {loading ? (
                  <>Sending request...</>
                ) : done ? (
                  <><Check className="w-4 h-4 text-white" /> Request Sent!</>
                ) : (
                  <>Book Appointment</>
                )}
                <span
                  className="w-10 h-10 rounded-full flex items-center justify-center transition-transform bg-white text-[#3b7a24] group-hover:rotate-45 shadow-xs"
                >
                  {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : <ArrowRight className="w-4 h-4" />}
                </span>
              </button>
            </div>
          </form>

        </div>
      </section>
    </>
  );
}
