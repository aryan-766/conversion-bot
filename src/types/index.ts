export type IntentLevel = 'Cold' | 'Interested' | 'High Intent' | 'Hot';

export type SpecialistType = 'sales' | 'advisor' | 'lead' | 'support' | 'custom';

export interface Product {
  id: string;
  name: string;
  price: number;
  originalPrice?: number;
  rating: number;
  reviewCount: number;
  category: string;
  image: string;
  url: string;
  inStock: boolean;
  description: string;
  variants: {
    sizes: string[];
    colors: string[];
  };
  features: string[];
  bestFor: string;
}

export interface VisitorAction {
  id: string;
  type: 'page_view' | 'product_view' | 'size_guide_open' | 'review_view' | 'cart_add' | 'cart_remove' | 'checkout_start' | 'exit_intent' | 'chat_open' | 'coupon_applied' | 'purchase';
  timestamp: string;
  details: string;
  page?: string;
  productName?: string;
  value?: number;
}

export interface Visitor {
  id: string;
  ipLocation: string;
  device: string;
  firstSeen: string;
  lastSeen: string;
  isReturning: boolean;
  sessionDurationSec: number;
  pagesViewed: string[];
  currentPage: string;
  currentProduct?: Product;
  cart: {
    product: Product;
    quantity: number;
    selectedSize?: string;
    selectedColor?: string;
  }[];
  actions: VisitorAction[];
  intentScore: number;
  intentLevel: IntentLevel;
  interventionTriggered?: {
    type: string;
    message: string;
    timestamp: string;
    status: 'shown' | 'engaged' | 'dismissed' | 'converted';
  };
  hasPurchased?: boolean;
  purchasedAmount?: number;
}

export interface TriggerRule {
  id: string;
  name: string;
  enabled: boolean;
  type: 'hesitation' | 'comparison' | 'exit_intent' | 'cart_hesitation' | 'return_visitor' | 'high_intent_custom';
  description: string;
  conditions: {
    minIntentScore?: number;
    pageType?: 'product' | 'category' | 'cart' | 'any';
    minDwellTimeSec?: number;
    productViewsCount?: number;
    cartMinAmount?: number;
    sizeGuideOpened?: boolean;
    exitIntentDetected?: boolean;
  };
  aiProactiveMessage: string;
  quickReplies: string[];
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
  visitorId: string;
  name: string;
  email: string;
  phone: string;
  requirement: string;
  interestedProduct?: string;
  intentScore: number;
  intentLevel: IntentLevel;
  status: 'new' | 'contacted' | 'converted' | 'lost';
  createdAt: string;
}

export interface KnowledgeDocument {
  id: string;
  title: string;
  type: 'website' | 'faq' | 'policy' | 'product_catalog' | 'manual';
  status: 'synced' | 'processing' | 'failed';
  lastSynced: string;
  chunksCount: number;
  url?: string;
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

export interface ExperimentVariant {
  id: 'control' | 'ai_agent';
  name: string;
  trafficPercentage: number;
  visitors: number;
  conversions: number;
  conversionRate: number;
  totalRevenue: number;
  aov: number;
}

export interface ABExperiment {
  id: string;
  name: string;
  status: 'running' | 'completed';
  startDate: string;
  control: ExperimentVariant;
  variant: ExperimentVariant;
  conversionLiftPercent: number;
  revenueLiftAmount: number;
  statisticalSignificance: number; // e.g. 98.4%
}

export interface BusinessProfile {
  name: string;
  url: string;
  type: string;
  tagline: string;
  productsCount: number;
  categoriesCount: number;
  faqsCount: number;
  policiesCount: number;
  brandColors: {
    primary: string;
    accent: string;
  };
  sellingPoints: string[];
  shippingPolicy: string;
  returnPolicy: string;
  activeSpecialist: SpecialistType;
}

export interface ChatMessage {
  id: string;
  sender: 'user' | 'assistant' | 'system';
  content: string;
  timestamp: string;
  productCards?: Product[];
  quickReplies?: string[];
  couponCode?: string;
  showLeadForm?: boolean;
}
