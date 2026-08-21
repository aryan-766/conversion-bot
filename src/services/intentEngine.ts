import { Visitor, IntentLevel, IntentSignalScore } from '../types';

export function calculateIntentScore(visitor: Partial<Visitor>): {
  score: number;
  level: IntentLevel;
  breakdown: string[];
  signalBreakdown: IntentSignalScore[];
} {
  let score = 0;
  const breakdown: string[] = [];
  const signalBreakdown: IntentSignalScore[] = [];

  const actions = visitor.actions || [];
  const uniqueProductsViewed = new Set(
    actions.filter(a => a.type === 'product_view').map(a => a.details)
  ).size;

  // 1. Initial product views
  if (uniqueProductsViewed >= 3) {
    score += 25;
    breakdown.push('Product comparison behavior (+25)');
    signalBreakdown.push({
      name: 'Multi-Product Compare',
      points: 25,
      maxPoints: 25,
      reason: `Viewed ${uniqueProductsViewed} unique product PDPs`
    });
  } else if (uniqueProductsViewed >= 2) {
    score += 15;
    breakdown.push('Viewed 2 products (+15)');
    signalBreakdown.push({
      name: 'Product Browsing',
      points: 15,
      maxPoints: 25,
      reason: 'Viewed 2 distinct shoe models'
    });
  } else if (uniqueProductsViewed >= 1) {
    score += 10;
    breakdown.push('Viewed product (+10)');
    signalBreakdown.push({
      name: 'Product View',
      points: 10,
      maxPoints: 25,
      reason: 'Inspected product details page'
    });
  }

  // 2. Returning visitor
  if (visitor.isReturning) {
    score += 15;
    breakdown.push('Returning visitor (+15)');
    signalBreakdown.push({
      name: 'Returning Visitor',
      points: 15,
      maxPoints: 20,
      reason: '2nd+ visit in recent timeframe'
    });
  }

  // 3. Dwell time / session duration
  const sessionSec = visitor.sessionDurationSec || 0;
  if (sessionSec > 180) {
    score += 20;
    breakdown.push('High Dwell (> 3 mins) (+20)');
    signalBreakdown.push({
      name: 'Dwell Time',
      points: 20,
      maxPoints: 20,
      reason: `Active on store for ${Math.floor(sessionSec / 60)}m ${sessionSec % 60}s`
    });
  } else if (sessionSec > 60) {
    score += 10;
    breakdown.push('Active Session (> 1 min) (+10)');
    signalBreakdown.push({
      name: 'Dwell Time',
      points: 10,
      maxPoints: 20,
      reason: `Active on store for ${sessionSec}s`
    });
  }

  // 4. In-depth engagement (size guide, reviews)
  const openedSizeGuide = actions.some(a => a.type === 'size_guide_open');
  if (openedSizeGuide) {
    score += 20;
    breakdown.push('Size / fit guide inspected (+20)');
    signalBreakdown.push({
      name: 'Size Guide Inspection',
      points: 20,
      maxPoints: 20,
      reason: 'Opened size & metric guide modal'
    });
  }

  const viewedReviews = actions.some(a => a.type === 'review_view');
  if (viewedReviews) {
    score += 10;
    breakdown.push('Verified customer reviews (+10)');
    signalBreakdown.push({
      name: 'Review Reading',
      points: 10,
      maxPoints: 15,
      reason: 'Scrolled to customer testimonials'
    });
  }

  // 5. Commercial signals: Cart & Checkout
  const hasCart = (visitor.cart && visitor.cart.length > 0) || actions.some(a => a.type === 'cart_add');
  if (hasCart) {
    score += 25;
    breakdown.push('Items added to cart (+25)');
    signalBreakdown.push({
      name: 'Cart Addition',
      points: 25,
      maxPoints: 25,
      reason: 'Active items loaded in shopping bag'
    });
  }

  // 6. Exit Intent
  const hadExitIntent = actions.some(a => a.type === 'exit_intent');
  if (hadExitIntent) {
    score += 15;
    breakdown.push('Exit intent detected (+15)');
    signalBreakdown.push({
      name: 'Exit Velocity',
      points: 15,
      maxPoints: 20,
      reason: 'Cursor accelerated toward tab close'
    });
  }

  // 7. Chat Engagement
  const chatEngaged = actions.some(a => a.type === 'chat_open');
  if (chatEngaged) {
    score += 10;
    breakdown.push('Engaged with AI Sales specialist (+10)');
    signalBreakdown.push({
      name: 'AI Interaction',
      points: 10,
      maxPoints: 15,
      reason: 'Opened or responded in AI conversation'
    });
  }

  // Cap score at 100 max
  score = Math.min(100, Math.max(0, score));

  // Determine intent tier
  let level: IntentLevel = 'cold';
  if (score >= 76) {
    level = 'hot';
  } else if (score >= 51) {
    level = 'high_intent';
  } else if (score >= 26) {
    level = 'interested';
  } else {
    level = 'cold';
  }

  return { score, level, breakdown, signalBreakdown };
}
