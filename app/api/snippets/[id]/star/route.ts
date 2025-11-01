import { prisma } from "@/lib/prisma";
import { syncClerkUser } from "@/lib/auth";
import { NextResponse } from "next/server";

export async function PUT(
    req: Request,
    context: { params: Promise<{ id: string }> }
) {
    try {
        const user = await syncClerkUser();
        if (!user) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }

        const { id } = await context.params;

        const snippet = await prisma.snippet.findUnique({
            where: {
                id,
                userId: user.userId
            }
        });

        if (!snippet) {
            return NextResponse.json({ error: "Snippet not found" }, { status: 404 });
        }

        const updated = await prisma.snippet.update({
            where: { id },
            data: {
                isStarred: !snippet.isStarred
            }
        });

        return NextResponse.json(updated);
    } catch (err) {
        console.error("Error toggling star:", err);
        return NextResponse.json({ error: "Failed to toggle star" }, { status: 500 });
    }
}
