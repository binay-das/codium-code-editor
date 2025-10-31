"use client";

import { useState } from "react";
import { Copy, Check, Code2 } from "lucide-react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipTrigger,
  TooltipContent,
  TooltipProvider,
} from "@/components/ui/tooltip";
import { cn } from "@/lib/utils";

interface SnippetCardProps {
  title: string;
  language: string;
  code: string;
  createdAt?: string;
}

export default function SnippetCard({
  title,
  language,
  code,
  createdAt,
}: SnippetCardProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };

  return (
    <Card
      className={cn(
        "group relative border border-border/50 bg-muted/40 hover:bg-muted/60 transition-all rounded-2xl overflow-hidden"
      )}
    >
      <CardHeader className="pb-3 flex flex-row items-center justify-between">
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
      </CardHeader>

      <CardContent>
        <pre className="bg-background/60 text-sm rounded-lg p-3 text-muted-foreground max-h-48 overflow-hidden whitespace-pre-wrap relative">
          <code>{code.length > 300 ? `${code.slice(0, 300)}...` : code}</code>
        </pre>
      </CardContent>

      {/* <CardFooter className="text-xs text-muted-foreground">
        {createdAt ? (
          <span>Created on {new Date(createdAt).toLocaleDateString()}</span>
        ) : (
          <span>Untitled snippet</span>
        )}
      </CardFooter> */}
    </Card>
  );
}
