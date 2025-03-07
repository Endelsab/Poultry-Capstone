"use client";

import { AlertTriangle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function Forbidden() {
     const router = useRouter();
     const [showDenied, setShowDenied] = useState(false);

     const [mounted, setMounted] = useState(false);

     useEffect(() => {
          setMounted(true);

          const timeout = setTimeout(() => {
               setShowDenied(true);
          }, 2000);

          return () => clearTimeout(timeout);
     }, []);

     if (!mounted) return null;

     return (
          <div className="flex flex-col items-center justify-center h-screen bg-background">
               <motion.div
                    initial={{ opacity: 0, scale: 0.5 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 1, ease: "easeOut" }}
                    className="relative border-2 border-sky-500 p-8 rounded-lg shadow-lg"
               >
                    {/* Glowing border effect */}
                    <div className="absolute inset-0 border-2 border-sky-500 animate-pulse rounded-lg"></div>

                    <div className="relative flex flex-col items-center space-y-4">
                         <motion.h1
                              initial={{ y: -50, opacity: 0 }}
                              animate={{ y: 0, opacity: 1 }}
                              transition={{ duration: 1, delay: 1 }}
                              className="text-3xl font-bold text-sky-500"
                         >
                              {showDenied ? "Access Denied" : "Welcome Admin!"}
                         </motion.h1>

                         <motion.div
                              initial={{ rotate: 0 }}
                              animate={{ rotate: showDenied ? 180 : 0 }}
                              transition={{ duration: 1, delay: 1.5 }}
                         >
                              <AlertTriangle className="text-sky-500 size-16" />
                         </motion.div>

                         <motion.p
                              initial={{ opacity: 0 }}
                              animate={{ opacity: 1 }}
                              transition={{ duration: 1, delay: 2 }}
                              className="text-muted-foreground"
                         >
                              {showDenied ?
                                   "Oops! You do not have permission to view this page."
                              :    "Loading admin panel..."}
                         </motion.p>

                         <motion.div
                              initial={{ scale: 0 }}
                              animate={{ scale: 1 }}
                              transition={{ duration: 1, delay: 2.5 }}
                         >
                              <Button
                                   variant="outline"
                                   className="border-sky-500"
                                   onClick={() => router.push("/")}
                              >
                                   Go Back
                              </Button>
                         </motion.div>
                    </div>
               </motion.div>
          </div>
     );
}
