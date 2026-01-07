"use client";

import { Plus, Tag as TagIcon, X } from "lucide-react";
import { useState, useEffect } from "react";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import TagBadge from "./TagBadge";
import axios from "axios";
import { toast } from "sonner";

interface Tag {
    id: string;
    name: string;
    color: string;
}

interface TagManagerProps {
    snippetId: string;
    currentTags: Tag[];
    onUpdate: (tags: Tag[]) => void;
    trigger?: React.ReactNode;
}

const TAG_COLORS = [
    "#6366f1", // Indigo
    "#8b5cf6", // Purple
    "#ec4899", // Pink
    "#f59e0b", // Amber
    "#10b981", // Emerald
    "#3b82f6", // Blue
    "#ef4444", // Red
    "#06b6d4", // Cyan
    "#84cc16", // Lime
    "#f97316", // Orange
];

export default function TagManager({ snippetId, currentTags, onUpdate, trigger }: TagManagerProps) {
    const [open, setOpen] = useState(false);
    const [allTags, setAllTags] = useState<Tag[]>([]);
    const [selectedTags, setSelectedTags] = useState<Tag[]>(currentTags);
    const [newTagName, setNewTagName] = useState("");
    const [selectedColor, setSelectedColor] = useState(TAG_COLORS[0]);
    const [isLoading, setIsLoading] = useState(false);

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
            toast.error('Failed to load tags');
        }
    };

    const handleCreateTag = async () => {
        if (!newTagName.trim()) {
            toast.error('Please enter a tag name');
            return;
        }

        try {
            const response = await axios.post('/api/tags', {
                name: newTagName.trim(),
                color: selectedColor
            });

            const newTag = response.data;
            setAllTags([...allTags, newTag]);
            setSelectedTags([...selectedTags, newTag]);
            setNewTagName("");
            setSelectedColor(TAG_COLORS[0]);
            toast.success('Tag created!');
        } catch (error) {
            console.error('Failed to create tag:', error);
            toast.error('Failed to create tag');
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
        setIsLoading(true);
        try {
            const response = await axios.put(`/api/snippets/${snippetId}/tags`, {
                tagIds: selectedTags.map(t => t.id)
            });

            onUpdate(response.data.tags);
            toast.success('Tags updated!');
            setOpen(false);
        } catch (error) {
            console.error('Failed to update tags:', error);
            toast.error('Failed to update tags');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                {trigger || (
                    <Button variant="outline" size="sm" className="gap-2">
                        <TagIcon className="h-4 w-4" />
                        Manage Tags
                    </Button>
                )}
            </DialogTrigger>
            <DialogContent className="sm:max-w-md">
                <DialogHeader>
                    <DialogTitle>Manage Tags</DialogTitle>
                    <DialogDescription>
                        Add or remove tags to organize your snippet.
                    </DialogDescription>
                </DialogHeader>

                <div className="space-y-6 py-4">
                    {/* Current Tags */}
                    <div className="space-y-2">
                        <Label className="text-sm font-medium">Selected Tags</Label>
                        <div className="flex flex-wrap gap-2 min-h-[40px] p-3 rounded-lg border border-gray-200 dark:border-zinc-800 bg-gray-50 dark:bg-zinc-900/50">
                            {selectedTags.length === 0 ? (
                                <p className="text-sm text-gray-500 dark:text-zinc-500">No tags selected</p>
                            ) : (
                                selectedTags.map((tag) => (
                                    <TagBadge
                                        key={tag.id}
                                        tag={tag}
                                        size="md"
                                        removable
                                        onRemove={() => toggleTag(tag)}
                                    />
                                ))
                            )}
                        </div>
                    </div>

                    <div className="space-y-2">
                        <Label className="text-sm font-medium">Available Tags</Label>
                        <div className="flex flex-wrap gap-2 max-h-32 overflow-y-auto p-3 rounded-lg border border-gray-200 dark:border-zinc-800">
                            {allTags.filter(tag => !selectedTags.find(t => t.id === tag.id)).length === 0 ? (
                                <p className="text-sm text-gray-500 dark:text-zinc-500">All tags are selected</p>
                            ) : (
                                allTags
                                    .filter(tag => !selectedTags.find(t => t.id === tag.id))
                                    .map((tag) => (
                                        <button key={tag.id} onClick={() => toggleTag(tag)}>
                                            <TagBadge tag={tag} size="md" onClick={() => toggleTag(tag)} />
                                        </button>
                                    ))
                            )}
                        </div>
                    </div>

                    <div className="space-y-3 p-4 rounded-lg border border-gray-200 dark:border-zinc-800 bg-gray-50 dark:bg-zinc-900/30">
                        <Label className="text-sm font-medium">Create New Tag</Label>
                        <div className="space-y-3">
                            <Input
                                placeholder="Tag name"
                                value={newTagName}
                                onChange={(e) => setNewTagName(e.target.value)}
                                onKeyDown={(e) => {
                                    if (e.key === 'Enter') {
                                        e.preventDefault();
                                        handleCreateTag();
                                    }
                                }}
                            />
                            <div className="space-y-2">
                                <Label className="text-xs text-gray-600 dark:text-zinc-400">Color</Label>
                                <div className="flex flex-wrap gap-2">
                                    {TAG_COLORS.map((color) => (
                                        <button
                                            key={color}
                                            onClick={() => setSelectedColor(color)}
                                            className={`w-8 h-8 rounded-full transition-all ${selectedColor === color ? 'ring-2 ring-offset-2 ring-offset-white dark:ring-offset-zinc-900' : ''
                                                }`}
                                            style={{
                                                backgroundColor: color,
                                                ...(selectedColor === color && { '--tw-ring-color': color } as React.CSSProperties)
                                            }}
                                        />
                                    ))}
                                </div>
                            </div>
                            <Button
                                onClick={handleCreateTag}
                                variant="secondary"
                                size="sm"
                                className="w-full gap-2"
                            >
                                <Plus className="h-4 w-4" />
                                Create Tag
                            </Button>
                        </div>
                    </div>
                </div>

                <DialogFooter className="gap-2">
                    <Button variant="outline" onClick={() => setOpen(false)}>
                        Cancel
                    </Button>
                    <Button onClick={handleSave} disabled={isLoading}>
                        {isLoading ? 'Saving...' : 'Save Changes'}
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}
