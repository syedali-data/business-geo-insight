-- Create subscription_plans table for the new 2-tier pricing model
CREATE TABLE public.subscription_plans (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL,
  
  -- Plan details
  plan_type TEXT NOT NULL CHECK (plan_type IN ('starter', 'pro', 'business')),
  status TEXT NOT NULL DEFAULT 'active' CHECK (status IN ('active', 'cancelled', 'past_due', 'trialing')),
  
  -- Run allowances
  runs_per_month INTEGER NOT NULL DEFAULT 5,
  runs_remaining INTEGER NOT NULL DEFAULT 5,
  run_tier TEXT NOT NULL DEFAULT 'basic' CHECK (run_tier IN ('basic', 'premium')),
  
  -- Pricing
  monthly_price DECIMAL(10,2) NOT NULL DEFAULT 49.00,
  discount_on_extra_runs DECIMAL(3,2) DEFAULT 0,
  
  -- Billing cycle
  billing_period_start TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  billing_period_end TIMESTAMPTZ NOT NULL DEFAULT (NOW() + INTERVAL '1 month'),
  
  -- Stripe integration (for future use)
  stripe_customer_id TEXT,
  stripe_subscription_id TEXT,
  stripe_price_id TEXT,
  
  -- Timestamps
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  
  -- Ensure one active subscription per user
  UNIQUE(user_id)
);

-- Create index for faster lookups
CREATE INDEX idx_subscription_plans_user_id ON public.subscription_plans(user_id);
CREATE INDEX idx_subscription_plans_status ON public.subscription_plans(status);

-- Enable RLS
ALTER TABLE public.subscription_plans ENABLE ROW LEVEL SECURITY;

-- RLS Policies
CREATE POLICY "Users can view their own subscription"
ON public.subscription_plans FOR SELECT
USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own subscription"
ON public.subscription_plans FOR INSERT
WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own subscription"
ON public.subscription_plans FOR UPDATE
USING (auth.uid() = user_id);

-- Create research_runs table for tracking runs
CREATE TABLE public.research_runs (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL,
  project_id TEXT,
  
  -- Run details
  title TEXT NOT NULL,
  location TEXT,
  category TEXT,
  
  -- Tier information
  tier TEXT NOT NULL DEFAULT 'premium' CHECK (tier IN ('basic', 'premium')),
  max_leads INTEGER NOT NULL DEFAULT 500 CHECK (max_leads IN (100, 500)),
  actual_leads_found INTEGER,
  
  -- Pricing
  price_paid DECIMAL(10,2) DEFAULT 0,
  payment_method TEXT DEFAULT 'pay_per_run' CHECK (payment_method IN ('subscription', 'pay_per_run', 'trial')),
  
  -- Status
  status TEXT NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'pending_payment', 'running', 'completed', 'failed')),
  run_duration_seconds INTEGER,
  data_quality_score DECIMAL(3,2),
  
  -- Timestamps
  created_at TIMESTAMPTZ DEFAULT NOW(),
  started_at TIMESTAMPTZ,
  completed_at TIMESTAMPTZ,
  
  -- Error tracking
  error_message TEXT
);

-- Create indexes
CREATE INDEX idx_research_runs_user_id ON public.research_runs(user_id);
CREATE INDEX idx_research_runs_status ON public.research_runs(status);
CREATE INDEX idx_research_runs_created_at ON public.research_runs(created_at DESC);

-- Enable RLS
ALTER TABLE public.research_runs ENABLE ROW LEVEL SECURITY;

-- RLS Policies for research_runs
CREATE POLICY "Users can view their own runs"
ON public.research_runs FOR SELECT
USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own runs"
ON public.research_runs FOR INSERT
WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own runs"
ON public.research_runs FOR UPDATE
USING (auth.uid() = user_id);

-- Trigger to update subscription runs_remaining when a run is created with subscription payment
CREATE OR REPLACE FUNCTION public.decrement_runs_on_subscription_use()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  IF NEW.payment_method = 'subscription' THEN
    UPDATE public.subscription_plans
    SET runs_remaining = runs_remaining - 1,
        updated_at = NOW()
    WHERE user_id = NEW.user_id
      AND status = 'active'
      AND runs_remaining > 0;
    
    IF NOT FOUND THEN
      RAISE EXCEPTION 'No active subscription with available runs';
    END IF;
  END IF;
  
  RETURN NEW;
END;
$$;

CREATE TRIGGER decrement_runs_trigger
AFTER INSERT ON public.research_runs
FOR EACH ROW
WHEN (NEW.payment_method = 'subscription')
EXECUTE FUNCTION public.decrement_runs_on_subscription_use();