"use server";

import prisma from "@/lib/prisma";

export async function DisplayProduct() {
     try {
          const products = await prisma.product.findMany({
               orderBy: {
                    productName: "asc",
               },
          });

          return {
               success: true,
               message: "Fetched products successfully",
               products,
          };
     } catch (error: any) {
          console.log("Error in DisplayProduct:", error.message);
          return {
               success: false,
               message: "Failed to fetch products",
               products: [],
          };
     }
}
