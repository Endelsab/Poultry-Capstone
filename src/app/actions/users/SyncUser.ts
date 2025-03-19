"use server";

import prisma from "@/lib/prisma";
import { currentUser } from "@clerk/nextjs/server";
import { revalidatePath } from "next/cache";

export async function SyncUser() {
     try {
          const user = await currentUser();

          if (!user)
               return { success: false, message: "There is no current user" };

          const {
               id: clerkId,
               publicMetadata,
               primaryEmailAddress,
               username,
          } = user;

          const existingUser = await prisma.user.findUnique({
               where: { clerkId },
          });

          if (existingUser) return;

          await prisma.user.create({
               data: {
                    clerkId,
                    username:
                         username ||
                         primaryEmailAddress?.emailAddress.split("@")[0] ||
                         "",
                    email: primaryEmailAddress?.emailAddress || "",
                    role: (publicMetadata?.role as string) || "customer",
               },
          });

          revalidatePath("/");

          return { success: true };
     } catch (error) {
          console.log("error in SyncUser", error);
          return { success: false, message: "error in SyncUser" };
     }
}
