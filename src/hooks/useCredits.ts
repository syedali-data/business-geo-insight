import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { getTierInfo } from '@/lib/billing';

export interface UserCredits {
  creditsRemaining: number;
  creditsTotal: number;
  plan: string;
  subscriptionStatus: string;
  billingPeriodStart?: string;
  billingPeriodEnd?: string;
  stripeCustomerId?: string;
  stripeSubscriptionId?: string;
  autoRechargeEnabled: boolean;
  costPerCredit: number;
  creditsUsedThisPeriod: number;
}

export interface CreditUsageItem {
  id: string;
  date: string;
  credits: number;
  label: string;
  projectTitle?: string;
  actionType: string;
  dollarCost?: number;
}

interface UseCreditsReturn {
  credits: UserCredits;
  usageHistory: CreditUsageItem[];
  isLoading: boolean;
  error: string | null;
  refetch: () => Promise<void>;
  logUsage: (params: {
    projectId: string;
    projectTitle: string;
    creditsUsed: number;
    leadsGenerated?: number;
    estimatedLeads?: number;
    actionType?: string;
  }) => Promise<void>;
}

// Mock data for when user is not authenticated
const mockCredits: UserCredits = {
  creditsRemaining: 15,
  creditsTotal: 20,
  plan: 'starter',
  subscriptionStatus: 'active',
  autoRechargeEnabled: false,
  costPerCredit: 0.49,
  creditsUsedThisPeriod: 5,
};

const mockUsageHistory: CreditUsageItem[] = [
  { id: '1', date: '2024-01-19', credits: 1, label: 'Mon', actionType: 'research_run' },
  { id: '2', date: '2024-01-20', credits: 2, label: 'Tue', actionType: 'research_run' },
  { id: '3', date: '2024-01-21', credits: 0, label: 'Wed', actionType: 'research_run' },
  { id: '4', date: '2024-01-22', credits: 1, label: 'Thu', actionType: 'research_run' },
  { id: '5', date: '2024-01-23', credits: 3, label: 'Fri', actionType: 'research_run' },
  { id: '6', date: '2024-01-24', credits: 2, label: 'Sat', actionType: 'research_run' },
  { id: '7', date: '2024-01-25', credits: 1, label: 'Sun', actionType: 'research_run' },
];

const getDayLabel = (dateStr: string): string => {
  const date = new Date(dateStr);
  const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  return days[date.getDay()];
};

export function useCredits(): UseCreditsReturn {
  const [credits, setCredits] = useState<UserCredits>(mockCredits);
  const [usageHistory, setUsageHistory] = useState<CreditUsageItem[]>(mockUsageHistory);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchCredits = async () => {
    try {
      setIsLoading(true);
      setError(null);

      const { data: { user } } = await supabase.auth.getUser();
      
      if (!user) {
        // Use mock data when not authenticated
        setCredits(mockCredits);
        setUsageHistory(mockUsageHistory);
        return;
      }

      // Fetch user credits
      const { data: creditsData, error: creditsError } = await supabase
        .from('user_credits')
        .select('*')
        .eq('user_id', user.id)
        .maybeSingle();

      if (creditsError) {
        console.error('Error fetching credits:', creditsError);
        throw creditsError;
      }

      if (creditsData) {
        setCredits({
          creditsRemaining: creditsData.credits_remaining,
          creditsTotal: creditsData.credits_total,
          plan: creditsData.plan,
          subscriptionStatus: (creditsData as any).subscription_status || 'active',
          billingPeriodStart: creditsData.billing_period_start,
          billingPeriodEnd: (creditsData as any).billing_period_end,
          stripeCustomerId: (creditsData as any).stripe_customer_id,
          stripeSubscriptionId: (creditsData as any).stripe_subscription_id,
          autoRechargeEnabled: (creditsData as any).auto_recharge_enabled || false,
          costPerCredit: (creditsData as any).cost_per_credit || 0.49,
          creditsUsedThisPeriod: (creditsData as any).credits_used_this_period || 0,
        });
      } else {
        // Create initial credits record for new user
        const { data: newCredits, error: insertError } = await supabase
          .from('user_credits')
          .insert({
            user_id: user.id,
            credits_total: 20,
            credits_remaining: 20,
            plan: 'starter',
          })
          .select()
          .single();

        if (insertError) {
          console.error('Error creating credits:', insertError);
          throw insertError;
        }

        if (newCredits) {
          setCredits({
            creditsRemaining: newCredits.credits_remaining,
            creditsTotal: newCredits.credits_total,
            plan: newCredits.plan,
            subscriptionStatus: 'active',
            autoRechargeEnabled: false,
            costPerCredit: 0.49,
            creditsUsedThisPeriod: 0,
          });
        }
      }

      // Fetch usage history (last 7 days)
      const sevenDaysAgo = new Date();
      sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);

      const { data: usageData, error: usageError } = await supabase
        .from('credit_usage')
        .select('*')
        .eq('user_id', user.id)
        .gte('created_at', sevenDaysAgo.toISOString())
        .order('created_at', { ascending: true });

      if (usageError) {
        console.error('Error fetching usage:', usageError);
        throw usageError;
      }

      if (usageData && usageData.length > 0) {
        // Group by day and sum credits
        const dailyUsage = new Map<string, number>();
        const dailyDetails = new Map<string, { projectTitle?: string; actionType: string }>();

        usageData.forEach((item) => {
          const date = item.created_at.split('T')[0];
          dailyUsage.set(date, (dailyUsage.get(date) || 0) + item.credits_used);
          dailyDetails.set(date, {
            projectTitle: item.project_title,
            actionType: item.action_type,
          });
        });

        // Create array for last 7 days
        const history: CreditUsageItem[] = [];
        for (let i = 6; i >= 0; i--) {
          const date = new Date();
          date.setDate(date.getDate() - i);
          const dateStr = date.toISOString().split('T')[0];
          const details = dailyDetails.get(dateStr);
          
          history.push({
            id: dateStr,
            date: dateStr,
            credits: dailyUsage.get(dateStr) || 0,
            label: getDayLabel(dateStr),
            projectTitle: details?.projectTitle,
            actionType: details?.actionType || 'research_run',
          });
        }

        setUsageHistory(history);
      } else {
        // Create empty history for last 7 days
        const history: CreditUsageItem[] = [];
        for (let i = 6; i >= 0; i--) {
          const date = new Date();
          date.setDate(date.getDate() - i);
          const dateStr = date.toISOString().split('T')[0];
          
          history.push({
            id: dateStr,
            date: dateStr,
            credits: 0,
            label: getDayLabel(dateStr),
            actionType: 'research_run',
          });
        }
        setUsageHistory(history);
      }
    } catch (err) {
      console.error('Error in useCredits:', err);
      setError(err instanceof Error ? err.message : 'Failed to load credits');
      // Fall back to mock data on error
      setCredits(mockCredits);
      setUsageHistory(mockUsageHistory);
    } finally {
      setIsLoading(false);
    }
  };

  const logUsage = async (params: {
    projectId: string;
    projectTitle: string;
    creditsUsed: number;
    leadsGenerated?: number;
    estimatedLeads?: number;
    actionType?: string;
  }) => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      
      if (!user) {
        console.log('No user, skipping usage logging');
        return;
      }

      // Calculate dollar costs based on user's tier
      const tierInfo = getTierInfo(credits.plan);
      const dollarCost = params.creditsUsed * tierInfo.costPerCredit;
      const costPerLead = params.leadsGenerated 
        ? dollarCost / params.leadsGenerated 
        : null;

      // Use the new database columns for cost tracking
      const { error: insertError } = await supabase
        .from('credit_usage')
        .insert({
          user_id: user.id,
          project_id: params.projectId,
          project_title: params.projectTitle,
          credits_used: params.creditsUsed,
          leads_generated: params.leadsGenerated,
          action_type: params.actionType || 'research_run',
          // New columns for cost tracking
          credits_cost: parseFloat(dollarCost.toFixed(2)),
          cost_per_lead: costPerLead ? parseFloat(costPerLead.toFixed(4)) : null,
          estimated_leads: params.estimatedLeads,
          metadata: {
            tier: credits.plan,
            timestamp: new Date().toISOString()
          }
        } as any);

      if (insertError) {
        console.error('Error logging usage:', insertError);
        throw insertError;
      }

      // Refetch to update the UI
      await fetchCredits();
    } catch (err) {
      console.error('Error in logUsage:', err);
      throw err;
    }
  };

  useEffect(() => {
    fetchCredits();
  }, []);

  return {
    credits,
    usageHistory,
    isLoading,
    error,
    refetch: fetchCredits,
    logUsage,
  };
}