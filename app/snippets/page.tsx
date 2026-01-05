import SnippetCard from "@/components/snippets/SnippetCard";
import { prisma } from "@/lib/prisma";
import { syncClerkUser } from "@/lib/auth";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { PlusCircle } from "lucide-react";
import Header from "@/components/new-snippet/Header";

export default async function MySnippetsPage() {
  const user = await syncClerkUser();

  if (!user) {
    return (
      <div className="relative flex min-h-screen items-center justify-center bg-black text-white overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-zinc-900/50 via-black to-black opacity-40 pointer-events-none" />
        <div className="absolute inset-x-0 top-0 h-[500px] bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px] pointer-events-none" />

        <div className="relative z-10 flex flex-col items-center justify-center max-w-md px-6 text-center">
          <h2 className="text-3xl font-bold tracking-tight bg-gradient-to-b from-white to-zinc-500 bg-clip-text text-transparent mb-4">
            Please sign in to view your snippets
          </h2>
          <p className="text-zinc-400 mb-8 text-lg">
            You need to log in to access your saved code snippets.
          </p>
          <Button asChild className="h-11 px-8 rounded-md bg-white text-black font-medium hover:bg-zinc-200 transition-colors">
            <Link href="/sign-in">Sign In</Link>
          </Button>
        </div>
      </div>
    );
  }

  const snippets = await prisma.snippet.findMany({
    where: {
      userId: user.userId
    }
  });

  return (
    <div className="min-h-screen bg-black text-white overflow-hidden">
      <Header
        showLanguageSelector={false}
        showSnippetsLink={false}
        showEditorControls={false}
      />

      <div className="fixed inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-zinc-900/50 via-black to-black opacity-40 pointer-events-none" />
      <div className="fixed inset-x-0 top-0 h-[500px] bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px] pointer-events-none" />

      <div className="relative z-10 max-w-7xl mx-auto py-20 px-6 sm:px-8">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-12 gap-6">
          <div>
            <h1 className="text-4xl font-bold tracking-tight bg-gradient-to-b from-white to-zinc-500 bg-clip-text text-transparent sm:text-5xl mb-3">
              My Snippets
            </h1>
            <p className="text-lg text-zinc-400">
              Manage and revisit your saved code snippets.
            </p>
          </div>
          <Button
            asChild
            className="h-11 px-8 rounded-md bg-white text-black font-medium hover:bg-zinc-200 transition-transform active:scale-95"
          >
            <Link href="/snippets/new">
              <PlusCircle className="w-4 h-4 mr-2" /> New Snippet
            </Link>
          </Button>
        </div>

        {snippets.length === 0 ? (
          <div className="flex flex-col items-center justify-center rounded-2xl border border-zinc-800 bg-zinc-900/50 py-20 text-center">
            <p className="text-zinc-400 text-lg mb-6">
              You haven’t saved any snippets yet.
            </p>
            <Button asChild className="h-11 px-8 rounded-md bg-white text-black font-medium hover:bg-zinc-200 transition-colors">
              <Link href="/snippets/new">Create your first snippet</Link>
            </Button>
          </div>
        ) : (
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {snippets.map((snippet) => (
              <SnippetCard
                id={snippet.id}
                key={snippet.id}
                title={snippet.title}
                language={snippet.language}
                code={snippet.code}
                isStarred={snippet.isStarred ?? false}
                createdAt={snippet.createdAt?.toISOString()}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
