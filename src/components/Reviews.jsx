import React from 'react';
import { motion } from 'framer-motion';

export default function Reviews() {
  return (
    <section className="pt-8 sm:pt-9 pb-11 sm:pb-12 lg:pb-16 overflow-hidden relative bg-[#f8f7fd]">
      <div className="max-w-[1450px] mx-auto px-4 sm:px-6 lg:px-8">

        {/* ── Centred header ── */}
        <motion.div
          initial={{ opacity: 0, y: 22 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.65 }}
          className="text-center mb-6 sm:mb-8 lg:mb-10"
        >
          {/* Label */}
          <div className="inline-flex items-center gap-2 text-[#3b7a24] font-display font-semibold mb-3 text-xs uppercase tracking-wider">
            <span className="w-6 sm:w-8 h-[2px] bg-[#3b7a24]" />
            Patient Voices
            <span className="w-6 sm:w-8 h-[2px] bg-[#3b7a24]" />
          </div>

          {/* Headline */}
          <h2 className="font-display font-extrabold text-[#0e1a6b] text-3xl md:text-4xl leading-tight mb-3">
            Trusted by Hundreds of Patients
          </h2>
          <p className="text-[#0e1a6b]/80 text-[15px] md:text-[16px] max-w-lg mx-auto leading-relaxed">
            Real words from real patients every review is verified directly on Google.
          </p>
          {/* ── Stats ribbon — responsive ── */}
          <motion.div
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.55, delay: 0.18 }}
            className="flex w-full max-w-[820px] mx-auto mt-6 rounded-2xl overflow-hidden"
            style={{
              border: '1.5px solid rgba(14,26,107,0.10)',
              boxShadow: '0 6px 30px rgba(14,26,107,0.08)',
              background: '#fff',
            }}
          >
            {/* Stat 1 — Rating */}
            <div className="flex-1 flex items-center justify-center gap-3 px-8 py-5 sm:py-6 border-r border-[#0e1a6b]/08">
              <span className="font-display font-extrabold text-[#0e1a6b] text-[30px] sm:text-[32px] leading-none">4.9</span>
              <div className="flex flex-col gap-1">
                <div className="flex gap-0.5">
                  {[...Array(5)].map((_, i) => (
                    <svg key={i} className="w-4 h-4 text-[#f59e0b]" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 00-.182.557l1.285 5.385a.562.562 0 01-.84.61l-4.725-2.885a.563.563 0 00-.586 0L6.982 20.54a.562.562 0 01-.84-.61l1.285-5.386a.562.562 0 00-.182-.557l-4.204-3.602a.563.563 0 01.321-.988l5.518-.442a.563.563 0 00.475-.345L11.48 3.5z" />
                    </svg>
                  ))}
                </div>
                <span className="text-[#0e1a6b]/50 text-[11px] font-display font-semibold leading-none tracking-wide">Rating</span>
              </div>
            </div>

            {/* Stat 2 — Recommend */}
            <div className="flex-1 flex items-center justify-center gap-2.5 px-8 py-5 sm:py-6 border-r border-[#0e1a6b]/08">
              <span className="font-display font-extrabold text-[#3b7a24] text-[30px] sm:text-[32px] leading-none">100%</span>
              <span className="text-[#0e1a6b]/60 text-[12px] font-display font-semibold leading-snug max-w-[60px]">Would Recommend</span>
            </div>

            {/* Stat 3 — Google Verified */}
            <div className="flex-1 flex items-center justify-center gap-3 px-8 py-5 sm:py-6">
              <svg className="w-7 h-7 shrink-0" viewBox="0 0 24 24">
                <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4" />
                <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
                <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05" />
                <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
              </svg>
              <div className="flex flex-col gap-0.5">
                <span className="font-display font-bold text-[#0e1a6b] text-[14px] leading-none">Google</span>
                <span className="text-[#3b7a24] text-[12px] font-bold leading-none">Verified ✓</span>
              </div>
            </div>
          </motion.div>
        </motion.div>

        {/* ── Reviews Widget ── */}
        <motion.div
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-40px' }}
          transition={{ duration: 0.75, delay: 0.12 }}
          className="mt-10 lg:mt-14 max-w-[1400px] mx-auto"
        >
          {/* Clip container — hides SociableKit watermark footer */}
          <div
            className="w-full overflow-hidden relative h-[450px] sm:h-[550px] lg:h-[700px]"
            style={{ background: 'transparent' }}
          >
            <iframe
              src="https://widgets.sociablekit.com/google-reviews/iframe/25692053"
              frameBorder="0"
              width="100%"
              className="h-[515px] sm:h-[615px] lg:h-[765px]"
              style={{ display: 'block', background: 'transparent' }}
              title="SPECT LAB Google Reviews"
            />
          </div>
        </motion.div>

      </div>
    </section>
  );
}
