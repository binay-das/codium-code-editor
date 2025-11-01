import SnippetCard from "@/components/snippets/SnippetCard";
import { prisma } from "@/lib/prisma";
import { syncClerkUser } from "@/lib/auth";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { PlusCircle } from "lucide-react";

export default async function MySnippetsPage() {
  const user = await syncClerkUser();
  if (!user) {
    return (
      <div className="flex flex-col items-center justify-center h-[80vh] text-center">
        <h2 className="text-2xl font-semibold text-foreground mb-3">
          Please sign in to view your snippets
        </h2>
        <p className="text-muted-foreground mb-6">
          You need to log in to access your saved code snippets.
        </p>
        <Button asChild>
          <Link href="/sign-in">Sign In</Link>
        </Button>
      </div>
    );
  }

  const snippets = await prisma.snippet.findMany({
    where: { userId: user.userId }
  });

  return (
    <div className="max-w-6xl mx-auto py-10 px-5">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-foreground">
            My Snippets
          </h1>
          <p className="text-sm text-muted-foreground mt-1">
            Manage and revisit your saved code snippets.
          </p>
        </div>
        <Button
          asChild
          className="mt-4 sm:mt-0 bg-primary text-primary-foreground hover:bg-primary/90"
        >
          <Link href="/snippets/new">
            <PlusCircle className="w-4 h-4 mr-2" /> New Snippet
          </Link>
        </Button>
      </div>

      {snippets.length === 0 ? (
        <div className="flex flex-col items-center justify-center h-[60vh] text-center">
          <p className="text-muted-foreground text-sm mb-4">
            You haven’t saved any snippets yet.
          </p>
          <Button asChild variant="outline">
            <Link href="/snippets/new">Create your first snippet</Link>
          </Button>
        </div>
      ) : (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {snippets.map((snippet) => (
            <SnippetCard
              id={snippet.id}
              key={snippet.id}
              title={snippet.title}
              language={snippet.language}
              code={snippet.code}
              isStarred={snippet.isStarred ?? false}
              createdAt={
                (snippet as any).createdAt
                  ? (snippet as any).createdAt.toISOString()
                  : undefined
              }
            />
          ))}
        </div>
      )}
    </div>
  );
}
