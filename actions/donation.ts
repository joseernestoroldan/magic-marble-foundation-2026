"use server";
import { sendAdminDonateEmail, sendDonatorEmail } from "@/app/lib/mail";
import { db } from "@/db";

export const donationCompleted = async (
  email: string,
  totalValue: string,
  firstName: string,
  secondName: string,
  country: string,
  address: string,
  telephone: string
) => {
  const invoice = {
    email,
    totalValue,
    firstName,
    secondName,
    country,
    address,
    telephone,
  };

  await db.donation.create({
    data: {
      email,
      amount: totalValue,
      firstName,
      secondName,
      country,
      address,
      telephone,
    },
  });

  await sendAdminDonateEmail(invoice);
  await sendDonatorEmail(invoice);
};
