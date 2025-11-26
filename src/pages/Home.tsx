import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { 
  Search, 
  Target, 
  Mail, 
  BarChart3, 
  Zap, 
  CheckCircle2,
  ArrowRight,
  Sparkles,
  TrendingUp,
  Users,
  Building2,
  Star,
  Check
} from 'lucide-react';
import { motion, useScroll, useTransform } from 'framer-motion';
import AnimatedCounter from '@/components/AnimatedCounter';
import { useState } from 'react';

export default function Home() {
  const [demoLoading, setDemoLoading] = useState(false);
  const { scrollY } = useScroll();
  const y = useTransform(scrollY, [0, 500], [0, 150]);
  const opacity = useTransform(scrollY, [0, 300], [1, 0]);

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
    { label: 'Businesses Analyzed', value: 2.4, suffix: 'M+', icon: Building2 },
    { label: 'Cities Covered', value: 15, suffix: 'K+', icon: Target },
    { label: 'Leads Generated', value: 890, suffix: 'K+', icon: Users },
    { label: 'Avg Email Accuracy', value: 94, suffix: '%', icon: CheckCircle2 },
  ];

  const caseStudies = [
    {
      industry: 'Roofing Contractors',
      location: 'London, ON',
      description: 'Local roofing company generated a month\'s worth of leads in one afternoon.',
      results: ['47 qualified leads', '94% email rate', '3 minutes'],
      color: 'bg-blue-500',
    },
    {
      industry: 'HVAC Services',
      location: 'Toronto, ON',
      description: 'Service provider expanded into new territories with validated prospect data.',
      results: ['63 businesses found', '89% email coverage', '2 new contracts'],
      color: 'bg-purple-500',
    },
    {
      industry: 'Dental Clinics',
      location: 'Vancouver, BC',
      description: 'Marketing agency used insights to craft targeted campaigns for dental practices.',
      results: ['82 practices analyzed', '4.2 avg rating', '68% had reviews'],
      color: 'bg-pink-500',
    },
  ];

  const pricingTiers = [
    {
      name: 'Starter',
      price: 29,
      description: 'Perfect for testing the waters',
      features: [
        '5 Basic runs/month',
        'Up to 100 leads per run',
        'Email validation',
        'Basic insights & charts',
        'CSV export',
        'Email support',
      ],
      cta: 'Get Started',
      popular: false,
    },
    {
      name: 'Pro',
      price: 79,
      description: 'Best for growing agencies',
      features: [
        '15 Premium runs/month',
        'Up to 500 leads per run',
        'Email & phone validation',
        'AI Newsletter included',
        'CSV & PDF export',
        'Priority support',
      ],
      cta: 'Get Started',
      popular: true,
    },
    {
      name: 'Business',
      price: 199,
      description: 'For high-volume users',
      features: [
        '50 Premium runs/month',
        'Up to 500 leads per run',
        'Full validation suite',
        'AI Newsletter included',
        'White-label reports',
        'Dedicated account manager',
        '30% off extra runs',
      ],
      cta: 'Get Started',
      popular: false,
    },
  ];

  const handleDemoClick = () => {
    setDemoLoading(true);
    setTimeout(() => {
      window.location.href = '/r/demo';
    }, 1500);
  };

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
        <header className="glass sticky top-0 z-50">
          <div className="container mx-auto px-4 h-16 flex items-center justify-between">
            <Link to="/" className="flex items-center gap-2">
              <Sparkles className="h-6 w-6 text-primary" />
              <span className="font-heading text-xl font-bold">LocalPulse</span>
            </Link>
            <nav className="hidden md:flex items-center gap-6">
              <a href="#pricing" className="text-sm font-medium hover:text-primary transition-colors">
                Pricing
              </a>
              <a href="#case-studies" className="text-sm font-medium hover:text-primary transition-colors">
                Case Studies
              </a>
              <Link to="/dashboard">
                <Button variant="default" size="sm">Get Started</Button>
              </Link>
            </nav>
          </div>
        </header>

        {/* Hero Section */}
        <section className="relative min-h-[90vh] flex items-center overflow-hidden">
          {/* Animated gradient background */}
          <div className="absolute inset-0 bg-gradient-to-br from-primary-50 via-background to-purple-50 dark:from-primary-950 dark:via-background dark:to-purple-950">
            <div className="absolute inset-0 bg-grid-pattern opacity-5"></div>
          </div>

          <div className="container relative z-10 mx-auto px-4 py-20">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              {/* Left Column - Hero Content */}
              <motion.div
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8 }}
                style={{ opacity }}
              >
                <Badge variant="glass" size="lg" className="mb-6 shadow-md">
                  <Sparkles className="h-3 w-3 mr-1" />
                  🤖 AI-Powered Local Market Research
                </Badge>
                
                <h1 className="font-heading text-5xl md:text-7xl font-extrabold mb-6 leading-tight">
                  Find Your Next Customer in{" "}
                  <span className="gradient-text">Any City</span>
                </h1>
                
                <p className="text-xl md:text-2xl text-muted-foreground mb-8 leading-relaxed max-w-xl">
                  Generate validated leads for any profession in minutes. Get emails, ratings, insights, 
                  and market intelligence—all from one research run.
                </p>
                
                <div className="flex flex-col sm:flex-row gap-4 mb-8">
                  <Link to="/projects?new=1">
                    <Button size="xl" variant="premium" className="group">
                      Start Free Research
                      <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                    </Button>
                  </Link>
                  <Link to="/r/demo">
                    <Button size="xl" variant="outline">
                      See Demo
                    </Button>
                  </Link>
                </div>
                
                {/* Trust badges */}
                <div className="flex flex-wrap gap-6 text-sm">
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <div className="h-5 w-5 rounded-full bg-primary/10 flex items-center justify-center">
                      <Check className="h-3 w-3 text-primary" />
                    </div>
                    No credit card required
                  </div>
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <div className="h-5 w-5 rounded-full bg-primary/10 flex items-center justify-center">
                      <Check className="h-3 w-3 text-primary" />
                    </div>
                    First run free
                  </div>
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <div className="h-5 w-5 rounded-full bg-primary/10 flex items-center justify-center">
                      <Check className="h-3 w-3 text-primary" />
                    </div>
                    Instant setup
                  </div>
                </div>
              </motion.div>

              {/* Right Column - Floating Dashboard Preview */}
              <motion.div
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                style={{ y }}
                className="relative hidden lg:block"
              >
                <motion.div
                  animate={{ y: [0, -20, 0] }}
                  transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                  className="relative"
                >
                  <Card variant="glass" className="shadow-2xl shadow-primary/20 overflow-hidden">
                    <div className="bg-gradient-to-br from-primary-500 to-purple-600 p-6">
                      <div className="flex items-center justify-between mb-4">
                        <div className="flex items-center gap-2">
                          <div className="h-3 w-3 rounded-full bg-red-400"></div>
                          <div className="h-3 w-3 rounded-full bg-yellow-400"></div>
                          <div className="h-3 w-3 rounded-full bg-green-400"></div>
                        </div>
                        <Badge variant="glass" className="text-white">Live Preview</Badge>
                      </div>
                      <h3 className="text-white font-bold text-lg mb-1">Market Analysis</h3>
                      <p className="text-white/80 text-sm">Toronto Roofing Contractors</p>
                    </div>
                    <CardContent className="p-6 space-y-4">
                      <div className="grid grid-cols-2 gap-4">
                        <div className="bg-muted/50 rounded-lg p-4">
                          <div className="text-3xl font-bold text-primary mb-1">52</div>
                          <div className="text-xs text-muted-foreground">Businesses</div>
                        </div>
                        <div className="bg-muted/50 rounded-lg p-4">
                          <div className="text-3xl font-bold text-primary mb-1">4.2</div>
                          <div className="text-xs text-muted-foreground">Avg Rating</div>
                        </div>
                      </div>
                      <div className="h-32 bg-muted/50 rounded-lg flex items-end gap-2 p-4">
                        <div className="flex-1 bg-primary/60 rounded-t" style={{ height: '40%' }}></div>
                        <div className="flex-1 bg-primary/70 rounded-t" style={{ height: '65%' }}></div>
                        <div className="flex-1 bg-primary/80 rounded-t" style={{ height: '85%' }}></div>
                        <div className="flex-1 bg-primary rounded-t" style={{ height: '100%' }}></div>
                      </div>
                      <div className="space-y-2">
                        <div className="flex items-center justify-between text-sm">
                          <span className="text-muted-foreground">Email Coverage</span>
                          <span className="font-semibold">89%</span>
                        </div>
                        <div className="h-2 bg-muted rounded-full overflow-hidden">
                          <div className="h-full bg-gradient-to-r from-primary-500 to-primary-600 rounded-full" style={{ width: '89%' }}></div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                  
                  {/* Floating badges */}
                  <motion.div
                    animate={{ y: [0, -10, 0], rotate: [0, 5, 0] }}
                    transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                    className="absolute -top-6 -left-6"
                  >
                    <Badge variant="success" size="lg" className="shadow-lg">
                      <TrendingUp className="mr-1 h-3 w-3" />
                      94% Accuracy
                    </Badge>
                  </motion.div>
                  
                  <motion.div
                    animate={{ y: [0, 10, 0], rotate: [0, -5, 0] }}
                    transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
                    className="absolute -bottom-4 -right-6"
                  >
                    <Badge variant="purple" size="lg" className="shadow-lg">
                      <Zap className="mr-1 h-3 w-3" />
                      30s Results
                    </Badge>
                  </motion.div>
                </motion.div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Stats Section */}
        <section className="py-16 border-y bg-muted/30">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              {stats.map((stat, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                  <Card variant="glass" hover="lift" className="text-center p-6">
                    <stat.icon className="h-10 w-10 text-primary mx-auto mb-4" />
                    <div className="font-heading text-4xl md:text-5xl font-extrabold gradient-text mb-2">
                      <AnimatedCounter end={stat.value} suffix={stat.suffix} />
                    </div>
                    <div className="text-sm text-muted-foreground font-medium">{stat.label}</div>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Interactive Demo Section */}
        <section id="demo" className="py-20 md:py-32">
          <div className="container mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center max-w-3xl mx-auto mb-12"
            >
              <h2 className="font-heading text-4xl md:text-5xl font-bold mb-4">
                See It In Action
              </h2>
              <p className="text-lg text-muted-foreground">
                No signup needed. Generate a sample report instantly to see what LocalPulse can do.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
            >
              <Card variant="glass" className="max-w-2xl mx-auto p-8 shadow-elegant hover:shadow-glow transition-shadow">
                <div className="text-center space-y-6">
                  <div className="inline-block px-4 py-2 rounded-full bg-muted/50 text-sm text-muted-foreground">
                    Example: <span className="font-medium text-foreground">London, Ontario roofing contractors</span>
                  </div>
                  
                  <Button 
                    size="xl" 
                    variant="premium" 
                    onClick={handleDemoClick}
                    disabled={demoLoading}
                    className="group"
                  >
                    {demoLoading ? (
                      <>
                        <motion.div
                          animate={{ rotate: 360 }}
                          transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                          className="mr-2"
                        >
                          <Sparkles className="h-5 w-5" />
                        </motion.div>
                        Generating...
                      </>
                    ) : (
                      <>
                        <Sparkles className="mr-2 h-5 w-5" />
                        Generate Sample Report
                      </>
                    )}
                  </Button>
                  
                  <p className="text-sm text-muted-foreground">
                    Results in ~30 seconds • No account required
                  </p>
                </div>
              </Card>
            </motion.div>
          </div>
        </section>

        {/* Features Section */}
        <section className="py-20 md:py-32 bg-muted/30">
          <div className="container mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center max-w-3xl mx-auto mb-16"
            >
              <h2 className="font-heading text-4xl md:text-5xl font-bold mb-4">
                Everything You Need
              </h2>
              <p className="text-lg text-muted-foreground">
                From discovery to outreach, all in one platform
              </p>
            </motion.div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {features.map((feature, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                  <Card variant="elevated" hover="lift" className="p-6 h-full">
                    <div className="h-12 w-12 rounded-xl bg-primary/10 flex items-center justify-center mb-4">
                      <feature.icon className="h-6 w-6 text-primary" />
                    </div>
                    <h3 className="font-heading text-xl font-semibold mb-2">
                      {feature.title}
                    </h3>
                    <p className="text-muted-foreground text-sm">
                      {feature.description}
                    </p>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Case Studies Section */}
        <section id="case-studies" className="py-20 md:py-32">
          <div className="container mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center max-w-3xl mx-auto mb-16"
            >
              <h2 className="font-heading text-4xl md:text-5xl font-bold mb-4">
                Real Results from Real Businesses
              </h2>
              <p className="text-lg text-muted-foreground">
                See how companies use LocalPulse to accelerate their growth
              </p>
            </motion.div>

            <div className="grid md:grid-cols-3 gap-8">
              {caseStudies.map((study, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.15 }}
                >
                  <Card variant="glass" hover="lift" className="h-full">
                    <div className={`h-2 ${study.color} rounded-t-xl`}></div>
                    <CardHeader>
                      <div className="flex items-center justify-between mb-2">
                        <Badge variant="outline">{study.industry}</Badge>
                        <span className="text-xs text-muted-foreground flex items-center gap-1">
                          <Target className="h-3 w-3" />
                          {study.location}
                        </span>
                      </div>
                      <CardTitle className="text-xl">{study.industry}</CardTitle>
                      <CardDescription className="text-sm">
                        {study.description}
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-2">
                        <p className="text-sm font-semibold mb-3">Results:</p>
                        {study.results.map((result, i) => (
                          <div key={i} className="flex items-center gap-2 text-sm">
                            <div className="h-1.5 w-1.5 rounded-full bg-primary"></div>
                            <span className="text-muted-foreground">{result}</span>
                          </div>
                        ))}
                      </div>
                      <Link to="/case-studies" className="inline-flex items-center gap-2 text-sm text-primary hover:underline mt-4">
                        View Full Study
                        <ArrowRight className="h-3 w-3" />
                      </Link>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Pricing Section */}
        <section id="pricing" className="py-20 md:py-32 bg-muted/30">
          <div className="container mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center max-w-3xl mx-auto mb-16"
            >
              <h2 className="font-heading text-4xl md:text-5xl font-bold mb-4">
                Simple, Transparent Pricing
              </h2>
              <p className="text-lg text-muted-foreground">
                Pay per run or subscribe monthly. No hidden fees.
              </p>
            </motion.div>

            <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
              {pricingTiers.map((tier, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.15 }}
                  className={tier.popular ? 'md:scale-105' : ''}
                >
                  <Card 
                    variant={tier.popular ? 'glass' : 'elevated'} 
                    hover="lift" 
                    className={`h-full relative ${tier.popular ? 'border-primary shadow-glow' : ''}`}
                  >
                    {tier.popular && (
                      <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                        <Badge variant="purple" size="lg">
                          <Star className="h-3 w-3 mr-1" />
                          Most Popular
                        </Badge>
                      </div>
                    )}
                    <CardHeader>
                      <CardTitle className="text-2xl">{tier.name}</CardTitle>
                      <CardDescription>{tier.description}</CardDescription>
                      <div className="mt-4">
                        <span className="text-5xl font-extrabold">${tier.price}</span>
                        <span className="text-muted-foreground">/month</span>
                      </div>
                    </CardHeader>
                    <CardContent className="space-y-6">
                      <ul className="space-y-3">
                        {tier.features.map((feature, i) => (
                          <li key={i} className="flex items-start gap-3 text-sm">
                            <div className="h-5 w-5 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                              <Check className="h-3 w-3 text-primary" />
                            </div>
                            <span>{feature}</span>
                          </li>
                        ))}
                      </ul>
                      <Link to="/dashboard" className="block">
                        <Button 
                          variant={tier.popular ? 'premium' : 'outline'} 
                          className="w-full"
                          size="lg"
                        >
                          {tier.cta}
                        </Button>
                      </Link>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Ultra Premium CTA Section */}
        <section className="py-20 md:py-32 relative overflow-hidden">
          {/* Background glow effects */}
          <div className="absolute inset-0 pointer-events-none">
            <motion.div
              animate={{ 
                scale: [1, 1.2, 1],
                opacity: [0.3, 0.5, 0.3]
              }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
              className="absolute top-1/2 left-1/4 w-96 h-96 bg-primary/20 rounded-full blur-3xl -translate-y-1/2"
            />
            <motion.div
              animate={{ 
                scale: [1.2, 1, 1.2],
                opacity: [0.3, 0.5, 0.3]
              }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut", delay: 2 }}
              className="absolute top-1/2 right-1/4 w-96 h-96 bg-purple-500/20 rounded-full blur-3xl -translate-y-1/2"
            />
          </div>

          <div className="container mx-auto px-4 relative z-10">
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, ease: "easeOut" }}
            >
              <div className="relative max-w-5xl mx-auto">
                {/* Main Card */}
                <motion.div
                  whileHover={{ scale: 1.02 }}
                  transition={{ type: "spring", stiffness: 300 }}
                  className="relative rounded-3xl overflow-hidden"
                >
                  {/* Animated gradient background */}
                  <div className="absolute inset-0 bg-gradient-to-r from-cyan-500 via-blue-500 to-purple-500">
                    <motion.div
                      animate={{ 
                        backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"]
                      }}
                      transition={{ duration: 5, repeat: Infinity, ease: "linear" }}
                      className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent"
                      style={{ backgroundSize: "200% 100%" }}
                    />
                  </div>

                  {/* Floating particles */}
                  <div className="absolute inset-0 overflow-hidden">
                    {[...Array(6)].map((_, i) => (
                      <motion.div
                        key={i}
                        animate={{
                          y: [100, -100],
                          x: [0, Math.random() * 40 - 20],
                          opacity: [0, 1, 0]
                        }}
                        transition={{
                          duration: 3 + Math.random() * 2,
                          repeat: Infinity,
                          delay: i * 0.5,
                          ease: "easeOut"
                        }}
                        className="absolute w-2 h-2 bg-white/30 rounded-full"
                        style={{ left: `${15 + i * 15}%`, bottom: 0 }}
                      />
                    ))}
                  </div>

                  {/* Glowing border effect */}
                  <div className="absolute inset-0 rounded-3xl border border-white/20" />
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
                    className="absolute -inset-1 rounded-3xl bg-gradient-to-r from-cyan-400 via-purple-400 to-cyan-400 opacity-20 blur-xl"
                  />

                  {/* Content */}
                  <div className="relative p-12 md:p-16 text-center">
                    {/* Animated sparkle icon */}
                    <motion.div
                      animate={{ 
                        rotate: [0, 10, -10, 0],
                        scale: [1, 1.1, 1]
                      }}
                      transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                      className="inline-block mb-8"
                    >
                      <div className="relative">
                        <Sparkles className="h-16 w-16 text-white" />
                        <motion.div
                          animate={{ scale: [1, 1.5, 1], opacity: [0.5, 0, 0.5] }}
                          transition={{ duration: 2, repeat: Infinity }}
                          className="absolute inset-0 flex items-center justify-center"
                        >
                          <Sparkles className="h-16 w-16 text-white/50" />
                        </motion.div>
                      </div>
                    </motion.div>

                    <motion.h2 
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: 0.2 }}
                      className="font-heading text-4xl md:text-6xl font-extrabold mb-6 text-white drop-shadow-lg"
                    >
                      Ready to Find Your Next
                      <br />
                      <motion.span
                        animate={{ 
                          textShadow: [
                            "0 0 20px rgba(255,255,255,0.5)",
                            "0 0 40px rgba(255,255,255,0.8)",
                            "0 0 20px rgba(255,255,255,0.5)"
                          ]
                        }}
                        transition={{ duration: 2, repeat: Infinity }}
                      >
                        Customer?
                      </motion.span>
                    </motion.h2>

                    <motion.p 
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: 0.3 }}
                      className="text-xl md:text-2xl text-white/90 mb-10 max-w-2xl mx-auto font-medium"
                    >
                      Start with 20 free credits. No credit card required.
                    </motion.p>

                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: 0.4 }}
                    >
                      <Link to="/dashboard">
                        <motion.div
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.98 }}
                        >
                          <Button 
                            size="xl" 
                            className="group bg-slate-900/90 hover:bg-slate-900 text-white px-10 py-7 text-lg font-semibold rounded-xl shadow-2xl shadow-black/30 backdrop-blur-sm border border-white/10"
                          >
                            Get Started Free
                            <motion.span
                              animate={{ x: [0, 5, 0] }}
                              transition={{ duration: 1.5, repeat: Infinity }}
                            >
                              <ArrowRight className="ml-3 h-5 w-5" />
                            </motion.span>
                          </Button>
                        </motion.div>
                      </Link>
                    </motion.div>

                    {/* Trust indicators */}
                    <motion.div
                      initial={{ opacity: 0 }}
                      whileInView={{ opacity: 1 }}
                      viewport={{ once: true }}
                      transition={{ delay: 0.6 }}
                      className="mt-10 flex flex-wrap items-center justify-center gap-6 text-white/70"
                    >
                      <div className="flex items-center gap-2">
                        <Check className="h-4 w-4" />
                        <span className="text-sm">No credit card</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Check className="h-4 w-4" />
                        <span className="text-sm">Instant setup</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Check className="h-4 w-4" />
                        <span className="text-sm">Cancel anytime</span>
                      </div>
                    </motion.div>
                  </div>
                </motion.div>

                {/* Decorative floating elements */}
                <motion.div
                  animate={{ y: [-10, 10, -10], rotate: [0, 5, 0] }}
                  transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                  className="absolute -top-6 -left-6 w-12 h-12 bg-gradient-to-br from-cyan-400 to-blue-500 rounded-2xl shadow-lg opacity-80 hidden md:block"
                />
                <motion.div
                  animate={{ y: [10, -10, 10], rotate: [0, -5, 0] }}
                  transition={{ duration: 4, repeat: Infinity, ease: "easeInOut", delay: 1 }}
                  className="absolute -bottom-6 -right-6 w-16 h-16 bg-gradient-to-br from-purple-400 to-pink-500 rounded-full shadow-lg opacity-80 hidden md:block"
                />
                <motion.div
                  animate={{ y: [-5, 15, -5], rotate: [0, 10, 0] }}
                  transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
                  className="absolute top-1/2 -right-10 w-8 h-8 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-lg shadow-lg opacity-70 hidden lg:block"
                />
              </div>
            </motion.div>
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
