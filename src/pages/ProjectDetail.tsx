import { Helmet } from 'react-helmet-async';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Switch } from '@/components/ui/switch';
import { Sparkles, Play, ArrowLeft } from 'lucide-react';
import { Link, useParams } from 'react-router-dom';
import { useMutation } from '@tanstack/react-query';
import { toast } from '@/hooks/use-toast';
import { runMarketResearch, runNewsletter } from '@/lib/api';
import { useState } from 'react';

export default function ProjectDetail() {
  const { id } = useParams();
  const [templateId, setTemplateId] = useState('default');
  const [tone, setTone] = useState<'professional' | 'friendly'>('professional');
  const [length, setLength] = useState<'short' | 'standard' | 'long'>('standard');
  const [sendNow, setSendNow] = useState(false);

  // Mock data
  const project = {
    id,
    title: 'London Roofing Contractors',
    location: 'London, ON, Canada',
    country: 'CA',
    region: 'ON',
    city: 'London',
    profession: 'Roofing',
    professionCode: 'roofing',
    professionLabel: 'Roofing',
    radiusKm: 25,
    keywords: ['residential', 'commercial']
  };

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
      max_leads: 200,
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
                <Badge variant="secondary">{project.location}</Badge>
                <Badge variant="outline">{project.profession}</Badge>
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
                        <p className="font-medium">{project.location}</p>
                      </div>
                      <div>
                        <span className="text-muted-foreground">Profession:</span>
                        <p className="font-medium">{project.profession}</p>
                      </div>
                      <div>
                        <span className="text-muted-foreground">Radius:</span>
                        <p className="font-medium">{project.radiusKm}km</p>
                      </div>
                      <div>
                        <span className="text-muted-foreground">Keywords:</span>
                        <p className="font-medium">{project.keywords.join(', ')}</p>
                      </div>
                    </div>
                  </div>

                  <div className="border-t pt-6">
                    <Button 
                      size="lg" 
                      className="w-full md:w-auto shadow-elegant"
                      onClick={handleRunResearch}
                      disabled={runMutation.isPending}
                    >
                      <Play className="mr-2 h-4 w-4" />
                      {runMutation.isPending ? 'Starting...' : 'Run Research'}
                    </Button>
                    <p className="text-sm text-muted-foreground mt-2">
                      Est. 2-3 minutes • 1 credit
                    </p>
                  </div>
                </Card>

                <Card className="p-6">
                  <h3 className="text-lg font-semibold mb-4">Recent Runs</h3>
                  <p className="text-sm text-muted-foreground">No runs yet</p>
                </Card>
              </TabsContent>

              <TabsContent value="results">
                <Card className="p-6">
                  <p className="text-muted-foreground">No results yet. Run your first research to see leads.</p>
                </Card>
              </TabsContent>

              <TabsContent value="insights">
                <Card className="p-6">
                  <p className="text-muted-foreground">Insights will appear after running research.</p>
                </Card>
              </TabsContent>

              <TabsContent value="newsletter" className="space-y-4">
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

              <TabsContent value="settings">
                <Card className="p-6 space-y-4">
                  <h3 className="text-lg font-semibold">Project Settings</h3>
                  <Button variant="destructive">Delete Project</Button>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </div>
    </>
  );
}
