import "https://deno.land/x/xhr@0.1.0/mod.ts";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

interface RequestBody {
  projectId: string;
  runId?: string;
  templateId?: string;
  length?: 'short' | 'standard' | 'long';
  tone?: 'professional' | 'friendly';
  sendNow?: boolean;
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

    if (!body.projectId) {
      return new Response(
        JSON.stringify({ error: 'Missing field: projectId' }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    const url = Deno.env.get('N8N_NEWSLETTER_WEBHOOK_URL');
    const key = Deno.env.get('INTERNAL_N8N_API_KEY');

    if (!url || !key) {
      console.error('Missing environment variables: N8N_NEWSLETTER_WEBHOOK_URL or INTERNAL_N8N_API_KEY');
      return new Response(
        JSON.stringify({ error: 'Server not configured' }),
        { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    console.log('Proxying newsletter request to n8n for project:', body.projectId);

    const upstream = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-internal-key': key,
      },
      body: JSON.stringify(body),
    });

    const data = await upstream.json().catch(() => ({}));
    
    console.log('n8n newsletter response status:', upstream.status);

    return new Response(
      JSON.stringify(data),
      { status: upstream.status, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  } catch (e: any) {
    console.error('Error proxying newsletter to n8n:', e);
    return new Response(
      JSON.stringify({ error: 'Upstream error', detail: String(e?.message || e) }),
      { status: 502, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  }
});
