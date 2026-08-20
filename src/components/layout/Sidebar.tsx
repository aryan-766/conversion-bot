import React from 'react';
import { useApp } from '../../context/AppContext';
import {
  LayoutDashboard,
  Users,
  Zap,
  Bot,
  BookOpen,
  ShoppingBag,
  Tag,
  UserCheck,
  Split,
  HelpCircle,
  TrendingUp,
  Sparkles
} from 'lucide-react';

export const Sidebar: React.FC = () => {
  const {
    activeTab,
    setActiveTab,
    visitors,
    triggers,
    leads,
    knowledgeGaps,
    campaigns
  } = useApp();

  const hotVisitorsCount = visitors.filter(v => v.intentScore >= 75).length;
  const pendingGapsCount = knowledgeGaps.filter(g => g.status === 'detected').length;
  const newLeadsCount = leads.filter(l => l.status === 'new').length;

  const menuItems = [
    {
      id: 'overview',
      label: 'Overview & ROI',
      icon: LayoutDashboard,
      badge: null
    },
    {
      id: 'visitors',
      label: 'Visitor Intelligence',
      icon: Users,
      badge: hotVisitorsCount > 0 ? `${hotVisitorsCount} Hot 🔥` : null,
      badgeColor: 'bg-zinc-800 text-zinc-200 border-zinc-700'
    },
    {
      id: 'interventions',
      label: 'Trigger & Intervention',
      icon: Zap,
      badge: `${triggers.filter(t => t.enabled).length} Active`,
      badgeColor: 'bg-zinc-800 text-zinc-300 border-zinc-700'
    },
    {
      id: 'specialist',
      label: 'AI Specialist Studio',
      icon: Bot,
      badge: null
    },
    {
      id: 'knowledge',
      label: 'Knowledge & Sync',
      icon: BookOpen,
      badge: pendingGapsCount > 0 ? `${pendingGapsCount} Gaps` : null,
      badgeColor: 'bg-zinc-800 text-zinc-300 border-zinc-700'
    },
    {
      id: 'products',
      label: 'Product Catalog',
      icon: ShoppingBag,
      badge: null
    },
    {
      id: 'campaigns',
      label: 'Offers & Campaigns',
      icon: Tag,
      badge: `${campaigns.filter(c => c.isActive).length} Live`,
      badgeColor: 'bg-zinc-800 text-zinc-300 border-zinc-700'
    },
    {
      id: 'leads',
      label: 'Captured Leads',
      icon: UserCheck,
      badge: newLeadsCount > 0 ? `${newLeadsCount} New` : null,
      badgeColor: 'bg-zinc-800 text-zinc-200 border-zinc-700'
    },
    {
      id: 'experiments',
      label: 'A/B Test & Lift',
      icon: Split,
      badge: '+22.2% Lift',
      badgeColor: 'bg-zinc-700 text-white border-zinc-600 font-bold'
    }
  ];

  return (
    <aside className="w-64 border-r border-zinc-800 bg-[#0E1017] flex flex-col justify-between p-3 select-none">
      <div className="space-y-1">
        <div className="px-3 py-2 text-[11px] font-semibold text-zinc-400 uppercase tracking-wider">
          Sales Engine Modules
        </div>
        <nav className="space-y-1">
          {menuItems.map(item => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-xs font-medium transition-all ${
                  isActive
                    ? 'bg-zinc-800 text-white font-semibold border border-zinc-700 shadow-sm'
                    : 'text-zinc-400 hover:text-zinc-200 hover:bg-zinc-900/60'
                }`}
              >
                <div className="flex items-center space-x-2.5">
                  <Icon className={`h-4 w-4 ${isActive ? 'text-zinc-200' : 'text-zinc-500'}`} />
                  <span>{item.label}</span>
                </div>
                {item.badge && (
                  <span
                    className={`text-[10px] px-2 py-0.5 rounded-full border ${
                      item.badgeColor || 'bg-zinc-800 text-zinc-300 border-zinc-700'
                    }`}
                  >
                    {item.badge}
                  </span>
                )}
              </button>
            );
          })}
        </nav>
      </div>

      {/* Footer Mini Card */}
      <div className="p-3 rounded-xl bg-[#14161F] border border-zinc-800">
        <div className="flex items-center space-x-2 mb-1.5">
          <Sparkles className="h-3.5 w-3.5 text-zinc-300" />
          <span className="text-xs font-semibold text-white">Revenue Impact</span>
        </div>
        <p className="text-[11px] text-zinc-400 leading-relaxed">
          AI proactive interventions are influencing <span className="text-white font-semibold">₹4.82L</span> in monthly sales with measurable incremental lift.
        </p>
      </div>
    </aside>
  );
};
