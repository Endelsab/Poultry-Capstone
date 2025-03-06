import prisma from "@/lib/prisma";
import { auth, currentUser } from "@clerk/nextjs/server";

export async function SyncUser() {
     try {
          const { userId: clerkId } = await auth();
          const user = await currentUser();

          if (!clerkId || !user) return;

          const existingUser = await prisma.user.findUnique({
               where: {
                    clerkId,
               },
          });
          if (existingUser) return existingUser;

          try {
               await prisma.user.create({
                    data: {
                         username:
                              user.username ||
                              user.emailAddresses[0]?.emailAddress.split(
                                   "@"
                              )[0] ||
                              "",
                         email: user.emailAddresses[0]?.emailAddress || "",
                         clerkId,
                         role:
                              (user.publicMetadata?.role as string) ||
                              "customer",
                    },
               });
          } catch (error) {
               console.log("error in dbUser", error);
               return { success: false, message: "error in dbUser" };
          }

          return { success: true, status: 201 };
     } catch (error) {
          console.log("error in syncUser", error);
          return { success: false, message: "error in syncUser" };
     }
}
