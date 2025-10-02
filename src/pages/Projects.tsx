import { Helmet } from 'react-helmet-async';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Sparkles, Plus, Search } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function Projects() {
  // Mock data
  const projects = [
    {
      id: 'proj_1',
      title: 'London Roofing Contractors',
      location: 'London, ON, Canada',
      profession: 'Roofing',
      lastRun: '2 hours ago',
      status: 'completed',
      leadCount: 47
    }
  ];

  return (
    <>
      <Helmet>
        <title>Projects - LocalPulse</title>
      </Helmet>

      <div className="min-h-screen bg-background">
        {/* Header */}
        <header className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 sticky top-0 z-50">
          <div className="container mx-auto px-4 h-16 flex items-center justify-between">
            <Link to="/" className="flex items-center gap-2">
              <Sparkles className="h-6 w-6 text-primary" />
              <span className="font-heading text-xl font-bold">LocalPulse</span>
            </Link>
            <nav className="hidden md:flex items-center gap-6">
              <Link to="/dashboard" className="text-sm font-medium hover:text-primary transition-colors">
                Dashboard
              </Link>
              <Link to="/settings" className="text-sm font-medium hover:text-primary transition-colors">
                Settings
              </Link>
            </nav>
          </div>
        </header>

        {/* Content */}
        <div className="container mx-auto px-4 py-8">
          <div className="max-w-6xl mx-auto space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="font-heading text-3xl font-bold mb-2">Projects</h1>
                <p className="text-muted-foreground">Manage your lead generation projects</p>
              </div>
              <Button>
                <Plus className="mr-2 h-4 w-4" />
                New Project
              </Button>
            </div>

            <div className="flex gap-4">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input placeholder="Search projects..." className="pl-10" />
              </div>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {projects.map((project) => (
                <Link key={project.id} to={`/projects/${project.id}`}>
                  <Card className="p-6 hover:shadow-elegant transition-shadow h-full">
                    <div className="space-y-4">
                      <div>
                        <h3 className="font-heading text-xl font-semibold mb-2">{project.title}</h3>
                        <p className="text-sm text-muted-foreground">{project.location}</p>
                      </div>
                      <div className="flex items-center gap-2">
                        <Badge variant="secondary">{project.profession}</Badge>
                        <Badge variant="outline">{project.leadCount} leads</Badge>
                      </div>
                      <div className="text-sm text-muted-foreground">
                        Last run: {project.lastRun}
                      </div>
                    </div>
                  </Card>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
