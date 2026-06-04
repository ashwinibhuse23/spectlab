import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import PageHeader from '../components/PageHeader';
import { blogPosts } from '../mock';
import { CalendarDays, Tag, Search, ArrowRight, User } from 'lucide-react';

const categories = ['Cardiology', 'Hematology', 'Pharmacology', 'Dental Care', 'Orthopedics', 'Radiology', 'Ophthalmology', 'General Surgery'];

const recent = blogPosts.slice(0, 4);

export default function BlogPage() {
  const [q, setQ] = useState('');
  const filtered = blogPosts.filter((p) => p.title.toLowerCase().includes(q.toLowerCase()));

  return (
    <>
      <PageHeader title="Health Insights & News" subtitle="From Our Blog" image="/blogback.jpg" breadcrumbs={[{ label: 'Blog' }]} />

      <section className="py-24 bg-[#f3f1fb]">
        <div className="max-w-[1400px] mx-auto px-4 lg:px-8 grid lg:grid-cols-3 gap-10">
          <div className="lg:col-span-2 space-y-8">
            {filtered.map((p) => (
              <article key={p.title} className="group bg-white rounded-3xl overflow-hidden soft-shadow">
                <div className="grid md:grid-cols-5">
                  <div className="md:col-span-2 aspect-[4/3] md:aspect-auto overflow-hidden">
                    <img src={p.image} alt={p.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                  </div>
                  <div className="md:col-span-3 p-7">
                    <div className="flex flex-wrap items-center gap-4 text-xs text-navy/60 mb-3">
                      <span className="inline-flex items-center gap-1"><CalendarDays className="w-3.5 h-3.5" /> {p.date}</span>
                      <span className="inline-flex items-center gap-1"><Tag className="w-3.5 h-3.5" /> {p.category}</span>
                      <span className="inline-flex items-center gap-1"><User className="w-3.5 h-3.5" /> SPECT LAB Team</span>
                    </div>
                    <h2 className="font-display font-extrabold text-navy text-2xl leading-snug mb-3 group-hover:text-[#3b7a24] transition-colors">{p.title}</h2>
                    <p className="text-navy/70 mb-5 leading-relaxed">{p.excerpt}</p>
                    <Link to="/blog" className="inline-flex items-center gap-3 bg-navy hover:bg-navy-deep text-white font-display font-bold pl-5 pr-2 py-2 rounded-full transition-colors">
                      Read more
                      <span className="w-8 h-8 rounded-full bg-[#3b7a24] text-white flex items-center justify-center">
                        <ArrowRight className="w-3.5 h-3.5" />
                      </span>
                    </Link>
                  </div>
                </div>
              </article>
            ))}
          </div>

          <aside className="space-y-8">
            <div className="bg-white rounded-3xl p-6 soft-shadow">
              <h4 className="font-display font-bold text-navy text-lg mb-4">Search</h4>
              <div className="relative">
                <input value={q} onChange={(e) => setQ(e.target.value)} placeholder="Search articles…" className="w-full bg-[#f3f1fb] rounded-full pl-12 pr-5 py-3 outline-none text-sm focus:ring-2 focus:ring-[#3b7a24]/40" />
                <Search className="w-4 h-4 absolute left-5 top-1/2 -translate-y-1/2 text-navy/50" />
              </div>
            </div>

            <div className="bg-white rounded-3xl p-6 soft-shadow">
              <h4 className="font-display font-bold text-navy text-lg mb-5">Recent Posts</h4>
              <ul className="space-y-5">
                {recent.map((p) => (
                  <li key={p.title} className="flex gap-3">
                    <img src={p.image} alt={p.title} className="w-16 h-16 rounded-xl object-cover" />
                    <div>
                      <div className="text-xs text-navy/60 mb-1">{p.date}</div>
                      <Link to="/blog" className="font-display font-bold text-navy text-sm leading-snug line-clamp-2 hover:text-[#3b7a24] transition-colors">{p.title}</Link>
                    </div>
                  </li>
                ))}
              </ul>
            </div>

            <div className="bg-white rounded-3xl p-6 soft-shadow">
              <h4 className="font-display font-bold text-navy text-lg mb-4">Categories</h4>
              <ul className="space-y-2">
                {categories.map((c) => (
                  <li key={c}>
                    <Link to="/blog" className="flex items-center justify-between px-4 py-2.5 rounded-xl bg-[#f3f1fb] hover:bg-navy hover:text-white text-navy font-display font-semibold text-sm transition-colors">
                      {c} <ArrowRight className="w-4 h-4" />
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div className="bg-[#3b7a24] rounded-3xl p-6 text-white">
              <h4 className="font-display font-bold text-lg mb-2">Subscribe to Newsletter</h4>
              <p className="text-white/90 text-sm mb-4">Health tips and clinic updates in your inbox each month.</p>
              <input type="email" placeholder="Your email" className="w-full bg-white/20 border border-white/30 rounded-full px-5 py-3 text-white placeholder:text-white/60 outline-none focus:border-white focus:ring-1 focus:ring-white mb-3 text-sm transition-all" />
              <button className="w-full bg-white hover:bg-white/90 text-[#3b7a24] font-display font-bold py-3 rounded-full transition-colors shadow-md">Subscribe</button>
            </div>
          </aside>
        </div>
      </section>
    </>
  );
}
