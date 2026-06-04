import React, { useState, useEffect } from 'react';
import PageHeader from '../components/PageHeader';
import { ZoomIn, X } from 'lucide-react';
import { gsap } from 'gsap';

const galleryImages = [
  { src: '/Gallery Images/portfolio-1.jpg', alt: 'Gallery Image 1' },
  { src: '/Gallery Images/portfolio-2.jpg', alt: 'Gallery Image 2' },
  { src: '/Gallery Images/portfolio-3.jpg', alt: 'Gallery Image 3' },
  { src: '/Gallery Images/portfolio-4.jpg', alt: 'Gallery Image 4' },
  { src: '/Gallery Images/portfolio-5.jpg', alt: 'Gallery Image 5' },
  { src: '/Gallery Images/portfolio-6.jpg', alt: 'Gallery Image 6' },
  { src: '/Gallery Images/portfolio-7.jpg', alt: 'Gallery Image 7' },
  { src: '/Gallery Images/portfolio-8.jpg', alt: 'Gallery Image 8' },
  { src: '/Gallery Images/portfolio-9.jpg', alt: 'Gallery Image 9' },
  { src: '/Gallery Images/portfolio-10.jpg', alt: 'Gallery Image 10' },
  { src: '/Gallery Images/portfolio-11.jpg', alt: 'Gallery Image 11' },
  { src: '/Gallery Images/portfolio-12.jpg', alt: 'Gallery Image 12' },
  { src: '/Gallery Images/portfolio-13.jpg', alt: 'Gallery Image 13' },
  { src: '/Gallery Images/portfolio-14.jpg', alt: 'Gallery Image 14' }



];

export default function GalleryPage() {
  const [selectedImage, setSelectedImage] = useState(null);

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

  return (
    <>
      <PageHeader
        title="Our Gallery"
        subtitle="Explore Our Facilities and Equipment"
        image="/Images/galleryHero.jpg"
        breadcrumbs={[{ label: 'Gallery' }]}
      />

      <section className="pt-12 pb-24 bg-[#f3f1fb]">
        <div className="max-w-[1400px] mx-auto px-4 lg:px-8">
          <div className="text-center mb-16 fade-up">
            <h4 className="text-[#3b7a24] font-bold tracking-wider text-sm mb-3 uppercase">VISUAL TOUR</h4>
            <h2 className="font-display font-extrabold text-navy text-4xl mb-6">Inside SpectLab</h2>
            <p className="text-navy/70 max-w-2xl mx-auto">
              Get a glimpse of our state-of-the-art facilities, advanced diagnostic equipment, and dedicated patient care environments.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {galleryImages.map((img, index) => (
              <div
                key={index}
                className="fade-up group relative rounded-3xl overflow-hidden aspect-[4/3] bg-white soft-shadow cursor-pointer"
                onClick={() => setSelectedImage(img)}
              >
                <img
                  src={img.src}
                  alt={img.alt}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-navy/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col items-center justify-center">
                  <div className="w-12 h-12 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center text-white mb-3 translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                    <ZoomIn className="w-5 h-5" />
                  </div>
                  <span className="text-white font-display font-bold tracking-wide translate-y-4 group-hover:translate-y-0 transition-transform duration-500 delay-75">
                    Click to Enlarge
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Zoom Modal (Lightbox) */}
      {selectedImage && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md transition-opacity"
          onClick={() => setSelectedImage(null)}
        >
          <button
            className="absolute top-4 right-4 md:top-6 md:right-6 z-[60] text-white/70 hover:text-white hover:scale-110 transition-all duration-300 bg-black/50 p-2 rounded-full"
            onClick={(e) => {
              e.stopPropagation();
              setSelectedImage(null);
            }}
            aria-label="Close modal"
          >
            <X className="w-8 h-8 drop-shadow-md" />
          </button>
          <img
            src={selectedImage.src}
            alt={selectedImage.alt}
            className="max-w-[95vw] max-h-[95vh] w-auto h-auto object-contain drop-shadow-2xl fade-up relative z-50"
            onClick={(e) => e.stopPropagation()}
          />
        </div>
      )}
    </>
  );
}
