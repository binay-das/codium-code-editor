import { syncClerkUser } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function POST(
    req: NextRequest,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        const { id: snippetId } = await params;
        const user = await syncClerkUser();

        if (!user) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }

        const { isShareable } = await req.json();

        const snippet = await prisma.snippet.findUnique({
            where: { id: snippetId },
        });

        if (!snippet) {
            return NextResponse.json({ error: "Snippet not found" }, { status: 404 });
        }

        if (snippet.userId !== user.userId) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }

        const updatedSnippet = await prisma.snippet.update({
            where: { id: snippetId },
            data: { isShareable },
        });

        return NextResponse.json(updatedSnippet);
    } catch (error) {
        console.error("Error updating sharing status:", error);
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
}
