"use server";

import prisma from "@/lib/prisma";
import { auth } from "@clerk/nextjs/server";
import { revalidatePath } from "next/cache";

export async function UpdateProduct(
     prevState: string,
     {
          productId,
          productName,
          productSize,
          stock,
          price,
     }: {
          productId: string;
          productName: string;
          productSize: string;
          stock: number;
          price: number;
     }
) {
     try {
          const { userId, sessionClaims } = await auth();

          if (!userId) return { success: false, message: "UnAuthenticated" };
          if (sessionClaims?.metadata?.role !== "admin")
               return { success: false, message: "UnAuthorized" };

          if (!productId)
               return { success: false, message: "Invalid product ID" };

          productName = productName.trim();
          productSize = productSize.trim();

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

          const product = await prisma.product.findUnique({
               where: { id: productId },
          });
          if (!product)
               return { success: false, message: "Product does not exist" };

          await prisma.product.update({
               where: { id: productId },
               data: { productName, productSize, stock, price },
          });

          revalidatePath("/admin");

          return { success: true, message: "Updated product successfully" };
     } catch (error: any) {
          console.error("Error in UpdateProduct:", error.message);
          return { success: false, message: "Internal Server Error" };
     }
}
