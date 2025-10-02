import { supabase } from "@/integrations/supabase/client";

export interface MarketResearchPayload {
  projectId: string;
  country: string;
  region?: string;
  city: string;
  radius_km: number;
  profession_code: string;
  profession_label: string;
  keywords?: string[];
  max_leads?: number;
  enrich?: boolean;
  validate_emails?: boolean;
}

export interface NewsletterPayload {
  projectId: string;
  runId?: string;
  templateId?: string;
  length?: 'short' | 'standard' | 'long';
  tone?: 'professional' | 'friendly';
  sendNow?: boolean;
}

export async function runMarketResearch(payload: MarketResearchPayload) {
  const { data, error } = await supabase.functions.invoke('runMarketResearch', {
    body: payload,
  });

  if (error) {
    throw new Error(error.message || 'Failed to run research');
  }

  return data;
}

export async function runNewsletter(payload: NewsletterPayload) {
  const { data, error } = await supabase.functions.invoke('runNewsletter', {
    body: payload,
  });

  if (error) {
    throw new Error(error.message || 'Failed to run newsletter');
  }

  return data;
}
