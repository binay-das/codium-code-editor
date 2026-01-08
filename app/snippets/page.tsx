import SnippetsClient from "@/components/snippets/SnippetsClient";
import { prisma } from "@/lib/prisma";
import { syncClerkUser } from "@/lib/auth";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import Header from "@/components/new-snippet/Header";

export default async function MySnippetsPage() {
  const user = await syncClerkUser();

  if (!user) {
    return (
      <div className="relative flex min-h-screen items-center justify-center bg-white dark:bg-black text-gray-900 dark:text-white overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-gray-100 dark:from-zinc-900/50 via-white dark:via-black to-white dark:to-black opacity-40 pointer-events-none" />
        <div className="absolute inset-x-0 top-0 h-[500px] bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px] pointer-events-none" />

        <div className="relative z-10 flex flex-col items-center justify-center max-w-md px-6 text-center">
          <h2 className="text-3xl font-bold tracking-tight text-gray-900 dark:text-transparent dark:bg-gradient-to-b dark:from-white dark:to-zinc-500 dark:bg-clip-text mb-4">
            Please sign in to view your snippets
          </h2>
          <p className="text-gray-600 dark:text-zinc-400 mb-8 text-lg">
            You need to log in to access your saved code snippets.
          </p>
          <Button asChild className="h-11 px-8 rounded-md bg-gray-900 dark:bg-white text-white dark:text-black font-medium hover:bg-gray-800 dark:hover:bg-zinc-200 transition-colors">
            <Link href="/sign-in">Sign In</Link>
          </Button>
        </div>
      </div>
    );
  }

  const snippets = await prisma.snippet.findMany({
    where: {
      userId: user.userId
    },
    include: {
      tags: true
    },
    orderBy: {
      createdAt: 'desc'
    }
  });

  return (
    <div className="min-h-screen bg-white dark:bg-black text-gray-900 dark:text-white overflow-hidden">
      <Header
        showLanguageSelector={false}
        showSnippetsLink={false}
        showEditorControls={false}
      />

      <div className="fixed inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-gray-100 dark:from-zinc-900/50 via-white dark:via-black to-white dark:to-black opacity-40 pointer-events-none" />
      <div className="fixed inset-x-0 top-0 h-[500px] bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px] pointer-events-none" />

      <div className="relative z-10">
        <SnippetsClient initialSnippets={snippets.map(s => ({
          ...s,
          createdAt: s.createdAt.toISOString()
        }))} />
      </div>
    </div>
  );
}
