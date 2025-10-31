"use client";

import Link from "next/link";
import { Blocks, Code2 } from "lucide-react";
import { SignedIn, SignedOut, SignInButton, UserButton } from "@clerk/nextjs";
import { ModeToggle } from "@/components/ModeToggle";
import RunButton from "@/components/new-snippet/RunButton";
import SaveButton from "@/components/new-snippet/SaveButton";

export default function Header() {
  return (
    <header className="sticky top-0 z-50 bg-white/80 dark:bg-[#0b0b0f]/80 backdrop-blur-md border-b border-gray-200 dark:border-gray-800 shadow-sm transition-colors">
      <div className="max-w-7xl mx-auto flex items-center justify-between px-4 py-2">
        <Link href="/" className="flex items-center gap-2 group">
          <div className="relative flex items-center justify-center w-9 h-9 rounded-lg bg-gray-100 dark:bg-gray-800 ring-1 ring-gray-300 dark:ring-gray-700 transition-colors">
            <Blocks className="w-4.5 h-4.5 text-blue-600 dark:text-blue-400 transition-colors" />
          </div>
          <div className="leading-tight">
            <h1 className="font-semibold text-gray-800 dark:text-gray-100 tracking-tight">
              Codium
            </h1>
            <p className="text-[10px] text-gray-500 dark:text-gray-400 -mt-0.5">
              Web Code Editor
            </p>
          </div>
        </Link>

        <nav className="hidden sm:flex items-center justify-center absolute left-1/2 -translate-x-1/2">
          <Link
            href="/snippets"
            className="flex items-center gap-2 px-3 py-1.5 rounded-md text-sm font-medium text-gray-700 dark:text-gray-300
            hover:bg-gray-100 dark:hover:bg-gray-800 hover:text-blue-600 dark:hover:text-blue-400 transition-all"
          >
            <Code2 className="w-4 h-4" />
            Snippets
          </Link>
        </nav>

        <div className="flex items-center gap-1.5">
          <RunButton />
          <SaveButton />
          <ModeToggle />

          <SignedIn>
            <UserButton afterSignOutUrl="/" />
          </SignedIn>
          <SignedOut>
            <SignInButton mode="modal">
              <button className="text-sm px-3 py-1.5 rounded-md bg-blue-600 hover:bg-blue-700 text-white transition-colors">
                Sign in
              </button>
            </SignInButton>
          </SignedOut>
        </div>
      </div>
    </header>
  );
}
