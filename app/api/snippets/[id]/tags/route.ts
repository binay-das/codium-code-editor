import { syncClerkUser } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function PUT(
    req: NextRequest,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        const user = await syncClerkUser();
        if (!user) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }

        const { id } = await params;
        const { tagIds } = await req.json();

        if (!Array.isArray(tagIds)) {
            return NextResponse.json({ error: "tagIds must be an array" }, { status: 400 });
        }

        const snippet = await prisma.snippet.findUnique({
            where: { id }
        });

        if (!snippet) {
            return NextResponse.json({ error: "Snippet not found" }, { status: 404 });
        }

        if (snippet.userId !== user.userId) {
            return NextResponse.json({ error: "Forbidden" }, { status: 403 });
        }

        const updatedSnippet = await prisma.snippet.update({
            where: { id },
            data: {
                tags: {
                    set: tagIds.map(tagId => ({ id: tagId }))
                }
            },
            include: {
                tags: true
            }
        });

        return NextResponse.json(updatedSnippet);
    } catch (error) {
        console.error("Error updating snippet tags:", error);
        return NextResponse.json({ error: "Failed to update tags" }, { status: 500 });
    }
}
