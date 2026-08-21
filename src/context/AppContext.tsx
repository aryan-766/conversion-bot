import React, { createContext, useContext, useState, useEffect } from 'react';
import {
  Product,
  TriggerRule,
  Campaign,
  Lead,
  KnowledgeDocument,
  KnowledgeGap,
  ABExperiment,
  BusinessProfile,
  Visitor,
  VisitorAction,
  ChatMessage,
  SpecialistType,
  IntegrationConfig,
  TriggerActionType
} from '../types';
import {
  initialBusinessProfile,
  initialProducts,
  initialTriggers,
  initialCampaigns,
  initialLeads,
  initialKnowledgeDocs,
  initialKnowledgeGaps,
  initialExperiment,
  initialVisitors,
  initialIntegrations
} from '../services/mockData';
import { calculateIntentScore } from '../services/intentEngine';
import { TriggerEngine } from '../services/triggerEngine';
import { AISalesAgent } from '../services/aiSalesAgent';
import confetti from 'canvas-confetti';

export interface UserProfile {
  name: string;
  email: string;
  avatar: string;
  plan: string;
}

interface AppContextType {
  user: UserProfile | null;
  loginUser: (userData: UserProfile) => void;
  logoutUser: () => void;
  businessProfile: BusinessProfile;
  setBusinessProfile: React.Dispatch<React.SetStateAction<BusinessProfile>>;
  products: Product[];
  setProducts: React.Dispatch<React.SetStateAction<Product[]>>;
  triggers: TriggerRule[];
  setTriggers: React.Dispatch<React.SetStateAction<TriggerRule[]>>;
  campaigns: Campaign[];
  setCampaigns: React.Dispatch<React.SetStateAction<Campaign[]>>;
  leads: Lead[];
  setLeads: React.Dispatch<React.SetStateAction<Lead[]>>;
  knowledgeDocs: KnowledgeDocument[];
  setKnowledgeDocs: React.Dispatch<React.SetStateAction<KnowledgeDocument[]>>;
  knowledgeGaps: KnowledgeGap[];
  setKnowledgeGaps: React.Dispatch<React.SetStateAction<KnowledgeGap[]>>;
  experiment: ABExperiment;
  setExperiment: React.Dispatch<React.SetStateAction<ABExperiment>>;
  visitors: Visitor[];
  setVisitors: React.Dispatch<React.SetStateAction<Visitor[]>>;
  activeVisitor: Visitor;
  setActiveVisitor: React.Dispatch<React.SetStateAction<Visitor>>;
  integrations: IntegrationConfig;
  setIntegrations: React.Dispatch<React.SetStateAction<IntegrationConfig>>;
  viewMode: 'landing' | 'dashboard' | 'playground' | 'storefront' | 'split';
  setViewMode: (mode: 'landing' | 'dashboard' | 'playground' | 'storefront' | 'split') => void;
  activeTab: string;
  setActiveTab: (tab: string) => void;

  // Storefront & Widget State
  isWidgetOpen: boolean;
  setIsWidgetOpen: (open: boolean) => void;
  chatMessages: ChatMessage[];
  setChatMessages: React.Dispatch<React.SetStateAction<ChatMessage[]>>;
  activeProactiveCallout: {
    rule?: TriggerRule;
    message: string;
    quickReplies?: string[];
    coupon?: Campaign;
    actionType?: TriggerActionType;
    attachedCoupon?: string;
  } | null;
  setActiveProactiveCallout: (callout: any) => void;
  isAiTyping: boolean;

  // Actions
  trackVisitorEvent: (actionType: VisitorAction['type'], details: string, metadata?: { page?: string; product?: Product; value?: number }) => void;
  sendChatMessage: (content: string) => Promise<void>;
  submitLead: (leadData: { name: string; email: string; phone: string; requirement: string }) => void;
  applyCouponToCart: (code: string) => boolean;
  completeCheckout: () => void;
  approveKnowledgeGap: (gapId: string, customAnswer?: string) => void;
  syncKnowledgeBase: () => void;
  isSyncingKnowledge: boolean;
  toggleTrigger: (triggerId: string) => void;
  createTrigger: (rule: TriggerRule) => void;
  updateTrigger: (rule: TriggerRule) => void;
  deleteTrigger: (triggerId: string) => void;
  manualPushIntervention: (visitorId: string, message: string, type: TriggerActionType, coupon?: string) => void;
  updateIntegration: <K extends keyof IntegrationConfig>(key: K, config: Partial<IntegrationConfig[K]>) => void;
  testWebhookDispatch: (eventType: string) => Promise<{ success: boolean; status: number; latencyMs: number }>;
  updateSpecialist: (type: SpecialistType) => void;
  resetDemoVisitor: () => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<UserProfile | null>({
    name: 'Alex Rivera',
    email: 'alex.rivera@aurafit.in',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80',
    plan: 'Growth Pro Plan'
  });

  const [businessProfile, setBusinessProfile] = useState<BusinessProfile>(initialBusinessProfile);
  const [products, setProducts] = useState<Product[]>(initialProducts);
  const [triggers, setTriggers] = useState<TriggerRule[]>(initialTriggers);
  const [campaigns, setCampaigns] = useState<Campaign[]>(initialCampaigns);
  const [leads, setLeads] = useState<Lead[]>(initialLeads);
  const [knowledgeDocs, setKnowledgeDocs] = useState<KnowledgeDocument[]>(initialKnowledgeDocs);
  const [knowledgeGaps, setKnowledgeGaps] = useState<KnowledgeGap[]>(initialKnowledgeGaps);
  const [experiment, setExperiment] = useState<ABExperiment>(initialExperiment);
  const [visitors, setVisitors] = useState<Visitor[]>(initialVisitors);
  const [integrations, setIntegrations] = useState<IntegrationConfig>(initialIntegrations);

  const [viewMode, setViewMode] = useState<'landing' | 'dashboard' | 'playground' | 'storefront' | 'split'>('landing');
  const [activeTab, setActiveTab] = useState<string>('overview');
  const [isSyncingKnowledge, setIsSyncingKnowledge] = useState<boolean>(false);

  // Live active demo visitor state
  const [activeVisitor, setActiveVisitor] = useState<Visitor>(() => ({
    id: `vis_${Math.random().toString(36).substring(2, 7)}`,
    ipLocation: 'Bengaluru, India',
    device: 'Desktop • Chrome 128',
    browser: 'Chrome 128',
    referrer: 'google.com (Search: "performance marathon shoes")',
    isReturning: false,
    sessionStartTime: Date.now() - 15000,
    sessionDurationSec: 15,
    pagesViewed: ['/'],
    currentPage: '/',
    cart: [],
    actions: [
      { id: 'init-1', type: 'page_view', timestamp: 'Just now', details: 'Landed on AuraFit Luxe Storefront', page: '/' }
    ],
    intentScore: 12,
    intentLevel: 'cold',
    signalBreakdown: [
      { name: 'Initial Landing', points: 12, maxPoints: 30, reason: 'Landed on storefront homepage' }
    ],
    lastSeen: 'Just now'
  }));

  // Widget & Chat State
  const [isWidgetOpen, setIsWidgetOpen] = useState<boolean>(false);
  const [activeProactiveCallout, setActiveProactiveCallout] = useState<{
    rule?: TriggerRule;
    message: string;
    quickReplies?: string[];
    coupon?: Campaign;
    actionType?: TriggerActionType;
    attachedCoupon?: string;
  } | null>(null);

  const [chatMessages, setChatMessages] = useState<ChatMessage[]>([
    {
      id: 'welcome-msg',
      sender: 'assistant',
      content: `Hey there! Welcome to **Convora AI** on AuraFit Luxe. Looking for marathon running shoes, all-day walking sneakers, or help with sizing?`,
      timestamp: 'Just now',
      quickReplies: ['Recommend running shoes', 'Help with sizing', 'View 7-day return policy', 'Current offers']
    }
  ]);
  const [isAiTyping, setIsAiTyping] = useState<boolean>(false);

  const loginUser = (userData: UserProfile) => {
    setUser(userData);
    setViewMode('dashboard');
  };

  const logoutUser = () => {
    setUser(null);
    setViewMode('landing');
  };

  // Timer to increment session duration of active visitor
  useEffect(() => {
    const timer = setInterval(() => {
      setActiveVisitor(prev => {
        const nextDuration = prev.sessionDurationSec + 1;
        const { score, level, signalBreakdown } = calculateIntentScore({ ...prev, sessionDurationSec: nextDuration });
        return {
          ...prev,
          sessionDurationSec: nextDuration,
          intentScore: score,
          intentLevel: level,
          signalBreakdown
        };
      });
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  // Telemetry event ingestion & Intent re-calculation
  const trackVisitorEvent = (
    actionType: VisitorAction['type'],
    details: string,
    metadata?: { page?: string; product?: Product; value?: number }
  ) => {
    const newAction: VisitorAction = {
      id: `act_${Date.now()}_${Math.random().toString(36).substring(2, 5)}`,
      type: actionType,
      timestamp: 'Just now',
      details,
      page: metadata?.page || activeVisitor.currentPage,
      productId: metadata?.product?.id,
      metadata
    };

    setActiveVisitor(prev => {
      const updatedActions = [newAction, ...prev.actions];
      const updatedPages = metadata?.page && !prev.pagesViewed.includes(metadata.page)
        ? [...prev.pagesViewed, metadata.page]
        : prev.pagesViewed;

      const updatedCart = [...prev.cart];
      if (actionType === 'cart_add' && metadata?.product) {
        const existingIdx = updatedCart.findIndex(i => i.product.id === metadata.product?.id);
        if (existingIdx >= 0) {
          updatedCart[existingIdx].quantity += 1;
        } else {
          updatedCart.push({ product: metadata.product, quantity: 1, selectedSize: 'UK 9', selectedColor: metadata.product.variants.colors[0] });
        }
      }

      const tempVisitor: Visitor = {
        ...prev,
        currentPage: metadata?.page || prev.currentPage,
        cart: updatedCart,
        pagesViewed: updatedPages,
        actions: updatedActions,
        lastSeen: 'Just now'
      };

      const { score, level, signalBreakdown } = calculateIntentScore(tempVisitor);
      tempVisitor.intentScore = score;
      tempVisitor.intentLevel = level;
      tempVisitor.signalBreakdown = signalBreakdown;

      // Evaluate proactive trigger rules
      const triggerResult = TriggerEngine.evaluate(tempVisitor, triggers, campaigns);
      if (triggerResult.shouldIntervene && triggerResult.rule) {
        tempVisitor.interventionTriggered = {
          type: triggerResult.rule.type,
          message: triggerResult.customMessage || triggerResult.rule.aiProactiveMessage,
          timestamp: 'Just now',
          status: 'shown',
          couponAttached: triggerResult.attachedCoupon
        };

        // Update trigger metrics
        setTriggers(curr =>
          curr.map(t =>
            t.id === triggerResult.rule?.id
              ? { ...t, performance: { ...t.performance, shown: t.performance.shown + 1 } }
              : t
          )
        );

        // Display proactive callout on widget
        setActiveProactiveCallout({
          rule: triggerResult.rule,
          message: triggerResult.customMessage || triggerResult.rule.aiProactiveMessage,
          quickReplies: triggerResult.quickReplies || triggerResult.rule.quickReplies,
          coupon: triggerResult.couponOffer,
          actionType: triggerResult.actionType,
          attachedCoupon: triggerResult.attachedCoupon
        });
      }

      return tempVisitor;
    });

    // Update real-time visitors stream
    setVisitors(prevVisitors => {
      const exists = prevVisitors.findIndex(v => v.id === activeVisitor.id);
      if (exists >= 0) {
        const copy = [...prevVisitors];
        copy[exists] = { ...copy[exists], actions: [newAction, ...copy[exists].actions], lastSeen: 'Just now' };
        return copy;
      }
      return [activeVisitor, ...prevVisitors];
    });
  };

  // Chat message submission
  const sendChatMessage = async (content: string) => {
    if (!content.trim()) return;

    const userMsg: ChatMessage = {
      id: `msg_${Date.now()}`,
      sender: 'user',
      content,
      timestamp: 'Just now'
    };

    setChatMessages(prev => [...prev, userMsg]);
    setIsAiTyping(true);

    // Track chat engagement
    trackVisitorEvent('chat_open', `Visitor messaged AI: "${content}"`);

    try {
      const aiResponse = await AISalesAgent.generateResponse(content, {
        visitor: activeVisitor,
        business: businessProfile,
        products,
        activeCampaigns: campaigns,
        conversationHistory: chatMessages
      });

      const assistantMsg: ChatMessage = {
        id: `ai_${Date.now()}`,
        sender: 'assistant',
        content: aiResponse.message,
        timestamp: 'Just now',
        productCards: aiResponse.recommendedProducts,
        quickReplies: aiResponse.quickReplies,
        couponCode: aiResponse.couponCode,
        showLeadForm: aiResponse.showLeadForm
      };

      setChatMessages(prev => [...prev, assistantMsg]);
    } catch (e) {
      console.error('Error generating AI response:', e);
    } finally {
      setIsAiTyping(false);
    }
  };

  // Submit Lead from widget
  const submitLead = (leadData: { name: string; email: string; phone: string; requirement: string }) => {
    const newLead: Lead = {
      id: `lead-${Date.now()}`,
      visitorId: activeVisitor.id,
      name: leadData.name,
      email: leadData.email,
      phone: leadData.phone,
      requirement: leadData.requirement || 'Interested in footwear consultation',
      interestedProduct: products[0].name,
      intentScore: Math.max(activeVisitor.intentScore, 85),
      intentLevel: 'hot',
      status: 'new',
      createdAt: 'Just now'
    };

    setLeads(prev => [newLead, ...prev]);

    setChatMessages(prev => [
      ...prev,
      {
        id: `sys_${Date.now()}`,
        sender: 'assistant',
        content: `🎉 Thank you **${leadData.name}**! Our senior footwear specialist will call you at **${leadData.phone}** within 30 minutes.`,
        timestamp: 'Just now'
      }
    ]);
  };

  // Apply Coupon code
  const applyCouponToCart = (code: string): boolean => {
    const normalized = code.trim().toUpperCase();
    const campaign = campaigns.find(c => c.code.toUpperCase() === normalized && c.isActive);
    if (campaign) {
      trackVisitorEvent('cart_add', `Applied coupon code ${campaign.code} (${campaign.discountPercentage}% off)`);
      setCampaigns(prev =>
        prev.map(c => (c.id === campaign.id ? { ...c, redemptions: c.redemptions + 1 } : c))
      );
      return true;
    }
    return false;
  };

  // Complete checkout & record conversion attribution
  const completeCheckout = () => {
    const cartTotal = activeVisitor.cart.reduce((sum, item) => sum + item.product.price * item.quantity, 0) || 2799;

    confetti({
      particleCount: 120,
      spread: 70,
      origin: { y: 0.6 }
    });

    trackVisitorEvent('purchase', `Completed Order for ₹${cartTotal.toLocaleString()}`, { value: cartTotal });

    setActiveVisitor(prev => ({
      ...prev,
      cart: [],
      intentScore: 100,
      intentLevel: 'hot'
    }));

    // Update A/B Experiment & ROI metrics
    setExperiment(prev => {
      const newVariantConversions = prev.variant.conversions + 1;
      const newVariantRev = prev.variant.totalRevenue + cartTotal;
      const newVariantCVR = (newVariantConversions / prev.variant.visitors) * 100;
      const lift = ((newVariantCVR - prev.control.conversionRate) / prev.control.conversionRate) * 100;

      return {
        ...prev,
        variant: {
          ...prev.variant,
          conversions: newVariantConversions,
          totalRevenue: newVariantRev,
          conversionRate: parseFloat(newVariantCVR.toFixed(2)),
          aov: Math.round(newVariantRev / newVariantConversions)
        },
        conversionLiftPercent: parseFloat(lift.toFixed(1)),
        revenueLiftAmount: newVariantRev - prev.control.totalRevenue
      };
    });

    // Update active trigger performance if engaged
    if (activeVisitor.interventionTriggered) {
      setTriggers(prev =>
        prev.map(t =>
          t.type === activeVisitor.interventionTriggered?.type
            ? {
                ...t,
                performance: {
                  ...t.performance,
                  conversions: t.performance.conversions + 1,
                  revenue: t.performance.revenue + cartTotal
                }
              }
            : t
        )
      );
    }
  };

  // Trigger CRUD Actions
  const toggleTrigger = (triggerId: string) => {
    setTriggers(prev =>
      prev.map(t => (t.id === triggerId ? { ...t, enabled: !t.enabled } : t))
    );
  };

  const createTrigger = (rule: TriggerRule) => {
    setTriggers(prev => [rule, ...prev]);
  };

  const updateTrigger = (rule: TriggerRule) => {
    setTriggers(prev => prev.map(t => (t.id === rule.id ? rule : t)));
  };

  const deleteTrigger = (triggerId: string) => {
    setTriggers(prev => prev.filter(t => t.id !== triggerId));
  };

  // Manual Intervention Push directly from Dashboard
  const manualPushIntervention = (
    visitorId: string,
    message: string,
    type: TriggerActionType,
    coupon?: string
  ) => {
    const interventionPayload = {
      message,
      actionType: type,
      attachedCoupon: coupon,
      quickReplies: ['View Recommendation', 'Apply Coupon', 'Ask a Question']
    };

    if (activeVisitor.id === visitorId || visitorId === 'active') {
      setActiveVisitor(prev => ({
        ...prev,
        interventionTriggered: {
          type,
          message,
          timestamp: 'Just now',
          status: 'shown',
          couponAttached: coupon
        }
      }));
      setActiveProactiveCallout(interventionPayload);
    }

    setVisitors(prev =>
      prev.map(v =>
        v.id === visitorId
          ? {
              ...v,
              interventionTriggered: {
                type,
                message,
                timestamp: 'Just now',
                status: 'shown',
                couponAttached: coupon
              }
            }
          : v
      )
    );
  };

  // Integrations Management
  const updateIntegration = <K extends keyof IntegrationConfig>(
    key: K,
    config: Partial<IntegrationConfig[K]>
  ) => {
    setIntegrations(prev => ({
      ...prev,
      [key]: {
        ...prev[key],
        ...config
      }
    }));
  };

  const testWebhookDispatch = async (eventType: string): Promise<{ success: boolean; status: number; latencyMs: number }> => {
    const latency = Math.floor(Math.random() * 80) + 80;
    const newDelivery = {
      id: `evt-${Date.now()}`,
      event: eventType,
      status: 200,
      timestamp: 'Just now',
      latencyMs: latency
    };

    setIntegrations(prev => ({
      ...prev,
      webhooks: {
        ...prev.webhooks,
        recentDeliveries: [newDelivery, ...prev.webhooks.recentDeliveries.slice(0, 4)]
      }
    }));

    return { success: true, status: 200, latencyMs: latency };
  };

  // Approve Knowledge Gap
  const approveKnowledgeGap = (gapId: string, customAnswer?: string) => {
    const gap = knowledgeGaps.find(g => g.id === gapId);
    if (!gap) return;

    const answer = customAnswer || gap.suggestedAnswer;

    const newDoc: KnowledgeDocument = {
      id: `doc-${Date.now()}`,
      title: `FAQ: ${gap.question}`,
      type: 'faq',
      status: 'synced',
      lastSynced: 'Just now',
      chunksCount: 2,
      previewText: `Q: ${gap.question}\nA: ${answer}`
    };

    setKnowledgeDocs(prev => [newDoc, ...prev]);
    setKnowledgeGaps(prev => prev.map(g => (g.id === gapId ? { ...g, status: 'approved' } : g)));
  };

  // Simulate Knowledge Sync
  const syncKnowledgeBase = () => {
    setIsSyncingKnowledge(true);
    setTimeout(() => {
      setKnowledgeDocs(prev =>
        prev.map(d => ({
          ...d,
          lastSynced: 'Just now',
          status: 'synced'
        }))
      );
      setIsSyncingKnowledge(false);
    }, 1500);
  };

  const updateSpecialist = (type: SpecialistType) => {
    setBusinessProfile(prev => ({ ...prev, activeSpecialist: type }));
  };

  const resetDemoVisitor = () => {
    setActiveVisitor({
      id: `vis_${Math.random().toString(36).substring(2, 7)}`,
      ipLocation: 'Bengaluru, India',
      device: 'Desktop • Chrome 128',
      browser: 'Chrome 128',
      referrer: 'google.com (Search: "marathon running shoes nitrogen foam")',
      isReturning: false,
      sessionStartTime: Date.now(),
      sessionDurationSec: 0,
      pagesViewed: ['/'],
      currentPage: '/',
      cart: [],
      actions: [
        { id: `init-${Date.now()}`, type: 'page_view', timestamp: 'Just now', details: 'Started fresh browsing session', page: '/' }
      ],
      intentScore: 10,
      intentLevel: 'cold',
      signalBreakdown: [
        { name: 'Initial Landing', points: 10, maxPoints: 30, reason: 'Landed on storefront homepage' }
      ],
      lastSeen: 'Just now'
    });
    setActiveProactiveCallout(null);
    setChatMessages([
      {
        id: 'welcome-msg-new',
        sender: 'assistant',
        content: `Hey there! Welcome to **Convora AI** on AuraFit Luxe. Looking for marathon running shoes, all-day walking sneakers, or help with sizing?`,
        timestamp: 'Just now',
        quickReplies: ['Recommend running shoes', 'Help with sizing', 'View 7-day return policy', 'Current offers']
      }
    ]);
  };

  return (
    <AppContext.Provider
      value={{
        user,
        loginUser,
        logoutUser,
        businessProfile,
        setBusinessProfile,
        products,
        setProducts,
        triggers,
        setTriggers,
        campaigns,
        setCampaigns,
        leads,
        setLeads,
        knowledgeDocs,
        setKnowledgeDocs,
        knowledgeGaps,
        setKnowledgeGaps,
        experiment,
        setExperiment,
        visitors,
        setVisitors,
        activeVisitor,
        setActiveVisitor,
        integrations,
        setIntegrations,
        viewMode,
        setViewMode,
        activeTab,
        setActiveTab,
        isWidgetOpen,
        setIsWidgetOpen,
        chatMessages,
        setChatMessages,
        activeProactiveCallout,
        setActiveProactiveCallout,
        isAiTyping,
        trackVisitorEvent,
        sendChatMessage,
        submitLead,
        applyCouponToCart,
        completeCheckout,
        approveKnowledgeGap,
        syncKnowledgeBase,
        isSyncingKnowledge,
        toggleTrigger,
        createTrigger,
        updateTrigger,
        deleteTrigger,
        manualPushIntervention,
        updateIntegration,
        testWebhookDispatch,
        updateSpecialist,
        resetDemoVisitor
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};
