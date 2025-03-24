"use server";

import prisma from "@/lib/prisma";
import { auth } from "@clerk/nextjs/server";

export async function GetSale() {
     try {
          const { userId, sessionClaims } = await auth();

          if (!userId)
               return {
                    success: false,
                    message: "UnAuthenticated",
                    totalSale: [],
               };

          if (sessionClaims?.metadata?.role !== "admin")
               return {
                    success: false,
                    message: "UnAuthorized",
                    totalSale: [],
               };

          const now = new Date();
          const lastWeek = new Date();
          lastWeek.setDate(now.getDate() - 7);

          const totalSale = await prisma.order.findMany({
               where: {
                    status: "HISTORY",
                    createdAt: {
                         gte: lastWeek,
                         lte: now,
                    },
               },
               select: {
                    createdAt: true,
                    totalPrice: true,
               },
               orderBy: {
                    createdAt: "asc",
               },
          });

          return {
               success: true,
               message: "Total sales for the last week",
               totalSale,
          };
     } catch (error) {
          console.error("Error in sale action:", error);
          return {
               success: false,
               message: "Cannot get sales right now.",
               totalSale: [],
          };
     }
}
