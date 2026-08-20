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
      color: 'text-zinc-200',
      bg: 'bg-zinc-800 border-zinc-700'
    },
    {
      title: 'High Intent Visitors',
      value: '1,284',
      change: '+22.5%',
      trend: 'up',
      subtitle: 'Intent score ≥ 75 pts',
      icon: Flame,
      color: 'text-zinc-200',
      bg: 'bg-zinc-800 border-zinc-700'
    },
    {
      title: 'AI Engaged Sessions',
      value: '3,842',
      change: '+18.9%',
      trend: 'up',
      subtitle: 'Proactively assisted',
      icon: Zap,
      color: 'text-zinc-200',
      bg: 'bg-zinc-800 border-zinc-700'
    },
    {
      title: 'Qualified Leads Captured',
      value: `${leads.length + 238}`,
      change: '+31.4%',
      trend: 'up',
      subtitle: 'Callbacks & consultations',
      icon: UserCheck,
      color: 'text-zinc-200',
      bg: 'bg-zinc-800 border-zinc-700'
    },
    {
      title: 'AI-Assisted Revenue',
      value: `₹${(totalAssistedRevenue / 100000).toFixed(2)}L`,
      change: '+26.8%',
      trend: 'up',
      subtitle: 'Measurably influenced',
      icon: TrendingUp,
      color: 'text-white font-bold',
      bg: 'bg-zinc-800 border-zinc-600'
    },
    {
      title: 'A/B Conversion Lift',
      value: `+${experiment.conversionLiftPercent}%`,
      change: '98.6% Conf.',
      trend: 'up',
      subtitle: `${experiment.variant.conversionRate}% AI vs ${experiment.control.conversionRate}% Control`,
      icon: Percent,
      color: 'text-white font-bold',
      bg: 'bg-zinc-800 border-zinc-600'
    }
  ];

  return (
    <div className="space-y-6 pb-8 animate-fade-in text-white">
      {/* Top Banner */}
      <div className="p-5 rounded-2xl bg-gradient-to-r from-[#181A24] via-[#14161F] to-[#10121A] border border-zinc-700 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center space-x-2">
            <span className="h-2 w-2 rounded-full bg-zinc-400 animate-ping"></span>
            <span className="text-xs font-semibold uppercase tracking-wider text-zinc-300">
              Autonomous Sales Agent Online
            </span>
          </div>
          <h1 className="text-xl font-bold text-white mt-1">
            Conversion & Revenue Attribution Hub
          </h1>
          <p className="text-xs text-zinc-400 max-w-2xl mt-0.5">
            Your AI Sales Agent is actively monitoring visitor intent in real-time, intervening at high-friction moments, and calculating verified incremental revenue.
          </p>
        </div>

        <div className="flex items-center space-x-2 self-stretch md:self-auto">
          <button
            onClick={() => setViewMode('split')}
            className="flex-1 md:flex-none px-4 py-2.5 rounded-xl bg-gradient-to-b from-zinc-600 to-zinc-700 hover:from-zinc-500 hover:to-zinc-600 text-white border border-zinc-500 text-xs font-semibold transition-all shadow-md flex items-center justify-center space-x-1.5"
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
              className="p-4 rounded-2xl bg-[#13151E] border border-zinc-800 hover:border-zinc-700 transition-all group"
            >
              <div className="flex items-center justify-between">
                <div className={`p-2.5 rounded-xl border ${stat.bg}`}>
                  <Icon className={`h-5 w-5 ${stat.color}`} />
                </div>
                <span className="inline-flex items-center text-[11px] font-semibold px-2 py-0.5 rounded-full bg-zinc-800 text-zinc-200 border border-zinc-700">
                  <ArrowUpRight className="h-3 w-3 mr-0.5" />
                  {stat.change}
                </span>
              </div>
              <div className="mt-3">
                <div className="text-xs text-zinc-400 font-medium">{stat.title}</div>
                <div className="text-2xl font-bold text-white tracking-tight mt-0.5">{stat.value}</div>
                <div className="text-[11px] text-zinc-500 mt-1 flex items-center gap-1">
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
        <div className="lg:col-span-7 p-5 rounded-2xl bg-[#13151E] border border-zinc-800 space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-sm font-bold text-white">Full-Funnel Visitor Conversion Journey</h2>
              <p className="text-xs text-zinc-400">Real-time progression from initial landing to final order</p>
            </div>
            <span className="text-xs text-zinc-200 font-mono font-semibold">+22.2% Overall Lift</span>
          </div>

          <div className="space-y-3 pt-2">
            {[
              { label: '1. Store Visitors', count: '28,421', pct: '100%', color: 'bg-zinc-600' },
              { label: '2. High Intent Signals Detected', count: '6,480', pct: '22.8%', color: 'bg-zinc-500' },
              { label: '3. Proactive Interventions Fired', count: '3,842', pct: '13.5%', color: 'bg-zinc-400' },
              { label: '4. AI Sales Conversations Started', count: '1,420', pct: '5.0%', color: 'bg-zinc-300' },
              { label: '5. Completed Orders & Leads', count: `${totalConversions}`, pct: `${((totalConversions / 28421) * 100).toFixed(2)}%`, color: 'bg-white' },
            ].map((stage, idx) => (
              <div key={idx} className="space-y-1">
                <div className="flex justify-between text-xs font-medium">
                  <span className="text-zinc-300">{stage.label}</span>
                  <span className="text-zinc-400 font-mono">
                    <strong className="text-white">{stage.count}</strong> ({stage.pct})
                  </span>
                </div>
                <div className="h-2 w-full bg-zinc-900 rounded-full overflow-hidden">
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
        <div className="lg:col-span-5 p-5 rounded-2xl bg-[#13151E] border border-zinc-800 space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-sm font-bold text-white">Top Proactive Triggers</h2>
              <p className="text-xs text-zinc-400">Assisted revenue generated per behavior</p>
            </div>
            <button
              onClick={() => setActiveTab('interventions')}
              className="text-xs text-zinc-300 hover:text-white font-medium underline"
            >
              Manage Rules →
            </button>
          </div>

          <div className="space-y-3">
            {triggers.slice(0, 3).map(trigger => (
              <div
                key={trigger.id}
                className="p-3 rounded-xl bg-[#0E1017] border border-zinc-800 flex items-center justify-between"
              >
                <div className="space-y-0.5 max-w-[180px] sm:max-w-none">
                  <div className="text-xs font-semibold text-white truncate">{trigger.name}</div>
                  <div className="text-[11px] text-zinc-400">
                    {trigger.performance.shown} shown • {trigger.performance.engaged} engaged
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-xs font-bold text-white font-mono">
                    ₹{(trigger.performance.revenue / 1000).toFixed(1)}k
                  </div>
                  <div className="text-[10px] text-zinc-400 font-medium">
                    {trigger.performance.conversions} orders
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Live Activity Stream Preview */}
      <div className="p-5 rounded-2xl bg-[#13151E] border border-zinc-800 space-y-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <span className="h-2 w-2 rounded-full bg-zinc-400 animate-pulse"></span>
            <h2 className="text-sm font-bold text-white">Live Visitor Intent & Interaction Log</h2>
          </div>
          <button
            onClick={() => setActiveTab('visitors')}
            className="text-xs text-zinc-300 hover:text-white font-medium"
          >
            View All Live Visitors ({visitors.length}) →
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {visitors.slice(0, 4).map(v => (
            <div
              key={v.id}
              className="p-3 rounded-xl bg-[#0E1017] border border-zinc-800 flex items-start justify-between space-x-3"
            >
              <div className="space-y-1">
                <div className="flex items-center space-x-2">
                  <span className="text-xs font-mono font-semibold text-zinc-200">#{v.id}</span>
                  <span className="text-[10px] text-zinc-500">({v.ipLocation})</span>
                </div>
                <div className="text-[11px] text-zinc-400 truncate max-w-[220px]">
                  {v.actions[0]?.details || 'Browsing products'}
                </div>
                {v.interventionTriggered && (
                  <span className="inline-block text-[10px] px-2 py-0.5 rounded bg-zinc-800 text-zinc-200 border border-zinc-700 font-medium">
                    Proactive Intervention: {v.interventionTriggered.type}
                  </span>
                )}
              </div>

              <div className="text-right flex flex-col items-end">
                <span className="text-[11px] font-bold px-2 py-0.5 rounded-full font-mono bg-zinc-800 text-zinc-200 border border-zinc-700">
                  {v.intentScore} pts 🔥
                </span>
                <span className="text-[10px] text-zinc-500 mt-1">{v.lastSeen}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
