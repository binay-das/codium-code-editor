"use client";

import { useState } from "react";
import { Save } from "lucide-react";
import { useCodeEditorStore } from "@/hooks/useCodeEditor";
import axios from "axios";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

export default function SaveButton() {
  const { isRunning, language, getCode } = useCodeEditorStore();

  const [open, setOpen] = useState(false);
  const [title, setTitle] = useState("");
  const [isSaving, setIsSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSave = async () => {
    const code = getCode();

    if (!title.trim()) {
      setError("Please enter a title for your snippet.");
      return;
    }

    try {
      setIsSaving(true);
      setError(null);

      await axios.post("/api/snippets", { title, language, code });

      toast.success("Snippet saved successfully!");
      setOpen(false);
      setTitle("");
    } catch (error) {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const err = error as any;
      console.error(err);
      const message =
        err?.response?.data?.error ||
        (err?.response?.status === 409
          ? "You already have a snippet with this title."
          : "An error occurred while saving.");

      setError(message);
      toast.error(message);
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button
          disabled={isRunning}
          variant="secondary"
          size="sm"
          className="gap-2 text-white bg-emerald-600 hover:bg-emerald-700 dark:bg-emerald-600 dark:hover:bg-emerald-700"
        >
          <Save className="size-4" />
          <span className="hidden sm:inline">Save</span>
        </Button>
      </DialogTrigger>

      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Save Snippet</DialogTitle>
          <DialogDescription>
            Add a unique title before saving your code.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-3">
          <Input
            placeholder="Enter snippet title..."
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          {error && (
            <p className="text-sm text-red-500 bg-red-500/10 rounded-md px-3 py-2 border border-red-500/20">
              {error}
            </p>
          )}
        </div>

        <DialogFooter>
          <Button
            variant="outline"
            onClick={() => setOpen(false)}
            disabled={isSaving}
          >
            Cancel
          </Button>
          <Button
            onClick={handleSave}
            disabled={isSaving}
            className="bg-emerald-600 hover:bg-emerald-700 text-white"
          >
            {isSaving ? "Saving..." : "Save"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
