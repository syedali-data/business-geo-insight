import { Helmet } from 'react-helmet-async';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Slider } from '@/components/ui/slider';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Switch } from '@/components/ui/switch';
import { Sparkles, Play, ArrowLeft, Save, Trash2 } from 'lucide-react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import { useMutation } from '@tanstack/react-query';
import { toast } from '@/hooks/use-toast';
import { runMarketResearch, runNewsletter } from '@/lib/api';
import { useState, useEffect } from 'react';
import { useProjects } from '@/store/projects';
import { fetchProjectLeads } from '@/lib/leads';
import { computeInsights, Insights } from '@/lib/insights';
import { InsightsTab } from '@/components/projects/InsightsTab';
import { ResultsTab } from '@/components/projects/ResultsTab';
import { Lead } from '@/types';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";

export default function ProjectDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const project = useProjects((s) => s.getProject(id!));
  const updateProject = useProjects((s) => s.updateProject);
  const deleteProject = useProjects((s) => s.deleteProject);
  
  const [templateId, setTemplateId] = useState('default');
  const [tone, setTone] = useState<'professional' | 'friendly'>('professional');
  const [length, setLength] = useState<'short' | 'standard' | 'long'>('standard');
  const [sendNow, setSendNow] = useState(false);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  
  // Settings form state - initialize with empty object if no project
  const [editForm, setEditForm] = useState<any>(project || {});

  // Insights state
  const [leads, setLeads] = useState<Lead[]>([]);
  const [insights, setInsights] = useState<Insights | null>(null);
  const [loadingInsights, setLoadingInsights] = useState(false);

  // Load leads and compute insights
  useEffect(() => {
    if (!project) return;

    async function loadInsights() {
      setLoadingInsights(true);
      try {
        const fetchedLeads = await fetchProjectLeads(project.id!, {
          sheetId: project.sheetId,
          range: project.leadsRange || 'Leads!A1:Z',
        });
        setLeads(fetchedLeads);
        const computed = computeInsights(fetchedLeads, project.radiusKm);
        setInsights(computed);
      } catch (error) {
        console.error('Failed to load insights:', error);
        toast({
          variant: 'destructive',
          title: 'Error',
          description: 'Failed to load insights',
        });
      } finally {
        setLoadingInsights(false);
      }
    }

    loadInsights();
  }, [project]);

  function updateEditForm(key: string, value: any) {
    setEditForm((f: any) => ({ ...f, [key]: value }));
  }

  function handleSaveSettings() {
    if (!project) return;
    updateProject(project.id, editForm);
    toast({
      title: "Settings Saved",
      description: "Project settings have been updated.",
    });
  }

  function handleDeleteProject() {
    if (!project) return;
    deleteProject(project.id);
    toast({
      title: "Project Deleted",
      description: `${project.title} has been deleted.`,
    });
    navigate('/projects');
  }

  // Render not found state
  if (!project) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <Card className="p-6 max-w-md text-center">
          <h2 className="text-xl font-semibold mb-2">Project not found</h2>
          <p className="text-muted-foreground mb-4">The project you're looking for doesn't exist.</p>
          <Link to="/projects">
            <Button>Back to Projects</Button>
          </Link>
        </Card>
      </div>
    );
  }

  // Market research mutation
  const runMutation = useMutation({
    mutationFn: (payload: any) => runMarketResearch(payload),
    onSuccess: (data: any) => {
      if (data?.status === 'queued') {
        toast({
          title: 'Research Queued',
          description: "We'll notify you when it's ready.",
        });
      } else {
        toast({
          title: 'Research Started',
          description: 'Your market research is running...',
        });
      }
    },
    onError: (error: any) => {
      toast({
        variant: 'destructive',
        title: 'Error',
        description: error.message || 'Failed to start research',
      });
    },
  });

  // Newsletter mutation
  const newsletterMutation = useMutation({
    mutationFn: (payload: any) => runNewsletter(payload),
    onSuccess: (data: any) => {
      toast({
        title: 'Newsletter Generated',
        description: data?.status || 'Your newsletter is being generated...',
      });
    },
    onError: (error: any) => {
      toast({
        variant: 'destructive',
        title: 'Error',
        description: error.message || 'Failed to generate newsletter',
      });
    },
  });

  const handleRunResearch = () => {
    runMutation.mutate({
      projectId: project.id!,
      country: project.country,
      region: project.region,
      city: project.city,
      radius_km: project.radiusKm,
      profession_code: project.professionCode,
      profession_label: project.professionLabel,
      keywords: project.keywords,
      max_leads: project.maxLeads || 100,
      enrich: true,
      validate_emails: true,
    });
  };

  const handleGenerateNewsletter = () => {
    newsletterMutation.mutate({
      projectId: project.id!,
      templateId,
      tone,
      length,
      sendNow,
    });
  };

  return (
    <>
      <Helmet>
        <title>{project.title} - LocalPulse</title>
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
              <Link to="/projects" className="text-sm font-medium hover:text-primary transition-colors">
                Projects
              </Link>
            </nav>
          </div>
        </header>

        {/* Content */}
        <div className="container mx-auto px-4 py-8">
          <div className="max-w-6xl mx-auto space-y-6">
            <div className="flex items-center gap-4">
              <Link to="/projects">
                <Button variant="ghost" size="sm">
                  <ArrowLeft className="mr-2 h-4 w-4" />
                  Back
                </Button>
              </Link>
            </div>

            <div>
              <h1 className="font-heading text-3xl font-bold mb-2">{project.title}</h1>
              <div className="flex flex-wrap gap-2">
                <Badge variant="secondary">
                  {project.city}, {project.region ? `${project.region}, ` : ''}{project.country}
                </Badge>
                <Badge variant="outline">{project.professionLabel}</Badge>
                <Badge variant="outline">{project.radiusKm}km radius</Badge>
              </div>
            </div>

            <Tabs defaultValue="run" className="w-full">
              <TabsList className="grid w-full grid-cols-5">
                <TabsTrigger value="run">Run</TabsTrigger>
                <TabsTrigger value="results">Results</TabsTrigger>
                <TabsTrigger value="insights">Insights</TabsTrigger>
                <TabsTrigger value="newsletter">Newsletter</TabsTrigger>
                <TabsTrigger value="settings">Settings</TabsTrigger>
              </TabsList>

              <TabsContent value="run" className="space-y-4">
                <Card className="p-6 space-y-6">
                  <div>
                    <h3 className="text-lg font-semibold mb-4">Run Configuration</h3>
                    <div className="grid md:grid-cols-2 gap-4 text-sm">
                      <div>
                        <span className="text-muted-foreground">Location:</span>
                        <p className="font-medium">
                          {project.city}, {project.region ? `${project.region}, ` : ''}{project.country}
                        </p>
                      </div>
                      <div>
                        <span className="text-muted-foreground">Profession:</span>
                        <p className="font-medium">{project.professionLabel}</p>
                      </div>
                      <div>
                        <span className="text-muted-foreground">Radius:</span>
                        <p className="font-medium">{project.radiusKm}km</p>
                      </div>
                      <div>
                        <span className="text-muted-foreground">Keywords:</span>
                        <p className="font-medium">{project.keywords.join(', ')}</p>
                      </div>
                      <div>
                        <span className="text-muted-foreground">Max Leads:</span>
                        <p className="font-medium">{project.maxLeads || 100}</p>
                      </div>
                    </div>
                  </div>

                  <div className="border-t pt-6">
                    {/* Dynamic estimates based on max_leads */}
                    {(() => {
                      const maxLeads = project.maxLeads || 100;
                      const minTime = Math.max(1, Math.round(maxLeads / 50));
                      const maxTime = Math.round(maxLeads / 40) + 1;
                      const credits = maxLeads <= 100 ? 1 : maxLeads <= 150 ? 2 : 3;
                      return (
                        <div className="mb-4 p-3 rounded-lg bg-muted/50 border">
                          <div className="flex flex-wrap gap-4 text-sm">
                            <div className="flex items-center gap-2">
                              <span className="text-muted-foreground">Est. Time:</span>
                              <span className="font-medium">{minTime}-{maxTime} min</span>
                            </div>
                            <div className="flex items-center gap-2">
                              <span className="text-muted-foreground">Credits:</span>
                              <span className="font-medium">{credits} credit{credits > 1 ? 's' : ''}</span>
                            </div>
                            <div className="flex items-center gap-2">
                              <span className="text-muted-foreground">Target:</span>
                              <span className="font-medium">{maxLeads} leads</span>
                            </div>
                          </div>
                        </div>
                      );
                    })()}
                    <Button 
                      size="lg" 
                      className="w-full md:w-auto shadow-elegant"
                      onClick={handleRunResearch}
                      disabled={runMutation.isPending}
                    >
                      <Play className="mr-2 h-4 w-4" />
                      {runMutation.isPending ? 'Starting...' : 'Run Research'}
                    </Button>
                  </div>
                </Card>

                <Card className="p-6">
                  <h3 className="text-lg font-semibold mb-4">Recent Runs</h3>
                  <p className="text-sm text-muted-foreground">No runs yet</p>
                </Card>
              </TabsContent>

              <TabsContent value="results">
                {leads.length > 0 ? (
                  <ResultsTab leads={leads} />
                ) : (
                  <Card className="p-6">
                    <h3 className="text-lg font-semibold mb-2">No Results Yet</h3>
                    <p className="text-muted-foreground mb-4">
                      Run your first research to see leads.
                    </p>
                    <Link to={`/projects/${project.id}?tab=run`}>
                      <Button>
                        <Play className="mr-2 h-4 w-4" />
                        Run Research
                      </Button>
                    </Link>
                  </Card>
                )}
              </TabsContent>

              <TabsContent value="insights">
                {loadingInsights ? (
                  <Card className="p-6">
                    <p className="text-muted-foreground">Loading insights...</p>
                  </Card>
                ) : insights && leads.length > 0 ? (
                  <InsightsTab insights={insights} />
                ) : (
                  <Card className="p-6">
                    <h3 className="text-lg font-semibold mb-2">No Data Yet</h3>
                    <p className="text-muted-foreground mb-4">
                      Run your first research to generate market insights.
                    </p>
                    <Link to={`/projects/${project.id}?tab=run`}>
                      <Button>
                        <Play className="mr-2 h-4 w-4" />
                        Run Research
                      </Button>
                    </Link>
                  </Card>
                )}
              </TabsContent>

              <TabsContent value="newsletter" className="space-y-4">
                {leads.length > 0 && (
                  <Card className="p-4 bg-primary/5 border-primary/20">
                    <p className="text-sm text-muted-foreground">
                      💡 This newsletter will use insights from your last research run ({leads.length} businesses analyzed)
                    </p>
                  </Card>
                )}
                
                <Card className="p-6 space-y-6">
                  <div>
                    <h3 className="text-lg font-semibold mb-4">Newsletter Settings</h3>
                    
                    <div className="space-y-4">
                      <div className="space-y-2">
                        <Label htmlFor="template">Template</Label>
                        <Select value={templateId} onValueChange={setTemplateId}>
                          <SelectTrigger id="template">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="default">Default</SelectItem>
                            <SelectItem value="modern">Modern</SelectItem>
                            <SelectItem value="classic">Classic</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>

                      <div className="space-y-2">
                        <Label>Tone</Label>
                        <RadioGroup value={tone} onValueChange={(v) => setTone(v as 'professional' | 'friendly')}>
                          <div className="flex items-center space-x-2">
                            <RadioGroupItem value="professional" id="professional" />
                            <Label htmlFor="professional" className="font-normal">Professional</Label>
                          </div>
                          <div className="flex items-center space-x-2">
                            <RadioGroupItem value="friendly" id="friendly" />
                            <Label htmlFor="friendly" className="font-normal">Friendly</Label>
                          </div>
                        </RadioGroup>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="length">Length</Label>
                        <Select value={length} onValueChange={(v) => setLength(v as 'short' | 'standard' | 'long')}>
                          <SelectTrigger id="length">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="short">Short</SelectItem>
                            <SelectItem value="standard">Standard</SelectItem>
                            <SelectItem value="long">Long</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>

                      <div className="flex items-center space-x-2">
                        <Switch id="sendNow" checked={sendNow} onCheckedChange={setSendNow} />
                        <Label htmlFor="sendNow" className="font-normal">Send immediately</Label>
                      </div>
                    </div>
                  </div>

                  <div className="border-t pt-6">
                    <Button 
                      size="lg" 
                      className="w-full md:w-auto"
                      onClick={handleGenerateNewsletter}
                      disabled={newsletterMutation.isPending}
                    >
                      {newsletterMutation.isPending ? 'Generating...' : 'Generate Newsletter'}
                    </Button>
                  </div>
                </Card>

                <Card className="p-6">
                  <h3 className="text-lg font-semibold mb-4">Recent Newsletters</h3>
                  <p className="text-sm text-muted-foreground">No newsletters generated yet</p>
                </Card>
              </TabsContent>

              <TabsContent value="settings" className="space-y-4">
                <Card className="p-6 space-y-6">
                  <div>
                    <h3 className="text-lg font-semibold mb-4">Project Settings</h3>
                    
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div className="sm:col-span-2">
                        <Label htmlFor="edit-title">Project Title</Label>
                        <Input
                          id="edit-title"
                          value={editForm.title || ''}
                          onChange={(e) => updateEditForm('title', e.target.value)}
                        />
                      </div>

                      <div>
                        <Label htmlFor="edit-country">Country (ISO2)</Label>
                        <Input
                          id="edit-country"
                          value={editForm.country || ''}
                          onChange={(e) => updateEditForm('country', e.target.value.toUpperCase())}
                          maxLength={2}
                        />
                      </div>
                      <div>
                        <Label htmlFor="edit-region">Region/State</Label>
                        <Input
                          id="edit-region"
                          value={editForm.region || ''}
                          onChange={(e) => updateEditForm('region', e.target.value)}
                        />
                      </div>
                      <div>
                        <Label htmlFor="edit-city">City</Label>
                        <Input
                          id="edit-city"
                          value={editForm.city || ''}
                          onChange={(e) => updateEditForm('city', e.target.value)}
                        />
                      </div>
                      <div>
                        <Label htmlFor="edit-radius">Radius (km)</Label>
                        <Input
                          id="edit-radius"
                          type="number"
                          value={editForm.radiusKm || 25}
                          onChange={(e) => updateEditForm('radiusKm', Number(e.target.value))}
                          min={1}
                          max={200}
                        />
                      </div>

                      <div className="sm:col-span-2">
                        <Label htmlFor="edit-max-leads">
                          Max Leads per Run: <span className="font-semibold text-primary">{editForm.maxLeads || 100}</span>
                        </Label>
                        <Slider
                          id="edit-max-leads"
                          value={[editForm.maxLeads || 100]}
                          onValueChange={([v]) => updateEditForm('maxLeads', v)}
                          min={50}
                          max={200}
                          step={10}
                          className="mt-2"
                        />
                        <p className="text-xs text-muted-foreground mt-1">
                          Controls how many leads to collect per research run (50-200)
                        </p>
                      </div>

                      <div>
                        <Label htmlFor="edit-profession">Profession Code</Label>
                        <Input
                          id="edit-profession"
                          value={editForm.professionCode || ''}
                          onChange={(e) => updateEditForm('professionCode', e.target.value)}
                        />
                      </div>
                      <div>
                        <Label htmlFor="edit-profession-label">Profession Label</Label>
                        <Input
                          id="edit-profession-label"
                          value={editForm.professionLabel || ''}
                          onChange={(e) => updateEditForm('professionLabel', e.target.value)}
                        />
                      </div>
                      <div className="sm:col-span-2">
                        <Label htmlFor="edit-keywords">Keywords (comma-separated)</Label>
                        <Input
                          id="edit-keywords"
                          value={editForm.keywords?.join(', ') || ''}
                          onChange={(e) =>
                            updateEditForm(
                              'keywords',
                              e.target.value.split(',').map((s) => s.trim()).filter(Boolean)
                            )
                          }
                        />
                      </div>

                      <div className="sm:col-span-2 pt-2 border-t">
                        <h4 className="font-medium text-sm mb-3">Google Sheets</h4>
                        <div className="grid sm:grid-cols-2 gap-4">
                          <div className="sm:col-span-2">
                            <Label htmlFor="edit-sheet-id">Sheet ID</Label>
                            <Input
                              id="edit-sheet-id"
                              value={editForm.sheetId || ''}
                              onChange={(e) => updateEditForm('sheetId', e.target.value)}
                              placeholder="1ABcDEF..."
                            />
                          </div>
                          <div>
                            <Label htmlFor="edit-leads-range">Leads Range</Label>
                            <Input
                              id="edit-leads-range"
                              value={editForm.leadsRange || 'Leads!A1:Z'}
                              onChange={(e) => updateEditForm('leadsRange', e.target.value)}
                            />
                          </div>
                          <div>
                            <Label htmlFor="edit-insights-range">Insights Range</Label>
                            <Input
                              id="edit-insights-range"
                              value={editForm.insightsRange || 'Insights!A1:Z'}
                              onChange={(e) => updateEditForm('insightsRange', e.target.value)}
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="border-t pt-6">
                    <Button onClick={handleSaveSettings} className="w-full sm:w-auto">
                      <Save className="mr-2 h-4 w-4" />
                      Save Changes
                    </Button>
                  </div>
                </Card>

                <Card className="p-6">
                  <h3 className="text-lg font-semibold mb-2 text-destructive">Danger Zone</h3>
                  <p className="text-sm text-muted-foreground mb-4">
                    Permanently delete this project and all associated data.
                  </p>
                  <Button variant="destructive" onClick={() => setDeleteDialogOpen(true)}>
                    <Trash2 className="mr-2 h-4 w-4" />
                    Delete Project
                  </Button>
                </Card>

                <AlertDialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
                  <AlertDialogContent>
                    <AlertDialogHeader>
                      <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                      <AlertDialogDescription>
                        This will permanently delete <strong>{project.title}</strong> and all associated data.
                        This action cannot be undone.
                      </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                      <AlertDialogCancel>Cancel</AlertDialogCancel>
                      <AlertDialogAction onClick={handleDeleteProject} className="bg-destructive text-destructive-foreground hover:bg-destructive/90">
                        Delete Project
                      </AlertDialogAction>
                    </AlertDialogFooter>
                  </AlertDialogContent>
                </AlertDialog>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </div>
    </>
  );
}
