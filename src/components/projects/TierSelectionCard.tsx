import { useState } from 'react';
import { cn } from '@/lib/utils';
import { PRICING_TIERS, formatPrice } from '@/lib/constants/pricing';
import type { PricingTier } from '@/lib/constants/pricing';
import { Check, Rocket, Star, ChevronDown, ChevronUp, Sparkles } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { motion, AnimatePresence } from 'framer-motion';

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
  const [showAllFeatures, setShowAllFeatures] = useState(false);
  const tierData = PRICING_TIERS[tier];
  const displayPrice = discountedPrice ?? tierData.price;
  const hasDiscount = discountedPrice && discountedPrice < tierData.price;
  
  const visibleFeatures = showAllFeatures ? tierData.features : tierData.features.slice(0, 5);
  const hiddenFeaturesCount = tierData.features.length - 5;

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className={cn(
        "relative flex flex-col text-left rounded-2xl border-2 transition-all duration-300",
        "bg-gradient-to-br from-card via-card to-primary/5",
        "hover:shadow-xl hover:shadow-primary/10",
        selected 
          ? "border-primary shadow-lg shadow-primary/20 ring-2 ring-primary/30" 
          : "border-primary/30",
        className
      )}
    >
      {/* Premium header with gradient */}
      <div className="relative p-5 pb-4 border-b border-primary/20 bg-gradient-to-r from-primary/10 via-transparent to-primary/5 rounded-t-xl">
        <Badge 
          className="absolute -top-3 right-4 bg-gradient-to-r from-primary to-primary/80 text-primary-foreground shadow-lg shadow-primary/30 px-3 py-1"
        >
          <Star className="h-3.5 w-3.5 mr-1.5 fill-current" />
          Recommended
        </Badge>

        <div className="flex items-start justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-gradient-to-br from-primary/20 to-primary/10 border border-primary/20">
              <Rocket className="h-6 w-6 text-primary" />
            </div>
            <div>
              <h4 className="font-bold text-lg text-foreground flex items-center gap-2">
                {tierData.name}
                <Sparkles className="h-4 w-4 text-primary" />
              </h4>
              <p className="text-sm text-muted-foreground">
                Up to {tierData.maxLeads} businesses
              </p>
            </div>
          </div>
          
          <div className="text-right">
            {hasDiscount && (
              <span className="text-sm text-muted-foreground line-through block">
                {formatPrice(tierData.price)}
              </span>
            )}
            <span className="text-3xl font-bold bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent">
              {formatPrice(displayPrice)}
            </span>
            <span className="text-xs text-muted-foreground block">per run</span>
          </div>
        </div>
      </div>

      {/* Processing time badge */}
      <div className="px-5 pt-4">
        <Badge variant="secondary" className="bg-primary/10 text-primary border-primary/20 font-medium">
          <Sparkles className="h-3 w-3 mr-1.5" />
          {tierData.processingTime}
        </Badge>
      </div>

      {/* Features list */}
      <div className="p-5 pt-3 flex-1">
        <ul className="space-y-2.5">
          <AnimatePresence mode="sync">
            {visibleFeatures.map((feature, i) => (
              <motion.li 
                key={feature}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -10 }}
                transition={{ delay: i * 0.03 }}
                className="flex items-start gap-2.5"
              >
                <div className="p-0.5 rounded-full bg-primary/20 mt-0.5">
                  <Check className="h-3 w-3 text-primary" />
                </div>
                <span className="text-sm text-foreground/80">{feature}</span>
              </motion.li>
            ))}
          </AnimatePresence>
        </ul>
        
        {/* Expandable features toggle */}
        {hiddenFeaturesCount > 0 && (
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              setShowAllFeatures(!showAllFeatures);
            }}
            className="mt-3 flex items-center gap-1.5 text-sm text-primary hover:text-primary/80 transition-colors font-medium pl-5"
          >
            {showAllFeatures ? (
              <>
                <ChevronUp className="h-4 w-4" />
                Show less
              </>
            ) : (
              <>
                <ChevronDown className="h-4 w-4" />
                +{hiddenFeaturesCount} more features
              </>
            )}
          </button>
        )}
      </div>

      {/* Selection indicator with glow */}
      <div className={cn(
        "absolute top-6 left-5 w-5 h-5 rounded-full border-2 transition-all duration-300",
        selected 
          ? "border-primary bg-primary shadow-lg shadow-primary/50" 
          : "border-muted-foreground/30 bg-transparent"
      )}>
        {selected && (
          <Check className="h-3 w-3 text-primary-foreground absolute top-0.5 left-0.5" />
        )}
      </div>
    </motion.div>
  );
}