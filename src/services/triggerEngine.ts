import { Visitor, TriggerRule, Campaign, TriggerActionType } from '../types';

export interface TriggerEvaluationResult {
  shouldIntervene: boolean;
  rule?: TriggerRule;
  reason?: string;
  actionType?: TriggerActionType;
  customMessage?: string;
  quickReplies?: string[];
  couponOffer?: Campaign;
  attachedCoupon?: string;
}

export class TriggerEngine {
  private static lastTriggerTimes: Record<string, number> = {};

  public static evaluate(
    visitor: Visitor,
    rules: TriggerRule[],
    campaigns: Campaign[] = []
  ): TriggerEvaluationResult {
    // Check if an intervention is already actively shown or engaged in this session
    if (visitor.interventionTriggered && visitor.interventionTriggered.status === 'clicked') {
      return { shouldIntervene: false, reason: 'Visitor already engaged in conversation' };
    }

    const enabledRules = [...rules]
      .filter(r => r.enabled)
      .sort((a, b) => a.priority - b.priority);

    const now = Date.now();

    for (const rule of enabledRules) {
      // 1. Check Cooldown
      const lastTriggered = this.lastTriggerTimes[rule.id] || 0;
      const cooldownMs = (rule.cooldownMinutes || 8) * 60 * 1000;
      if (now - lastTriggered < cooldownMs) {
        continue;
      }

      // 2. Evaluate Rule Conditions
      const cond = rule.conditions;
      let matched = true;

      // Min Intent Score
      if (cond.minIntentScore !== undefined && visitor.intentScore < cond.minIntentScore) {
        matched = false;
      }

      // Dwell Time
      if (cond.minDwellTimeSec !== undefined && visitor.sessionDurationSec < cond.minDwellTimeSec) {
        matched = false;
      }

      // Product Views Count
      if (cond.productViewsCount !== undefined) {
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
      if (cond.minCartValue !== undefined) {
        const cartTotal = visitor.cart.reduce((sum, item) => sum + item.product.price * item.quantity, 0);
        if (cartTotal < cond.minCartValue) {
          matched = false;
        }
      }

      // Target page URL pattern
      if (cond.targetPageUrlPattern) {
        if (!visitor.currentPage.toLowerCase().includes(cond.targetPageUrlPattern.toLowerCase())) {
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
          actionType: rule.type,
          reason: `Matched rule: ${rule.name}`,
          customMessage: rule.aiProactiveMessage,
          quickReplies: rule.quickReplies,
          couponOffer: matchingCampaign,
          attachedCoupon: rule.attachedCoupon || (matchingCampaign ? matchingCampaign.code : undefined)
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
