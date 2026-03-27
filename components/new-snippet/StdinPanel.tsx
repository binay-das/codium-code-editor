"use client";

import { useCodeEditorStore } from "@/hooks/useCodeEditor";
import { ChevronDown, ChevronRight, Terminal } from "lucide-react";
import { useState } from "react";

export default function StdinPanel() {
    const { stdin, setStdin } = useCodeEditorStore();
    const [isOpen, setIsOpen] = useState(false);

    return (
        <div data-stdin-panel className="w-full rounded-xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-[#0d0d12] shadow-sm overflow-hidden transition-colors duration-300">
            <button
                onClick={() => setIsOpen((v) => !v)}
                className="w-full flex items-center gap-2 px-4 py-2 text-left
          bg-gray-50/60 dark:bg-[#111827]/60 backdrop-blur-md
          border-b border-transparent data-open:border-gray-200 dark:data-open:border-gray-800
          hover:bg-gray-100 dark:hover:bg-[#1a2035] transition-colors duration-200"
                aria-expanded={isOpen}
            >
                <div className="flex items-center justify-center w-6 h-6 rounded-md bg-gray-100 dark:bg-[#1e1e2e] ring-1 ring-gray-300 dark:ring-gray-800">
                    <Terminal className="w-3.5 h-3.5 text-blue-600 dark:text-blue-400" />
                </div>
                <span className="text-sm font-medium text-gray-700 dark:text-gray-300 flex-1">
                    Standard Input (stdin)
                </span>
                {stdin.trim() && !isOpen && (
                    <span className="text-[10px] font-medium uppercase tracking-wide px-1.5 py-0.5 rounded bg-blue-100 dark:bg-blue-900/40 text-blue-600 dark:text-blue-400">
                        has input
                    </span>
                )}
                {isOpen ? (
                    <ChevronDown className="w-4 h-4 text-gray-400" />
                ) : (
                    <ChevronRight className="w-4 h-4 text-gray-400" />
                )}
            </button>

            {/* Textarea */}
            {isOpen && (
                <div className="p-3">
                    <textarea
                        value={stdin}
                        onChange={(e) => setStdin(e.target.value)}
                        placeholder={`Enter program input here (one value per line).\nExample for Java Scanner / Python input() / C++ cin:\n  42\n  Hello World`}
                        rows={5}
                        spellCheck={false}
                        className="w-full resize-y rounded-lg px-3 py-2.5 font-mono text-sm
              bg-gray-50 dark:bg-[#0f0f14]
              border border-gray-200 dark:border-[#2a2a3d]
              text-gray-800 dark:text-gray-200
              placeholder:text-gray-400 dark:placeholder:text-gray-600
              focus:outline-none focus:ring-2 focus:ring-blue-500/50
              transition-colors duration-200"
                    />
                    <p className="mt-1.5 text-[11px] text-gray-400 dark:text-gray-600">
                        This input is passed as <code className="font-mono">stdin</code> to
                        your program at runtime.
                    </p>
                </div>
            )}
        </div>
    );
}
