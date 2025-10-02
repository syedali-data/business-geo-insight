import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { Insights } from "@/lib/insights";
import { BarChart, Bar, PieChart, Pie, Cell, XAxis, YAxis, Tooltip as RechartsTooltip, ResponsiveContainer, Legend } from "recharts";
import { TrendingUp, Users, Mail, Activity, Lightbulb, Target, HelpCircle } from "lucide-react";
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";

interface InsightsTabProps {
  insights: Insights;
}

export function InsightsTab({ insights }: InsightsTabProps) {
  const { totals, ratingBuckets, categoryShare, topRated, reviewLeaders, emailCoveragePct, saturationIndex, opportunityScore } = insights;

  // Color palette
  const COLORS = ["hsl(var(--primary))", "hsl(var(--chart-2))", "hsl(var(--chart-3))", "hsl(var(--chart-4))"];

  // Saturation level
  const saturationLevel = saturationIndex > 30 ? "High" : saturationIndex > 15 ? "Medium" : "Low";
  const saturationVariant = saturationIndex > 30 ? "destructive" : saturationIndex > 15 ? "default" : "secondary";

  return (
    <TooltipProvider>
      <div className="space-y-6">
      {/* Header */}
      <div>
        <h2 className="text-2xl font-bold mb-2">Market Insights</h2>
        <p className="text-muted-foreground">
          Full-market insights generated from your research run—no extra steps.
        </p>
      </div>

      {/* Insights Chips */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Lightbulb className="h-5 w-5 text-primary" />
            Key Takeaways
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-2">
          {insights.insights.map((insight, idx) => (
            <div key={idx} className="flex items-start gap-2">
              <div className="h-1.5 w-1.5 rounded-full bg-primary mt-2 flex-shrink-0" />
              <p className="text-sm">{insight}</p>
            </div>
          ))}
        </CardContent>
      </Card>

      {/* KPI Cards Row */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Businesses</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totals.businesses}</div>
            <p className="text-xs text-muted-foreground">Total found in market</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Avg Rating</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {totals.avgRating?.toFixed(1) || "N/A"}
            </div>
            <p className="text-xs text-muted-foreground">
              Median: {totals.medianRating?.toFixed(1) || "N/A"}
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Email Coverage</CardTitle>
            <Mail className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{emailCoveragePct}%</div>
            <p className="text-xs text-muted-foreground">
              {totals.withEmail} of {totals.businesses} have email
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <div className="flex items-center gap-2">
              <CardTitle className="text-sm font-medium">Saturation Index</CardTitle>
              <Tooltip>
                <TooltipTrigger asChild>
                  <HelpCircle className="h-3.5 w-3.5 text-muted-foreground cursor-help" />
                </TooltipTrigger>
                <TooltipContent className="max-w-xs">
                  <p className="text-sm">
                    Measures competitive density based on businesses per area. Higher values indicate more saturated markets.
                  </p>
                </TooltipContent>
              </Tooltip>
            </div>
            <Activity className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-2">
              <div className="text-2xl font-bold">{saturationIndex}</div>
              <Badge variant={saturationVariant}>{saturationLevel}</Badge>
            </div>
            <p className="text-xs text-muted-foreground">Competition density</p>
          </CardContent>
        </Card>
      </div>

      {/* Charts Row 1: Rating Distribution & Category Share */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Rating Distribution</CardTitle>
            <CardDescription>How businesses are rated in this market</CardDescription>
          </CardHeader>
          <CardContent>
            <ChartContainer
              config={{
                count: {
                  label: "Businesses",
                  color: "hsl(var(--primary))",
                },
              }}
              className="h-[300px]"
            >
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={ratingBuckets}>
                  <XAxis dataKey="bucket" />
                  <YAxis />
                  <ChartTooltip content={<ChartTooltipContent />} />
                  <Bar dataKey="count" fill="hsl(var(--primary))" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </ChartContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Category Share</CardTitle>
            <CardDescription>Top business categories in this market</CardDescription>
          </CardHeader>
          <CardContent>
            <ChartContainer
              config={{
                count: {
                  label: "Businesses",
                  color: "hsl(var(--primary))",
                },
              }}
              className="h-[300px]"
            >
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={categoryShare}
                    dataKey="count"
                    nameKey="category"
                    cx="50%"
                    cy="50%"
                    outerRadius={100}
                    label
                  >
                    {categoryShare.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <ChartTooltip content={<ChartTooltipContent />} />
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
            </ChartContainer>
          </CardContent>
        </Card>
      </div>

      {/* Charts Row 2: Top Rated & Review Leaders */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Top Rated Businesses</CardTitle>
            <CardDescription>Highest rated competitors by reviews</CardDescription>
          </CardHeader>
          <CardContent>
            <ChartContainer
              config={{
                rating: {
                  label: "Rating",
                  color: "hsl(var(--chart-2))",
                },
              }}
              className="h-[300px]"
            >
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={topRated} layout="vertical">
                  <XAxis type="number" domain={[0, 5]} />
                  <YAxis type="category" dataKey="name" width={120} />
                  <ChartTooltip content={<ChartTooltipContent />} />
                  <Bar dataKey="rating" fill="hsl(var(--chart-2))" radius={[0, 4, 4, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </ChartContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Review Leaders</CardTitle>
            <CardDescription>Most reviewed businesses in market</CardDescription>
          </CardHeader>
          <CardContent>
            <ChartContainer
              config={{
                reviewCount: {
                  label: "Reviews",
                  color: "hsl(var(--chart-3))",
                },
              }}
              className="h-[300px]"
            >
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={reviewLeaders} layout="vertical">
                  <XAxis type="number" />
                  <YAxis type="category" dataKey="name" width={120} />
                  <ChartTooltip content={<ChartTooltipContent />} />
                  <Bar dataKey="reviewCount" fill="hsl(var(--chart-3))" radius={[0, 4, 4, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </ChartContainer>
          </CardContent>
        </Card>
      </div>

      {/* Opportunity Score Card */}
      <Card>
        <CardHeader>
          <div className="flex items-center gap-2">
            <Target className="h-5 w-5 text-primary" />
            <CardTitle>Market Opportunity Score</CardTitle>
            <Tooltip>
              <TooltipTrigger asChild>
                <HelpCircle className="h-4 w-4 text-muted-foreground cursor-help" />
              </TooltipTrigger>
              <TooltipContent className="max-w-sm">
                <p className="text-sm">
                  Composite score (0-100) combining market saturation, competitor ratings, and data availability. 
                  Higher scores indicate better opportunities for new market entrants.
                </p>
              </TooltipContent>
            </Tooltip>
          </div>
          <CardDescription>
            Composite score based on competition, ratings, and data availability (0–100)
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex items-center gap-6">
            <div className="text-6xl font-bold text-primary">{opportunityScore}</div>
            <div className="flex-1 space-y-2">
              <div className="h-4 bg-muted rounded-full overflow-hidden">
                <div
                  className="h-full bg-primary transition-all"
                  style={{ width: `${opportunityScore}%` }}
                />
              </div>
              <p className="text-sm text-muted-foreground">
                {opportunityScore >= 70
                  ? "High potential — low saturation and weak competitors make this an attractive market."
                  : opportunityScore >= 40
                  ? "Medium potential — balanced market with some opportunities for differentiation."
                  : "Low potential — highly saturated market with strong competitors."}
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
    </TooltipProvider>
  );
}
