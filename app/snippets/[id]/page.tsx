import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";
import Header from "@/components/new-snippet/Header";
import EditorPanel from "@/components/new-snippet/EditorPanel";
import OutputPanel from "@/components/new-snippet/OutputPanel";
import StdinPanel from "@/components/new-snippet/StdinPanel";
import { currentUser } from "@clerk/nextjs/server";

export default async function SnippetDetailPage({
    params,
}: {
    params: Promise<{ id: string }>;
}) {
    const { id } = await params;
    const user = await currentUser();

    if (!id) {
        notFound();
    }

    const snippet = await prisma.snippet.findUnique({
        where: {
            id
        },
    });

    if (!snippet) {
        notFound();
    }

    const isOwner = user?.id === snippet.userId;

    if (!isOwner && !snippet.isShareable) { 
        
        notFound();
    }

    return (
        <div className="min-h-screen bg-gray-50 dark:bg-[#0b0b0f] text-gray-900 dark:text-gray-100 transition-colors duration-300">
            <Header snippetId={snippet.id} isShareable={snippet.isShareable} canShare={isOwner} />

            <main className="max-w-7xl mx-auto px-4 py-6">
                <div className="grid lg:grid-cols-2 gap-6">
                    <div className="flex flex-col gap-4 rounded-xl border border-gray-200 dark:border-zinc-800 bg-white dark:bg-zinc-900/50 dark:backdrop-blur-sm p-4 transition-colors">
                        <EditorPanel
                            initialCode={snippet.code}
                            initialLanguage={snippet.language}
                            readOnly={!isOwner}
                        />
                        <StdinPanel />
                    </div>

                    <div className="rounded-xl border border-gray-200 dark:border-zinc-800 bg-white dark:bg-zinc-900/50 dark:backdrop-blur-sm p-4 transition-colors">
                        <OutputPanel />
                    </div>
                </div>
            </main>
        </div>
    );
}
