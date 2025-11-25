import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { Insights } from "@/lib/insights";
import { BarChart, Bar, PieChart, Pie, Cell, XAxis, YAxis, ResponsiveContainer, Legend } from "recharts";
import { TrendingUp, Users, Mail, Activity, Lightbulb, Target, HelpCircle, Star, Award } from "lucide-react";
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";
import { motion } from "framer-motion";
import AnimatedCounter from "@/components/AnimatedCounter";
import RadialGauge from "@/components/RadialGauge";

interface InsightsTabProps {
  insights: Insights;
}

// Animation variants
const containerVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  show: { 
    opacity: 1, 
    y: 0,
    transition: { duration: 0.5 }
  },
};

export function InsightsTab({ insights }: InsightsTabProps) {
  const { totals, ratingBuckets, categoryShare, topRated, reviewLeaders, emailCoveragePct, saturationIndex, opportunityScore } = insights;

  // Enhanced color palette from design system
  const RATING_COLORS = {
    "< 3": "hsl(var(--chart-red))",
    "3-3.9": "hsl(var(--chart-amber))",
    "4-4.4": "hsl(var(--chart-blue))",
    "4.5-5": "hsl(var(--chart-green))",
  };

  const CATEGORY_COLORS = [
    "hsl(var(--chart-blue))",
    "hsl(var(--chart-green))",
    "hsl(var(--chart-amber))",
    "hsl(var(--chart-red))",
    "hsl(var(--chart-purple))",
    "hsl(var(--chart-pink))",
    "hsl(var(--chart-teal))",
    "hsl(var(--chart-orange))",
  ];

  // Saturation level
  const saturationLevel = saturationIndex > 30 ? "High" : saturationIndex > 15 ? "Medium" : "Low";
  const saturationVariant = saturationIndex > 30 ? "destructive" : saturationIndex > 15 ? "warning" : "success";

  return (
    <TooltipProvider>
      <motion.div 
        variants={containerVariants}
        initial="hidden"
        animate="show"
        className="space-y-8 py-6"
      >
        {/* Header */}
        <motion.div variants={itemVariants}>
          <h2 className="font-heading text-4xl font-bold mb-2 gradient-text">Market Insights</h2>
          <p className="text-lg text-muted-foreground">
            AI-powered analytics revealing market opportunities and competitive intelligence
          </p>
        </motion.div>

        {/* Key Takeaways */}
        <motion.div variants={itemVariants}>
          <Card variant="glass" className="border-l-4 border-l-primary shadow-elegant">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-2xl">
                <div className="h-10 w-10 rounded-xl bg-primary/10 flex items-center justify-center">
                  <Lightbulb className="h-5 w-5 text-primary" />
                </div>
                Key Takeaways
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {insights.insights.map((insight, idx) => (
                <motion.div 
                  key={idx} 
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: idx * 0.1 + 0.3 }}
                  className="flex items-start gap-3 group"
                >
                  <div className="h-6 w-6 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0 mt-0.5 group-hover:bg-primary/20 transition-colors">
                    <div className="h-2 w-2 rounded-full bg-primary" />
                  </div>
                  <p className="text-sm leading-relaxed">{insight}</p>
                </motion.div>
              ))}
            </CardContent>
          </Card>
        </motion.div>

        {/* KPI Cards */}
        <motion.div 
          variants={itemVariants}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
        >
          <Card variant="glass" hover="lift" className="shadow-elegant">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">Total Businesses</CardTitle>
              <div className="h-10 w-10 rounded-full bg-blue-500/10 flex items-center justify-center">
                <Users className="h-5 w-5 text-blue-500" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-4xl font-extrabold gradient-text mb-2">
                <AnimatedCounter end={totals.businesses} />
              </div>
              <p className="text-xs text-muted-foreground">
                Found in market
              </p>
              <div className="mt-3 h-1 bg-muted rounded-full overflow-hidden">
                <motion.div 
                  className="h-full bg-gradient-to-r from-blue-500 to-blue-600"
                  initial={{ width: 0 }}
                  animate={{ width: '100%' }}
                  transition={{ duration: 1, delay: 0.5 }}
                />
              </div>
            </CardContent>
          </Card>

          <Card variant="glass" hover="lift" className="shadow-elegant">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">Average Rating</CardTitle>
              <div className="h-10 w-10 rounded-full bg-amber-500/10 flex items-center justify-center">
                <Star className="h-5 w-5 text-amber-500 fill-amber-500" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-4xl font-extrabold gradient-text mb-2">
                <AnimatedCounter end={totals.avgRating || 0} decimals={1} />
              </div>
              <p className="text-xs text-muted-foreground">
                Median: {totals.medianRating?.toFixed(1) || "N/A"}
              </p>
              <div className="mt-3 flex gap-0.5">
                {[1, 2, 3, 4, 5].map((star) => (
                  <Star
                    key={star}
                    className={`h-4 w-4 ${
                      star <= (totals.avgRating || 0)
                        ? 'text-amber-500 fill-amber-500'
                        : 'text-muted'
                    }`}
                  />
                ))}
              </div>
            </CardContent>
          </Card>

          <Card variant="glass" hover="lift" className="shadow-elegant">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">Email Coverage</CardTitle>
              <div className="h-10 w-10 rounded-full bg-green-500/10 flex items-center justify-center">
                <Mail className="h-5 w-5 text-green-500" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-4xl font-extrabold gradient-text mb-2">
                <AnimatedCounter end={emailCoveragePct} suffix="%" />
              </div>
              <p className="text-xs text-muted-foreground">
                {totals.withEmail} of {totals.businesses} have email
              </p>
              <div className="mt-3 h-2 bg-muted rounded-full overflow-hidden">
                <motion.div 
                  className="h-full bg-gradient-to-r from-green-500 to-green-600 rounded-full"
                  initial={{ width: 0 }}
                  animate={{ width: `${emailCoveragePct}%` }}
                  transition={{ duration: 1, delay: 0.7 }}
                />
              </div>
            </CardContent>
          </Card>

          <Card variant="glass" hover="lift" className="shadow-elegant">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <div className="flex items-center gap-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">Saturation Index</CardTitle>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <HelpCircle className="h-3.5 w-3.5 text-muted-foreground cursor-help" />
                  </TooltipTrigger>
                  <TooltipContent className="max-w-xs">
                    <p className="text-sm">
                      Measures competitive density. Higher values indicate more saturated markets.
                    </p>
                  </TooltipContent>
                </Tooltip>
              </div>
              <div className="h-10 w-10 rounded-full bg-purple-500/10 flex items-center justify-center">
                <Activity className="h-5 w-5 text-purple-500" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="flex items-center gap-3 mb-2">
                <div className="text-4xl font-extrabold gradient-text">
                  <AnimatedCounter end={saturationIndex} decimals={2} />
                </div>
                <Badge variant={saturationVariant} size="lg">{saturationLevel}</Badge>
              </div>
              <p className="text-xs text-muted-foreground">Competition density</p>
            </CardContent>
          </Card>
        </motion.div>

        {/* Charts Row 1: Rating Distribution & Category Share */}
        <motion.div 
          variants={itemVariants}
          className="grid grid-cols-1 lg:grid-cols-2 gap-6"
        >
          <Card variant="elevated" hover="lift" className="shadow-elegant">
            <CardHeader>
              <CardTitle className="text-2xl flex items-center gap-2">
                <TrendingUp className="h-6 w-6 text-primary" />
                Rating Distribution
              </CardTitle>
              <CardDescription>Quality spread across the competitive landscape</CardDescription>
            </CardHeader>
            <CardContent>
              <ChartContainer
                config={{
                  count: {
                    label: "Businesses",
                    color: "hsl(var(--chart-blue))",
                  },
                }}
                className="h-[320px]"
              >
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={ratingBuckets} margin={{ left: 40, right: 40, top: 20, bottom: 20 }}>
                    <XAxis 
                      dataKey="bucket" 
                      tick={{ fill: 'hsl(var(--muted-foreground))', fontSize: 12 }}
                      axisLine={{ stroke: 'hsl(var(--border))' }}
                    />
                    <YAxis 
                      tick={{ fill: 'hsl(var(--muted-foreground))', fontSize: 12 }}
                      axisLine={{ stroke: 'hsl(var(--border))' }}
                    />
                    <ChartTooltip content={<ChartTooltipContent />} cursor={{ fill: 'hsl(var(--muted))' }} />
                    <Bar 
                      dataKey="count" 
                      radius={[8, 8, 0, 0]}
                      fill="url(#colorGradient)"
                    >
                      {ratingBuckets.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={RATING_COLORS[entry.bucket as keyof typeof RATING_COLORS]} />
                      ))}
                    </Bar>
                    <defs>
                      <linearGradient id="colorGradient" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor="hsl(var(--chart-blue))" stopOpacity={0.8}/>
                        <stop offset="100%" stopColor="hsl(var(--chart-blue))" stopOpacity={0.4}/>
                      </linearGradient>
                    </defs>
                  </BarChart>
                </ResponsiveContainer>
              </ChartContainer>
            </CardContent>
          </Card>

          <Card variant="elevated" hover="lift" className="shadow-elegant">
            <CardHeader>
              <CardTitle className="text-2xl flex items-center gap-2">
                <Target className="h-6 w-6 text-primary" />
                Category Share
              </CardTitle>
              <CardDescription>Market distribution across business types</CardDescription>
            </CardHeader>
            <CardContent>
              <ChartContainer
                config={{
                  count: {
                    label: "Businesses",
                    color: "hsl(var(--primary))",
                  },
                }}
                className="h-[320px]"
              >
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={categoryShare}
                      dataKey="count"
                      nameKey="category"
                      cx="50%"
                      cy="50%"
                      innerRadius={60}
                      outerRadius={100}
                      paddingAngle={2}
                      label={({ category, percent }: any) => 
                        `${String(category).substring(0, 12)} ${(percent * 100).toFixed(0)}%`
                      }
                    >
                      {categoryShare.map((entry, index) => (
                        <Cell 
                          key={`cell-${index}`} 
                          fill={CATEGORY_COLORS[index % CATEGORY_COLORS.length]}
                          className="hover:opacity-80 transition-opacity cursor-pointer"
                        />
                      ))}
                    </Pie>
                    <ChartTooltip content={<ChartTooltipContent />} />
                    <Legend 
                      verticalAlign="bottom" 
                      height={36}
                      iconType="circle"
                      wrapperStyle={{ fontSize: '12px' }}
                    />
                  </PieChart>
                </ResponsiveContainer>
              </ChartContainer>
            </CardContent>
          </Card>
        </motion.div>

        {/* Charts Row 2: Top Rated & Review Leaders */}
        <motion.div 
          variants={itemVariants}
          className="grid grid-cols-1 lg:grid-cols-2 gap-6"
        >
          <Card variant="elevated" hover="lift" className="shadow-elegant">
            <CardHeader>
              <CardTitle className="text-2xl flex items-center gap-2">
                <Award className="h-6 w-6 text-primary" />
                Top Rated Businesses
              </CardTitle>
              <CardDescription>Highest quality competitors in the market</CardDescription>
            </CardHeader>
            <CardContent>
              <ChartContainer
                config={{
                  rating: {
                    label: "Rating",
                    color: "hsl(var(--chart-green))",
                  },
                }}
                className="h-[320px]"
              >
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={topRated} layout="vertical" margin={{ left: 0, right: 30, top: 5, bottom: 5 }}>
                    <XAxis 
                      type="number" 
                      domain={[0, 5]}
                      tick={{ fill: 'hsl(var(--muted-foreground))', fontSize: 12 }}
                    />
                    <YAxis 
                      type="category" 
                      dataKey="name" 
                      width={120}
                      tick={{ fill: 'hsl(var(--muted-foreground))', fontSize: 11 }}
                      tickFormatter={(value) => value.length > 20 ? value.substring(0, 20) + '...' : value}
                    />
                    <ChartTooltip content={<ChartTooltipContent />} cursor={{ fill: 'hsl(var(--muted))' }} />
                    <Bar 
                      dataKey="rating" 
                      fill="hsl(var(--chart-green))" 
                      radius={[0, 8, 8, 0]}
                    />
                  </BarChart>
                </ResponsiveContainer>
              </ChartContainer>
            </CardContent>
          </Card>

          <Card variant="elevated" hover="lift" className="shadow-elegant">
            <CardHeader>
              <CardTitle className="text-2xl flex items-center gap-2">
                <Users className="h-6 w-6 text-primary" />
                Review Leaders
              </CardTitle>
              <CardDescription>Businesses with strongest social proof</CardDescription>
            </CardHeader>
            <CardContent>
              <ChartContainer
                config={{
                  reviewCount: {
                    label: "Reviews",
                    color: "hsl(var(--chart-purple))",
                  },
                }}
                className="h-[320px]"
              >
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={reviewLeaders} layout="vertical" margin={{ left: 0, right: 30, top: 5, bottom: 5 }}>
                    <XAxis 
                      type="number"
                      tick={{ fill: 'hsl(var(--muted-foreground))', fontSize: 12 }}
                    />
                    <YAxis 
                      type="category" 
                      dataKey="name" 
                      width={120}
                      tick={{ fill: 'hsl(var(--muted-foreground))', fontSize: 11 }}
                      tickFormatter={(value) => value.length > 20 ? value.substring(0, 20) + '...' : value}
                    />
                    <ChartTooltip content={<ChartTooltipContent />} cursor={{ fill: 'hsl(var(--muted))' }} />
                    <Bar 
                      dataKey="reviewCount" 
                      fill="hsl(var(--chart-purple))" 
                      radius={[0, 8, 8, 0]}
                    />
                  </BarChart>
                </ResponsiveContainer>
              </ChartContainer>
            </CardContent>
          </Card>
        </motion.div>

        {/* Opportunity Score - Enhanced with Radial Gauge */}
        <motion.div variants={itemVariants}>
          <Card variant="glass" className="shadow-glow border-primary/20">
            <CardHeader>
              <div className="flex items-center gap-3">
                <div className="h-12 w-12 rounded-xl bg-gradient-to-br from-primary to-purple-600 flex items-center justify-center shadow-lg">
                  <Target className="h-6 w-6 text-white" />
                </div>
                <div className="flex-1">
                  <CardTitle className="text-3xl">Market Opportunity Score</CardTitle>
                  <CardDescription className="text-base">
                    AI-powered composite analysis of market entry potential
                  </CardDescription>
                </div>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <HelpCircle className="h-5 w-5 text-muted-foreground cursor-help" />
                  </TooltipTrigger>
                  <TooltipContent className="max-w-sm">
                    <p className="text-sm">
                      Composite score (0-100) combining market saturation, competitor ratings, and data availability. 
                      Higher scores indicate better opportunities for market entry.
                    </p>
                  </TooltipContent>
                </Tooltip>
              </div>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-2 gap-12 items-center">
                {/* Radial Gauge */}
                <div className="flex justify-center">
                  <RadialGauge value={opportunityScore} max={100} size={220} strokeWidth={24} />
                </div>

                {/* Score Breakdown */}
                <div className="space-y-6">
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm font-medium">Competition Quality</span>
                      <span className="text-sm font-bold">
                        {totals.avgRating ? (totals.avgRating < 4 ? 'Low' : 'Medium') : 'N/A'}
                      </span>
                    </div>
                    <div className="h-2 bg-muted rounded-full overflow-hidden">
                      <motion.div 
                        className="h-full bg-gradient-to-r from-green-500 to-green-600 rounded-full"
                        initial={{ width: 0 }}
                        animate={{ width: totals.avgRating ? `${(5 - totals.avgRating) * 20}%` : '0%' }}
                        transition={{ duration: 1, delay: 1.2 }}
                      />
                    </div>
                  </div>

                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm font-medium">Market Saturation</span>
                      <span className="text-sm font-bold">{saturationLevel}</span>
                    </div>
                    <div className="h-2 bg-muted rounded-full overflow-hidden">
                      <motion.div 
                        className="h-full bg-gradient-to-r from-amber-500 to-amber-600 rounded-full"
                        initial={{ width: 0 }}
                        animate={{ width: `${Math.min(saturationIndex * 2, 100)}%` }}
                        transition={{ duration: 1, delay: 1.4 }}
                      />
                    </div>
                  </div>

                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm font-medium">Data Quality</span>
                      <span className="text-sm font-bold">{emailCoveragePct}%</span>
                    </div>
                    <div className="h-2 bg-muted rounded-full overflow-hidden">
                      <motion.div 
                        className="h-full bg-gradient-to-r from-blue-500 to-blue-600 rounded-full"
                        initial={{ width: 0 }}
                        animate={{ width: `${emailCoveragePct}%` }}
                        transition={{ duration: 1, delay: 1.6 }}
                      />
                    </div>
                  </div>

                  <div className="pt-4 border-t">
                    <p className="text-sm leading-relaxed text-muted-foreground">
                      {opportunityScore >= 70
                        ? "🎯 High potential — Low saturation and weak competitors make this an attractive market for new entrants."
                        : opportunityScore >= 40
                        ? "⚖️ Medium potential — Balanced market with opportunities for differentiation through quality and service."
                        : "⚠️ Low potential — Highly saturated market with strong established competitors. Entry requires unique value proposition."}
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </motion.div>
    </TooltipProvider>
  );
}
