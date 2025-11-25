import "jsr:@supabase/functions-js/edge-runtime.d.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

interface GenerateRequest {
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

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { projectData, settings, researchData }: GenerateRequest = await req.json();
    const LOVABLE_API_KEY = Deno.env.get("LOVABLE_API_KEY");

    if (!LOVABLE_API_KEY) {
      throw new Error("LOVABLE_API_KEY is not configured");
    }

    // Build context from project and research data
    const context = `
Project Details:
- Title: ${projectData.title}
- Location: ${projectData.city}${projectData.region ? `, ${projectData.region}` : ""}, ${projectData.country}
- Industry: ${projectData.professionLabel}
- Keywords: ${projectData.keywords?.join(", ") || "N/A"}

${researchData ? `Research Data:
- Total Leads Found: ${researchData.totalLeads || 0}
- Average Rating: ${researchData.avgRating || "N/A"}
- Market Insights: ${researchData.insights?.length || 0} insights available` : ""}

Template: ${settings.template}
Tone: ${settings.tone}
Length: ${settings.length}
${settings.prompt ? `Additional Instructions: ${settings.prompt}` : ""}
`;

    // Generate newsletter content using Lovable AI
    const response = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${LOVABLE_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "google/gemini-2.5-flash",
        messages: [
          {
            role: "system",
            content: `You are a professional newsletter content generator. Generate newsletter content in JSON format with an array of content blocks. Each block should have:
- type: "heading", "text", "button", or "divider"
- content: object with relevant properties (text, url, etc.)

The newsletter should be engaging, professional, and focused on local market insights and opportunities.`,
          },
          {
            role: "user",
            content: `Generate a ${settings.length} newsletter with a ${settings.tone} tone using the ${settings.template} template based on this information:\n\n${context}\n\nReturn ONLY valid JSON in this format: {"blocks": [{"type": "heading", "content": {"text": "..."}}, ...]}`,
          },
        ],
      }),
    });

    if (!response.ok) {
      if (response.status === 429) {
        return new Response(
          JSON.stringify({ error: "Rate limit exceeded. Please try again later." }),
          { status: 429, headers: { ...corsHeaders, "Content-Type": "application/json" } }
        );
      }
      if (response.status === 402) {
        return new Response(
          JSON.stringify({ error: "Payment required. Please add credits to your workspace." }),
          { status: 402, headers: { ...corsHeaders, "Content-Type": "application/json" } }
        );
      }
      const errorText = await response.text();
      console.error("AI Gateway error:", response.status, errorText);
      throw new Error("Failed to generate content");
    }

    const data = await response.json();
    const generatedContent = data.choices[0].message.content;

    // Parse the JSON response
    let blocks;
    try {
      const parsed = JSON.parse(generatedContent);
      blocks = parsed.blocks || [];
    } catch (parseError) {
      console.error("Failed to parse AI response:", generatedContent);
      // Fallback: create blocks from plain text
      blocks = [
        { type: "heading", content: { text: `${projectData.title} Newsletter` } },
        { type: "text", content: { text: generatedContent } },
      ];
    }

    return new Response(
      JSON.stringify({ blocks }),
      {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      }
    );
  } catch (error) {
    console.error("Error in generateNewsletterContent:", error);
    return new Response(
      JSON.stringify({ error: error.message || "Unknown error occurred" }),
      {
        status: 500,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      }
    );
  }
});
