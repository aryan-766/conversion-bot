import React from 'react';
import { useApp } from '../../context/AppContext';
import {
  UserCheck,
  Phone,
  Mail,
  Flame,
  CheckCircle,
  Clock,
  Download,
  Filter,
  MessageSquare,
  Sparkles
} from 'lucide-react';
import { Lead } from '../../types';

export const LeadsTab: React.FC = () => {
  const { leads, setLeads } = useApp();

  const handleStatusChange = (leadId: string, newStatus: Lead['status']) => {
    setLeads(prev =>
      prev.map(l => (l.id === leadId ? { ...l, status: newStatus } : l))
    );
  };

  return (
    <div className="space-y-6 pb-8 animate-fade-in text-white">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl font-bold text-white flex items-center gap-2">
            <UserCheck className="h-5 w-5 text-zinc-300" />
            High-Intent Captured Leads CRM
          </h1>
          <p className="text-xs text-zinc-400 mt-0.5">
            Prospects qualified and captured autonomously during high-friction buying moments or bulk inquiries.
          </p>
        </div>
      </div>

      {/* Leads Directory */}
      <div className="space-y-3">
        {leads.map(lead => (
          <div
            key={lead.id}
            className="p-5 rounded-2xl bg-[#13151E] border border-zinc-800 hover:border-zinc-700 transition-all flex flex-col lg:flex-row lg:items-center justify-between gap-4"
          >
            {/* Left: Contact Info */}
            <div className="space-y-2">
              <div className="flex items-center space-x-3">
                <h3 className="text-sm font-bold text-white">{lead.name}</h3>
                <span className="px-2 py-0.5 rounded-full text-[10px] font-bold font-mono bg-zinc-800 text-zinc-200 border border-zinc-700 flex items-center gap-1">
                  <Flame className="h-3 w-3 text-zinc-300 fill-zinc-300" />
                  Score: {lead.intentScore} ({lead.intentLevel})
                </span>
                <span className="text-[11px] text-zinc-500 font-mono">
                  Visitor #{lead.visitorId}
                </span>
              </div>

              <div className="flex flex-wrap items-center gap-4 text-xs text-zinc-300">
                <span className="flex items-center space-x-1.5 text-zinc-400">
                  <Phone className="h-3.5 w-3.5 text-zinc-300" />
                  <span className="text-zinc-200 font-mono font-medium">{lead.phone}</span>
                </span>
                <span className="flex items-center space-x-1.5 text-zinc-400">
                  <Mail className="h-3.5 w-3.5 text-zinc-300" />
                  <span className="text-zinc-200">{lead.email}</span>
                </span>
                {lead.interestedProduct && (
                  <span className="text-[11px] px-2.5 py-0.5 rounded-full bg-zinc-950 text-zinc-300 border border-zinc-800">
                    Product: <strong className="text-white">{lead.interestedProduct}</strong>
                  </span>
                )}
              </div>

              <div className="p-3 rounded-xl bg-[#0E1017] border border-zinc-800 text-xs text-zinc-300 flex items-start space-x-2">
                <MessageSquare className="h-3.5 w-3.5 text-zinc-500 shrink-0 mt-0.5" />
                <div>
                  <span className="text-zinc-500 font-semibold">Requirement: </span>
                  {lead.requirement}
                </div>
              </div>
            </div>

            {/* Right: Actions & Status */}
            <div className="flex flex-row lg:flex-col items-center lg:items-end justify-between gap-3 shrink-0 pt-3 lg:pt-0 border-t lg:border-t-0 border-zinc-800">
              <span className="text-[11px] text-zinc-500 font-mono flex items-center gap-1">
                <Clock className="h-3 w-3" />
                {lead.createdAt}
              </span>

              <div className="flex items-center space-x-2">
                {(['new', 'contacted', 'converted'] as const).map(st => (
                  <button
                    key={st}
                    onClick={() => handleStatusChange(lead.id, st)}
                    className={`px-2.5 py-1 rounded-lg text-[11px] font-semibold uppercase tracking-wider transition-all ${
                      lead.status === st
                        ? st === 'converted'
                          ? 'bg-gradient-to-b from-zinc-600 to-zinc-700 text-white border border-zinc-500 shadow-md'
                          : st === 'contacted'
                          ? 'bg-zinc-700 text-white border border-zinc-600 shadow-md'
                          : 'bg-zinc-800 text-zinc-200 border border-zinc-700 shadow-md'
                        : 'bg-zinc-900 text-zinc-400 hover:text-zinc-200 border border-zinc-800'
                    }`}
                  >
                    {st}
                  </button>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
