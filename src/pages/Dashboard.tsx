import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { 
  Sparkles, 
  TrendingUp, 
  Users, 
  Mail,
  FileText,
  Calendar,
  Plus,
  ArrowRight
} from 'lucide-react';
import { useState } from 'react';
import CreateProjectModal from '@/components/projects/CreateProjectModal';
import KPICard from '@/components/dashboard/KPICard';
import ActionCard from '@/components/dashboard/ActionCard';
import ResearchRunItem from '@/components/dashboard/ResearchRunItem';
import DashboardHeader from '@/components/dashboard/DashboardHeader';
import EmptyState from '@/components/dashboard/EmptyState';
import CreditsUsageWidget from '@/components/dashboard/CreditsUsageWidget';
import { useCredits } from '@/hooks/useCredits';

export default function Dashboard() {
  const [createProjectOpen, setCreateProjectOpen] = useState(false);
  const { credits, usageHistory, isLoading: creditsLoading } = useCredits();
  
  // Compute stats from credits data
  const creditsUsed = credits.creditsTotal - credits.creditsRemaining;
  
  // Mock additional data (would come from runs table in production)
  const usage = {
    runCount: usageHistory.filter(u => u.credits > 0).length,
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

  const emailSuccessRate = usage.leadCount > 0 ? Math.round((usage.emailCount / usage.leadCount) * 100) : 0;

  return (
    <>
      <Helmet>
        <title>Dashboard - LocalPulse</title>
      </Helmet>

      <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted/30">
        {/* Header */}
        <header className="border-b bg-background/80 backdrop-blur-md sticky top-0 z-50">
          <div className="container mx-auto px-4 h-16 flex items-center justify-between">
            <Link to="/" className="flex items-center gap-2 group">
              <motion.div
                whileHover={{ rotate: 180 }}
                transition={{ duration: 0.5 }}
              >
                <Sparkles className="h-6 w-6 text-primary" />
              </motion.div>
              <span className="font-heading text-xl font-bold">LocalPulse</span>
            </Link>
            <nav className="flex items-center gap-2">
              <Link to="/projects">
                <Button variant="ghost" size="sm">Projects</Button>
              </Link>
              <Link to="/newsletter">
                <Button variant="ghost" size="sm">Newsletter</Button>
              </Link>
              <Link to="/settings">
                <Button variant="ghost" size="sm">Settings</Button>
              </Link>
            </nav>
          </div>
        </header>

        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3 }}
          className="container mx-auto px-4 py-10 max-w-7xl"
        >
          {/* Page Header */}
          <DashboardHeader />

          {/* KPI Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
            <KPICard
              title="Credits Remaining"
              value={credits.creditsRemaining}
              suffix={`/ ${credits.creditsTotal}`}
              subtitle={`${Math.round((credits.creditsRemaining / credits.creditsTotal) * 100)}% remaining`}
              icon={Sparkles}
              iconColor="cyan"
              delay={0.1}
              progress={{ value: credits.creditsRemaining, max: credits.creditsTotal }}
            />
            <KPICard
              title="Total Leads"
              value={usage.leadCount}
              subtitle={`From ${usage.runCount} runs`}
              icon={Users}
              iconColor="green"
              delay={0.2}
            />
            <KPICard
              title="Validated Emails"
              value={usage.emailCount}
              subtitle={`${emailSuccessRate}% success rate`}
              icon={Mail}
              iconColor="purple"
              delay={0.3}
              badge={{ text: 'Good', variant: 'success' }}
            />
            <KPICard
              title="This Month"
              value={usage.runCount}
              subtitle="Research runs completed"
              icon={Calendar}
              iconColor="orange"
              delay={0.4}
              pulse
            />
          </div>

          {/* Credits Usage Widget + Action Cards */}
          <div className="grid lg:grid-cols-3 gap-6 mb-10">
            <CreditsUsageWidget
              creditsRemaining={credits.creditsRemaining}
              creditsTotal={credits.creditsTotal}
              usageHistory={usageHistory}
              delay={0.5}
            />
            <div className="lg:col-span-2 grid md:grid-cols-2 gap-6">
              <ActionCard
                title="Start New Research"
                description="Generate fresh leads for any city and profession"
                icon={TrendingUp}
                variant="primary"
                buttonText="Create Project"
                buttonIcon={Plus}
                onClick={() => setCreateProjectOpen(true)}
                delay={0.6}
              />
              <ActionCard
                title="Generate Newsletter"
                description="Create AI-powered newsletters from your research"
                icon={FileText}
                variant="secondary"
                buttonText="Open Newsletter Hub"
                onClick={() => window.location.href = '/newsletter'}
                delay={0.7}
              />
            </div>
          </div>

          {/* Recent Research Runs */}
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8, duration: 0.5 }}
          >
            <div className="flex items-center justify-between mb-6">
              <h2 className="font-heading text-2xl font-semibold">Recent Research Runs</h2>
              <Link 
                to="/projects" 
                className="flex items-center gap-1 text-sm text-muted-foreground hover:text-primary transition-colors"
              >
                View All <ArrowRight className="h-4 w-4" />
              </Link>
            </div>

            <div className="space-y-3">
              {recentRuns.length === 0 ? (
                <EmptyState onCreateProject={() => setCreateProjectOpen(true)} />
              ) : (
                recentRuns.map((run, index) => (
                  <ResearchRunItem
                    key={run.id}
                    id={run.id}
                    projectTitle={run.projectTitle}
                    status={run.status}
                    startedAt={run.startedAt}
                    totalLeads={run.summary.totalLeads}
                    validEmails={run.summary.validEmails}
                    index={index}
                  />
                ))
              )}
            </div>
          </motion.section>
        </motion.div>

        <CreateProjectModal open={createProjectOpen} onOpenChange={setCreateProjectOpen} />
      </div>
    </>
  );
}
