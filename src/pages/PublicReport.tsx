import { Helmet } from 'react-helmet-async';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Sparkles, ArrowRight, Share2, Copy } from 'lucide-react';
import { Link, useParams } from 'react-router-dom';

export default function PublicReport() {
  const { publicId } = useParams();

  // Mock data
  const report = {
    publicId,
    title: 'London Roofing Contractors Research',
    location: 'London, ON, Canada',
    profession: 'Roofing',
    generatedAt: '2 hours ago',
    leadCount: 47,
    emailRate: 94,
    avgRating: 4.2,
    topInsights: [
      'High demand in east London area',
      '73% of contractors have active websites',
      'Average response time: 4.2 hours',
    ],
  };

  return (
    <>
      <Helmet>
        <title>{report.title} - LocalPulse</title>
        <meta name="description" content={`Public research report for ${report.profession} in ${report.location}`} />
        <meta property="og:title" content={report.title} />
        <meta property="og:description" content={`${report.leadCount} leads found • ${report.emailRate}% email rate`} />
        <meta property="og:type" content="article" />
      </Helmet>

      <div className="min-h-screen bg-background">
        {/* Header */}
        <header className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 sticky top-0 z-50">
          <div className="container mx-auto px-4 h-16 flex items-center justify-between">
            <Link to="/" className="flex items-center gap-2">
              <Sparkles className="h-6 w-6 text-primary" />
              <span className="font-heading text-xl font-bold">LocalPulse</span>
            </Link>
            <div className="flex items-center gap-2">
              <Button variant="ghost" size="sm">
                <Share2 className="mr-2 h-4 w-4" />
                Share
              </Button>
              <Button variant="ghost" size="sm">
                <Copy className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </header>

        {/* Content */}
        <div className="container mx-auto px-4 py-8">
          <div className="max-w-4xl mx-auto space-y-8">
            {/* Header */}
            <div className="text-center space-y-4">
              <h1 className="font-heading text-3xl md:text-4xl font-bold">{report.title}</h1>
              <div className="flex flex-wrap justify-center gap-2">
                <Badge variant="secondary">{report.location}</Badge>
                <Badge variant="outline">{report.profession}</Badge>
                <Badge variant="outline">Generated {report.generatedAt}</Badge>
              </div>
            </div>

            {/* Stats */}
            <Card className="p-8">
              <div className="grid grid-cols-3 gap-8 text-center">
                <div>
                  <div className="text-3xl font-bold text-primary">{report.leadCount}</div>
                  <div className="text-sm text-muted-foreground">Leads Found</div>
                </div>
                <div>
                  <div className="text-3xl font-bold text-primary">{report.emailRate}%</div>
                  <div className="text-sm text-muted-foreground">Email Rate</div>
                </div>
                <div>
                  <div className="text-3xl font-bold text-primary">{report.avgRating}</div>
                  <div className="text-sm text-muted-foreground">Avg Rating</div>
                </div>
              </div>
            </Card>

            {/* Insights */}
            <Card className="p-6">
              <h2 className="font-heading text-xl font-semibold mb-4">Key Insights</h2>
              <ul className="space-y-2">
                {report.topInsights.map((insight, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <span className="text-primary mt-1">•</span>
                    <span>{insight}</span>
                  </li>
                ))}
              </ul>
            </Card>

            {/* CTA */}
            <Card className="gradient-card p-8 text-center">
              <h3 className="font-heading text-2xl font-bold mb-4">
                Get Full Report Access
              </h3>
              <p className="text-muted-foreground mb-6">
                Download complete CSV with all {report.leadCount} leads, emails, and contact details
              </p>
              <Link to="/dashboard">
                <Button size="lg" className="shadow-glow">
                  Start Free Trial
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
              <p className="text-sm text-muted-foreground mt-4">
                20 free credits • No credit card required
              </p>
            </Card>
          </div>
        </div>
      </div>
    </>
  );
}
