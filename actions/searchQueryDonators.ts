"use server";
import { db } from "@/db";
import { currentUser } from "@/app/lib/auth";

export const searchDonators = async (query: string, page: number) => {
  const user = await currentUser();
  if (!user || user.role !== "ADMIN") throw new Error("Unauthorized");

  const ITEMS_PER_PAGE = 10;
  const users = await db.donation.findMany({
    where: {
      OR: [
        { firstName: { startsWith: query, mode: "insensitive" } },
        { secondName: { startsWith: query, mode: "insensitive" } },
        { name: { startsWith: query, mode: "insensitive" } },
        { email: { startsWith: query, mode: "insensitive" } },
      ],
    },
    take: ITEMS_PER_PAGE,
    skip: ITEMS_PER_PAGE * (page - 1),
    orderBy: {
     name: 'desc'
    }
  });
  return users;
};

export const countDonators = async (query: string,) => {
  const user = await currentUser();
  if (!user || user.role !== "ADMIN") throw new Error("Unauthorized");

  const count = await db.donation.count({where: {
    OR: [
      { firstName: { startsWith: query, mode: "insensitive" } },
      { secondName: { startsWith: query, mode: "insensitive" } },
      { name: { startsWith: query, mode: "insensitive" } },
      { email: { startsWith: query, mode: "insensitive" } },
    ],
  }})
  return count

}
