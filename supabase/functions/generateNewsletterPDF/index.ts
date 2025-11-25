import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

interface Block {
  id: string;
  type: string;
  content: any;
}

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { blocks, projectTitle } = await req.json();

    if (!blocks || !Array.isArray(blocks)) {
      return new Response(
        JSON.stringify({ error: 'Invalid blocks data' }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    console.log('Generating PDF for project:', projectTitle);

    // Generate HTML content from blocks
    const htmlContent = generateHTMLFromBlocks(blocks);
    
    // Create a complete HTML document with styling
    const fullHTML = `
      <!DOCTYPE html>
      <html>
        <head>
          <meta charset="utf-8">
          <title>${projectTitle || 'Newsletter'}</title>
          <style>
            * {
              margin: 0;
              padding: 0;
              box-sizing: border-box;
            }
            body {
              font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
              line-height: 1.6;
              color: #333;
              background: #ffffff;
              padding: 40px;
              max-width: 800px;
              margin: 0 auto;
            }
            .newsletter-header {
              text-align: center;
              margin-bottom: 40px;
              padding-bottom: 20px;
              border-bottom: 2px solid #e5e7eb;
            }
            .newsletter-content {
              margin-bottom: 40px;
            }
            .block {
              margin-bottom: 24px;
              page-break-inside: avoid;
            }
            h1 {
              font-size: 32px;
              font-weight: 700;
              color: #1f2937;
              margin-bottom: 16px;
              line-height: 1.2;
            }
            h2 {
              font-size: 24px;
              font-weight: 600;
              color: #374151;
              margin-bottom: 12px;
              line-height: 1.3;
            }
            p {
              font-size: 16px;
              color: #4b5563;
              margin-bottom: 12px;
              line-height: 1.6;
            }
            img {
              max-width: 100%;
              height: auto;
              border-radius: 8px;
              margin: 16px 0;
            }
            .button {
              display: inline-block;
              padding: 12px 24px;
              background: #3b82f6;
              color: white;
              text-decoration: none;
              border-radius: 6px;
              font-weight: 500;
              margin: 8px 0;
            }
            .divider {
              height: 1px;
              background: #e5e7eb;
              margin: 24px 0;
            }
            .newsletter-footer {
              text-align: center;
              margin-top: 40px;
              padding-top: 20px;
              border-top: 2px solid #e5e7eb;
              font-size: 14px;
              color: #6b7280;
            }
          </style>
        </head>
        <body>
          <div class="newsletter-header">
            <h1>${projectTitle || 'Newsletter'}</h1>
          </div>
          <div class="newsletter-content">
            ${htmlContent}
          </div>
          <div class="newsletter-footer">
            <p>Generated with Newsletter Builder</p>
          </div>
        </body>
      </html>
    `;

    // Use a third-party HTML to PDF API service for premium quality
    // Using PDFShift API (requires API key)
    const pdfShiftApiKey = Deno.env.get('PDFSHIFT_API_KEY');
    
    if (pdfShiftApiKey) {
      // Premium PDF generation with PDFShift
      const pdfResponse = await fetch('https://api.pdfshift.io/v3/convert/pdf', {
        method: 'POST',
        headers: {
          'Authorization': `Basic ${btoa(`api:${pdfShiftApiKey}`)}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          source: fullHTML,
          landscape: false,
          format: 'A4',
          margin: '20px',
          print_background: true,
          image_quality: 95,
        }),
      });

      if (!pdfResponse.ok) {
        throw new Error(`PDFShift API error: ${pdfResponse.statusText}`);
      }

      const pdfBuffer = await pdfResponse.arrayBuffer();
      
      return new Response(pdfBuffer, {
        status: 200,
        headers: {
          ...corsHeaders,
          'Content-Type': 'application/pdf',
          'Content-Disposition': `attachment; filename="${projectTitle || 'newsletter'}.pdf"`,
        },
      });
    } else {
      // Fallback: Return HTML with instructions for browser print-to-PDF
      // This provides good quality without requiring API keys
      return new Response(
        JSON.stringify({ 
          html: fullHTML,
          message: 'For premium PDF generation, configure PDFSHIFT_API_KEY'
        }),
        { 
          status: 200, 
          headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
        }
      );
    }

  } catch (error) {
    console.error('Error generating PDF:', error);
    return new Response(
      JSON.stringify({ error: error.message || 'Failed to generate PDF' }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  }
});

function generateHTMLFromBlocks(blocks: Block[]): string {
  return blocks.map(block => {
    switch (block.type) {
      case 'heading':
        return `<div class="block"><h2>${escapeHtml(block.content.text || 'Heading')}</h2></div>`;
      
      case 'text':
        return `<div class="block"><p>${escapeHtml(block.content.text || 'Text content')}</p></div>`;
      
      case 'image':
        return `<div class="block"><img src="${escapeHtml(block.content.url || 'https://images.unsplash.com/photo-1557804506-669a67965ba0?w=800')}" alt="${escapeHtml(block.content.alt || 'Image')}" /></div>`;
      
      case 'button':
        return `<div class="block"><a href="${escapeHtml(block.content.url || '#')}" class="button">${escapeHtml(block.content.text || 'Button')}</a></div>`;
      
      case 'divider':
        return `<div class="block"><div class="divider"></div></div>`;
      
      default:
        return '';
    }
  }).join('\n');
}

function escapeHtml(text: string): string {
  const map: { [key: string]: string } = {
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#039;'
  };
  return text.replace(/[&<>"']/g, (m) => map[m]);
}
