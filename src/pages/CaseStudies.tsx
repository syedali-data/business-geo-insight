import { Helmet } from 'react-helmet-async';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Sparkles, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function CaseStudies() {
  const caseStudies = [
    {
      id: 1,
      niche: 'Roofing Contractors',
      location: 'London, ON',
      results: '47 qualified leads in 3 minutes',
      emailRate: '94%',
      description: 'Local roofing company generated a months worth of leads in one afternoon.',
    },
    {
      id: 2,
      niche: 'HVAC Services',
      location: 'Toronto, ON',
      results: '83 leads with verified contacts',
      emailRate: '91%',
      description: 'HVAC provider expanded to new market with targeted local intelligence.',
    },
    {
      id: 3,
      niche: 'Dental Clinics',
      location: 'Vancouver, BC',
      results: '31 high-quality prospects',
      emailRate: '97%',
      description: 'Dental marketing agency built hyper-targeted campaign in minutes.',
    },
  ];

  return (
    <>
      <Helmet>
        <title>Case Studies - LocalPulse</title>
        <meta name="description" content="See how businesses use LocalPulse for hyperlocal lead generation" />
      </Helmet>

      <div className="min-h-screen bg-background">
        {/* Header */}
        <header className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 sticky top-0 z-50">
          <div className="container mx-auto px-4 h-16 flex items-center justify-between">
            <Link to="/" className="flex items-center gap-2">
              <Sparkles className="h-6 w-6 text-primary" />
              <span className="font-heading text-xl font-bold">LocalPulse</span>
            </Link>
            <nav className="hidden md:flex items-center gap-6">
              <Link to="/pricing" className="text-sm font-medium hover:text-primary transition-colors">
                Pricing
              </Link>
              <Link to="/dashboard">
                <Button variant="outline" size="sm">Dashboard</Button>
              </Link>
            </nav>
          </div>
        </header>

        {/* Hero */}
        <section className="py-20 md:py-32">
          <div className="container mx-auto px-4">
            <div className="text-center max-w-3xl mx-auto">
              <h1 className="font-heading text-4xl md:text-5xl font-bold mb-6">
                Real Results from Real Businesses
              </h1>
              <p className="text-lg text-muted-foreground">
                See how companies across industries use LocalPulse to find their next customers
              </p>
            </div>
          </div>
        </section>

        {/* Case Studies Grid */}
        <section className="pb-20 md:pb-32">
          <div className="container mx-auto px-4">
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
              {caseStudies.map((study) => (
                <Card key={study.id} className="p-6 hover:shadow-elegant transition-shadow">
                  <Badge variant="secondary" className="mb-4">{study.niche}</Badge>
                  <h3 className="font-heading text-xl font-semibold mb-2">{study.location}</h3>
                  <p className="text-muted-foreground mb-4">{study.description}</p>
                  <div className="space-y-2 mb-4">
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Results:</span>
                      <span className="font-medium">{study.results}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Email rate:</span>
                      <span className="font-medium text-primary">{study.emailRate}</span>
                    </div>
                  </div>
                  <Button variant="outline" className="w-full">
                    View Full Study
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="pb-20">
          <div className="container mx-auto px-4">
            <Card className="gradient-card p-12 text-center shadow-elegant max-w-4xl mx-auto">
              <h2 className="font-heading text-3xl md:text-4xl font-bold mb-4">
                Ready to Write Your Success Story?
              </h2>
              <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
                Start with 20 free credits. No credit card required.
              </p>
              <Link to="/dashboard">
                <Button size="lg" className="shadow-glow">
                  Get Started Free
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
            </Card>
          </div>
        </section>
      </div>
    </>
  );
}
