import React from 'react';
import { Link } from 'react-router-dom';
import { Home, ArrowRight } from 'lucide-react';

export default function NotFoundPage() {
  return (
    <section className="min-h-screen pt-32 pb-20 bg-[#f3f1fb] flex items-center">
      <div className="max-w-[1400px] mx-auto px-4 lg:px-8 text-center">
        <div className="font-display font-extrabold text-mint text-[160px] lg:text-[220px] leading-none">404</div>
        <h1 className="font-display font-extrabold text-navy text-4xl lg:text-5xl mb-4">Page Not Found</h1>
        <p className="text-navy/70 mb-8 max-w-md mx-auto">The page you’re looking for has moved or doesn’t exist. Let’s get you back to caring for your health.</p>
        <Link to="/" className="group inline-flex items-center gap-3 bg-navy hover:bg-navy-deep text-white font-display font-bold pl-6 pr-2 py-2 rounded-full transition-colors">
          <Home className="w-4 h-4" /> Back to Home
          <span className="w-10 h-10 rounded-full bg-mint text-white flex items-center justify-center group-hover:rotate-45 transition-transform">
            <ArrowRight className="w-4 h-4" />
          </span>
        </Link>
      </div>
    </section>
  );
}
