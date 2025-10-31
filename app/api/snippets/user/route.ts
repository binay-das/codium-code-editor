import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { syncClerkUser } from "@/lib/auth";

export async function GET(req: NextRequest) {
  try {
    const user = await syncClerkUser();
    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const snippets = await prisma.snippet.findMany({
      where: { userId: user.userId },
    //   orderBy: { createdAt: "desc" },
    });

    return NextResponse.json(snippets, { status: 200 });
  } catch (error) {
    console.error("Error fetching snippets:", error);
    return NextResponse.json({ error: "Failed to fetch snippets" }, { status: 500 });
  }
}
