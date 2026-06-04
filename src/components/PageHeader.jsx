import React from 'react';
import { Link } from 'react-router-dom';
import { ChevronRight, Plus } from 'lucide-react';

export default function PageHeader({ title, subtitle, description, image = '/aboutback.jpg', bgPosition = 'center', bgSize = 'cover' }) {
  return (
    <section className="relative pt-32 lg:pt-36 pb-12 lg:pb-16 overflow-hidden bg-[#f3f1fb]">
      <div className="max-w-[1400px] mx-auto px-4 lg:px-8">
        <div className="relative rounded-[28px] overflow-hidden min-h-[400px] bg-white flex flex-col justify-center">
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
            <div className="absolute inset-0 bg-gradient-to-r from-[#0e1a6b]/75 via-[#0e1a6b]/40 to-transparent" />
            <div className="absolute inset-0 bg-black/25" />
          </div>

          <div className="relative z-10 max-w-4xl px-6 sm:px-10 lg:px-16 py-12 lg:py-16 text-left">
            {subtitle && (
              <div className="inline-flex items-center gap-2 text-white/90 font-display font-semibold mb-4 animate-in fade-in slide-in-from-bottom-4 duration-700 fill-mode-both">
                <span className="w-10 h-px bg-white/90" />
                {subtitle}
              </div>
            )}
            <h1 className="font-display font-extrabold text-white text-3xl lg:text-5xl leading-[1.1] mb-6 animate-in fade-in slide-in-from-bottom-6 duration-700 delay-150 fill-mode-both">
              {title}
            </h1>
            {description && (
              <p className="text-white/80 text-lg leading-relaxed animate-in fade-in slide-in-from-bottom-8 duration-700 delay-300 fill-mode-both">
                {description}
              </p>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
