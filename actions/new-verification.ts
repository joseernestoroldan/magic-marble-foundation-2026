"use server";
import { getUserByEmail } from "@/data/user";
import { getVerificationTokenByToken } from "@/data/verificationToken";
import { db } from "@/db";

export const NewVerification = async (token: string) => {
  const existingToken = await getVerificationTokenByToken(token);
  if (!existingToken) {
    return { error: "Token does not exist!" };
  }
  const hasExpired = new Date(existingToken.expires) < new Date();
  if (hasExpired) {
    return { expired: "Token has expired" };
  }

  const existingUser = await getUserByEmail(existingToken.email);
  if (!existingUser) {
    return { error: "User does not exist" };
  }

  await Promise.all([
    db.user.update({
      where: { id: existingUser.id },
      data: {
        emailVerified: new Date(),
        email: existingToken.email,
      },
    }),
    db.verificationToken.delete({
      where: { id: existingToken.id },
    }),
  ]);

  return { success: "Congrats your account has been verified"}
};
