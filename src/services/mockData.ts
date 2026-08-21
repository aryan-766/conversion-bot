import {
  Product,
  TriggerRule,
  Campaign,
  Lead,
  KnowledgeDocument,
  KnowledgeGap,
  ABExperiment,
  Visitor,
  BusinessProfile,
  IntegrationConfig
} from '../types';

export const initialBusinessProfile: BusinessProfile = {
  name: 'AuraFit Luxe',
  url: 'https://aurafit-luxe.in',
  primaryCategory: 'Performance Footwear & Athletic Apparel',
  currency: 'INR',
  activeSpecialist: 'sales',
  brandVoice: 'Authoritative, consultative, energetic, and conversion-focused.'
};

export const initialProducts: Product[] = [
  {
    id: 'prod-1',
    name: 'Aura CloudStrider Pro Max',
    price: 2799,
    originalPrice: 4499,
    category: 'Running Shoes',
    image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=800&q=80',
    description: 'Flagship carbon-plated marathon shoes with dual-density nitrogen foam delivering 85% energy return. Engineered for long-distance endurance and zero fatigue.',
    features: [
      'Dual-Density Nitrogen Bounce Foam',
      'Carbon Composite Propulsion Plate',
      'Breathable Jacquard Micro-Mesh',
      'High-Traction Anti-Slip Rubber Sole'
    ],
    bestFor: 'Marathon running, road racing, long-distance training',
    rating: 4.9,
    reviewCount: 342,
    variants: {
      sizes: ['UK 6', 'UK 7', 'UK 8', 'UK 9', 'UK 10', 'UK 11'],
      colors: ['Midnight Obsidian', 'Hyper Silver', 'Neon Ember']
    },
    inventoryCount: 48,
    sku: 'AUR-CS-MAX-01'
  },
  {
    id: 'prod-2',
    name: 'Aura AeroGlide Daily Sneaker',
    price: 1999,
    originalPrice: 3299,
    category: 'Daily Sneakers',
    image: 'https://images.unsplash.com/photo-1608231387042-66d1773070a5?auto=format&fit=crop&w=800&q=80',
    description: 'Featherlight lifestyle sneaker with memory foam insoles. Slip-on design with elasticated knit upper for 14-hour continuous standing comfort.',
    features: [
      'CloudFoam 3D Arch Support',
      'Seamless Stretch Knit Upper',
      'Anti-Odor Bamboo Insole Liner',
      'Shock-Absorbing Flex Outsole'
    ],
    bestFor: 'Daily commute, casual office, 10k+ daily step walking',
    rating: 4.8,
    reviewCount: 218,
    variants: {
      sizes: ['UK 6', 'UK 7', 'UK 8', 'UK 9', 'UK 10'],
      colors: ['Stealth Graphite', 'Chalk White', 'Slate Blue']
    },
    inventoryCount: 72,
    sku: 'AUR-AG-DLY-02'
  },
  {
    id: 'prod-3',
    name: 'Aura ApexTrail All-Terrain Boot',
    price: 3499,
    originalPrice: 5999,
    category: 'Outdoor & Trekking',
    image: 'https://images.unsplash.com/photo-1520639888713-7851133b1ed0?auto=format&fit=crop&w=800&q=80',
    description: 'Heavy-duty water-resistant hiking shoe with Vibram deep-lug grip. Reinforced rubber toe cap and ankle stability lock for rugged mountain terrains.',
    features: [
      'HydroShield Water-Resistant Membrane',
      'Vibram Deep-Traction Lugged Grip',
      'Ankle Armor Stability Chassis',
      'Quick-Tie Kevlar Lacing'
    ],
    bestFor: 'Mountain trekking, trail running, wet monsoon trails',
    rating: 4.9,
    reviewCount: 164,
    variants: {
      sizes: ['UK 7', 'UK 8', 'UK 9', 'UK 10', 'UK 11'],
      colors: ['Earth Khaki', 'Black Forest', 'Volcano Charcoal']
    },
    inventoryCount: 35,
    sku: 'AUR-AT-TRK-03'
  },
  {
    id: 'prod-4',
    name: 'Aura SwiftStride Slip-On',
    price: 1499,
    originalPrice: 2499,
    category: 'Slip-On & Casual',
    image: 'https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?auto=format&fit=crop&w=800&q=80',
    description: 'Hands-free easy-entry slip-on shoe for airport travel, driving, and quick errands. Features adaptive heel lock and washable footbed.',
    features: [
      'Hands-Free Step-In Heel',
      'Adaptive Memory-Cushion Foam',
      'Machine Washable Footbed',
      'Non-Marking Outsole'
    ],
    bestFor: 'Travel, post-workout recovery, errands',
    rating: 4.7,
    reviewCount: 129,
    variants: {
      sizes: ['UK 6', 'UK 7', 'UK 8', 'UK 9', 'UK 10'],
      colors: ['Charcoal Black', 'Sand Dune', 'Olive Mist']
    },
    inventoryCount: 80,
    sku: 'AUR-SS-SLP-04'
  }
];

export const initialTriggers: TriggerRule[] = [
  {
    id: 'trig-1',
    name: 'PDP Sizing Hesitation & Fit Doubts',
    description: 'Detects visitors dwelling on a shoe product page for >35s or opening the size guide without adding to cart.',
    type: 'chat_callout',
    enabled: true,
    priority: 1,
    conditions: {
      minIntentScore: 40,
      minDwellTimeSec: 35,
      sizeGuideOpened: true
    },
    aiProactiveMessage: "Hey! Confused between UK 8 or UK 9? Our shoes fit true-to-size, and we offer a 100% Free Doorstep Size Exchange if it's not perfect!",
    quickReplies: ['Help me with Sizing', 'What is your Exchange Policy?', 'Show Running Shoes'],
    cooldownMinutes: 8,
    performance: {
      shown: 1420,
      engaged: 618,
      conversions: 184,
      revenue: 514816
    }
  },
  {
    id: 'trig-2',
    name: 'Exit Intent Cart Recovery',
    description: 'Fires instantly when a visitor with items in cart moves cursor rapidly toward the tab close/URL bar.',
    type: 'scarcity_drawer',
    enabled: true,
    priority: 2,
    conditions: {
      minIntentScore: 65,
      exitIntentDetected: true,
      minCartValue: 1500
    },
    aiProactiveMessage: "Wait! Complete your order right now and get an extra 10% OFF with code SAVE10 + Free Express Courier Delivery.",
    quickReplies: ['Apply Coupon SAVE10', 'Shipping Time?', 'Continue Shopping'],
    attachedCoupon: 'SAVE10',
    cooldownMinutes: 15,
    performance: {
      shown: 980,
      engaged: 442,
      conversions: 139,
      revenue: 388921
    }
  },
  {
    id: 'trig-3',
    name: 'Multi-Product Comparison Paralysis',
    description: 'Triggers when a visitor views 3 or more shoe PDPs in the same session without deciding.',
    type: 'chat_callout',
    enabled: true,
    priority: 3,
    conditions: {
      minIntentScore: 50,
      productViewsCount: 3
    },
    aiProactiveMessage: "Comparing our sneakers? Tell me if you need shoes for daily running, gym workouts, or casual office wear — I'll pick your exact match!",
    quickReplies: ['Marathon / Running', 'Daily Office Comfort', 'Trekking / Outdoor'],
    cooldownMinutes: 10,
    performance: {
      shown: 750,
      engaged: 310,
      conversions: 88,
      revenue: 246312
    }
  },
  {
    id: 'trig-4',
    name: 'VIP High-Ticket Lead Capture',
    description: 'Fires when cart value exceeds ₹5,000 or customer shows bulk buying interest.',
    type: 'vip_lead_modal',
    enabled: true,
    priority: 4,
    conditions: {
      minIntentScore: 80,
      minCartValue: 5000
    },
    aiProactiveMessage: "You qualify for our VIP Athlete Consultation! Request a 30-min call with our senior sports podiatrist before your order ships.",
    quickReplies: ['Book VIP Call', 'View Sole Warranty', 'No thanks'],
    cooldownMinutes: 20,
    performance: {
      shown: 320,
      engaged: 184,
      conversions: 62,
      revenue: 216938
    }
  },
  {
    id: 'trig-5',
    name: 'WhatsApp Abandoned Cart 15-Min Recovery',
    description: 'Triggers an automated WhatsApp recovery message with 1-click checkout link 15 minutes after session abandonment.',
    type: 'whatsapp_recovery',
    enabled: true,
    priority: 5,
    conditions: {
      minIntentScore: 70,
      cartAbandonedSec: 900,
      minCartValue: 1500
    },
    aiProactiveMessage: "Your AuraFit cart is waiting! We saved your sizes with an exclusive 10% coupon. Tap to complete checkout.",
    attachedCoupon: 'SAVE10',
    cooldownMinutes: 60,
    performance: {
      shown: 412,
      engaged: 290,
      conversions: 94,
      revenue: 263106
    }
  }
];

export const initialCampaigns: Campaign[] = [
  {
    id: 'camp-1',
    name: 'First-Time Shopper Special',
    code: 'FIRSTFIT',
    discountPercentage: 15,
    conditions: {
      minIntentScore: 50,
      minCartAmount: 1999,
      firstOrderOnly: true
    },
    startDate: '2026-08-01',
    endDate: '2026-09-30',
    isActive: true,
    redemptions: 342,
    revenueInfluenced: 957258
  },
  {
    id: 'camp-2',
    name: 'Exit Intent Cart Recovery',
    code: 'SAVE10',
    discountPercentage: 10,
    conditions: {
      minIntentScore: 65,
      minCartAmount: 1500,
      firstOrderOnly: false
    },
    startDate: '2026-08-01',
    endDate: '2026-09-30',
    isActive: true,
    redemptions: 512,
    revenueInfluenced: 1433088
  }
];

export const initialLeads: Lead[] = [
  {
    id: 'lead-1',
    name: 'Vikram Malhotra',
    phone: '+91 98201 44521',
    email: 'vikram.m@corporaterun.in',
    visitorId: 'v-8942',
    intentScore: 88,
    intentLevel: 'hot',
    interestedProduct: 'Aura CloudStrider Pro Max',
    requirement: 'Bulk order inquiry for 25 marathon runners for Mumbai Half Marathon corporate relay.',
    createdAt: '12 minutes ago',
    status: 'new'
  },
  {
    id: 'lead-2',
    name: 'Sneha Kulkarni',
    phone: '+91 97412 88901',
    email: 'sneha.k@gmail.com',
    visitorId: 'v-8919',
    intentScore: 78,
    intentLevel: 'hot',
    interestedProduct: 'Aura ApexTrail All-Terrain Boot',
    requirement: 'Wanted custom fit recommendation for wide feet hiking in Ladakh next week.',
    createdAt: '45 minutes ago',
    status: 'contacted'
  },
  {
    id: 'lead-3',
    name: 'Rohit Sharma',
    phone: '+91 99881 22314',
    email: 'rohit.s@techpace.com',
    visitorId: 'v-8874',
    intentScore: 74,
    intentLevel: 'high_intent',
    interestedProduct: 'Aura AeroGlide Daily Sneaker',
    requirement: 'Inquired about orthopedic arch support for standing desk work.',
    createdAt: '2 hours ago',
    status: 'converted'
  }
];

export const initialKnowledgeDocs: KnowledgeDocument[] = [
  {
    id: 'doc-1',
    title: 'Website Crawl: aurafit-luxe.in (Full Sitemap)',
    type: 'website',
    sourceUrl: 'https://aurafit-luxe.in/sitemap.xml',
    status: 'synced',
    lastSynced: '4 minutes ago',
    chunksCount: 142,
    previewText: 'Brand catalog, performance footwear specifications, nitrogen foam engineering, size matrix, and checkout flows.'
  },
  {
    id: 'doc-2',
    title: '7-Day Return & Size Exchange Policy v3.2',
    type: 'policy',
    status: 'synced',
    lastSynced: '10 minutes ago',
    chunksCount: 24,
    previewText: '100% Free Doorstep Pickup Size Exchange within 7 days. If the shoe does not fit, courier picks up with zero exchange fee and instant refund or swap.'
  },
  {
    id: 'doc-3',
    title: 'Domestic Shipping & Delivery Guide (Delhivery & BlueDart)',
    type: 'policy',
    status: 'synced',
    lastSynced: '15 minutes ago',
    chunksCount: 18,
    previewText: 'Orders dispatched in 24 hours. Metro deliveries arrive in 2-3 business days. Non-metro pin codes 3-5 days. Real-time SMS tracking provided.'
  },
  {
    id: 'doc-4',
    title: 'Footwear Fit, Arch Support & Sizing Matrix',
    type: 'faq',
    status: 'synced',
    lastSynced: '1 hour ago',
    chunksCount: 36,
    previewText: 'UK/India sizing conversion. Guidance for wide feet, flat arches, plantar fasciitis, and high-impact marathon running.'
  }
];

export const initialKnowledgeGaps: KnowledgeGap[] = [
  {
    id: 'gap-1',
    question: 'Do you ship to UAE (Dubai / Abu Dhabi)?',
    frequency: 48,
    firstAsked: '2 days ago',
    lastAsked: '18 minutes ago',
    suggestedAnswer: 'Yes! We ship to UAE via DHL Express (3-5 business days) with a flat shipping fee of ₹999 on international orders.',
    status: 'detected'
  },
  {
    id: 'gap-2',
    question: 'Can I wash CloudStrider running shoes in a washing machine?',
    frequency: 31,
    firstAsked: '3 days ago',
    lastAsked: '1 hour ago',
    suggestedAnswer: 'We recommend gentle cold hand washing with mild detergent. Remove insoles before cleaning and air dry away from direct scorching heat.',
    status: 'detected'
  }
];

export const initialExperiment: ABExperiment = {
  name: 'Autonomous AI Sales Layer vs Pure Control (50/50 Traffic Split)',
  status: 'running',
  startDate: '2026-08-01',
  control: {
    name: 'Control (Standard Passive Storefront)',
    visitors: 14210,
    conversions: 355,
    conversionRate: 2.50,
    totalRevenue: 993645,
    aov: 2799
  },
  variant: {
    name: 'Variant B (Convora Proactive Sales Layer Active)',
    visitors: 14211,
    conversions: 434,
    conversionRate: 3.05,
    totalRevenue: 1214766,
    aov: 2799
  },
  conversionLiftPercent: 22.2,
  revenueLiftAmount: 221121,
  statisticalSignificance: 98.6
};

export const initialVisitors: Visitor[] = [
  {
    id: 'v-8942',
    ipLocation: 'Mumbai, Maharashtra',
    device: 'Desktop • Chrome Mac',
    browser: 'Chrome 128',
    referrer: 'google.com (Search: "marathon running shoes nitrogen foam")',
    isReturning: false,
    intentScore: 88,
    intentLevel: 'hot',
    signalBreakdown: [
      { name: 'PDP Dwell Time', points: 30, maxPoints: 30, reason: 'Dwelt 140s on CloudStrider Pro Max PDP' },
      { name: 'Size & Metric Inspection', points: 25, maxPoints: 25, reason: 'Inspected UK 9 & opened Size Guide' },
      { name: 'Cart Item Added', points: 20, maxPoints: 25, reason: 'Added 1 item valued at ₹2,799' },
      { name: 'Exit Acceleration', points: 13, maxPoints: 20, reason: 'Cursor accelerated toward tab close' }
    ],
    currentPage: '/products/prod-1',
    pagesViewed: ['/products/prod-1', '/cart'],
    sessionStartTime: Date.now() - 240000,
    sessionDurationSec: 240,
    cart: [
      {
        product: initialProducts[0],
        quantity: 1,
        selectedSize: 'UK 9',
        selectedColor: 'Midnight Obsidian'
      }
    ],
    actions: [
      { id: 'a1', type: 'page_view', timestamp: '3m ago', details: 'Landed on CloudStrider Pro Max PDP', page: '/products/prod-1' },
      { id: 'a2', type: 'size_guide_open', timestamp: '2m ago', details: 'Inspected UK 9 in size guide modal' },
      { id: 'a3', type: 'cart_add', timestamp: '1m ago', details: 'Added 1 pair of CloudStrider Pro Max to Cart' },
      { id: 'a4', type: 'exit_intent', timestamp: '30s ago', details: 'Cursor accelerated toward tab close' }
    ],
    lastSeen: 'Just now',
    interventionTriggered: {
      type: 'scarcity_drawer',
      message: 'Wait! Complete your order right now and get an extra 10% OFF with code SAVE10 + Free Express Courier Delivery.',
      timestamp: '30s ago',
      status: 'shown',
      couponAttached: 'SAVE10'
    }
  },
  {
    id: 'v-8938',
    ipLocation: 'Bengaluru, Karnataka',
    device: 'Mobile • iPhone 15 Safari',
    browser: 'Safari iOS',
    referrer: 'instagram.com (AuraFit Story Ad: Marathon Launch)',
    isReturning: true,
    intentScore: 78,
    intentLevel: 'hot',
    signalBreakdown: [
      { name: 'Returning Customer', points: 25, maxPoints: 25, reason: '2nd visit in last 48 hours' },
      { name: 'Multi-Product Compare', points: 25, maxPoints: 25, reason: 'Viewed 3 different running models' },
      { name: 'Review Scroll Depth', points: 18, maxPoints: 20, reason: 'Scrolled 90% down customer reviews' },
      { name: 'Dwell Time', points: 10, maxPoints: 30, reason: 'Dwelt 65s on AeroGlide PDP' }
    ],
    currentPage: '/products/prod-2',
    pagesViewed: ['/products/prod-1', '/products/prod-2', '/products/prod-3'],
    sessionStartTime: Date.now() - 360000,
    sessionDurationSec: 360,
    cart: [],
    actions: [
      { id: 'b1', type: 'page_view', timestamp: '6m ago', details: 'Landed on CloudStrider Pro Max' },
      { id: 'b2', type: 'page_view', timestamp: '4m ago', details: 'Navigated to ApexTrail Trekking Boot' },
      { id: 'b3', type: 'page_view', timestamp: '2m ago', details: 'Navigated to AeroGlide Daily Sneaker' },
      { id: 'b4', type: 'review_view', timestamp: '1m ago', details: 'Scrolled to verified customer reviews' }
    ],
    lastSeen: '1m ago',
    interventionTriggered: {
      type: 'chat_callout',
      message: "Comparing our sneakers? Tell me if you need shoes for daily running, gym workouts, or casual office wear — I'll pick your exact match!",
      timestamp: '1m ago',
      status: 'clicked'
    }
  },
  {
    id: 'v-8924',
    ipLocation: 'Delhi NCR',
    device: 'Desktop • Windows Edge',
    browser: 'Edge 126',
    referrer: 'google.com (Organic)',
    isReturning: false,
    intentScore: 56,
    intentLevel: 'high_intent',
    signalBreakdown: [
      { name: 'PDP Dwell Time', points: 20, maxPoints: 30, reason: 'Dwelt 55s on Trail Boot PDP' },
      { name: 'Size Guide Open', points: 20, maxPoints: 25, reason: 'Opened size guide' },
      { name: 'Product View', points: 16, maxPoints: 20, reason: 'Examined high-traction lugs' }
    ],
    currentPage: '/products/prod-3',
    pagesViewed: ['/products/prod-3'],
    sessionStartTime: Date.now() - 180000,
    sessionDurationSec: 180,
    cart: [],
    actions: [
      { id: 'c1', type: 'page_view', timestamp: '3m ago', details: 'Viewed ApexTrail All-Terrain Boot' },
      { id: 'c2', type: 'size_guide_open', timestamp: '1m ago', details: 'Opened sizing matrix' }
    ],
    lastSeen: '2m ago'
  },
  {
    id: 'v-8910',
    ipLocation: 'Pune, Maharashtra',
    device: 'Mobile • Android Chrome',
    browser: 'Chrome Mobile',
    referrer: 'direct',
    isReturning: false,
    intentScore: 22,
    intentLevel: 'cold',
    signalBreakdown: [
      { name: 'Homepage Land', points: 12, maxPoints: 30, reason: 'Browsed homepage for 20s' },
      { name: 'Scroll Depth', points: 10, maxPoints: 20, reason: 'Scrolled 30% of homepage' }
    ],
    currentPage: '/',
    pagesViewed: ['/'],
    sessionStartTime: Date.now() - 60000,
    sessionDurationSec: 60,
    cart: [],
    actions: [
      { id: 'd1', type: 'page_view', timestamp: '1m ago', details: 'Browsed storefront homepage' }
    ],
    lastSeen: '3m ago'
  }
];

export const initialIntegrations: IntegrationConfig = {
  shopify: {
    connected: true,
    shopDomain: 'aurafit-luxe.myshopify.com',
    autoSyncCatalog: true,
    trackCartTokens: true,
    lastSynced: '12 minutes ago'
  },
  whatsapp: {
    enabled: true,
    phoneNumberId: 'phone_919876543210',
    wabaId: 'waba_994821049281',
    autoRecoveryDelayMinutes: 15,
    templateName: 'aurafit_cart_recovery_v2',
    status: 'connected'
  },
  crm: {
    provider: 'hubspot',
    apiKeyConfigured: true,
    autoSyncHighIntent: true,
    intentThreshold: 75
  },
  logistics: {
    provider: 'delhivery',
    livePincodeCheck: true,
    autoTrackingLookup: true
  },
  webhooks: {
    endpointUrl: 'https://api.merchantstore.com/v1/convora-events',
    secretKey: 'whsec_99x82103847a98c764e2',
    eventsSubscribed: [
      'visitor.high_intent',
      'trigger.intervened',
      'lead.captured',
      'order.assisted',
      'knowledge_gap.detected'
    ],
    recentDeliveries: [
      {
        id: 'evt-991',
        event: 'order.assisted',
        status: 200,
        timestamp: '4 mins ago',
        latencyMs: 142
      },
      {
        id: 'evt-990',
        event: 'lead.captured',
        status: 200,
        timestamp: '18 mins ago',
        latencyMs: 98
      },
      {
        id: 'evt-989',
        event: 'trigger.intervened',
        status: 200,
        timestamp: '32 mins ago',
        latencyMs: 115
      }
    ]
  }
};
