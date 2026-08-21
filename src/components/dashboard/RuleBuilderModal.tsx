import React, { useState } from 'react';
import {
  X,
  Zap,
  Sparkles,
  Sliders,
  Tag,
  Clock,
  Flame,
  MessageSquare,
  ShieldCheck,
  CheckCircle,
  Eye,
  Plus,
  Trash2
} from 'lucide-react';
import { TriggerRule, TriggerActionType, Campaign } from '../../types';

interface RuleBuilderModalProps {
  initialRule?: TriggerRule | null;
  campaigns: Campaign[];
  onClose: () => void;
  onSave: (rule: TriggerRule) => void;
}

export const RuleBuilderModal: React.FC<RuleBuilderModalProps> = ({
  initialRule,
  campaigns,
  onClose,
  onSave
}) => {
  const isEditing = !!initialRule;

  const [name, setName] = useState(initialRule?.name || '');
  const [description, setDescription] = useState(initialRule?.description || '');
  const [type, setType] = useState<TriggerActionType>(initialRule?.type || 'chat_callout');
  const [priority, setPriority] = useState<number>(initialRule?.priority || 1);
  const [cooldownMinutes, setCooldownMinutes] = useState<number>(initialRule?.cooldownMinutes || 10);
  const [aiProactiveMessage, setAiProactiveMessage] = useState(
    initialRule?.aiProactiveMessage || "Hey there! Looking for sizing guidance or return details on this model?"
  );
  const [attachedCoupon, setAttachedCoupon] = useState<string>(initialRule?.attachedCoupon || '');
  const [quickReplies, setQuickReplies] = useState<string[]>(
    initialRule?.quickReplies || ['Help with Sizing', 'Return Policy', 'Apply Coupon']
  );
  const [newQuickReply, setNewQuickReply] = useState('');

  // Conditions
  const [minIntentScore, setMinIntentScore] = useState<number>(initialRule?.conditions.minIntentScore ?? 45);
  const [minDwellTimeSec, setMinDwellTimeSec] = useState<number>(initialRule?.conditions.minDwellTimeSec ?? 30);
  const [productViewsCount, setProductViewsCount] = useState<number>(initialRule?.conditions.productViewsCount ?? 1);
  const [sizeGuideOpened, setSizeGuideOpened] = useState<boolean>(initialRule?.conditions.sizeGuideOpened ?? false);
  const [exitIntentDetected, setExitIntentDetected] = useState<boolean>(initialRule?.conditions.exitIntentDetected ?? false);
  const [minCartValue, setMinCartValue] = useState<number>(initialRule?.conditions.minCartValue ?? 0);
  const [targetPageUrlPattern, setTargetPageUrlPattern] = useState<string>(initialRule?.conditions.targetPageUrlPattern ?? '');

  const handleAddQuickReply = () => {
    if (!newQuickReply.trim()) return;
    setQuickReplies(prev => [...prev, newQuickReply.trim()]);
    setNewQuickReply('');
  };

  const handleRemoveQuickReply = (index: number) => {
    setQuickReplies(prev => prev.filter((_, i) => i !== index));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !aiProactiveMessage.trim()) return;

    const ruleToSave: TriggerRule = {
      id: initialRule?.id || `trig-${Date.now()}`,
      name: name.trim(),
      description: description.trim() || `Automated ${type} trigger when behavioral conditions match.`,
      type,
      enabled: initialRule?.enabled ?? true,
      priority,
      cooldownMinutes,
      aiProactiveMessage: aiProactiveMessage.trim(),
      quickReplies: quickReplies.length > 0 ? quickReplies : undefined,
      attachedCoupon: attachedCoupon || undefined,
      conditions: {
        minIntentScore: minIntentScore > 0 ? minIntentScore : undefined,
        minDwellTimeSec: minDwellTimeSec > 0 ? minDwellTimeSec : undefined,
        productViewsCount: productViewsCount > 1 ? productViewsCount : undefined,
        sizeGuideOpened: sizeGuideOpened ? true : undefined,
        exitIntentDetected: exitIntentDetected ? true : undefined,
        minCartValue: minCartValue > 0 ? minCartValue : undefined,
        targetPageUrlPattern: targetPageUrlPattern.trim() || undefined
      },
      performance: initialRule?.performance || {
        shown: 0,
        engaged: 0,
        conversions: 0,
        revenue: 0
      }
    };

    onSave(ruleToSave);
  };

  return (
    <div className="fixed inset-0 bg-black/80 backdrop-blur-md z-50 flex items-center justify-center p-4 animate-fade-in text-white">
      <div className="bg-[#12141C] border border-zinc-700/90 rounded-3xl max-w-3xl w-full max-h-[90vh] flex flex-col justify-between shadow-2xl overflow-hidden animate-slide-up">
        {/* Header */}
        <div className="p-6 border-b border-zinc-800 flex items-center justify-between bg-[#0E1017]">
          <div className="flex items-center space-x-3">
            <div className="h-10 w-10 rounded-2xl bg-gradient-to-b from-zinc-600 via-zinc-700 to-zinc-800 border border-zinc-500/50 flex items-center justify-center text-white font-bold shadow-md">
              <Zap className="h-5 w-5" />
            </div>
            <div>
              <h2 className="text-lg font-bold text-white">
                {isEditing ? 'Edit Trigger & Intervention Rule' : 'Create New Proactive Intervention Rule'}
              </h2>
              <p className="text-xs text-zinc-400">
                Configure behavioral firing criteria, AI messaging payload, dynamic discount, and cooldowns.
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-full bg-zinc-800 text-zinc-400 hover:text-white transition-colors"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        {/* Scrollable Form Body */}
        <form id="rule-form" onSubmit={handleSubmit} className="flex-1 overflow-y-auto p-6 space-y-6 text-xs">
          {/* Section 1: Basic Identity */}
          <div className="space-y-4 p-4 rounded-2xl bg-[#171922] border border-zinc-800">
            <h3 className="text-xs font-bold uppercase tracking-wider text-zinc-300 flex items-center gap-1.5">
              <Sparkles className="h-3.5 w-3.5" /> Rule Identity & Action Type
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-zinc-300 font-semibold mb-1">Rule Name *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Marathon Sizing Hesitation"
                  value={name}
                  onChange={e => setName(e.target.value)}
                  className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-3 py-2.5 text-white placeholder-zinc-500 focus:outline-none focus:border-zinc-500"
                />
              </div>

              <div>
                <label className="block text-zinc-300 font-semibold mb-1">Intervention Action Type *</label>
                <select
                  value={type}
                  onChange={e => setType(e.target.value as TriggerActionType)}
                  className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-3 py-2.5 text-white focus:outline-none focus:border-zinc-500 font-mono"
                >
                  <option value="chat_callout">AI Floating Chat Callout Bubble</option>
                  <option value="scarcity_drawer">Scarcity Cart Discount Drawer</option>
                  <option value="vip_lead_modal">VIP Athlete / Specialist Consultation Modal</option>
                  <option value="whatsapp_recovery">WhatsApp Abandoned Cart Trigger (Omnichannel)</option>
                  <option value="sticky_pill">Sticky Promotion Notification Pill</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block text-zinc-300 font-semibold mb-1">Rule Description</label>
              <input
                type="text"
                placeholder="Explain the intent hypothesis (e.g. Catches visitors stuck on size guide for >30s)"
                value={description}
                onChange={e => setDescription(e.target.value)}
                className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-3 py-2 text-white placeholder-zinc-500 focus:outline-none focus:border-zinc-500"
              />
            </div>
          </div>

          {/* Section 2: Behavioral Conditions */}
          <div className="space-y-4 p-4 rounded-2xl bg-[#171922] border border-zinc-800">
            <h3 className="text-xs font-bold uppercase tracking-wider text-zinc-300 flex items-center gap-1.5">
              <Sliders className="h-3.5 w-3.5" /> Behavioral Trigger Conditions (AND Logic)
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {/* Min Intent Score */}
              <div className="space-y-1">
                <div className="flex justify-between">
                  <span className="text-zinc-300 font-semibold">Min Intent Score:</span>
                  <span className="font-mono font-bold text-zinc-200">{minIntentScore} pts</span>
                </div>
                <input
                  type="range"
                  min="0"
                  max="90"
                  step="5"
                  value={minIntentScore}
                  onChange={e => setMinIntentScore(parseInt(e.target.value))}
                  className="w-full accent-zinc-400 bg-zinc-950"
                />
                <span className="text-[10px] text-zinc-500 block">Fires only if intent ≥ {minIntentScore}</span>
              </div>

              {/* Dwell Time */}
              <div className="space-y-1">
                <div className="flex justify-between">
                  <span className="text-zinc-300 font-semibold">Min Dwell Time:</span>
                  <span className="font-mono font-bold text-zinc-200">{minDwellTimeSec}s</span>
                </div>
                <input
                  type="range"
                  min="0"
                  max="180"
                  step="10"
                  value={minDwellTimeSec}
                  onChange={e => setMinDwellTimeSec(parseInt(e.target.value))}
                  className="w-full accent-zinc-400 bg-zinc-950"
                />
                <span className="text-[10px] text-zinc-500 block">Seconds active in current session</span>
              </div>

              {/* Product Views */}
              <div className="space-y-1">
                <div className="flex justify-between">
                  <span className="text-zinc-300 font-semibold">Product Views Count:</span>
                  <span className="font-mono font-bold text-zinc-200">≥ {productViewsCount}</span>
                </div>
                <input
                  type="range"
                  min="1"
                  max="6"
                  step="1"
                  value={productViewsCount}
                  onChange={e => setProductViewsCount(parseInt(e.target.value))}
                  className="w-full accent-zinc-400 bg-zinc-950"
                />
                <span className="text-[10px] text-zinc-500 block">PDPs examined in session</span>
              </div>
            </div>

            {/* Checkbox Triggers & URL filter */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2 border-t border-zinc-800">
              <label className="flex items-center space-x-2.5 p-3 rounded-xl bg-zinc-950 border border-zinc-800 cursor-pointer hover:border-zinc-700">
                <input
                  type="checkbox"
                  checked={sizeGuideOpened}
                  onChange={e => setSizeGuideOpened(e.target.checked)}
                  className="rounded accent-zinc-400 h-4 w-4"
                />
                <div>
                  <div className="font-semibold text-zinc-200">Require Size Guide Opened</div>
                  <div className="text-[10px] text-zinc-500">Only triggers if visitor opened sizing modal</div>
                </div>
              </label>

              <label className="flex items-center space-x-2.5 p-3 rounded-xl bg-zinc-950 border border-zinc-800 cursor-pointer hover:border-zinc-700">
                <input
                  type="checkbox"
                  checked={exitIntentDetected}
                  onChange={e => setExitIntentDetected(e.target.checked)}
                  className="rounded accent-zinc-400 h-4 w-4"
                />
                <div>
                  <div className="font-semibold text-zinc-200">Require Cursor Exit Intent</div>
                  <div className="text-[10px] text-zinc-500">Fires when mouse accelerates toward tab close</div>
                </div>
              </label>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-zinc-300 font-semibold mb-1">Minimum Cart Value (₹)</label>
                <input
                  type="number"
                  placeholder="0 (Any cart value)"
                  value={minCartValue}
                  onChange={e => setMinCartValue(parseInt(e.target.value) || 0)}
                  className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-3 py-2 text-white font-mono"
                />
              </div>

              <div>
                <label className="block text-zinc-300 font-semibold mb-1">Page URL Match Filter</label>
                <input
                  type="text"
                  placeholder="e.g. /products/ or /cart (Optional)"
                  value={targetPageUrlPattern}
                  onChange={e => setTargetPageUrlPattern(e.target.value)}
                  className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-3 py-2 text-white font-mono"
                />
              </div>
            </div>
          </div>

          {/* Section 3: AI Message Payload & Attached Coupon */}
          <div className="space-y-4 p-4 rounded-2xl bg-[#171922] border border-zinc-800">
            <h3 className="text-xs font-bold uppercase tracking-wider text-zinc-300 flex items-center gap-1.5">
              <MessageSquare className="h-3.5 w-3.5" /> AI Proactive Greeting & Offer Payload
            </h3>

            <div>
              <label className="block text-zinc-300 font-semibold mb-1">AI Proactive Greeting Message *</label>
              <textarea
                rows={3}
                required
                value={aiProactiveMessage}
                onChange={e => setAiProactiveMessage(e.target.value)}
                placeholder="Enter the conversational greeting message..."
                className="w-full bg-zinc-950 border border-zinc-800 rounded-xl p-3 text-white leading-relaxed focus:outline-none focus:border-zinc-500"
              />
            </div>

            {/* Quick Reply Pills */}
            <div className="space-y-2">
              <label className="block text-zinc-300 font-semibold">Interactive Quick-Reply Chips</label>
              <div className="flex flex-wrap gap-1.5">
                {quickReplies.map((qr, idx) => (
                  <span
                    key={idx}
                    className="inline-flex items-center space-x-1.5 px-2.5 py-1 rounded-full bg-zinc-950 border border-zinc-800 text-zinc-200 text-[11px]"
                  >
                    <span>{qr}</span>
                    <button
                      type="button"
                      onClick={() => handleRemoveQuickReply(idx)}
                      className="text-zinc-500 hover:text-rose-400"
                    >
                      <X className="h-3 w-3" />
                    </button>
                  </span>
                ))}
              </div>
              <div className="flex items-center space-x-2 pt-1">
                <input
                  type="text"
                  placeholder="Add another quick-reply chip..."
                  value={newQuickReply}
                  onChange={e => setNewQuickReply(e.target.value)}
                  onKeyDown={e => e.key === 'Enter' && (e.preventDefault(), handleAddQuickReply())}
                  className="flex-1 bg-zinc-950 border border-zinc-800 rounded-xl px-3 py-1.5 text-xs text-white"
                />
                <button
                  type="button"
                  onClick={handleAddQuickReply}
                  className="px-3 py-1.5 rounded-xl bg-zinc-800 text-white font-semibold text-xs border border-zinc-700 hover:bg-zinc-700"
                >
                  <Plus className="h-3.5 w-3.5 inline mr-1" /> Add
                </button>
              </div>
            </div>

            {/* Coupon & Frequency Capping */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2 border-t border-zinc-800">
              <div>
                <label className="block text-zinc-300 font-semibold mb-1">Attached Coupon Offer</label>
                <select
                  value={attachedCoupon}
                  onChange={e => setAttachedCoupon(e.target.value)}
                  className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-3 py-2 text-white font-mono"
                >
                  <option value="">None (Standard Guidance)</option>
                  {campaigns.map(c => (
                    <option key={c.id} value={c.code}>
                      {c.code} ({c.discountPercentage}% OFF)
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-zinc-300 font-semibold mb-1">Cooldown Interval</label>
                <div className="flex items-center space-x-2">
                  <input
                    type="number"
                    min="1"
                    max="180"
                    value={cooldownMinutes}
                    onChange={e => setCooldownMinutes(parseInt(e.target.value) || 10)}
                    className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-3 py-2 text-white font-mono"
                  />
                  <span className="text-zinc-500 font-mono">mins</span>
                </div>
              </div>

              <div>
                <label className="block text-zinc-300 font-semibold mb-1">Priority Rank</label>
                <input
                  type="number"
                  min="1"
                  max="10"
                  value={priority}
                  onChange={e => setPriority(parseInt(e.target.value) || 1)}
                  className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-3 py-2 text-white font-mono"
                />
              </div>
            </div>
          </div>
        </form>

        {/* Footer Actions */}
        <div className="p-4 bg-[#0E1017] border-t border-zinc-800 flex items-center justify-between">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 rounded-xl bg-zinc-800 hover:bg-zinc-700 text-zinc-300 text-xs font-semibold"
          >
            Cancel
          </button>

          <button
            type="submit"
            form="rule-form"
            className="px-5 py-2.5 rounded-xl bg-gradient-to-b from-zinc-600 to-zinc-700 hover:from-zinc-500 hover:to-zinc-600 text-white border border-zinc-500 text-xs font-bold uppercase tracking-wider shadow-lg shadow-black/40 flex items-center space-x-1.5"
          >
            <CheckCircle className="h-4 w-4" />
            <span>{isEditing ? 'Save Trigger Changes' : 'Create & Activate Trigger'}</span>
          </button>
        </div>
      </div>
    </div>
  );
};
