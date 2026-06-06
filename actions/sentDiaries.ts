"use server";
import { sendSubscriptionEmail } from "@/app/lib/mail";
import { UpdateSuscriptionStatus } from "@/client";
import { db } from "@/db";
import { revalidatePath } from "next/cache";
import { currentUser } from "@/app/lib/auth";

export const notifyDiary = async (dairyId: string, title: string, image: string, description:string, numberNotifications: number) => {
  const user = await currentUser();
  if (!user || user.role !== "ADMIN") return { error: "Unauthorized" };

  const listOfEmail = await db.user.findMany({
    where: { subscribed: true },
    select: { email: true },
  });

  if (listOfEmail.length === 0)
    return { error: "There is no user suscriptions" };

  await Promise.allSettled(
    listOfEmail.map(item => {
      if (item.email) {
        return sendSubscriptionEmail(item.email, dairyId, title, image, description);
      }
      return Promise.resolve();
    })
  );

  await UpdateSuscriptionStatus(dairyId, numberNotifications);
  revalidatePath("/profile");

  return { success: "Notification Emails Sent" };
};
