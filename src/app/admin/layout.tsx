import Sidebar from "@/components/Sidebar";
import { currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";

export default async function AdminLayout({
     children,
}: {
     children: React.ReactNode;
}) {
     const user = await currentUser();

     if (!user || user.publicMetadata?.role !== "admin") {
          redirect("/");
     }

     return (
          <div className="flex flex-row gap-14  p-12">
               <div className="basis-1/3 size-full ">
                    <Sidebar />
               </div>
               <div className="basis-2/3 size-full ">{children}</div>
          </div>
     );
}
