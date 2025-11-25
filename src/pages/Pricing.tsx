import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Check, Sparkles, Zap, Rocket, Crown, Star } from 'lucide-react';
import { PRICING_TIERS, SUBSCRIPTION_PLANS, formatPrice } from '@/lib/constants/pricing';

export default function Pricing() {
  return (
    <>
      <Helmet>
        <title>Pricing - LocalPulse</title>
        <meta 
          name="description" 
          content="Simple, transparent pricing for hyperlocal lead generation. Pay per run or subscribe and save."
        />
      </Helmet>

      <div className="min-h-screen">
        {/* Header */}
        <header className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 sticky top-0 z-50">
          <div className="container mx-auto px-4 h-16 flex items-center justify-between">
            <Link to="/" className="flex items-center gap-2">
              <Sparkles className="h-6 w-6 text-primary" />
              <span className="font-heading text-xl font-bold">LocalPulse</span>
            </Link>
            <Link to="/dashboard">
              <Button variant="outline" size="sm">Dashboard</Button>
            </Link>
          </div>
        </header>

        {/* Hero */}
        <section className="py-16 md:py-24">
          <div className="container mx-auto px-4">
            <div className="text-center max-w-3xl mx-auto mb-16">
              <Badge variant="secondary" className="mb-4">Simple Pricing</Badge>
              <h1 className="font-heading text-4xl md:text-5xl font-bold mb-4">
                Pay Per Run or Subscribe & Save
              </h1>
              <p className="text-lg text-muted-foreground">
                Choose the research depth you need. No hidden fees, no credits to manage.
              </p>
            </div>

            {/* Pay Per Run Section */}
            <div className="max-w-4xl mx-auto mb-20">
              <h2 className="font-heading text-2xl font-bold text-center mb-2">
                Pay Per Run
              </h2>
              <p className="text-center text-muted-foreground mb-8">
                No commitment. Pay only for what you use.
              </p>

              <div className="grid md:grid-cols-2 gap-6">
                {/* Basic Tier */}
                <Card className="p-6 relative">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="p-2 rounded-lg bg-muted">
                      <Zap className="h-5 w-5 text-muted-foreground" />
                    </div>
                    <div>
                      <h3 className="font-heading text-xl font-bold">{PRICING_TIERS.basic.name}</h3>
                      <p className="text-sm text-muted-foreground">
                        Up to {PRICING_TIERS.basic.maxLeads} businesses
                      </p>
                    </div>
                  </div>

                  <div className="mb-4">
                    <span className="font-heading text-4xl font-bold">{formatPrice(PRICING_TIERS.basic.price)}</span>
                    <span className="text-muted-foreground"> /run</span>
                  </div>

                  <Badge variant="secondary" className="mb-4">
                    ⚡ {PRICING_TIERS.basic.processingTime}
                  </Badge>

                  <ul className="space-y-2 mb-6">
                    {PRICING_TIERS.basic.features.map((feature, idx) => (
                      <li key={idx} className="flex items-start gap-2 text-sm">
                        <Check className="h-4 w-4 text-primary mt-0.5 shrink-0" />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>

                  <Button variant="outline" className="w-full">
                    Get Started
                  </Button>
                </Card>

                {/* Premium Tier */}
                <Card className="p-6 relative border-primary shadow-elegant ring-2 ring-primary/20">
                  <Badge className="absolute -top-2.5 right-4 bg-primary">
                    <Star className="h-3 w-3 mr-1 fill-current" />
                    Recommended
                  </Badge>

                  <div className="flex items-center gap-3 mb-4">
                    <div className="p-2 rounded-lg bg-primary/10">
                      <Rocket className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-heading text-xl font-bold">{PRICING_TIERS.premium.name}</h3>
                      <p className="text-sm text-muted-foreground">
                        Up to {PRICING_TIERS.premium.maxLeads} businesses
                      </p>
                    </div>
                  </div>

                  <div className="mb-4">
                    <span className="font-heading text-4xl font-bold">{formatPrice(PRICING_TIERS.premium.price)}</span>
                    <span className="text-muted-foreground"> /run</span>
                  </div>

                  <Badge variant="secondary" className="mb-4">
                    🚀 {PRICING_TIERS.premium.processingTime}
                  </Badge>

                  <ul className="space-y-2 mb-6">
                    {PRICING_TIERS.premium.features.map((feature, idx) => (
                      <li key={idx} className="flex items-start gap-2 text-sm">
                        <Check className="h-4 w-4 text-primary mt-0.5 shrink-0" />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>

                  <Button className="w-full">
                    Get Started
                  </Button>
                </Card>
              </div>
            </div>

            {/* Subscription Plans */}
            <div className="max-w-6xl mx-auto">
              <h2 className="font-heading text-2xl font-bold text-center mb-2">
                Subscription Plans
              </h2>
              <p className="text-center text-muted-foreground mb-8">
                Save money with included runs every month
              </p>

              <div className="grid md:grid-cols-3 gap-6">
                {Object.values(SUBSCRIPTION_PLANS).map((plan) => (
                  <Card 
                    key={plan.id}
                    className={`p-6 relative ${plan.recommended ? 'border-primary shadow-elegant ring-2 ring-primary/20' : ''}`}
                  >
                    {plan.recommended && (
                      <Badge className="absolute -top-2.5 right-4 bg-primary">
                        <Crown className="h-3 w-3 mr-1" />
                        Most Popular
                      </Badge>
                    )}

                    <h3 className="font-heading text-xl font-bold mb-1">{plan.name}</h3>
                    <p className="text-sm text-muted-foreground mb-4">
                      {plan.runsIncluded} {plan.runTier} runs/month
                    </p>

                    <div className="mb-4">
                      <span className="font-heading text-4xl font-bold">${plan.monthlyPrice}</span>
                      <span className="text-muted-foreground">/month</span>
                    </div>

                    <ul className="space-y-2 mb-6">
                      {plan.features.map((feature, idx) => (
                        <li key={idx} className="flex items-start gap-2 text-sm">
                          <Check className="h-4 w-4 text-primary mt-0.5 shrink-0" />
                          <span>{feature}</span>
                        </li>
                      ))}
                    </ul>

                    <Button 
                      className="w-full"
                      variant={plan.recommended ? 'default' : 'outline'}
                    >
                      Start Free Trial
                    </Button>
                  </Card>
                ))}
              </div>
            </div>

            {/* FAQ */}
            <div className="mt-20 max-w-3xl mx-auto">
              <h2 className="font-heading text-2xl font-bold text-center mb-8">
                Frequently Asked Questions
              </h2>
              <div className="space-y-6">
                <div>
                  <h3 className="font-semibold mb-2">What's the difference between Basic and Premium runs?</h3>
                  <p className="text-sm text-muted-foreground">
                    Basic runs give you up to 100 businesses with contact data. Premium runs include up to 500 businesses plus email validation, AI-powered market analysis, and detailed reports.
                  </p>
                </div>
                <div>
                  <h3 className="font-semibold mb-2">What happens if I run out of runs?</h3>
                  <p className="text-sm text-muted-foreground">
                    You can purchase additional runs at the per-run price. Pro and Business subscribers get 20-30% discounts on extra runs.
                  </p>
                </div>
                <div>
                  <h3 className="font-semibold mb-2">Can I change plans?</h3>
                  <p className="text-sm text-muted-foreground">
                    Yes! Upgrade or downgrade anytime. Changes take effect immediately.
                  </p>
                </div>
                <div>
                  <h3 className="font-semibold mb-2">Do unused runs roll over?</h3>
                  <p className="text-sm text-muted-foreground">
                    No, runs reset at the beginning of each billing cycle. However, Pro and Business plans include discounts on extra runs.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}
