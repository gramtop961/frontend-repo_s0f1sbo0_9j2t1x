import React, { useMemo, useState } from 'react';

const BG_URL = 'https://ik.imagekit.io/1lb1vkk2o/unnamed.png?updatedAt=1758405338521';

export default function AppointmentWizard() {
  const [step, setStep] = useState(1);
  const [form, setForm] = useState({
    name: '',
    age: '',
    phone: '',
    symptoms: '',
    suggestion: '',
    date: '',
    time: '',
    prescription: null,
    prescriptionPreview: '',
  });

  const suggestions = useMemo(() => {
    const age = Number(form.age || 0);
    if (!age) return [];
    if (age < 18) return ['Pediatrics', 'General Medicine'];
    if (age > 60) return ['Geriatrics', 'Cardiology', 'General Medicine'];
    return ['General Medicine', 'Orthopedics', 'Dermatology'];
  }, [form.age]);

  const upcomingDays = useMemo(() => {
    const days = [];
    const now = new Date();
    for (let i = 0; i < 7; i++) {
      const d = new Date(now);
      d.setDate(now.getDate() + i);
      days.push({
        key: d.toISOString().slice(0, 10),
        label: d.toLocaleDateString(undefined, { weekday: 'short', month: 'short', day: 'numeric' }),
      });
    }
    return days;
  }, []);

  const timeSlots = useMemo(() => {
    // 30-minute slots from 9:00 to 17:00
    const slots = [];
    for (let h = 9; h <= 16; h++) {
      slots.push(`${String(h).padStart(2, '0')}:00`);
      slots.push(`${String(h).padStart(2, '0')}:30`);
    }
    slots.push('17:00');
    return slots;
  }, []);

  const canNext = () => {
    if (step === 1) return form.name && form.age && form.phone;
    if (step === 2) return form.symptoms.length > 3;
    if (step === 3) return form.suggestion;
    if (step === 4) return form.date && form.time;
    return true;
  };

  const onFile = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => {
      setForm((f) => ({ ...f, prescription: file, prescriptionPreview: String(reader.result) }));
    };
    reader.readAsDataURL(file);
  };

  const reset = () => {
    setForm({ name: '', age: '', phone: '', symptoms: '', suggestion: '', date: '', time: '', prescription: null, prescriptionPreview: '' });
    setStep(1);
  };

  return (
    <section id="book" className="relative">
      <div
        className="absolute inset-0 opacity-10 bg-cover bg-center"
        style={{ backgroundImage: `url(${BG_URL})` }}
      />
      <div className="relative max-w-5xl mx-auto px-4 md:px-8 py-12">
        <h2 className="text-2xl md:text-3xl font-semibold text-slate-800">Book an Appointment</h2>
        <p className="text-slate-600 mt-1">Multi-step flow: Patient info → Symptoms → Doctor suggestion → Date & time → Confirmation</p>

        <div className="mt-6 bg-white rounded-xl shadow-sm border border-slate-100">
          <Progress step={step} />
          <div className="p-5 md:p-6">
            {step === 1 && (
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <Input label="Full Name" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} />
                <Input label="Age" type="number" value={form.age} onChange={(e) => setForm({ ...form, age: e.target.value })} />
                <Input label="Phone" value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} />
                <div className="md:col-span-3">
                  <label className="block text-sm font-medium text-slate-700 mb-1">Upload Prescription (optional)</label>
                  <input type="file" accept="image/*" onChange={onFile} className="block w-full text-sm file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-[#1E88E5]/10 file:text-[#1E88E5] hover:file:bg-[#1E88E5]/20" />
                  {form.prescriptionPreview && (
                    <img src={form.prescriptionPreview} alt="Prescription preview" className="mt-3 w-40 h-40 object-cover rounded-lg border" />
                  )}
                </div>
              </div>
            )}

            {step === 2 && (
              <div>
                <label className="block text-sm font-medium text-slate-700">Describe your symptoms</label>
                <textarea
                  className="mt-2 w-full rounded-lg border-slate-200 focus:ring-2 focus:ring-[#1E88E5] focus:outline-none"
                  rows={5}
                  value={form.symptoms}
                  onChange={(e) => setForm({ ...form, symptoms: e.target.value })}
                  placeholder="e.g., fever for 2 days, sore throat"
                />
              </div>
            )}

            {step === 3 && (
              <div>
                <p className="text-slate-700">Suggested departments based on age:</p>
                <div className="mt-3 flex flex-wrap gap-2">
                  {suggestions.map((s) => (
                    <button
                      key={s}
                      onClick={() => setForm({ ...form, suggestion: s })}
                      className={`px-4 py-2 rounded-full border transition ${
                        form.suggestion === s ? 'bg-[#1E88E5] text-white border-[#1E88E5]' : 'bg-white text-slate-700 border-slate-200 hover:border-[#1E88E5]'
                      }`}
                    >
                      {s}
                    </button>
                  ))}
                </div>
                {!form.age && (
                  <p className="text-xs text-amber-600 mt-3">Enter age in Step 1 to see tailored suggestions (Pediatrics if under 18).</p>
                )}
              </div>
            )}

            {step === 4 && (
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="md:col-span-1">
                  <p className="text-sm font-medium text-slate-700 mb-2">Choose a date</p>
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                    {upcomingDays.map((d) => (
                      <button
                        key={d.key}
                        onClick={() => setForm({ ...form, date: d.key })}
                        className={`px-3 py-2 rounded-lg border text-sm ${form.date === d.key ? 'bg-[#1E88E5] text-white border-[#1E88E5]' : 'bg-white border-slate-200 hover:border-[#1E88E5]'}`}
                      >
                        {d.label}
                      </button>
                    ))}
                  </div>
                </div>
                <div className="md:col-span-2">
                  <p className="text-sm font-medium text-slate-700 mb-2">Available 30-minute slots</p>
                  <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-2">
                    {timeSlots.map((t) => (
                      <button
                        key={t}
                        onClick={() => setForm({ ...form, time: t })}
                        className={`px-3 py-2 rounded-lg border text-sm ${form.time === t ? 'bg-[#1E88E5] text-white border-[#1E88E5]' : 'bg-white border-slate-200 hover:border-[#1E88E5]'}`}
                      >
                        {t}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {step === 5 && (
              <div className="bg-[#F4F6F9] rounded-lg p-4 border border-slate-200">
                <h4 className="font-semibold text-slate-800">Confirmation</h4>
                <ul className="mt-2 text-slate-700 text-sm space-y-1">
                  <li><strong>Name:</strong> {form.name}</li>
                  <li><strong>Age:</strong> {form.age}</li>
                  <li><strong>Phone:</strong> {form.phone}</li>
                  <li><strong>Symptoms:</strong> {form.symptoms}</li>
                  <li><strong>Suggested Dept:</strong> {form.suggestion}</li>
                  <li><strong>Date:</strong> {form.date}</li>
                  <li><strong>Time:</strong> {form.time}</li>
                </ul>
                {form.prescriptionPreview && (
                  <div className="mt-3">
                    <p className="text-sm text-slate-700">Attached prescription:</p>
                    <img src={form.prescriptionPreview} alt="Prescription" className="mt-2 w-40 h-40 object-cover rounded" />
                  </div>
                )}
                <div className="mt-4 flex gap-3">
                  <button onClick={reset} className="px-4 py-2 rounded-lg bg-white border border-slate-200 text-slate-700">Book Another</button>
                  <a href="#payments" className="px-4 py-2 rounded-lg bg-[#1E88E5] text-white">Proceed to Payment</a>
                </div>
              </div>
            )}
          </div>

          <div className="flex items-center justify-between px-5 md:px-6 pb-5">
            <p className="text-xs text-slate-500">Step {step} of 5</p>
            <div className="flex gap-2">
              {step > 1 && (
                <button onClick={() => setStep((s) => s - 1)} className="px-4 py-2 rounded-lg border border-slate-200 bg-white text-slate-700">Back</button>
              )}
              {step < 5 && (
                <button
                  onClick={() => canNext() && setStep((s) => s + 1)}
                  disabled={!canNext()}
                  className={`px-4 py-2 rounded-lg text-white ${canNext() ? 'bg-[#1E88E5] hover:bg-[#166fbd]' : 'bg-slate-300 cursor-not-allowed'}`}
                >
                  Next
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function Input({ label, ...props }) {
  return (
    <div>
      <label className="block text-sm font-medium text-slate-700">{label}</label>
      <input
        className="mt-1 w-full rounded-lg border-slate-200 focus:ring-2 focus:ring-[#1E88E5] focus:outline-none"
        {...props}
      />
    </div>
  );
}

function Progress({ step }) {
  return (
    <div className="px-5 md:px-6 pt-5">
      <div className="flex items-center gap-2 text-xs text-slate-600">
        {['Patient', 'Symptoms', 'Suggest', 'Schedule', 'Confirm'].map((label, i) => {
          const idx = i + 1;
          const active = step >= idx;
          return (
            <div key={label} className="flex items-center gap-2">
              <div className={`w-7 h-7 grid place-items-center rounded-full border ${active ? 'bg-[#1E88E5] text-white border-[#1E88E5]' : 'bg-white text-slate-600 border-slate-300'}`}>{idx}</div>
              <span className={`${active ? 'text-slate-800' : ''}`}>{label}</span>
              {i < 4 && <div className={`w-8 sm:w-16 h-px ${active ? 'bg-[#1E88E5]' : 'bg-slate-300'}`} />}
            </div>
          );
        })}
      </div>
    </div>
  );
}
