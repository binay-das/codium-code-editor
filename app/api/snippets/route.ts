import { syncClerkUser } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
    try {
        const user = await syncClerkUser();
        if (!user) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }

        const { language, code, userName } = await req.json();
        const newSnippet = await prisma.snippet.create({
            data: {
                userId: user.userId,
                title: "title",
                language,
                code,
                userName: user.name
            }
        });

        return NextResponse.json(newSnippet, { status: 201 });
    } catch (error) {
        console.error("Error saving snippet:", error);
        return NextResponse.json({ error: "Failed to save snippet" }, { status: 500 });
    }

}