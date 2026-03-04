"use client";

import { ArrowDownAZ, ArrowUpAZ, Calendar, Star, SlidersHorizontal, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import TagBadge from "./TagBadge";

interface Tag {
    id: string;
    name: string;
    color: string;
}

export type SortOption = 'date-desc' | 'date-asc' | 'title-asc' | 'title-desc';

interface FilterPanelProps {
    languages: string[];
    tags: Tag[];
    selectedLanguage: string | null;
    selectedTags: string[];
    showStarred: boolean;
    sortBy: SortOption;
    onLanguageChange: (lang: string | null) => void;
    onTagsChange: (tags: string[]) => void;
    onStarredChange: (starred: boolean) => void;
    onSortChange: (sort: SortOption) => void;
    onClearFilters: () => void;
}

export default function FilterPanel({
    languages,
    tags,
    selectedLanguage,
    selectedTags,
    showStarred,
    sortBy,
    onLanguageChange,
    onTagsChange,
    onStarredChange,
    onSortChange,
    onClearFilters,
}: FilterPanelProps) {
    const toggleTag = (tagId: string) => {
        if (selectedTags.includes(tagId)) {
            onTagsChange(selectedTags.filter(id => id !== tagId));
        } else {
            onTagsChange([...selectedTags, tagId]);
        }
    };

    const hasActiveFilters = selectedLanguage || selectedTags.length > 0 || showStarred;

    return (
        <div className="w-full lg:w-64 space-y-6 p-4 rounded-xl border border-gray-200 dark:border-zinc-800 bg-white dark:bg-zinc-900/50">
            <div className="flex items-center gap-2">
                <SlidersHorizontal className="h-4 w-4 text-gray-500 dark:text-zinc-400" />
                <h3 className="font-semibold text-gray-900 dark:text-white">Filters</h3>
                {hasActiveFilters && (
                    <span className="ml-auto flex h-4 w-4 items-center justify-center rounded-full bg-blue-500 text-[10px] font-bold text-white">
                        ●
                    </span>
                )}
            </div>
            {hasActiveFilters && (
                <Button
                    variant="ghost"
                    size="sm"
                    onClick={onClearFilters}
                    className="h-7 text-xs text-gray-500 hover:text-gray-900 dark:text-zinc-400 dark:hover:text-white"
                >
                    <X className="h-3 w-3 mr-1" />Clear
                </Button>
            )}

            <Separator className="bg-gray-200 dark:bg-zinc-800" />

            <div className="space-y-2">
                <Label className="text-sm font-medium text-gray-700 dark:text-zinc-300">Sort By</Label>
                <Select value={sortBy} onValueChange={(value) => onSortChange(value as SortOption)}>
                    <SelectTrigger className="w-full">
                        <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="date-desc">
                            <div className="flex items-center gap-2">
                                <Calendar className="h-4 w-4" />
                                Newest First
                            </div>
                        </SelectItem>
                        <SelectItem value="date-asc">
                            <div className="flex items-center gap-2">
                                <Calendar className="h-4 w-4" />
                                Oldest First
                            </div>
                        </SelectItem>
                        <SelectItem value="title-asc">
                            <div className="flex items-center gap-2">
                                <ArrowDownAZ className="h-4 w-4" />
                                A → Z
                            </div>
                        </SelectItem>
                        <SelectItem value="title-desc">
                            <div className="flex items-center gap-2">
                                <ArrowUpAZ className="h-4 w-4" />
                                Z → A
                            </div>
                        </SelectItem>
                    </SelectContent>
                </Select>
            </div>

            <Separator className="bg-gray-200 dark:bg-zinc-800" />

            <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                    <Star className={`h-4 w-4 ${showStarred ? 'fill-yellow-400 text-yellow-400' : 'text-gray-500 dark:text-zinc-400'}`} />
                    <Label className="text-sm font-medium text-gray-700 dark:text-zinc-300">Starred Only</Label>
                </div>
                <Switch checked={showStarred} onCheckedChange={onStarredChange} />
            </div>

            <Separator className="bg-gray-200 dark:bg-zinc-800" />

            <div className="space-y-2">
                <Label className="text-sm font-medium text-gray-700 dark:text-zinc-300">Language</Label>
                <div className="space-y-1">
                    {languages.length === 0 ? (
                        <p className="text-xs text-gray-500 dark:text-zinc-500">No languages yet</p>
                    ) : (
                        <>
                            <Button
                                variant={selectedLanguage === null ? "secondary" : "ghost"}
                                size="sm"
                                onClick={() => onLanguageChange(null)}
                                className="w-full justify-start text-sm"
                            >
                                All Languages
                            </Button>
                            {languages.map((lang) => (
                                <Button
                                    key={lang}
                                    variant={selectedLanguage === lang ? "secondary" : "ghost"}
                                    size="sm"
                                    onClick={() => onLanguageChange(lang)}
                                    className="w-full justify-start text-sm capitalize gap-2"
                                >
                                    {selectedLanguage === lang && (
                                        <span className="h-1.5 w-1.5 rounded-full bg-blue-500 shrink-0" />
                                    )}
                                    {lang}
                                </Button>
                            ))}
                        </>
                    )}
                </div>
            </div>

            <Separator className="bg-gray-200 dark:bg-zinc-800" />

            <div className="space-y-2">
                <Label className="text-sm font-medium text-gray-700 dark:text-zinc-300">Tags</Label>
                <div className="flex flex-wrap gap-2">
                    {tags.length === 0 ? (
                        <p className="text-xs text-gray-500 dark:text-zinc-500">No tags yet</p>
                    ) : (
                        tags.map((tag) => {
                            const isSelected = selectedTags.includes(tag.id);
                            return (
                                <button
                                    key={tag.id}
                                    onClick={() => toggleTag(tag.id)}
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
        </div>
    );
}
