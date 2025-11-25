import { supabase } from "@/integrations/supabase/client";
import { PRICING_TIERS, SUBSCRIPTION_PLANS, calculateRunPrice } from '@/lib/constants/pricing';
import type { PricingTier, SubscriptionPlan } from '@/lib/constants/pricing';

export interface SubscriptionData {
  id: string;
  user_id: string;
  plan_type: SubscriptionPlan;
  status: string;
  runs_per_month: number;
  runs_remaining: number;
  run_tier: PricingTier;
  monthly_price: number;
  discount_on_extra_runs: number;
  billing_period_start: string;
  billing_period_end: string;
  stripe_customer_id?: string;
  stripe_subscription_id?: string;
  created_at: string;
  updated_at: string;
}

export interface ChargeRunParams {
  userId: string;
  tier: PricingTier;
  projectTitle: string;
  projectId?: string;
  location?: string;
  category?: string;
}

export interface ChargeRunResult {
  success: boolean;
  runId?: string;
  paymentRequired?: boolean;
  amountCharged?: number;
  runsRemaining?: number;
  error?: string;
}

export interface BillingCheck {
  canRun: boolean;
  requiresPayment: boolean;
  price?: number;
  runsRemaining?: number;
  subscription?: SubscriptionData | null;
}

// Get user's current subscription status
export async function getUserSubscription(userId: string): Promise<SubscriptionData | null> {
  const { data, error } = await supabase
    .from('subscription_plans')
    .select('*')
    .eq('user_id', userId)
    .eq('status', 'active')
    .maybeSingle();

  if (error) {
    console.error('Error fetching subscription:', error);
    return null;
  }

  return data as SubscriptionData | null;
}

// Check if user can run search and what it will cost
export async function canUserRunSearch(
  userId: string,
  tier: PricingTier
): Promise<BillingCheck> {
  const subscription = await getUserSubscription(userId);

  if (!subscription) {
    return {
      canRun: true,
      requiresPayment: true,
      price: PRICING_TIERS[tier].price,
      subscription: null
    };
  }

  const planRunTier = SUBSCRIPTION_PLANS[subscription.plan_type].runTier;
  const hasRuns = subscription.runs_remaining > 0;

  // Can use subscription run if: has runs AND (tier is basic OR plan supports premium)
  const canUseSubscription = hasRuns && (tier === 'basic' || planRunTier === 'premium');

  if (canUseSubscription) {
    return {
      canRun: true,
      requiresPayment: false,
      runsRemaining: subscription.runs_remaining,
      subscription
    };
  }

  // Need to pay for this run
  const price = calculateRunPrice(tier, subscription.plan_type);

  return {
    canRun: true,
    requiresPayment: true,
    price,
    runsRemaining: subscription.runs_remaining,
    subscription
  };
}

// Charge for a run (or use subscription)
export async function chargeForRun(params: ChargeRunParams): Promise<ChargeRunResult> {
  const { userId, tier, projectTitle, projectId, location, category } = params;

  try {
    const billingCheck = await canUserRunSearch(userId, tier);

    if (!billingCheck.canRun) {
      return {
        success: false,
        error: 'Cannot run search'
      };
    }

    // If using subscription
    if (!billingCheck.requiresPayment && billingCheck.subscription) {
      // Create run record with subscription payment method
      // The trigger will automatically decrement runs_remaining
      const { data: run, error: runError } = await supabase
        .from('research_runs')
        .insert({
          user_id: userId,
          project_id: projectId,
          title: projectTitle,
          location,
          category,
          tier,
          price_paid: 0,
          payment_method: 'subscription',
          max_leads: PRICING_TIERS[tier].maxLeads,
          status: 'pending'
        })
        .select()
        .single();

      if (runError) {
        console.error('Error creating run:', runError);
        return {
          success: false,
          error: runError.message
        };
      }

      return {
        success: true,
        runId: run.id,
        paymentRequired: false,
        runsRemaining: (billingCheck.runsRemaining || 1) - 1
      };
    }

    // Pay-per-run flow (payment would be handled via Stripe in production)
    const price = billingCheck.price || PRICING_TIERS[tier].price;

    const { data: run, error: runError } = await supabase
      .from('research_runs')
      .insert({
        user_id: userId,
        project_id: projectId,
        title: projectTitle,
        location,
        category,
        tier,
        price_paid: price,
        payment_method: 'pay_per_run',
        max_leads: PRICING_TIERS[tier].maxLeads,
        status: 'pending_payment'
      })
      .select()
      .single();

    if (runError) {
      console.error('Error creating run:', runError);
      return {
        success: false,
        error: runError.message
      };
    }

    return {
      success: true,
      runId: run.id,
      paymentRequired: true,
      amountCharged: price,
      runsRemaining: billingCheck.runsRemaining || 0
    };
  } catch (error) {
    console.error('Error charging for run:', error);
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Failed to process run'
    };
  }
}

// Create a subscription for a user (for demo/testing purposes)
export async function createSubscription(
  userId: string,
  planType: SubscriptionPlan
): Promise<{ success: boolean; subscription?: SubscriptionData; error?: string }> {
  const plan = SUBSCRIPTION_PLANS[planType];
  
  const { data, error } = await supabase
    .from('subscription_plans')
    .insert({
      user_id: userId,
      plan_type: planType,
      status: 'active',
      runs_per_month: plan.runsIncluded,
      runs_remaining: plan.runsIncluded,
      run_tier: plan.runTier,
      monthly_price: plan.monthlyPrice,
      discount_on_extra_runs: plan.discountOnExtraRuns,
      billing_period_start: new Date().toISOString(),
      billing_period_end: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString()
    })
    .select()
    .single();

  if (error) {
    console.error('Error creating subscription:', error);
    return { success: false, error: error.message };
  }

  return { success: true, subscription: data as SubscriptionData };
}

// Update runs remaining (for manual adjustments)
export async function updateRunsRemaining(
  subscriptionId: string,
  runsRemaining: number
): Promise<{ success: boolean; error?: string }> {
  const { error } = await supabase
    .from('subscription_plans')
    .update({ 
      runs_remaining: runsRemaining,
      updated_at: new Date().toISOString()
    })
    .eq('id', subscriptionId);

  if (error) {
    console.error('Error updating runs:', error);
    return { success: false, error: error.message };
  }

  return { success: true };
}
