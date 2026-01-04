"use client";

import { useState } from "react";
import Link from "next/link";
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
} from "@/components/ui/dropdown-menu";
import { Separator } from "@/components/ui/separator";
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

  const handleCopy = async (e: React.MouseEvent) => {
    e.preventDefault(); // Prevent navigation
    e.stopPropagation();
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
    <Card className="group relative border border-zinc-800 bg-zinc-900/30 hover:bg-zinc-900/50 hover:border-zinc-700 transition-all rounded-xl overflow-hidden">
      <Link href={`/snippets/${id}`} className="block h-full w-full">
        <CardHeader className="pb-3 flex flex-row items-center justify-between">
          <div className="space-y-1">
            <CardTitle className="text-lg font-semibold tracking-tight text-white flex items-center gap-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-white/10">
                <Code2 className="w-4 h-4 text-white" />
              </div>
              {title}
            </CardTitle>
            <CardDescription className="text-xs text-zinc-400">
              {language.toUpperCase()}{" "}
              {createdAt && `• ${new Date(createdAt).toLocaleDateString()}`}
            </CardDescription>
          </div>

          <div className="flex items-center gap-1" onClick={(e) => e.preventDefault()}>
            <TooltipProvider delayDuration={200}>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    onClick={handleCopy}
                    variant="ghost"
                    size="icon"
                    className="rounded-lg h-8 w-8 hover:bg-zinc-800 text-zinc-400 hover:text-white"
                  >
                    {copied ? (
                      <Check className="w-4 h-4 text-green-500" />
                    ) : (
                      <Copy className="w-4 h-4" />
                    )}
                  </Button>
                </TooltipTrigger>
                <TooltipContent side="left" className="bg-zinc-900 text-zinc-300 border-zinc-800">
                  <p>{copied ? "Copied!" : "Copy code"}</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  className="rounded-lg h-8 w-8 hover:bg-zinc-800 text-zinc-400 hover:text-white"
                >
                  <MoreVertical className="w-4 h-4" />
                </Button>
              </DropdownMenuTrigger>

              <DropdownMenuContent
                align="end"
                className="bg-zinc-900 border-zinc-800 text-zinc-300"
              >
                <div className="flex items-center justify-center gap-2 px-2 py-1">
                  <StarButton
                    snippetId={id}
                    initialStarred={starred}
                    onToggle={(newState: boolean) => setStarred(newState)}
                  />

                  <Separator
                    orientation="vertical"
                    className="h-5 bg-zinc-800 w-px"
                  />

                  <DeleteButton snippetId={id} />
                </div>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </CardHeader>

        <CardContent>
          <pre className="bg-black/30 border border-zinc-800 text-sm rounded-lg p-3 text-zinc-300 font-mono max-h-48 overflow-hidden whitespace-pre-wrap relative">
            <code>{code.length > 300 ? `${code.slice(0, 300)}...` : code}</code>
          </pre>
        </CardContent>
      </Link>
    </Card>
  );
}
