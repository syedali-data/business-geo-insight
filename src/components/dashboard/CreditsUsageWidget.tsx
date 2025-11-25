import { motion } from 'framer-motion';
import { Card } from '@/components/ui/card';
import { Sparkles, TrendingDown, TrendingUp, Clock } from 'lucide-react';
import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';

interface UsageHistoryItem {
  date: string;
  credits: number;
  label: string;
}

interface CreditsUsageWidgetProps {
  creditsRemaining: number;
  creditsTotal: number;
  usageHistory: UsageHistoryItem[];
  delay?: number;
}

export default function CreditsUsageWidget({
  creditsRemaining,
  creditsTotal,
  usageHistory,
  delay = 0,
}: CreditsUsageWidgetProps) {
  const percentRemaining = Math.round((creditsRemaining / creditsTotal) * 100);
  const creditsUsed = creditsTotal - creditsRemaining;
  
  // Determine status color
  const getStatusColor = () => {
    if (percentRemaining > 50) return 'text-emerald-500';
    if (percentRemaining > 25) return 'text-amber-500';
    return 'text-destructive';
  };

  const getProgressColor = () => {
    if (percentRemaining > 50) return 'bg-emerald-500';
    if (percentRemaining > 25) return 'bg-amber-500';
    return 'bg-destructive';
  };

  // Calculate trend
  const recentUsage = usageHistory.slice(-3);
  const avgRecent = recentUsage.reduce((a, b) => a + b.credits, 0) / recentUsage.length;
  const olderUsage = usageHistory.slice(0, -3);
  const avgOlder = olderUsage.length > 0 
    ? olderUsage.reduce((a, b) => a + b.credits, 0) / olderUsage.length 
    : avgRecent;
  const trend = avgRecent > avgOlder ? 'up' : 'down';

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay, duration: 0.5, ease: 'easeOut' }}
    >
      <Card className="p-6 overflow-hidden">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-xl bg-primary/10">
              <Sparkles className="h-5 w-5 text-primary" />
            </div>
            <div>
              <h3 className="font-semibold">Credits Usage</h3>
              <p className="text-sm text-muted-foreground">Monthly allocation</p>
            </div>
          </div>
          <div className="flex items-center gap-1 text-sm">
            {trend === 'up' ? (
              <>
                <TrendingUp className="h-4 w-4 text-amber-500" />
                <span className="text-amber-500">Higher usage</span>
              </>
            ) : (
              <>
                <TrendingDown className="h-4 w-4 text-emerald-500" />
                <span className="text-emerald-500">Lower usage</span>
              </>
            )}
          </div>
        </div>

        {/* Credits Display */}
        <div className="flex items-end gap-4 mb-6">
          <div>
            <span className={`text-5xl font-bold ${getStatusColor()}`}>
              {creditsRemaining}
            </span>
            <span className="text-2xl text-muted-foreground">/{creditsTotal}</span>
          </div>
          <div className="text-sm text-muted-foreground pb-2">
            credits remaining
          </div>
        </div>

        {/* Progress Bar */}
        <div className="mb-6">
          <div className="flex justify-between text-xs text-muted-foreground mb-2">
            <span>{creditsUsed} used</span>
            <span>{percentRemaining}% left</span>
          </div>
          <div className="h-3 bg-muted rounded-full overflow-hidden">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${percentRemaining}%` }}
              transition={{ delay: delay + 0.3, duration: 0.8, ease: 'easeOut' }}
              className={`h-full ${getProgressColor()} rounded-full`}
            />
          </div>
        </div>

        {/* Usage Chart */}
        <div className="mb-4">
          <div className="flex items-center gap-2 mb-3">
            <Clock className="h-4 w-4 text-muted-foreground" />
            <span className="text-sm font-medium">Usage History</span>
          </div>
          <div className="h-32">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={usageHistory}>
                <defs>
                  <linearGradient id="creditGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="hsl(var(--primary))" stopOpacity={0.3} />
                    <stop offset="100%" stopColor="hsl(var(--primary))" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <XAxis 
                  dataKey="label" 
                  axisLine={false}
                  tickLine={false}
                  tick={{ fontSize: 10, fill: 'hsl(var(--muted-foreground))' }}
                />
                <YAxis hide />
                <Tooltip
                  contentStyle={{
                    backgroundColor: 'hsl(var(--card))',
                    border: '1px solid hsl(var(--border))',
                    borderRadius: '8px',
                    fontSize: '12px',
                  }}
                  formatter={(value: number) => [`${value} credits`, 'Used']}
                />
                <Area
                  type="monotone"
                  dataKey="credits"
                  stroke="hsl(var(--primary))"
                  strokeWidth={2}
                  fill="url(#creditGradient)"
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-3 gap-4 pt-4 border-t">
          <div className="text-center">
            <p className="text-lg font-semibold">{creditsUsed}</p>
            <p className="text-xs text-muted-foreground">This month</p>
          </div>
          <div className="text-center">
            <p className="text-lg font-semibold">
              {Math.round(creditsUsed / Math.max(usageHistory.length, 1))}
            </p>
            <p className="text-xs text-muted-foreground">Avg/day</p>
          </div>
          <div className="text-center">
            <p className="text-lg font-semibold">
              ~{Math.ceil(creditsRemaining / Math.max(Math.round(creditsUsed / Math.max(usageHistory.length, 1)), 1))}d
            </p>
            <p className="text-xs text-muted-foreground">Est. left</p>
          </div>
        </div>
      </Card>
    </motion.div>
  );
}