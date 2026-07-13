import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const mainServices = [
  {
    name: 'PET CT Scan',
    desc: 'Advanced functional imaging combined with detailed anatomical precision for accurate diagnosis and staging.',
    img: '/petctscan.png',
    link: '/services',
    state: { targetTab: 'pet' }
  },
  {
    name: 'Nuclear Scan',
    desc: 'Comprehensive nuclear medicine studies for precise functional evaluation of various organ systems.',
    img: '/nuclearscan.png',
    link: '/services',
    state: { targetTab: 'nuclear' }
  },
  {
    name: 'Therapy',
    desc: 'Targeted radionuclide therapies delivering precision treatment directly to cellular targets with minimal side effects.',
    img: '/chemotherapy.jpg',
    link: '/services',
    state: { targetTab: 'therapy' }
  }
];

export default function Services() {
  return (
    <section id="services" className="relative py-10 lg:py-14 bg-[#f8f9fa]">
      <div className="max-w-[1400px] mx-auto px-4 lg:px-8">
        <div className="max-w-3xl mb-8 lg:mb-12">
          <div className="inline-flex items-center gap-2 text-[#3b7a24] font-display font-semibold mb-3 text-xs sm:text-sm uppercase tracking-wider">
            <span className="w-8 h-px bg-[#3b7a24]" />
            Our Core Specialties
          </div>
          <h2
            className="font-display font-extrabold text-[#0e1a6b] text-3xl lg:text-4xl mb-5"
            style={{ lineHeight: '1.3' }}
          >
            Advanced Diagnostic & <br className="hidden sm:block" /> Therapeutic Services
          </h2>
          <p className="text-[#0e1a6bbf] leading-relaxed text-base lg:text-lg">
            Expert Nuclear Medicine and Molecular Imaging focused on precision, innovation, and compassionate patient care.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {mainServices.map((service, i) => (
            <motion.div
              key={service.name}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.6, delay: i * 0.15 }}
              className="group relative overflow-hidden rounded-[24px] h-[280px] sm:h-[320px] lg:h-[350px] shadow-lg shadow-[#0e1a6b]/5 hover:shadow-2xl hover:shadow-[#0e1a6b]/20 hover:-translate-y-1.5 transition-all duration-500"
            >
              {/* Full Background Image */}
              <img
                src={process.env.PUBLIC_URL + service.img}
                alt={service.name}
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
              />

              {/* Gradient Overlays */}
              <div className="absolute inset-0 bg-gradient-to-t from-[#0e1a6b]/95 via-[#0e1a6b]/40 to-transparent opacity-80 group-hover:opacity-90 transition-opacity duration-500" />
              <div className="absolute inset-0 bg-[#3b7a24]/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500 blend-multiply" />

              {/* Content Overlay */}
              <div className="absolute inset-0 p-6 sm:p-7 flex flex-col justify-end">
                <div className="transform transition-transform duration-500 translate-y-2 group-hover:translate-y-0">
                  <h3 className="font-display font-bold text-white text-2xl lg:text-[26px] mb-4 leading-tight drop-shadow-md">
                    {service.name}
                  </h3>

                  {/* Button */}
                  <Link
                    to={service.link}
                    state={service.state}
                    className="inline-flex items-center gap-2.5 bg-white/20 hover:bg-[#3b7a24] backdrop-blur-sm border border-white/30 hover:border-[#3b7a24] text-white px-4 py-2 rounded-full font-display font-semibold transition-all duration-300 text-[13px] group/btn w-max shadow-sm"
                  >
                    Explore Services
                    <span className="w-6 h-6 rounded-full bg-white text-navy group-hover/btn:bg-white group-hover/btn:text-[#3b7a24] flex items-center justify-center transition-colors">
                      <ArrowRight className="w-3 h-3" />
                    </span>
                  </Link>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
