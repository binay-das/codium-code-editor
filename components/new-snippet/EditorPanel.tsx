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
    <div>
      <h2 className="font-medium text-white">Code Editor</h2>
      <p className="text-xs text-gray-500">Write and execute your code</p>
      <Editor
        height={"500px"}
        language={LANGUAGE_CONFIG[language].monacoLanguage}
        onChange={handleEditorChange}
        onMount={(editor) => setEditor(editor)}
        options={{
          automaticLayout: true,
          scrollBeyondLastLine: false,
          padding: { top: 16, bottom: 16 },
          renderWhitespace: "selection",
          fontFamily: '"Fira Code", "Cascadia Code", Consolas, monospace',
          fontLigatures: true,
          cursorBlinking: "smooth",
          smoothScrolling: true,
          contextmenu: true,
          renderLineHighlight: "all",
          lineHeight: 1.6,
          letterSpacing: 0.5,
          roundedSelection: true,
          scrollbar: {
            verticalScrollbarSize: 8,
            horizontalScrollbarSize: 8,
          },
        }}
      />
    </div>
  );
}
