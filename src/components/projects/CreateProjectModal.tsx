import { useState } from "react";
import { z } from "zod";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { useProjects } from "@/store/projects";
import { useNavigate } from "react-router-dom";
import { toast } from "@/hooks/use-toast";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useCredits } from "@/hooks/useCredits";
import { calculateCredits, calculateCreditCost } from "@/lib/billing";
import { CreditCostPreview } from "@/components/billing/CreditCostPreview";

const schema = z.object({
  title: z.string().min(3, "Title must be at least 3 characters"),
  country: z.string().length(2, "Country must be 2-letter ISO code"),
  region: z.string().optional(),
  city: z.string().min(2, "City must be at least 2 characters"),
  radiusKm: z.coerce.number().min(1).max(200, "Radius must be between 1-200km").default(25),
  professionCode: z.string().min(2, "Profession code required"),
  professionLabel: z.string().min(2, "Profession label required"),
  keywords: z.string().optional(),
  maxLeads: z.coerce.number().min(100, "Minimum 100 leads").max(500, "Maximum 500 leads").default(100),
  sheetId: z.string().optional(),
  leadsRange: z.string().optional(),
  insightsRange: z.string().optional(),
});

interface CreateProjectModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export default function CreateProjectModal({ open, onOpenChange }: CreateProjectModalProps) {
  const nav = useNavigate();
  const addProject = useProjects((s) => s.addProject);
  const { credits, isLoading: creditsLoading } = useCredits();
  const [pending, setPending] = useState(false);
  const [form, setForm] = useState<any>({
    country: "CA",
    radiusKm: 25,
    professionCode: "roofing",
    professionLabel: "Roofing",
    maxLeads: 100,
    leadsRange: "Leads!A1:Z",
    insightsRange: "Insights!A1:Z",
  });

  // Use the new volume-based pricing formula
  const maxLeads = form.maxLeads || 100;
  const creditsRequired = calculateCredits(maxLeads);
  const costBreakdown = calculateCreditCost(maxLeads, credits.plan as any || 'starter');
  const hasEnoughCredits = credits.creditsRemaining >= creditsRequired;

  function update(k: string, v: any) {
    setForm((f: any) => ({ ...f, [k]: v }));
  }

  async function create() {
    const parsed = schema.safeParse(form);
    if (!parsed.success) {
      toast({
        variant: "destructive",
        title: "Validation Error",
        description: parsed.error.issues[0]?.message || "Invalid inputs",
      });
      return;
    }
    setPending(true);
    const keywords = (form.keywords || "")
      .split(",")
      .map((s: string) => s.trim())
      .filter(Boolean);
    const proj = addProject({
      title: parsed.data.title,
      country: parsed.data.country,
      region: parsed.data.region,
      city: parsed.data.city,
      radiusKm: parsed.data.radiusKm,
      professionCode: parsed.data.professionCode,
      professionLabel: parsed.data.professionLabel,
      keywords,
      maxLeads: parsed.data.maxLeads,
      sheetId: parsed.data.sheetId,
      leadsRange: parsed.data.leadsRange,
      insightsRange: parsed.data.insightsRange,
    });
    setPending(false);
    onOpenChange(false);
    toast({
      title: "Project Created",
      description: `${proj.title} has been created successfully.`,
    });
    nav(`/projects/${proj.id}`);
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-2xl max-h-[90vh]">
        <DialogHeader>
          <DialogTitle>Create Project</DialogTitle>
        </DialogHeader>

        <ScrollArea className="max-h-[calc(90vh-120px)] pr-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="sm:col-span-2">
              <Label htmlFor="title">Project title</Label>
              <Input
                id="title"
                value={form.title || ""}
                onChange={(e) => update("title", e.target.value)}
                placeholder="e.g., London Roofing Contractors"
              />
            </div>

            <div>
              <Label htmlFor="country">Country (ISO2)</Label>
              <Input
                id="country"
                value={form.country}
                onChange={(e) => update("country", e.target.value.toUpperCase())}
                placeholder="CA"
                maxLength={2}
              />
            </div>
            <div>
              <Label htmlFor="region">Region/State</Label>
              <Input
                id="region"
                value={form.region || ""}
                onChange={(e) => update("region", e.target.value)}
                placeholder="ON"
              />
            </div>
            <div>
              <Label htmlFor="city">City</Label>
              <Input
                id="city"
                value={form.city || ""}
                onChange={(e) => update("city", e.target.value)}
                placeholder="London"
              />
            </div>
            <div>
              <Label htmlFor="radius">Radius (km)</Label>
              <Input
                id="radius"
                type="number"
                value={form.radiusKm}
                onChange={(e) => update("radiusKm", e.target.value)}
                min={1}
                max={200}
              />
            </div>

            <div>
              <Label htmlFor="profession">Profession</Label>
              <Input
                id="profession"
                value={form.professionLabel || ""}
                onChange={(e) => {
                  const value = e.target.value;
                  update("professionLabel", value);
                  update("professionCode", value.toLowerCase().replace(/\s+/g, "-"));
                }}
                placeholder="e.g., Roofing, HVAC, Dentist, Plumber"
                list="profession-suggestions"
              />
              <datalist id="profession-suggestions">
                <option value="Roofing" />
                <option value="HVAC" />
                <option value="Plumbing" />
                <option value="Dentist" />
                <option value="Electrician" />
                <option value="Landscaping" />
                <option value="Restaurant" />
                <option value="Real Estate Agent" />
                <option value="Lawyer" />
                <option value="Accountant" />
              </datalist>
            </div>
            <div>
              <Label htmlFor="keywords">Keywords (comma-separated)</Label>
              <Input
                id="keywords"
                value={form.keywords || ""}
                onChange={(e) => update("keywords", e.target.value)}
                placeholder="residential, commercial"
              />
            </div>

            <div className="sm:col-span-2 pt-2 border-t">
              <h3 className="font-medium text-sm mb-3">Lead Generation</h3>
              <div className="space-y-4">
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <Label htmlFor="maxLeads">Number of Leads</Label>
                    <span className="text-sm font-medium text-primary">{maxLeads} leads</span>
                  </div>
                  <Slider
                    id="maxLeads"
                    value={[maxLeads]}
                    onValueChange={([value]) => update("maxLeads", value)}
                    min={100}
                    max={500}
                    step={50}
                    className="w-full"
                  />
                  <div className="flex justify-between text-xs text-muted-foreground mt-1">
                    <span>100 (base)</span>
                    <span>500</span>
                  </div>
                </div>
                
                {/* Enhanced Credit Cost Preview */}
                {!creditsLoading && (
                  <CreditCostPreview
                    leadCount={maxLeads}
                    userCreditsRemaining={credits.creditsRemaining}
                    userTier={credits.plan}
                    compact
                  />
                )}
              </div>
            </div>

            <div className="sm:col-span-2 pt-2 border-t">
              <h3 className="font-medium text-sm mb-3">Google Sheets (optional)</h3>
              <div className="grid sm:grid-cols-2 gap-4">
                <div className="sm:col-span-2">
                  <Label htmlFor="sheetId">Sheet ID</Label>
                  <Input
                    id="sheetId"
                    value={form.sheetId || ""}
                    onChange={(e) => update("sheetId", e.target.value)}
                    placeholder="1ABcDEF..."
                  />
                </div>
                <div>
                  <Label htmlFor="leadsRange">Leads Range</Label>
                  <Input
                    id="leadsRange"
                    value={form.leadsRange || "Leads!A1:Z"}
                    onChange={(e) => update("leadsRange", e.target.value)}
                  />
                </div>
                <div>
                  <Label htmlFor="insightsRange">Insights Range</Label>
                  <Input
                    id="insightsRange"
                    value={form.insightsRange || "Insights!A1:Z"}
                    onChange={(e) => update("insightsRange", e.target.value)}
                  />
                </div>
              </div>
            </div>
          </div>
        </ScrollArea>

        <div className="flex justify-end gap-2 pt-4 border-t">
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Cancel
          </Button>
          <Button onClick={create} disabled={pending || creditsLoading || !hasEnoughCredits}>
            {pending ? "Creating..." : `Create Project (${creditsRequired} credit${creditsRequired !== 1 ? 's' : ''} · $${costBreakdown.dollarCost})`}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
