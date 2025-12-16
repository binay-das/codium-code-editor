"use client";

import { Copy, Globe, Lock, Share2, X } from "lucide-react";
import { useState } from "react";
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
import { Switch } from "@/components/ui/switch";
import axios from "axios";
import { toast } from "sonner";

interface ShareSnippetDialogProps {
    snippetId: string;
    initialIsShareable: boolean;
}

export default function ShareSnippetDialog({ snippetId, initialIsShareable }: ShareSnippetDialogProps) {
    const [open, setOpen] = useState(false);
    const [isShareable, setIsShareable] = useState(initialIsShareable);
    const [isLoading, setIsLoading] = useState(false);

    const handleShare = async (checked: boolean) => {
        setIsLoading(true);
        try {
            await axios.post(`/api/snippets/${snippetId}/share`, {
                isShareable: checked,
            });
            setIsShareable(checked);
            toast.success(checked ? "Snippet is now public!" : "Snippet is now private!");
        } catch (error) {
            console.error(error);
            toast.error("Something went wrong. Please try again.");
        } finally {
            setIsLoading(false);
        }
    };

    const copyToClipboard = () => {
        const url = `${window.location.origin}/snippets/${snippetId}`;
        navigator.clipboard.writeText(url);
        toast.success("Link copied to clipboard!");
    };

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <Button size="sm" variant="secondary" className="gap-2">
                    <Share2 className="size-4" />
                    <span className="hidden sm:inline">Share</span>
                </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-md">
                <DialogHeader>
                    <DialogTitle>Share Snippet</DialogTitle>
                    <DialogDescription>
                        Make your snippet public to share it with others.
                    </DialogDescription>
                </DialogHeader>

                <div className="space-y-6 py-4">
                    <div className="flex items-center justify-between rounded-lg border border-gray-200 dark:border-zinc-800 p-4">
                        <div className="space-y-1">
                            <div className="flex items-center gap-2">
                                {isShareable ? <Globe className="size-4 text-emerald-500" /> : <Lock className="size-4 text-gray-500" />}
                                <span className="text-sm font-medium">{isShareable ? "Public" : "Private"}</span>
                            </div>
                            <p className="text-xs text-muted-foreground">
                                {isShareable ? "Anyone with the link can view this snippet." : "Only you can view this snippet."}
                            </p>
                        </div>
                        <Switch checked={isShareable} onCheckedChange={handleShare} disabled={isLoading} />
                    </div>

                    {isShareable && (
                        <div className="space-y-2">
                            <Label>Snippet Link</Label>
                            <div className="flex items-center gap-2">
                                <Input readOnly value={`${typeof window !== 'undefined' ? window.location.origin : ''}/snippets/${snippetId}`} className="flex-1" />
                                <Button size="icon" variant="outline" onClick={copyToClipboard}>
                                    <Copy className="size-4" />
                                </Button>
                            </div>
                        </div>
                    )}
                </div>

                <DialogFooter>
                    <Button variant="outline" onClick={() => setOpen(false)}>Close</Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}
