import React from 'react';
import { Check, ArrowRight, PlayCircle } from 'lucide-react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

export default function About() {
  return (
    <section id="about" className="pt-8 lg:pt-12 pb-12 lg:pb-16 bg-white overflow-hidden">
      <div className="max-w-[1400px] mx-auto px-4 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-10 lg:gap-16 items-center">
          {/* Left: Content */}
          <motion.div 
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8 }}
            className="order-2 lg:order-1"
          >
            <div className="inline-flex items-center gap-2 text-[#3b7a24] font-display font-bold mb-4 uppercase tracking-wider text-sm">
              <span className="w-8 h-px bg-[#3b7a24]" />
              About SPECT LAB
            </div>
            <h2 className="font-display font-extrabold text-navy text-3xl lg:text-[30px] leading-[1.45] mb-5">
              A Legacy of Excellence in <br />Nuclear Medicine
            </h2>
            <div className="text-navy/75 leading-relaxed space-y-4 text-xs lg:text-[13px] mb-8 pr-0 lg:pr-6 text-justify">
              <p>
                SPECT LAB is a proprietary organization started in the year 2001 by Dr. Shrikant Solav who holds a post graduate degree in medicine and nuclear medicine. Initially, there was single equipment and a team of three technologists to support the work. In the year 2004, there was an addition of a second Gamma camera to the clinic.
              </p>
              <p>
                In the year 2006 there was introduction of a satellite unit of SPECT Lab in KEM Hospital, Pune which was subsequently closed. The first PET CT facility in Pune was introduced in SPECT LAB in 2007.
              </p>
            </div>
            
            <Link to="/about" className="group inline-flex items-center gap-2 bg-[#3b7a24] text-white text-sm font-display font-bold pl-5 pr-1.5 py-1.5 rounded-full hover:bg-navy transition-colors">
              READ MORE
              <span className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center group-hover:rotate-45 transition-transform">
                <ArrowRight className="w-4 h-4" />
              </span>
            </Link>
          </motion.div>

          {/* Right: Video */}
          <motion.div 
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative order-1 lg:order-2"
          >
            <div className="relative rounded-2xl overflow-hidden aspect-[4/3] w-full bg-slate-900 shadow-xl">
              <iframe 
                className="w-full h-full absolute inset-0" 
                src="https://www.youtube.com/embed/S1kDCbwG36s?si=HP0qNrdt7txlNWtq" 
                title="About SPECT LAB" 
                frameBorder="0" 
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" 
                referrerPolicy="strict-origin-when-cross-origin" 
                allowFullScreen
              ></iframe>
            </div>
            <div className="absolute -top-6 -left-6 w-32 h-32 bg-[#3b7a24]/20 rounded-full blur-3xl pointer-events-none" />
            <div className="absolute -bottom-6 -right-6 w-32 h-32 bg-navy/10 rounded-full blur-3xl pointer-events-none" />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
