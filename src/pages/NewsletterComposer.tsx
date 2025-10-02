import { useState } from "react";
import { Helmet } from 'react-helmet-async';
import { useParams, Link, useNavigate } from "react-router-dom";
import { useProjects } from "@/store/projects";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { useMutation } from "@tanstack/react-query";
import { runNewsletter } from "@/lib/api";
import { toast } from "@/hooks/use-toast";
import { Sparkles, FileText, AlertCircle } from "lucide-react";

export default function NewsletterComposer() {
  const { id } = useParams();
  const project = useProjects.getState().getProject(id!);
  const nav = useNavigate();

  const [templateId, setTemplateId] = useState("default");
  const [tone, setTone] = useState<"professional" | "friendly">("professional");
  const [length, setLength] = useState<"short" | "standard" | "long">("standard");
  const [sendNow, setSendNow] = useState(false);

  const mutation = useMutation({
    mutationFn: () =>
      runNewsletter({
        projectId: project!.id,
        templateId,
        tone,
        length,
        sendNow,
      }),
    onSuccess: (data: any) => {
      toast({
        title: "Newsletter Generated",
        description: data.status || "Your newsletter has been generated successfully",
      });
    },
    onError: (error: any) => {
      toast({
        variant: "destructive",
        title: "Error",
        description: error.message || "Failed to generate newsletter",
      });
    },
  });

  if (!project) {
    return (
      <>
        <Helmet>
          <title>Project Not Found - LocalPulse</title>
        </Helmet>
        <div className="min-h-screen bg-background flex items-center justify-center p-6">
          <Card className="max-w-md">
            <CardContent className="p-12 text-center">
              <AlertCircle className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
              <h2 className="font-heading text-xl font-semibold mb-2">Project Not Found</h2>
              <p className="text-muted-foreground mb-6">
                The project you're looking for doesn't exist or has been deleted.
              </p>
              <Link to="/newsletter">
                <Button>Back to Newsletter Hub</Button>
              </Link>
            </CardContent>
          </Card>
        </div>
      </>
    );
  }

  return (
    <>
      <Helmet>
        <title>Newsletter Composer - {project.title} - LocalPulse</title>
      </Helmet>

      <div className="min-h-screen bg-background">
        {/* Header */}
        <header className="border-b bg-background/95 backdrop-blur sticky top-0 z-50">
          <div className="container mx-auto px-4 h-16 flex items-center justify-between">
            <Link to="/" className="flex items-center gap-2">
              <Sparkles className="h-6 w-6 text-primary" />
              <span className="font-heading text-xl font-bold">LocalPulse</span>
            </Link>
            <nav className="flex items-center gap-4">
              <Link to="/newsletter">
                <Button variant="ghost" size="sm">Newsletter Hub</Button>
              </Link>
              <Link to={`/projects/${project.id}`}>
                <Button variant="ghost" size="sm">View Project</Button>
              </Link>
            </nav>
          </div>
        </header>

        {/* Content */}
        <div className="container mx-auto px-4 py-8">
          <div className="max-w-3xl mx-auto space-y-6">
            <div>
              <h1 className="font-heading text-3xl font-bold mb-2">Newsletter Composer</h1>
              <p className="text-muted-foreground">
                Generate an AI-powered newsletter from your research insights
              </p>
            </div>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <FileText className="h-5 w-5" />
                  Project Details
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <div>
                    <span className="font-medium">{project.title}</span>
                  </div>
                  <div className="text-sm text-muted-foreground">
                    {project.city}
                    {project.region ? `, ${project.region}` : ""}, {project.country} • {project.professionLabel}
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Newsletter Settings</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid sm:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label>Template</Label>
                    <Select value={templateId} onValueChange={setTemplateId}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="default">Default</SelectItem>
                        <SelectItem value="promo">Promo</SelectItem>
                        <SelectItem value="insights">Insights</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label>Tone</Label>
                    <Select value={tone} onValueChange={(v) => setTone(v as any)}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="professional">Professional</SelectItem>
                        <SelectItem value="friendly">Friendly</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label>Length</Label>
                    <Select value={length} onValueChange={(v) => setLength(v as any)}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="short">Short</SelectItem>
                        <SelectItem value="standard">Standard</SelectItem>
                        <SelectItem value="long">Long</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="flex items-center justify-between space-y-2">
                    <Label htmlFor="sendNow">Send Immediately</Label>
                    <Switch id="sendNow" checked={sendNow} onCheckedChange={setSendNow} />
                  </div>
                </div>

                <div className="flex gap-3 pt-4">
                  <Button
                    onClick={() => mutation.mutate()}
                    disabled={mutation.isPending}
                    className="shadow-elegant"
                  >
                    {mutation.isPending ? "Generating…" : "Generate Newsletter"}
                  </Button>
                  <Button variant="outline" onClick={() => nav("/newsletter")}>
                    Cancel
                  </Button>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-muted/30">
              <CardContent className="p-6">
                <div className="flex gap-3">
                  <AlertCircle className="h-5 w-5 text-muted-foreground flex-shrink-0 mt-0.5" />
                  <div className="text-sm text-muted-foreground">
                    <p className="font-medium mb-1">Pro Tip</p>
                    <p>
                      If you haven't run research for this project yet,{" "}
                      <Link className="underline hover:text-foreground" to={`/projects/${project.id}`}>
                        run it first
                      </Link>{" "}
                      so the newsletter composer can use fresh insights and data.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </>
  );
}
