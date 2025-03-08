import Footer from "@/components/Footer";
import Main from "@/components/Main";
import { ProductCard } from "@/components/ProductCard";
import { SyncUser } from "./actions/users/SyncUser";
import { redirect } from "next/navigation";

export default async function Home() {
     const user = await SyncUser();
     if (user.success && user.role === "admin") {
          redirect("/admin");
     }

     return (
          <div className="flex flex-col gap-10">
               <Main />

               <ProductCard />

               <Footer />
          </div>
     );
}
