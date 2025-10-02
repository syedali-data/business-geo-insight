import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { 
  Search, 
  Target, 
  Mail, 
  BarChart3, 
  Zap, 
  CheckCircle2,
  ArrowRight,
  Sparkles
} from 'lucide-react';
import { motion } from 'framer-motion';

export default function Home() {
  const features = [
    {
      icon: Search,
      title: 'Smart Research',
      description: 'AI-powered lead discovery across multiple sources',
    },
    {
      icon: Target,
      title: 'Hyper-Local',
      description: 'Target specific cities, regions, and professions',
    },
    {
      icon: Mail,
      title: 'Validated Contacts',
      description: 'Email and phone verification included',
    },
    {
      icon: BarChart3,
      title: 'Actionable Insights',
      description: 'Charts, ratings, and market intelligence',
    },
  ];

  const stats = [
    { label: 'Businesses Analyzed', value: '2.4M+' },
    { label: 'Cities Covered', value: '15K+' },
    { label: 'Leads Generated', value: '890K+' },
    { label: 'Avg Email Accuracy', value: '94%' },
  ];

  return (
    <>
      <Helmet>
        <title>LocalPulse - Hyperlocal Lead Generation & Market Research</title>
        <meta 
          name="description" 
          content="Generate validated local business leads with AI-powered market research. Target any city, profession, or niche with actionable insights."
        />
      </Helmet>

      <div className="min-h-screen">
        {/* Header */}
        <header className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 sticky top-0 z-50">
          <div className="container mx-auto px-4 h-16 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Sparkles className="h-6 w-6 text-primary" />
              <span className="font-heading text-xl font-bold">LocalPulse</span>
            </div>
            <nav className="hidden md:flex items-center gap-6">
              <Link to="/pricing" className="text-sm font-medium hover:text-primary transition-colors">
                Pricing
              </Link>
              <Link to="/case-studies" className="text-sm font-medium hover:text-primary transition-colors">
                Case Studies
              </Link>
              <Link to="/faq" className="text-sm font-medium hover:text-primary transition-colors">
                FAQ
              </Link>
              <Link to="/dashboard">
                <Button variant="outline" size="sm">Dashboard</Button>
              </Link>
            </nav>
          </div>
        </header>

        {/* Hero Section */}
        <section className="gradient-hero py-20 md:py-32">
          <div className="container mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-center max-w-4xl mx-auto"
            >
              <Badge variant="secondary" className="mb-4">
                <Zap className="h-3 w-3 mr-1" />
                AI-Powered Local Market Research
              </Badge>
              <h1 className="font-heading text-4xl md:text-6xl font-bold mb-6 text-balance">
                Find Your Next Customer in{" "}
                <span className="bg-gradient-to-r from-cyan-400 to-sky-500 bg-clip-text text-transparent">
                  Any City
                </span>
              </h1>
              <p className="text-lg md:text-xl text-muted-foreground mb-8 text-balance max-w-2xl mx-auto">
                Generate validated leads for any profession in minutes. Get emails, ratings, insights, 
                and market intelligence—all from one research run.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link to="/projects?new=1">
                  <Button size="lg" className="shadow-elegant">
                    Start Free Research
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </Link>
                <Link to="/r/demo">
                  <Button size="lg" variant="outline">
                    See Demo
                  </Button>
                </Link>
              </div>
              
              {/* Trust badges */}
              <div className="mt-12 flex flex-wrap gap-8 justify-center items-center text-sm text-muted-foreground">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="h-4 w-4 text-primary" />
                  No credit card required
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="h-4 w-4 text-primary" />
                  20 free credits to start
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="h-4 w-4 text-primary" />
                  Instant setup
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Stats Section */}
        <section className="py-12 border-b">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              {stats.map((stat, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  className="text-center"
                >
                  <div className="font-heading text-3xl md:text-4xl font-bold text-primary mb-2">
                    {stat.value}
                  </div>
                  <div className="text-sm text-muted-foreground">{stat.label}</div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Interactive Demo Section */}
        <section id="demo" className="py-20 md:py-32">
          <div className="container mx-auto px-4">
            <div className="text-center max-w-3xl mx-auto mb-12">
              <h2 className="font-heading text-3xl md:text-5xl font-bold mb-4">
                See It In Action
              </h2>
              <p className="text-lg text-muted-foreground">
                No signup needed. Generate a sample report instantly to see what LocalPulse can do.
              </p>
            </div>

            <Card className="max-w-4xl mx-auto p-8 shadow-elegant">
              <div className="text-center">
                <p className="text-muted-foreground mb-6">
                  Example: London, Ontario roofing contractors
                </p>
                <Link to="/r/demo">
                  <Button size="lg" className="shadow-glow">
                    <Sparkles className="mr-2 h-4 w-4" />
                    Generate Sample Report
                  </Button>
                </Link>
                <p className="text-sm text-muted-foreground mt-4">
                  Results in ~30 seconds • No account required
                </p>
              </div>
            </Card>
          </div>
        </section>

        {/* Features Section */}
        <section className="py-20 md:py-32 bg-muted/30">
          <div className="container mx-auto px-4">
            <div className="text-center max-w-3xl mx-auto mb-16">
              <h2 className="font-heading text-3xl md:text-5xl font-bold mb-4">
                Everything You Need
              </h2>
              <p className="text-lg text-muted-foreground">
                From discovery to outreach, all in one platform
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              {features.map((feature, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                >
                  <Card className="p-6 h-full hover:shadow-elegant transition-shadow">
                    <feature.icon className="h-10 w-10 text-primary mb-4" />
                    <h3 className="font-heading text-xl font-semibold mb-2">
                      {feature.title}
                    </h3>
                    <p className="text-muted-foreground">
                      {feature.description}
                    </p>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 md:py-32">
          <div className="container mx-auto px-4">
            <Card className="gradient-card p-12 text-center shadow-elegant max-w-4xl mx-auto">
              <h2 className="font-heading text-3xl md:text-4xl font-bold mb-4">
                Ready to Find Your Next Customer?
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

        {/* Footer */}
        <footer className="border-t py-12">
          <div className="container mx-auto px-4">
            <div className="grid md:grid-cols-4 gap-8">
              <div>
                <div className="flex items-center gap-2 mb-4">
                  <Sparkles className="h-5 w-5 text-primary" />
                  <span className="font-heading text-lg font-bold">LocalPulse</span>
                </div>
                <p className="text-sm text-muted-foreground">
                  Hyperlocal lead generation powered by AI
                </p>
              </div>
              <div>
                <h4 className="font-semibold mb-4">Product</h4>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li><Link to="/pricing" className="hover:text-foreground">Pricing</Link></li>
                  <li><Link to="/case-studies" className="hover:text-foreground">Case Studies</Link></li>
                  <li><Link to="/faq" className="hover:text-foreground">FAQ</Link></li>
                </ul>
              </div>
              <div>
                <h4 className="font-semibold mb-4">Company</h4>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li><Link to="/contact" className="hover:text-foreground">Contact</Link></li>
                </ul>
              </div>
              <div>
                <h4 className="font-semibold mb-4">Legal</h4>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li><a href="#" className="hover:text-foreground">Privacy</a></li>
                  <li><a href="#" className="hover:text-foreground">Terms</a></li>
                </ul>
              </div>
            </div>
            <div className="mt-12 pt-8 border-t text-center text-sm text-muted-foreground">
              © 2025 LocalPulse. All rights reserved.
            </div>
          </div>
        </footer>
      </div>
    </>
  );
}
