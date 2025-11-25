// Pricing tiers and credit calculation utilities

export const PRICING_TIERS = {
  starter: {
    name: "Starter",
    monthlyPrice: 49,
    creditsPerMonth: 100,
    costPerCredit: 0.49,
    maxLeadsPerRun: 500,
    features: [
      "100 credits/month",
      "Up to 500 leads per run",
      "Email validation",
      "Basic insights & charts",
      "CSV export",
      "Email support"
    ]
  },
  pro: {
    name: "Pro",
    monthlyPrice: 149,
    creditsPerMonth: 400,
    costPerCredit: 0.3725,
    maxLeadsPerRun: Infinity,
    features: [
      "400 credits/month",
      "Unlimited leads per run",
      "Email & phone validation",
      "Advanced insights",
      "CSV & PDF export",
      "Priority support",
      "API access"
    ]
  },
  business: {
    name: "Business",
    monthlyPrice: 399,
    creditsPerMonth: 1200,
    costPerCredit: 0.3325,
    maxLeadsPerRun: Infinity,
    features: [
      "1200 credits/month",
      "Unlimited leads per run",
      "Full validation suite",
      "Custom integrations",
      "White-label reports",
      "Dedicated account manager"
    ]
  }
} as const;

export type SubscriptionTier = keyof typeof PRICING_TIERS;

export interface CreditCalculation {
  leadCount: number;
  creditsRequired: number;
  costPerLead: number;
  dollarCost: number;
  volumeDiscount: number;
}

/**
 * Calculate credits required for a given number of leads
 * Formula: 1 credit (base 100 leads) + 0.2 credits per additional 50 leads
 */
export function calculateCredits(numLeads: number): number {
  if (numLeads <= 100) return 1.0;
  const extraLeads = numLeads - 100;
  const extraCredits = (extraLeads / 50) * 0.2;
  return parseFloat((1.0 + extraCredits).toFixed(2));
}

/**
 * Calculate full cost breakdown for a research run
 */
export function calculateCreditCost(
  leadCount: number,
  tier: SubscriptionTier = 'starter'
): CreditCalculation {
  const credits = calculateCredits(leadCount);
  const costPerCredit = PRICING_TIERS[tier].costPerCredit;
  const dollarCost = credits * costPerCredit;
  const costPerLead = dollarCost / leadCount;

  // Calculate volume discount (what they would pay without volume pricing)
  const noDiscountCredits = leadCount / 100;
  const noDiscountCost = noDiscountCredits * costPerCredit;
  const volumeDiscount = noDiscountCost > dollarCost 
    ? ((noDiscountCost - dollarCost) / noDiscountCost) * 100 
    : 0;

  return {
    leadCount,
    creditsRequired: credits,
    costPerLead: parseFloat(costPerLead.toFixed(4)),
    dollarCost: parseFloat(dollarCost.toFixed(2)),
    volumeDiscount: parseFloat(volumeDiscount.toFixed(1))
  };
}

/**
 * Get tier info from plan name
 */
export function getTierInfo(planName: string) {
  const normalizedPlan = planName.toLowerCase() as SubscriptionTier;
  return PRICING_TIERS[normalizedPlan] || PRICING_TIERS.starter;
}
