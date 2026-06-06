"use server";
import { db } from "@/db";
import { currentUser } from "@/app/lib/auth";

export const unsubscribe = async (email: string) => {
  const user = await currentUser();
  if (!user || (user.email !== email && user.role !== "ADMIN")) return { error: "Unauthorized" };

  const dbUser = await db.user.findFirst({ where: { email } });
  if(!dbUser) return {error: "The email does not exist"}

  await db.user.update({where:{email}, data:{subscribed: false}})
  return {success: "Email unsubscribed"}
};

export const subscribeAgain = async (email: string) => {
    const user = await currentUser();
    if (!user || (user.email !== email && user.role !== "ADMIN")) return { error: "Unauthorized" };

    const dbUser = await db.user.findFirst({ where: { email } });
    if(!dbUser) return {error: "The email does not exist"}

    await db.user.update({where:{email}, data:{subscribed: true}})
    return {success: "Email Subscribed Again"}

}

