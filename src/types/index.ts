// Core Data Types for Convora AI Sales Layer

export type IntentLevel = 'cold' | 'interested' | 'high_intent' | 'hot';

export type SpecialistType = 'sales' | 'advisor' | 'lead' | 'support';

export type TriggerActionType =
  | 'chat_callout'
  | 'sticky_pill'
  | 'scarcity_drawer'
  | 'vip_lead_modal'
  | 'whatsapp_recovery';

export interface VisitorAction {
  id: string;
  type: 'page_view' | 'product_view' | 'size_guide_open' | 'cart_add' | 'cart_remove' | 'review_view' | 'price_hover' | 'chat_open' | 'chat_message' | 'purchase' | 'exit_intent' | 'tab_switch' | 'checkout_start';
  timestamp: string;
  details: string;
  page?: string;
  productId?: string;
  productName?: string;
  value?: number;
  metadata?: Record<string, any>;
}

export interface IntentSignalScore {
  name: string;
  points: number;
  maxPoints: number;
  reason: string;
}

export interface CartItem {
  product: Product;
  quantity: number;
  selectedSize?: string;
  selectedColor?: string;
}

export interface Visitor {
  id: string;
  ipLocation: string;
  device: string;
  browser?: string;
  referrer?: string;
  firstSeen?: string;
  isReturning: boolean;
  intentScore: number;
  intentLevel: IntentLevel;
  signalBreakdown: IntentSignalScore[];
  currentPage: string;
  currentProduct?: Product;
  pagesViewed: string[];
  sessionStartTime?: number;
  sessionDurationSec: number;
  cart: CartItem[];
  actions: VisitorAction[];
  lastSeen: string;
  hasPurchased?: boolean;
  purchasedAmount?: number;
  interventionTriggered?: {
    type: TriggerActionType | string;
    message: string;
    timestamp: string;
    status: 'shown' | 'clicked' | 'dismissed' | 'converted';
    couponAttached?: string;
  };
}

export interface ProductVariant {
  sizes: string[];
  colors: string[];
}

export interface Product {
  id: string;
  name: string;
  price: number;
  originalPrice?: number;
  category: string;
  image: string;
  description: string;
  features: string[];
  bestFor: string;
  rating: number;
  reviewCount: number;
  variants: ProductVariant;
  inventoryCount: number;
  sku: string;
}

export interface TriggerCondition {
  minIntentScore?: number;
  minDwellTimeSec?: number;
  productViewsCount?: number;
  sizeGuideOpened?: boolean;
  priceHoverDurationSec?: number;
  cartAbandonedSec?: number;
  exitIntentDetected?: boolean;
  minCartValue?: number;
  targetPageUrlPattern?: string;
  cartContainsCategory?: string;
  pageType?: string;
  cartMinAmount?: number;
}

export interface TriggerRule {
  id: string;
  name: string;
  description: string;
  type: TriggerActionType;
  enabled: boolean;
  priority: number;
  conditions: TriggerCondition;
  aiProactiveMessage: string;
  quickReplies?: string[];
  attachedCoupon?: string;
  cooldownMinutes: number;
  performance: {
    shown: number;
    engaged: number;
    conversions: number;
    revenue: number;
  };
}

export interface Campaign {
  id: string;
  name: string;
  code: string;
  discountPercentage: number;
  conditions: {
    minIntentScore: number;
    minCartAmount: number;
    firstOrderOnly: boolean;
  };
  startDate: string;
  endDate: string;
  isActive: boolean;
  redemptions: number;
  revenueInfluenced: number;
}

export interface Lead {
  id: string;
  name: string;
  phone: string;
  email: string;
  visitorId: string;
  intentScore: number;
  intentLevel: IntentLevel;
  interestedProduct?: string;
  requirement: string;
  createdAt: string;
  status: 'new' | 'contacted' | 'converted' | 'lost';
}

export interface KnowledgeDocument {
  id: string;
  title: string;
  type: 'website' | 'policy' | 'product_catalog' | 'faq' | 'manual';
  sourceUrl?: string;
  status: 'synced' | 'indexing' | 'error';
  lastSynced: string;
  chunksCount: number;
  previewText: string;
}

export interface KnowledgeGap {
  id: string;
  question: string;
  frequency: number;
  firstAsked: string;
  lastAsked: string;
  suggestedAnswer: string;
  status: 'detected' | 'approved' | 'dismissed';
}

export interface ABExperiment {
  name: string;
  status: 'running' | 'paused' | 'concluded';
  startDate: string;
  control: {
    name: string;
    visitors: number;
    conversions: number;
    conversionRate: number;
    totalRevenue: number;
    aov: number;
  };
  variant: {
    name: string;
    visitors: number;
    conversions: number;
    conversionRate: number;
    totalRevenue: number;
    aov: number;
  };
  conversionLiftPercent: number;
  revenueLiftAmount: number;
  statisticalSignificance: number;
}

export interface ChatMessage {
  id: string;
  sender: 'user' | 'assistant' | 'system';
  content: string;
  timestamp: string;
  productCards?: Product[];
  quickReplies?: string[];
  showLeadForm?: boolean;
  couponCode?: string;
}

export interface BusinessProfile {
  name: string;
  url: string;
  primaryCategory: string;
  currency: string;
  activeSpecialist: SpecialistType;
  brandVoice: string;
}

export interface IntegrationConfig {
  shopify: {
    connected: boolean;
    shopDomain: string;
    autoSyncCatalog: boolean;
    trackCartTokens: boolean;
    lastSynced: string;
  };
  whatsapp: {
    enabled: boolean;
    phoneNumberId: string;
    wabaId: string;
    autoRecoveryDelayMinutes: number;
    templateName: string;
    status: 'connected' | 'disconnected';
  };
  crm: {
    provider: 'hubspot' | 'zoho' | 'salesforce' | 'klaviyo' | 'none';
    apiKeyConfigured: boolean;
    autoSyncHighIntent: boolean;
    intentThreshold: number;
  };
  logistics: {
    provider: 'delhivery' | 'shiprocket' | 'bluedart';
    livePincodeCheck: boolean;
    autoTrackingLookup: boolean;
  };
  webhooks: {
    endpointUrl: string;
    secretKey: string;
    eventsSubscribed: string[];
    recentDeliveries: Array<{
      id: string;
      event: string;
      status: number;
      timestamp: string;
      latencyMs: number;
    }>;
  };
}
