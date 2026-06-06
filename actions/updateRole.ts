"use server";
import { db } from "@/db";
import { currentUser } from "@/app/lib/auth";
import { UserRole } from "@prisma/client";

export const updateRole = async (id: string, role: UserRole) => {
    const user = await currentUser();
    if (!user || user.role !== "ADMIN") return { error: "Unauthorized" };

    await db.user.update({where:{id}, data:{role}})
    return {success: "updated role"}
}
