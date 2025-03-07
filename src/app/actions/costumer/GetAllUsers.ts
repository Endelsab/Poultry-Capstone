"use server";

import prisma from "@/lib/prisma";
import { auth } from "@clerk/nextjs/server";

export async function GetAllUser() {
     try {
          const { userId, sessionClaims } = await auth();

          const role = sessionClaims?.metadata?.role || "customer";

          if (!userId || role !== "admin")
               return {
                    success: false,
                    status: 403,
                    message: "Unauthorized access. Admins only.",
               };

          const allUser = await prisma.user.findMany({
               where: {
                    clerkId: {
                         not: userId,
                    },
               },
          });

          return { success: true, allUser };
     } catch (error) {
          console.log("error in GetAllUser", error);
          return { success: false, message: "error in GetAllUser " };
     }
}
