"use client";

import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { ArrowRight } from "lucide-react";
import { motion } from "framer-motion";
import { Typewriter } from "react-simple-typewriter";

const containerVariants = {
     hidden: { opacity: 0, y: 50 },
     visible: {
          opacity: 1,
          y: 0,
          transition: {
               duration: 1,
               ease: "easeOut",
               staggerChildren: 0.3,
          },
     },
};

const childVariants = {
     hidden: { opacity: 0, y: 20 },
     visible: {
          opacity: 1,
          y: 0,
          transition: { duration: 1, ease: "easeOut" },
     },
};

const Main = () => {
     return (
          <div className="flex flex-col justify-center items-center gap-40 mt-10">
               <motion.div
                    variants={containerVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: false, amount: 0.2 }}
                    className="text-center max-w-3xl mt-28"
               >
                    <motion.h1
                         variants={childVariants}
                         className=" text-4xl  md:text-5xl font-bold text-sky-500 leading-tight"
                    >
                         Yulo&apos;s Poultry Farm : <br /> An Online Ordering
                         Platform for Poultry
                         <span className="text-emerald-500 ml-2">
                              <Typewriter
                                   words={["Product"]}
                                   loop={true}
                                   cursor
                                   cursorStyle="|"
                                   typeSpeed={100}
                                   deleteSpeed={50}
                              />
                         </span>
                    </motion.h1>

                    <motion.p
                         variants={childVariants}
                         className="text-sm  md:text-md mt-8 text-gray-400 from-neutral-500"
                    ></motion.p>

                    <motion.div
                         variants={childVariants}
                         whileHover={{ scale: 1.1 }}
                         whileTap={{ scale: 0.9 }}
                         className="mt-16"
                    >
                         <Button className="bg-sky-500 text-md hover:bg-emerald-500 text-gray-800">
                              Get Started <ArrowRight />
                         </Button>
                    </motion.div>
               </motion.div>

               <motion.div
                    initial={{ width: 0 }}
                    whileInView={{ width: "90%" }}
                    viewport={{ once: false, amount: 0.3 }}
                    transition={{ duration: 1.2, ease: "easeOut", delay: 0.5 }}
                    className="w-11/12"
               >
                    <Separator className="w-full h-[1px] bg-sky-600" />
               </motion.div>
          </div>
     );
};

export default Main;
