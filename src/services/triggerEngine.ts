import { Visitor, TriggerRule, Campaign } from '../types';

export interface TriggerEvaluationResult {
  shouldIntervene: boolean;
  rule?: TriggerRule;
  reason?: string;
  customMessage?: string;
  quickReplies?: string[];
  couponOffer?: Campaign;
}

export class TriggerEngine {
  private static lastTriggerTimes: Record<string, number> = {};

  public static evaluate(
    visitor: Visitor,
    rules: TriggerRule[],
    campaigns: Campaign[] = []
  ): TriggerEvaluationResult {
    // Check if an intervention is already actively shown or engaged in this session
    if (visitor.interventionTriggered && visitor.interventionTriggered.status === 'engaged') {
      return { shouldIntervene: false, reason: 'Visitor already engaged in conversation' };
    }

    const enabledRules = rules.filter(r => r.enabled);
    const now = Date.now();

    for (const rule of enabledRules) {
      // 1. Check Cooldown
      const lastTriggered = this.lastTriggerTimes[rule.id] || 0;
      const cooldownMs = (rule.cooldownMinutes || 10) * 60 * 1000;
      if (now - lastTriggered < cooldownMs) {
        continue;
      }

      // 2. Evaluate Rule Conditions
      const cond = rule.conditions;
      let matched = true;

      // Min Intent Score
      if (cond.minIntentScore && visitor.intentScore < cond.minIntentScore) {
        matched = false;
      }

      // Page Type match
      if (cond.pageType) {
        if (cond.pageType === 'product' && !visitor.currentPage.includes('/products/')) {
          matched = false;
        } else if (cond.pageType === 'cart' && !visitor.currentPage.includes('/cart')) {
          matched = false;
        }
      }

      // Dwell Time
      if (cond.minDwellTimeSec && visitor.sessionDurationSec < cond.minDwellTimeSec) {
        matched = false;
      }

      // Product Views Count
      if (cond.productViewsCount) {
        const productViews = visitor.actions.filter(a => a.type === 'product_view').length;
        if (productViews < cond.productViewsCount) {
          matched = false;
        }
      }

      // Size Guide opened
      if (cond.sizeGuideOpened) {
        const opened = visitor.actions.some(a => a.type === 'size_guide_open');
        if (!opened) {
          matched = false;
        }
      }

      // Exit intent
      if (cond.exitIntentDetected) {
        const exitDetected = visitor.actions.some(a => a.type === 'exit_intent');
        if (!exitDetected) {
          matched = false;
        }
      }

      // Cart min amount
      if (cond.cartMinAmount) {
        const cartTotal = visitor.cart.reduce((sum, item) => sum + item.product.price * item.quantity, 0);
        if (cartTotal < cond.cartMinAmount) {
          matched = false;
        }
      }

      // If all conditions passed, this rule triggers
      if (matched) {
        this.lastTriggerTimes[rule.id] = now;

        // Check if an active campaign applies
        const cartTotal = visitor.cart.reduce((sum, item) => sum + item.product.price * item.quantity, 0);
        const matchingCampaign = campaigns.find(
          c => c.isActive &&
               visitor.intentScore >= c.conditions.minIntentScore &&
               cartTotal >= c.conditions.minCartAmount
        );

        return {
          shouldIntervene: true,
          rule,
          reason: `Matched rule: ${rule.name}`,
          customMessage: rule.aiProactiveMessage,
          quickReplies: rule.quickReplies,
          couponOffer: matchingCampaign
        };
      }
    }

    return { shouldIntervene: false, reason: 'Conditions not met for proactive intervention' };
  }

  public static resetCooldown(ruleId?: string) {
    if (ruleId) {
      delete this.lastTriggerTimes[ruleId];
    } else {
      this.lastTriggerTimes = {};
    }
  }
}
