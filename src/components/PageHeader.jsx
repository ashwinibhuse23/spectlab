import React from 'react';

export default function PageHeader({ 
  title, 
  subtitle, 
  description, 
  image = '/aboutback.jpg', 
  bgPosition = 'center', 
  bgSize = 'cover',
  maxWidth = 'max-w-[1650px]',
  minHeight = 'min-h-[460px] sm:min-h-[520px] lg:min-h-[570px]'
}) {
  return (
    <section className="relative pt-24 sm:pt-28 lg:pt-32 pb-6 sm:pb-8 lg:pb-10 overflow-hidden bg-[#f3f1fb]">
      <div className={`${maxWidth} mx-auto px-3 sm:px-4 lg:px-6`}>
        <div className={`relative rounded-[24px] sm:rounded-[32px] overflow-hidden ${minHeight} bg-white flex flex-col justify-center`}>
          {/* Background Image */}
          <div className="absolute inset-0">
            <div 
              className="absolute inset-0 animate-in zoom-in-105 duration-1000 fill-mode-both ease-out"
              style={{ 
                backgroundImage: `url(${process.env.PUBLIC_URL}${image})`,
                backgroundSize: bgSize,
                backgroundPosition: bgPosition,
                backgroundRepeat: 'no-repeat'
              }}
            />
            {/* Dark Gradient Overlay for Readability */}
            <div className="absolute inset-0 bg-gradient-to-r from-[#0e1a6b]/70 via-[#0e1a6b]/30 to-transparent" />
            <div className="absolute inset-0 bg-black/10" />
          </div>

        <div className="relative z-10 max-w-4xl px-6 sm:px-12 lg:px-20 py-14 sm:py-16 lg:py-20 text-left -translate-y-6">
            {subtitle && (
              <div className="inline-flex items-center gap-2.5 text-white/90 font-display font-semibold mb-3.5 text-sm sm:text-base animate-in fade-in slide-in-from-bottom-4 duration-700 fill-mode-both">
                <span className="w-8 sm:w-12 h-px bg-white/90" />
                {subtitle}
              </div>
            )}
            <h1 className="font-display font-extrabold text-white text-3xl sm:text-4xl md:text-5xl lg:text-6xl leading-[1.12] mb-4 sm:mb-5 animate-in fade-in slide-in-from-bottom-6 duration-700 delay-150 fill-mode-both">
              {title}
            </h1>
            {description && (
              <p className="text-white/90 text-base sm:text-lg md:text-xl leading-relaxed max-w-3xl animate-in fade-in slide-in-from-bottom-8 duration-700 delay-300 fill-mode-both">
                {description}
              </p>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
