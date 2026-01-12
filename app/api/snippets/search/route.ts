import { syncClerkUser } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
    try {
        const user = await syncClerkUser();
        if (!user) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }

        const { searchParams } = new URL(req.url);
        const query = searchParams.get('q') || '';
        const language = searchParams.get('language');
        const tags = searchParams.get('tags')?.split(',').filter(Boolean);
        const starred = searchParams.get('starred');
        const sort = searchParams.get('sort') || 'date-desc';

        // build where clause
        const where: any = {
            userId: user.userId,
        };

        if (query) {
            where.OR = [
                { title: { contains: query, mode: 'insensitive' } },
                { description: { contains: query, mode: 'insensitive' } },
                { code: { contains: query, mode: 'insensitive' } },
            ];
        }

        if (language) {
            where.language = language;
        }

        if (starred === 'true') {
            where.isStarred = true;
        }

        if (tags && tags.length > 0) {
            where.tags = {
                some: {
                    id: {
                        in: tags
                    }
                }
            };
        }

        let orderBy: any = {};
        switch (sort) {
            case 'date-asc':
                orderBy = { createdAt: 'asc' };
                break;
            case 'date-desc':
                orderBy = { createdAt: 'desc' };
                break;
            case 'title-asc':
                orderBy = { title: 'asc' };
                break;
            case 'title-desc':
                orderBy = { title: 'desc' };
                break;
            default:
                orderBy = { createdAt: 'desc' };
        }

        const snippets = await prisma.snippet.findMany({
            where,
            orderBy,
            include: {
                tags: true
            }
        });

        return NextResponse.json(snippets);
    } catch (error) {
        console.error("Error searching snippets:", error);
        return NextResponse.json({ error: "Failed to search snippets" }, { status: 500 });
    }
}
