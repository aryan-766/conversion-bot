import { Product, TriggerRule, Campaign, Lead, KnowledgeDocument, KnowledgeGap, ABExperiment, BusinessProfile, Visitor } from '../types';

export const INITIAL_BUSINESS_PROFILE: BusinessProfile = {
  name: 'AuraFit Luxe',
  url: 'https://aurafit-luxe.in',
  type: 'D2C Performance & Athleisure Footwear',
  tagline: 'Engineered for relentless comfort, endurance & urban style.',
  productsCount: 24,
  categoriesCount: 6,
  faqsCount: 31,
  policiesCount: 6,
  brandColors: {
    primary: '#10b981',
    accent: '#06b6d4',
  },
  sellingPoints: [
    'CloudStep™ Nitroglycerin Cushioning Foam',
    'Breathable Recycled Oceanic Knit upper',
    'Zero-Friction 7-Day Hassle-Free Exchange & Return',
    'Free Express Courier Shipping across 28,000+ Indian Pincodes',
    '1-Year Anti-Sole Separation Replacement Warranty'
  ],
  shippingPolicy: 'Free standard shipping on all orders over ₹999. Express delivery dispatched within 24 hours. Metro deliveries arrive in 2-3 business days.',
  returnPolicy: 'Easy 7-day pickup return or size exchange. Footwear must be unworn with tags attached. Instant refund to original payment source upon warehouse scan.',
  activeSpecialist: 'sales'
};

export const INITIAL_PRODUCTS: Product[] = [
  {
    id: 'prod-101',
    name: 'Aura CloudStrider Pro Max',
    price: 2799,
    originalPrice: 4499,
    rating: 4.8,
    reviewCount: 342,
    category: 'Running Shoes',
    image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=800&q=80',
    url: '/products/aura-cloudstrider-pro-max',
    inStock: true,
    description: 'Our flagship carbon-infused marathon & marathon training shoe. Featherlight 210g chassis with dual-density CloudStep foam for 85% energy return.',
    variants: {
      sizes: ['UK 6', 'UK 7', 'UK 8', 'UK 9', 'UK 10', 'UK 11'],
      colors: ['Hyper Red / Obsidian', 'Ghost White', 'Stealth Carbon Black']
    },
    features: ['Nitrogen-Infused Midsole', 'Carbon Composite Plate', 'Aerodynamic Mesh', 'Reflective Night Beams'],
    bestFor: 'Daily running, long distance marathons, and high-impact workout sessions.'
  },
  {
    id: 'prod-102',
    name: 'Aura PulseGlide Daily Trainer',
    price: 2199,
    originalPrice: 3499,
    rating: 4.6,
    reviewCount: 189,
    category: 'Daily Sneakers',
    image: 'https://images.unsplash.com/photo-1608231387042-66d1773070a5?auto=format&fit=crop&w=800&q=80',
    url: '/products/aura-pulseglide-daily-trainer',
    inStock: true,
    description: 'Sleek all-day ergonomic walking & lifestyle sneaker. Orthotic arch support prevents heel fatigue during 10,000+ daily steps.',
    variants: {
      sizes: ['UK 6', 'UK 7', 'UK 8', 'UK 9', 'UK 10'],
      colors: ['Triple Black', 'Cream Olive', 'Ice Grey']
    },
    features: ['Orthopedic Arch Contours', 'Slip-on Easy Lacing', 'Water-Resistant Coating', 'Memory Foam Insole'],
    bestFor: 'All-day office wear, travel, urban walking and gym workouts.'
  },
  {
    id: 'prod-103',
    name: 'Aura TrailMaster Waterproof 4X',
    price: 3499,
    originalPrice: 5299,
    rating: 4.9,
    reviewCount: 114,
    category: 'Outdoor & Trekking',
    image: 'https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?auto=format&fit=crop&w=800&q=80',
    url: '/products/aura-trailmaster-waterproof',
    inStock: true,
    description: 'Rugged all-terrain trail beast with Vibram-grade deep lug grip and HydroShield 100% waterproof membrane for rainy hikes and steep gradients.',
    variants: {
      sizes: ['UK 7', 'UK 8', 'UK 9', 'UK 10', 'UK 11'],
      colors: ['Forest Khaki', 'Earth Bronze / Black', 'Steel Grey']
    },
    features: ['HydroShield Waterproof Seal', '4.5mm Deep Traction Lugs', 'Reinforced TPU Toe Guard', 'Anti-Debris Gusseted Tongue'],
    bestFor: 'Monsoon treks, trail runs, camping and rugged gravel terrain.'
  },
  {
    id: 'prod-104',
    name: 'Aura AeroKnit Slip-On Pure',
    price: 1699,
    originalPrice: 2799,
    rating: 4.5,
    reviewCount: 228,
    category: 'Slip-On & Casual',
    image: 'https://images.unsplash.com/photo-1560769629-975ec94e6a86?auto=format&fit=crop&w=800&q=80',
    url: '/products/aura-aeroknit-slip-on',
    inStock: true,
    description: 'Zero-pressure hands-free slip-on shoes. Engineered with 4-way stretch breathable bamboo knit for maximum airflow and barefoot sensation.',
    variants: {
      sizes: ['UK 5', 'UK 6', 'UK 7', 'UK 8', 'UK 9', 'UK 10'],
      colors: ['Charcoal Heather', 'Oatmeal Beige', 'Navy Blue']
    },
    features: ['Hands-Free Step-In Heel', 'Bamboo Charcoal Odor Shield', 'Ultra-Flexible Grooved Sole', 'Machine Washable'],
    bestFor: 'Casual daily outings, lounging, light cardio, driving and travel.'
  },
  {
    id: 'prod-105',
    name: 'Aura FlexTech Compression Tee',
    price: 999,
    originalPrice: 1899,
    rating: 4.7,
    reviewCount: 95,
    category: 'Athletic Wear',
    image: 'https://images.unsplash.com/photo-1581655353564-df123a1eb820?auto=format&fit=crop&w=800&q=80',
    url: '/products/aura-flextech-compression-tee',
    inStock: true,
    description: 'Sweat-wicking micro-mesh athletic tee with targeted muscle compression and anti-odor SilverTech ion treatment.',
    variants: {
      sizes: ['S', 'M', 'L', 'XL', 'XXL'],
      colors: ['Matte Black', 'Slate Blue', 'Crimson Red']
    },
    features: ['Quick-Dry DryFit Tech', 'SilverTech Anti-Odor', 'Flatlock Anti-Chafe Seams', '4-Way Stretch Matrix'],
    bestFor: 'Weightlifting, CrossFit, running and intense training.'
  }
];

export const INITIAL_TRIGGERS: TriggerRule[] = [
  {
    id: 'trig-1',
    name: 'Product Page Hesitation & Fit Doubts',
    enabled: true,
    type: 'hesitation',
    description: 'Fires when visitor stays on PDP >60s and opens size guide or scrolls specs without adding to cart.',
    conditions: {
      pageType: 'product',
      minDwellTimeSec: 60,
      minIntentScore: 40,
      sizeGuideOpened: true
    },
    aiProactiveMessage: 'Not sure about the fit? Most customers find these true-to-size, but I can recommend your exact size based on your current shoes!',
    quickReplies: ['Help me find my size', 'How is the cushioning?', 'What is the return policy?'],
    cooldownMinutes: 10,
    performance: {
      shown: 1820,
      engaged: 462,
      conversions: 118,
      revenue: 330220
    }
  },
  {
    id: 'trig-2',
    name: 'Product Comparison & Decision Paralysis',
    enabled: true,
    type: 'comparison',
    description: 'Fires when visitor views 3+ different products within 4 minutes.',
    conditions: {
      productViewsCount: 3,
      minIntentScore: 50
    },
    aiProactiveMessage: 'Notice you are comparing a few styles! Want me to break down the key differences between CloudStrider and PulseGlide for your use case?',
    quickReplies: ['Compare cushioning & weight', 'Which is best for running?', 'Show customer reviews'],
    cooldownMinutes: 15,
    performance: {
      shown: 940,
      engaged: 288,
      conversions: 74,
      revenue: 198460
    }
  },
  {
    id: 'trig-3',
    name: 'Exit Intent with Cart Abandonment',
    enabled: true,
    type: 'exit_intent',
    description: 'Fires when high-intent visitor with items in cart moves cursor towards exit/tab switch.',
    conditions: {
      exitIntentDetected: true,
      minIntentScore: 65,
      cartMinAmount: 1500
    },
    aiProactiveMessage: 'Before you go! Unlock an extra 10% instant discount with code SAVE10 on your cart today + Free Express Shipping.',
    quickReplies: ['Apply SAVE10 code', 'When will this arrive?', 'Can I pay Cash on Delivery?'],
    cooldownMinutes: 30,
    performance: {
      shown: 2410,
      engaged: 382,
      conversions: 94,
      revenue: 263106
    }
  },
  {
    id: 'trig-4',
    name: 'Cart Hesitation & Shipping Inquiries',
    enabled: true,
    type: 'cart_hesitation',
    description: 'Fires when user is in checkout/cart for >45s with cart value >₹2000.',
    conditions: {
      pageType: 'cart',
      minDwellTimeSec: 45,
      minIntentScore: 70,
      cartMinAmount: 2000
    },
    aiProactiveMessage: 'Ready to checkout? You qualify for Free 48-Hour Priority Dispatch and our 7-Day Zero-Risk Return Guarantee.',
    quickReplies: ['Check delivery to my pincode', 'What payment methods work?', 'Apply available coupons'],
    cooldownMinutes: 20,
    performance: {
      shown: 1150,
      engaged: 310,
      conversions: 104,
      revenue: 289900
    }
  }
];

export const INITIAL_CAMPAIGNS: Campaign[] = [
  {
    id: 'camp-1',
    name: 'Exit Intent Cart Recovery',
    code: 'SAVE10',
    discountPercentage: 10,
    conditions: {
      minIntentScore: 65,
      minCartAmount: 1500,
      firstOrderOnly: false
    },
    startDate: '2026-08-01',
    endDate: '2026-08-31',
    isActive: true,
    redemptions: 142,
    revenueInfluenced: 398200
  },
  {
    id: 'camp-2',
    name: 'First Time Buyer Welcoming Booster',
    code: 'FIRSTFIT',
    discountPercentage: 15,
    conditions: {
      minIntentScore: 50,
      minCartAmount: 2000,
      firstOrderOnly: true
    },
    startDate: '2026-08-10',
    endDate: '2026-09-15',
    isActive: true,
    redemptions: 89,
    revenueInfluenced: 249200
  },
  {
    id: 'camp-3',
    name: 'VIP High Intent Marathon Promo',
    code: 'RUNNER20',
    discountPercentage: 20,
    conditions: {
      minIntentScore: 85,
      minCartAmount: 3000,
      firstOrderOnly: false
    },
    startDate: '2026-08-15',
    endDate: '2026-08-25',
    isActive: true,
    redemptions: 38,
    revenueInfluenced: 132600
  }
];

export const INITIAL_LEADS: Lead[] = [
  {
    id: 'lead-1',
    visitorId: 'vis_8f32a',
    name: 'Vikramaditya Sharma',
    email: 'vikram.sharma91@gmail.com',
    phone: '+91 98201 44829',
    requirement: 'Looking for bulk running shoes (15 pairs) for marathon corporate running club',
    interestedProduct: 'Aura CloudStrider Pro Max',
    intentScore: 92,
    intentLevel: 'Hot',
    status: 'new',
    createdAt: '12 mins ago'
  },
  {
    id: 'lead-2',
    visitorId: 'vis_4c99b',
    name: 'Pooja Deshmukh',
    email: 'pooja.deshmukh@outlook.com',
    phone: '+91 98711 20938',
    requirement: 'Needs custom orthotic sizing consultation for flat feet / plantar fasciitis',
    interestedProduct: 'Aura PulseGlide Daily Trainer',
    intentScore: 84,
    intentLevel: 'Hot',
    status: 'contacted',
    createdAt: '45 mins ago'
  },
  {
    id: 'lead-3',
    visitorId: 'vis_1d83c',
    name: 'Rohan Mehra',
    email: 'rohan.mehra@techcorp.in',
    phone: '+91 99002 11445',
    requirement: 'Wants callback regarding warranty coverage on trail shoes for Himalayan expedition',
    interestedProduct: 'Aura TrailMaster Waterproof 4X',
    intentScore: 78,
    intentLevel: 'High Intent',
    status: 'converted',
    createdAt: '2 hours ago'
  }
];

export const INITIAL_KNOWLEDGE_DOCS: KnowledgeDocument[] = [
  {
    id: 'doc-1',
    title: 'Website Crawl: aurafit-luxe.in',
    type: 'website',
    status: 'synced',
    lastSynced: '4 mins ago',
    chunksCount: 142,
    url: 'https://aurafit-luxe.in/sitemap.xml',
    previewText: 'Indexed 24 products, 6 categories, about us, brand mission, and technical footwear specifications.'
  },
  {
    id: 'doc-2',
    title: '7-Day Return & Size Exchange Policy v3.2',
    type: 'policy',
    status: 'synced',
    lastSynced: '18 mins ago',
    chunksCount: 28,
    previewText: 'Hassle-free doorstep pickup exchange within 7 days. Instant refund or size replacement provided within 48h.'
  },
  {
    id: 'doc-3',
    title: 'Comprehensive Footwear Sizing & Width Chart',
    type: 'faq',
    status: 'synced',
    lastSynced: '1 hour ago',
    chunksCount: 36,
    previewText: 'Detailed metric conversion UK/US/EU, wide-toe recommendations, foot measurement instructions.'
  },
  {
    id: 'doc-4',
    title: 'Domestic & Express Shipping Guide',
    type: 'faq',
    status: 'synced',
    lastSynced: '2 hours ago',
    chunksCount: 19,
    previewText: 'Free shipping on orders above ₹999. BlueDart / Delhivery express courier tracking integration.'
  }
];

export const INITIAL_KNOWLEDGE_GAPS: KnowledgeGap[] = [
  {
    id: 'gap-1',
    question: 'Do you ship to Dubai, UAE or Singapore?',
    frequency: 43,
    firstAsked: '3 days ago',
    lastAsked: '14 mins ago',
    suggestedAnswer: 'Yes! We now offer International Express DHL delivery to UAE and Singapore with flat ₹1,200 shipping (3-5 business days).',
    status: 'detected'
  },
  {
    id: 'gap-2',
    question: 'Can I remove the insoles to put my own custom doctor orthotics?',
    frequency: 28,
    firstAsked: '2 days ago',
    lastAsked: '42 mins ago',
    suggestedAnswer: 'All AuraFit sneakers feature fully removable ergonomically contoured memory foam insoles, allowing direct insertion of doctor-prescribed orthotics.',
    status: 'detected'
  },
  {
    id: 'gap-3',
    question: 'Is Cash on Delivery (COD) available with open-box delivery?',
    frequency: 19,
    firstAsked: '1 day ago',
    lastAsked: '1 hour ago',
    suggestedAnswer: 'COD is available up to ₹5,000 across India. Open box inspection is available in select tier 1 metro pincodes via Delhivery.',
    status: 'detected'
  }
];

export const INITIAL_EXPERIMENT: ABExperiment = {
  id: 'exp-q3-conversion',
  name: 'AI Sales Specialist vs Control (Passive Chatbot)',
  status: 'running',
  startDate: '2026-08-01',
  control: {
    id: 'control',
    name: 'Control (Standard Passive Storefront)',
    trafficPercentage: 50,
    visitors: 14210,
    conversions: 384,
    conversionRate: 2.70,
    totalRevenue: 1074816,
    aov: 2799
  },
  variant: {
    id: 'ai_agent',
    name: 'Variant (AI Conversion Agent with Proactive Interventions)',
    trafficPercentage: 50,
    visitors: 14211,
    conversions: 469,
    conversionRate: 3.30,
    totalRevenue: 1368949,
    aov: 2918
  },
  conversionLiftPercent: 22.2,
  revenueLiftAmount: 294133,
  statisticalSignificance: 98.6
};

export const INITIAL_VISITORS: Visitor[] = [
  {
    id: 'vis_18291',
    ipLocation: 'Bengaluru, India',
    device: 'Chrome / macOS',
    firstSeen: '6 mins ago',
    lastSeen: 'Just now',
    isReturning: true,
    sessionDurationSec: 272,
    pagesViewed: ['/home', '/running-shoes', '/products/aura-cloudstrider-pro-max'],
    currentPage: '/products/aura-cloudstrider-pro-max',
    currentProduct: INITIAL_PRODUCTS[0],
    cart: [{ product: INITIAL_PRODUCTS[0], quantity: 1, selectedSize: 'UK 9', selectedColor: 'Hyper Red / Obsidian' }],
    actions: [
      { id: 'a1', type: 'page_view', timestamp: '6m ago', details: 'Landed on Homepage from Google Search', page: '/home' },
      { id: 'a2', type: 'page_view', timestamp: '4m ago', details: 'Browsed Running Shoes Category', page: '/running-shoes' },
      { id: 'a3', type: 'product_view', timestamp: '3m ago', details: 'Opened Aura CloudStrider Pro Max PDP', page: '/products/aura-cloudstrider-pro-max' },
      { id: 'a4', type: 'size_guide_open', timestamp: '2m ago', details: 'Opened Size & Width Guide Modal', page: '/products/aura-cloudstrider-pro-max' },
      { id: 'a5', type: 'chat_open', timestamp: '1m ago', details: 'Engaged with Proactive Fit Assistant', page: '/products/aura-cloudstrider-pro-max' },
      { id: 'a6', type: 'cart_add', timestamp: '30s ago', details: 'Added UK 9 (Hyper Red) to Cart (₹2,799)', value: 2799 }
    ],
    intentScore: 88,
    intentLevel: 'Hot',
    interventionTriggered: {
      type: 'Product Hesitation & Fit Doubts',
      message: 'Not sure about the fit? Most customers find these true-to-size, but I can recommend your exact size!',
      timestamp: '1m ago',
      status: 'engaged'
    }
  },
  {
    id: 'vis_18292',
    ipLocation: 'Mumbai, India',
    device: 'Mobile Safari / iOS',
    firstSeen: '12 mins ago',
    lastSeen: '2 mins ago',
    isReturning: false,
    sessionDurationSec: 340,
    pagesViewed: ['/products/aura-cloudstrider-pro-max', '/products/aura-pulseglide-daily-trainer', '/products/aura-trailmaster-waterproof'],
    currentPage: '/products/aura-trailmaster-waterproof',
    currentProduct: INITIAL_PRODUCTS[2],
    cart: [],
    actions: [
      { id: 'b1', type: 'product_view', timestamp: '12m ago', details: 'Viewed CloudStrider Pro Max' },
      { id: 'b2', type: 'product_view', timestamp: '8m ago', details: 'Viewed PulseGlide Daily Trainer' },
      { id: 'b3', type: 'product_view', timestamp: '4m ago', details: 'Viewed TrailMaster Waterproof 4X' },
      { id: 'b4', type: 'review_view', timestamp: '3m ago', details: 'Scrolled down to customer reviews & photos' }
    ],
    intentScore: 68,
    intentLevel: 'High Intent',
    interventionTriggered: {
      type: 'Product Comparison',
      message: 'Notice you are comparing a few styles! Want me to break down the key differences for your use case?',
      timestamp: '2m ago',
      status: 'shown'
    }
  },
  {
    id: 'vis_18293',
    ipLocation: 'New Delhi, India',
    device: 'Firefox / Windows',
    firstSeen: '18 mins ago',
    lastSeen: '1 min ago',
    isReturning: true,
    sessionDurationSec: 512,
    pagesViewed: ['/cart', '/checkout'],
    currentPage: '/cart',
    cart: [
      { product: INITIAL_PRODUCTS[0], quantity: 1, selectedSize: 'UK 10' },
      { product: INITIAL_PRODUCTS[4], quantity: 2, selectedSize: 'L' }
    ],
    actions: [
      { id: 'c1', type: 'cart_add', timestamp: '10m ago', details: 'Added CloudStrider (₹2,799)', value: 2799 },
      { id: 'c2', type: 'cart_add', timestamp: '7m ago', details: 'Added 2x FlexTech Compression Tees (₹1,998)', value: 1998 },
      { id: 'c3', type: 'exit_intent', timestamp: '1m ago', details: 'Cursor accelerated toward browser tab close button' },
      { id: 'c4', type: 'coupon_applied', timestamp: '45s ago', details: 'Unlocked SAVE10 coupon from Proactive AI', value: 479 }
    ],
    intentScore: 94,
    intentLevel: 'Hot',
    interventionTriggered: {
      type: 'Exit Intent Cart Recovery',
      message: 'Before you go! Unlock an extra 10% instant discount with code SAVE10 on your cart today.',
      timestamp: '1m ago',
      status: 'engaged'
    }
  },
  {
    id: 'vis_18294',
    ipLocation: 'Hyderabad, India',
    device: 'Chrome / Android',
    firstSeen: '1 min ago',
    lastSeen: 'Just now',
    isReturning: false,
    sessionDurationSec: 42,
    pagesViewed: ['/home'],
    currentPage: '/home',
    cart: [],
    actions: [
      { id: 'd1', type: 'page_view', timestamp: '1m ago', details: 'Arrived from Instagram Ad campaign', page: '/home' }
    ],
    intentScore: 18,
    intentLevel: 'Cold'
  }
];
