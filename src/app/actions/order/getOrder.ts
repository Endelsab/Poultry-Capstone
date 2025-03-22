"use server";

import prisma from "@/lib/prisma";
import { auth } from "@clerk/nextjs/server";
import { OrderStatus } from "@prisma/client";

export async function GetOrder(
     page: number = 1,
     pageItem: number = 10,
     searchQueryStatus: string
) {
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

          console.log("status here:", searchQueryStatus);

          const prismaStatus =
               searchQueryStatus ?
                    (searchQueryStatus.toUpperCase() as OrderStatus)
               :    "PENDING";

          const orders = await prisma.order.findMany({
               where: {
                    status: prismaStatus,
               },
               include: {
                    product: {
                         select: {
                              productName: true,
                              productSize: true,
                         },
                    },
               },
               orderBy: {
                    createdAt: "asc",
               },
               skip,
               take: pageItem,
          });

          const totalOrder = await prisma.order.count({
               where: {
                    status: prismaStatus,
               },
          });

          const hasMore = skip + pageItem < totalOrder;

          return {
               success: true,
               message: "Orders fetched successfully",

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
