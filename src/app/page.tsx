import Footer from "@/components/Footer";
import Main from "@/components/Main";
import { ProductCard } from "@/components/ProductCard";
import { currentUser } from "@clerk/nextjs/server";
import { SyncUser } from "./actions/costumer/SyncUser";

export default async function Home() {
     const user = await currentUser();
     if (user) await SyncUser();

     return (
          <div className="flex flex-col gap-10">
               <Main />

               <ProductCard />

               <Footer />
          </div>
     );
}
