"use server";

import prisma from "@/lib/prisma";
import { auth } from "@clerk/nextjs/server";
import { revalidatePath } from "next/cache";

export async function BlockUser(id: string) {
     try {
          const { userId, sessionClaims } = await auth();

          const role = sessionClaims?.metadata?.role || "customer";

          if (!userId || role !== "admin")
               return {
                    success: false,
                    status: 403,
                    message: "Unauthorized access. Admins only.",
               };

          const user = await prisma.user.findUnique({
               where: { id },
          });

          if (!user)
               return {
                    success: false,

                    message: "user does not exist",
               };

          await prisma.user.update({
               where: {
                    id,
               },
               data: {
                    isBlocked: true,
               },
          });

          revalidatePath("/admin/customers");

          return {
               success: true,

               message: "Customer blocked successfully",
          };
     } catch (error) {
          console.log("error in BlockUser", error);
          return { success: false, message: "error in BlockUser " };
     }
}
