"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Modetoggle } from "./Modetoggle";
import { motion } from "framer-motion";
import { useState } from "react";
import { Menu, X } from "lucide-react"; // For mobile menu icons
import { Separator } from "./ui/separator";

const Navbar = () => {
     const [menuOpen, setMenuOpen] = useState(false);

     return (
          <nav className="sticky top-0 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 z-50">
               <motion.div
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: false, amount: 0.2 }}
                    initial={{ y: -100, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{
                         duration: 0.8,
                         ease: "easeOut",
                    }}
                    className="max-w-7xl mx-auto p-4 flex justify-between items-center"
               >
                    {/* Logo */}
                    <h1 className="font-bold text-2xl text-emerald-400">
                         EggPress
                    </h1>

                    {/* Desktop Menu */}
                    <div className="hidden md:flex gap-2">
                         <Modetoggle />
                         <Link href="/">
                              <Button variant="outline">Dashboard</Button>
                         </Link>
                         <Link href="/">
                              <Button variant="outline">Contact</Button>
                         </Link>
                         <Button variant="destructive">Logout</Button>
                    </div>

                    {/* Mobile Menu Button */}
                    <button
                         className="md:hidden p-2 hover:text-sky-500 transition ease-in-out"
                         onClick={() => setMenuOpen(!menuOpen)}
                    >
                         {menuOpen ? <X size={28} /> : <Menu size={28} />}
                    </button>
               </motion.div>

               {/* Mobile Menu Dropdown */}
               {menuOpen && (
                    <div className="md:hidden flex flex-col items-center gap-4 p-6 bg-background border-t">
                         <Modetoggle />
                         <Link href="/" onClick={() => setMenuOpen(false)}>
                              <button className="hover:text-sky-500 transition ease-in-out ">
                                   Contact
                              </button>
                         </Link>

                         <Separator className="w-40 " />

                         <Link href="/" onClick={() => setMenuOpen(false)}>
                              <button className="hover:text-sky-500 transition ease-in-out">
                                   Dashboard
                              </button>
                         </Link>
                         <Separator className="w-40" />

                         <Button variant="destructive">Logout</Button>
                    </div>
               )}
          </nav>
     );
};

export default Navbar;
