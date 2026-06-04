import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { CalendarDays, Download, Eye, Search, Mail, ChevronRight } from 'lucide-react';
import PageHeader from '../components/PageHeader';
import { gsap } from 'gsap';

// Newsletter data matching the user's design structure
const allNewsletters = [
  {
    id: 1,
    title: 'Scintillations',
    volume: 'V',
    issue: 'I',
    date: 'Jan - March 2015',
    year: '2015',
    image: '/newsletter.jpg',
    description: 'Latest updates on PET-CT advancements, clinical cases, research highlights and news from SpectLab Nuclear Medicine Services.',
    pdf: '/pdf/Volume V Issue I Jan - March 2015.pdf',
    size: '5.8 MB',
    isLatest: true
  },
  { id: 2, title: 'Scintillations', volume: '', issue: '', date: 'Jan - Feb 2009', year: '2009', image: '/newsletter.jpg', pdf: '/pdf/Jan - Feb 2009.pdf' },
  { id: 3, title: 'Scintillations', volume: '', issue: '', date: 'January - March 2010', year: '2010', image: '/newsletter.jpg', pdf: '/pdf/January - March 2010.pdf' },
  { id: 4, title: 'Scintillations', volume: '', issue: '', date: 'July - Aug 2008', year: '2008', image: '/newsletter.jpg', pdf: '/pdf/July - Aug 2008.pdf' },
  { id: 5, title: 'Scintillations', volume: '', issue: '', date: 'July - Aug 2009', year: '2009', image: '/newsletter.jpg', pdf: '/pdf/July - Aug 2009.pdf' },
  { id: 6, title: 'Scintillations', volume: '', issue: '', date: 'Scintillations', year: '', image: '/newsletter.jpg', pdf: '/pdf/scintillations.pdf' },
  { id: 7, title: 'Scintillations', volume: '', issue: '', date: 'scintillations Jan 2010', year: '2010', image: '/newsletter.jpg', pdf: '/pdf/scintillations Jan 2010.pdf' },
  { id: 8, title: 'Scintillations', volume: '', issue: '', date: 'scintillations vol i issue 2', year: '', image: '/newsletter.jpg', pdf: '/pdf/scintillations vol i issue 2.pdf' },
];

export default function NewsLetterPage() {
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    window.scrollTo(0, 0);
    const ctx = gsap.context(() => {
      gsap.from('.fade-up', {
        y: 30,
        opacity: 0,
        duration: 0.8,
        stagger: 0.1,
        ease: 'power3.out'
      });
    });
    return () => ctx.revert();
  }, []);

  const latest = allNewsletters.find(n => n.isLatest) || allNewsletters[0];

  // Filter logic for archive
  const archiveNewsletters = allNewsletters.filter(n => !n.isLatest).filter(n => {
    return n.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      n.date.toLowerCase().includes(searchQuery.toLowerCase());
  });

  return (
    <>
      <PageHeader
        title="Newsletter Library"
        subtitle="Stay Informed"
        breadcrumbs={[{ label: 'Newsletter' }]}
        image="/Images/newsletterHero.jpg"
      />

      <div className="bg-[#f8faf9] min-h-screen pt-8 pb-16 lg:pt-10 lg:pb-24 relative overflow-hidden">
        {/* Background Graphic */}
        <div className="absolute top-20 right-0 w-[600px] h-[600px] bg-gradient-to-br from-[#3b7a24]/10 to-transparent rounded-full blur-3xl -mr-40 pointer-events-none" />

        <div className="max-w-[1400px] mx-auto px-4 lg:px-8 relative z-10">

          {/* Header Section */}
          <div className="mb-10 fade-up text-center max-w-3xl mx-auto">
            <div className="inline-flex items-center justify-center gap-2 text-[#3b7a24] font-display font-semibold mb-4">
              <span className="w-10 h-px bg-[#3b7a24]" />
              STAY INFORMED
              <span className="w-10 h-px bg-[#3b7a24]" />
            </div>
            <h2 className="font-display font-extrabold text-navy text-4xl md:text-5xl mb-6">
              Newsletter Library
            </h2>
            <p className="text-navy/70 text-lg leading-relaxed mx-auto max-w-xl">
              Explore our monthly newsletters featuring the latest developments, research highlights, clinical updates and news from SpectLab.
            </p>
          </div>

          {/* Latest Edition Card */}
          <div className="mt-6 bg-white rounded-3xl shadow-xl shadow-navy/5 border border-slate-100 p-5 lg:p-8 flex flex-col lg:flex-row gap-8 lg:gap-12 mb-12 fade-up lg:w-11/12 xl:w-11/12 mx-auto relative z-10">
            <div className="lg:w-5/12 rounded-2xl overflow-hidden bg-[#243388] shadow-inner shrink-0">
              <img src={latest.image} alt="Latest Newsletter" className="w-full h-full object-cover" />
            </div>

            <div className="flex-1 flex flex-col justify-center py-4 lg:pr-6">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-[#eaf4e7] text-[#3b7a24] text-xs font-bold w-fit mb-5 uppercase tracking-wide">
                <CalendarDays className="w-3.5 h-3.5" /> LATEST ISSUE
              </div>

              <h2 className="font-display font-extrabold text-navy text-4xl mb-3">{latest.title}</h2>
              <p className="text-[#3b7a24] font-bold text-sm mb-6">
                {latest.date} {latest.volume && latest.issue && `| Volume ${latest.volume} • Issue ${latest.issue}`}
              </p>

              <p className="text-navy/70 leading-relaxed mb-8 max-w-md">
                {latest.description}
              </p>

              <div className="flex flex-col sm:flex-row items-center gap-4 mb-3">

                <a
                  href={process.env.PUBLIC_URL + latest.pdf}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full sm:w-auto flex items-center justify-center gap-2 bg-[#3b7a24] text-white font-bold py-3 px-8 rounded-lg border-2 border-[#3b7a24] hover:bg-white hover:text-navy transition-colors"
                >
                  <Eye className="w-5 h-5" /> Read more
                </a>
              </div>

            </div>
          </div>

          {/* Archive Section */}
          <div className="fade-up">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 border-b border-slate-200 pb-5 mb-8">
              <h2 className="font-display font-extrabold text-navy text-2xl mb-0">
                Newsletter Archive
              </h2>

              <div className="relative w-full md:w-auto">
                <Search className="w-4 h-4 absolute left-4 top-1/2 -translate-y-1/2 text-navy/40" />
                <input
                  type="text"
                  placeholder="Search newsletters..."
                  className="w-full md:w-80 pl-11 pr-4 py-2.5 rounded-lg border border-slate-200 outline-none focus:border-[#3b7a24] focus:ring-1 focus:ring-[#3b7a24] text-sm bg-white"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-x-6 lg:gap-x-8 gap-y-6 lg:gap-y-8 mb-24">
              {archiveNewsletters.map((n) => (
                <div key={n.id} className="bg-white rounded-2xl border border-slate-100 shadow-sm hover:shadow-md transition-all duration-300 flex overflow-hidden group min-h-[160px] h-full">
                  {/* Image side */}
                  <div className="w-1/3 sm:w-2/5 shrink-0 relative overflow-hidden bg-[#243388]">
                    <img src={n.image} alt={n.title} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
                    <div className="absolute inset-0 bg-gradient-to-r from-navy/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  </div>

                  {/* Content side */}
                  <div className="flex-1 p-4 sm:p-5 flex flex-col justify-between">
                    <div>
                      {/* Title and Badge row */}
                      <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-2 mb-2">
                        <h3 className="font-display font-bold text-navy text-base sm:text-lg leading-tight line-clamp-1">{n.title}</h3>
                        <span className="text-[#3b7a24] text-[10px] sm:text-[11px] font-bold uppercase tracking-wider bg-[#f3f9f1] px-2 py-1 rounded shrink-0 w-fit">
                          {n.date}
                        </span>
                      </div>

                      <p className="text-navy/60 text-xs leading-relaxed line-clamp-2 sm:line-clamp-3 mb-4 mt-2">
                        {n.volume && n.issue ? `Volume ${n.volume} • Issue ${n.issue}. ` : ''}
                        Explore our latest updates and articles in this edition.
                      </p>
                    </div>

                    {/* Links at bottom */}
                    <div className="flex items-center gap-4 mt-auto">
                      <a
                        href={process.env.PUBLIC_URL + n.pdf}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 text-[#3b7a24] hover:text-[#2d661b] font-semibold text-xs sm:text-sm transition-colors"
                      >
                        <Eye className="w-4 h-4" />
                        Read PDF
                      </a>
                      <a
                        href={process.env.PUBLIC_URL + n.pdf}
                        download
                        className="inline-flex items-center gap-1 text-navy/40 hover:text-[#3b7a24] font-semibold text-sm transition-colors"
                        title="Download PDF"
                      >
                        <Download className="w-4 h-4" />
                      </a>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Subscribe Banner */}
            <div className="bg-[#f3f9f1] border border-[#d3ecd0] rounded-2xl p-6 flex flex-col md:flex-row items-center justify-between gap-6 fade-up">
              <div className="flex items-center gap-5">
                <div className="w-14 h-14 bg-[#3b7a24] text-white rounded-full flex items-center justify-center shrink-0 shadow-lg shadow-[#3b7a24]/30">
                  <Mail className="w-6 h-6" />
                </div>
                <div>
                  <h4 className="font-display font-bold text-navy text-lg mb-1">Never miss an update!</h4>
                  <p className="text-navy/70 text-sm">Subscribe to our newsletter and get the latest editions delivered to your inbox.</p>
                </div>
              </div>
              <Link to="/contact" className="whitespace-nowrap flex items-center gap-2 bg-[#3b7a24] text-white border-2 border-[#3b7a24] hover:bg-white hover:text-navy font-bold py-2.5 px-6 rounded-lg transition-all shadow-sm">
                Subscribe Now <ChevronRight className="w-4 h-4" />
              </Link>
            </div>

          </div>
        </div>
      </div>
    </>
  );
}
