"use client";

import { Loader2, Play } from "lucide-react";
import { useCodeEditorStore } from "@/hooks/useCodeEditor";
import { motion } from "framer-motion";

export default function RunButton() {
  const { runCode, isRunning } = useCodeEditorStore();

  const handleRun = async () => {
    if (!isRunning) await runCode();
  };

  return (
    <motion.button
      onClick={handleRun}
      disabled={isRunning}
      whileHover={{ scale: !isRunning ? 1.03 : 1 }}
      whileTap={{ scale: 0.97 }}
      className={`relative inline-flex items-center gap-2 rounded-lg px-4 py-2.5 text-sm font-medium transition-all
        ${
          isRunning
            ? "bg-neutral-200 dark:bg-neutral-800 text-neutral-500 cursor-not-allowed"
            : "bg-blue-600 hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600 text-white shadow-md hover:shadow-lg"
        }`}
    >
      {isRunning ? (
        <>
          <Loader2 className="w-4 h-4 animate-spin text-white/80" />
          Running...
        </>
      ) : (
        <>
          <Play className="w-4 h-4 text-white/90" />
          Run Code
        </>
      )}
    </motion.button>
  );
}
