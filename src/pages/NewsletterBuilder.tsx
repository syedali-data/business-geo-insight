import { useState } from "react";
import { Helmet } from "react-helmet-async";
import { Link, useParams } from "react-router-dom";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { Sparkles, Layers } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ResizablePanelGroup, ResizablePanel, ResizableHandle } from "@/components/ui/resizable";
import { ScrollArea } from "@/components/ui/scroll-area";
import { ContentBlock, BLOCK_LIBRARY, BlockType } from "@/components/newsletter/ContentBlock";
import { NewsletterCanvas } from "@/components/newsletter/NewsletterCanvas";
import { SettingsPanel } from "@/components/newsletter/SettingsPanel";
import { useProjects } from "@/store/projects";
import { toast } from "@/hooks/use-toast";

interface Block {
  id: string;
  type: BlockType;
  content: any;
}

export default function NewsletterBuilder() {
  const { id } = useParams();
  const project = useProjects.getState().getProject(id!);
  const [blocks, setBlocks] = useState<Block[]>([]);
  const [isGenerating, setIsGenerating] = useState(false);

  const handleAddBlock = (type: BlockType) => {
    const newBlock: Block = {
      id: `block-${Date.now()}`,
      type,
      content: {},
    };
    setBlocks([...blocks, newBlock]);
  };

  const handleUpdateBlock = (id: string, content: any) => {
    setBlocks(blocks.map((block) => (block.id === id ? { ...block, content } : block)));
  };

  const handleDeleteBlock = (id: string) => {
    setBlocks(blocks.filter((block) => block.id !== id));
  };

  const handleGenerate = async (settings: any) => {
    setIsGenerating(true);
    try {
      // Simulate AI generation
      await new Promise((resolve) => setTimeout(resolve, 2000));
      
      const generatedBlocks: Block[] = [
        {
          id: `block-${Date.now()}-1`,
          type: "heading",
          content: { text: "Market Insights for " + project?.city },
        },
        {
          id: `block-${Date.now()}-2`,
          type: "text",
          content: {
            text: "Discover the latest trends and opportunities in your local market. Our AI-powered analysis has uncovered valuable insights for your business.",
          },
        },
        {
          id: `block-${Date.now()}-3`,
          type: "button",
          content: { text: "View Full Report", url: "#" },
        },
      ];
      
      setBlocks(generatedBlocks);
      toast({
        title: "Content Generated",
        description: "Your newsletter content has been generated successfully",
      });
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to generate content",
      });
    } finally {
      setIsGenerating(false);
    }
  };

  const handleExport = (format: "html" | "json") => {
    if (format === "json") {
      const data = JSON.stringify(blocks, null, 2);
      const blob = new Blob([data], { type: "application/json" });
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = "newsletter.json";
      a.click();
    } else {
      toast({
        title: "Export Started",
        description: `Exporting newsletter as ${format.toUpperCase()}`,
      });
    }
  };

  return (
    <DndProvider backend={HTML5Backend}>
      <Helmet>
        <title>Newsletter Builder - {project?.title || "LocalPulse"}</title>
      </Helmet>

      <div className="h-screen flex flex-col bg-background">
        {/* Header */}
        <header className="border-b bg-background/95 backdrop-blur sticky top-0 z-50 h-16">
          <div className="container mx-auto px-4 h-full flex items-center justify-between">
            <Link to="/" className="flex items-center gap-2">
              <Sparkles className="h-6 w-6 text-primary" />
              <span className="font-heading text-xl font-bold">LocalPulse</span>
            </Link>
            <nav className="flex items-center gap-4">
              <Link to="/newsletter">
                <Button variant="ghost" size="sm">
                  Newsletter Hub
                </Button>
              </Link>
              {project && (
                <Link to={`/projects/${project.id}`}>
                  <Button variant="ghost" size="sm">
                    View Project
                  </Button>
                </Link>
              )}
            </nav>
          </div>
        </header>

        {/* Three-Panel Layout */}
        <div className="flex-1 overflow-hidden">
          <ResizablePanelGroup direction="horizontal">
            {/* Left Panel - Content Blocks */}
            <ResizablePanel defaultSize={20} minSize={15} maxSize={30}>
              <div className="h-full bg-gradient-to-b from-background to-muted/20 border-r">
                <div className="p-4 border-b bg-background/50 backdrop-blur">
                  <div className="flex items-center gap-2 mb-1">
                    <Layers className="h-4 w-4 text-primary" />
                    <h2 className="font-heading font-semibold">Content Blocks</h2>
                  </div>
                  <p className="text-xs text-muted-foreground">Drag blocks to canvas</p>
                </div>
                <ScrollArea className="h-[calc(100%-73px)]">
                  <div className="p-4 space-y-3">
                    {BLOCK_LIBRARY.map((block) => (
                      <ContentBlock key={block.type} {...block} />
                    ))}
                  </div>
                </ScrollArea>
              </div>
            </ResizablePanel>

            <ResizableHandle withHandle />

            {/* Center Panel - Canvas */}
            <ResizablePanel defaultSize={55} minSize={40}>
              <NewsletterCanvas
                blocks={blocks}
                onAddBlock={handleAddBlock}
                onUpdateBlock={handleUpdateBlock}
                onDeleteBlock={handleDeleteBlock}
              />
            </ResizablePanel>

            <ResizableHandle withHandle />

            {/* Right Panel - Settings */}
            <ResizablePanel defaultSize={25} minSize={20} maxSize={35}>
              <div className="h-full bg-gradient-to-b from-background to-muted/20 border-l">
                <SettingsPanel
                  onGenerate={handleGenerate}
                  onExport={handleExport}
                  isGenerating={isGenerating}
                />
              </div>
            </ResizablePanel>
          </ResizablePanelGroup>
        </div>
      </div>
    </DndProvider>
  );
}
