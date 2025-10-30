import { create } from "zustand";
import type * as monaco from "monaco-editor";
import { LANGUAGE_CONFIG } from "@/constants";

interface CodeEditorState {
  language: string;
  editor: monaco.editor.IStandaloneCodeEditor | null;
  output: string;
  error: string | null;
  isRunning: boolean;
  setEditor: (editor: monaco.editor.IStandaloneCodeEditor) => void;
  setLanguage: (language: string) => void;
  runCode: () => Promise<void>;
  getCode: () => string;
}

export const useCodeEditorStore = create<CodeEditorState>((set, get) => ({
  language: typeof window !== "undefined" ? localStorage.getItem("editor-language") || "javascript" : "javascript",
  editor: null,
  output: "",
  error: null,
  isRunning: false,

  setEditor: (editor) => {
    const savedCode = localStorage.getItem(`editor-code-${get().language}`);
    if (savedCode) editor.setValue(savedCode);
    set({ editor });
  },

  setLanguage: (language: string) => {
    const currentCode = get().editor?.getValue();
    if (currentCode) localStorage.setItem(`editor-code-${get().language}`, currentCode);
    localStorage.setItem("editor-language", language);
    set({ language, output: "", error: null });
  },



  getCode: () => get().editor?.getValue() || "",

  runCode: async () => {
    const { language, getCode } = get();
    const code = getCode();

    if (!code) {
      set({ error: "Please enter some code" });
      return;
    }

    set({ isRunning: true, error: null, output: "" });

    try {
      const runtime = LANGUAGE_CONFIG[language].pistonRuntime;
      const response = await fetch("https://emkc.org/api/v2/piston/execute", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          language: runtime.language,
          version: runtime.version,
          files: [{ content: code }],
        }),
      });

      const data = await response.json();

      if (data.run?.code !== 0) {
        set({ error: data.run.stderr || data.run.output });
        return;
      }

      set({ output: data.run.output.trim() });
    } catch (err) {
      set({ error: "Error running code" });
    } finally {
      set({ isRunning: false });
    }
  },
}));
