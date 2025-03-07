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

const products = [
     {
          title: "Small",
          description: "Small eggs best for breakfast",
          price: "₱120",
          img: "/small.jpg",
     },
     {
          title: "Large",
          description: "Large eggs best for lunch",
          price: "₱150",
          img: "/small.jpg",
     },
     {
          title: "Extra Large",
          description: "Extra Large eggs best for dinner",
          price: "₱180",
          img: "/small.jpg",
     },
     {
          title: "Jumbo",
          description: "Jumbo eggs best for snacks",
          price: "₱200",
          img: "/small.jpg",
     },
];

export function ProductCard() {
     return (
          <AnimatePresence>
               <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6 w-full px-4 md:px-14 mt-10">
                    {products.map((product, index) => (
                         <motion.div
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
                                        <CardTitle className="text-center text-lg text-sky-500">
                                             {product.title}
                                        </CardTitle>
                                        <CardDescription className="text-center text-gray-400">
                                             {product.description}
                                        </CardDescription>
                                   </CardHeader>
                                   <CardContent className="flex justify-center">
                                        <img
                                             className="size-auto object-cover rounded-lg"
                                             src={product.img}
                                             alt={`${product.title} image`}
                                        />
                                   </CardContent>
                                   <CardFooter className="flex flex-col gap-3">
                                        <div className="flex justify-between w-full px-4 text-sky-500 font-semibold">
                                             <p>{product.price}</p>
                                             <ShoppingCart className=" hover:scale-125 transition ease-in-out  hover:text-emerald-400 cursor-pointer" />
                                        </div>
                                        <Button className="w-full bg-emerald-500 hover:bg-emerald-600 transition">
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
