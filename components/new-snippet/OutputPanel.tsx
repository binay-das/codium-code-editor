"use client";

import { useCodeEditorStore } from "@/hooks/useCodeEditor";
import {
  AlertTriangle,
  CheckCircle,
  Clock,
  Copy,
  Terminal,
  Loader2,
} from "lucide-react";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function OutputPanel() {
  const { output, isRunning, error } = useCodeEditorStore();
  const [isCopied, setIsCopied] = useState(false);

  const hasContent = !!(error || output);

  const handleCopy = async () => {
    if (!hasContent) return;

    await navigator.clipboard.writeText(error || output);
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 2000);
  };

  return (
    <div className="w-full">
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2">
          <div className="flex items-center justify-center w-7 h-7 rounded-md bg-gray-100 dark:bg-[#1e1e2e] ring-1 ring-gray-300 dark:ring-gray-800">
            <Terminal className="w-4 h-4 text-blue-600 dark:text-blue-400" />
          </div>
          <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
            Output
          </span>
        </div>

        {hasContent && (
          <button
            onClick={handleCopy}
            className="flex items-center gap-1.5 px-2.5 py-1.5 text-xs font-medium text-gray-700 dark:text-gray-300 
            bg-gray-100 dark:bg-[#1e1e2e] hover:bg-gray-200 dark:hover:bg-gray-800
            rounded-md border border-gray-300 dark:border-gray-700 transition-all duration-200"
          >
            {isCopied ? (
              <>
                <CheckCircle className="w-3.5 h-3.5 text-emerald-500" />
                Copied!
              </>
            ) : (
              <>
                <Copy className="w-3.5 h-3.5" />
                Copy
              </>
            )}
          </button>
        )}
      </div>

      <div
        className="relative bg-gray-50 dark:bg-[#0f0f14] border border-gray-200 dark:border-[#2a2a3d] 
        rounded-xl shadow-inner p-4 h-[550px] overflow-auto font-mono text-sm transition-colors duration-300"
      >
        <AnimatePresence mode="wait">
          {isRunning ? (
            <motion.div
              key="running"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="h-full flex flex-col items-center justify-center text-gray-500"
            >
              <Loader2 className="w-6 h-6 mb-2 animate-spin text-blue-500" />
              <p>Running your code...</p>
            </motion.div>
          ) : error ? (
            <motion.div
              key="error"
              initial={{ opacity: 0, y: 5 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -5 }}
              className="space-y-2 text-red-500"
            >
              <div className="flex items-center gap-2 mb-2">
                <AlertTriangle className="w-5 h-5" />
                <span className="font-medium">Execution Error</span>
              </div>
              <pre className="whitespace-pre-wrap text-red-400/90">{error}</pre>
            </motion.div>
          ) : output ? (
            <motion.div
              key="output"
              initial={{ opacity: 0, y: 5 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -5 }}
              className="space-y-3 text-gray-800 dark:text-gray-200"
            >
              <div className="flex items-center gap-2 text-emerald-500 font-medium">
                <CheckCircle className="w-5 h-5" />
                Execution Successful
              </div>
              <pre className="whitespace-pre-wrap text-gray-700 dark:text-gray-300">
                {output}
              </pre>
            </motion.div>
          ) : (
            <motion.div
              key="empty"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="h-full flex flex-col items-center justify-center text-gray-500 dark:text-gray-400"
            >
              <div className="flex items-center justify-center w-12 h-12 rounded-xl bg-gray-100 dark:bg-gray-800 ring-1 ring-gray-300 dark:ring-gray-700 mb-4">
                <Clock className="w-6 h-6" />
              </div>
              <p className="text-center text-sm">Run your code to see output here</p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
