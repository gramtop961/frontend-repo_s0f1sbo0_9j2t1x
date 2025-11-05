import React from 'react';

export default function EmergencyBanner() {
  return (
    <div className="w-full bg-[#1E88E5] text-white text-sm md:text-base py-2">
      <div className="overflow-hidden whitespace-nowrap">
        <div
          className="inline-block"
          style={{
            animation: 'marquee 18s linear infinite',
          }}
        >
          <span className="mx-6">🚨 24/7 Emergency Helpline: 1800-SALVE-HELP</span>
          <span className="mx-6">🚑 Immediate Care • Trauma • Cardiac • Pediatric</span>
          <span className="mx-6">🏥 Salve Hospital — Compassionate Care, Advanced Medicine</span>
        </div>
      </div>
      <style>{`
        @keyframes marquee {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
      `}</style>
    </div>
  );
}
