"use server";

import prisma from "@/lib/prisma";

export async function DisplayProduct() {
     try {
          const products = await prisma.product.findMany({
               orderBy: {
                    productSize: "desc",
               },
          });

          return {
               success: true,
               message: "Fetched products successfully",
               products,
          };
     } catch (error) {
          console.log("Error in DisplayProduct:", error);
          return {
               success: false,
               message: "Failed to fetch products",
               products: [],
          };
     }
}
