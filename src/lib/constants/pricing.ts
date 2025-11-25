// 2-Tier Pricing Model Constants

export const PRICING_TIERS = {
  basic: {
    id: 'basic' as const,
    name: 'Basic Run',
    price: 7.99,
    maxLeads: 100,
    processingTime: '30 seconds',
    features: [
      'Up to 100 businesses',
      'Basic contact data',
      'Name, address, phone, website',
      'Average ratings & review counts',
      'Business category',
      'CSV export',
      'Results in 30 seconds'
    ],
  },
  premium: {
    id: 'premium' as const,
    name: 'Premium Run',
    price: 14.99,
    maxLeads: 500,
    processingTime: '2-3 minutes',
    features: [
      'Up to 500 businesses',
      'Full contact data + email validation',
      'Complete reviews (up to 50 per business)',
      'AI-powered market analysis',
      'Sentiment analysis',
      'Competitive intelligence',
      'Market opportunities report',
      'PDF + CSV export',
      'Results in 2-3 minutes'
    ],
    recommended: true,
  }
} as const;

export type PricingTier = keyof typeof PRICING_TIERS;

export const SUBSCRIPTION_PLANS = {
  starter: {
    id: 'starter' as const,
    name: 'Starter',
    monthlyPrice: 49,
    runsIncluded: 5,
    runTier: 'basic' as PricingTier,
    discountOnExtraRuns: 0,
    recommended: false,
    features: [
      '5 Basic runs/month',
      'Up to 100 leads per run',
      'CSV exports',
      'Email support',
      'Save $9.95/month vs pay-per-run'
    ]
  },
  pro: {
    id: 'pro' as const,
    name: 'Pro',
    monthlyPrice: 149,
    runsIncluded: 12,
    runTier: 'premium' as PricingTier,
    discountOnExtraRuns: 0.20,
    features: [
      '12 Premium runs/month',
      'Up to 500 leads per run',
      'AI-powered insights',
      'Email validation',
      'PDF + CSV exports',
      'Priority support',
      '20% discount on extra runs',
      'Save $30.88/month'
    ],
    recommended: true
  },
  business: {
    id: 'business' as const,
    name: 'Business',
    monthlyPrice: 399,
    runsIncluded: 40,
    runTier: 'premium' as PricingTier,
    discountOnExtraRuns: 0.30,
    recommended: false,
    features: [
      '40 Premium runs/month',
      'Up to 500 leads per run',
      'Everything in Pro, plus:',
      'Dedicated account manager',
      'API access',
      'Custom integrations',
      'White-label reports',
      '30% discount on extra runs',
      'Save $199.60/month'
    ]
  }
} as const;

export type SubscriptionPlan = keyof typeof SUBSCRIPTION_PLANS;

// Helper function to calculate price with discount
export function calculateRunPrice(
  tier: PricingTier,
  userPlan?: SubscriptionPlan
): number {
  const basePrice = PRICING_TIERS[tier].price;

  if (!userPlan) return basePrice;

  const discount = SUBSCRIPTION_PLANS[userPlan].discountOnExtraRuns;
  return parseFloat((basePrice * (1 - discount)).toFixed(2));
}

// Helper function to format price
export function formatPrice(price: number): string {
  return `$${price.toFixed(2)}`;
}

// Helper to get tier from max leads
export function getTierFromMaxLeads(maxLeads: number): PricingTier {
  return maxLeads <= 100 ? 'basic' : 'premium';
}

// Helper to get max leads from tier
export function getMaxLeadsFromTier(tier: PricingTier): number {
  return PRICING_TIERS[tier].maxLeads;
}
