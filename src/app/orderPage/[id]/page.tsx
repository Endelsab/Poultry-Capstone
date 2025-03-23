"use client";

import { useUser } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import { useEffect, use } from "react";
import SkeletonTable from "@/components/SkeletonTable";
import OrderCard from "@/components/OrderCard";
import { useQuery } from "@tanstack/react-query";
import { ProductToBuy } from "@/app/actions/order/productToBuy";

const OrderPage = ({ params }: { params: Promise<{ id: string }> }) => {
     const { user, isLoaded, isSignedIn } = useUser();
     const router = useRouter();
     const { id } = use(params);

     useEffect(() => {
          if (
               isLoaded &&
               (!isSignedIn || user?.publicMetadata?.role === "admin")
          ) {
               router.push("/");
          }
     }, [isLoaded, isSignedIn, user, router]);

     const { data, isLoading, isError } = useQuery({
          queryKey: ["ProductToBuy", id],
          queryFn: () => ProductToBuy(id),
          enabled: !!id,
     });

     if (!isLoaded || isLoading) return <SkeletonTable />;

     if (!id || !data?.success || !data?.product || isError) {
          router.replace("/");
          return null;
     }

     console.log("data here :", data?.product);

     return (
          <div className="w-full min-h-screen flex flex-col items-center px-4 md:px-14 mt-10">
               <OrderCard product={data?.product} />
          </div>
     );
};

export default OrderPage;
