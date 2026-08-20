import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import {
  Tag,
  Percent,
  Plus,
  TrendingUp,
  Power,
  Calendar,
  CheckCircle,
  Sparkles,
  Flame
} from 'lucide-react';
import { Campaign } from '../../types';

export const CampaignsTab: React.FC = () => {
  const { campaigns, setCampaigns } = useApp();
  const [showAddModal, setShowAddModal] = useState(false);
  const [newCampaign, setNewCampaign] = useState<Partial<Campaign>>({
    name: 'Weekend Runner Surge',
    code: 'WEEKEND15',
    discountPercentage: 15,
    conditions: {
      minIntentScore: 70,
      minCartAmount: 2500,
      firstOrderOnly: false
    },
    startDate: '2026-08-20',
    endDate: '2026-08-31',
    isActive: true
  });

  const toggleCampaign = (id: string) => {
    setCampaigns(prev =>
      prev.map(c => (c.id === id ? { ...c, isActive: !c.isActive } : c))
    );
  };

  const handleCreateCampaign = () => {
    if (!newCampaign.name || !newCampaign.code) return;
    const camp: Campaign = {
      id: `camp-${Date.now()}`,
      name: newCampaign.name,
      code: newCampaign.code.toUpperCase(),
      discountPercentage: newCampaign.discountPercentage || 10,
      conditions: newCampaign.conditions || { minIntentScore: 60, minCartAmount: 1500, firstOrderOnly: false },
      startDate: newCampaign.startDate || '2026-08-20',
      endDate: newCampaign.endDate || '2026-09-20',
      isActive: true,
      redemptions: 0,
      revenueInfluenced: 0
    };
    setCampaigns(prev => [camp, ...prev]);
    setShowAddModal(false);
  };

  return (
    <div className="space-y-6 pb-8 animate-fade-in">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl font-bold text-white flex items-center gap-2">
            <Tag className="h-5 w-5 text-emerald-400" />
            Authorized Discount & Offer Campaigns
          </h1>
          <p className="text-xs text-slate-400 mt-0.5">
            AI does not invent discounts. It communicates approved campaigns only when conditions (Intent + Cart value) match.
          </p>
        </div>

        <button
          onClick={() => setShowAddModal(true)}
          className="px-3.5 py-2 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 text-xs font-bold flex items-center space-x-1.5 transition-all shadow-md shadow-emerald-500/20"
        >
          <Plus className="h-4 w-4" />
          <span>Create Offer Campaign</span>
        </button>
      </div>

      {/* Campaigns Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {campaigns.map(camp => (
          <div
            key={camp.id}
            className={`p-5 rounded-2xl border transition-all flex flex-col justify-between ${
              camp.isActive
                ? 'bg-slate-900/90 border-slate-800 hover:border-slate-700'
                : 'bg-slate-950/40 border-slate-800/40 opacity-60'
            }`}
          >
            <div className="space-y-3">
              <div className="flex items-start justify-between">
                <div>
                  <h3 className="text-sm font-bold text-white">{camp.name}</h3>
                  <div className="flex items-center space-x-2 mt-1">
                    <span className="text-xs font-mono font-bold px-2 py-0.5 rounded-lg bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                      {camp.code}
                    </span>
                    <span className="text-xs font-bold text-white font-mono">
                      {camp.discountPercentage}% OFF
                    </span>
                  </div>
                </div>

                <button
                  onClick={() => toggleCampaign(camp.id)}
                  className={`p-1.5 rounded-lg transition-colors ${
                    camp.isActive ? 'text-emerald-400 bg-emerald-500/10' : 'text-slate-500 bg-slate-800'
                  }`}
                  title={camp.isActive ? 'Active' : 'Inactive'}
                >
                  <Power className="h-4 w-4" />
                </button>
              </div>

              {/* Conditions */}
              <div className="p-3 rounded-xl bg-slate-950/70 border border-slate-800 text-xs space-y-1.5">
                <div className="text-[10px] text-slate-500 font-semibold uppercase tracking-wider">
                  Targeting Conditions
                </div>
                <div className="text-slate-300 flex items-center justify-between text-[11px]">
                  <span>Minimum Intent:</span>
                  <strong className="text-amber-400 font-mono">≥ {camp.conditions.minIntentScore} pts 🔥</strong>
                </div>
                <div className="text-slate-300 flex items-center justify-between text-[11px]">
                  <span>Min Cart Value:</span>
                  <strong className="text-white font-mono">₹{camp.conditions.minCartAmount}</strong>
                </div>
                <div className="text-slate-300 flex items-center justify-between text-[11px]">
                  <span>Scope:</span>
                  <strong className="text-slate-400">{camp.conditions.firstOrderOnly ? '1st Order Only' : 'All Shoppers'}</strong>
                </div>
              </div>
            </div>

            {/* Performance Footer */}
            <div className="mt-4 pt-3 border-t border-slate-800/80 flex items-center justify-between text-xs">
              <div>
                <div className="text-[10px] text-slate-500">Redemptions</div>
                <div className="font-bold text-white font-mono">{camp.redemptions}</div>
              </div>
              <div className="text-right">
                <div className="text-[10px] text-slate-500">Revenue Influenced</div>
                <div className="font-bold text-emerald-400 font-mono">
                  ₹{(camp.revenueInfluenced / 1000).toFixed(1)}k
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Create Modal */}
      {showAddModal && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-slate-800 rounded-2xl max-w-md w-full p-6 space-y-4 shadow-2xl">
            <h2 className="text-base font-bold text-white">Create New Discount Campaign</h2>

            <div className="space-y-3 text-xs">
              <div>
                <label className="block text-slate-400 mb-1">Campaign Name</label>
                <input
                  type="text"
                  value={newCampaign.name}
                  onChange={e => setNewCampaign({ ...newCampaign, name: e.target.value })}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-white"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-400 mb-1">Coupon Code</label>
                  <input
                    type="text"
                    value={newCampaign.code}
                    onChange={e => setNewCampaign({ ...newCampaign, code: e.target.value.toUpperCase() })}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-white uppercase font-mono font-bold"
                  />
                </div>
                <div>
                  <label className="block text-slate-400 mb-1">Discount %</label>
                  <input
                    type="number"
                    value={newCampaign.discountPercentage}
                    onChange={e => setNewCampaign({ ...newCampaign, discountPercentage: parseInt(e.target.value) || 0 })}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-white font-mono"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-400 mb-1">Min Intent Score</label>
                  <input
                    type="number"
                    value={newCampaign.conditions?.minIntentScore || 65}
                    onChange={e =>
                      setNewCampaign({
                        ...newCampaign,
                        conditions: { ...newCampaign.conditions!, minIntentScore: parseInt(e.target.value) || 0 }
                      })
                    }
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-white font-mono"
                  />
                </div>
                <div>
                  <label className="block text-slate-400 mb-1">Min Cart Amount (₹)</label>
                  <input
                    type="number"
                    value={newCampaign.conditions?.minCartAmount || 1500}
                    onChange={e =>
                      setNewCampaign({
                        ...newCampaign,
                        conditions: { ...newCampaign.conditions!, minCartAmount: parseInt(e.target.value) || 0 }
                      })
                    }
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-white font-mono"
                  />
                </div>
              </div>
            </div>

            <div className="flex justify-end space-x-2 pt-2 border-t border-slate-800">
              <button
                onClick={() => setShowAddModal(false)}
                className="px-4 py-2 rounded-xl bg-slate-800 text-slate-300 text-xs font-semibold hover:bg-slate-700"
              >
                Cancel
              </button>
              <button
                onClick={handleCreateCampaign}
                className="px-4 py-2 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 text-xs font-bold"
              >
                Launch Campaign
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
