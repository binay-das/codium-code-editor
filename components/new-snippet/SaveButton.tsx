"use client";

import { useState, useEffect } from "react";
import { Save, Tag as TagIcon } from "lucide-react";
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
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import TagBadge from "@/components/snippets/TagBadge";

interface Tag {
  id: string;
  name: string;
  color: string;
}

export default function SaveButton() {
  const { isRunning, language, getCode } = useCodeEditorStore();

  const [open, setOpen] = useState(false);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [selectedTags, setSelectedTags] = useState<Tag[]>([]);
  const [allTags, setAllTags] = useState<Tag[]>([]);
  const [isSaving, setIsSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (open) {
      fetchTags();
    }
  }, [open]);

  const fetchTags = async () => {
    try {
      const response = await axios.get('/api/tags');
      setAllTags(response.data);
    } catch (error) {
      console.error('Failed to fetch tags:', error);
    }
  };

  const toggleTag = (tag: Tag) => {
    if (selectedTags.find(t => t.id === tag.id)) {
      setSelectedTags(selectedTags.filter(t => t.id !== tag.id));
    } else {
      setSelectedTags([...selectedTags, tag]);
    }
  };

  const handleSave = async () => {
    const code = getCode();

    if (!title.trim()) {
      setError("Please enter a title for your snippet.");
      return;
    }

    try {
      setIsSaving(true);
      setError(null);

      await axios.post("/api/snippets", {
        title,
        language,
        code,
        description: description.trim() || null,
        tagIds: selectedTags.map(t => t.id)
      });

      toast.success("Snippet saved successfully!");
      setOpen(false);
      setTitle("");
      setDescription("");
      setSelectedTags([]);
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
            Add a title, description, and tags to organize your code.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="title">Title *</Label>
            <Input
              id="title"
              placeholder="Enter snippet title..."
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="description">Description (optional)</Label>
            <textarea
              id="description"
              placeholder="Add a description to help you remember what this code does..."
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows={3}
              className="w-full px-3 py-2 text-sm rounded-md border border-gray-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 focus:outline-none focus:ring-2 focus:ring-gray-400 dark:focus:ring-zinc-600"
            />
          </div>

          <div className="space-y-2">
            <Label>Tags (optional)</Label>
            <div className="flex flex-wrap gap-2 min-h-[40px] p-3 rounded-lg border border-gray-200 dark:border-zinc-800 bg-gray-50 dark:bg-zinc-900/50">
              {allTags.length === 0 ? (
                <p className="text-sm text-gray-500 dark:text-zinc-500">No tags available. Create tags in snippet management.</p>
              ) : (
                allTags.map((tag) => {
                  const isSelected = selectedTags.find(t => t.id === tag.id);
                  return (
                    <button
                      key={tag.id}
                      onClick={() => toggleTag(tag)}
                      className={`transition-all ${isSelected ? 'ring-2 ring-offset-2 ring-offset-white dark:ring-offset-zinc-900' : 'opacity-60 hover:opacity-100'}`}
                      style={{
                        '--tw-ring-color': isSelected ? tag.color : undefined
                      } as React.CSSProperties}
                    >
                      <TagBadge tag={tag} size="sm" />
                    </button>
                  );
                })
              )}
            </div>
          </div>

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
