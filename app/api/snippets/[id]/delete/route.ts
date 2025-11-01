import { prisma } from "@/lib/prisma";
import { syncClerkUser } from "@/lib/auth";
import { NextResponse } from "next/server";

export async function DELETE(
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
                id, userId: user.userId
            }
        });

        if (!snippet) {
            return NextResponse.json({ error: "Snippet not found" }, { status: 404 });
        }

        await prisma.snippet.delete({
            where: { id }
        });

        return NextResponse.json({ success: true });
    } catch (err) {
        console.error("Error deleting snippet:", err);
        return NextResponse.json({ error: "Failed to delete snippet" }, { status: 500 });
    }
}
