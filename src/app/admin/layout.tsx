import Sidebar from "@/components/Sidebar";
import { currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";

export default async function AdminLayout({
     children,
}: {
     children: React.ReactNode;
}) {
     const user = await currentUser();

     if (!user || user?.publicMetadata?.role !== "admin") {
          redirect("/");
     }
     console.log("role in admin layout :", user?.publicMetadata?.role);

     return (
          <div className="flex flex-row gap-14  p-4 mr-10 mt-4">
               <div className=" ">
                    <Sidebar />
               </div>
               <div className=" ">{children}</div>
          </div>
     );
}
