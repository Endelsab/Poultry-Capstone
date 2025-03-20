"use server";

import prisma from "@/lib/prisma";
import { Decimal } from "@prisma/client/runtime/library";

function validateOrderInput(fullName: string, email: string, address: string) {
     if (!fullName.trim()) return "Full name is required";
     if (!email.trim()) return "Email is required";
     if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email))
          return "Invalid email format";
     if (!address.trim() || address.length < 10)
          return "Address must be at least 10 characters";
     return null;
}

export async function PlaceOrder({
     userId,
     productId,
     quantity,
     fullName,
     email,
     address,
}: {
     userId: string;
     productId: string;
     quantity: number;
     fullName: string;
     email: string;
     address: string;
}) {
     try {
          const validationError = validateOrderInput(fullName, email, address);
          if (validationError) {
               return { success: false, message: validationError };
          }

          const user = await prisma.user.findUnique({
               where: { clerkId: userId },
          });

          if (!user) return { success: false, message: "User not found" };

          const product = await prisma.product.findUnique({
               where: { id: productId },
          });

          if (!product) return { success: false, message: "Product not found" };

          if (product.stock < quantity) {
               return { success: false, message: "Insufficient stock" };
          }

          const totalPrice = Math.ceil(product.price * quantity);

          const order = await prisma.order.create({
               data: {
                    userId: user.id,
                    productId: product.id,
                    quantity,
                    totalPrice,
                    fullName,
                    email,
                    address,
               },
          });

          await prisma.product.update({
               where: { id: productId },
               data: { stock: product.stock - quantity },
          });

          return { success: true, message: "Order placed successfully", order };
     } catch (error) {
          console.error("Error in PlaceOrder", error);
          return { success: false, message: "Cannot place order" };
     }
}
