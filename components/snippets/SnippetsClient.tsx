"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import SnippetCard from "@/components/snippets/SnippetCard";
import SearchBar from "@/components/snippets/SearchBar";
import FilterPanel, { SortOption } from "@/components/snippets/FilterPanel";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { FileCode2, Loader2, PlusCircle } from "lucide-react";

interface Tag {
    id: string;
    name: string;
    color: string;
}

interface Snippet {
    id: string;
    title: string;
    language: string;
    code: string;
    description: string | null;
    isStarred: boolean;
    createdAt: string;
    tags: Tag[];
}

interface SnippetsClientProps {
    initialSnippets: Snippet[];
}

export default function SnippetsClient({ initialSnippets }: SnippetsClientProps) {
    const [snippets, setSnippets] = useState<Snippet[]>(initialSnippets);
    const [searchQuery, setSearchQuery] = useState("");
    const [selectedLanguage, setSelectedLanguage] = useState<string | null>(null);
    const [selectedTags, setSelectedTags] = useState<string[]>([]);
    const [showStarred, setShowStarred] = useState(false);
    const [sortBy, setSortBy] = useState<SortOption>("date-desc");
    const [allTags, setAllTags] = useState<Tag[]>([]);
    const [isLoading, setIsLoading] = useState(false);

    const languages = Array.from(new Set(initialSnippets.map(s => s.language)));

    useEffect(() => {
        const fetchTags = async () => {
            try {
                const response = await axios.get('/api/tags');
                setAllTags(response.data);
            } catch (error) {
                console.error('Failed to fetch tags:', error);
            }
        };
        fetchTags();
    }, []);

    useEffect(() => {
        const fetchSnippets = async () => {
            setIsLoading(true);
            try {
                const params = new URLSearchParams();
                if (searchQuery) params.append('q', searchQuery);
                if (selectedLanguage) params.append('language', selectedLanguage);
                if (selectedTags.length > 0) params.append('tags', selectedTags.join(','));
                if (showStarred) params.append('starred', 'true');
                params.append('sort', sortBy);

                const response = await axios.get(`/api/snippets/search?${params.toString()}`);
                setSnippets(response.data);
            } catch (error) {
                console.error('Failed to fetch snippets:', error);
            } finally {
                setIsLoading(false);
            }
        };

        const timer = setTimeout(fetchSnippets, 100);
        return () => clearTimeout(timer);
    }, [searchQuery, selectedLanguage, selectedTags, showStarred, sortBy]);

    const handleClearFilters = () => {
        setSearchQuery("");
        setSelectedLanguage(null);
        setSelectedTags([]);
        setShowStarred(false);
        setSortBy("date-desc");
    };

    return (
        <div className="max-w-7xl mx-auto py-20 px-6 sm:px-8">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-8 gap-6">
                <div>
                    <h1 className="text-4xl font-bold tracking-tight text-gray-900 dark:text-transparent dark:bg-gradient-to-b dark:from-white dark:to-zinc-500 dark:bg-clip-text sm:text-5xl mb-3">
                        My Snippets
                    </h1>
                    <p className="text-lg text-gray-600 dark:text-zinc-400">
                        Manage and revisit your saved code snippets.
                    </p>
                </div>
                <Button
                    asChild
                    className="h-11 px-8 rounded-md bg-gray-900 dark:bg-white text-white dark:text-black font-medium hover:bg-gray-800 dark:hover:bg-zinc-200 transition-transform active:scale-95"
                >
                    <Link href="/snippets/new">
                        <PlusCircle className="w-4 h-4 mr-2" /> New Snippet
                    </Link>
                </Button>
            </div>

            <div className="mb-6">
                <SearchBar
                    value={searchQuery}
                    onChange={setSearchQuery}
                    placeholder="Search by title, description, or code..."
                />
            </div>

            <div className="flex flex-col lg:flex-row gap-6">
                <aside className="lg:sticky lg:top-6 lg:self-start">
                    <FilterPanel
                        languages={languages}
                        tags={allTags}
                        selectedLanguage={selectedLanguage}
                        selectedTags={selectedTags}
                        showStarred={showStarred}
                        sortBy={sortBy}
                        onLanguageChange={setSelectedLanguage}
                        onTagsChange={setSelectedTags}
                        onStarredChange={setShowStarred}
                        onSortChange={setSortBy}
                        onClearFilters={handleClearFilters}
                    />
                </aside>

                <div className="flex-1">
                    {isLoading ? (
                        <div className="grid gap-8 sm:grid-cols-1 lg:grid-cols-2 animate-pulse">
                            {[...Array(4)].map((_, i) => (
                                <div
                                    key={i}
                                    className="rounded-xl border border-gray-200 dark:border-zinc-800 bg-white dark:bg-zinc-900/30 p-5 space-y-4"
                                >
                                    <div className="flex items-center gap-3">
                                        <div className="h-8 w-8 rounded-lg bg-gray-200 dark:bg-zinc-800" />
                                        <div className="space-y-1.5 flex-1">
                                            <div className="h-4 w-2/3 rounded bg-gray-200 dark:bg-zinc-800" />
                                            <div className="h-3 w-1/3 rounded bg-gray-100 dark:bg-zinc-700" />
                                        </div>
                                    </div>
                                    <div className="rounded-lg bg-gray-100 dark:bg-zinc-800/50 h-28" />
                                </div>
                            ))}
                        </div>
                    ) : snippets.length === 0 ? (
                        <div className="flex flex-col items-center justify-center rounded-2xl border border-gray-200 dark:border-zinc-800 bg-gray-50 dark:bg-zinc-900/50 py-20 text-center">
                            <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-gray-100 dark:bg-zinc-800 mb-5">
                                {searchQuery || selectedLanguage || selectedTags.length > 0 || showStarred
                                    ? <Loader2 className="h-7 w-7 text-gray-400 dark:text-zinc-500" />
                                    : <FileCode2 className="h-7 w-7 text-gray-400 dark:text-zinc-500" />}
                            </div>
                            <p className="text-gray-600 dark:text-zinc-400 text-lg mb-6">
                                {searchQuery || selectedLanguage || selectedTags.length > 0 || showStarred
                                    ? "No snippets match your filters."
                                    : "You haven't saved any snippets yet."}
                            </p>
                            {!(searchQuery || selectedLanguage || selectedTags.length > 0 || showStarred) && (
                                <Button asChild className="h-11 px-8 rounded-md bg-gray-900 dark:bg-white text-white dark:text-black font-medium hover:bg-gray-800 dark:hover:bg-zinc-200 transition-colors">
                                    <Link href="/snippets/new">Create your first snippet</Link>
                                </Button>
                            )}
                        </div>
                    ) : (
                        <div className="grid gap-8 sm:grid-cols-1 lg:grid-cols-2">
                            {snippets.map((snippet) => (
                                <SnippetCard
                                    key={snippet.id}
                                    id={snippet.id}
                                    title={snippet.title}
                                    language={snippet.language}
                                    code={snippet.code}
                                    description={snippet.description}
                                    isStarred={snippet.isStarred}
                                    tags={snippet.tags}
                                    createdAt={snippet.createdAt}
                                />
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
