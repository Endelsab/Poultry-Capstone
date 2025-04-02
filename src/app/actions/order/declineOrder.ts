"use server";

import { EmailTemplate } from "@/components/EmailTemplate";
import prisma from "@/lib/prisma";
import { auth } from "@clerk/nextjs/server";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

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

          const declinedOrder = await prisma.order.update({
               where: {
                    id: orderId,
               },
               data: {
                    status: "DECLINED",
               },
          });

          const status = "Your order is declined.";

          const { error } = await resend.emails.send({
               from: "onboarding@resend.dev",
               to: "wendelsabayo999@gmail.com",
               subject: "Order status",
               react: EmailTemplate(user.username, status),
          });
          if (error) {
               console.log(error.message);
          }

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
