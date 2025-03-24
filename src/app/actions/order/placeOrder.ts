"use server";

import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export async function PlaceOrder({
     userId,
     productId,
     quantity,
     fullName,
     address,
}: {
     userId: string;
     productId: string;
     quantity: number;
     fullName: string;
     address: string;
}) {
     try {
          if (!userId || !productId || !quantity || !fullName || !address) {
               return { success: false, message: "All fields are required." };
          }

          if (typeof quantity !== "number" || quantity <= 0) {
               return { success: false, message: "Invalid quantity." };
          }

          if (fullName.trim().length < 3) {
               return {
                    success: false,
                    message: "Full name must be at least 3 characters long.",
               };
          }

          if (address.trim().length < 5) {
               return {
                    success: false,
                    message: "Address must be at least 5 characters long.",
               };
          }

          const user = await prisma.user.findUnique({
               where: { clerkId: userId },
               select: {
                    id: true,
                    email: true,
               },
          });

          if (!user) return { success: false, message: "User not found." };

          const product = await prisma.product.findUnique({
               where: { id: productId },
          });

          if (!product)
               return { success: false, message: "Product not found." };

          if (product.stock < quantity) {
               return { success: false, message: "Insufficient stock." };
          }

          const totalPrice = Math.ceil(product.price * quantity);

          const order = await prisma.order.create({
               data: {
                    userId: user.id,
                    productId: product.id,
                    quantity,
                    totalPrice,
                    fullName,
                    email: user.email,
                    address,
               },
          });

          await prisma.product.update({
               where: { id: productId },
               data: { stock: product.stock - quantity },
          });

          revalidatePath("/");

          return {
               success: true,
               message: "Order placed successfully.",
               order,
          };
     } catch (error) {
          console.error("Error in PlaceOrder:", error);
          return {
               success: false,
               message: "Cannot place order. Please try again later.",
          };
     }
}
