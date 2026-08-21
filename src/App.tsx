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
import { IntegrationsTab } from './components/dashboard/IntegrationsTab';
import { StorefrontDemo } from './components/storefront/StorefrontDemo';

const MainLayout: React.FC = () => {
  const { viewMode, activeTab } = useApp();

  // 1. Landing Page View: Has its own dedicated SaaS Marketing Navbar
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
      case 'integrations':
        return <IntegrationsTab />;
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

  // 2. App Views (Playground, Dashboard, Split, Storefront): Use the App Control Navbar
  return (
    <div className="min-h-screen flex flex-col bg-[#0D0E12] text-white">
      {/* App Merchant & Playground Control Navbar */}
      <Navbar />

      <div className="flex-1 flex overflow-hidden pt-2">
        {/* Playground Studio Full View */}
        {viewMode === 'playground' && (
          <main className="flex-1 overflow-y-auto p-4 sm:p-6 bg-[#0D0E12] h-[calc(100vh-84px)]">
            <div className="max-w-7xl mx-auto">
              <PlaygroundTab />
            </div>
          </main>
        )}

        {/* Split Screen Mode: Dashboard on left, Live D2C Store on right */}
        {viewMode === 'split' && (
          <div className="flex-1 flex flex-col lg:flex-row h-[calc(100vh-84px)] overflow-hidden">
            {/* Left Half: Merchant Control Dashboard */}
            <div className="flex-1 flex overflow-hidden border-b lg:border-b-0 lg:border-r border-zinc-800">
              <Sidebar />
              <main className="flex-1 overflow-y-auto p-4 sm:p-6 bg-[#0D0E12]">
                {renderDashboardTab()}
              </main>
            </div>

            {/* Right Half: Live Storefront Demo */}
            <div className="flex-1 flex flex-col overflow-y-auto bg-[#0A0B10] border-t lg:border-t-0 border-zinc-800">
              <StorefrontDemo />
            </div>
          </div>
        )}

        {/* Dashboard Only Mode */}
        {viewMode === 'dashboard' && (
          <div className="flex-1 flex h-[calc(100vh-84px)] overflow-hidden">
            <Sidebar />
            <main className="flex-1 overflow-y-auto p-4 sm:p-6 bg-[#0D0E12]">
              <div className="max-w-7xl mx-auto">
                {renderDashboardTab()}
              </div>
            </main>
          </div>
        )}

        {/* Storefront Demo Mode */}
        {viewMode === 'storefront' && (
          <div className="flex-1 flex flex-col overflow-y-auto bg-[#0A0B10] h-[calc(100vh-84px)]">
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
