"use server";

import prisma from "@/lib/prisma";
import { auth } from "@clerk/nextjs/server";

export async function GetUsers(
     page: number = 1,
     pageItem: number = 10,
     searchQuery: string = ""
) {
     try {
          const { userId, sessionClaims } = await auth();

          const role = sessionClaims?.metadata?.role || "customer";

          if (!userId || role !== "admin")
               return {
                    success: false,
                    status: 403,
                    message: "Unauthorized access. Admins only.",
               };

          const skip = (page - 1) * pageItem;

          const allCustomers = await prisma.user.findMany({
               where: {
                    username: {
                         contains: searchQuery,
                         mode: "insensitive",
                    },
                    isBlocked: false,
                    role: { not: "admin" },
               },
               orderBy: {
                    username: "asc",
               },
               skip,
               take: pageItem,
          });

          const totalCustomers = await prisma.user.count({
               where: {
                    username: {
                         contains: searchQuery,
                         mode: "insensitive",
                    },
                    role: { not: "admin" },
               },
          });

          const hasMore = skip + pageItem < totalCustomers;

          return { success: true, allCustomers, hasMore };
     } catch (error) {
          console.log("error in GetAllUser", error);
          return { success: false, message: "error in GetAllUser " };
     }
}
