"use server";

import prisma from "@/lib/prisma";
import { auth } from "@clerk/nextjs/server";
import { revalidatePath } from "next/cache";

export async function OrderReceived(orderId: string) {
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

          const deliveredOrder = await prisma.order.update({
               where: {
                    id: orderId,
               },
               data: {
                    status: "HISTORY",
               },
          });

          revalidatePath("/admin/orders");

          return {
               success: true,
               message: "Order received",
               deliveredOrder,
          };
     } catch (error) {
          console.error("Error in OrderReceive action:", error);
          return {
               success: false,
               message: "Error in OrderReceive action.",
          };
     }
}
