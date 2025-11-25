import { useState, useEffect, useCallback } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { getUserSubscription, canUserRunSearch, type SubscriptionData, type BillingCheck } from '@/lib/billing/runBilling';
import { SUBSCRIPTION_PLANS } from '@/lib/constants/pricing';
import type { PricingTier, SubscriptionPlan } from '@/lib/constants/pricing';

interface UseSubscriptionReturn {
  subscription: SubscriptionData | null;
  isLoading: boolean;
  error: string | null;
  refetch: () => Promise<void>;
  checkBilling: (tier: PricingTier) => Promise<BillingCheck>;
  // Computed values
  planInfo: typeof SUBSCRIPTION_PLANS[SubscriptionPlan] | null;
  runsRemaining: number;
  runsTotal: number;
  percentageUsed: number;
  hasActiveSubscription: boolean;
}

// Mock subscription for unauthenticated users or demo
const MOCK_SUBSCRIPTION: SubscriptionData = {
  id: 'mock-sub-1',
  user_id: 'mock-user',
  plan_type: 'pro',
  status: 'active',
  runs_per_month: 12,
  runs_remaining: 8,
  run_tier: 'premium',
  monthly_price: 149,
  discount_on_extra_runs: 0.20,
  billing_period_start: new Date().toISOString(),
  billing_period_end: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString(),
  created_at: new Date().toISOString(),
  updated_at: new Date().toISOString()
};

export function useSubscription(): UseSubscriptionReturn {
  const [subscription, setSubscription] = useState<SubscriptionData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchSubscription = useCallback(async () => {
    setIsLoading(true);
    setError(null);

    try {
      const { data: { user } } = await supabase.auth.getUser();
      
      if (!user) {
        // Use mock data for demo purposes
        setSubscription(MOCK_SUBSCRIPTION);
        setIsLoading(false);
        return;
      }

      const data = await getUserSubscription(user.id);
      
      if (data) {
        setSubscription(data);
      } else {
        // No subscription found, user is on pay-per-run
        setSubscription(null);
      }
    } catch (err) {
      console.error('Error fetching subscription:', err);
      setError(err instanceof Error ? err.message : 'Failed to fetch subscription');
      // Fallback to mock for demo
      setSubscription(MOCK_SUBSCRIPTION);
    } finally {
      setIsLoading(false);
    }
  }, []);

  const checkBilling = useCallback(async (tier: PricingTier): Promise<BillingCheck> => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      
      if (!user) {
        // Mock billing check for demo
        return {
          canRun: true,
          requiresPayment: false,
          runsRemaining: MOCK_SUBSCRIPTION.runs_remaining,
          subscription: MOCK_SUBSCRIPTION
        };
      }

      return await canUserRunSearch(user.id, tier);
    } catch (err) {
      console.error('Error checking billing:', err);
      return {
        canRun: true,
        requiresPayment: true,
        price: tier === 'basic' ? 7.99 : 14.99
      };
    }
  }, []);

  useEffect(() => {
    fetchSubscription();
  }, [fetchSubscription]);

  // Computed values
  const planInfo = subscription 
    ? SUBSCRIPTION_PLANS[subscription.plan_type as SubscriptionPlan] 
    : null;
  
  const runsRemaining = subscription?.runs_remaining ?? 0;
  const runsTotal = subscription?.runs_per_month ?? 0;
  const percentageUsed = runsTotal > 0 
    ? ((runsTotal - runsRemaining) / runsTotal) * 100 
    : 0;
  const hasActiveSubscription = subscription?.status === 'active';

  return {
    subscription,
    isLoading,
    error,
    refetch: fetchSubscription,
    checkBilling,
    planInfo,
    runsRemaining,
    runsTotal,
    percentageUsed,
    hasActiveSubscription
  };
}
