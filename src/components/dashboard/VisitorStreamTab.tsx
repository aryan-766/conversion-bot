import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import {
  Flame,
  Globe,
  Smartphone,
  Laptop,
  Clock,
  ShoppingBag,
  ExternalLink,
  Zap,
  Send,
  Filter,
  Download,
  CheckCircle,
  AlertCircle,
  Eye,
  Sliders,
  Sparkles,
  Search,
  ChevronRight,
  Tag
} from 'lucide-react';
import { Visitor, IntentLevel, TriggerActionType } from '../../types';

export const VisitorStreamTab: React.FC = () => {
  const {
    visitors,
    activeVisitor,
    manualPushIntervention,
    campaigns,
    triggers
  } = useApp();

  const [selectedVisitor, setSelectedVisitor] = useState<Visitor>(activeVisitor);
  const [filterLevel, setFilterLevel] = useState<string>('all');
  const [searchTerm, setSearchTerm] = useState<string>('');
  
  // Manual push form state
  const [customMessage, setCustomMessage] = useState<string>("Hey! Need help checking if this fits true-to-size?");
  const [selectedActionType, setSelectedActionType] = useState<TriggerActionType>('chat_callout');
  const [selectedCoupon, setSelectedCoupon] = useState<string>('SAVE10');
  const [pushStatus, setPushStatus] = useState<string | null>(null);

  // Combine live active visitor with historical stream
  const allVisitors = [activeVisitor, ...visitors.filter(v => v.id !== activeVisitor.id)];

  const filteredVisitors = allVisitors.filter(v => {
    if (filterLevel !== 'all' && v.intentLevel.toLowerCase() !== filterLevel.toLowerCase()) {
      return false;
    }
    if (searchTerm) {
      const term = searchTerm.toLowerCase();
      return (
        v.id.toLowerCase().includes(term) ||
        v.ipLocation.toLowerCase().includes(term) ||
        v.device.toLowerCase().includes(term) ||
        v.currentPage.toLowerCase().includes(term)
      );
    }
    return true;
  });

  const handleManualPush = (e: React.FormEvent) => {
    e.preventDefault();
    if (!customMessage.trim()) return;

    manualPushIntervention(
      selectedVisitor.id,
      customMessage.trim(),
      selectedActionType,
      selectedCoupon || undefined
    );

    setPushStatus(`Intervention dispatched to ${selectedVisitor.id}!`);
    setTimeout(() => setPushStatus(null), 3500);
  };

  const handleExportCSV = () => {
    const headers = ['Visitor ID', 'Intent Score', 'Intent Tier', 'Location', 'Device', 'Current Page', 'Cart Total (INR)', 'Intervention Status'];
    const rows = filteredVisitors.map(v => {
      const cartTotal = v.cart.reduce((sum, item) => sum + item.product.price * item.quantity, 0);
      return [
        v.id,
        v.intentScore,
        v.intentLevel,
        `"${v.ipLocation}"`,
        `"${v.device}"`,
        v.currentPage,
        cartTotal,
        v.interventionTriggered ? `"${v.interventionTriggered.status} (${v.interventionTriggered.type})"` : 'None'
      ];
    });

    const csvContent = 'data:text/csv;charset=utf-8,' + [headers.join(','), ...rows.map(e => e.join(','))].join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `convora_visitors_${Date.now()}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="space-y-6 text-white animate-fade-in">
      {/* Header & Controls */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl sm:text-2xl font-extrabold text-white tracking-tight flex items-center gap-2">
            <Flame className="h-6 w-6 text-zinc-300" />
            Visitor Intelligence & Live Intent Stream
          </h1>
          <p className="text-xs text-zinc-400">
            Real-time behavioral telemetry, intent signal decomposition, and manual intervention dispatch.
          </p>
        </div>

        <div className="flex items-center space-x-2">
          <button
            onClick={handleExportCSV}
            className="px-3.5 py-2 rounded-xl bg-zinc-800 hover:bg-zinc-700 text-zinc-200 hover:text-white border border-zinc-700 text-xs font-semibold flex items-center space-x-1.5 transition-colors shadow-sm"
          >
            <Download className="h-3.5 w-3.5" />
            <span>Export CSV</span>
          </button>
        </div>
      </div>

      {pushStatus && (
        <div className="p-3 rounded-2xl bg-emerald-950/80 border border-emerald-700/80 text-emerald-200 text-xs flex items-center space-x-2 animate-slide-up shadow-lg">
          <CheckCircle className="h-4 w-4 text-emerald-400 shrink-0" />
          <span>{pushStatus}</span>
        </div>
      )}

      {/* Main Two-Column Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Column (5 Cols): Real-Time Visitor List with Filters */}
        <div className="lg:col-span-5 space-y-4">
          <div className="p-4 rounded-2xl bg-[#13151E] border border-zinc-800 space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-white uppercase tracking-wider flex items-center gap-1.5">
                <Globe className="h-3.5 w-3.5 text-zinc-400" />
                Active Storefront Sessions ({filteredVisitors.length})
              </span>
              <span className="flex items-center gap-1 text-[11px] text-zinc-300 font-semibold font-mono">
                <span className="h-2 w-2 rounded-full bg-zinc-300 animate-pulse"></span>
                Live Telemetry
              </span>
            </div>

            {/* Search & Tier Filters */}
            <div className="space-y-2">
              <div className="relative">
                <Search className="h-3.5 w-3.5 text-zinc-500 absolute left-3 top-2.5" />
                <input
                  type="text"
                  placeholder="Filter by ID, location, page..."
                  value={searchTerm}
                  onChange={e => setSearchTerm(e.target.value)}
                  className="w-full bg-zinc-950 border border-zinc-800 rounded-xl pl-9 pr-3 py-1.5 text-xs text-white placeholder-zinc-500 focus:outline-none focus:border-zinc-500"
                />
              </div>

              <div className="flex flex-wrap gap-1.5 pt-1">
                {['all', 'hot', 'high_intent', 'interested', 'cold'].map(tier => (
                  <button
                    key={tier}
                    onClick={() => setFilterLevel(tier)}
                    className={`px-2.5 py-1 rounded-lg text-[11px] font-semibold capitalize transition-colors ${
                      filterLevel === tier
                        ? 'bg-gradient-to-b from-zinc-600 to-zinc-700 text-white shadow-sm border border-zinc-500'
                        : 'bg-zinc-950 text-zinc-400 hover:text-white border border-zinc-800'
                    }`}
                  >
                    {tier.replace('_', ' ')}
                  </button>
                ))}
              </div>
            </div>

            {/* List */}
            <div className="space-y-2 max-h-[580px] overflow-y-auto pr-1">
              {filteredVisitors.map(visitor => {
                const isSelected = selectedVisitor.id === visitor.id;
                const isLive = visitor.id === activeVisitor.id;
                const cartTotal = visitor.cart.reduce((sum, item) => sum + item.product.price * item.quantity, 0);

                return (
                  <div
                    key={visitor.id}
                    onClick={() => setSelectedVisitor(visitor)}
                    className={`p-3.5 rounded-2xl border cursor-pointer transition-all ${
                      isSelected
                        ? 'bg-[#181B24] border-zinc-500 ring-1 ring-zinc-500/50 shadow-md'
                        : 'bg-[#10121A] border-zinc-800 hover:border-zinc-700'
                    }`}
                  >
                    <div className="flex items-center justify-between pb-1.5">
                      <div className="flex items-center space-x-2">
                        <span className="font-mono font-bold text-xs text-white flex items-center gap-1.5">
                          {isLive && <span className="h-2 w-2 rounded-full bg-zinc-300 animate-pulse"></span>}
                          {visitor.id}
                        </span>
                        {visitor.isReturning && (
                          <span className="text-[9px] px-1.5 py-0.2 rounded bg-zinc-800 text-zinc-300 border border-zinc-700 uppercase font-bold">
                            Return
                          </span>
                        )}
                      </div>

                      {/* Intent Score Badge */}
                      <span
                        className={`text-[10px] font-mono font-bold px-2 py-0.5 rounded-full border ${
                          visitor.intentScore >= 75
                            ? 'bg-zinc-800 text-zinc-200 border-zinc-600'
                            : visitor.intentScore >= 50
                            ? 'bg-zinc-800 text-zinc-300 border-zinc-700'
                            : 'bg-zinc-900 text-zinc-400 border-zinc-800'
                        }`}
                      >
                        🔥 {visitor.intentScore} pts ({visitor.intentLevel})
                      </span>
                    </div>

                    <div className="text-[11px] text-zinc-400 flex items-center justify-between">
                      <span className="truncate max-w-[170px]">{visitor.ipLocation}</span>
                      <span className="font-mono text-zinc-300">
                        {Math.floor(visitor.sessionDurationSec / 60)}m {visitor.sessionDurationSec % 60}s
                      </span>
                    </div>

                    <div className="text-[11px] text-zinc-500 pt-1 flex items-center justify-between">
                      <span className="truncate max-w-[190px] text-zinc-400 font-mono">{visitor.currentPage}</span>
                      {cartTotal > 0 ? (
                        <span className="font-bold text-zinc-200 font-mono">₹{cartTotal.toLocaleString()}</span>
                      ) : (
                        <span className="text-zinc-600">Cart Empty</span>
                      )}
                    </div>

                    {visitor.interventionTriggered && (
                      <div className="mt-2 pt-1.5 border-t border-zinc-800/80 text-[10px] text-zinc-300 flex items-center justify-between">
                        <span className="truncate max-w-[200px] flex items-center gap-1">
                          <Zap className="h-3 w-3 text-zinc-400" />
                          {visitor.interventionTriggered.type}
                        </span>
                        <span className="capitalize text-zinc-400">{visitor.interventionTriggered.status}</span>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Right Column (7 Cols): Deep Inspector & Manual Push HUD */}
        <div className="lg:col-span-7 space-y-6">
          {/* Selected Visitor Deep Inspector */}
          <div className="p-6 rounded-3xl bg-[#13151E] border border-zinc-800 space-y-5">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b border-zinc-800">
              <div>
                <div className="flex items-center space-x-2">
                  <h2 className="text-base font-bold text-white font-mono">{selectedVisitor.id}</h2>
                  <span className="text-[10px] px-2 py-0.5 rounded-full bg-zinc-800 text-zinc-300 border border-zinc-700 font-semibold uppercase">
                    {selectedVisitor.intentLevel} Intent
                  </span>
                </div>
                <div className="text-xs text-zinc-400">
                  {selectedVisitor.ipLocation} • {selectedVisitor.device}
                </div>
              </div>

              <div className="text-right">
                <div className="text-2xl font-extrabold text-white font-mono">
                  {selectedVisitor.intentScore} <span className="text-xs text-zinc-400">/ 100 pts</span>
                </div>
                <div className="text-[10px] text-zinc-400">Calculated via 7 intent heuristics</div>
              </div>
            </div>

            {/* Multi-Signal Intent Decomposition HUD */}
            <div className="space-y-3">
              <h3 className="text-xs font-bold uppercase tracking-wider text-zinc-300 flex items-center gap-1.5">
                <Sliders className="h-3.5 w-3.5" /> Real-Time Intent Decomposition
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 text-xs">
                {selectedVisitor.signalBreakdown && selectedVisitor.signalBreakdown.length > 0 ? (
                  selectedVisitor.signalBreakdown.map((sig, idx) => (
                    <div key={idx} className="p-2.5 rounded-xl bg-zinc-950 border border-zinc-800 space-y-1">
                      <div className="flex items-center justify-between font-semibold">
                        <span className="text-zinc-200">{sig.name}</span>
                        <span className="font-mono text-zinc-300 font-bold">+{sig.points} pts</span>
                      </div>
                      <p className="text-[10px] text-zinc-400 leading-tight">{sig.reason}</p>
                    </div>
                  ))
                ) : (
                  <div className="p-3 rounded-xl bg-zinc-950 border border-zinc-800 text-zinc-400 text-xs col-span-2">
                    Standard initial browsing session. Intent signals decomposing in real-time.
                  </div>
                )}
              </div>
            </div>

            {/* Chronological Action Timeline */}
            <div className="space-y-3 pt-2">
              <h3 className="text-xs font-bold uppercase tracking-wider text-zinc-300 flex items-center gap-1.5">
                <Clock className="h-3.5 w-3.5" /> Chronological Micro-Actions ({selectedVisitor.actions.length})
              </h3>

              <div className="space-y-2 max-h-48 overflow-y-auto pr-1 text-xs">
                {selectedVisitor.actions.map(act => (
                  <div key={act.id} className="p-2.5 rounded-xl bg-[#171922] border border-zinc-800 flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <span className="h-1.5 w-1.5 rounded-full bg-zinc-400"></span>
                      <span className="text-zinc-200">{act.details}</span>
                    </div>
                    <span className="text-[10px] font-mono text-zinc-500 shrink-0 pl-2">{act.timestamp}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Manual Live Intervention Push Studio */}
            <div className="pt-4 border-t border-zinc-800 space-y-3">
              <div className="flex items-center justify-between">
                <h3 className="text-xs font-bold uppercase tracking-wider text-white flex items-center gap-1.5">
                  <Zap className="h-3.5 w-3.5 text-zinc-300" /> Manual AI Push Intervention
                </h3>
                <span className="text-[10px] text-zinc-400">Targeting {selectedVisitor.id}</span>
              </div>

              <form onSubmit={handleManualPush} className="space-y-3 bg-[#171922] p-4 rounded-2xl border border-zinc-800">
                <div>
                  <label className="block text-[11px] text-zinc-300 font-semibold mb-1">
                    AI Conversational Message / Offer
                  </label>
                  <input
                    type="text"
                    required
                    value={customMessage}
                    onChange={e => setCustomMessage(e.target.value)}
                    placeholder="Enter message to push instantly to visitor..."
                    className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-3 py-2 text-xs text-white placeholder-zinc-500 focus:outline-none focus:border-zinc-500"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                  <div>
                    <label className="block text-[11px] text-zinc-300 font-semibold mb-1">
                      Action Type
                    </label>
                    <select
                      value={selectedActionType}
                      onChange={e => setSelectedActionType(e.target.value as TriggerActionType)}
                      className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-3 py-1.5 text-white"
                    >
                      <option value="chat_callout">AI Chat Callout Bubble</option>
                      <option value="scarcity_drawer">Scarcity Discount Drawer</option>
                      <option value="vip_lead_modal">VIP Lead Modal</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-[11px] text-zinc-300 font-semibold mb-1">
                      Attached Coupon Code
                    </label>
                    <select
                      value={selectedCoupon}
                      onChange={e => setSelectedCoupon(e.target.value)}
                      className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-3 py-1.5 text-white font-mono"
                    >
                      <option value="">None</option>
                      {campaigns.map(c => (
                        <option key={c.id} value={c.code}>
                          {c.code} ({c.discountPercentage}% OFF)
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                <button
                  type="submit"
                  className="w-full py-2.5 rounded-xl bg-gradient-to-b from-zinc-600 to-zinc-700 hover:from-zinc-500 hover:to-zinc-600 text-white border border-zinc-500 font-bold text-xs flex items-center justify-center space-x-1.5 shadow-md transition-transform hover:scale-[1.01]"
                >
                  <Send className="h-3.5 w-3.5" />
                  <span>Send AI Intervention Now</span>
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
