import { TrendingDown, AlertCircle, CheckCircle } from 'lucide-react';
import { calculateCreditCost, getTierInfo, type SubscriptionTier } from '@/lib/billing';
import { cn } from '@/lib/utils';

interface CreditCostPreviewProps {
  leadCount: number;
  userCreditsRemaining: number;
  userTier?: string;
  className?: string;
  compact?: boolean;
}

export function CreditCostPreview({ 
  leadCount, 
  userCreditsRemaining,
  userTier = 'starter',
  className,
  compact = false
}: CreditCostPreviewProps) {
  const tier = (userTier.toLowerCase() as SubscriptionTier) || 'starter';
  const calculation = calculateCreditCost(leadCount, tier);
  const hasEnough = userCreditsRemaining >= calculation.creditsRequired;
  const balanceAfter = parseFloat((userCreditsRemaining - calculation.creditsRequired).toFixed(2));
  const shortfall = parseFloat((calculation.creditsRequired - userCreditsRemaining).toFixed(2));

  if (compact) {
    return (
      <div className={cn("space-y-3", className)}>
        <div className="flex items-center justify-between p-3 rounded-lg bg-muted/50 border">
          <span className="text-sm text-muted-foreground">Credits needed:</span>
          <span className="text-sm font-semibold">{calculation.creditsRequired} credits</span>
        </div>
        
        <div className="flex items-center justify-between p-3 rounded-lg bg-muted/50 border">
          <span className="text-sm text-muted-foreground">Estimated cost:</span>
          <span className="text-sm font-semibold">${calculation.dollarCost}</span>
        </div>

        {calculation.volumeDiscount > 0 && (
          <div className="flex items-center gap-2 p-2 rounded-lg bg-emerald-500/10 border border-emerald-500/20 text-emerald-600 dark:text-emerald-400">
            <TrendingDown className="h-4 w-4" />
            <span className="text-xs font-medium">
              {calculation.volumeDiscount}% volume discount applied
            </span>
          </div>
        )}

        {!hasEnough && (
          <div className="flex items-start gap-2 p-3 rounded-lg bg-destructive/10 border border-destructive/30 text-destructive">
            <AlertCircle className="h-4 w-4 mt-0.5 shrink-0" />
            <div className="text-sm">
              <p className="font-medium">Insufficient credits</p>
              <p className="text-destructive/80">
                Need {shortfall} more credit{shortfall !== 1 ? 's' : ''}. Balance: {userCreditsRemaining}
              </p>
            </div>
          </div>
        )}
      </div>
    );
  }

  return (
    <div className={cn(
      "rounded-xl border bg-gradient-to-br from-primary/5 to-primary/10 p-5",
      className
    )}>
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <h4 className="font-semibold text-sm">Research Cost Estimate</h4>
        <span className="text-xs font-medium px-2 py-1 rounded-full bg-primary/10 text-primary">
          ~{leadCount} leads
        </span>
      </div>

      {/* Cost Grid */}
      <div className="grid grid-cols-2 gap-3 mb-4">
        <div className="bg-background rounded-lg p-4 border-l-2 border-primary">
          <span className="text-xs text-muted-foreground block mb-1">Credits Needed</span>
          <span className="text-2xl font-bold text-primary">{calculation.creditsRequired}</span>
          <span className="text-xs text-muted-foreground block mt-1">
            {userCreditsRemaining} available
          </span>
        </div>

        <div className="bg-background rounded-lg p-4">
          <span className="text-xs text-muted-foreground block mb-1">Total Cost</span>
          <span className="text-2xl font-bold">${calculation.dollarCost}</span>
          <span className="text-xs text-muted-foreground block mt-1">
            ${calculation.costPerLead}/lead
          </span>
        </div>
      </div>

      {/* Volume Discount */}
      {calculation.volumeDiscount > 0 && (
        <div className="flex items-center gap-2 p-3 rounded-lg bg-emerald-500/10 border border-emerald-500/20 text-emerald-600 dark:text-emerald-400 mb-3">
          <TrendingDown className="h-4 w-4" />
          <span className="text-sm font-medium">
            {calculation.volumeDiscount}% volume discount applied
          </span>
        </div>
      )}

      {/* Balance Status */}
      {hasEnough ? (
        <div className="flex items-center gap-2 p-3 rounded-lg bg-emerald-500/10 border border-emerald-500/20 text-emerald-600 dark:text-emerald-400">
          <CheckCircle className="h-4 w-4" />
          <span className="text-sm font-medium">Sufficient credits available</span>
        </div>
      ) : (
        <div className="flex items-center justify-between gap-2 p-3 rounded-lg bg-destructive/10 border border-destructive/30 text-destructive">
          <div className="flex items-center gap-2">
            <AlertCircle className="h-4 w-4" />
            <span className="text-sm font-medium">
              Need {shortfall} more credit{shortfall !== 1 ? 's' : ''}
            </span>
          </div>
          <button className="text-xs font-medium underline hover:no-underline">
            Buy Credits
          </button>
        </div>
      )}

      {/* Balance After */}
      {hasEnough && (
        <div className="mt-3 pt-3 border-t text-sm text-muted-foreground">
          Balance after: <strong className="text-foreground">{balanceAfter} credits</strong>
        </div>
      )}
    </div>
  );
}
