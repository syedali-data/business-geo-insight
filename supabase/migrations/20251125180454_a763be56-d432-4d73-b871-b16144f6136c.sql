-- Add new columns to user_credits for subscription and billing management
ALTER TABLE public.user_credits 
  ADD COLUMN IF NOT EXISTS subscription_status TEXT DEFAULT 'active',
  ADD COLUMN IF NOT EXISTS billing_period_end TIMESTAMPTZ,
  ADD COLUMN IF NOT EXISTS stripe_customer_id TEXT,
  ADD COLUMN IF NOT EXISTS stripe_subscription_id TEXT,
  ADD COLUMN IF NOT EXISTS auto_recharge_enabled BOOLEAN DEFAULT false,
  ADD COLUMN IF NOT EXISTS cost_per_credit DECIMAL(10, 4) DEFAULT 0.49,
  ADD COLUMN IF NOT EXISTS credits_used_this_period INTEGER DEFAULT 0;

-- Add new columns to credit_usage for enhanced cost tracking
ALTER TABLE public.credit_usage
  ADD COLUMN IF NOT EXISTS credits_cost DECIMAL(10, 2),
  ADD COLUMN IF NOT EXISTS cost_per_lead DECIMAL(10, 4),
  ADD COLUMN IF NOT EXISTS estimated_leads INTEGER;

-- Create index for faster Stripe lookups
CREATE INDEX IF NOT EXISTS idx_user_credits_stripe_customer 
  ON public.user_credits(stripe_customer_id) 
  WHERE stripe_customer_id IS NOT NULL;

CREATE INDEX IF NOT EXISTS idx_user_credits_stripe_subscription 
  ON public.user_credits(stripe_subscription_id) 
  WHERE stripe_subscription_id IS NOT NULL;

-- Add comment documentation
COMMENT ON COLUMN public.user_credits.subscription_status IS 'active, past_due, canceled, trialing';
COMMENT ON COLUMN public.user_credits.billing_period_end IS 'End of current billing period';
COMMENT ON COLUMN public.user_credits.stripe_customer_id IS 'Stripe customer ID for billing';
COMMENT ON COLUMN public.user_credits.stripe_subscription_id IS 'Stripe subscription ID';
COMMENT ON COLUMN public.user_credits.auto_recharge_enabled IS 'Auto-purchase credits when low';
COMMENT ON COLUMN public.user_credits.cost_per_credit IS 'Cost per credit based on plan tier';
COMMENT ON COLUMN public.user_credits.credits_used_this_period IS 'Credits used in current billing period';
COMMENT ON COLUMN public.credit_usage.credits_cost IS 'Dollar cost of credits used';
COMMENT ON COLUMN public.credit_usage.cost_per_lead IS 'Dollar cost per lead generated';
COMMENT ON COLUMN public.credit_usage.estimated_leads IS 'Estimated leads before run';