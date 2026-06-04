import React from 'react';
import { blogPosts } from '../mock';
import { ArrowRight, CalendarDays, FileText } from 'lucide-react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

export default function Blog() {
  const featured = blogPosts[1];
  const recent = blogPosts.slice(2, 5);

  return (
    <section id="blog" className="py-10 lg:py-14 bg-[#fafafa]">
      <div className="max-w-[1400px] mx-auto px-4 lg:px-8">
        {/* Header */}
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-5 mb-6 lg:mb-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
            className="max-w-xl"
          >
            <div className="inline-flex items-center gap-2 text-[#3b7a24] font-display font-bold mb-1.5 uppercase tracking-wider text-xs">
              <span className="w-8 h-[2px] bg-[#3b7a24]" />
              Insights & Stories
            </div>
            <h2 className="font-display font-extrabold text-[#0e1a6b] text-2xl lg:text-3xl leading-[1.1]">
              Health Insights & Newsletters
            </h2>
          </motion.div>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-[#0e1a6bbf] max-w-lg text-sm pl-0 lg:pl-6 lg:border-l border-gray-200 leading-relaxed"
          >
            Stay informed with our expert perspectives, research highlights, clinical updates and the latest developments in PET/CT and Nuclear Medicine.
          </motion.p>
        </div>

        {/* Content Grid */}
        <div className="grid lg:grid-cols-[1.15fr_1fr] gap-5">

          {/* Left: Featured Newsletter */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8 }}
            className="relative rounded-2xl overflow-hidden bg-[#0d1a33] flex flex-col justify-center min-h-[360px]"
          >
            {/* Background Image */}
            <div className="absolute inset-0">
              <div className="absolute inset-y-0 right-0 w-full sm:w-[75%]">
                <img src={featured.image} alt="" className="w-full h-full object-cover object-left" />
              </div>
              {/* Gradient overlay */}
              <div className="absolute inset-0 bg-gradient-to-r from-[#0d1a33] via-[#0d1a33] sm:via-[#0d1a33]/80 to-transparent" />
            </div>

            {/* Content */}
            <div className="relative z-10 p-6 lg:p-8 max-w-sm">
              <div className="inline-flex items-center justify-center bg-[#2d5c1f] text-white text-[11px] font-medium px-3 py-1 rounded-full mb-4 shadow-sm">
                Latest Newsletter
              </div>

              <div className="flex items-center gap-2 text-white/80 text-[11px] font-medium mb-2">
                <CalendarDays className="w-3.5 h-3.5" />
                <span>{featured.date}</span>
                <span className="w-1 h-1 rounded-full bg-white/40 mx-1" />
                <span>{featured.category}</span>
              </div>

              <h3 className="font-display font-bold text-white text-xl lg:text-2xl leading-tight mb-3">
                {featured.title}
              </h3>

              <p className="text-white/70 text-[13px] leading-relaxed mb-6 line-clamp-2 pr-2">
                {featured.excerpt}
              </p>

              <div className="flex flex-wrap items-center gap-3">
                <Link to="/newsletter" className="inline-flex items-center gap-1.5 bg-[#3b7a24] hover:bg-[#2d5c1f] text-white text-xs font-bold px-5 py-2.5 rounded-lg transition-colors">
                  Read Newsletter <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>
          </motion.div>

          {/* Right: Recent Newsletters */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8 }}
            className="bg-white rounded-2xl p-5 lg:p-6 shadow-lg shadow-navy/[0.03] border border-gray-100 flex flex-col"
          >
            <div className="flex items-center justify-between mb-5">
              <h3 className="font-display font-extrabold text-[#0e1a6b] text-xl">Recent Newsletters</h3>
              <Link to="/newsletter" className="inline-flex items-center gap-1 text-[#0e1a6b] font-bold text-[12px] hover:text-[#3b7a24] transition-colors">
                View All <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>

            <div className="flex flex-col flex-1 justify-between gap-1">
              {recent.map((p, i) => (
                <div key={p.title} className="group flex gap-4 py-3 border-b border-gray-100 last:border-0 last:pb-0">
                  <div className="w-[72px] h-[72px] rounded-xl overflow-hidden shrink-0 bg-gray-50">
                    <img src={p.image} alt="" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                  </div>

                  <div className="flex flex-1 gap-3">
                    <div className="flex flex-col justify-center flex-1">
                      <div className="flex items-center gap-2 text-navy/50 text-[11px] mb-1 font-medium">
                        <span>{p.date}</span>
                        <span className="w-1 h-1 rounded-full bg-navy/20" />
                        <span className="text-[#0e1a6b] line-clamp-1">{p.category}</span>
                      </div>

                      <h4 className="font-display font-bold text-[#0e1a6b] text-[14px] leading-snug mb-1 group-hover:text-[#3b7a24] transition-colors line-clamp-1">
                        {p.title}
                      </h4>

                      <p className="text-navy/60 text-[12px] line-clamp-1 mb-1.5">
                        {p.excerpt}
                      </p>

                      <div>
                        <Link to="/newsletter" className="inline-flex items-center gap-1 text-[#3b7a24] text-[11px] font-bold group-hover:translate-x-1 transition-transform">
                          Read More <ArrowRight className="w-3 h-3" />
                        </Link>
                      </div>
                    </div>

                    <div className="flex items-center justify-center shrink-0 pr-1">
                      <Link to="/newsletter" className="text-navy/30 hover:text-navy transition-colors">
                        <FileText className="w-4 h-4" strokeWidth={1.5} />
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
