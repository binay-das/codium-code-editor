"use client";

import { useState } from "react";
import { Copy, Check, Code2, MoreVertical } from "lucide-react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipTrigger,
  TooltipContent,
  TooltipProvider,
} from "@/components/ui/tooltip";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";
import { toast } from "sonner";
import { StarButton } from "./StarButton";
import { DeleteButton } from "./DeleteButton";

interface SnippetCardProps {
  id: string;
  title: string;
  language: string;
  code: string;
  createdAt?: string;
  isStarred: boolean;
}

export default function SnippetCard({
  id,
  title,
  language,
  code,
  createdAt,
  isStarred,
}: SnippetCardProps) {
  const [copied, setCopied] = useState(false);
  const [starred, setStarred] = useState(isStarred);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(code);
      setCopied(true);
      toast.success("Code copied to clipboard!");
      setTimeout(() => setCopied(false), 1500);
    } catch {
      toast.error("Failed to copy code.");
    }
  };

  return (
    <Card
      className={cn(
        "group relative border border-border/50 bg-muted/40 hover:bg-muted/60 transition-all rounded-2xl overflow-hidden"
      )}
    >
      <CardHeader className="pb-3 flex flex-row items-center justify-between">
        {/* Left side — title */}
        <div className="space-y-1">
          <CardTitle className="text-lg font-semibold tracking-tight flex items-center gap-2">
            <Code2 className="w-4 h-4 text-primary" />
            {title}
          </CardTitle>
          <CardDescription className="text-xs text-muted-foreground">
            {language.toUpperCase()}{" "}
            {createdAt && `• ${new Date(createdAt).toLocaleDateString()}`}
          </CardDescription>
        </div>

        {/* Right side — buttons */}
        <div className="flex items-center gap-1">
          {/* Copy button */}
          <TooltipProvider delayDuration={200}>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  onClick={handleCopy}
                  variant="ghost"
                  size="icon"
                  className="rounded-full hover:bg-primary/10 text-muted-foreground"
                >
                  {copied ? (
                    <Check className="w-4 h-4 text-green-500" />
                  ) : (
                    <Copy className="w-4 h-4" />
                  )}
                </Button>
              </TooltipTrigger>
              <TooltipContent side="left">
                <p>{copied ? "Copied!" : "Copy code"}</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>

          {/* 3-dot dropdown */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                className="rounded-full hover:bg-primary/10 text-muted-foreground"
              >
                <MoreVertical className="w-4 h-4" />
              </Button>
            </DropdownMenuTrigger>

            <DropdownMenuContent
              align="end"
              className="flex items-center justify-center gap-2 px-2 py-1"
            >
              <StarButton
                snippetId={id}
                initialStarred={starred}
                onToggle={(newState: boolean) => setStarred(newState)}
              />

              <Separator
                orientation="vertical"
                className="h-5 bg-border/60 w-px"
              />

              <DeleteButton snippetId={id} />
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </CardHeader>

      <CardContent>
        <pre className="bg-background/60 text-sm rounded-lg p-3 text-muted-foreground max-h-48 overflow-hidden whitespace-pre-wrap relative">
          <code>{code.length > 300 ? `${code.slice(0, 300)}...` : code}</code>
        </pre>
      </CardContent>
    </Card>
  );
}
