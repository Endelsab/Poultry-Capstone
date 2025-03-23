"use server";

import { notFound } from "next/navigation";
import prisma from "@/lib/prisma";
import { auth } from "@clerk/nextjs/server";

export async function ProductToBuy(id: string) {
     try {
          const { userId } = await auth();

          if (!userId) return { success: false, message: "Unauthorized" };

          const user = await prisma.user.findUnique({
               where: { clerkId: userId },
               select: { id: true, role: true },
          });

          if (!user || user.role !== "customer")
               return { success: false, message: "Forbidden" };

          const product = await prisma.product.findUnique({ where: { id } });

          if (!product) notFound();

          return {
               success: true,
               message: "Fetch successfully",
               product,
          };
     } catch (error: any) {
          console.error("Error in ProductToBuy", error);
          return {
               success: false,
               message: "Something went wrong. Please try again later.",
          };
     }
}
