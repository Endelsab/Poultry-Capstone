"use client";

import { useUser } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import SkeletonTable from "@/components/SkeletonTable";
import OrderCard from "@/components/OrderCard";

const OrderPage = () => {
     const { user, isLoaded, isSignedIn } = useUser();

     const router = useRouter();

     useEffect(() => {
          if (isLoaded) {
               if (!isSignedIn || user?.publicMetadata?.role === "admin") {
                    router.push("/");
               }
          }
     }, [isLoaded, isSignedIn, user, router]);

     if (!isLoaded) return <SkeletonTable />;

     return (
          <div className="w-full min-h-screen flex flex-col items-center px-4 md:px-14 mt-10">
               <OrderCard />
          </div>
     );
};

export default OrderPage;
