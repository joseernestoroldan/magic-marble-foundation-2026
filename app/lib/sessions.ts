import { auth } from "@/auth";
import { db } from "@/db";

   export const getNameSession = async (userId: string) => {
    let name: string | null;
    try {
        const data = await db.user.findFirst({ where: { id: userId } });
        if (data && data.firstName) {
          name = data.firstName;
          return name;
        }
        return null;
  
    } catch (error) {
      return null
    }
  };

  export const getSessionId = async () => {
    const session = await auth();
    if (!session || !session.user || !session.user.id ) return null;
    return session.user.id;
  };