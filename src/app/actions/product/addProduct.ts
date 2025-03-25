"use server";

import prisma from "@/lib/prisma";
import { auth } from "@clerk/nextjs/server";
import { revalidatePath } from "next/cache";

export async function AddProduct(prevState: string, formData: FormData) {
     try {
          const { userId, sessionClaims } = await auth();

          if (!userId) return { success: false, message: "UnAuthenticated" };

          if (sessionClaims?.metadata?.role !== "admin")
               return { success: false, message: "UnAuthorized" };

          const productName = (formData.get("productName") as string)?.trim();
          const productSize = (formData.get("productSize") as string)?.trim();
          const stock = Number(formData.get("stock"));
          const price = Number(formData.get("price"));

          if (!productName || !productSize || isNaN(stock) || isNaN(price)) {
               return {
                    success: false,
                    message: "All fields required || invalid input",
               };
          }
          if (stock < 0 || price < 0) {
               return {
                    success: false,
                    message: "Stock and price must be non-negative",
               };
          }

          await prisma.product.create({
               data: { productName, productSize, stock, price },
          });

          revalidatePath("/admin");

          return {
               success: true,
               message: "Added product successfully",
          };
     } catch (error) {
          console.log("Error in AddProduct:", error);
          return { success: false, message: "Internal Server Error" };
     }
}
