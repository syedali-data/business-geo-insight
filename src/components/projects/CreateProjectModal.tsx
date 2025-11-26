import { useState, useEffect } from "react";
import { z } from "zod";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useProjects } from "@/store/projects";
import { useNavigate } from "react-router-dom";
import { toast } from "@/hooks/use-toast";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useSubscription } from "@/hooks/useSubscription";
import { PRICING_TIERS, formatPrice } from "@/lib/constants/pricing";
import type { PricingTier } from "@/lib/constants/pricing";
import { TierSelectionCard } from "./TierSelectionCard";
import { BillingSummary } from "./BillingSummary";

const schema = z.object({
  title: z.string().min(3, "Title must be at least 3 characters"),
  country: z.string().length(2, "Country must be 2-letter ISO code"),
  region: z.string().optional(),
  city: z.string().min(2, "City must be at least 2 characters"),
  radiusKm: z.coerce.number().min(1).max(200).default(25),
  professionCode: z.string().min(2, "Profession code required"),
  professionLabel: z.string().min(2, "Profession label required"),
  keywords: z.string().optional(),
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
  const { checkBilling, isLoading: subscriptionLoading } = useSubscription();
  
  const [pending, setPending] = useState(false);
  const [tier, setTier] = useState<PricingTier>('premium');
  const [billingCheck, setBillingCheck] = useState<any>(null);
  const [billingLoading, setBillingLoading] = useState(false);
  
  const [form, setForm] = useState<any>({
    country: "CA",
    radiusKm: 25,
    professionCode: "roofing",
    professionLabel: "Roofing",
    leadsRange: "Leads!A1:Z",
    insightsRange: "Insights!A1:Z",
  });

  useEffect(() => {
    async function check() {
      setBillingLoading(true);
      try {
        const result = await checkBilling(tier);
        setBillingCheck(result);
      } catch (error) {
        console.error('Error checking billing:', error);
      } finally {
        setBillingLoading(false);
      }
    }
    check();
  }, [tier, checkBilling]);

  const maxLeads = PRICING_TIERS[tier].maxLeads;

  function update(k: string, v: any) {
    setForm((f: any) => ({ ...f, [k]: v }));
  }

  async function create() {
    const parsed = schema.safeParse(form);
    if (!parsed.success) {
      toast({ variant: "destructive", title: "Validation Error", description: parsed.error.issues[0]?.message });
      return;
    }
    setPending(true);
    const keywords = (form.keywords || "").split(",").map((s: string) => s.trim()).filter(Boolean);
    const proj = addProject({
      title: parsed.data.title, country: parsed.data.country, region: parsed.data.region,
      city: parsed.data.city, radiusKm: parsed.data.radiusKm, professionCode: parsed.data.professionCode,
      professionLabel: parsed.data.professionLabel, keywords, maxLeads,
      sheetId: parsed.data.sheetId, leadsRange: parsed.data.leadsRange, insightsRange: parsed.data.insightsRange,
    });
    setPending(false);
    onOpenChange(false);
    toast({ title: "Project Created", description: `${proj.title} has been created successfully.` });
    nav(`/projects/${proj.id}`);
  }

  const buttonText = billingCheck?.requiresPayment 
    ? `Start Research - ${formatPrice(billingCheck.price || PRICING_TIERS[tier].price)}`
    : 'Start Research';

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-2xl max-h-[90vh] flex flex-col overflow-hidden">
        <DialogHeader className="flex-shrink-0">
          <DialogTitle>New Market Research</DialogTitle>
        </DialogHeader>
        <ScrollArea className="flex-1 min-h-0 max-h-[calc(90vh-180px)]">
          <div className="space-y-6 pr-4 pb-2">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="sm:col-span-2">
                <Label htmlFor="title">Project Title</Label>
                <Input id="title" value={form.title || ""} onChange={(e) => update("title", e.target.value)} placeholder="e.g., Toronto Dentists Research" />
              </div>
              <div><Label htmlFor="country">Country (ISO2)</Label><Input id="country" value={form.country} onChange={(e) => update("country", e.target.value.toUpperCase())} placeholder="CA" maxLength={2} /></div>
              <div><Label htmlFor="region">Region/State</Label><Input id="region" value={form.region || ""} onChange={(e) => update("region", e.target.value)} placeholder="ON" /></div>
              <div><Label htmlFor="city">City</Label><Input id="city" value={form.city || ""} onChange={(e) => update("city", e.target.value)} placeholder="Toronto" /></div>
              <div><Label htmlFor="radius">Radius (km)</Label><Input id="radius" type="number" value={form.radiusKm} onChange={(e) => update("radiusKm", e.target.value)} min={1} max={200} /></div>
              <div>
                <Label htmlFor="profession">Business Category</Label>
                <Input id="profession" value={form.professionLabel || ""} onChange={(e) => { update("professionLabel", e.target.value); update("professionCode", e.target.value.toLowerCase().replace(/\s+/g, "-")); }} placeholder="e.g., Roofing, HVAC, Dentist" list="profession-suggestions" />
                <datalist id="profession-suggestions">
                  <option value="Roofing Contractors" /><option value="HVAC Services" /><option value="Plumbing Services" /><option value="Dental Clinics" /><option value="Electrician" /><option value="Landscaping" />
                </datalist>
              </div>
              <div><Label htmlFor="keywords">Keywords (optional)</Label><Input id="keywords" value={form.keywords || ""} onChange={(e) => update("keywords", e.target.value)} placeholder="residential, commercial" /></div>
            </div>
            <div className="pt-4 border-t border-border">
              <h3 className="font-medium text-sm mb-4 flex items-center gap-2">
                Research Configuration
              </h3>
              <TierSelectionCard 
                tier="premium" 
                selected={true} 
                onSelect={() => {}} 
                className="max-w-lg mx-auto"
              />
            </div>
            <BillingSummary tier={tier} billingCheck={billingCheck} isLoading={billingLoading || subscriptionLoading} />
          </div>
        </ScrollArea>
        <DialogFooter className="flex-shrink-0 pt-4 border-t border-border">
          <Button variant="outline" onClick={() => onOpenChange(false)}>Cancel</Button>
          <Button onClick={create} disabled={pending || subscriptionLoading || billingLoading}>
            {pending ? "Creating..." : buttonText}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
