"use server";

import prisma from "@/lib/prisma";

export async function ProductToBuy(id: string) {
     try {
          const product = await prisma.product.findFirst({
               where: {
                    id,
               },
          });

          if (!product)
               return { success: false, message: "Product does not exist" };

          return {
               success: true,
               message: "fetch successfully",
               product: product,
          };
     } catch (error: any) {
          console.log("error in ProductToBuy", error);
          return { success: false, message: error.message };
     }
}
