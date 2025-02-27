"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Modetoggle } from "./Modetoggle";
import { motion } from "framer-motion";

const Navbar = () => {
     return (
          <nav className="sticky  top-0 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 z-50">
               <motion.div
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: false, amount: 0.2 }}
                    initial={{ y: -100, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{
                         duration: 0.8,
                         ease: "easeOut",
                    }}
                    className="max-w-7xl mx-auto p-4 flex justify-between"
               >
                    <h1 className="font-bold text-2xl text-emerald-400">
                         EggPress
                    </h1>
                    <div className="flex gap-2">
                         <Modetoggle />
                         <Link href={"/"}>
                              <Button variant={"outline"}>Dashboard</Button>
                         </Link>
                         <Link href={"/"}>
                              <Button variant={"outline"}>Contact</Button>
                         </Link>
                         <Button variant={"destructive"}>Logout</Button>
                    </div>
               </motion.div>
          </nav>
     );
};

export default Navbar;
