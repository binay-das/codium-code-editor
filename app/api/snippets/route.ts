import { syncClerkUser } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
    try {
        const user = await syncClerkUser();
        if (!user) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }

        const { language, code, title } = await req.json();

        const existingSnippet = await prisma.snippet.findFirst({
            where: {
                userId: user.userId,
                title,
            },
        });

        if (existingSnippet) {
            return NextResponse.json(
                { error: "You already have a snippet with this title." },
                { status: 409 }
            );
        }

        const newSnippet = await prisma.snippet.create({
            data: {
                userId: user.userId,
                title,
                language,
                code,
                userName: user.name,
            },
        });

        return NextResponse.json(newSnippet, { status: 201 });
    } catch (error) {
        console.error("Error saving snippet:", error);
        return NextResponse.json({ error: "Failed to save snippet" }, { status: 500 });
    }
}
