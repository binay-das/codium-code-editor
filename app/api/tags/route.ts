import { syncClerkUser } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function GET() {
    try {
        const user = await syncClerkUser();
        if (!user) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }

        const tags = await prisma.tag.findMany({
            where: {
                snippets: {
                    some: {
                        userId: user.userId
                    }
                }
            },
            orderBy: {
                name: 'asc'
            }
        });

        return NextResponse.json(tags);
    } catch (error) {
        console.error("Error fetching tags:", error);
        return NextResponse.json({ error: "Failed to fetch tags" }, { status: 500 });
    }
}

export async function POST(req: NextRequest) {
    try {
        const user = await syncClerkUser();
        if (!user) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }

        const { name, color } = await req.json();

        if (!name || typeof name !== 'string') {
            return NextResponse.json({ error: "Tag name is required" }, { status: 400 });
        }

        const existingTag = await prisma.tag.findUnique({
            where: { name: name.toLowerCase().trim() }
        });

        if (existingTag) {
            return NextResponse.json(existingTag);
        }

        const newTag = await prisma.tag.create({
            data: {
                name: name.toLowerCase().trim(),
                color: color || "#6366f1"
            }
        });

        return NextResponse.json(newTag, { status: 201 });
    } catch (error) {
        console.error("Error creating tag:", error);
        return NextResponse.json({ error: "Failed to create tag" }, { status: 500 });
    }
}
