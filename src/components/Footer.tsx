"use client";

import { Separator } from "./ui/separator";
import { motion } from "framer-motion";

import { FaFacebook, FaTwitter, FaInstagram } from "react-icons/fa";
import { BsPersonCircle } from "react-icons/bs";
import { HashIcon } from "lucide-react";
import { TiLocationOutline } from "react-icons/ti";

function Footer() {
     return (
          <div className="flex flex-col justify-center items-center gap-10 mt-20">
               <motion.div
                    initial={{ width: 0 }}
                    whileInView={{ width: "90%" }}
                    viewport={{ once: false, amount: 0.3 }}
                    transition={{ duration: 1.2, ease: "easeOut", delay: 0.5 }}
                    className="w-11/12"
               >
                    <Separator className="w-full h-[1px] bg-sky-600" />
               </motion.div>

               <div className="w-11/12 p-6">
                    <footer className="text-white py-8">
                         <div className="flex flex-col justify-center items-center gap-6">
                              <div className="flex  justify-center gap-10  w-full">
                                   <motion.div
                                        initial={{ opacity: 0, x: -50 }}
                                        whileInView={{ opacity: 1, x: 0 }}
                                        viewport={{ once: false, amount: 0.3 }}
                                        transition={{
                                             duration: 1,
                                             ease: "easeOut",
                                             delay: 0.3,
                                        }}
                                        className="flex flex-col gap-4     text-sky-500"
                                   >
                                        <div className="flex gap-2">
                                             <BsPersonCircle className="size-5" />
                                             <p>Mr. Lou Moriles</p>
                                        </div>
                                        <div className="flex gap-2">
                                             <HashIcon className="size-4 mt-1" />
                                             <p>0909090909</p>
                                        </div>
                                        <div className="flex gap-2">
                                             <TiLocationOutline className="mt-1" />
                                             <p>
                                                  Sa lugar na masaya na siya sa
                                                  iba
                                             </p>
                                        </div>
                                   </motion.div>

                                   <motion.div
                                        initial={{ opacity: 0, x: 50 }}
                                        whileInView={{ opacity: 1, x: 0 }}
                                        viewport={{ once: false, amount: 0.3 }}
                                        transition={{
                                             duration: 1,
                                             ease: "easeOut",
                                             delay: 0.3,
                                        }}
                                        className="flex gap-4 flex-col  text-sky-500 "
                                   >
                                        <FaFacebook className="size-6 hover:text-emerald-500 hover:scale-105 transition-transform duration-300" />
                                        <FaTwitter className="size-6 hover:text-emerald-500 hover:scale-110 transition-transform duration-300" />
                                        <FaInstagram className="size-6 hover:text-emerald-500 hover:scale-110 transition-transform duration-300" />
                                   </motion.div>
                              </div>
                              <motion.div
                                   initial={{ scaleX: 0, originX: 0.5 }}
                                   whileInView={{ scaleX: 1 }}
                                   viewport={{ once: false, amount: 0.3 }}
                                   transition={{
                                        duration: 1.2,
                                        ease: "easeOut",
                                        delay: 0.5,
                                   }}
                                   className="w-1/2 "
                              >
                                   <Separator className="h-[1px] bg-emerald-500 w-full" />
                              </motion.div>

                              <div className="text-center text-sky-600 text-sm mt-6">
                                   &copy; {new Date().getFullYear()} EggPress.
                                   All rights reserved.
                              </div>
                         </div>
                    </footer>
               </div>
          </div>
     );
}

export default Footer;
