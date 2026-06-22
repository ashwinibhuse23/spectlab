import React from 'react';
import { ArrowRight, Phone, Check } from 'lucide-react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

export default function AppointmentCTA() {
  return (
    <section className="py-10 lg:py-16 bg-[#f3f1fb]">
      <div className="max-w-[1400px] mx-auto px-4 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          <motion.div 
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8 }}
            className="relative flex justify-center lg:block"
          >
            <div className="relative rounded-[32px] overflow-hidden aspect-[4/3] w-full sm:w-[90%] lg:w-[90%] bg-slate-50 soft-shadow">
              <img src={process.env.PUBLIC_URL + '/appointment.png'} alt="Appointment" className="w-full h-full object-cover" />
            </div>
            <div className="absolute -bottom-6 right-0 sm:right-4 lg:right-12 bg-white rounded-2xl px-6 py-5 soft-shadow flex items-center gap-4 z-10">
              <div className="w-12 h-12 rounded-full bg-[#3b7a24] text-white flex items-center justify-center">
                <Phone className="w-5 h-5" />
              </div>
              <div>
                <div className="text-xs text-navy/60 font-medium mb-1">Emergency Call</div>
                <div className="flex flex-col gap-0.5">
                  <a href="tel:+919527070000" className="font-display font-bold text-navy hover:text-[#3b7a24] transition-colors text-sm">+91-9527070000</a>
                  <a href="tel:+918975758509" className="font-display font-bold text-navy hover:text-[#3b7a24] transition-colors text-sm">+91-8975758509</a>
                  <a href="tel:+918975758566" className="font-display font-bold text-navy hover:text-[#3b7a24] transition-colors text-sm">+91-8975758566</a>
                </div>
              </div>
            </div>
            <div className="absolute -top-4 -left-4 w-24 h-24 bg-[#3b7a24]/20 rounded-full blur-2xl animate-float" />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <div className="inline-flex items-center gap-2 text-[#3b7a24] font-display font-semibold mb-4">
              <span className="w-10 h-px bg-[#3b7a24]" />
              Make an Appointment
            </div>
            <h2 className="font-display font-extrabold text-navy text-[27px] leading-[1.4] mb-6">
              Looking for professionals & trusted healthcare? You're in the right place.
            </h2>
            <ul className="space-y-3 mb-8">
              {['Advanced PET-CT & SPECT-CT Imaging', 'Accurate Diagnostic & Therapy Solutions', 'Experienced Nuclear Medicine Specialists'].map((t) => (
                <li key={t} className="flex items-center gap-3">
                  <span className="w-6 h-6 rounded-full bg-[#3b7a24]/15 text-[#3b7a24] flex items-center justify-center">
                    <Check className="w-3.5 h-3.5" strokeWidth={3} />
                  </span>
                  <span className="font-display font-semibold text-navy">{t}</span>
                </li>
              ))}
            </ul>
            <div className="flex flex-wrap items-center gap-6">
              <Link to="/appointment" className="group inline-flex items-center gap-3 bg-navy hover:bg-[#2d661b] text-white font-display font-bold pl-6 pr-2 py-2 rounded-full transition-colors">
                Appointment
                <span className="w-10 h-10 rounded-full bg-white text-[#3b7a24] flex items-center justify-center group-hover:rotate-45 transition-transform">
                  <ArrowRight className="w-4 h-4" />
                </span>
              </Link>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
