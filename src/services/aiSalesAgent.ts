import { Product, BusinessProfile, Visitor, ChatMessage, Campaign } from '../types';

export interface AISalesContext {
  visitor: Visitor;
  business: BusinessProfile;
  products: Product[];
  activeCampaigns: Campaign[];
  conversationHistory: ChatMessage[];
}

export interface AISalesResponse {
  message: string;
  recommendedProducts?: Product[];
  quickReplies?: string[];
  couponCode?: string;
  showLeadForm?: boolean;
}

export class AISalesAgent {
  public static async generateResponse(
    userMessage: string,
    context: AISalesContext
  ): Promise<AISalesResponse> {
    const text = userMessage.toLowerCase().trim();
    const { visitor, business, products, activeCampaigns } = context;

    // Simulate realistic AI generation latency (300ms)
    await new Promise(r => setTimeout(r, 400));

    // 1. Check for Lead / Callback / Bulk order intent
    if (
      text.includes('call') ||
      text.includes('callback') ||
      text.includes('phone') ||
      text.includes('bulk') ||
      text.includes('corporate') ||
      text.includes('wholesale') ||
      text.includes('consult') ||
      text.includes('talk to someone') ||
      text.includes('executive')
    ) {
      return {
        message: `I'd be glad to arrange a direct callback from our footwear fit specialist team! Leave your details below and we will get back to you within 30 minutes.`,
        showLeadForm: true,
        quickReplies: ['View warranty policy', 'Check delivery times', 'Explore top running shoes']
      };
    }

    // 2. Check for Size / Fit guidance
    if (
      text.includes('size') ||
      text.includes('fit') ||
      text.includes('tight') ||
      text.includes('wide') ||
      text.includes('comfort') ||
      text.includes('arch') ||
      text.includes('plantar')
    ) {
      const targetProduct = visitor.currentProduct || products[0];
      return {
        message: `For the **${targetProduct.name}**, our fit testing shows it fits **true to size**. If you have wider feet or prefer extra toe-box room for long-distance runs, we recommend taking **half a size up**.`,
        quickReplies: ['Check return policy', 'Do you have wide sizes?', 'Add to cart'],
        recommendedProducts: [targetProduct]
      };
    }

    // 3. Check for Return / Exchange / Warranty Objections
    if (
      text.includes('return') ||
      text.includes('exchange') ||
      text.includes('refund') ||
      text.includes('warranty') ||
      text.includes('policy')
    ) {
      return {
        message: `We offer a **100% Zero-Risk 7-Day Doorstep Exchange & Return** policy. If the size or comfort isn't 100% perfect, our courier picks it up directly from your doorstep with an instant refund. Plus, you get our **1-Year Sole Warranty**!`,
        quickReplies: ['How fast is shipping?', 'Do you support COD?', 'Show bestsellers']
      };
    }

    // 4. Check for Shipping / Delivery / Pincode / International
    if (
      text.includes('ship') ||
      text.includes('deliver') ||
      text.includes('cod') ||
      text.includes('dubai') ||
      text.includes('pincode') ||
      text.includes('cash on delivery')
    ) {
      return {
        message: `We dispatch within **24 hours** via Express Courier (2-3 business days across metro cities). **Free Shipping** applies on all orders above ₹999, and Cash on Delivery (COD) is available nationwide!`,
        quickReplies: ['Is COD free?', 'What if I need to return?', 'Show running shoes']
      };
    }

    // 5. Check for Discount / Coupon / Offers
    if (
      text.includes('discount') ||
      text.includes('coupon') ||
      text.includes('code') ||
      text.includes('offer') ||
      text.includes('deal') ||
      text.includes('save')
    ) {
      const activeOffer = activeCampaigns.find(c => c.isActive) || { code: 'SAVE10', discountPercentage: 10 };
      return {
        message: `Here is an exclusive limited-time coupon for you: Use code **${activeOffer.code}** to get an extra **${activeOffer.discountPercentage}% OFF** on your order today!`,
        couponCode: activeOffer.code,
        quickReplies: ['Apply coupon to cart', 'Show recommended shoes', 'Check delivery time']
      };
    }

    // 6. Check for Product Comparison / Recommendations based on category / query
    if (
      text.includes('compare') ||
      text.includes('difference') ||
      text.includes('versus') ||
      text.includes('vs')
    ) {
      const p1 = products[0]; // CloudStrider
      const p2 = products[1]; // PulseGlide
      return {
        message: `Here is the quick breakdown:\n• **${p1.name}** (₹${p1.price}): Lightweight carbon-composite shoe built for fast pace & marathons.\n• **${p2.name}** (₹${p2.price}): Ergonomic arch support and memory foam cushion, perfect for all-day office walking & daily gym workouts.`,
        recommendedProducts: [p1, p2],
        quickReplies: ['Which is lighter?', 'Check sizes in stock', 'Apply SAVE10 coupon']
      };
    }

    // 7. Product search by need: Running, Trail, Daily, Slip-on
    if (text.includes('run') || text.includes('marathon') || text.includes('jog') || text.includes('speed')) {
      const matching = products.filter(p => p.category.toLowerCase().includes('running') || p.name.toLowerCase().includes('strider'));
      return {
        message: `For running and high-impact training, I highly recommend our flagship **${matching[0]?.name || products[0].name}**. It features nitrogen-infused bounce foam that absorbs 85% of heel impact!`,
        recommendedProducts: matching.length > 0 ? matching : [products[0]],
        quickReplies: ['Check available sizes', 'What is the return policy?', 'Apply discount code']
      };
    }

    if (text.includes('trail') || text.includes('trek') || text.includes('rain') || text.includes('waterproof') || text.includes('outdoor')) {
      const trail = products.filter(p => p.category.toLowerCase().includes('outdoor') || p.name.toLowerCase().includes('trail'));
      return {
        message: `For rugged terrain and rainy weather, our **${trail[0]?.name || products[2].name}** features HydroShield 100% waterproof protection and 4.5mm deep-lug grip.`,
        recommendedProducts: trail.length > 0 ? trail : [products[2]],
        quickReplies: ['How is the grip in mud?', 'Is it heavy?', 'Check delivery times']
      };
    }

    if (text.includes('slip') || text.includes('casual') || text.includes('office') || text.includes('walk') || text.includes('daily')) {
      const casual = products.filter(p => p.category.toLowerCase().includes('slip') || p.category.toLowerCase().includes('daily'));
      return {
        message: `For effortless daily comfort, check out our breathable slip-ons and daily trainers:`,
        recommendedProducts: casual.length > 0 ? casual : [products[1], products[3]],
        quickReplies: ['Can I wash these in machine?', 'Do you have wide sizes?', 'What is the price?']
      };
    }

    // Default Contextual Recommendation based on current visited product
    const relevantProducts = visitor.currentProduct
      ? [visitor.currentProduct, ...products.filter(p => p.id !== visitor.currentProduct?.id).slice(0, 1)]
      : products.slice(0, 2);

    return {
      message: `Looking for top comfort, durability, or a specific activity like daily walking or running? Tell me your preferred style or size and I'll match the best options for you!`,
      recommendedProducts: relevantProducts,
      quickReplies: ['Best for running', 'Best for all-day walking', 'Check current offers', 'Help me choose my size']
    };
  }
}
