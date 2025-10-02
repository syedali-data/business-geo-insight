import { Lead } from "@/types";

export async function fetchProjectLeads(
  projectId: string,
  sheet?: { sheetId?: string; range?: string }
): Promise<Lead[]> {
  // If a cloud function /api/getLeads exists, use it. Otherwise return seeded demo leads.
  try {
    if (sheet?.sheetId) {
      const r = await fetch("/api/getLeads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          sheetId: sheet.sheetId,
          range: sheet.range || "Leads!A1:Z",
        }),
      });
      if (r.ok) {
        const data = await r.json();
        return (data.leads || []) as Lead[];
      }
    }
  } catch (error) {
    console.warn("Failed to fetch leads from API, using demo data", error);
  }

  // Fallback to demo leads
  const { demoLeads } = await import("@/seed/demoLeads");
  return demoLeads as Lead[];
}
