import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { Phone, Mail, User, Send, CheckCircle, Sparkles } from 'lucide-react';

export const LeadCaptureForm: React.FC = () => {
  const { submitLead } = useApp();
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [requirement, setRequirement] = useState('Footwear fit consultation');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !phone) return;

    submitLead({
      name,
      phone,
      email: email || `${name.toLowerCase().replace(/\s+/g, '')}@example.com`,
      requirement
    });
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <div className="p-3.5 rounded-2xl bg-emerald-950/40 border border-emerald-500/30 text-xs text-emerald-300 space-y-1">
        <div className="font-bold flex items-center gap-1.5 text-white">
          <CheckCircle className="h-4 w-4 text-emerald-400" />
          VIP Consultation Scheduled!
        </div>
        <p className="text-[11px] text-slate-300">
          Our senior fit specialist will call you at <strong className="text-emerald-400 font-mono">{phone}</strong> within 30 minutes.
        </p>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="p-4 rounded-2xl bg-slate-900 border border-emerald-500/30 space-y-2.5 max-w-sm text-xs shadow-lg"
    >
      <div className="flex items-center space-x-1.5 text-emerald-400 font-bold text-[11px]">
        <Sparkles className="h-3.5 w-3.5" />
        <span>Request VIP Footwear Specialist Callback</span>
      </div>

      <div className="space-y-2">
        <div className="relative">
          <User className="h-3.5 w-3.5 text-slate-500 absolute left-2.5 top-2.5" />
          <input
            type="text"
            required
            placeholder="Your Full Name"
            value={name}
            onChange={e => setName(e.target.value)}
            className="w-full bg-slate-950 border border-slate-800 rounded-xl pl-8 pr-2.5 py-1.5 text-xs text-white placeholder:text-slate-500 focus:outline-none focus:border-emerald-500"
          />
        </div>

        <div className="relative">
          <Phone className="h-3.5 w-3.5 text-slate-500 absolute left-2.5 top-2.5" />
          <input
            type="tel"
            required
            placeholder="Phone Number (+91 ...)"
            value={phone}
            onChange={e => setPhone(e.target.value)}
            className="w-full bg-slate-950 border border-slate-800 rounded-xl pl-8 pr-2.5 py-1.5 text-xs text-white placeholder:text-slate-500 focus:outline-none focus:border-emerald-500 font-mono"
          />
        </div>

        <div className="relative">
          <Mail className="h-3.5 w-3.5 text-slate-500 absolute left-2.5 top-2.5" />
          <input
            type="email"
            placeholder="Email Address (Optional)"
            value={email}
            onChange={e => setEmail(e.target.value)}
            className="w-full bg-slate-950 border border-slate-800 rounded-xl pl-8 pr-2.5 py-1.5 text-xs text-white placeholder:text-slate-500 focus:outline-none focus:border-emerald-500"
          />
        </div>
      </div>

      <button
        type="submit"
        className="w-full py-2 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs flex items-center justify-center space-x-1.5 shadow-md shadow-emerald-500/20 transition-all"
      >
        <span>Request 30-Min Callback</span>
        <Send className="h-3 w-3" />
      </button>
    </form>
  );
};
