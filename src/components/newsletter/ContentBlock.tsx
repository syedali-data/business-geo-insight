import { useDrag } from "react-dnd";
import { GripVertical, Type, Image, Link2, Minus, AlignLeft } from "lucide-react";
import { cn } from "@/lib/utils";

export type BlockType = "heading" | "text" | "image" | "button" | "divider";

interface ContentBlockProps {
  type: BlockType;
  label: string;
  icon: React.ReactNode;
}

export const ContentBlock = ({ type, label, icon }: ContentBlockProps) => {
  const [{ isDragging }, drag] = useDrag(() => ({
    type: "block",
    item: { type },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  }));

  return (
    <div
      ref={drag}
      className={cn(
        "glass p-4 rounded-lg cursor-move transition-all duration-200 hover:scale-105",
        "border border-border/50 hover:border-primary/50",
        "flex items-center gap-3 group",
        isDragging && "opacity-50"
      )}
    >
      <GripVertical className="h-4 w-4 text-muted-foreground group-hover:text-primary transition-colors" />
      <div className="flex items-center gap-2">
        {icon}
        <span className="text-sm font-medium">{label}</span>
      </div>
    </div>
  );
};

export const BLOCK_LIBRARY: Array<{ type: BlockType; label: string; icon: React.ReactNode }> = [
  { type: "heading", label: "Heading", icon: <Type className="h-4 w-4" /> },
  { type: "text", label: "Paragraph", icon: <AlignLeft className="h-4 w-4" /> },
  { type: "image", label: "Image", icon: <Image className="h-4 w-4" /> },
  { type: "button", label: "Button", icon: <Link2 className="h-4 w-4" /> },
  { type: "divider", label: "Divider", icon: <Minus className="h-4 w-4" /> },
];
