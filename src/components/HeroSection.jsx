import React, { useMemo, useState } from 'react';
import Spline from '@splinetool/react-spline';

export default function HeroSection({ onBook }) {
  const [view, setView] = useState('public');

  // Simple heuristic to demo IP-based routing concept on the frontend
  useMemo(() => {
    const host = window.location.hostname || '';
    if (host.includes('localhost') || host.includes('salvehospital')) {
      setView('staff');
    }
  }, []);

  return (
    <section className="relative w-full" style={{ minHeight: '70vh' }}>
      <div className="absolute inset-0">
        <Spline scene="https://prod.spline.design/2fSS9b44gtYBt4RI/scene.splinecode" style={{ width: '100%', height: '100%' }} />
      </div>

      {/* soft gradient overlay to improve text contrast */}
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-black/40 via-black/30 to-[#F4F6F9]/90" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 md:px-8 pt-16 md:pt-24 pb-12">
        <div className="backdrop-blur-[2px]">
          <span className="inline-block text-xs tracking-wider uppercase bg-white/10 text-white border border-white/20 rounded-full px-3 py-1 mb-4">
            Salve Hospital • Since 1998
          </span>
          <h1 className="text-3xl md:text-5xl font-semibold text-white max-w-3xl leading-tight">
            Modern Healthcare, Human Touch
          </h1>
          <p className="mt-4 text-white/90 max-w-2xl">
            Book appointments, consult doctors, order medicines, and pay bills — securely in one place.
          </p>

          <div className="mt-8 flex flex-wrap gap-3">
            <button
              onClick={onBook}
              className="bg-[#1E88E5] hover:bg-[#166fbd] text-white px-5 py-3 rounded-lg shadow-md transition"
            >
              Book Appointment
            </button>
            <a
              href="#pharmacy"
              className="bg-white/90 hover:bg-white text-[#1E88E5] px-5 py-3 rounded-lg shadow-md transition"
            >
              Online Pharmacy
            </a>
            <a
              href="#payments"
              className="bg-white/90 hover:bg-white text-[#1E88E5] px-5 py-3 rounded-lg shadow-md transition"
            >
              Pay Bill
            </a>
          </div>

          <div className="mt-6 flex items-center gap-3 text-white/90">
            <span className="text-xs uppercase tracking-widest opacity-80">Portal View</span>
            <div className="flex items-center bg-white/10 rounded-full p-1">
              <button
                onClick={() => setView('public')}
                className={`px-3 py-1 rounded-full text-sm ${view === 'public' ? 'bg-white text-[#1E88E5]' : 'text-white/80'}`}
              >
                Public
              </button>
              <button
                onClick={() => setView('staff')}
                className={`px-3 py-1 rounded-full text-sm ${view === 'staff' ? 'bg-white text-[#1E88E5]' : 'text-white/80'}`}
              >
                Staff
              </button>
            </div>
            <span className="text-xs opacity-80">Auto-detects on hospital network</span>
          </div>
        </div>
      </div>
    </section>
  );
}
