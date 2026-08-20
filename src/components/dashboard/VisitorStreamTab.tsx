import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import {
  Users,
  Flame,
  Clock,
  Navigation,
  ShoppingCart,
  Bot,
  CheckCircle,
  Eye,
  Search,
  Filter,
  ArrowRight,
  ShieldAlert,
  Sparkles,
  Smartphone,
  Monitor
} from 'lucide-react';
import { Visitor } from '../../types';

export const VisitorStreamTab: React.FC = () => {
  const { visitors, activeVisitor } = useApp();
  const [selectedVisitorId, setSelectedVisitorId] = useState<string>(activeVisitor.id);
  const [filterLevel, setFilterLevel] = useState<string>('all');

  // Combine live active visitor with historical visitor dataset
  const allVisitors: Visitor[] = [
    activeVisitor,
    ...visitors.filter(v => v.id !== activeVisitor.id)
  ];

  const filteredVisitors = allVisitors.filter(v => {
    if (filterLevel === 'all') return true;
    if (filterLevel === 'hot') return v.intentScore >= 75;
    if (filterLevel === 'high') return v.intentScore >= 51 && v.intentScore < 75;
    if (filterLevel === 'engaged') return !!v.interventionTriggered;
    return true;
  });

  const selectedVisitor = allVisitors.find(v => v.id === selectedVisitorId) || activeVisitor;

  const getIntentBadge = (score: number) => {
    if (score >= 76) {
      return (
        <span className="px-2.5 py-1 rounded-full text-xs font-bold font-mono bg-amber-500/20 text-amber-300 border border-amber-500/40 flex items-center gap-1 shadow-sm">
          <Flame className="h-3.5 w-3.5 text-amber-400 fill-amber-400" />
          {score} pts • Hot
        </span>
      );
    }
    if (score >= 51) {
      return (
        <span className="px-2.5 py-1 rounded-full text-xs font-bold font-mono bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 flex items-center gap-1">
          <Sparkles className="h-3.5 w-3.5 text-cyan-400" />
          {score} pts • High Intent
        </span>
      );
    }
    if (score >= 26) {
      return (
        <span className="px-2.5 py-1 rounded-full text-xs font-semibold font-mono bg-blue-500/20 text-blue-300 border border-blue-500/30">
          {score} pts • Interested
        </span>
      );
    }
    return (
      <span className="px-2.5 py-1 rounded-full text-xs font-medium font-mono bg-slate-800 text-slate-400 border border-slate-700">
        {score} pts • Cold
      </span>
    );
  };

  return (
    <div className="space-y-6 pb-8 animate-fade-in">
      {/* Header with Filter Pills */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl font-bold text-white flex items-center gap-2">
            <Users className="h-5 w-5 text-emerald-400" />
            Visitor Intelligence & Behavioral Stream
          </h1>
          <p className="text-xs text-slate-400 mt-0.5">
            Real-time session telemetry, multi-signal intent scoring, and chronological intervention timeline.
          </p>
        </div>

        <div className="flex items-center space-x-1.5 bg-slate-900/90 p-1 rounded-xl border border-slate-800 self-start">
          {[
            { id: 'all', label: 'All Visitors' },
            { id: 'hot', label: '🔥 Hot (75+)' },
            { id: 'high', label: 'High Intent' },
            { id: 'engaged', label: 'AI Intervened' }
          ].map(f => (
            <button
              key={f.id}
              onClick={() => setFilterLevel(f.id)}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                filterLevel === f.id
                  ? 'bg-slate-800 text-white font-semibold shadow-sm'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              {f.label}
            </button>
          ))}
        </div>
      </div>

      {/* Main Grid: Visitor Directory + Detailed Inspector */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Visitor Cards Column */}
        <div className="lg:col-span-5 space-y-3 max-h-[720px] overflow-y-auto pr-1">
          {filteredVisitors.map(visitor => {
            const isSelected = visitor.id === selectedVisitor.id;
            const isLive = visitor.id === activeVisitor.id;

            return (
              <div
                key={visitor.id}
                onClick={() => setSelectedVisitorId(visitor.id)}
                className={`p-4 rounded-2xl cursor-pointer transition-all border ${
                  isSelected
                    ? 'bg-slate-900 border-emerald-500/50 shadow-lg shadow-emerald-950/30 ring-1 ring-emerald-500/30'
                    : 'bg-slate-950/70 border-slate-800/80 hover:bg-slate-900/60 hover:border-slate-700'
                }`}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    {isLive && (
                      <span className="h-2 w-2 rounded-full bg-emerald-400 animate-ping"></span>
                    )}
                    <span className="text-xs font-mono font-bold text-white">#{visitor.id}</span>
                    {isLive && (
                      <span className="text-[10px] px-1.5 py-0.2 rounded bg-emerald-500/20 text-emerald-400 font-semibold uppercase">
                        Active Simulation
                      </span>
                    )}
                  </div>
                  {getIntentBadge(visitor.intentScore)}
                </div>

                <div className="mt-2.5 text-xs text-slate-300 flex items-center justify-between">
                  <span className="truncate max-w-[200px] text-slate-400">
                    {visitor.currentPage}
                  </span>
                  <span className="text-slate-500 font-mono text-[11px]">
                    {Math.floor(visitor.sessionDurationSec / 60)}m {visitor.sessionDurationSec % 60}s
                  </span>
                </div>

                <div className="mt-2 flex items-center justify-between text-[11px] text-slate-400 pt-2 border-t border-slate-800/60">
                  <span>{visitor.ipLocation}</span>
                  <span className="text-slate-500">{visitor.lastSeen}</span>
                </div>

                {visitor.interventionTriggered && (
                  <div className="mt-2 text-[10px] px-2 py-1 rounded-lg bg-emerald-950/40 border border-emerald-500/20 text-emerald-300 flex items-center space-x-1">
                    <Bot className="h-3 w-3 text-emerald-400 shrink-0" />
                    <span className="truncate">{visitor.interventionTriggered.type}</span>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Selected Visitor Deep Inspector */}
        <div className="lg:col-span-7 p-6 rounded-2xl bg-slate-900/90 border border-slate-800 space-y-6">
          {/* Top Profile Summary */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-slate-800 gap-3">
            <div>
              <div className="flex items-center space-x-2">
                <h2 className="text-lg font-bold text-white font-mono">Visitor #{selectedVisitor.id}</h2>
                {selectedVisitor.isReturning && (
                  <span className="text-[10px] px-2 py-0.5 rounded-full bg-blue-500/20 text-blue-300 border border-blue-500/30">
                    Returning Visitor
                  </span>
                )}
              </div>
              <p className="text-xs text-slate-400 mt-0.5 flex items-center gap-2">
                <span>{selectedVisitor.ipLocation}</span>
                <span>•</span>
                <span>{selectedVisitor.device}</span>
              </p>
            </div>
            {getIntentBadge(selectedVisitor.intentScore)}
          </div>

          {/* Quick Metrics Bar */}
          <div className="grid grid-cols-3 gap-3">
            <div className="p-3 rounded-xl bg-slate-950/70 border border-slate-800 text-center">
              <div className="text-[11px] text-slate-400">Dwell Time</div>
              <div className="text-sm font-bold text-white font-mono mt-0.5">
                {Math.floor(selectedVisitor.sessionDurationSec / 60)}m {selectedVisitor.sessionDurationSec % 60}s
              </div>
            </div>
            <div className="p-3 rounded-xl bg-slate-950/70 border border-slate-800 text-center">
              <div className="text-[11px] text-slate-400">Pages Viewed</div>
              <div className="text-sm font-bold text-white font-mono mt-0.5">
                {selectedVisitor.pagesViewed?.length || 1}
              </div>
            </div>
            <div className="p-3 rounded-xl bg-slate-950/70 border border-slate-800 text-center">
              <div className="text-[11px] text-slate-400">Cart Total</div>
              <div className="text-sm font-bold text-emerald-400 font-mono mt-0.5">
                ₹{selectedVisitor.cart?.reduce((s, i) => s + i.product.price * i.quantity, 0).toLocaleString() || 0}
              </div>
            </div>
          </div>

          {/* Chronological Action Timeline */}
          <div className="space-y-3">
            <h3 className="text-xs font-bold text-slate-300 uppercase tracking-wider">
              Chronological Event Stream ({selectedVisitor.actions.length} events)
            </h3>

            <div className="space-y-2.5 max-h-[380px] overflow-y-auto pr-1">
              {selectedVisitor.actions.map(act => (
                <div
                  key={act.id}
                  className="p-3 rounded-xl bg-slate-950/60 border border-slate-800/80 flex items-start justify-between space-x-3 text-xs"
                >
                  <div className="flex items-start space-x-2.5">
                    <span className="p-1.5 rounded-lg bg-slate-800/80 text-emerald-400 shrink-0 mt-0.5">
                      {act.type === 'page_view' && <Navigation className="h-3.5 w-3.5" />}
                      {act.type === 'product_view' && <Eye className="h-3.5 w-3.5" />}
                      {act.type === 'size_guide_open' && <Flame className="h-3.5 w-3.5 text-amber-400" />}
                      {act.type === 'cart_add' && <ShoppingCart className="h-3.5 w-3.5 text-emerald-400" />}
                      {act.type === 'chat_open' && <Bot className="h-3.5 w-3.5 text-cyan-400" />}
                      {act.type === 'purchase' && <CheckCircle className="h-3.5 w-3.5 text-emerald-400" />}
                      {act.type === 'exit_intent' && <ShieldAlert className="h-3.5 w-3.5 text-rose-400" />}
                    </span>
                    <div>
                      <div className="font-semibold text-slate-200">{act.details}</div>
                      {act.page && <div className="text-[11px] text-slate-500">{act.page}</div>}
                    </div>
                  </div>
                  <span className="text-[10px] text-slate-500 font-mono shrink-0">{act.timestamp}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Intervention Status Banner */}
          {selectedVisitor.interventionTriggered ? (
            <div className="p-4 rounded-xl bg-emerald-950/40 border border-emerald-500/30 flex items-start space-x-3">
              <Bot className="h-5 w-5 text-emerald-400 shrink-0 mt-0.5" />
              <div className="space-y-1 text-xs">
                <div className="font-bold text-emerald-300">
                  Intervention Fired: {selectedVisitor.interventionTriggered.type}
                </div>
                <p className="text-slate-300 italic">"{selectedVisitor.interventionTriggered.message}"</p>
                <div className="text-[10px] text-emerald-400/80 font-medium">
                  Status: {selectedVisitor.interventionTriggered.status.toUpperCase()}
                </div>
              </div>
            </div>
          ) : (
            <div className="p-3 rounded-xl bg-slate-950/40 border border-slate-800 text-xs text-slate-500 text-center">
              Silently observing — trigger conditions not yet met.
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
