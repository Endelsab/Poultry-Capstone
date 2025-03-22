"use server";

import prisma from "@/lib/prisma";
import { auth } from "@clerk/nextjs/server";

export async function GetOrder(page: number = 1, pageItem: number = 10) {

     try {
          const { userId, sessionClaims } = await auth();

          if (!userId)
               return {
                    success: false,
                    message: "UnAuthenticated",
                    orders: [],
               };

          if (sessionClaims?.metadata?.role !== "admin")
               return { success: false, message: "UnAuthorized", orders: [] };

          const skip = (page - 1) * pageItem;

          const orders = await prisma.order.findMany({
               where: {
                    status: "PENDING",
              },
              
              include: {
                  product: {
                      select: {
                          productName: true,
                          productSize:true
                      }
                  }
              },
               orderBy: {
                    createdAt: "asc",
               },

               skip,
               take: pageItem,
          });

          const totalOrder = await prisma.order.count({
               where: {
                    status: "PENDING",
               },
          });

          const hasMore = skip + pageItem < totalOrder;

          return {
               success: true,
               message:
                    orders.length ?
                         "Orders fetched successfully"
                    :    "There are no pending orders right now.",
               orders,
               hasMore,
         };
         

     } catch (error) {
          console.error("Error in GetOrder action:", error);
          return {
               success: false,
               message: "Cannot get orders right now.",
               orders: [],
          };
     }
}
