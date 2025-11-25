import { Helmet } from 'react-helmet-async';
import { Link, useNavigate } from "react-router-dom";
import { useProjects } from "@/store/projects";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { FileText, ArrowRight } from "lucide-react";
import AppShell from '@/components/layout/AppShell';

export default function NewsletterHub() {
  const { projects } = useProjects();
  const nav = useNavigate();

  return (
    <>
      <Helmet>
        <title>Newsletter Hub - LocalPulse</title>
      </Helmet>

      <AppShell>
        {/* Content */}
        <div className="container mx-auto px-4 py-8">
          <div className="max-w-5xl mx-auto space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="font-heading text-3xl font-bold mb-2">Newsletter Hub</h1>
                <p className="text-muted-foreground">
                  Create AI-powered newsletters from your research projects
                </p>
              </div>
              <Button variant="outline" onClick={() => nav("/projects")}>
                Manage Projects
              </Button>
            </div>

            {projects.length === 0 ? (
              <Card>
                <CardContent className="p-12 text-center">
                  <FileText className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                  <h3 className="font-heading text-xl font-semibold mb-2">
                    No Projects Yet
                  </h3>
                  <p className="text-muted-foreground mb-6">
                    Create a project and run research first, then generate newsletters from your insights.
                  </p>
                  <Button onClick={() => nav("/projects?new=1")}>
                    Create Your First Project
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </CardContent>
              </Card>
            ) : (
              <div className="grid sm:grid-cols-2 gap-6">
                {projects.map((p) => (
                  <Card key={p.id} className="hover:shadow-elegant transition-shadow">
                    <CardHeader>
                      <CardTitle className="text-xl">{p.title}</CardTitle>
                      <p className="text-sm text-muted-foreground">
                        {p.city}{p.region ? `, ${p.region}` : ""}, {p.country} • {p.professionLabel}
                      </p>
                    </CardHeader>
                    <CardContent className="space-y-3">
                      <div className="flex gap-3">
                        <Link to={`/projects/${p.id}`} className="flex-1">
                          <Button variant="outline" className="w-full" size="sm">
                            View Research
                          </Button>
                        </Link>
                        <Link to={`/newsletter/${p.id}`} className="flex-1">
                          <Button className="w-full" size="sm">
                            <FileText className="mr-2 h-4 w-4" />
                            Open Composer
                          </Button>
                        </Link>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </div>
        </div>
      </AppShell>
    </>
  );
}
