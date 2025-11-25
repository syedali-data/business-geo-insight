import { supabase } from "@/integrations/supabase/client";

interface Block {
  id: string;
  type: string;
  content: any;
}

export async function generateNewsletterPDF(blocks: Block[], projectTitle: string) {
  const { data, error } = await supabase.functions.invoke('generateNewsletterPDF', {
    body: { blocks, projectTitle },
  });

  if (error) {
    throw new Error(error.message || 'Failed to generate PDF');
  }

  // If we got HTML back (no API key), open print dialog
  if (data.html) {
    const printWindow = window.open('', '_blank');
    if (printWindow) {
      printWindow.document.write(data.html);
      printWindow.document.close();
      setTimeout(() => {
        printWindow.print();
      }, 250);
    }
    return { usedBrowserPrint: true };
  }

  return data;
}

export async function downloadNewsletterPDF(blocks: Block[], projectTitle: string) {
  try {
    const response = await fetch(
      `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/generateNewsletterPDF`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY}`,
        },
        body: JSON.stringify({ blocks, projectTitle }),
      }
    );

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error || 'Failed to generate PDF');
    }

    const contentType = response.headers.get('Content-Type');
    
    // Check if we got JSON (fallback mode) or PDF
    if (contentType?.includes('application/json')) {
      const data = await response.json();
      if (data.html) {
        // Open print dialog for browser-based PDF generation
        const printWindow = window.open('', '_blank');
        if (printWindow) {
          printWindow.document.write(data.html);
          printWindow.document.close();
          setTimeout(() => {
            printWindow.print();
          }, 250);
        }
        return { usedBrowserPrint: true };
      }
    } else {
      // We got a PDF blob
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = `${projectTitle || 'newsletter'}.pdf`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      window.URL.revokeObjectURL(url);
      return { downloaded: true };
    }
  } catch (error) {
    console.error('Error downloading PDF:', error);
    throw error;
  }
}
