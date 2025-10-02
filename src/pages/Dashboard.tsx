import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { 
  Plus, 
  Sparkles, 
  TrendingUp, 
  Users, 
  Mail,
  FileText,
  Calendar
} from 'lucide-react';
import { formatNumber, formatRelativeTime } from '@/lib/format';
import { useUIStore } from '@/lib/store';

export default function Dashboard() {
  const setNewProjectDialogOpen = useUIStore((state) => state.setNewProjectDialogOpen);
  
  // Mock data
  const usage = {
    creditsRemaining: 15,
    creditsTotal: 20,
    runCount: 5,
    leadCount: 247,
    emailCount: 189,
  };

  const recentRuns = [
    {
      id: '1',
      projectTitle: 'Toronto Dentists',
      status: 'completed' as const,
      startedAt: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(),
      summary: { totalLeads: 52, validEmails: 41 },
    },
    {
      id: '2',
      projectTitle: 'Vancouver HVAC',
      status: 'completed' as const,
      startedAt: new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString(),
      summary: { totalLeads: 38, validEmails: 30 },
    },
  ];

  const creditsPercent = (usage.creditsRemaining / usage.creditsTotal) * 100;

  return (
    <>
      <Helmet>
        <title>Dashboard - LocalPulse</title>
      </Helmet>

      <div className="min-h-screen bg-muted/30">
        {/* Header */}
        <header className="border-b bg-background/95 backdrop-blur sticky top-0 z-50">
          <div className="container mx-auto px-4 h-16 flex items-center justify-between">
            <Link to="/" className="flex items-center gap-2">
              <Sparkles className="h-6 w-6 text-primary" />
              <span className="font-heading text-xl font-bold">LocalPulse</span>
            </Link>
            <nav className="flex items-center gap-4">
              <Link to="/projects">
                <Button variant="ghost" size="sm">Projects</Button>
              </Link>
              <Link to="/billing">
                <Button variant="ghost" size="sm">Billing</Button>
              </Link>
              <Link to="/settings">
                <Button variant="ghost" size="sm">Settings</Button>
              </Link>
            </nav>
          </div>
        </header>

        <div className="container mx-auto px-4 py-8">
          {/* Page Header */}
          <div className="flex items-center justify-between mb-8">
            <div>
              <h1 className="font-heading text-3xl font-bold mb-2">Dashboard</h1>
              <p className="text-muted-foreground">
                Welcome back! Here's your research overview.
              </p>
            </div>
            <Button onClick={() => setNewProjectDialogOpen(true)} className="shadow-elegant">
              <Plus className="h-4 w-4 mr-2" />
              New Project
            </Button>
          </div>

          {/* Usage Stats */}
          <div className="grid md:grid-cols-4 gap-6 mb-8">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium">Credits Remaining</CardTitle>
                <Sparkles className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">
                  {usage.creditsRemaining} / {usage.creditsTotal}
                </div>
                <Progress value={creditsPercent} className="mt-3" />
                <p className="text-xs text-muted-foreground mt-2">
                  {Math.round(creditsPercent)}% remaining
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium">Total Leads</CardTitle>
                <Users className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{formatNumber(usage.leadCount)}</div>
                <p className="text-xs text-muted-foreground mt-2">
                  From {usage.runCount} runs
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium">Validated Emails</CardTitle>
                <Mail className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{formatNumber(usage.emailCount)}</div>
                <p className="text-xs text-muted-foreground mt-2">
                  {Math.round((usage.emailCount / usage.leadCount) * 100)}% success rate
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium">This Month</CardTitle>
                <Calendar className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{usage.runCount}</div>
                <p className="text-xs text-muted-foreground mt-2">
                  Research runs completed
                </p>
              </CardContent>
            </Card>
          </div>

          {/* Quick Actions */}
          <div className="grid md:grid-cols-2 gap-6 mb-8">
            <Card className="gradient-card shadow-elegant hover:shadow-glow transition-shadow cursor-pointer">
              <CardContent className="p-6">
                <TrendingUp className="h-10 w-10 text-primary mb-4" />
                <h3 className="font-heading text-xl font-semibold mb-2">
                  Start New Research
                </h3>
                <p className="text-muted-foreground mb-4">
                  Generate fresh leads for any city and profession
                </p>
                <Button onClick={() => setNewProjectDialogOpen(true)}>
                  <Plus className="h-4 w-4 mr-2" />
                  Create Project
                </Button>
              </CardContent>
            </Card>

            <Card className="hover:shadow-elegant transition-shadow cursor-pointer">
              <CardContent className="p-6">
                <FileText className="h-10 w-10 text-accent mb-4" />
                <h3 className="font-heading text-xl font-semibold mb-2">
                  Generate Newsletter
                </h3>
                <p className="text-muted-foreground mb-4">
                  Create AI-powered newsletters from your research
                </p>
                <Link to="/projects">
                  <Button variant="outline">
                    View Projects
                  </Button>
                </Link>
              </CardContent>
            </Card>
          </div>

          {/* Recent Runs */}
          <Card>
            <CardHeader>
              <CardTitle>Recent Research Runs</CardTitle>
            </CardHeader>
            <CardContent>
              {recentRuns.length === 0 ? (
                <div className="text-center py-12">
                  <TrendingUp className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                  <p className="text-muted-foreground mb-4">
                    No research runs yet. Start your first project!
                  </p>
                  <Button onClick={() => setNewProjectDialogOpen(true)}>
                    <Plus className="h-4 w-4 mr-2" />
                    New Project
                  </Button>
                </div>
              ) : (
                <div className="space-y-4">
                  {recentRuns.map((run) => (
                    <div
                      key={run.id}
                      className="flex items-center justify-between p-4 rounded-lg border hover:bg-muted/50 transition-colors"
                    >
                      <div className="flex items-center gap-4">
                        <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center">
                          <TrendingUp className="h-5 w-5 text-primary" />
                        </div>
                        <div>
                          <div className="font-medium">{run.projectTitle}</div>
                          <div className="text-sm text-muted-foreground">
                            {formatRelativeTime(run.startedAt)}
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center gap-4">
                        <div className="text-right">
                          <div className="text-sm font-medium">
                            {run.summary?.totalLeads} leads
                          </div>
                          <div className="text-xs text-muted-foreground">
                            {run.summary?.validEmails} emails
                          </div>
                        </div>
                        <Badge variant="secondary">
                          {run.status}
                        </Badge>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </>
  );
}
