import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';

export default function CursorFollower() {
  const dotRef = useRef(null);
  const ringRef = useRef(null);

  useEffect(() => {
    if (window.matchMedia('(pointer: coarse)').matches) return;

    const dot = dotRef.current;
    const ring = ringRef.current;
    if (!dot || !ring) return;

    const xToDot = gsap.quickTo(dot, 'x', { duration: 0.12, ease: 'power3.out' });
    const yToDot = gsap.quickTo(dot, 'y', { duration: 0.12, ease: 'power3.out' });
    const xToRing = gsap.quickTo(ring, 'x', { duration: 0.45, ease: 'power3.out' });
    const yToRing = gsap.quickTo(ring, 'y', { duration: 0.45, ease: 'power3.out' });

    const onMove = (e) => {
      xToDot(e.clientX);
      yToDot(e.clientY);
      xToRing(e.clientX);
      yToRing(e.clientY);
    };

    const grow = () => {
      gsap.to(ring, { scale: 1.7, borderColor: 'rgba(19,196,163,0.9)', duration: 0.3 });
      gsap.to(dot, { scale: 0.4, duration: 0.3 });
    };
    const shrink = () => {
      gsap.to(ring, { scale: 1, borderColor: 'rgba(14,26,107,0.5)', duration: 0.3 });
      gsap.to(dot, { scale: 1, duration: 0.3 });
    };

    window.addEventListener('mousemove', onMove);

    const targets = () => document.querySelectorAll('a, button, [data-cursor-hover]');
    let bound = [];
    const bind = () => {
      bound.forEach(([el]) => {
        el.removeEventListener('mouseenter', grow);
        el.removeEventListener('mouseleave', shrink);
      });
      bound = [];
      targets().forEach((el) => {
        el.addEventListener('mouseenter', grow);
        el.addEventListener('mouseleave', shrink);
        bound.push([el]);
      });
    };
    bind();
    const obs = new MutationObserver(() => bind());
    obs.observe(document.body, { childList: true, subtree: true });

    return () => {
      window.removeEventListener('mousemove', onMove);
      obs.disconnect();
      bound.forEach(([el]) => {
        el.removeEventListener('mouseenter', grow);
        el.removeEventListener('mouseleave', shrink);
      });
    };
  }, []);

  return (
    <>
      <div
        ref={ringRef}
        className="hidden lg:block fixed top-0 left-0 w-9 h-9 rounded-full border-2 pointer-events-none z-[9999]"
        style={{ transform: 'translate(-50%, -50%)', borderColor: 'rgba(14,26,107,0.5)' }}
      />
      <div
        ref={dotRef}
        className="hidden lg:block fixed top-0 left-0 w-2 h-2 rounded-full bg-mint pointer-events-none z-[9999]"
        style={{ transform: 'translate(-50%, -50%)' }}
      />
      <style>{`@media (min-width: 1024px) { body { cursor: none; } a, button, input, textarea, select { cursor: none !important; } }`}</style>
    </>
  );
}
