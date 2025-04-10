"use server";

import prisma from "@/lib/prisma";
import { auth } from "@clerk/nextjs/server";
import { revalidatePath } from "next/cache";

export async function DeleteProduct(id: string) {
     try {
          const { userId, sessionClaims } = await auth();

          if (!userId) return { success: false, message: "UnAuthenticated" };

          if (sessionClaims?.metadata?.role !== "admin")
               return { success: false, message: "UnAuthorized" };

          const product = await prisma.product.findUnique({
               where: {
                    id,
               },
          });

          if (!product)
               return { success: false, message: "product does not exist" };

          await prisma.product.delete({
               where: {
                    id,
               },
          });

          revalidatePath("/admin");
          return {
               success: true,
               message: "Product deleted successfully",
          };
     } catch (error) {
          console.log("Error in DeleteProduct:", error);
          return { success: false, message: "Internal Server Error" };
     }
}
