import React, { useRef } from 'react';
import EmergencyBanner from './components/EmergencyBanner';
import HeroSection from './components/HeroSection';
import QuickActions from './components/QuickActions';
import AppointmentWizard from './components/AppointmentWizard';

export default function App() {
  const bookRef = useRef(null);

  const scrollToBooking = () => {
    const el = document.getElementById('book');
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  return (
    <div className="min-h-screen bg-[#F4F6F9]">
      <EmergencyBanner />
      <HeroSection onBook={scrollToBooking} />

      <main className="-mt-10 md:-mt-14 relative z-10">
        <div className="max-w-7xl mx-auto px-4 md:px-8">
          <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-5 md:p-8">
            <h2 className="text-xl md:text-2xl font-semibold text-slate-800">Welcome to Salve Hospital</h2>
            <p className="text-slate-600 mt-2">
              Use the quick actions to access public services or scroll down to book an appointment using our smart, multi-step wizard with age-based doctor suggestions and 30-minute time slots.
            </p>
          </div>
        </div>
      </main>

      <QuickActions />
      <AppointmentWizard ref={bookRef} />

      <footer id="payments" className="bg-white border-t border-slate-200 mt-12">
        <div className="max-w-7xl mx-auto px-4 md:px-8 py-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div>
              <h4 className="font-semibold text-slate-800">Payments</h4>
              <p className="text-slate-600 text-sm mt-2">
                Choose Card, UPI, or PayPal at checkout. Secure and compliant payment flows are integrated in the backend.
              </p>
            </div>
            <div>
              <h4 className="font-semibold text-slate-800">Contact</h4>
              <p className="text-slate-600 text-sm mt-2">Emergency: 1800-SALVE-HELP</p>
              <p className="text-slate-600 text-sm">Outpatient: +91-22-5555-7777</p>
            </div>
            <div>
              <h4 className="font-semibold text-slate-800">Staff Access</h4>
              <p className="text-slate-600 text-sm mt-2">Login with sample credentials: admin/admin123 • asmith/doc123</p>
            </div>
          </div>
          <p className="text-center text-xs text-slate-500 mt-8">© {new Date().getFullYear()} Salve Hospital. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}
