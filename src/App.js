import React, { useEffect } from 'react';
import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

import Layout from './components/Layout';
import HomePage from './pages/HomePage';
import AboutPage from './pages/AboutPage';
import ServicesPage from './pages/ServicesPage';
import DoctorsPage from './pages/DoctorsPage';
import PublicationsPage from './pages/PublicationsPage';
import NewsLetterPage from './pages/NewsLetterPage';
import GalleryPage from './pages/GalleryPage';
import ContactPage from './pages/ContactPage';
import AppointmentPage from './pages/AppointmentPage';
import NotFoundPage from './pages/NotFoundPage';
import PetCtImagingPage from './pages/PetCtImagingPage';
import ThalliumScanPage from './pages/ThalliumScanPage';
import BoneScanPage from './pages/BoneScanPage';
import DtpaRenalScanPage from './pages/DtpaRenalScanPage';
import ThyroidScanPage from './pages/ThyroidScanPage';
import CaptoprilRenalScanPage from './pages/CaptoprilRenalScanPage';
import ColloidLiverScanPage from './pages/ColloidLiverScanPage';
import MilkScanPage from './pages/MilkScanPage';
import MugaScanPage from './pages/MugaScanPage';

gsap.registerPlugin(ScrollTrigger);

function App() {
  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.utils.toArray('section h2').forEach((el) => {
        gsap.from(el, {
          y: 40,
          opacity: 0,
          duration: 0.9,
          ease: 'power3.out',
          scrollTrigger: { trigger: el, start: 'top 85%' },
        });
      });
      gsap.utils.toArray('[data-reveal]').forEach((el, i) => {
        gsap.from(el, {
          y: 30,
          opacity: 0,
          duration: 0.7,
          delay: (i % 4) * 0.08,
          ease: 'power2.out',
          scrollTrigger: { trigger: el, start: 'top 92%' },
        });
      });
    });
    return () => ctx.revert();
  });

  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<HomePage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/services" element={<ServicesPage />} />
          <Route path="/doctors" element={<DoctorsPage />} />
          <Route path="/publications" element={<PublicationsPage />} />
          <Route path="/newsletter" element={<NewsLetterPage />} />
          <Route path="/gallery" element={<GalleryPage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/appointment" element={<AppointmentPage />} />
          <Route path="/services/pet-ct-imaging" element={<PetCtImagingPage />} />
          <Route path="/services/thallium-scan" element={<ThalliumScanPage />} />
          <Route path="/services/bone-scan" element={<BoneScanPage />} />
          <Route path="/services/dtpa-renal-scan" element={<DtpaRenalScanPage />} />
          <Route path="/services/thyroid-scan" element={<ThyroidScanPage />} />
          <Route path="/services/captopril-renal-scan" element={<CaptoprilRenalScanPage />} />
          <Route path="/services/colloid-liver-scan" element={<ColloidLiverScanPage />} />
          <Route path="/services/milk-scan" element={<MilkScanPage />} />
          <Route path="/services/muga-scan" element={<MugaScanPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
