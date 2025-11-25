import { cn } from '@/lib/utils';
import { PRICING_TIERS, formatPrice } from '@/lib/constants/pricing';
import type { PricingTier } from '@/lib/constants/pricing';
import type { BillingCheck } from '@/lib/billing/runBilling';
import { CheckCircle, CreditCard, AlertCircle } from 'lucide-react';
import { Skeleton } from '@/components/ui/skeleton';

interface BillingSummaryProps {
  tier: PricingTier;
  billingCheck: BillingCheck | null;
  isLoading?: boolean;
  className?: string;
}

export function BillingSummary({
  tier,
  billingCheck,
  isLoading,
  className
}: BillingSummaryProps) {
  if (isLoading) {
    return (
      <div className={cn("p-4 rounded-lg border bg-card", className)}>
        <Skeleton className="h-5 w-32 mb-2" />
        <Skeleton className="h-4 w-48" />
      </div>
    );
  }

  if (!billingCheck) {
    return null;
  }

  const tierData = PRICING_TIERS[tier];

  if (!billingCheck.requiresPayment) {
    return (
      <div className={cn(
        "flex items-center gap-3 p-4 rounded-lg border",
        "bg-success/5 border-success/20",
        className
      )}>
        <div className="p-2 rounded-full bg-success/10">
          <CheckCircle className="h-5 w-5 text-success" />
        </div>
        <div>
          <p className="font-medium text-foreground">
            Uses 1 subscription run
          </p>
          <p className="text-sm text-muted-foreground">
            {billingCheck.runsRemaining} run{billingCheck.runsRemaining !== 1 ? 's' : ''} remaining this month
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className={cn("p-4 rounded-lg border bg-card", className)}>
      <div className="flex items-center gap-2 mb-3">
        <CreditCard className="h-4 w-4 text-muted-foreground" />
        <span className="text-sm font-medium text-foreground">Payment Required</span>
      </div>

      <div className="space-y-2">
        <div className="flex justify-between text-sm">
          <span className="text-muted-foreground">Research tier</span>
          <span className="text-foreground">{tierData.name}</span>
        </div>
        <div className="flex justify-between text-sm">
          <span className="text-muted-foreground">Max leads</span>
          <span className="text-foreground">{tierData.maxLeads}</span>
        </div>
        <div className="flex justify-between pt-2 border-t border-border">
          <span className="font-medium text-foreground">Total</span>
          <span className="font-bold text-lg text-primary">
            {formatPrice(billingCheck.price || tierData.price)}
          </span>
        </div>
      </div>

      {billingCheck.runsRemaining !== undefined && billingCheck.runsRemaining === 0 && (
        <div className="flex items-center gap-2 mt-3 p-2 rounded bg-warning/10 border border-warning/20">
          <AlertCircle className="h-4 w-4 text-warning flex-shrink-0" />
          <span className="text-xs text-warning">
            No subscription runs remaining
          </span>
        </div>
      )}
    </div>
  );
}
