import React from 'react';
import PageHeader from '../components/PageHeader';
import AppointmentCTA from '../components/AppointmentCTA';
import { Award, Heart, Microscope, ShieldCheck, Users, Clock, Check, Activity, Monitor } from 'lucide-react';
import { motion } from 'framer-motion';

const containerVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.15 }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6 } }
};

export default function AboutPage() {
  return (
    <>
      <PageHeader
        title="About SPECT LAB"
        subtitle="Caring for You Starts with Who We Are"
        description="Delivering Excellence in Nuclear Medicine, PET-CT, and SPECT-CT Imaging Since 2001"
        image="/Images/aboutHero.jpg"
      />

      {/* Our Story Section */}
      <section className="py-12 lg:py-20 bg-white overflow-hidden">
        <div className="max-w-[1400px] mx-auto px-4 lg:px-8">
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8 }}
            className="max-w-4xl mx-auto text-center"
          >
            <div className="inline-flex items-center gap-2 text-[#3b7a24] font-display font-semibold mb-6">
              <span className="w-6 sm:w-10 h-px bg-[#3b7a24]" />
              Our Story
              <span className="w-6 sm:w-10 h-px bg-[#3b7a24]" />
            </div>
            <h2 className="font-display font-extrabold text-[#0e1a6b] text-3xl md:text-4xl lg:text-[42px] leading-[1.2] mb-12">
              Trusted Excellence in Diagnostic Imaging
            </h2>
            <div className="space-y-6 text-[#0e1a6b]/80 text-[15px] md:text-[17px] leading-relaxed text-justify">
              <p>
                SPECT LAB is a proprietary organization started in the year 2001 by Dr. Shrikant Solav who holds a post graduate degree in medicine and nuclear medicine. Initially, there was single equipment and a team of three technologists to support the work.
                 In the year 2004, there was an addition of a second Gamma camera to the clinic.
              </p>
             
              <p>
                In the year 2006 there was introduction of a satellite unit of SPECT Lab in KEM Hospital, Pune which was subsequently closed. The first PET CT facility in Pune was introduced in SPECT LAB in 2007.
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Why Choose Section */}
      <section className="py-12 lg:py-20 bg-[#f8f9fa] overflow-hidden">
        <div className="max-w-[1400px] mx-auto px-4 lg:px-8">
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8 }}
            className="text-center max-w-3xl mx-auto mb-10 lg:mb-14"
          >
            <div className="inline-flex items-center justify-center gap-2 text-[#3b7a24] font-display font-bold mb-3 uppercase tracking-wider text-xs">
              <span className="w-6 sm:w-8 h-[2px] bg-[#3b7a24]" />
              Why Choose SPECT LAB
              <span className="w-6 sm:w-8 h-[2px] bg-[#3b7a24]" />
            </div>
            <h2 className="font-display font-extrabold text-[#0e1a6b] text-3xl md:text-4xl leading-tight mb-4">
              Why Patients & Physicians Trust Us
            </h2>
          </motion.div>

          <motion.div 
            variants={containerVariants}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-100px" }}
            className="grid md:grid-cols-2 lg:grid-cols-4 gap-6"
          >
            {[
              { icon: Microscope, title: 'Advanced Imaging', desc: 'Utilizing modern PET-CT and SPECT-CT systems for accurate diagnostic results.' },
              { icon: Users, title: 'Expert Team', desc: 'Experienced nuclear medicine physicians and technologists dedicated to clinical excellence.' },
              { icon: Heart, title: 'Patient-Centered', desc: 'Ensuring comfort, safety, and personalized attention throughout every diagnostic process.' },
              { icon: ShieldCheck, title: 'Trusted Excellence', desc: 'Providing dependable imaging services that support early disease detection and treatment.' }
            ].map((item, idx) => (
              <motion.div 
                key={idx} 
                variants={itemVariants}
                className="bg-white rounded-3xl p-6 lg:p-8 border border-gray-100 shadow-lg shadow-navy/[0.03] flex flex-col items-center text-center gap-5 hover:-translate-y-1.5 hover:shadow-xl hover:shadow-[#3b7a24]/10 hover:border-[#3b7a24]/20 transition-all duration-300 group"
              >
                <div className="w-16 h-16 rounded-2xl bg-[#f3f9f1] text-[#3b7a24] group-hover:bg-[#3b7a24] group-hover:text-white transition-colors duration-300 flex items-center justify-center shrink-0">
                  <item.icon className="w-7 h-7" strokeWidth={1.5} />
                </div>
                <div>
                  <h4 className="font-display font-bold text-[#0e1a6b] text-[19px] mb-3">{item.title}</h4>
                  <p className="text-[#0e1a6b]/70 leading-relaxed text-[14px]">{item.desc}</p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>



      {/* <Stats /> */}

      {/* Values */}
      {/* <section className="py-24 bg-white">
        <div className="max-w-[1400px] mx-auto px-4 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-14">
            <div className="inline-flex items-center gap-2 text-mint font-display font-semibold mb-4">
              <span className="w-10 h-px bg-mint" />Our Core Values<span className="w-10 h-px bg-mint" />
            </div>
            <h2 className="font-display font-extrabold text-navy text-4xl lg:text-[52px] leading-[1.08]">
              The principles guiding every decision we make
            </h2>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {values.map(({ icon: Icon, title, desc }) => (
              <div key={title} className="group bg-[#f3f1fb] hover:bg-navy rounded-3xl p-8 transition-colors duration-500">
                <div className="w-14 h-14 rounded-2xl bg-mint/15 text-mint group-hover:bg-mint group-hover:text-white flex items-center justify-center mb-5 transition-colors">
                  <Icon className="w-7 h-7" strokeWidth={1.8} />
                </div>
                <h3 className="font-display font-bold text-navy group-hover:text-white text-xl mb-3 transition-colors">{title}</h3>
                <p className="text-navy/70 group-hover:text-white/70 leading-relaxed transition-colors">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section> */}

      {/* Timeline */}
      {/* <section className="py-24 bg-[#f3f1fb]">
        <div className="max-w-[1100px] mx-auto px-4 lg:px-8">
          <div className="text-center mb-14">
            <div className="inline-flex items-center gap-2 text-mint font-display font-semibold mb-4">
              <span className="w-10 h-px bg-mint" />Our Journey<span className="w-10 h-px bg-mint" />
            </div>
            <h2 className="font-display font-extrabold text-navy text-4xl lg:text-[52px] leading-[1.08]">
              17 years of growing with our communities
            </h2>
          </div>
          <div className="relative">
            <div className="absolute left-1/2 top-0 bottom-0 w-px bg-navy/15 hidden md:block" />
            <div className="space-y-10">
              {timeline.map((t, i) => (
                <div key={t.year} className={`md:grid md:grid-cols-2 md:gap-12 items-center ${i % 2 === 1 ? 'md:[&>*:first-child]:order-2' : ''}`}>
                  <div className={`md:text-right ${i % 2 === 1 ? 'md:text-left' : ''}`}>
                    <div className="font-display font-extrabold text-mint text-5xl mb-2">{t.year}</div>
                    <h4 className="font-display font-bold text-navy text-2xl mb-2">{t.title}</h4>
                    <p className="text-navy/70 max-w-md md:ml-auto">{t.desc}</p>
                  </div>
                  <div className="relative hidden md:block">
                    <span className="absolute -left-2 top-1/2 -translate-y-1/2 w-4 h-4 rounded-full bg-mint border-4 border-white" />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section> */}

      {/* <WhyChoose /> */}
      {/* <PartnersStrip /> */}
      <AppointmentCTA />
      {/* <Testimonials />  */}
    </>
  );
}
