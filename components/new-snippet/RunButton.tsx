"use client";

import { Loader2, Play } from "lucide-react";
import { useCodeEditorStore } from "@/hooks/useCodeEditor";

export default function RunButton() {
  const { runCode, isRunning } = useCodeEditorStore();

  const handleRun = async () => {
    await runCode();
  };

  return (
    <button
      onClick={handleRun}
      disabled={isRunning}
      className="inline-flex items-center gap-2 p-2 rounded-xl border
        disabled:opacity-50 disabled:cursor-not-allowed"
    >
      <Play className="w-4 h-4 text-white/90" />
      <span className="text-sm">Run Code</span>
    </button>
  );
}
