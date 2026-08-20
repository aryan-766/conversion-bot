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
  SpecialistType
} from '../types';
import {
  INITIAL_BUSINESS_PROFILE,
  INITIAL_PRODUCTS,
  INITIAL_TRIGGERS,
  INITIAL_CAMPAIGNS,
  INITIAL_LEADS,
  INITIAL_KNOWLEDGE_DOCS,
  INITIAL_KNOWLEDGE_GAPS,
  INITIAL_EXPERIMENT,
  INITIAL_VISITORS
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
  viewMode: 'landing' | 'dashboard' | 'playground' | 'storefront' | 'split';
  setViewMode: (mode: 'landing' | 'dashboard' | 'playground' | 'storefront' | 'split') => void;
  activeTab: string;
  setActiveTab: (tab: string) => void;
  
  // Storefront & Widget State
  isWidgetOpen: boolean;
  setIsWidgetOpen: (open: boolean) => void;
  chatMessages: ChatMessage[];
  setChatMessages: React.Dispatch<React.SetStateAction<ChatMessage[]>>;
  activeProactiveCallout: { rule: TriggerRule; message: string; quickReplies: string[]; coupon?: Campaign } | null;
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

  const [businessProfile, setBusinessProfile] = useState<BusinessProfile>(INITIAL_BUSINESS_PROFILE);
  const [products, setProducts] = useState<Product[]>(INITIAL_PRODUCTS);
  const [triggers, setTriggers] = useState<TriggerRule[]>(INITIAL_TRIGGERS);
  const [campaigns, setCampaigns] = useState<Campaign[]>(INITIAL_CAMPAIGNS);
  const [leads, setLeads] = useState<Lead[]>(INITIAL_LEADS);
  const [knowledgeDocs, setKnowledgeDocs] = useState<KnowledgeDocument[]>(INITIAL_KNOWLEDGE_DOCS);
  const [knowledgeGaps, setKnowledgeGaps] = useState<KnowledgeGap[]>(INITIAL_KNOWLEDGE_GAPS);
  const [experiment, setExperiment] = useState<ABExperiment>(INITIAL_EXPERIMENT);
  const [visitors, setVisitors] = useState<Visitor[]>(INITIAL_VISITORS);
  
  const [viewMode, setViewMode] = useState<'landing' | 'dashboard' | 'playground' | 'storefront' | 'split'>('landing');
  const [activeTab, setActiveTab] = useState<string>('overview');
  const [isSyncingKnowledge, setIsSyncingKnowledge] = useState<boolean>(false);

  // Live active demo visitor state
  const [activeVisitor, setActiveVisitor] = useState<Visitor>(() => ({
    id: `vis_${Math.random().toString(36).substring(2, 7)}`,
    ipLocation: 'Bengaluru, India',
    device: 'Chrome / Desktop',
    firstSeen: 'Just now',
    lastSeen: 'Just now',
    isReturning: false,
    sessionDurationSec: 10,
    pagesViewed: ['/home'],
    currentPage: '/home',
    cart: [],
    actions: [
      { id: 'init-1', type: 'page_view', timestamp: 'Just now', details: 'Landed on AuraFit Luxe Storefront', page: '/home' }
    ],
    intentScore: 10,
    intentLevel: 'Cold'
  }));

  // Widget & Chat State
  const [isWidgetOpen, setIsWidgetOpen] = useState<boolean>(false);
  const [activeProactiveCallout, setActiveProactiveCallout] = useState<{
    rule: TriggerRule;
    message: string;
    quickReplies: string[];
    coupon?: Campaign;
  } | null>(null);
  const [chatMessages, setChatMessages] = useState<ChatMessage[]>([
    {
      id: 'welcome-msg',
      sender: 'assistant',
      content: `Hey there! Welcome to **AuraFit Luxe**. Looking for marathon running shoes, all-day walking sneakers, or help with sizing?`,
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
        const { score, level } = calculateIntentScore({ ...prev, sessionDurationSec: nextDuration });
        return {
          ...prev,
          sessionDurationSec: nextDuration,
          intentScore: score,
          intentLevel: level
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
      productName: metadata?.product?.name,
      value: metadata?.value
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
          updatedCart.push({ product: metadata.product, quantity: 1, selectedSize: 'UK 9' });
        }
      }

      const tempVisitor: Visitor = {
        ...prev,
        currentPage: metadata?.page || prev.currentPage,
        currentProduct: metadata?.product || prev.currentProduct,
        cart: updatedCart,
        pagesViewed: updatedPages,
        actions: updatedActions,
        lastSeen: 'Just now'
      };

      const { score, level } = calculateIntentScore(tempVisitor);
      tempVisitor.intentScore = score;
      tempVisitor.intentLevel = level;

      // Evaluate proactive trigger rules
      const triggerResult = TriggerEngine.evaluate(tempVisitor, triggers, campaigns);
      if (triggerResult.shouldIntervene && triggerResult.rule) {
        tempVisitor.interventionTriggered = {
          type: triggerResult.rule.name,
          message: triggerResult.customMessage || triggerResult.rule.aiProactiveMessage,
          timestamp: 'Just now',
          status: 'shown'
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
          coupon: triggerResult.couponOffer
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
      interestedProduct: activeVisitor.currentProduct?.name || 'Aura CloudStrider Pro Max',
      intentScore: Math.max(activeVisitor.intentScore, 85),
      intentLevel: 'Hot',
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
      trackVisitorEvent('coupon_applied', `Applied coupon code ${campaign.code} (${campaign.discountPercentage}% off)`);
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
    
    // Confetti celebration
    confetti({
      particleCount: 120,
      spread: 70,
      origin: { y: 0.6 }
    });

    trackVisitorEvent('purchase', `Completed Order for ₹${cartTotal.toLocaleString()}`, { value: cartTotal });

    setActiveVisitor(prev => ({
      ...prev,
      hasPurchased: true,
      purchasedAmount: cartTotal,
      cart: [],
      intentScore: 100,
      intentLevel: 'Hot'
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
          t.name === activeVisitor.interventionTriggered?.type
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

  // Approve Knowledge Gap
  const approveKnowledgeGap = (gapId: string, customAnswer?: string) => {
    const gap = knowledgeGaps.find(g => g.id === gapId);
    if (!gap) return;

    const answer = customAnswer || gap.suggestedAnswer;

    // Add to knowledge documents
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

  const toggleTrigger = (triggerId: string) => {
    setTriggers(prev =>
      prev.map(t => (t.id === triggerId ? { ...t, enabled: !t.enabled } : t))
    );
  };

  const updateSpecialist = (type: SpecialistType) => {
    setBusinessProfile(prev => ({ ...prev, activeSpecialist: type }));
  };

  const resetDemoVisitor = () => {
    setActiveVisitor({
      id: `vis_${Math.random().toString(36).substring(2, 7)}`,
      ipLocation: 'Bengaluru, India',
      device: 'Chrome / Desktop',
      firstSeen: 'Just now',
      lastSeen: 'Just now',
      isReturning: false,
      sessionDurationSec: 0,
      pagesViewed: ['/home'],
      currentPage: '/home',
      cart: [],
      actions: [
        { id: `init-${Date.now()}`, type: 'page_view', timestamp: 'Just now', details: 'Started fresh browsing session', page: '/home' }
      ],
      intentScore: 10,
      intentLevel: 'Cold'
    });
    setActiveProactiveCallout(null);
    setChatMessages([
      {
        id: 'welcome-msg-new',
        sender: 'assistant',
        content: `Hey there! Welcome to **AuraFit Luxe**. Looking for marathon running shoes, all-day walking sneakers, or help with sizing?`,
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
