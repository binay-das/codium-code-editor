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

  
}));
