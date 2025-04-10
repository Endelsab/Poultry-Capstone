import Footer from "@/components/Footer";
import Main from "@/components/Main";
import { ProductCard } from "@/components/ProductCard";

import { SyncUser } from "./actions/users/SyncUser";
import { currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";

export default async function Home() {
    const user = await currentUser();

    if (user) {
        await SyncUser();

        if (user?.publicMetadata?.role === "admin") {
            redirect("/admin");
        }
    }

    console.log("role in home :", user?.publicMetadata?.role);

    return (
        <div className="flex flex-col gap-10">
            <Main />
            <ProductCard />
            <Footer />
        </div>
    );
}
