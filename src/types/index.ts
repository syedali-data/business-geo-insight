// Core data types for LocalPulse

export type Project = {
  id: string;
  title: string;
  country: string;
  region?: string;
  city: string;
  radiusKm: number;
  professionCode: string;
  professionLabel: string;
  keywords: string[];
  maxLeads?: number;           // default 100, range 50-200
  // Google Sheets wiring (optional for each project)
  sheetId?: string;            // 1ABc... spreadsheet ID
  leadsRange?: string;         // default "Leads!A1:Z"
  insightsRange?: string;      // default "Insights!A1:Z"
  publicId?: string;
  createdAt: string;
  updatedAt?: string;
  userId?: string;
};

export type RunStatus = 'queued' | 'running' | 'completed' | 'error';

export type Run = {
  id: string;
  projectId: string;
  status: RunStatus;
  startedAt: string;
  finishedAt?: string;
  summary?: {
    totalLeads?: number;
    validEmails?: number;
    avgRating?: number;
    topSources?: string[];
  };
  artifacts?: {
    csvUrl?: string;
    pdfUrl?: string;
    htmlUrl?: string;
  };
  error?: string;
};

export type Lead = {
  id: string;
  projectId: string;
  runId: string;
  name: string;
  category?: string;
  rating?: number;
  reviewCount?: number;
  email?: string;
  phone?: string;
  website?: string;
  address?: string;
  city: string;
  region?: string;
  country: string;
  source: string;
  score?: number;
  social?: {
    instagram?: string;
    facebook?: string;
    linkedin?: string;
    youtube?: string;
    tiktok?: string;
    twitter?: string;
    pinterest?: string;
  };
};

export type PlanType = 'starter' | 'pro' | 'business';

export type Usage = {
  month: string;
  plan: PlanType;
  creditsRemaining: number;
  creditsTotal: number;
  runCount: number;
  leadCount: number;
  emailCount: number;
};

export type Report = {
  id: string;
  projectId: string;
  runId: string;
  title: string;
  htmlUrl?: string;
  pdfUrl?: string;
  publicId?: string;
  createdAt: string;
};

export type NewsletterTemplate = {
  id: string;
  name: string;
  description: string;
};

export type NewsletterOptions = {
  templateId: string;
  tone: 'professional' | 'friendly' | 'casual';
  length: 'short' | 'standard' | 'long';
};

// Location picker types
export type Country = {
  code: string;
  name: string;
};

export type Region = {
  code: string;
  name: string;
  countryCode: string;
};

export type City = {
  name: string;
  regionCode?: string;
  countryCode: string;
};

// Profession types
export type Profession = {
  code: string;
  label: string;
  synonyms: string[];
  category: string;
};
