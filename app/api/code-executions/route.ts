import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { syncClerkUser } from "@/lib/auth";

export async function POST(req: Request) {
    try {
        const user = await syncClerkUser();
        if (!user) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }

        const { language, code, output, error } = await req.json();

        const execution = await prisma.codeExecution.create({
            data: {
                userId: user.userId,
                language,
                code,
                output,
                error,
            },
        });
        return NextResponse.json(execution, { status: 201 });

    } catch (err) {
        console.error("Error saving execution:", err);
        return NextResponse.json({ error: "Failed to save execution" }, { status: 500 });
    }
}