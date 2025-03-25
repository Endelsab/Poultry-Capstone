"use server";

import { EmailTemplate } from "@/components/EmailTemplate";
import prisma from "@/lib/prisma";
import { auth } from "@clerk/nextjs/server";
import { revalidatePath } from "next/cache";

import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function DeliverySched(orderId: string, schedule: string) {
     try {
          const { userId, sessionClaims } = await auth();

          if (!userId)
               return {
                    success: false,
                    message: "There is no current user",
               };

          if (sessionClaims?.metadata?.role !== "admin")
               return { success: false, message: "UnAuthorized" };

          const user = await prisma.user.findUnique({
               where: {
                    clerkId: userId,
               },
               select: {
                    username: true,
               },
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

          const deliverOrder = await prisma.order.update({
               where: {
                    id: orderId,
               },
               data: {
                    status: "DELIVERY",
                    deliverySched: schedule,
               },
          });

          const status = `Your order is out for delivery, ${schedule}`;

          const { error } = await resend.emails.send({
               from: "onboarding@resend.dev",
               to: "wendelsabayo999@gmail.com",
               subject: "Order status",
               react: EmailTemplate(user.username, status),
          });
          if (error) {
               console.log(error.message);
          }

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
