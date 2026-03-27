"use client";

import { useState } from "react";
import { Loader2, Play } from "lucide-react";
import { useCodeEditorStore } from "@/hooks/useCodeEditor";
import { Button } from "@/components/ui/button";
import StdinWarningModal from "./StdinWarningModal";

const PREF_KEY = "stdin-warning-preference";

export default function RunButton() {
  const { runCodeWithStdin, isRunning, stdin, language, getCode } =
    useCodeEditorStore();
  const [modalOpen, setModalOpen] = useState(false);

  const handleRun = () => {
    if (isRunning) return;


    if (localStorage.getItem(PREF_KEY) === "always-continue") {
      runCodeWithStdin("0");
      return;
    }

    if (stdin.trim() === "") {
      setModalOpen(true);
    } else {
      runCodeWithStdin();
    }
  };

  const handleAddInput = () => {
    setModalOpen(false);


    document
      .querySelector("[data-stdin-panel]")
      ?.scrollIntoView({ behavior: "smooth", block: "center" });
  };

  const handleContinue = (remember: boolean) => {
    if (remember) {
      localStorage.setItem(PREF_KEY, "always-continue");
    }
    setModalOpen(false);
    runCodeWithStdin("0");
  };

  return (
    <>
      <Button
        onClick={handleRun}
        disabled={isRunning}
        variant="secondary"
        size="sm"
        className="gap-2 text-white bg-blue-600 hover:bg-blue-700 dark:bg-blue-600 dark:hover:bg-blue-700"
      >
        {isRunning ? (
          <>
            <Loader2 className="size-4 animate-spin" />
            <span className="hidden sm:inline">Running...</span>
          </>
        ) : (
          <>
            <Play className="size-4" />
            <span className="hidden sm:inline">Run</span>
          </>
        )}
      </Button>

      <StdinWarningModal
        open={modalOpen}
        language={language}
        codeSnippet={getCode()}
        fallbackStdin="0"
        onAddInput={handleAddInput}
        onContinue={handleContinue}
        onOpenChange={setModalOpen}
      />
    </>
  );
}
