import { supabase } from "@/integrations/supabase/client";

export interface GenerateNewsletterPayload {
  projectData: {
    title: string;
    city: string;
    region?: string;
    country: string;
    professionLabel: string;
    keywords?: string[];
  };
  settings: {
    template: string;
    tone: string;
    length: string;
    prompt?: string;
  };
  researchData?: {
    totalLeads?: number;
    avgRating?: number;
    insights?: any[];
  };
}

export async function generateNewsletterContent(payload: GenerateNewsletterPayload) {
  const { data, error } = await supabase.functions.invoke('generateNewsletterContent', {
    body: payload,
  });

  if (error) {
    throw new Error(error.message || 'Failed to generate newsletter content');
  }

  return data;
}
