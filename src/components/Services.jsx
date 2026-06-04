import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  ArrowRight,
  ScanSearch,
  HeartPulse,
  Bone,
  Droplets,
  Activity,
  Stethoscope,
  Shield,
  Baby,
  Heart
} from "lucide-react";
import { motion } from 'framer-motion';
import { services } from '../mock';

const containerVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.1 }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6 } }
};

const iconMap = {
  ScanSearch,
  HeartPulse,
  Bone,
  Droplets,
  Activity,
  Stethoscope,
  Shield,
  Baby,
  Heart
};

export default function Services() {
  const [page, setPage] = useState(0);
  const perPage = 4;
  const pages = Math.ceil(services.length / perPage);
  const items = services.slice(page * perPage, (page + 1) * perPage);

  return (
    <section id="services" className="relative py-10 lg:py-14 bg-[#f8f9fa]">
      <div className="relative max-w-[1400px] mx-auto px-4 lg:px-8 z-10">
        <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-5 mb-8 lg:mb-10">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 text-[#3b7a24] font-display font-semibold mb-3 text-sm uppercase tracking-wider">
              <span className="w-8 h-px bg-[#3b7a24]" />
              Trusted Nuclear Medicine & Diagnostic Imaging Center Since 2001
            </div>
            <h2 className="font-display font-extrabold text-[#0e1a6b] text-2xl lg:text-3xl leading-[1.2] mb-5">
              Nuclear Medicine: Advanced Functional & <br className="hidden lg:block" /> Molecular Imaging
            </h2>
            <p className="text-[#0e1a6bbf] leading-relaxed max-w-xl text-sm lg:text-[15px]">
              Expert Nuclear Medicine and Molecular Imaging services focused on precision, innovation, and patient care.
            </p>
          </div>
        </div>

        <motion.div 
          variants={containerVariants}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-50px" }}
          className="grid sm:grid-cols-2 lg:grid-cols-4 gap-x-6 gap-y-12 lg:gap-y-16 mt-16 lg:mt-20"
        >
          {items.map((s) => {
            const Icon = iconMap[s.icon] || HeartPulse;
            return (
              <motion.div variants={itemVariants} key={s.name} className="relative rounded-3xl px-5 lg:px-6 pb-6 pt-12 min-h-[220px] flex flex-col items-center text-center group bg-white border border-gray-100 shadow-xl shadow-[#0e1a6b]/5 hover:-translate-y-1 hover:shadow-2xl hover:shadow-[#3b7a24]/10 hover:bg-[#f3f9f1] transition-all duration-300">
                {/* Overlapping Center Icon */}
                <div className="absolute -top-7 left-1/2 -translate-x-1/2 w-14 h-14 rounded-full bg-[#f3f9f1] text-[#3b7a24] border-4 border-white shadow-sm flex items-center justify-center transition-transform duration-300 group-hover:scale-110 group-hover:bg-[#3b7a24] group-hover:text-white">
                  <Icon className="w-6 h-6" strokeWidth={1.8} />
                </div>
                
                <h3 className="font-display font-bold text-[#0e1a6b] text-lg mb-3">{s.name}</h3>
                <p className="text-[#0e1a6bbf] text-[13px] leading-relaxed flex-1">{s.desc}</p>
                <Link to="/services" className="mt-5 inline-flex items-center gap-2 text-[#3b7a24] font-display font-semibold text-sm group/link">
                  Learn more <ArrowRight className="w-4 h-4 group-hover/link:translate-x-1 transition-transform" />
                </Link>
              </motion.div>
            );
          })}
        </motion.div>

        <div className="flex justify-center gap-2 mt-8">
          {Array.from({ length: pages }).map((_, i) => (
            <button
              key={i}
              onClick={() => setPage(i)}
              className={`h-1.5 rounded-full transition-all ${i === page ? 'bg-[#3b7a24] w-8' : 'bg-gray-200 w-3'}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
