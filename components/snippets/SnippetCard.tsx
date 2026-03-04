"use client";

import { useState } from "react";
import Link from "next/link";
import { Copy, Check, Code2, MoreVertical, Tag as TagIcon } from "lucide-react";
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
import TagBadge from "./TagBadge";
import TagManager from "./TagManager";

interface Tag {
  id: string;
  name: string;
  color: string;
}

interface SnippetCardProps {
  id: string;
  title: string;
  language: string;
  code: string;
  createdAt?: string;
  isStarred: boolean;
  tags?: Tag[];
  description?: string | null;
}

export default function SnippetCard({
  id,
  title,
  language,
  code,
  createdAt,
  isStarred,
  tags = [],
  description,
}: SnippetCardProps) {
  const [copied, setCopied] = useState(false);
  const [starred, setStarred] = useState(isStarred);
  const [currentTags, setCurrentTags] = useState<Tag[]>(tags);

  const handleCopy = async (e: React.MouseEvent) => {
    e.preventDefault();
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
    <Card className="group relative border border-gray-200 dark:border-zinc-800 bg-white dark:bg-zinc-900/30 hover:bg-gray-50 dark:hover:bg-zinc-900/50 hover:border-gray-300 dark:hover:border-zinc-700 hover:shadow-md hover:-translate-y-0.5 transition-all duration-200 rounded-xl overflow-hidden">
      <Link href={`/snippets/${id}`} className="block h-full w-full">
        <CardHeader className="pb-3 flex flex-row items-center justify-between">
          <div className="space-y-1">
            <CardTitle className="text-lg font-semibold tracking-tight text-gray-900 dark:text-white flex items-center gap-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gray-100 dark:bg-white/10">
                <Code2 className="w-4 h-4 text-gray-700 dark:text-white" />
              </div>
              {title}
            </CardTitle>
            <CardDescription className="text-xs text-gray-500 dark:text-zinc-400 flex items-center gap-1.5">
              <span className="inline-flex items-center rounded-full px-2 py-0.5 text-[10px] font-semibold tracking-wide bg-gray-100 dark:bg-zinc-800 text-gray-600 dark:text-zinc-400 border border-gray-200 dark:border-zinc-700 uppercase">
                {language}
              </span>
              {createdAt && `• ${new Date(createdAt).toLocaleDateString()}`}
            </CardDescription>
            {description && (
              <p className="text-xs text-gray-600 dark:text-zinc-500 mt-1 line-clamp-2">
                {description}
              </p>
            )}
            {currentTags.length > 0 && (
              <div className="flex flex-wrap gap-1 mt-2">
                {currentTags.slice(0, 3).map((tag) => (
                  <TagBadge key={tag.id} tag={tag} size="sm" />
                ))}
                {currentTags.length > 3 && (
                  <span className="text-xs text-gray-500 dark:text-zinc-500">+{currentTags.length - 3}</span>
                )}
              </div>
            )}
          </div>

          <div className="flex items-center gap-1" onClick={(e) => e.preventDefault()}>
            <TooltipProvider delayDuration={200}>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    onClick={handleCopy}
                    variant="ghost"
                    size="icon"
                    className="rounded-lg h-8 w-8 hover:bg-gray-100 dark:hover:bg-zinc-800 text-gray-500 dark:text-zinc-400 hover:text-gray-900 dark:hover:text-white"
                  >
                    {copied ? (
                      <Check className="w-4 h-4 text-green-600 dark:text-green-500" />
                    ) : (
                      <Copy className="w-4 h-4" />
                    )}
                  </Button>
                </TooltipTrigger>
                <TooltipContent side="left" className="bg-gray-800 dark:bg-zinc-900 text-gray-100 dark:text-zinc-300 border-gray-700 dark:border-zinc-800">
                  <p>{copied ? "Copied!" : "Copy code"}</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  className="rounded-lg h-8 w-8 hover:bg-gray-100 dark:hover:bg-zinc-800 text-gray-500 dark:text-zinc-400 hover:text-gray-900 dark:hover:text-white"
                >
                  <MoreVertical className="w-4 h-4" />
                </Button>
              </DropdownMenuTrigger>

              <DropdownMenuContent
                align="end"
                className="bg-white dark:bg-zinc-900 border-gray-200 dark:border-zinc-800 text-gray-900 dark:text-zinc-300"
              >
                <div className="flex items-center justify-center gap-2 px-2 py-1">
                  <TagManager
                    snippetId={id}
                    currentTags={currentTags}
                    onUpdate={setCurrentTags}
                    trigger={
                      <button className="flex items-center gap-2 px-3 py-1.5 text-sm hover:bg-gray-100 dark:hover:bg-zinc-800 rounded transition-colors">
                        <TagIcon className="w-4 h-4" />
                        Tags
                      </button>
                    }
                  />

                  <Separator
                    orientation="vertical"
                    className="h-5 bg-gray-200 dark:bg-zinc-800 w-px"
                  />

                  <StarButton
                    snippetId={id}
                    initialStarred={starred}
                    onToggle={(newState: boolean) => setStarred(newState)}
                  />

                  <Separator
                    orientation="vertical"
                    className="h-5 bg-gray-200 dark:bg-zinc-800 w-px"
                  />

                  <DeleteButton snippetId={id} />
                </div>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </CardHeader>

        <CardContent>
          <div className="relative">
            <pre className="bg-gray-100 dark:bg-black/30 border border-gray-200 dark:border-zinc-800 text-sm rounded-lg p-3 text-gray-800 dark:text-zinc-300 font-mono max-h-40 overflow-hidden whitespace-pre-wrap">
              <code>{code.length > 300 ? `${code.slice(0, 300)}...` : code}</code>
            </pre>
            <div className="absolute bottom-0 left-0 right-0 h-10 rounded-b-lg bg-linear-to-t from-gray-100 dark:from-black/30 to-transparent pointer-events-none" />
          </div>
        </CardContent>
      </Link>
    </Card>
  );
}
