"use server";
import { db } from "@/db";

export const searchUser = async (query: string, page: number) => {
  const ITEMS_PER_PAGE = 10;
  const users = await db.user.findMany({
    where: {
      OR: [
        { firstName: { startsWith: query, mode: "insensitive" } },
        { secondName: { startsWith: query, mode: "insensitive" } },
        { name: { startsWith: query, mode: "insensitive" } },
        { email: { startsWith: query, mode: "insensitive" } },
      ],
    },
    select: {
      id: true,
      name: true,
      firstName: true,
      secondName: true,
      email: true,
      country: true,
      codeNumber: true,
      number: true,
      subscribed: true,
      address: true,
      emailVerified: true,
      role: true,
    },
    take: ITEMS_PER_PAGE,
    skip: ITEMS_PER_PAGE * (page - 1),
    orderBy: {
     name: 'desc'
    }
  });
  return users;
};

export const countUsers = async (query: string,) => {
  const count = await db.user.count({where: {
    OR: [
      { firstName: { startsWith: query, mode: "insensitive" } },
      { secondName: { startsWith: query, mode: "insensitive" } },
      { name: { startsWith: query, mode: "insensitive" } },
      { email: { startsWith: query, mode: "insensitive" } },
    ],
  }})
  return count

}
