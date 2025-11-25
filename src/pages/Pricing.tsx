import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Check, Sparkles, Zap, Rocket, Crown, Star, FileText } from 'lucide-react';
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

      <div className="min-h-screen bg-background">
        {/* Header */}
        <header className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 sticky top-0 z-50">
          <div className="container mx-auto px-4 h-16 flex items-center justify-between">
            <Link to="/" className="flex items-center gap-2">
              <Sparkles className="h-6 w-6 text-primary" />
              <span className="font-heading text-xl font-bold">LocalPulse</span>
            </Link>
            <div className="flex items-center gap-4">
              <Link to="/case-studies" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                Case Studies
              </Link>
              <Link to="/dashboard">
                <Button size="sm">Get Started</Button>
              </Link>
            </div>
          </div>
        </header>

        {/* Hero Section with Gradient */}
        <section className="py-16 md:py-20 bg-gradient-to-b from-background via-muted/30 to-background">
          <div className="container mx-auto px-4">
            <div className="text-center max-w-3xl mx-auto mb-12">
              <h1 className="font-heading text-4xl md:text-5xl lg:text-6xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-foreground to-foreground/70">
                Simple, Transparent Pricing
              </h1>
              <p className="text-lg text-muted-foreground">
                Pay per run or subscribe monthly. No hidden fees, no credits to manage.
              </p>
            </div>

            {/* Subscription Plans - Main Focus */}
            <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto mb-16">
              {Object.values(SUBSCRIPTION_PLANS).map((plan) => (
                <Card 
                  key={plan.id}
                  className={`relative p-6 transition-all duration-300 hover:shadow-lg ${
                    plan.recommended 
                      ? 'border-primary shadow-elegant ring-1 ring-primary/20 scale-[1.02]' 
                      : 'hover:border-primary/50'
                  }`}
                >
                  {plan.recommended && (
                    <Badge className="absolute -top-3 left-1/2 -translate-x-1/2 bg-primary px-4">
                      <Star className="h-3 w-3 mr-1 fill-current" />
                      Most Popular
                    </Badge>
                  )}

                  <div className="mb-4">
                    <h3 className="font-heading text-xl font-bold">{plan.name}</h3>
                    <p className="text-sm text-muted-foreground">
                      {plan.id === 'starter' && 'Perfect for testing the waters'}
                      {plan.id === 'pro' && 'Best for growing agencies'}
                      {plan.id === 'business' && 'For high-volume users'}
                    </p>
                  </div>

                  <div className="mb-6">
                    <span className="font-heading text-4xl md:text-5xl font-bold">${plan.monthlyPrice}</span>
                    <span className="text-muted-foreground">/month</span>
                  </div>

                  <ul className="space-y-3 mb-6">
                    <li className="flex items-start gap-2 text-sm">
                      <Check className="h-4 w-4 text-primary mt-0.5 shrink-0" />
                      <span className="font-medium">{plan.runsIncluded} {plan.runTier === 'premium' ? 'Premium' : 'Basic'} runs/month</span>
                    </li>
                    <li className="flex items-start gap-2 text-sm">
                      <Check className="h-4 w-4 text-primary mt-0.5 shrink-0" />
                      <span>Up to {plan.runTier === 'premium' ? '500' : '100'} leads per run</span>
                    </li>
                    {plan.id === 'starter' && (
                      <>
                        <li className="flex items-start gap-2 text-sm">
                          <Check className="h-4 w-4 text-primary mt-0.5 shrink-0" />
                          <span>Email validation</span>
                        </li>
                        <li className="flex items-start gap-2 text-sm">
                          <Check className="h-4 w-4 text-primary mt-0.5 shrink-0" />
                          <span>Basic insights & charts</span>
                        </li>
                        <li className="flex items-start gap-2 text-sm">
                          <Check className="h-4 w-4 text-primary mt-0.5 shrink-0" />
                          <span>CSV export</span>
                        </li>
                        <li className="flex items-start gap-2 text-sm">
                          <Check className="h-4 w-4 text-primary mt-0.5 shrink-0" />
                          <span>Email support</span>
                        </li>
                      </>
                    )}
                    {plan.id === 'pro' && (
                      <>
                        <li className="flex items-start gap-2 text-sm">
                          <Check className="h-4 w-4 text-primary mt-0.5 shrink-0" />
                          <span>Email & phone validation</span>
                        </li>
                        <li className="flex items-start gap-2 text-sm">
                          <Check className="h-4 w-4 text-primary mt-0.5 shrink-0" />
                          <span>AI-powered insights</span>
                        </li>
                        <li className="flex items-start gap-2 text-sm">
                          <Check className="h-4 w-4 text-primary mt-0.5 shrink-0" />
                          <span>AI Newsletter generation</span>
                        </li>
                        <li className="flex items-start gap-2 text-sm">
                          <Check className="h-4 w-4 text-primary mt-0.5 shrink-0" />
                          <span>CSV & PDF export</span>
                        </li>
                        <li className="flex items-start gap-2 text-sm">
                          <Check className="h-4 w-4 text-primary mt-0.5 shrink-0" />
                          <span>Priority support</span>
                        </li>
                      </>
                    )}
                    {plan.id === 'business' && (
                      <>
                        <li className="flex items-start gap-2 text-sm">
                          <Check className="h-4 w-4 text-primary mt-0.5 shrink-0" />
                          <span>Full validation suite</span>
                        </li>
                        <li className="flex items-start gap-2 text-sm">
                          <Check className="h-4 w-4 text-primary mt-0.5 shrink-0" />
                          <span>Custom integrations</span>
                        </li>
                        <li className="flex items-start gap-2 text-sm">
                          <Check className="h-4 w-4 text-primary mt-0.5 shrink-0" />
                          <span>White-label reports</span>
                        </li>
                        <li className="flex items-start gap-2 text-sm">
                          <Check className="h-4 w-4 text-primary mt-0.5 shrink-0" />
                          <span>Dedicated account manager</span>
                        </li>
                        <li className="flex items-start gap-2 text-sm">
                          <Check className="h-4 w-4 text-primary mt-0.5 shrink-0" />
                          <span>API access</span>
                        </li>
                      </>
                    )}
                  </ul>

                  <Button 
                    className="w-full"
                    variant={plan.recommended ? 'default' : 'outline'}
                  >
                    Get Started
                  </Button>
                </Card>
              ))}
            </div>

            {/* Pay Per Run Section */}
            <div className="max-w-4xl mx-auto">
              <div className="text-center mb-8">
                <h2 className="font-heading text-2xl font-bold mb-2">
                  Or Pay Per Run
                </h2>
                <p className="text-muted-foreground">
                  No subscription needed. Pay only when you run research.
                </p>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                {/* Basic Tier */}
                <Card className="p-6">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="p-2 rounded-lg bg-muted">
                      <Zap className="h-5 w-5 text-muted-foreground" />
                    </div>
                    <div>
                      <h3 className="font-heading text-lg font-bold">{PRICING_TIERS.basic.name}</h3>
                      <p className="text-xs text-muted-foreground">
                        Up to {PRICING_TIERS.basic.maxLeads} businesses • {PRICING_TIERS.basic.processingTime}
                      </p>
                    </div>
                    <div className="ml-auto">
                      <span className="font-heading text-2xl font-bold">{formatPrice(PRICING_TIERS.basic.price)}</span>
                      <span className="text-sm text-muted-foreground">/run</span>
                    </div>
                  </div>

                  <ul className="space-y-2 mb-4">
                    {PRICING_TIERS.basic.features.slice(0, 5).map((feature, idx) => (
                      <li key={idx} className="flex items-start gap-2 text-sm">
                        <Check className="h-4 w-4 text-muted-foreground mt-0.5 shrink-0" />
                        <span className="text-muted-foreground">{feature}</span>
                      </li>
                    ))}
                  </ul>

                  <Button variant="outline" className="w-full" size="sm">
                    Start Basic Run
                  </Button>
                </Card>

                {/* Premium Tier */}
                <Card className="p-6 border-primary/50 bg-primary/5">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="p-2 rounded-lg bg-primary/10">
                      <Rocket className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-heading text-lg font-bold">{PRICING_TIERS.premium.name}</h3>
                      <p className="text-xs text-muted-foreground">
                        Up to {PRICING_TIERS.premium.maxLeads} businesses • {PRICING_TIERS.premium.processingTime}
                      </p>
                    </div>
                    <div className="ml-auto">
                      <span className="font-heading text-2xl font-bold text-primary">{formatPrice(PRICING_TIERS.premium.price)}</span>
                      <span className="text-sm text-muted-foreground">/run</span>
                    </div>
                  </div>

                  <ul className="space-y-2 mb-4">
                    {PRICING_TIERS.premium.features.slice(0, 6).map((feature, idx) => (
                      <li key={idx} className="flex items-start gap-2 text-sm">
                        <Check className="h-4 w-4 text-primary mt-0.5 shrink-0" />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>

                  <Button className="w-full" size="sm">
                    Start Premium Run
                  </Button>
                </Card>
              </div>
            </div>

            {/* Newsletter Feature Highlight */}
            <div className="max-w-3xl mx-auto mt-16">
              <Card className="p-6 bg-gradient-to-r from-primary/5 to-accent-purple/5 border-primary/20">
                <div className="flex flex-col md:flex-row items-center gap-6">
                  <div className="p-4 rounded-xl bg-primary/10">
                    <FileText className="h-8 w-8 text-primary" />
                  </div>
                  <div className="text-center md:text-left flex-1">
                    <h3 className="font-heading text-xl font-bold mb-1">AI Newsletter Generation</h3>
                    <p className="text-muted-foreground text-sm">
                      Turn your market research into professional newsletters with AI. Included free with every Premium run - no extra charge.
                    </p>
                  </div>
                  <Badge variant="secondary" className="text-xs whitespace-nowrap">
                    Included in Premium
                  </Badge>
                </div>
              </Card>
            </div>

            {/* FAQ */}
            <div className="mt-20 max-w-3xl mx-auto">
              <h2 className="font-heading text-2xl font-bold text-center mb-8">
                Frequently Asked Questions
              </h2>
              <div className="space-y-6">
                <div className="p-4 rounded-lg bg-card border">
                  <h3 className="font-semibold mb-2">What's the difference between Basic and Premium runs?</h3>
                  <p className="text-sm text-muted-foreground">
                    Basic runs give you up to 100 businesses with contact data in 30 seconds. Premium runs include up to 500 businesses plus email validation, AI-powered market analysis, newsletter generation, and detailed PDF reports.
                  </p>
                </div>
                <div className="p-4 rounded-lg bg-card border">
                  <h3 className="font-semibold mb-2">Is newsletter generation included?</h3>
                  <p className="text-sm text-muted-foreground">
                    Yes! AI newsletter generation is included free with every Premium run. Turn your research data into professional, ready-to-send newsletters.
                  </p>
                </div>
                <div className="p-4 rounded-lg bg-card border">
                  <h3 className="font-semibold mb-2">What happens if I run out of subscription runs?</h3>
                  <p className="text-sm text-muted-foreground">
                    You can purchase additional runs at the per-run price. Pro subscribers get 20% off, and Business subscribers get 30% off extra runs.
                  </p>
                </div>
                <div className="p-4 rounded-lg bg-card border">
                  <h3 className="font-semibold mb-2">Do unused runs roll over?</h3>
                  <p className="text-sm text-muted-foreground">
                    No, runs reset at the beginning of each billing cycle. We recommend choosing a plan that matches your typical monthly usage.
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
