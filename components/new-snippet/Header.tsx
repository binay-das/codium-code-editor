"use client";

import Link from "next/link";
import { Blocks, Code2, Settings2 } from "lucide-react";
import { SignedIn, SignedOut, SignInButton, UserButton } from "@clerk/nextjs";
import { ModeToggle } from "@/components/ModeToggle";
import RunButton from "@/components/new-snippet/RunButton";
import SaveButton from "@/components/new-snippet/SaveButton";
import EditorThemeSelector from "./EditorThemeSelector";
import { FontSizeSelector } from "./FontSizeSelector";
import { LanguageSelector } from "./LanguageSelector";
import { useCodeEditorStore } from "@/hooks/useCodeEditor";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import ShareSnippetDialog from "./ShareSnippetDialog";

interface HeaderProps {
  snippetId?: string;
  isShareable?: boolean;
  canShare?: boolean;
}

export default function Header({ snippetId, isShareable, canShare = true }: HeaderProps) {
  const { language, setLanguage } = useCodeEditorStore();

  return (
    <header className="sticky top-0 z-50 p-0 border-b border-gray-200 dark:border-zinc-800 bg-white/80 dark:bg-[#0a0a0f]/80 backdrop-blur-md transition-all">
      <div className="flex h-16 items-center justify-between px-4 max-w-7xl mx-auto gap-4">
        <div className="flex items-center gap-4">
          <Link href="/" className="flex items-center gap-2 group">
            <div className="relative flex items-center justify-center w-8 h-8 rounded-lg bg-gray-100 dark:bg-gray-800 ring-1 ring-gray-200 dark:ring-gray-700 transition-all group-hover:ring-blue-500/50">
              <Blocks className="size-4 text-blue-600 dark:text-blue-400 group-hover:scale-110 transition-transform" />
            </div>
            <div className="leading-tight">
              <h1 className="font-bold text-sm text-gray-800 dark:text-gray-100 tracking-tight">
                Codium
              </h1>
              <p className="text-[10px] text-gray-500 dark:text-gray-400">
                Web Code Editor
              </p>
            </div>
          </Link>

          <div className="h-6 w-px bg-gray-200 dark:bg-zinc-800" />

          <div className="flex-1 max-w-xs flex justify-center">
            <LanguageSelector selectedLanguage={language} onChange={setLanguage} />
          </div>
        </div>
        <Link
          href="/snippets"
          className="flex items-center gap-2 text-sm font-medium text-gray-600 dark:text-zinc-400 hover:text-gray-900 dark:hover:text-white transition-colors"
        >
          <Code2 className="size-4" />
          <span className="hidden sm:inline">Snippets</span>
        </Link>

        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2">
            <RunButton />
            {snippetId && canShare && <ShareSnippetDialog snippetId={snippetId} initialIsShareable={!!isShareable} />}
            {canShare && <SaveButton />}
          </div>

          <div className="h-6 w-px bg-gray-200 dark:bg-zinc-800 mx-1" />

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                className="text-gray-500 dark:text-zinc-400 hover:text-gray-900 dark:hover:text-white"
              >
                <Settings2 className="size-4" />
              </Button>
            </DropdownMenuTrigger>

            <DropdownMenuContent
              align="end"
              sideOffset={8}
              className="w-64 rounded-lg p-3 bg-white dark:bg-zinc-900 border border-gray-200 dark:border-zinc-800 shadow-lg"
            >
              <div className="space-y-4">
                <div className="space-y-2">
                  <p className="text-[11px] font-semibold uppercase tracking-wide text-gray-500 dark:text-zinc-500">
                    Appearance
                  </p>
                  <ModeToggle />
                </div>

                <div className="h-px bg-gray-100 dark:bg-zinc-800" />

                <div className="space-y-2">
                  <p className="text-[11px] font-semibold uppercase tracking-wide text-gray-500 dark:text-zinc-500">
                    Editor
                  </p>
                  <EditorThemeSelector />
                  <FontSizeSelector />
                </div>
              </div>
            </DropdownMenuContent>
          </DropdownMenu>


          <div className="h-6 w-px bg-gray-200 dark:bg-zinc-800 mx-1" />

          <div className="flex items-center gap-2">

            <SignedIn>
              <UserButton afterSignOutUrl="/" />
            </SignedIn>
            <SignedOut>
              <SignInButton mode="modal">
                <button className="text-sm font-medium px-4 py-2 rounded-md bg-blue-600 hover:bg-blue-700 text-white transition-colors shadow-sm">
                  Sign in
                </button>
              </SignInButton>
            </SignedOut>
          </div>
        </div>
      </div>
    </header>
  );
}
