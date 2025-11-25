import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { motion } from 'framer-motion';
import { 
  Sparkles, 
  Heart, 
  Star,
  CheckCircle,
  AlertCircle,
  Info,
  Zap
} from 'lucide-react';

export default function DesignSystem() {
  return (
    <>
      <Helmet>
        <title>Design System Showcase - LocalPulse</title>
      </Helmet>

      <div className="min-h-screen bg-gradient-hero">
        {/* Header */}
        <header className="glass sticky top-0 z-50">
          <div className="container mx-auto px-4 h-16 flex items-center justify-between">
            <Link to="/" className="flex items-center gap-2">
              <Sparkles className="h-6 w-6 text-primary" />
              <span className="font-heading text-xl font-bold">LocalPulse Design System</span>
            </Link>
            <nav className="flex items-center gap-4">
              <Link to="/dashboard">
                <Button variant="ghost" size="sm">← Back to Dashboard</Button>
              </Link>
            </nav>
          </div>
        </header>

        <div className="container mx-auto px-4 py-12 space-y-16">
          {/* Hero Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-center space-y-4"
          >
            <h1 className="font-heading text-6xl font-extrabold gradient-text">
              Phase 1 Complete
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Award-winning design system foundation with vibrant cyan theme, enhanced components, and smooth animations.
            </p>
          </motion.div>

          {/* Buttons Section */}
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <Card variant="elevated" hover="lift">
              <CardHeader>
                <CardTitle className="text-3xl">Button Variants</CardTitle>
                <CardDescription>All button styles with hover effects and animations</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-3">
                  <h4 className="font-semibold text-sm text-muted-foreground uppercase tracking-wider">Primary Variants</h4>
                  <div className="flex flex-wrap gap-4">
                    <Button variant="default">Default</Button>
                    <Button variant="secondary">Secondary</Button>
                    <Button variant="outline">Outline</Button>
                    <Button variant="ghost">Ghost</Button>
                    <Button variant="link">Link</Button>
                  </div>
                </div>

                <div className="space-y-3">
                  <h4 className="font-semibold text-sm text-muted-foreground uppercase tracking-wider">Semantic Variants</h4>
                  <div className="flex flex-wrap gap-4">
                    <Button variant="success">Success</Button>
                    <Button variant="destructive">Destructive</Button>
                    <Button variant="premium">Premium</Button>
                    <Button variant="glass">Glass</Button>
                  </div>
                </div>

                <div className="space-y-3">
                  <h4 className="font-semibold text-sm text-muted-foreground uppercase tracking-wider">Sizes</h4>
                  <div className="flex flex-wrap items-center gap-4">
                    <Button size="sm">Small</Button>
                    <Button size="default">Default</Button>
                    <Button size="lg">Large</Button>
                    <Button size="xl">Extra Large</Button>
                    <Button size="icon">
                      <Heart className="h-4 w-4" />
                    </Button>
                  </div>
                </div>

                <div className="space-y-3">
                  <h4 className="font-semibold text-sm text-muted-foreground uppercase tracking-wider">With Icons</h4>
                  <div className="flex flex-wrap gap-4">
                    <Button>
                      <Sparkles className="mr-2 h-4 w-4" />
                      Start Research
                    </Button>
                    <Button variant="outline">
                      <Zap className="mr-2 h-4 w-4" />
                      Quick Action
                    </Button>
                    <Button variant="success">
                      <CheckCircle className="mr-2 h-4 w-4" />
                      Complete
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.section>

          {/* Cards Section */}
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <h2 className="font-heading text-3xl font-bold mb-6">Card Variants</h2>
            <div className="grid md:grid-cols-3 gap-6">
              <Card variant="default" hover="lift">
                <CardHeader>
                  <CardTitle>Default Card</CardTitle>
                  <CardDescription>Standard card with subtle shadow</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">Clean and professional design with lift animation on hover.</p>
                </CardContent>
              </Card>

              <Card variant="elevated" hover="glow">
                <CardHeader>
                  <CardTitle>Elevated Card</CardTitle>
                  <CardDescription>Enhanced depth with larger shadow</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">Prominent presence with glow effect on hover.</p>
                </CardContent>
              </Card>

              <Card variant="glass" hover="scale">
                <CardHeader>
                  <CardTitle>Glass Card</CardTitle>
                  <CardDescription>Glassmorphic effect with blur</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">Modern aesthetic with scale animation.</p>
                </CardContent>
              </Card>

              <Card variant="gradient" hover="lift">
                <CardHeader>
                  <CardTitle>Gradient Card</CardTitle>
                  <CardDescription>Subtle gradient background</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">Sophisticated look with smooth transitions.</p>
                </CardContent>
              </Card>

              <Card variant="flat" hover="lift">
                <CardHeader>
                  <CardTitle>Flat Card</CardTitle>
                  <CardDescription>Minimal design, no shadows</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">Brutalist approach, clean borders only.</p>
                </CardContent>
              </Card>

              <Card variant="default" className="border-l-4 border-l-primary" hover="lift">
                <CardHeader>
                  <CardTitle>Accent Border</CardTitle>
                  <CardDescription>Custom styling with color accent</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">Easily customizable with Tailwind utilities.</p>
                </CardContent>
              </Card>
            </div>
          </motion.section>

          {/* Badges Section */}
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <Card variant="elevated">
              <CardHeader>
                <CardTitle className="text-3xl">Badge Variants</CardTitle>
                <CardDescription>Status indicators and labels with semantic colors</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-3">
                  <h4 className="font-semibold text-sm text-muted-foreground uppercase tracking-wider">Variants</h4>
                  <div className="flex flex-wrap gap-3">
                    <Badge variant="default">Default</Badge>
                    <Badge variant="secondary">Secondary</Badge>
                    <Badge variant="destructive">Destructive</Badge>
                    <Badge variant="outline">Outline</Badge>
                    <Badge variant="success">Success</Badge>
                    <Badge variant="warning">Warning</Badge>
                    <Badge variant="purple">Purple</Badge>
                    <Badge variant="pink">Pink</Badge>
                    <Badge variant="glass">Glass</Badge>
                  </div>
                </div>

                <div className="space-y-3">
                  <h4 className="font-semibold text-sm text-muted-foreground uppercase tracking-wider">Sizes</h4>
                  <div className="flex flex-wrap items-center gap-3">
                    <Badge size="sm" variant="default">Small</Badge>
                    <Badge size="default" variant="success">Default</Badge>
                    <Badge size="lg" variant="purple">Large</Badge>
                  </div>
                </div>

                <div className="space-y-3">
                  <h4 className="font-semibold text-sm text-muted-foreground uppercase tracking-wider">With Icons</h4>
                  <div className="flex flex-wrap gap-3">
                    <Badge variant="success">
                      <CheckCircle className="mr-1 h-3 w-3" />
                      Completed
                    </Badge>
                    <Badge variant="warning">
                      <AlertCircle className="mr-1 h-3 w-3" />
                      Pending
                    </Badge>
                    <Badge variant="purple">
                      <Star className="mr-1 h-3 w-3" />
                      Featured
                    </Badge>
                    <Badge variant="default">
                      <Info className="mr-1 h-3 w-3" />
                      New
                    </Badge>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.section>

          {/* Inputs Section */}
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            <Card variant="elevated">
              <CardHeader>
                <CardTitle className="text-3xl">Input Variants</CardTitle>
                <CardDescription>Form inputs with validation states</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Default Input</label>
                    <Input variant="default" placeholder="Enter your email..." />
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-medium">Success State</label>
                    <Input variant="success" placeholder="valid@email.com" />
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-medium">Error State</label>
                    <Input variant="error" placeholder="invalid@email" />
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-medium">Glass Input</label>
                    <Input variant="glass" placeholder="Search..." />
                  </div>
                </div>

                <div className="space-y-3">
                  <h4 className="font-semibold text-sm text-muted-foreground uppercase tracking-wider">Sizes</h4>
                  <div className="space-y-3">
                    <Input inputSize="sm" placeholder="Small input" />
                    <Input inputSize="default" placeholder="Default input" />
                    <Input inputSize="lg" placeholder="Large input" />
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.section>

          {/* Color Palette */}
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.5 }}
          >
            <h2 className="font-heading text-3xl font-bold mb-6">Color Palette</h2>
            <div className="grid md:grid-cols-2 gap-6">
              <Card variant="elevated">
                <CardHeader>
                  <CardTitle>Primary Colors (Vibrant Cyan)</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-5 gap-2">
                    <div className="space-y-2">
                      <div className="h-16 rounded-lg bg-primary-100"></div>
                      <p className="text-xs text-center">100</p>
                    </div>
                    <div className="space-y-2">
                      <div className="h-16 rounded-lg bg-primary-300"></div>
                      <p className="text-xs text-center">300</p>
                    </div>
                    <div className="space-y-2">
                      <div className="h-16 rounded-lg bg-primary-500"></div>
                      <p className="text-xs text-center">500</p>
                    </div>
                    <div className="space-y-2">
                      <div className="h-16 rounded-lg bg-primary-700"></div>
                      <p className="text-xs text-center">700</p>
                    </div>
                    <div className="space-y-2">
                      <div className="h-16 rounded-lg bg-primary-900"></div>
                      <p className="text-xs text-center">900</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card variant="elevated">
                <CardHeader>
                  <CardTitle>Accent Colors</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-3 gap-3">
                    <div className="space-y-2">
                      <div className="h-16 rounded-lg bg-accent-success"></div>
                      <p className="text-xs text-center font-medium">Success</p>
                    </div>
                    <div className="space-y-2">
                      <div className="h-16 rounded-lg bg-accent-warning"></div>
                      <p className="text-xs text-center font-medium">Warning</p>
                    </div>
                    <div className="space-y-2">
                      <div className="h-16 rounded-lg bg-accent-error"></div>
                      <p className="text-xs text-center font-medium">Error</p>
                    </div>
                    <div className="space-y-2">
                      <div className="h-16 rounded-lg bg-accent-purple"></div>
                      <p className="text-xs text-center font-medium">Purple</p>
                    </div>
                    <div className="space-y-2">
                      <div className="h-16 rounded-lg bg-accent-pink"></div>
                      <p className="text-xs text-center font-medium">Pink</p>
                    </div>
                    <div className="space-y-2">
                      <div className="h-16 rounded-lg bg-chart-teal"></div>
                      <p className="text-xs text-center font-medium">Teal</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </motion.section>

          {/* Typography */}
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.6 }}
          >
            <Card variant="elevated">
              <CardHeader>
                <CardTitle className="text-3xl">Typography Scale</CardTitle>
                <CardDescription>Consistent type hierarchy with Inter & Plus Jakarta Sans</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <p className="text-7xl font-extrabold font-heading">Hero Title</p>
                  <p className="text-xs text-muted-foreground">text-7xl, font-extrabold (72px)</p>
                </div>
                <div className="space-y-2">
                  <p className="text-5xl font-bold font-heading">H1 Heading</p>
                  <p className="text-xs text-muted-foreground">text-5xl, font-bold (48px)</p>
                </div>
                <div className="space-y-2">
                  <p className="text-3xl font-bold font-heading">H2 Heading</p>
                  <p className="text-xs text-muted-foreground">text-3xl, font-bold (30px)</p>
                </div>
                <div className="space-y-2">
                  <p className="text-xl font-semibold">H3 Heading</p>
                  <p className="text-xs text-muted-foreground">text-xl, font-semibold (20px)</p>
                </div>
                <div className="space-y-2">
                  <p className="text-base">Body text with comfortable reading size and clear hierarchy.</p>
                  <p className="text-xs text-muted-foreground">text-base (16px)</p>
                </div>
                <div className="space-y-2">
                  <p className="text-sm text-muted-foreground">Supporting text and secondary information.</p>
                  <p className="text-xs text-muted-foreground">text-sm (14px)</p>
                </div>
              </CardContent>
            </Card>
          </motion.section>

          {/* Animations */}
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.7 }}
          >
            <h2 className="font-heading text-3xl font-bold mb-6">Animations & Effects</h2>
            <div className="grid md:grid-cols-3 gap-6">
              <motion.div
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.2 }}
              >
                <Card variant="elevated" className="cursor-pointer">
                  <CardHeader>
                    <CardTitle>Hover Scale</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground">Scales to 105% on hover</p>
                  </CardContent>
                </Card>
              </motion.div>

              <motion.div
                whileHover={{ y: -8 }}
                transition={{ duration: 0.2 }}
              >
                <Card variant="elevated" className="cursor-pointer">
                  <CardHeader>
                    <CardTitle>Hover Lift</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground">Lifts 8px on hover</p>
                  </CardContent>
                </Card>
              </motion.div>

              <motion.div
                animate={{ y: [0, -10, 0] }}
                transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
              >
                <Card variant="glass" className="cursor-pointer">
                  <CardHeader>
                    <CardTitle>Float Animation</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground">Continuous floating motion</p>
                  </CardContent>
                </Card>
              </motion.div>
            </div>
          </motion.section>

          {/* Completion Message */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.8 }}
            className="text-center space-y-4"
          >
            <Card variant="gradient" className="shadow-glow border-primary/20">
              <CardContent className="p-12">
                <Sparkles className="h-16 w-16 text-primary mx-auto mb-6" />
                <h2 className="font-heading text-4xl font-bold mb-4">Phase 1 Complete! ✨</h2>
                <p className="text-lg text-muted-foreground mb-6 max-w-2xl mx-auto">
                  Design system foundation is ready with vibrant cyan theme, 8 button variants, 5 card styles, 
                  9 badge types, enhanced inputs, complete color palette, and smooth Framer Motion animations.
                </p>
                <div className="flex gap-4 justify-center">
                  <Link to="/dashboard">
                    <Button size="lg" variant="premium">
                      Back to Dashboard
                    </Button>
                  </Link>
                  <Button size="lg" variant="outline">
                    Ready for Phase 2
                  </Button>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
    </>
  );
}
