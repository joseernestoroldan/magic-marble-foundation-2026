"use server"
import { db } from "@/db"
import { currentUser } from "@/app/lib/auth";

export const DeleteAccount = async (id: string) => {
    const user = await currentUser();
    if (!user || user.role !== "ADMIN") return { error: "Unauthorized" };
    console.log("server id:", id)
    try {
        await db.user.delete({where:{id}})
        return {success: "account deleted"}
        
    } catch (err) {
        console.log(err)
        return {error: "Something went wrong"}
        
    }
}