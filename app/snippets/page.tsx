import SnippetCard from "@/components/snippets/SnippetCard";
import { prisma } from "@/lib/prisma";
import { syncClerkUser } from "@/lib/auth";

export default async function MySnippetsPage() {
  const user = await syncClerkUser();
  if (!user) {
    return;
  }

  const snippets = await prisma.snippet.findMany({
    where: { userId: user.userId },
    // orderBy: { createdAt: "desc" },
  });

  return (
    <div className="max-w-5xl mx-auto py-10 px-4">
      <h1 className="text-2xl font-semibold text-white mb-6">My Snippets</h1>

      {snippets.length === 0 ? (
        <p className="text-gray-400 text-sm">No snippets saved yet.</p>
      ) : (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          {snippets.map((snippet) => (
            <SnippetCard
              key={snippet.id}
              title={snippet.title}
              language={snippet.language}
              code={snippet.code}
            />
          ))}
        </div>
      )}
    </div>
  );
}
