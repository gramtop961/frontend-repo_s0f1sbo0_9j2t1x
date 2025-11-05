import React from 'react';
import { Calendar, Stethoscope, ShoppingCart, CreditCard } from 'lucide-react';

export default function QuickActions() {
  return (
    <section className="bg-[#F4F6F9] py-10" id="pharmacy">
      <div className="max-w-7xl mx-auto px-4 md:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          <Card
            icon={<Calendar className="w-6 h-6 text-[#1E88E5]" />}
            title="Appointments"
            desc="Multi-step booking with doctor suggestions and real-time slots."
            cta="Book Now"
            href="#book"
          />
          <Card
            icon={<Stethoscope className="w-6 h-6 text-[#1E88E5]" />}
            title="Consultations"
            desc="Prescriptions, tests, and complete medical history."
            cta="Start"
            href="#consult"
          />
          <Card
            icon={<ShoppingCart className="w-6 h-6 text-[#1E88E5]" />}
            title="Pharmacy"
            desc="Browse medicines, add to cart, and checkout online."
            cta="Shop"
            href="#pharmacy"
          />
          <Card
            icon={<CreditCard className="w-6 h-6 text-[#1E88E5]" />}
            title="Payments"
            desc="Card • UPI • PayPal with secure interfaces."
            cta="Pay Bill"
            href="#payments"
          />
        </div>
      </div>
    </section>
  );
}

function Card({ icon, title, desc, cta, href }) {
  return (
    <a
      href={href}
      className="group bg-white rounded-xl p-5 shadow-sm hover:shadow-md transition border border-slate-100 flex flex-col"
    >
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-[#E3F2FD] grid place-items-center">
            {icon}
          </div>
          <h3 className="text-slate-800 font-semibold">{title}</h3>
        </div>
        <span className="text-xs bg-[#1E88E5]/10 text-[#1E88E5] px-2 py-1 rounded-full">Public</span>
      </div>
      <p className="mt-3 text-slate-600 text-sm flex-1">{desc}</p>
      <div className="mt-5">
        <span className="inline-block text-[#1E88E5] group-hover:translate-x-0.5 transition">
          {cta} →
        </span>
      </div>
    </a>
  );
}
