import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import {
  Layers,
  ShoppingBag,
  Smartphone,
  Database,
  Truck,
  Code,
  CheckCircle,
  Key,
  Globe,
  RefreshCw,
  Send,
  Sliders,
  ExternalLink,
  ShieldCheck,
  Copy,
  Check,
  Zap
} from 'lucide-react';

export const IntegrationsTab: React.FC = () => {
  const { integrations, updateIntegration, testWebhookDispatch } = useApp();

  const [copiedKey, setCopiedKey] = useState(false);
  const [selectedWebhookEvent, setSelectedWebhookEvent] = useState('visitor.high_intent');
  const [isTestingWebhook, setIsTestingWebhook] = useState(false);
  const [testResult, setTestResult] = useState<{ success: boolean; latencyMs: number } | null>(null);

  const [activeTab, setActiveTab] = useState<'all' | 'ecommerce' | 'whatsapp' | 'crm' | 'webhooks'>('all');

  const handleCopySecret = () => {
    navigator.clipboard.writeText(integrations.webhooks.secretKey);
    setCopiedKey(true);
    setTimeout(() => setCopiedKey(false), 2000);
  };

  const handleDispatchTestWebhook = async () => {
    setIsTestingWebhook(true);
    setTestResult(null);
    const res = await testWebhookDispatch(selectedWebhookEvent);
    setTestResult(res);
    setIsTestingWebhook(false);
  };

  const samplePayloads: Record<string, object> = {
    'visitor.high_intent': {
      event: 'visitor.high_intent',
      timestamp: new Date().toISOString(),
      data: {
        visitorId: 'vis_8942',
        intentScore: 88,
        intentLevel: 'hot',
        currentPage: '/products/prod-1',
        cartValue: 2799,
        topSignals: ['PDP Dwell > 120s', 'Size Guide Inspected', 'Cart Item Added']
      }
    },
    'trigger.intervened': {
      event: 'trigger.intervened',
      timestamp: new Date().toISOString(),
      data: {
        ruleId: 'trig-1',
        ruleName: 'PDP Sizing Hesitation & Fit Doubts',
        visitorId: 'vis_8942',
        actionType: 'chat_callout',
        couponOffered: 'SAVE10'
      }
    },
    'lead.captured': {
      event: 'lead.captured',
      timestamp: new Date().toISOString(),
      data: {
        leadId: 'lead-984',
        name: 'Vikram Malhotra',
        phone: '+91 98201 44521',
        email: 'vikram.m@corporaterun.in',
        intentScore: 88,
        requirement: 'Bulk order inquiry for 25 marathon runners'
      }
    },
    'order.assisted': {
      event: 'order.assisted',
      timestamp: new Date().toISOString(),
      data: {
        orderId: 'ORD-98421',
        revenue: 2799,
        couponUsed: 'SAVE10',
        attributedTrigger: 'Exit Intent Cart Recovery',
        conversionLift: '+22.2%'
      }
    }
  };

  return (
    <div className="space-y-6 text-white animate-fade-in">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl sm:text-2xl font-extrabold text-white tracking-tight flex items-center gap-2">
            <Layers className="h-6 w-6 text-zinc-300" />
            Integrations & Omnichannel API Hub
          </h1>
          <p className="text-xs text-zinc-400">
            Connect Convora AI to Shopify, WhatsApp Cloud API, CRMs, Logistics, and Custom Developer Webhooks.
          </p>
        </div>

        {/* Filter Pills */}
        <div className="flex flex-wrap gap-1.5 self-start sm:self-auto">
          {[
            { id: 'all', label: 'All (5)' },
            { id: 'ecommerce', label: 'E-Commerce' },
            { id: 'whatsapp', label: 'WhatsApp & Meta' },
            { id: 'crm', label: 'CRMs' },
            { id: 'webhooks', label: 'Webhooks & APIs' }
          ].map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-colors ${
                activeTab === tab.id
                  ? 'bg-gradient-to-b from-zinc-600 to-zinc-700 text-white border border-zinc-500 shadow-sm'
                  : 'bg-zinc-800 text-zinc-400 hover:text-white border border-zinc-700'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* Main Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* 1. SHOPIFY INTEGRATION CARD */}
        {(activeTab === 'all' || activeTab === 'ecommerce') && (
          <div className="p-6 rounded-3xl bg-[#13151E] border border-zinc-800 space-y-4 hover:border-zinc-700 transition-all">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="p-3 rounded-2xl bg-zinc-800 border border-zinc-700 text-zinc-200">
                  <ShoppingBag className="h-6 w-6" />
                </div>
                <div>
                  <h3 className="text-sm font-bold text-white flex items-center gap-2">
                    Shopify E-Commerce Store
                    <span className="text-[10px] px-2 py-0.5 rounded-full bg-emerald-950/80 text-emerald-300 border border-emerald-800 font-semibold">
                      Connected
                    </span>
                  </h3>
                  <p className="text-xs text-zinc-400 font-mono">{integrations.shopify.shopDomain}</p>
                </div>
              </div>

              <button
                onClick={() => updateIntegration('shopify', { lastSynced: 'Just now' })}
                className="p-2 rounded-xl bg-zinc-800 hover:bg-zinc-700 text-zinc-300 hover:text-white border border-zinc-700 transition-colors"
                title="Sync Products & Inventory"
              >
                <RefreshCw className="h-4 w-4" />
              </button>
            </div>

            <div className="space-y-3 pt-2 text-xs">
              <div className="p-3 rounded-2xl bg-zinc-950 border border-zinc-800 space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-zinc-300 font-semibold">Auto-Sync Catalog & Inventory</span>
                  <input
                    type="checkbox"
                    checked={integrations.shopify.autoSyncCatalog}
                    onChange={e => updateIntegration('shopify', { autoSyncCatalog: e.target.checked })}
                    className="accent-zinc-400 h-4 w-4"
                  />
                </div>
                <div className="flex items-center justify-between pt-1 border-t border-zinc-900">
                  <span className="text-zinc-300 font-semibold">Track Live Cart Checkout Tokens</span>
                  <input
                    type="checkbox"
                    checked={integrations.shopify.trackCartTokens}
                    onChange={e => updateIntegration('shopify', { trackCartTokens: e.target.checked })}
                    className="accent-zinc-400 h-4 w-4"
                  />
                </div>
              </div>

              <div className="flex items-center justify-between text-[11px] text-zinc-400 font-mono">
                <span>Webhook: orders/create, carts/update</span>
                <span>Synced: {integrations.shopify.lastSynced}</span>
              </div>
            </div>
          </div>
        )}

        {/* 2. WHATSAPP CLOUD API CARD */}
        {(activeTab === 'all' || activeTab === 'whatsapp') && (
          <div className="p-6 rounded-3xl bg-[#13151E] border border-zinc-800 space-y-4 hover:border-zinc-700 transition-all">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="p-3 rounded-2xl bg-zinc-800 border border-zinc-700 text-zinc-200">
                  <Smartphone className="h-6 w-6" />
                </div>
                <div>
                  <h3 className="text-sm font-bold text-white flex items-center gap-2">
                    WhatsApp Cloud API (Meta)
                    <span className="text-[10px] px-2 py-0.5 rounded-full bg-emerald-950/80 text-emerald-300 border border-emerald-800 font-semibold">
                      Live
                    </span>
                  </h3>
                  <p className="text-xs text-zinc-400 font-mono">WABA: {integrations.whatsapp.wabaId}</p>
                </div>
              </div>

              <span className="text-xs font-mono text-zinc-300">
                +91 98765 43210
              </span>
            </div>

            <div className="space-y-3 pt-2 text-xs">
              <div className="p-3 rounded-2xl bg-zinc-950 border border-zinc-800 space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-zinc-300 font-semibold">Abandoned Cart Auto-Recovery</span>
                  <input
                    type="checkbox"
                    checked={integrations.whatsapp.enabled}
                    onChange={e => updateIntegration('whatsapp', { enabled: e.target.checked })}
                    className="accent-zinc-400 h-4 w-4"
                  />
                </div>
                <div className="flex items-center justify-between pt-1 border-t border-zinc-900">
                  <span className="text-zinc-400">Trigger Delay After Exit:</span>
                  <span className="font-mono text-zinc-200 font-bold">{integrations.whatsapp.autoRecoveryDelayMinutes} mins</span>
                </div>
                <div className="flex items-center justify-between pt-1 border-t border-zinc-900">
                  <span className="text-zinc-400">Approved Meta Template:</span>
                  <span className="font-mono text-zinc-200">{integrations.whatsapp.templateName}</span>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* 3. CRM INTEGRATION CARD */}
        {(activeTab === 'all' || activeTab === 'crm') && (
          <div className="p-6 rounded-3xl bg-[#13151E] border border-zinc-800 space-y-4 hover:border-zinc-700 transition-all">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="p-3 rounded-2xl bg-zinc-800 border border-zinc-700 text-zinc-200">
                  <Database className="h-6 w-6" />
                </div>
                <div>
                  <h3 className="text-sm font-bold text-white flex items-center gap-2">
                    CRM & Marketing Cloud
                    <span className="text-[10px] px-2 py-0.5 rounded-full bg-zinc-800 text-zinc-300 border border-zinc-700 font-semibold uppercase">
                      {integrations.crm.provider}
                    </span>
                  </h3>
                  <p className="text-xs text-zinc-400">Auto-push qualified high-intent leads</p>
                </div>
              </div>
            </div>

            <div className="space-y-3 pt-2 text-xs">
              <div className="p-3 rounded-2xl bg-zinc-950 border border-zinc-800 space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-zinc-300 font-semibold">Active CRM Provider</span>
                  <select
                    value={integrations.crm.provider}
                    onChange={e => updateIntegration('crm', { provider: e.target.value as any })}
                    className="bg-zinc-900 border border-zinc-800 rounded-lg px-2 py-1 text-xs text-white"
                  >
                    <option value="hubspot">HubSpot CRM</option>
                    <option value="zoho">Zoho CRM</option>
                    <option value="salesforce">Salesforce</option>
                    <option value="klaviyo">Klaviyo</option>
                  </select>
                </div>
                <div className="flex items-center justify-between pt-1 border-t border-zinc-900">
                  <span className="text-zinc-400">Auto-Sync Intent Threshold:</span>
                  <span className="font-mono text-zinc-200 font-bold">≥ {integrations.crm.intentThreshold} pts</span>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* 4. LOGISTICS & COURIER CARD */}
        {(activeTab === 'all' || activeTab === 'ecommerce') && (
          <div className="p-6 rounded-3xl bg-[#13151E] border border-zinc-800 space-y-4 hover:border-zinc-700 transition-all">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="p-3 rounded-2xl bg-zinc-800 border border-zinc-700 text-zinc-200">
                  <Truck className="h-6 w-6" />
                </div>
                <div>
                  <h3 className="text-sm font-bold text-white flex items-center gap-2">
                    Logistics & EDD APIs
                    <span className="text-[10px] px-2 py-0.5 rounded-full bg-zinc-800 text-zinc-300 border border-zinc-700 font-semibold uppercase">
                      {integrations.logistics.provider}
                    </span>
                  </h3>
                  <p className="text-xs text-zinc-400">Live Pincode deliverability & AWB tracking</p>
                </div>
              </div>
            </div>

            <div className="space-y-3 pt-2 text-xs">
              <div className="p-3 rounded-2xl bg-zinc-950 border border-zinc-800 space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-zinc-300 font-semibold">Live Pincode Deliverability Check</span>
                  <input
                    type="checkbox"
                    checked={integrations.logistics.livePincodeCheck}
                    onChange={e => updateIntegration('logistics', { livePincodeCheck: e.target.checked })}
                    className="accent-zinc-400 h-4 w-4"
                  />
                </div>
                <div className="flex items-center justify-between pt-1 border-t border-zinc-900">
                  <span className="text-zinc-300 font-semibold">Instant Order Tracking Lookups</span>
                  <input
                    type="checkbox"
                    checked={integrations.logistics.autoTrackingLookup}
                    onChange={e => updateIntegration('logistics', { autoTrackingLookup: e.target.checked })}
                    className="accent-zinc-400 h-4 w-4"
                  />
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* 5. FULL-WIDTH DEVELOPER WEBHOOK GATEWAY & TEST DISPATCHER */}
      {(activeTab === 'all' || activeTab === 'webhooks') && (
        <div className="p-6 rounded-3xl bg-[#13151E] border border-zinc-800 space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-zinc-800">
            <div>
              <h2 className="text-base font-bold text-white flex items-center gap-2">
                <Code className="h-5 w-5 text-zinc-300" />
                Custom Developer Webhook Gateway & API Keys
              </h2>
              <p className="text-xs text-zinc-400">
                Receive real-time signed JSON event payloads when high-intent visitors trigger interventions or place assisted orders.
              </p>
            </div>

            <div className="flex items-center space-x-2">
              <span className="text-xs text-zinc-400 font-mono">Signing Secret:</span>
              <button
                onClick={handleCopySecret}
                className="px-3 py-1.5 rounded-xl bg-zinc-800 hover:bg-zinc-700 text-zinc-200 text-xs font-mono flex items-center space-x-1.5 border border-zinc-700 transition-colors"
              >
                {copiedKey ? <Check className="h-3.5 w-3.5 text-emerald-400" /> : <Copy className="h-3.5 w-3.5" />}
                <span>{copiedKey ? 'Copied' : 'Copy Secret Key'}</span>
              </button>
            </div>
          </div>

          {/* Endpoint Input & Event Subscriptions */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            <div className="lg:col-span-7 space-y-4 text-xs">
              <div>
                <label className="block text-zinc-300 font-semibold mb-1">Your HTTPS Webhook Endpoint URL</label>
                <input
                  type="url"
                  value={integrations.webhooks.endpointUrl}
                  onChange={e =>
                    updateIntegration('webhooks', {
                      endpointUrl: e.target.value
                    })
                  }
                  className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-3 py-2.5 text-white font-mono text-xs focus:outline-none focus:border-zinc-500"
                />
              </div>

              {/* Event Subscriptions Checklist */}
              <div className="space-y-2">
                <label className="block text-zinc-300 font-semibold">Subscribed Event Triggers</label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {[
                    { id: 'visitor.high_intent', label: 'visitor.high_intent (Score ≥ 75)' },
                    { id: 'trigger.intervened', label: 'trigger.intervened (Proactive callout)' },
                    { id: 'lead.captured', label: 'lead.captured (Form submitted)' },
                    { id: 'order.assisted', label: 'order.assisted (Attributed sale)' }
                  ].map(evt => (
                    <label key={evt.id} className="flex items-center space-x-2 p-2.5 rounded-xl bg-zinc-950 border border-zinc-800 font-mono text-[11px] text-zinc-300">
                      <input
                        type="checkbox"
                        checked={integrations.webhooks.eventsSubscribed.includes(evt.id)}
                        onChange={e => {
                          const list = e.target.checked
                            ? [...integrations.webhooks.eventsSubscribed, evt.id]
                            : integrations.webhooks.eventsSubscribed.filter(id => id !== evt.id);
                          updateIntegration('webhooks', { eventsSubscribed: list });
                        }}
                        className="accent-zinc-400 h-3.5 w-3.5"
                      />
                      <span>{evt.label}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Test Dispatcher */}
              <div className="p-4 rounded-2xl bg-[#171922] border border-zinc-800 space-y-3">
                <h4 className="font-bold text-white flex items-center gap-1.5">
                  <Zap className="h-4 w-4 text-zinc-300" /> Live Webhook Test Dispatcher
                </h4>
                <div className="flex items-center space-x-2">
                  <select
                    value={selectedWebhookEvent}
                    onChange={e => setSelectedWebhookEvent(e.target.value)}
                    className="flex-1 bg-zinc-950 border border-zinc-800 rounded-xl px-3 py-2 text-xs text-white font-mono"
                  >
                    <option value="visitor.high_intent">visitor.high_intent</option>
                    <option value="trigger.intervened">trigger.intervened</option>
                    <option value="lead.captured">lead.captured</option>
                    <option value="order.assisted">order.assisted</option>
                  </select>

                  <button
                    onClick={handleDispatchTestWebhook}
                    disabled={isTestingWebhook}
                    className="px-4 py-2 rounded-xl bg-gradient-to-b from-zinc-600 to-zinc-700 hover:from-zinc-500 hover:to-zinc-600 text-white border border-zinc-500 text-xs font-bold shadow-md flex items-center space-x-1.5 transition-all disabled:opacity-50"
                  >
                    <Send className="h-3.5 w-3.5" />
                    <span>{isTestingWebhook ? 'Sending...' : 'Send Test Event'}</span>
                  </button>
                </div>

                {testResult && (
                  <div className="p-2.5 rounded-xl bg-emerald-950/80 border border-emerald-700 text-emerald-200 text-xs flex items-center justify-between font-mono animate-slide-up">
                    <span className="flex items-center gap-1.5">
                      <CheckCircle className="h-4 w-4 text-emerald-400" />
                      HTTP 200 OK • Payload Dispatched Successfully
                    </span>
                    <span className="text-[11px] text-zinc-300">{testResult.latencyMs}ms</span>
                  </div>
                )}
              </div>
            </div>

            {/* Live JSON Payload Inspector & Recent Deliveries */}
            <div className="lg:col-span-5 space-y-3">
              <div className="flex items-center justify-between text-xs">
                <span className="font-bold text-zinc-300 uppercase tracking-wider">
                  Sample JSON Payload ({selectedWebhookEvent})
                </span>
              </div>

              <pre className="p-4 rounded-2xl bg-zinc-950 border border-zinc-800 text-[11px] font-mono text-zinc-300 overflow-x-auto max-h-56 leading-relaxed">
                {JSON.stringify(samplePayloads[selectedWebhookEvent] || samplePayloads['visitor.high_intent'], null, 2)}
              </pre>

              {/* Delivery Logs */}
              <div className="space-y-1.5 pt-2 text-xs">
                <span className="font-bold text-zinc-300 uppercase tracking-wider block text-[11px]">
                  Recent Deliveries Log
                </span>
                <div className="space-y-1">
                  {integrations.webhooks.recentDeliveries.map(del => (
                    <div
                      key={del.id}
                      className="p-2 rounded-xl bg-[#171922] border border-zinc-800 flex items-center justify-between text-[11px] font-mono"
                    >
                      <span className="text-zinc-200 font-semibold">{del.event}</span>
                      <div className="flex items-center space-x-2 text-zinc-400">
                        <span className="text-emerald-400 font-bold">{del.status}</span>
                        <span>{del.latencyMs}ms</span>
                        <span className="text-zinc-500">{del.timestamp}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
