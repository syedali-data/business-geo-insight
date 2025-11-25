import { useState } from "react";
import { Trash2, GripVertical } from "lucide-react";
import { cn } from "@/lib/utils";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { BlockType } from "./ContentBlock";

interface CanvasBlockProps {
  id: string;
  type: BlockType;
  content: any;
  onUpdate: (id: string, content: any) => void;
  onDelete: (id: string) => void;
}

export const CanvasBlock = ({ id, type, content, onUpdate, onDelete }: CanvasBlockProps) => {
  const [isEditing, setIsEditing] = useState(false);

  const renderBlock = () => {
    switch (type) {
      case "heading":
        return isEditing ? (
          <Input
            value={content.text || ""}
            onChange={(e) => onUpdate(id, { ...content, text: e.target.value })}
            onBlur={() => setIsEditing(false)}
            autoFocus
            className="text-2xl font-bold"
          />
        ) : (
          <h2
            className="text-2xl font-bold cursor-text"
            onClick={() => setIsEditing(true)}
          >
            {content.text || "Click to edit heading"}
          </h2>
        );

      case "text":
        return isEditing ? (
          <Textarea
            value={content.text || ""}
            onChange={(e) => onUpdate(id, { ...content, text: e.target.value })}
            onBlur={() => setIsEditing(false)}
            autoFocus
            className="min-h-[100px]"
          />
        ) : (
          <p
            className="text-base leading-relaxed cursor-text"
            onClick={() => setIsEditing(true)}
          >
            {content.text || "Click to edit text"}
          </p>
        );

      case "image":
        return (
          <div className="space-y-2">
            {isEditing ? (
              <Input
                value={content.url || ""}
                onChange={(e) => onUpdate(id, { ...content, url: e.target.value })}
                onBlur={() => setIsEditing(false)}
                placeholder="Enter image URL"
                autoFocus
              />
            ) : (
              <div
                className="cursor-pointer"
                onClick={() => setIsEditing(true)}
              >
                {content.url ? (
                  <img
                    src={content.url}
                    alt={content.alt || "Newsletter image"}
                    className="w-full rounded-lg"
                  />
                ) : (
                  <div className="w-full h-48 bg-muted rounded-lg flex items-center justify-center">
                    <span className="text-muted-foreground">Click to add image URL</span>
                  </div>
                )}
              </div>
            )}
          </div>
        );

      case "button":
        return (
          <div className="space-y-2">
            {isEditing ? (
              <>
                <Input
                  value={content.text || ""}
                  onChange={(e) => onUpdate(id, { ...content, text: e.target.value })}
                  placeholder="Button text"
                  className="mb-2"
                />
                <Input
                  value={content.url || ""}
                  onChange={(e) => onUpdate(id, { ...content, url: e.target.value })}
                  onBlur={() => setIsEditing(false)}
                  placeholder="Button URL"
                />
              </>
            ) : (
              <Button
                onClick={() => setIsEditing(true)}
                className="cursor-pointer"
              >
                {content.text || "Click to edit button"}
              </Button>
            )}
          </div>
        );

      case "divider":
        return <hr className="border-t border-border my-4" />;

      default:
        return null;
    }
  };

  return (
    <div className="group relative glass p-4 rounded-lg border border-border/50 hover:border-primary/50 transition-all">
      <div className="absolute -left-8 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity">
        <GripVertical className="h-4 w-4 text-muted-foreground" />
      </div>
      <div className="absolute -right-8 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity">
        <Button
          variant="ghost"
          size="icon"
          className="h-8 w-8 text-destructive hover:text-destructive"
          onClick={() => onDelete(id)}
        >
          <Trash2 className="h-4 w-4" />
        </Button>
      </div>
      {renderBlock()}
    </div>
  );
};
