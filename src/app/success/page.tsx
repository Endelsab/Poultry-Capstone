"use client";

import { useUser } from "@clerk/nextjs";
import { redirect } from "next/navigation";
import { motion } from "framer-motion";
import { CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import SkeletonTable from "@/components/SkeletonTable";

function SuccessPage() {
     const { user, isLoaded } = useUser();

     if (!isLoaded) return <SkeletonTable />;
     if (!user) redirect("/");

     return (
          <motion.div
               initial={{ x: 100, opacity: 0 }}
               animate={{ x: 0, opacity: 1 }}
               transition={{ duration: 0.5, ease: "easeOut" }}
               className="flex flex-col items-center mt-24 md:mt-40 min-h-screen text-center space-y-6"
          >
               <CheckCircle className="w-16 h-16 text-green-500" />

               <h1 className="text-3xl font-bold">
                    Order Placed Successfully!
               </h1>
               <p className="text-muted-foreground">
                    Thank you for your purchase. You will receive an email
                    confirmation shortly.
               </p>

               <Button
                    className="text-slate-100 bg-sky-700"
                    onClick={() => redirect("/")}
                    variant="default"
               >
                    Continue Shopping
               </Button>
          </motion.div>
     );
}

export default SuccessPage;
