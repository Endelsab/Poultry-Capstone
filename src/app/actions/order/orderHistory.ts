"use server";

import prisma from "@/lib/prisma";
import { auth } from "@clerk/nextjs/server";

export async function OrderHistory() {
     try {
          const { userId } = await auth();

          if (!userId)
               return {
                    success: false,
                    message: "There is no current user.",
                    order: [],
               };

          const user = await prisma.user.findUnique({
               where: {
                    clerkId: userId,
               },

               include: {
                    orders: {
                         orderBy: {
                              createdAt: "desc",
                         },
                         select: {
                              deliverySched: true,
                              quantity: true,
                              totalPrice: true,
                              status: true,
                              product: {
                                   select: {
                                        productName: true,
                                        productSize: true,
                                   },
                              },
                         },
                    },
               },
          });

          if (!user) {
               return {
                    success: false,
                    message: "User not found.",
                    order: [],
               };
          }

          return {
               success: true,
               message: "Order fetched successfully.",
               order: user.orders,
          };
     } catch (error) {
          console.error("Error in OrderHistory action:", error);
          return {
               success: false,
               message: "Cannot get order history right now.",
               order: [],
          };
     }
}
