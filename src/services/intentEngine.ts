import { Visitor, IntentLevel, VisitorAction } from '../types';

export function calculateIntentScore(visitor: Partial<Visitor>): { score: number; level: IntentLevel; breakdown: string[] } {
  let score = 0;
  const breakdown: string[] = [];

  const actions = visitor.actions || [];
  const uniqueProductsViewed = new Set(
    actions.filter(a => a.type === 'product_view').map(a => a.details)
  ).size;

  // 1. Initial product views
  if (uniqueProductsViewed >= 1) {
    score += 10;
    breakdown.push('Viewed product (+10)');
  }
  if (uniqueProductsViewed >= 2) {
    score += 10;
    breakdown.push('Viewed 2+ products (+10)');
  }
  if (uniqueProductsViewed >= 3) {
    score += 15;
    breakdown.push('Product comparison behavior (+15)');
  }

  // 2. Returning visitor
  if (visitor.isReturning) {
    score += 10;
    breakdown.push('Returning visitor (+10)');
  }

  // 3. Dwell time / session duration
  const sessionSec = visitor.sessionDurationSec || 0;
  if (sessionSec > 120) {
    score += 10;
    breakdown.push('Session > 2 mins (+10)');
  }

  // 4. In-depth engagement (size guide, reviews)
  const openedSizeGuide = actions.some(a => a.type === 'size_guide_open');
  if (openedSizeGuide) {
    score += 15;
    breakdown.push('Size / fit guide inspected (+15)');
  }

  const viewedReviews = actions.some(a => a.type === 'review_view');
  if (viewedReviews) {
    score += 10;
    breakdown.push('Verified customer reviews (+10)');
  }

  // 5. Commercial signals: Cart & Checkout
  const hasCart = (visitor.cart && visitor.cart.length > 0) || actions.some(a => a.type === 'cart_add');
  if (hasCart) {
    score += 25;
    breakdown.push('Items added to cart (+25)');
  }

  const isCheckout = (visitor.currentPage === '/checkout') || actions.some(a => a.type === 'checkout_start');
  if (isCheckout) {
    score += 30;
    breakdown.push('Checkout initiated (+30)');
  }

  // 6. Exit Intent
  const hadExitIntent = actions.some(a => a.type === 'exit_intent');
  if (hadExitIntent) {
    score += 15;
    breakdown.push('Exit intent detected (+15)');
  }

  // 7. Chat Engagement
  const chatEngaged = actions.some(a => a.type === 'chat_open');
  if (chatEngaged) {
    score += 10;
    breakdown.push('Engaged with AI Sales specialist (+10)');
  }

  // Cap score at 100 max
  score = Math.min(100, Math.max(0, score));

  // Determine intent tier
  let level: IntentLevel = 'Cold';
  if (score >= 76) {
    level = 'Hot';
  } else if (score >= 51) {
    level = 'High Intent';
  } else if (score >= 26) {
    level = 'Interested';
  } else {
    level = 'Cold';
  }

  return { score, level, breakdown };
}
