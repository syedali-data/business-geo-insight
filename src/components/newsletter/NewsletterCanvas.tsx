import { useDrop } from "react-dnd";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { CanvasBlock } from "./CanvasBlock";
import { BlockType } from "./ContentBlock";
import { FileText } from "lucide-react";

interface Block {
  id: string;
  type: BlockType;
  content: any;
}

interface NewsletterCanvasProps {
  blocks: Block[];
  onAddBlock: (type: BlockType) => void;
  onUpdateBlock: (id: string, content: any) => void;
  onDeleteBlock: (id: string) => void;
}

export const NewsletterCanvas = ({
  blocks,
  onAddBlock,
  onUpdateBlock,
  onDeleteBlock,
}: NewsletterCanvasProps) => {
  const [{ isOver }, drop] = useDrop(() => ({
    accept: "block",
    drop: (item: { type: BlockType }) => {
      onAddBlock(item.type);
    },
    collect: (monitor) => ({
      isOver: monitor.isOver(),
    }),
  }));

  return (
    <div
      ref={drop}
      className={cn(
        "h-full overflow-auto p-8",
        "bg-gradient-to-br from-background via-background to-muted/20",
        isOver && "ring-2 ring-primary ring-offset-2"
      )}
    >
      <div className="max-w-2xl mx-auto">
        {/* Email Container */}
        <div className="glass rounded-xl border border-border/50 overflow-hidden shadow-elegant">
          {/* Email Header */}
          <div className="bg-primary/5 border-b border-border/50 p-6">
            <div className="flex items-center gap-3 mb-4">
              <FileText className="h-5 w-5 text-primary" />
              <span className="text-sm font-medium text-muted-foreground">Newsletter Preview</span>
            </div>
            <h1 className="text-2xl font-heading font-bold">Your Newsletter Title</h1>
          </div>

          {/* Email Body */}
          <div className="p-8 space-y-4 bg-background">
            {blocks.length === 0 ? (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-center py-20"
              >
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 mb-4">
                  <FileText className="h-8 w-8 text-primary" />
                </div>
                <h3 className="font-heading text-lg font-semibold mb-2">Start Building</h3>
                <p className="text-muted-foreground max-w-sm mx-auto">
                  Drag and drop content blocks from the left panel to start creating your newsletter
                </p>
              </motion.div>
            ) : (
              blocks.map((block, index) => (
                <motion.div
                  key={block.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05 }}
                >
                  <CanvasBlock
                    {...block}
                    onUpdate={onUpdateBlock}
                    onDelete={onDeleteBlock}
                  />
                </motion.div>
              ))
            )}
          </div>

          {/* Email Footer */}
          <div className="bg-muted/30 border-t border-border/50 p-6 text-center text-sm text-muted-foreground">
            <p>© 2025 LocalPulse. All rights reserved.</p>
          </div>
        </div>
      </div>
    </div>
  );
};
