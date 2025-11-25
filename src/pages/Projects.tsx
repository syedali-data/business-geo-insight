import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Plus, Search } from 'lucide-react';
import { Link } from 'react-router-dom';
import CreateProjectModal from '@/components/projects/CreateProjectModal';
import { useProjects } from '@/store/projects';
import AppShell from '@/components/layout/AppShell';

export default function Projects() {
  const { projects } = useProjects();
  const location = useLocation();
  const [open, setOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  // Auto-open modal if ?new=1 is in URL
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    if (params.get('new') === '1') {
      setOpen(true);
    }
  }, [location.search]);

  return (
    <>
      <Helmet>
        <title>Projects - LocalPulse</title>
      </Helmet>

      <AppShell>
        {/* Content */}
        <div className="container mx-auto px-4 py-8">
          <div className="max-w-6xl mx-auto space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="font-heading text-3xl font-bold mb-2">Projects</h1>
                <p className="text-muted-foreground">Manage your lead generation projects</p>
              </div>
              <Button onClick={() => setOpen(true)}>
                <Plus className="mr-2 h-4 w-4" />
                New Project
              </Button>
            </div>

            <div className="flex gap-4">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input 
                  placeholder="Search projects..." 
                  className="pl-10"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {projects
                .filter((p) =>
                  searchQuery
                    ? p.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                      p.city.toLowerCase().includes(searchQuery.toLowerCase()) ||
                      p.professionLabel.toLowerCase().includes(searchQuery.toLowerCase())
                    : true
                )
                .map((project) => (
                  <Link key={project.id} to={`/projects/${project.id}`}>
                    <Card className="p-6 hover:shadow-elegant transition-shadow h-full">
                      <div className="space-y-4">
                        <div>
                          <h3 className="font-heading text-xl font-semibold mb-2">{project.title}</h3>
                          <p className="text-sm text-muted-foreground">
                            {project.city}, {project.region ? `${project.region}, ` : ''}{project.country}
                          </p>
                        </div>
                        <div className="flex items-center gap-2 flex-wrap">
                          <Badge variant="secondary">{project.professionLabel}</Badge>
                          <Badge variant="outline">{project.radiusKm}km radius</Badge>
                          {project.keywords.length > 0 && (
                            <Badge variant="outline">{project.keywords.length} keywords</Badge>
                          )}
                        </div>
                        {project.updatedAt && (
                          <div className="text-xs text-muted-foreground">
                            Updated: {new Date(project.updatedAt).toLocaleDateString()}
                          </div>
                        )}
                      </div>
                    </Card>
                  </Link>
                ))}
              {projects.length === 0 && (
                <div className="col-span-full">
                  <Card className="p-12 text-center">
                    <p className="text-muted-foreground mb-4">No projects yet. Create your first project to get started!</p>
                    <Button onClick={() => setOpen(true)}>
                      <Plus className="mr-2 h-4 w-4" />
                      Create Project
                    </Button>
                  </Card>
                </div>
              )}
            </div>

            <CreateProjectModal open={open} onOpenChange={setOpen} />
          </div>
        </div>
      </AppShell>
    </>
  );
}
