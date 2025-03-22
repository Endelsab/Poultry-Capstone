"use server";

import prisma from "@/lib/prisma";
import { auth } from "@clerk/nextjs/server";
import { revalidatePath } from "next/cache";

export async function DeliverySched(orderId: string, schedule: string) {
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

          const deliverOrder = await prisma.order.update({
               where: {
                    id: orderId,
               },
               data: {
                    status: "DELIVERY",
                    deliverySched: schedule,
               },
          });

          revalidatePath("/admin/orders");

          return {
               success: true,
               message: "Order is scheduled for delivery",
               deliverOrder,
          };
     } catch (error) {
          console.error("Error in DeliverySched action:", error);
          return {
               success: false,
               message: "Cannot schedule orders right now.",
          };
     }
}
