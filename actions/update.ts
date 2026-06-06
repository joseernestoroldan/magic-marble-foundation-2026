"use server";
import { db } from "@/db";
import { updateSchema } from "@/schemas";
import * as z from "zod";
import { currentUser } from "@/app/lib/auth";

export const update = async (
  values: z.infer<typeof updateSchema>,
  id: string
) => {
  const user = await currentUser();
  if (!user || (user.id !== id && user.role !== "ADMIN")) return { error: "Unauthorized" };
  const validateFields = updateSchema.safeParse(values);
  if (!validateFields.success) {
    return { error: "Invalid Fields!" };
  }
  const { country, codeNumber, number, address, subscribed } =
    validateFields.data;

  await db.user.update({
    where: { id: id },
    data: { country, codeNumber, number, address, subscribed },
  });
  return { success: "the data has been updated" };
};
