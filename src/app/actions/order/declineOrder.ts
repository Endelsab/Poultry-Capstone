"use server";

import prisma from "@/lib/prisma";
import { auth } from "@clerk/nextjs/server";

export async function DeclineOrder(orderId: string) {
     try {
          const { userId, sessionClaims } = await auth();

          if (!userId)
               return {
                    success: false,
                    message: "UnAuthenticated",
               };

          if (sessionClaims?.metadata?.role !== "admin")
               return { success: false, message: "UnAuthorized" };

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

          const declinedOrder = await prisma.order.update({
               where: {
                    id: orderId,
               },
               data: {
                    status: "DECLINED",
               },
          });

          return {
               success: true,
               message: "Declined order successfully",
               declinedOrder,
          };
     } catch (error) {
          console.error("Error in DeclineOrder action:", error);
          return {
               success: false,
               message: "Cannot Decline Order right now.",
          };
     }
}
