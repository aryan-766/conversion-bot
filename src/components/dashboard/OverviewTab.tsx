import React from 'react';
import { useApp } from '../../context/AppContext';
import {
  TrendingUp,
  Users,
  MessageSquare,
  ShoppingBag,
  Zap,
  ArrowUpRight,
  Flame,
  UserCheck,
  Percent,
  CheckCircle2,
  Clock,
  Sparkles
} from 'lucide-react';

export const OverviewTab: React.FC = () => {
  const {
    experiment,
    triggers,
    visitors,
    leads,
    activeVisitor,
    setViewMode,
    setActiveTab
  } = useApp();

  const totalAssistedRevenue = triggers.reduce((acc, t) => acc + t.performance.revenue, 0) + 180000;
  const totalConversions = triggers.reduce((acc, t) => acc + t.performance.conversions, 0) + 72;

  const statCards = [
    {
      title: 'Total Visitors',
      value: '28,421',
      change: '+14.2%',
      trend: 'up',
      subtitle: 'Across all channels',
      icon: Users,
      color: 'text-blue-400',
      bg: 'bg-blue-500/10 border-blue-500/20'
    },
    {
      title: 'High Intent Visitors',
      value: '1,284',
      change: '+22.5%',
      trend: 'up',
      subtitle: 'Intent score ≥ 75 pts',
      icon: Flame,
      color: 'text-amber-400',
      bg: 'bg-amber-500/10 border-amber-500/20'
    },
    {
      title: 'AI Engaged Sessions',
      value: '3,842',
      change: '+18.9%',
      trend: 'up',
      subtitle: 'Proactively assisted',
      icon: Zap,
      color: 'text-cyan-400',
      bg: 'bg-cyan-500/10 border-cyan-500/20'
    },
    {
      title: 'Qualified Leads Captured',
      value: `${leads.length + 238}`,
      change: '+31.4%',
      trend: 'up',
      subtitle: 'Callbacks & consultations',
      icon: UserCheck,
      color: 'text-indigo-400',
      bg: 'bg-indigo-500/10 border-indigo-500/20'
    },
    {
      title: 'AI-Assisted Revenue',
      value: `₹${(totalAssistedRevenue / 100000).toFixed(2)}L`,
      change: '+26.8%',
      trend: 'up',
      subtitle: 'Measurably influenced',
      icon: TrendingUp,
      color: 'text-emerald-400',
      bg: 'bg-emerald-500/10 border-emerald-500/20'
    },
    {
      title: 'A/B Conversion Lift',
      value: `+${experiment.conversionLiftPercent}%`,
      change: '98.6% Conf.',
      trend: 'up',
      subtitle: `${experiment.variant.conversionRate}% AI vs ${experiment.control.conversionRate}% Control`,
      icon: Percent,
      color: 'text-emerald-300',
      bg: 'bg-emerald-500/10 border-emerald-500/30 font-bold'
    }
  ];

  return (
    <div className="space-y-6 pb-8 animate-fade-in">
      {/* Top Banner */}
      <div className="p-5 rounded-2xl bg-gradient-to-r from-emerald-950/50 via-slate-900 to-cyan-950/40 border border-emerald-500/30 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center space-x-2">
            <span className="h-2 w-2 rounded-full bg-emerald-400 animate-ping"></span>
            <span className="text-xs font-semibold uppercase tracking-wider text-emerald-400">
              Autonomous Sales Agent Online
            </span>
          </div>
          <h1 className="text-xl font-bold text-white mt-1">
            Conversion & Revenue Attribution Hub
          </h1>
          <p className="text-xs text-slate-300 max-w-2xl mt-0.5">
            Your AI Sales Agent is actively monitoring visitor intent in real-time, intervening at high-friction moments, and calculating verified incremental revenue.
          </p>
        </div>

        <div className="flex items-center space-x-2 self-stretch md:self-auto">
          <button
            onClick={() => setViewMode('split')}
            className="flex-1 md:flex-none px-3.5 py-2 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 text-xs font-semibold transition-all shadow-lg shadow-emerald-500/20 flex items-center justify-center space-x-1.5"
          >
            <Sparkles className="h-4 w-4" />
            <span>Test Live Store Simulation</span>
          </button>
        </div>
      </div>

      {/* Primary Metrics Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {statCards.map((stat, idx) => {
          const Icon = stat.icon;
          return (
            <div
              key={idx}
              className="p-4 rounded-2xl bg-slate-900/80 border border-slate-800 hover:border-slate-700/80 transition-all group"
            >
              <div className="flex items-center justify-between">
                <div className={`p-2.5 rounded-xl border ${stat.bg}`}>
                  <Icon className={`h-5 w-5 ${stat.color}`} />
                </div>
                <span className="inline-flex items-center text-[11px] font-semibold px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                  <ArrowUpRight className="h-3 w-3 mr-0.5" />
                  {stat.change}
                </span>
              </div>
              <div className="mt-3">
                <div className="text-xs text-slate-400 font-medium">{stat.title}</div>
                <div className="text-2xl font-bold text-white tracking-tight mt-0.5">{stat.value}</div>
                <div className="text-[11px] text-slate-500 mt-1 flex items-center gap-1">
                  <span>{stat.subtitle}</span>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Two Column Layout: Conversion Funnel & Trigger Performance */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Conversion Funnel */}
        <div className="lg:col-span-7 p-5 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-sm font-bold text-white">Full-Funnel Visitor Conversion Journey</h2>
              <p className="text-xs text-slate-400">Real-time progression from initial landing to final order</p>
            </div>
            <span className="text-xs text-emerald-400 font-mono font-semibold">+22.2% Overall Lift</span>
          </div>

          <div className="space-y-3 pt-2">
            {[
              { label: '1. Store Visitors', count: '28,421', pct: '100%', color: 'bg-blue-500' },
              { label: '2. High Intent Signals Detected', count: '6,480', pct: '22.8%', color: 'bg-cyan-500' },
              { label: '3. Proactive Interventions Fired', count: '3,842', pct: '13.5%', color: 'bg-emerald-500' },
              { label: '4. AI Sales Conversations Started', count: '1,420', pct: '5.0%', color: 'bg-teal-400' },
              { label: '5. Completed Orders & Leads', count: `${totalConversions}`, pct: `${((totalConversions / 28421) * 100).toFixed(2)}%`, color: 'bg-emerald-400' },
            ].map((stage, idx) => (
              <div key={idx} className="space-y-1">
                <div className="flex justify-between text-xs font-medium">
                  <span className="text-slate-300">{stage.label}</span>
                  <span className="text-slate-400 font-mono">
                    <strong className="text-white">{stage.count}</strong> ({stage.pct})
                  </span>
                </div>
                <div className="h-2 w-full bg-slate-800 rounded-full overflow-hidden">
                  <div
                    className={`h-full ${stage.color} rounded-full transition-all duration-700`}
                    style={{ width: stage.pct }}
                  ></div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Top Performing Triggers */}
        <div className="lg:col-span-5 p-5 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-sm font-bold text-white">Top Proactive Triggers</h2>
              <p className="text-xs text-slate-400">Assisted revenue generated per behavior</p>
            </div>
            <button
              onClick={() => setActiveTab('interventions')}
              className="text-xs text-emerald-400 hover:text-emerald-300 font-medium"
            >
              Manage Rules →
            </button>
          </div>

          <div className="space-y-3">
            {triggers.slice(0, 3).map(trigger => (
              <div
                key={trigger.id}
                className="p-3 rounded-xl bg-slate-950/70 border border-slate-800 flex items-center justify-between"
              >
                <div className="space-y-0.5 max-w-[180px] sm:max-w-none">
                  <div className="text-xs font-semibold text-white truncate">{trigger.name}</div>
                  <div className="text-[11px] text-slate-400">
                    {trigger.performance.shown} shown • {trigger.performance.engaged} engaged
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-xs font-bold text-emerald-400 font-mono">
                    ₹{(trigger.performance.revenue / 1000).toFixed(1)}k
                  </div>
                  <div className="text-[10px] text-slate-500 font-medium">
                    {trigger.performance.conversions} orders
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Live Activity Stream Preview */}
      <div className="p-5 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <span className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse"></span>
            <h2 className="text-sm font-bold text-white">Live Visitor Intent & Interaction Log</h2>
          </div>
          <button
            onClick={() => setActiveTab('visitors')}
            className="text-xs text-emerald-400 hover:text-emerald-300 font-medium"
          >
            View All Live Visitors ({visitors.length}) →
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {visitors.slice(0, 4).map(v => (
            <div
              key={v.id}
              className="p-3 rounded-xl bg-slate-950/60 border border-slate-800/80 flex items-start justify-between space-x-3"
            >
              <div className="space-y-1">
                <div className="flex items-center space-x-2">
                  <span className="text-xs font-mono font-semibold text-slate-200">{v.id}</span>
                  <span className="text-[10px] text-slate-500">({v.ipLocation})</span>
                </div>
                <div className="text-[11px] text-slate-400 truncate max-w-[220px]">
                  {v.actions[0]?.details || 'Browsing products'}
                </div>
                {v.interventionTriggered && (
                  <span className="inline-block text-[10px] px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-300 border border-emerald-500/20 font-medium">
                    Proactive Intervention: {v.interventionTriggered.type}
                  </span>
                )}
              </div>

              <div className="text-right flex flex-col items-end">
                <span
                  className={`text-[11px] font-bold px-2 py-0.5 rounded-full font-mono ${
                    v.intentScore >= 75
                      ? 'bg-amber-500/20 text-amber-300 border border-amber-500/30'
                      : v.intentScore >= 50
                      ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/30'
                      : 'bg-slate-800 text-slate-400'
                  }`}
                >
                  {v.intentScore} pts 🔥
                </span>
                <span className="text-[10px] text-slate-500 mt-1">{v.lastSeen}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
