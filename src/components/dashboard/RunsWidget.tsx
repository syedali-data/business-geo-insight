import { useSubscription } from '@/hooks/useSubscription';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { Skeleton } from '@/components/ui/skeleton';
import { AlertTriangle, Zap, Crown, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

export function RunsWidget() {
  const { 
    subscription, 
    isLoading, 
    planInfo, 
    runsRemaining, 
    runsTotal, 
    percentageUsed,
    hasActiveSubscription 
  } = useSubscription();

  if (isLoading) {
    return (
      <Card>
        <CardHeader className="pb-2">
          <Skeleton className="h-5 w-32" />
        </CardHeader>
        <CardContent className="space-y-4">
          <Skeleton className="h-12 w-full" />
          <Skeleton className="h-2 w-full" />
          <Skeleton className="h-4 w-24" />
        </CardContent>
      </Card>
    );
  }

  if (!hasActiveSubscription) {
    return (
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-base font-medium flex items-center gap-2">
            <Zap className="h-4 w-4 text-primary" />
            No Active Subscription
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-sm text-muted-foreground">
            Subscribe to get included runs every month and save up to 30%
          </p>
          <Button asChild className="w-full">
            <Link to="/pricing">
              View Plans
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </CardContent>
      </Card>
    );
  }

  const remainingPercentage = 100 - percentageUsed;
  const isLowOnRuns = runsRemaining < 3;

  return (
    <Card>
      <CardHeader className="pb-2">
        <div className="flex items-center justify-between">
          <CardTitle className="text-base font-medium flex items-center gap-2">
            <Zap className="h-4 w-4 text-primary" />
            Runs Remaining
          </CardTitle>
          <Badge variant="secondary" className="font-normal">
            <Crown className="h-3 w-3 mr-1" />
            {planInfo?.name}
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-1">
          <div className="flex items-baseline gap-1">
            <span className="text-4xl font-bold text-foreground">{runsRemaining}</span>
            <span className="text-lg text-muted-foreground">/ {runsTotal}</span>
          </div>
          <p className="text-sm text-muted-foreground">
            {Math.round(remainingPercentage)}% remaining this month
          </p>
        </div>

        <Progress 
          value={remainingPercentage} 
          className="h-2"
        />

        {subscription?.billing_period_end && (
          <p className="text-xs text-muted-foreground">
            Renews on {new Date(subscription.billing_period_end).toLocaleDateString('en-US', {
              month: 'short',
              day: 'numeric',
              year: 'numeric'
            })}
          </p>
        )}

        {isLowOnRuns && (
          <div className="flex items-center gap-2 p-2 rounded-md bg-warning/10 border border-warning/20">
            <AlertTriangle className="h-4 w-4 text-warning" />
            <span className="text-xs text-warning">Running low on runs</span>
          </div>
        )}

        <div className="flex gap-2 pt-2">
          <Button variant="outline" size="sm" className="flex-1" asChild>
            <Link to="/settings">Usage History</Link>
          </Button>
          <Button size="sm" className="flex-1" asChild>
            <Link to="/pricing">Upgrade Plan</Link>
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
