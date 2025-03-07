import Sidebar from "@/components/Sidebar";

export default async function AdminDashboard() {
     return (
          <div className="flex flex-row gap-14  p-12">
               <div className="basis-1/3 size-full ">
                    <Sidebar />
               </div>
               <div className="basis-2/3 size-full bg-sky-500">r323r3r</div>
          </div>
     );
}
