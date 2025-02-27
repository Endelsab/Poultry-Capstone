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
          price: "120 php",
          img: "/small.jpg",
     },
     {
          title: "Large",
          description: "Large eggs best for lunch",
          price: "150 php",
          img: "/small.jpg",
     },
     {
          title: "Extra Large",
          description: "Extra Large eggs best for dinner",
          price: "180 php",
          img: "/small.jpg",
     },
     {
          title: "Jumbo",
          description: "Jumbo eggs best for snack",
          price: "200 php",
          img: "/small.jpg",
     },
];

export function ProductCard() {
     return (
          <>
               <AnimatePresence>
                    <div className="flex w-full  mt-20  justify-around px-14">
                         {products.map((product, index) => (
                              <motion.div
                                   key={index}
                                   initial={{
                                        opacity: 0,
                                        x: index < 2 ? -100 : 100,
                                   }}
                                   whileInView={{ opacity: 1, x: 0 }}
                                   viewport={{ once: false, amount: 0.2 }}
                                   transition={{
                                        duration: 0.8,
                                        delay: index * 0.2,
                                        ease: "easeOut",
                                   }}
                                   className="basis-64"
                              >
                                   <Card>
                                        <CardHeader>
                                             <CardTitle className="text-center text-lg text-sky-500">
                                                  {product.title}
                                             </CardTitle>
                                             <CardDescription className="text-center">
                                                  {product.description}
                                             </CardDescription>
                                        </CardHeader>
                                        <CardContent>
                                             <img
                                                  className="size-[250] rounded-lg"
                                                  src={product.img}
                                                  alt="product image"
                                             />
                                        </CardContent>
                                        <CardFooter className="flex flex-col gap-5">
                                             <div className="flex justify-between w-full px-4 text-emerald-400">
                                                  <p>{product.price}</p>
                                                  <ShoppingCart className="hover:text-sky-500" />
                                             </div>
                                             <Button className="w-full hover:bg-emerald-500">
                                                  Buy now
                                             </Button>
                                        </CardFooter>
                                   </Card>
                              </motion.div>
                         ))}
                    </div>
               </AnimatePresence>
          </>
     );
}
