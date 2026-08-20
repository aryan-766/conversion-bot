import React from 'react';
import { AppProvider, useApp } from './context/AppContext';
import { Navbar } from './components/layout/Navbar';
import { Sidebar } from './components/layout/Sidebar';
import { LandingPage } from './components/landing/LandingPage';
import { PlaygroundTab } from './components/playground/PlaygroundTab';
import { OverviewTab } from './components/dashboard/OverviewTab';
import { VisitorStreamTab } from './components/dashboard/VisitorStreamTab';
import { InterventionsTab } from './components/dashboard/InterventionsTab';
import { SpecialistTab } from './components/dashboard/SpecialistTab';
import { KnowledgeTab } from './components/dashboard/KnowledgeTab';
import { ProductsTab } from './components/dashboard/ProductsTab';
import { CampaignsTab } from './components/dashboard/CampaignsTab';
import { LeadsTab } from './components/dashboard/LeadsTab';
import { ExperimentsTab } from './components/dashboard/ExperimentsTab';
import { StorefrontDemo } from './components/storefront/StorefrontDemo';

const MainLayout: React.FC = () => {
  const { viewMode, activeTab } = useApp();

  // If in Landing page mode: render complete MagicChat.ai SaaS landing page
  if (viewMode === 'landing') {
    return <LandingPage />;
  }

  const renderDashboardTab = () => {
    switch (activeTab) {
      case 'overview':
        return <OverviewTab />;
      case 'visitors':
        return <VisitorStreamTab />;
      case 'interventions':
        return <InterventionsTab />;
      case 'specialist':
        return <SpecialistTab />;
      case 'knowledge':
        return <KnowledgeTab />;
      case 'products':
        return <ProductsTab />;
      case 'campaigns':
        return <CampaignsTab />;
      case 'leads':
        return <LeadsTab />;
      case 'experiments':
        return <ExperimentsTab />;
      default:
        return <OverviewTab />;
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#0B0F17] text-slate-100">
      <Navbar />

      <div className="flex-1 flex overflow-hidden">
        {/* Playground Studio Full View */}
        {viewMode === 'playground' && (
          <main className="flex-1 overflow-y-auto p-6 sm:p-8 bg-[#0B0F17] h-[calc(100vh-64px)]">
            <div className="max-w-7xl mx-auto">
              <PlaygroundTab />
            </div>
          </main>
        )}

        {/* Split Screen Mode: Dashboard on left, Live D2C Store on right */}
        {viewMode === 'split' && (
          <div className="flex-1 flex flex-col lg:flex-row h-[calc(100vh-64px)] overflow-hidden">
            {/* Left Half: Merchant Control Dashboard */}
            <div className="flex-1 flex overflow-hidden border-b lg:border-b-0 lg:border-r border-slate-800">
              <Sidebar />
              <main className="flex-1 overflow-y-auto p-4 sm:p-6 bg-[#0B0F17]">
                {renderDashboardTab()}
              </main>
            </div>

            {/* Right Half: Live Storefront Demo */}
            <div className="flex-1 flex flex-col overflow-y-auto bg-[#070A0F] border-t lg:border-t-0 border-slate-800">
              <StorefrontDemo />
            </div>
          </div>
        )}

        {/* Dashboard Only Mode */}
        {viewMode === 'dashboard' && (
          <div className="flex-1 flex h-[calc(100vh-64px)] overflow-hidden">
            <Sidebar />
            <main className="flex-1 overflow-y-auto p-6 sm:p-8 bg-[#0B0F17]">
              <div className="max-w-7xl mx-auto">
                {renderDashboardTab()}
              </div>
            </main>
          </div>
        )}

        {/* Storefront Demo Mode */}
        {viewMode === 'storefront' && (
          <div className="flex-1 flex flex-col overflow-y-auto bg-[#070A0F] h-[calc(100vh-64px)]">
            <StorefrontDemo />
          </div>
        )}
      </div>
    </div>
  );
};

export function App() {
  return (
    <AppProvider>
      <MainLayout />
    </AppProvider>
  );
}

export default App;
