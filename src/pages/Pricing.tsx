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

      <div className="min-h-screen bg-gradient-to-b from-background via-[hsl(222,47%,8%)] to-background">
        {/* Header */}
        <header className="border-b border-border/50 bg-background/80 backdrop-blur-lg sticky top-0 z-50">
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
                <Button size="sm" className="bg-gradient-to-r from-primary to-primary/80 hover:from-primary/90 hover:to-primary/70">Get Started</Button>
              </Link>
            </div>
          </div>
        </header>

        {/* Hero Section with Gradient */}
        <section className="py-16 md:py-24">
          <div className="container mx-auto px-4">
            <div className="text-center max-w-3xl mx-auto mb-16">
              <h1 className="font-heading text-4xl md:text-5xl lg:text-6xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-foreground via-foreground to-foreground/60">
                Simple, Transparent Pricing
              </h1>
              <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto">
                Pay per run or subscribe monthly. No hidden fees, no credits to manage.
              </p>
            </div>

            {/* Subscription Plans - Main Focus */}
            <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto mb-20">
              {Object.values(SUBSCRIPTION_PLANS).map((plan) => (
                <Card 
                  key={plan.id}
                  className={`relative p-8 transition-all duration-300 hover:scale-[1.02] bg-card/60 backdrop-blur-sm ${
                    plan.recommended 
                      ? 'border-primary/50 shadow-[0_0_40px_rgba(14,165,233,0.15)] ring-1 ring-primary/20' 
                      : 'border-border/50 hover:border-primary/30 hover:shadow-[0_0_30px_rgba(14,165,233,0.1)]'
                  }`}
                >
                  {plan.recommended && (
                    <Badge className="absolute -top-3 left-1/2 -translate-x-1/2 bg-gradient-to-r from-primary to-primary/80 border-0 shadow-lg px-4">
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
                    className={`w-full ${plan.recommended ? 'bg-gradient-to-r from-primary to-primary/80 hover:from-primary/90 hover:to-primary/70 shadow-lg shadow-primary/25' : ''}`}
                    variant={plan.recommended ? 'default' : 'outline'}
                    size="lg"
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

              <div className="grid md:grid-cols-2 gap-8">
                {/* Basic Tier */}
                <Card className="p-6 bg-card/60 backdrop-blur-sm border-border/50 hover:border-primary/30 hover:shadow-[0_0_30px_rgba(14,165,233,0.1)] transition-all duration-300">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="p-2 rounded-lg bg-muted/50">
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
                <Card className="relative p-6 border-primary/50 bg-card/60 backdrop-blur-sm shadow-[0_0_40px_rgba(14,165,233,0.15)] ring-1 ring-primary/20">
                  <Badge className="absolute -top-3 right-4 bg-gradient-to-r from-primary to-primary/80 border-0 shadow-lg">
                    Recommended
                  </Badge>
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

                  <Button className="w-full bg-gradient-to-r from-primary to-primary/80 hover:from-primary/90 hover:to-primary/70 shadow-lg shadow-primary/25" size="sm">
                    Start Premium Run
                  </Button>
                </Card>
              </div>
            </div>

            {/* Newsletter Feature Highlight */}
            <div className="max-w-3xl mx-auto mt-20">
              <Card className="p-8 bg-gradient-to-r from-primary/10 via-primary/5 to-[hsl(280,80%,60%)]/10 border-primary/30 shadow-[0_0_60px_rgba(14,165,233,0.1)]">
                <div className="flex flex-col md:flex-row items-center gap-6">
                  <div className="p-4 rounded-xl bg-gradient-to-br from-primary/20 to-primary/10 shadow-lg">
                    <FileText className="h-8 w-8 text-primary" />
                  </div>
                  <div className="text-center md:text-left flex-1">
                    <h3 className="font-heading text-xl font-bold mb-2">AI Newsletter Generation</h3>
                    <p className="text-muted-foreground">
                      Turn your market research into professional newsletters with AI. Included free with every Premium run - no extra charge.
                    </p>
                  </div>
                  <Badge className="bg-gradient-to-r from-primary to-primary/80 border-0 shadow-lg text-sm px-4 py-1 whitespace-nowrap">
                    Included in Premium
                  </Badge>
                </div>
              </Card>
            </div>

            {/* FAQ */}
            <div className="mt-24 max-w-3xl mx-auto pb-12">
              <h2 className="font-heading text-3xl font-bold text-center mb-10 bg-clip-text text-transparent bg-gradient-to-r from-foreground to-foreground/70">
                Frequently Asked Questions
              </h2>
              <div className="space-y-4">
                <div className="p-5 rounded-xl bg-card/60 backdrop-blur-sm border border-border/50 hover:border-primary/30 transition-colors">
                  <h3 className="font-semibold mb-2">What's the difference between Basic and Premium runs?</h3>
                  <p className="text-sm text-muted-foreground">
                    Basic runs give you up to 100 businesses with contact data in 30 seconds. Premium runs include up to 500 businesses plus email validation, AI-powered market analysis, newsletter generation, and detailed PDF reports.
                  </p>
                </div>
                <div className="p-5 rounded-xl bg-card/60 backdrop-blur-sm border border-border/50 hover:border-primary/30 transition-colors">
                  <h3 className="font-semibold mb-2">Is newsletter generation included?</h3>
                  <p className="text-sm text-muted-foreground">
                    Yes! AI newsletter generation is included free with every Premium run. Turn your research data into professional, ready-to-send newsletters.
                  </p>
                </div>
                <div className="p-5 rounded-xl bg-card/60 backdrop-blur-sm border border-border/50 hover:border-primary/30 transition-colors">
                  <h3 className="font-semibold mb-2">What happens if I run out of subscription runs?</h3>
                  <p className="text-sm text-muted-foreground">
                    You can purchase additional runs at the per-run price. Pro subscribers get 20% off, and Business subscribers get 30% off extra runs.
                  </p>
                </div>
                <div className="p-5 rounded-xl bg-card/60 backdrop-blur-sm border border-border/50 hover:border-primary/30 transition-colors">
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
