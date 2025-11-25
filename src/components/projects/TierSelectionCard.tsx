import { cn } from '@/lib/utils';
import { PRICING_TIERS, formatPrice } from '@/lib/constants/pricing';
import type { PricingTier } from '@/lib/constants/pricing';
import { Check, Zap, Rocket, Star } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

interface TierSelectionCardProps {
  tier: PricingTier;
  selected: boolean;
  onSelect: (tier: PricingTier) => void;
  discountedPrice?: number;
  className?: string;
}

export function TierSelectionCard({
  tier,
  selected,
  onSelect,
  discountedPrice,
  className
}: TierSelectionCardProps) {
  const tierData = PRICING_TIERS[tier];
  const displayPrice = discountedPrice ?? tierData.price;
  const hasDiscount = discountedPrice && discountedPrice < tierData.price;
  const isRecommended = tier === 'premium';
  const Icon = tier === 'basic' ? Zap : Rocket;

  return (
    <button
      type="button"
      onClick={() => onSelect(tier)}
      className={cn(
        "relative flex flex-col text-left p-4 rounded-xl border-2 transition-all duration-200",
        "hover:border-primary/50 hover:shadow-md",
        selected 
          ? "border-primary bg-primary/5 shadow-sm ring-2 ring-primary/20" 
          : "border-border bg-card",
        className
      )}
    >
      {isRecommended && (
        <Badge 
          className="absolute -top-2.5 right-3 bg-primary text-primary-foreground"
        >
          <Star className="h-3 w-3 mr-1 fill-current" />
          Recommended
        </Badge>
      )}

      <div className="flex items-start justify-between mb-3">
        <div className="flex items-center gap-2">
          <div className={cn(
            "p-2 rounded-lg",
            selected ? "bg-primary/10" : "bg-muted"
          )}>
            <Icon className={cn(
              "h-5 w-5",
              selected ? "text-primary" : "text-muted-foreground"
            )} />
          </div>
          <div>
            <h4 className="font-semibold text-foreground">{tierData.name}</h4>
            <p className="text-xs text-muted-foreground">
              Up to {tierData.maxLeads} businesses
            </p>
          </div>
        </div>
        
        <div className="text-right">
          {hasDiscount && (
            <span className="text-xs text-muted-foreground line-through block">
              {formatPrice(tierData.price)}
            </span>
          )}
          <span className={cn(
            "text-xl font-bold",
            selected ? "text-primary" : "text-foreground"
          )}>
            {formatPrice(displayPrice)}
          </span>
        </div>
      </div>

      <div className="flex items-center gap-2 mb-3 pb-3 border-b border-border/50">
        <Badge variant="secondary" className="text-xs font-normal">
          {tierData.processingTime}
        </Badge>
      </div>

      <ul className="space-y-1.5 text-sm">
        {tierData.features.slice(0, 5).map((feature, i) => (
          <li key={i} className="flex items-start gap-2">
            <Check className={cn(
              "h-4 w-4 mt-0.5 flex-shrink-0",
              selected ? "text-primary" : "text-muted-foreground"
            )} />
            <span className="text-muted-foreground">{feature}</span>
          </li>
        ))}
        {tierData.features.length > 5 && (
          <li className="text-xs text-muted-foreground pl-6">
            +{tierData.features.length - 5} more features
          </li>
        )}
      </ul>

      {/* Selection indicator */}
      <div className={cn(
        "absolute top-3 left-3 w-4 h-4 rounded-full border-2 transition-all",
        selected 
          ? "border-primary bg-primary" 
          : "border-muted-foreground/30 bg-transparent"
      )}>
        {selected && (
          <Check className="h-3 w-3 text-primary-foreground absolute top-0.5 left-0.5" />
        )}
      </div>
    </button>
  );
}
