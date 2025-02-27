import Footer from "@/components/Footer";
import Main from "@/components/Main";
import { ProductCard } from "@/components/ProductCard";

export default function Home() {
     return (
          <div className="flex flex-col gap-10">
               <Main />

               <ProductCard />

               <Footer />
          </div>
     );
}
