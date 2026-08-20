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
      <div className="p-3.5 rounded-2xl bg-[#14161F] border border-zinc-700 text-xs text-zinc-200 space-y-1">
        <div className="font-bold flex items-center gap-1.5 text-white">
          <CheckCircle className="h-4 w-4 text-zinc-300" />
          VIP Consultation Scheduled!
        </div>
        <p className="text-[11px] text-zinc-300">
          Our senior fit specialist will call you at <strong className="text-white font-mono">{phone}</strong> within 30 minutes.
        </p>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="p-4 rounded-2xl bg-[#13151E] border border-zinc-700 space-y-2.5 max-w-sm text-xs shadow-lg text-white"
    >
      <div className="flex items-center space-x-1.5 text-zinc-200 font-bold text-[11px]">
        <Sparkles className="h-3.5 w-3.5 text-zinc-300" />
        <span>Request VIP Footwear Specialist Callback</span>
      </div>

      <div className="space-y-2">
        <div className="relative">
          <User className="h-3.5 w-3.5 text-zinc-500 absolute left-2.5 top-2.5" />
          <input
            type="text"
            required
            placeholder="Your Full Name"
            value={name}
            onChange={e => setName(e.target.value)}
            className="w-full bg-zinc-950 border border-zinc-800 rounded-xl pl-8 pr-2.5 py-1.5 text-xs text-white placeholder:text-zinc-500 focus:outline-none focus:border-zinc-500"
          />
        </div>

        <div className="relative">
          <Phone className="h-3.5 w-3.5 text-zinc-500 absolute left-2.5 top-2.5" />
          <input
            type="tel"
            required
            placeholder="Phone Number (+91 ...)"
            value={phone}
            onChange={e => setPhone(e.target.value)}
            className="w-full bg-zinc-950 border border-zinc-800 rounded-xl pl-8 pr-2.5 py-1.5 text-xs text-white placeholder:text-zinc-500 focus:outline-none focus:border-zinc-500 font-mono"
          />
        </div>

        <div className="relative">
          <Mail className="h-3.5 w-3.5 text-zinc-500 absolute left-2.5 top-2.5" />
          <input
            type="email"
            placeholder="Email Address (Optional)"
            value={email}
            onChange={e => setEmail(e.target.value)}
            className="w-full bg-zinc-950 border border-zinc-800 rounded-xl pl-8 pr-2.5 py-1.5 text-xs text-white placeholder:text-zinc-500 focus:outline-none focus:border-zinc-500"
          />
        </div>
      </div>

      <button
        type="submit"
        className="w-full py-2 rounded-xl bg-gradient-to-b from-zinc-600 to-zinc-700 hover:from-zinc-500 hover:to-zinc-600 text-white border border-zinc-500 font-bold text-xs flex items-center justify-center space-x-1.5 shadow-md transition-all"
      >
        <span>Request 30-Min Callback</span>
        <Send className="h-3 w-3" />
      </button>
    </form>
  );
};
