-- Create the update_updated_at_column function first
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SET search_path = public;

-- Create table to track user credit balances
CREATE TABLE public.user_credits (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL UNIQUE,
  credits_total INTEGER NOT NULL DEFAULT 20,
  credits_remaining INTEGER NOT NULL DEFAULT 20,
  plan TEXT NOT NULL DEFAULT 'starter',
  billing_period_start TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT date_trunc('month', now()),
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create table to track credit usage history
CREATE TABLE public.credit_usage (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL,
  project_id TEXT,
  project_title TEXT,
  credits_used INTEGER NOT NULL DEFAULT 1,
  action_type TEXT NOT NULL DEFAULT 'research_run',
  leads_generated INTEGER,
  metadata JSONB,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create indexes for faster queries
CREATE INDEX idx_credit_usage_user_id ON public.credit_usage(user_id);
CREATE INDEX idx_credit_usage_created_at ON public.credit_usage(created_at DESC);

-- Enable RLS
ALTER TABLE public.user_credits ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.credit_usage ENABLE ROW LEVEL SECURITY;

-- RLS policies for user_credits
CREATE POLICY "Users can view their own credits"
ON public.user_credits FOR SELECT
USING (auth.uid() = user_id);

CREATE POLICY "Users can update their own credits"
ON public.user_credits FOR UPDATE
USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own credits"
ON public.user_credits FOR INSERT
WITH CHECK (auth.uid() = user_id);

-- RLS policies for credit_usage
CREATE POLICY "Users can view their own usage history"
ON public.credit_usage FOR SELECT
USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own usage"
ON public.credit_usage FOR INSERT
WITH CHECK (auth.uid() = user_id);

-- Trigger for updated_at on user_credits
CREATE TRIGGER update_user_credits_updated_at
BEFORE UPDATE ON public.user_credits
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();

-- Function to decrement credits on usage insert
CREATE OR REPLACE FUNCTION public.decrement_credits_on_usage()
RETURNS TRIGGER AS $$
BEGIN
  UPDATE public.user_credits
  SET credits_remaining = credits_remaining - NEW.credits_used,
      updated_at = now()
  WHERE user_id = NEW.user_id
    AND credits_remaining >= NEW.credits_used;
  
  IF NOT FOUND THEN
    RAISE EXCEPTION 'Insufficient credits';
  END IF;
  
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER SET search_path = public;

-- Trigger to auto-decrement credits
CREATE TRIGGER decrement_credits_after_usage
AFTER INSERT ON public.credit_usage
FOR EACH ROW
EXECUTE FUNCTION public.decrement_credits_on_usage();