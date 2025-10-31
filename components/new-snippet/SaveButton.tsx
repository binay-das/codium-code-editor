"use client";

import { Save } from "lucide-react";
import { useCodeEditorStore } from "@/hooks/useCodeEditor";
import axios from "axios";

export default function SaveButton() {
  const { isRunning, language, getCode } = useCodeEditorStore();

  const saveCode = async () => {
    const code = getCode(); // ✅ actually get the string content
    console.log("language", language);
    console.log("code", code);

    try {
      const res = await axios.post("/api/snippets", {
        language,
        code, // ✅ send actual code text
      });

      console.log("Snippet saved:", res.data);
    } catch (err) {
      console.error("Error saving code", err);
    }
  };

  return (
    <button
      onClick={saveCode}
      disabled={isRunning}
      className="inline-flex items-center gap-2 p-2 rounded-xl border border-white/20 text-white hover:bg-white/10 transition disabled:opacity-50 disabled:cursor-not-allowed"
    >
      <Save className="w-4 h-4 text-white/90" />
      <span className="text-sm">Save Code</span>
    </button>
  );
}
