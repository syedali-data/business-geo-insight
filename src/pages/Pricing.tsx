import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Check, Sparkles } from 'lucide-react';

export default function Pricing() {
  const plans = [
    {
      name: 'Starter',
      price: 49,
      credits: 100,
      description: 'Perfect for testing the waters',
      features: [
        '100 credits/month',
        'Up to 500 leads per run',
        'Email validation',
        'Basic insights & charts',
        'CSV export',
        'Email support',
      ],
      popular: false,
    },
    {
      name: 'Pro',
      price: 149,
      credits: 400,
      description: 'Best for growing agencies',
      features: [
        '400 credits/month',
        'Unlimited leads per run',
        'Email & phone validation',
        'Advanced insights',
        'CSV & PDF export',
        'Newsletter generation',
        'Priority support',
        'Public report sharing',
      ],
      popular: true,
    },
    {
      name: 'Business',
      price: 399,
      credits: 1200,
      description: 'For high-volume users',
      features: [
        '1200 credits/month',
        'Unlimited leads per run',
        'Full validation suite',
        'Custom integrations',
        'White-label reports',
        'Dedicated account manager',
        'API access',
        'Custom data enrichment',
      ],
      popular: false,
    },
  ];

  return (
    <>
      <Helmet>
        <title>Pricing - LocalPulse</title>
        <meta 
          name="description" 
          content="Simple, transparent pricing for hyperlocal lead generation. Start free with 20 credits."
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

        {/* Pricing Section */}
        <section className="py-20 md:py-32">
          <div className="container mx-auto px-4">
            <div className="text-center max-w-3xl mx-auto mb-16">
              <Badge variant="secondary" className="mb-4">Pricing</Badge>
              <h1 className="font-heading text-4xl md:text-5xl font-bold mb-4">
                Simple, Transparent Pricing
              </h1>
              <p className="text-lg text-muted-foreground">
                Start with 20 free credits. Upgrade anytime to unlock more power.
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
              {plans.map((plan, index) => (
                <Card 
                  key={index}
                  className={`p-8 ${plan.popular ? 'border-primary shadow-elegant ring-2 ring-primary/20' : ''}`}
                >
                  {plan.popular && (
                    <Badge className="mb-4">Most Popular</Badge>
                  )}
                  <h3 className="font-heading text-2xl font-bold mb-2">{plan.name}</h3>
                  <p className="text-sm text-muted-foreground mb-4">{plan.description}</p>
                  <div className="mb-6">
                    <span className="font-heading text-4xl font-bold">${plan.price}</span>
                    <span className="text-muted-foreground">/month</span>
                  </div>
                  <div className="mb-6 text-sm">
                    <Badge variant="secondary">{plan.credits} credits/month</Badge>
                  </div>
                  <Button 
                    className="w-full mb-6"
                    variant={plan.popular ? 'default' : 'outline'}
                  >
                    Get Started
                  </Button>
                  <ul className="space-y-3">
                    {plan.features.map((feature, idx) => (
                      <li key={idx} className="flex items-start gap-2 text-sm">
                        <Check className="h-4 w-4 text-primary mt-0.5 shrink-0" />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                </Card>
              ))}
            </div>

            {/* Add-ons */}
            <div className="mt-20 max-w-4xl mx-auto">
              <h2 className="font-heading text-2xl font-bold text-center mb-8">
                Flexible Add-Ons
              </h2>
              <div className="grid md:grid-cols-2 gap-6">
                <Card className="p-6">
                  <h3 className="font-heading text-lg font-semibold mb-2">
                    Extra Credits
                  </h3>
                  <p className="text-sm text-muted-foreground mb-4">
                    Need more runs? Buy credit packs anytime.
                  </p>
                  <div className="text-muted-foreground text-sm">
                    Starting at <span className="font-semibold text-foreground">$0.50/credit</span>
                  </div>
                </Card>
                <Card className="p-6">
                  <h3 className="font-heading text-lg font-semibold mb-2">
                    API Access
                  </h3>
                  <p className="text-sm text-muted-foreground mb-4">
                    Integrate LocalPulse into your workflow.
                  </p>
                  <div className="text-muted-foreground text-sm">
                    Available on <span className="font-semibold text-foreground">Business plan</span>
                  </div>
                </Card>
              </div>
            </div>

            {/* FAQ */}
            <div className="mt-20 max-w-3xl mx-auto">
              <h2 className="font-heading text-2xl font-bold text-center mb-8">
                Pricing FAQ
              </h2>
              <div className="space-y-6">
                <div>
                  <h3 className="font-semibold mb-2">What's a credit?</h3>
                  <p className="text-sm text-muted-foreground">
                    1 credit = 1 research run. Each run can generate up to 500 leads (or unlimited on Pro+).
                  </p>
                </div>
                <div>
                  <h3 className="font-semibold mb-2">Can I change plans?</h3>
                  <p className="text-sm text-muted-foreground">
                    Yes! Upgrade or downgrade anytime. Unused credits roll over for 90 days.
                  </p>
                </div>
                <div>
                  <h3 className="font-semibold mb-2">Do you offer refunds?</h3>
                  <p className="text-sm text-muted-foreground">
                    We offer a 7-day money-back guarantee on your first purchase.
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
