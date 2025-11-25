import "https://deno.land/x/xhr@0.1.0/mod.ts";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

interface RequestBody {
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

Deno.serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  if (req.method !== 'POST') {
    return new Response(
      JSON.stringify({ error: 'Method not allowed' }),
      { status: 405, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  }

  try {
    let body: RequestBody;
    try {
      body = await req.json();
    } catch {
      return new Response(
        JSON.stringify({ error: 'Invalid JSON' }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    // Validate required fields
    const required = ['projectId', 'country', 'city', 'radius_km', 'profession_code', 'profession_label'] as const;
    for (const field of required) {
      if (body[field] == null || body[field] === '') {
        return new Response(
          JSON.stringify({ error: `Missing field: ${field}` }),
          { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
        );
      }
    }

    const url = Deno.env.get('N8N_LEADGEN_WEBHOOK_URL');
    const key = Deno.env.get('INTERNAL_N8N_API_KEY');

    // If n8n is not configured (placeholder URL), return mock data for testing
    if (!url || !key || url.includes('<your-n8n>')) {
      console.log('n8n not configured, returning mock data for testing project:', body.projectId);
      
      return new Response(
        JSON.stringify({
          success: true,
          message: 'Mock research completed (n8n not configured)',
          runId: `mock-${Date.now()}`,
          leadsFound: 5,
          status: 'completed'
        }),
        { status: 200, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    console.log('Proxying request to n8n leadgen webhook for project:', body.projectId);

    const upstream = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-internal-key': key,
      },
      body: JSON.stringify(body),
    });

    const data = await upstream.json().catch(() => ({}));
    
    console.log('n8n response status:', upstream.status);

    return new Response(
      JSON.stringify(data),
      { status: upstream.status, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  } catch (e: any) {
    console.error('Error proxying to n8n:', e);
    return new Response(
      JSON.stringify({ error: 'Upstream error', detail: String(e?.message || e) }),
      { status: 502, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  }
});
