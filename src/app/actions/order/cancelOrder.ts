"use server";

import prisma from "@/lib/prisma";
import { auth } from "@clerk/nextjs/server";

export async function CancelOrder(orderId: string) {
     try {
          const { userId } = await auth();

          if (!userId)
               return {
                    success: false,
                    message: "UnAuthenticated",
               };

          const user = await prisma.user.findUnique({
               where: { clerkId: userId },
               select: { id: true },
          });

          if (!user)
               return {
                    success: false,
                    message: "User does not exist",
               };

          const order = await prisma.order.findUnique({
               where: {
                    id: orderId,
               },
               select: {
                    id: true,
               },
          });

          if (!order)
               return { success: false, message: "Order does not exist" };

          const cancelOrder = await prisma.order.update({
               where: {
                    id: orderId,
               },
               data: {
                    status: "CANCELLED",
               },
          });

          return {
               success: true,
               message: "Cancelled order successfully",
               cancelOrder,
          };
     } catch (error) {
          console.error("Error in CancelOrder action:", error);
          return {
               success: false,
               message: "Cannot CancelOrder right now.",
          };
     }
}
