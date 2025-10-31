"use client";

import { LANGUAGE_CONFIG } from "@/constants";
import { useCodeEditorStore } from "@/hooks/useCodeEditor";
import { Editor } from "@monaco-editor/react";
import { useEffect } from "react";

export default function EditorPanel() {
  const { language, editor, setEditor } = useCodeEditorStore();

  useEffect(() => {
    const newCode =
      localStorage.getItem(`editor-code-${language}`) ||
      LANGUAGE_CONFIG[language].defaultCode;

    if (editor) {
      editor.setValue(newCode);
    }
  }, [language, editor]);

  const handleEditorChange = (value: string | undefined) => {
    if (value) {
      localStorage.setItem(`editor-code-${language}`, value);
    }
  };

  return (
    <div className="w-full h-full flex flex-col bg-white dark:bg-[#0d0d12] border border-gray-200 dark:border-gray-800 rounded-xl shadow-sm overflow-hidden transition-colors duration-300">
      <div className="flex items-center justify-between px-4 py-2 border-b border-gray-200 dark:border-gray-800 bg-gray-50/60 dark:bg-[#111827]/60 backdrop-blur-md">
        <div>
          <h2 className="text-sm font-semibold text-gray-900 dark:text-gray-100 tracking-tight">
            Code Editor
          </h2>
          <p className="text-[11px] text-gray-500 dark:text-gray-400">
            Write and execute your code
          </p>
        </div>
        <span className="text-[11px] font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wide">
          {language}
        </span>
      </div>

      <div className="flex-1 min-h-[60vh]">
        <Editor
          height="100%"
          language={LANGUAGE_CONFIG[language].monacoLanguage}
          onChange={handleEditorChange}
          onMount={(editor) => setEditor(editor)}
          theme="vs-dark"
          options={{
            automaticLayout: true,
            scrollBeyondLastLine: false,
            padding: { top: 18, bottom: 18 },
            renderWhitespace: "selection",
            fontFamily: '"Fira Code", "Cascadia Code", Consolas, monospace',
            fontLigatures: true,
            cursorBlinking: "smooth",
            smoothScrolling: true,
            contextmenu: true,
            renderLineHighlight: "all",
            lineHeight: 1.7,
            letterSpacing: 0.5,
            roundedSelection: true,
            minimap: { enabled: false },
            scrollbar: {
              verticalScrollbarSize: 8,
              horizontalScrollbarSize: 8,
            },
          }}
        />
      </div>
    </div>
  );
}
