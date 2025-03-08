"use server";

import prisma from "@/lib/prisma";
import { auth } from "@clerk/nextjs/server";

export async function GetProducts() {
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

          const products = await prisma.product.findMany({
               orderBy: {
                    productName: "asc",
               },
          });

          console.log("metadata here : ", sessionClaims?.metadata?.role);

          return {
               success: true,
               message: "Fetched products successfully",
               products,
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
