"use client";

import { useState, useMemo } from "react";
import { AlertTriangle, Terminal, Info } from "lucide-react";
import { INPUT_KEYWORDS, LANGUAGE_CONFIG } from "@/constants";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogDescription,
    DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";



export interface StdinWarningModalProps {
    open: boolean;
    language: string;
    codeSnippet?: string;
    fallbackStdin?: string;
    onAddInput: () => void;
    onContinue: (rememberChoice: boolean) => void;
    onOpenChange: (open: boolean) => void;
}

// Returns keywords from INPUT_KEYWORDS that appear in the given code.
function detectInputKeywords(language: string, code = ""): string[] {
    const keywords = INPUT_KEYWORDS[language] ?? [];
    return keywords.filter((kw) => code.includes(kw));
}

/** Human‑readable language label, falls back to the raw id. */
function languageLabel(language: string): string {
    return LANGUAGE_CONFIG[language]?.label ?? language;
}

/** Per‑language hint about which construct reads input. */
const LANGUAGE_HINTS: Record<string, string> = {
    java: "Java programs using Scanner or BufferedReader block on input.",
    python: "Python programs calling input() will stall without stdin.",
    cpp: "C++ programs using cin will wait for stdin indefinitely.",
    csharp: "C# programs using Console.ReadLine will hang without input.",
    ruby: "Ruby programs calling gets will block on stdin.",
    go: "Go programs using fmt.Scan or bufio.Reader expect stdin.",
    rust: "Rust programs reading from stdin will block without input.",
    swift: "Swift programs using readLine() expect stdin.",
    javascript: "Node.js programs using readline expect stdin.",
    typescript: "Node.js programs using readline expect stdin.",
};

export default function StdinWarningModal({
    open,
    language,
    codeSnippet = "",
    fallbackStdin = "0",
    onAddInput,
    onContinue,
    onOpenChange,
}: StdinWarningModalProps) {
    const [remember, setRemember] = useState(false);

    const detectedKeywords = useMemo(
        () => detectInputKeywords(language, codeSnippet),
        [language, codeSnippet]
    );

    const langLabel = languageLabel(language);
    const hint = LANGUAGE_HINTS[language];
    const hasKeywords = detectedKeywords.length > 0;

    const handleAddInput = () => {
        onAddInput();
    };

    const handleContinue = () => {
        onContinue(remember);
    };

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent
                showCloseButton
                className="max-w-md border border-amber-200 dark:border-amber-800/60 bg-white dark:bg-[#0d0d12]"
            >
                {/* ── Header ── */}
                <DialogHeader>
                    <div className="flex items-center gap-3 mb-1">
                        <div className="flex items-center justify-center w-10 h-10 rounded-full bg-amber-100 dark:bg-amber-900/40 shrink-0">
                            <AlertTriangle className="w-5 h-5 text-amber-600 dark:text-amber-400" />
                        </div>
                        <DialogTitle className="text-base font-semibold text-gray-900 dark:text-gray-100">
                            No Standard Input Provided
                        </DialogTitle>
                    </div>
                    <DialogDescription asChild>
                        <div className="text-sm text-gray-600 dark:text-gray-400 space-y-3 pt-1">
                            {/* Keyword detection banner */}
                            {hasKeywords && (
                                <div className="flex items-start gap-2 rounded-lg bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800/50 px-3 py-2.5">
                                    <Info className="w-4 h-4 text-amber-600 dark:text-amber-400 mt-0.5 shrink-0" />
                                    <span>
                                        We detected{" "}
                                        <span className="font-semibold text-amber-700 dark:text-amber-300">
                                            {detectedKeywords.map((kw, i) => (
                                                <span key={kw}>
                                                    <code className="font-mono">{kw}</code>
                                                    {i < detectedKeywords.length - 1 ? ", " : ""}
                                                </span>
                                            ))}
                                        </span>{" "}
                                        in your {langLabel} code — this program likely reads from
                                        stdin.
                                    </span>
                                </div>
                            )}

                            <p>
                                Your <span className="font-medium text-gray-800 dark:text-gray-200">{langLabel}</span> program
                                was run without any stdin.{" "}
                                {hint ?? "Programs that read input will fail or stall without it."}
                            </p>

                            {/* Stdin indicator */}
                            <div className="flex items-center gap-2 text-xs rounded-md bg-gray-50 dark:bg-[#111827] border border-gray-200 dark:border-gray-800 px-3 py-2">
                                <Terminal className="w-3.5 h-3.5 text-gray-400" />
                                <span className="text-gray-500">stdin</span>
                                <span className="font-mono text-gray-400 italic">(empty)</span>
                            </div>

                            <p>
                                You can provide input and re-run, or continue with a default
                                fallback of{" "}
                                <code className="font-mono px-1 py-0.5 rounded bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300">
                                    {fallbackStdin}
                                </code>
                                .
                            </p>
                        </div>
                    </DialogDescription>
                </DialogHeader>

                {/* ── Remember preference ── */}
                <label className="flex items-center gap-2 cursor-pointer select-none group">
                    <div className="relative">
                        <input
                            type="checkbox"
                            checked={remember}
                            onChange={(e) => setRemember(e.target.checked)}
                            className="peer sr-only"
                        />
                        {/* Custom checkbox */}
                        <div className="w-4 h-4 rounded border border-gray-300 dark:border-gray-600 bg-white dark:bg-[#1e1e2e] peer-checked:bg-blue-600 peer-checked:border-blue-600 transition-colors" />
                        {remember && (
                            <svg
                                className="absolute inset-0 w-4 h-4 text-white pointer-events-none"
                                viewBox="0 0 16 16"
                                fill="none"
                            >
                                <path
                                    d="M3.5 8.5l3 3 6-6"
                                    stroke="currentColor"
                                    strokeWidth="1.5"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                />
                            </svg>
                        )}
                    </div>
                    <span className="text-xs text-gray-500 dark:text-gray-400 group-hover:text-gray-700 dark:group-hover:text-gray-200 transition-colors">
                        Always continue with default for this session
                    </span>
                </label>

                {/* ── Actions ── */}
                <DialogFooter className="gap-2 mt-1">
                    <Button
                        variant="outline"
                        size="sm"
                        onClick={handleAddInput}
                        className="flex-1 sm:flex-none border-gray-300 dark:border-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800"
                    >
                        Add Input
                    </Button>
                    <Button
                        size="sm"
                        onClick={handleContinue}
                        className="flex-1 sm:flex-none bg-blue-600 hover:bg-blue-700 text-white"
                    >
                        Continue with Default
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}
