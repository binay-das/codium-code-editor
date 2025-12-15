import { Loader2, Play } from "lucide-react";
import { useCodeEditorStore } from "@/hooks/useCodeEditor";
import { Button } from "@/components/ui/button";

export default function RunButton() {
  const { runCode, isRunning } = useCodeEditorStore();

  const handleRun = async () => {
    if (!isRunning) await runCode();
  };

  return (
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
  );
}
