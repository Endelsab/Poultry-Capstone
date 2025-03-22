"use server";

import prisma from "@/lib/prisma";
import { auth } from "@clerk/nextjs/server";
import { revalidatePath } from "next/cache";

export async function ApproveOrder(orderId: string) {
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
          });

          if (!order)
               return { success: false, message: "Order does not exist" };

          const orderApprove = await prisma.order.update({
               where: {
                    id: orderId,
               },
               data: {
                    status: "APPROVED",
               },
          });

          revalidatePath("/admin/orders");

          return {
               success: true,
               message: "Approved order successfully",
               orderApprove,
          };
     } catch (error) {
          console.error("Error in ApproveOrder action:", error);
          return {
               success: false,
               message: "Cannot approve orders right now.",
          };
     }
}
