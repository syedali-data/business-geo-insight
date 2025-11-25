import { useState } from "react";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Sparkles, Download, Send, FileJson, FileCode } from "lucide-react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface SettingsPanelProps {
  onGenerate: (settings: any) => void;
  onExport: (format: "html" | "json" | "pdf") => void;
  isGenerating: boolean;
}

export const SettingsPanel = ({ onGenerate, onExport, isGenerating }: SettingsPanelProps) => {
  const [template, setTemplate] = useState("default");
  const [tone, setTone] = useState("professional");
  const [length, setLength] = useState("standard");
  const [aiPrompt, setAiPrompt] = useState("");

  const handleGenerate = () => {
    onGenerate({ template, tone, length, prompt: aiPrompt });
  };

  return (
    <ScrollArea className="h-full">
      <div className="p-6 space-y-6">
        {/* AI Generation */}
        <Card className="glass border-primary/20">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-base">
              <Sparkles className="h-4 w-4 text-primary" />
              AI Generation
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label>Template</Label>
              <Select value={template} onValueChange={setTemplate}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="default">Default</SelectItem>
                  <SelectItem value="promo">Promotional</SelectItem>
                  <SelectItem value="insights">Market Insights</SelectItem>
                  <SelectItem value="update">Business Update</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label>Tone</Label>
              <Select value={tone} onValueChange={setTone}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="professional">Professional</SelectItem>
                  <SelectItem value="friendly">Friendly</SelectItem>
                  <SelectItem value="casual">Casual</SelectItem>
                  <SelectItem value="formal">Formal</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label>Length</Label>
              <Select value={length} onValueChange={setLength}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="short">Short (3-5 sections)</SelectItem>
                  <SelectItem value="standard">Standard (5-7 sections)</SelectItem>
                  <SelectItem value="long">Long (8+ sections)</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label>AI Prompt (Optional)</Label>
              <Textarea
                placeholder="Describe what you want to generate... e.g., 'Focus on new business opportunities in the area'"
                value={aiPrompt}
                onChange={(e) => setAiPrompt(e.target.value)}
                className="min-h-[100px]"
              />
            </div>

            <Button
              onClick={handleGenerate}
              disabled={isGenerating}
              className="w-full shadow-elegant"
            >
              <Sparkles className="h-4 w-4 mr-2" />
              {isGenerating ? "Generating..." : "Generate with AI"}
            </Button>
          </CardContent>
        </Card>

        {/* Export Options */}
        <Card className="glass">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-base">
              <Download className="h-4 w-4" />
              Export
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <Button
              variant="outline"
              className="w-full justify-start"
              onClick={() => onExport("html")}
            >
              <FileCode className="h-4 w-4 mr-2" />
              Export as HTML
            </Button>
            <Button
              variant="outline"
              className="w-full justify-start"
              onClick={() => onExport("json")}
            >
              <FileJson className="h-4 w-4 mr-2" />
              Export as JSON
            </Button>
            <Button
              variant="default"
              className="w-full justify-start shadow-elegant"
              onClick={() => onExport("pdf")}
            >
              <Download className="h-4 w-4 mr-2" />
              Download Premium PDF
            </Button>
          </CardContent>
        </Card>

        {/* Tips */}
        <Card className="glass bg-muted/30">
          <CardContent className="p-4 space-y-2">
            <div className="flex items-start gap-2">
              <Badge variant="purple" className="mt-0.5">Tip</Badge>
              <p className="text-xs text-muted-foreground">
                Use AI generation to automatically create content based on your project's research data
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </ScrollArea>
  );
};
