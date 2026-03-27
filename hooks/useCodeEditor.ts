import { create } from "zustand";
import type * as monaco from "monaco-editor";
import { JUDGE0_LANGUAGE_IDS } from "@/constants";



interface CodeEditorState {
  language: string;
  theme: string;
  fontSize: number;
  stdin: string;
  editor: monaco.editor.IStandaloneCodeEditor | null;
  output: string;
  error: string | null;
  isRunning: boolean;

  setEditor: (editor: monaco.editor.IStandaloneCodeEditor) => void;
  setLanguage: (language: string) => void;
  setTheme: (theme: string) => void;
  setFontSize: (fontSize: number) => void;
  setStdin: (stdin: string) => void;

  runCode: () => Promise<void>;
  runCodeWithStdin: (overrideStdin?: string) => Promise<void>;
  getCode: () => string;
}

const getInitialState = (): Pick<
  CodeEditorState,
  "language" | "theme" | "fontSize"
> => {
  if (typeof window === "undefined") {
    return {
      language: "javascript",
      theme: "vs-dark",
      fontSize: 16,
    };
  }

  return {
    language: localStorage.getItem("editor-language") || "javascript",
    theme: localStorage.getItem("editor-theme") || "vs-dark",
    fontSize: Number(localStorage.getItem("editor-font-size")) || 16
  };
};

export const useCodeEditorStore = create<CodeEditorState>((set, get) => ({
  ...getInitialState(),
  editor: null,
  stdin: "",
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

  setTheme: (theme: string) => {
    localStorage.setItem("editor-theme", theme);
    set({ theme });
  },

  setFontSize: (fontSize: number) => {
    const size = Math.min(Math.max(fontSize, 12), 24);
    localStorage.setItem("editor-font-size", size.toString());
    set({ fontSize: size });
  },

  setStdin: (stdin: string) => set({ stdin }),


  getCode: () => get().editor?.getValue() || "",

  runCode: async () => get().runCodeWithStdin(),

  runCodeWithStdin: async (overrideStdin?: string) => {
    const { language, getCode, stdin } = get();
    const effectiveStdin = overrideStdin !== undefined ? overrideStdin : stdin;
    const code = getCode();

    if (!code) {
      set({ error: "Please enter some code" });
      console.log("code is empty");
      return;
    }

    set({ isRunning: true, error: null, output: "" });

    try {
      const languageId = JUDGE0_LANGUAGE_IDS[language];
      if (!languageId) {
        set({ error: `Language ${language} is not supported by the execution engine.` });
        return;
      }


      // const response = await fetch("https://emkc.org/api/v2/piston/execute", {
      //   method: "POST",
      //   headers: { "Content-Type": "application/json" },
      //   body: JSON.stringify({
      //     language: runtime.language,
      //     version: runtime.version,
      //     files: [{ content: code }],
      //     stdin,
      //   }),
      // });

      const response = await fetch("https://ce.judge0.com/submissions?wait=true", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          language_id: languageId,
          source_code: code,
          stdin: effectiveStdin,
        }),
      });

      const data = await response.json();

      console.log("data back from judge0: ", data);

      if (data.error) {
        set({ error: data.error, isRunning: false });
        return;
      }

      if (data.status?.id === 6) {
        set({ error: data.compile_output || "Compilation Error" });
        return;
      }

      if (data.stderr) {
        set({ error: data.stderr });
        return;
      }

      if (data.status?.id >= 7 && data.status?.id <= 12) {
        set({ error: data.message || "Runtime Error" });
        return;
      }

      if (data.message) {
        set({ error: data.message });
        return;
      }

      // if (data.stdout?.includes("NoSuchElementException")) {
      //   set({ error: "No input provided. Please enter input in stdin." });
      //   return;
      // }

      set({ output: (data.stdout || "").trim() });
    } catch (err) {
      console.error("Error running code:", err);
      set({ error: "Error running code" });
    } finally {
      set({ isRunning: false });
    }
  },
}));
