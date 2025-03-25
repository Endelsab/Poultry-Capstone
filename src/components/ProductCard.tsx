"use client";

import React from "react";
import { Button } from "./ui/button";
import { ShoppingCart } from "lucide-react";
import {
     Card,
     CardContent,
     CardDescription,
     CardFooter,
     CardHeader,
     CardTitle,
} from "@/components/ui/card";
import { motion } from "framer-motion";
import { AnimatePresence } from "framer-motion";
import { useQuery } from "@tanstack/react-query";
import { DisplayProduct } from "@/app/actions/product/displayProduct";
import SkeletonTable from "./SkeletonTable";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import Image from "next/image";
import { useUser } from "@clerk/nextjs";

export function ProductCard() {
     const { user, isLoaded } = useUser();

     const { data, isLoading, isError, refetch } = useQuery({
          queryKey: ["products"],
          queryFn: () => DisplayProduct(),
     });

     const router = useRouter();

     const handleBuyNow = (id: string, stock: number) => {
          if (stock === 0) return toast.error("Insufficient stock");
          if (!user) return toast.error("Please login first");

          router.push(`/orderPage/${id}`);
     };

     if (!isLoaded) return <SkeletonTable />;

     if (isLoading) return <SkeletonTable />;

     if (isError || !data?.success) {
          return (
               <p className="text-center text-red-500">
                    Error: {data?.message || "Failed to load products."}
               </p>
          );
     }

     return (
          <AnimatePresence>
               <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6 w-full px-4 md:px-14 mt-10">
                    {data.products.map((product, index) => (
                         <motion.div
                              onViewportEnter={() => refetch()}
                              key={index}
                              initial={{ opacity: 0, y: 50 }}
                              whileInView={{ opacity: 1, y: 0 }}
                              viewport={{ once: false, amount: 0.2 }}
                              transition={{
                                   duration: 0.6,
                                   delay: index * 0.2,
                                   ease: "easeOut",
                              }}
                         >
                              <Card className="w-full max-w-xs mx-auto shadow-lg hover:shadow-xl transition duration-300">
                                   <CardHeader>
                                        <CardTitle className="text-center text-xl text-sky-500">
                                             {product.productSize}
                                        </CardTitle>
                                        <CardDescription className="text-center text-sm text-gray-400">
                                             stock {product.stock}
                                        </CardDescription>
                                   </CardHeader>
                                   <CardContent className="flex justify-center">
                                        <Image
                                             width={200}
                                             height={100}
                                             className=" object-cover rounded-lg"
                                             src={"/small.jpg"}
                                             alt={`${product.productSize} image`}
                                        />
                                   </CardContent>
                                   <CardFooter className="flex  flex-col gap-3">
                                        <div className="flex justify-center items-center gap-7 md:justify-between w-[200px]  text-sky-500 font-semibold">
                                             <p className="md:ml-4 ">
                                                  ₱ {product.price}
                                             </p>

                                             <ShoppingCart className="  hover:scale-125 md:mr-4 transition ease-in-out  hover:text-emerald-400 cursor-pointer" />
                                        </div>
                                        <Button
                                             onClick={() =>
                                                  handleBuyNow(
                                                       product.id,
                                                       product.stock
                                                  )
                                             }
                                             className="w-full bg-emerald-500 hover:bg-emerald-600 transition"
                                        >
                                             Buy now
                                        </Button>
                                   </CardFooter>
                              </Card>
                         </motion.div>
                    ))}
               </div>
          </AnimatePresence>
     );
}
