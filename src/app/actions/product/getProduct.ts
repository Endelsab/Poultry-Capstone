"use server";

import prisma from "@/lib/prisma";
import { auth } from "@clerk/nextjs/server";

export async function GetProducts(page: number = 1, pageItem: number = 10) {
     try {
          const { userId, sessionClaims } = await auth();

          if (!userId)
               return {
                    success: false,
                    message: "UnAuthenticated",
                    products: [],
               };

          if (sessionClaims?.metadata?.role !== "admin")
               return { success: false, message: "UnAuthorized", products: [] };

          const skip = (page - 1) * pageItem;

          const products = await prisma.product.findMany({
               orderBy: {
                    productName: "asc",
               },
               skip: skip,
               take: pageItem,
          });

          const totalProducts = await prisma.product.count();
          const hasMore = skip + pageItem < totalProducts;

          return {
               success: true,
               message: "Fetched products successfully",
               products,
               hasMore,
          };
     } catch (error: any) {
          console.log("Error in GetProducts:", error.message);
          return {
               success: false,
               message: "Internal Server Error",
               products: [],
          };
     }
}
