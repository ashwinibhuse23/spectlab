import React, { useEffect, useState, useRef } from 'react';
import { useLocation, Link } from 'react-router-dom';
import { CheckCircle2, AlertCircle, Clock, Timer, Activity, Calendar } from 'lucide-react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { scansData } from '../data/scansData';
import PageHeader from '../components/PageHeader';

gsap.registerPlugin(ScrollTrigger);

export default function ScansPage() {
  const location = useLocation();
  const sectionRefs = useRef({});

  useEffect(() => {
    if (location.hash) {
      const id = location.hash.replace('#', '');
      setTimeout(() => {
        const element = document.getElementById(id);
        if (element) {
          const yOffset = -120;
          const y = element.getBoundingClientRect().top + window.pageYOffset + yOffset;
          window.scrollTo({ top: y, behavior: 'smooth' });
        }
      }, 500);
    } else {
      window.scrollTo(0, 0);
    }
  }, [location]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.header-anim', {
        y: 30,
        opacity: 0,
        duration: 0.8,
        stagger: 0.1,
        ease: 'power3.out'
      });

      gsap.utils.toArray('.scan-section').forEach((section) => {
        gsap.from(section, {
          scrollTrigger: {
            trigger: section,
            start: 'top 85%'
          },
          y: 30,
          opacity: 0,
          duration: 0.6,
          ease: 'power2.out'
        });
      });
    });

    return () => {
      ctx.revert();
    };
  }, []);

  return (
    <>
      <PageHeader
        title="Nuclear Medicine Scans"
        subtitle="Explore our comprehensive range of specialized imaging and therapy services."
        image="/Images/servicesHero.jpg"
      />

      <div className="bg-[#f3f1fb] min-h-screen py-12 lg:py-16">
        <div className="max-w-[1100px] mx-auto px-4 lg:px-8">

          <div className="w-full space-y-8 pb-24">
            {scansData.map((scan) => (
              <section
                key={scan.id}
                id={scan.id}
                ref={el => sectionRefs.current[scan.id] = el}
                className="scan-section bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden scroll-mt-32 w-full"
              >
                {/* Section Header */}
                <div className="border-b border-slate-100 px-6 py-6 md:px-8 bg-gradient-to-r from-white to-slate-50">
                  <h2 className="font-display font-extrabold text-[#0b1559] text-[20px] md:text-[24px] leading-tight">
                    {scan.title}
                  </h2>
                </div>

                <div className="p-6 md:p-8 grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">

                  {/* Left Column */}
                  <div className="space-y-6">
                    {scan.prerequisites && (
                      <div>
                        <div className="flex items-center gap-2.5 mb-2.5">
                          <AlertCircle className="w-4 h-4 text-[#3b7a24]" />
                          <h3 className="font-display font-bold text-[#0b1559] text-[15px] uppercase tracking-wide">Prerequisites & Prep</h3>
                        </div>
                        <p className="text-[#0b1559]/70 text-[13px] leading-relaxed pl-6 whitespace-pre-line">
                          {scan.prerequisites}
                        </p>
                      </div>
                    )}

                    {scan.timeRequired && (
                      <div>
                        <div className="flex items-center gap-2.5 mb-2.5">
                          <Timer className="w-4 h-4 text-[#3b7a24]" />
                          <h3 className="font-display font-bold text-[#0b1559] text-[15px] uppercase tracking-wide">Time Required</h3>
                        </div>
                        <p className="text-[#0b1559]/70 text-[13px] leading-relaxed pl-6">
                          {scan.timeRequired}
                        </p>
                      </div>
                    )}

                    {scan.procedure && (
                      <div>
                        <div className="flex items-center gap-2.5 mb-2.5">
                          <Clock className="w-4 h-4 text-[#3b7a24]" />
                          <h3 className="font-display font-bold text-[#0b1559] text-[15px] uppercase tracking-wide">Procedure</h3>
                        </div>
                        <p className="text-[#0b1559]/70 text-[13px] leading-relaxed pl-6">
                          {scan.procedure}
                        </p>
                      </div>
                    )}
                  </div>

                  {/* Right Column */}
                  <div className="space-y-6 flex flex-col">
                    {scan.indications && scan.indications.length > 0 && (
                      <div className="bg-[#f3f1fb] rounded-xl p-5 border border-slate-100 flex-1">
                        <div className="flex items-center gap-2.5 mb-4">
                          <Activity className="w-4 h-4 text-[#3b7a24]" />
                          <h3 className="font-display font-bold text-[#0b1559] text-[15px] uppercase tracking-wide">Indications / Purpose</h3>
                        </div>
                        <ul className="space-y-2.5">
                          {scan.indications.map((ind, i) => (
                            <li key={i} className="flex items-start gap-2.5">
                              <CheckCircle2 className="w-3.5 h-3.5 text-[#3b7a24] flex-shrink-0 mt-0.5" />
                              <span className="text-[#0b1559]/70 text-[13px] leading-relaxed">{ind}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}

                    {/* Book CTA */}
                    <div className="bg-[#0b1559] rounded-xl p-5 text-white shadow-md mt-4">
                      <h3 className="font-display font-bold text-[15px] mb-1.5">Ready to schedule?</h3>
                      <p className="text-white/70 text-[12.5px] mb-4">
                        Book your appointment for {scan.title} at Spectlabs today.
                      </p>
                      <Link
                        to="/appointment"
                        className="inline-flex items-center justify-center gap-2 w-full bg-[#3b7a24] text-white text-[13px] font-display font-bold py-2.5 px-4 rounded-lg hover:bg-white hover:text-[#0b1559] transition-colors"
                      >
                        <Calendar className="w-4 h-4" />
                        Book Appointment
                      </Link>
                    </div>
                  </div>

                </div>
              </section>
            ))}
          </div>

        </div>
      </div>
    </>
  );
}
