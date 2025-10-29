import { currentUser } from "@clerk/nextjs/server";
import { prisma } from "@/lib/prisma";

export async function syncClerkUser() {
    const user = await currentUser();
    if (!user) {
        return null;

    }

    const existing = await prisma.user.findUnique({
        where: {
            userId: user.id
        }
    });

    if (existing) {
        return existing;
    }

    const newUser = await prisma.user.create({
        data: {
            userId: user.id,
            email: user.emailAddresses[0]?.emailAddress || "",
            name: `${user.firstName ?? ""} ${user.lastName ?? ""}`.trim(),
        },
    });

    return newUser;
}
