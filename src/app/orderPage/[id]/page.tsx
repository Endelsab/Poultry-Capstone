"use client";

import { useUser } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import SkeletonTable from "@/components/SkeletonTable";
import OrderCard from "@/components/OrderCard";
import { useQuery } from "@tanstack/react-query";
import { ProductToBuy } from "@/app/actions/order/productToBuy";

const OrderPage = ({ params }: { params: Promise<{ id: string }> }) => {
     const { user, isLoaded, isSignedIn } = useUser();
     const router = useRouter();

     const [id, setId] = useState("");

     useEffect(() => {
          if (isLoaded) {
               if (!isSignedIn || user?.publicMetadata?.role === "admin") {
                    router.push("/");
               }
          }
     }, [isLoaded, isSignedIn, user, router]);

     useEffect(() => {
          const fetchParams = async () => {
               const { id } = await params;
               setId(id);
          };
          fetchParams();
     }, []);

     const { data, isLoading, isError } = useQuery({
          queryKey: ["ProductToBuy", id],
          queryFn: () => ProductToBuy(id),
     });

     if (!isLoaded || isLoading) return <SkeletonTable />;

     if (!id || !data?.success || !data?.product || isError) {
          return <p className="text-red-500">Error fetching product data.</p>;
     }

     console.log("data here :", data?.product);

     return (
          <div className="w-full min-h-screen flex flex-col items-center px-4 md:px-14 mt-10">
               <OrderCard product={data?.product} />
          </div>
     );
};

export default OrderPage;
