"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Modetoggle } from "./Modetoggle";
import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";
import { Separator } from "./ui/separator";
import {
     SignedIn,
     SignedOut,
     SignInButton,
     SignOutButton,
     UserButton,
     useUser,
} from "@clerk/nextjs";
import { BsCart3 } from "react-icons/bs";

const Navbar = () => {
     const { user } = useUser();

     const [role, setRole] = useState<string>("");

     useEffect(() => {
          if (user) {
               const userRole = user.publicMetadata.role as string;
               setRole(userRole || "customer");
          }
     }, [user]);

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
                    <h1 className="font-bold text-2xl text-emerald-400">
                         EggPress
                    </h1>

                    <div className="hidden md:flex  justify-evenly items-center">
                         <Modetoggle />

                         {role === "admin" && (
                              <Link href="/admin">
                                   <Button
                                        variant="outline"
                                        className="border-none"
                                   >
                                        Dashboard
                                   </Button>
                              </Link>
                         )}

                         {role === "customer" && (
                              <Button
                                   variant={"outline"}
                                   className="border-none "
                              >
                                   <BsCart3 />
                              </Button>
                         )}
                         {role !== "admin" && (
                              <Link href="/contact">
                                   <Button
                                        variant="outline"
                                        className="border-none"
                                   >
                                        Contact
                                   </Button>
                              </Link>
                         )}

                         <Link href="/">
                              <Button variant="outline" className="border-none mr-2">
                                   Home
                              </Button>
                         </Link>

                         <SignedIn>
                              <UserButton  />
                         </SignedIn>

                         <SignedOut>
                              <SignInButton mode="modal">
                                   <Button className="bg-sky-500 hover:bg-emerald-500 transition ease-in-out">
                                        Sign In
                                   </Button>
                              </SignInButton>
                         </SignedOut>
                    </div>

                    <button
                         className="md:hidden p-2 hover:text-sky-500 transition ease-in-out"
                         onClick={() => setMenuOpen(!menuOpen)}
                    >
                         {menuOpen ?
                              <X size={28} />
                         :    <Menu size={28} />}
                    </button>
               </motion.div>

               {menuOpen && (
                    <div className="md:hidden flex flex-col items-center gap-4 p-6 bg-background border-t">
                         <Modetoggle />
                         {role === "customer" && (
                              <Button
                                   variant={"outline"}
                                   className="border-none "
                              >
                                   <BsCart3 />
                              </Button>
                         )}
                         {role !== "admin" && (
                              <Link href="/contact">
                                   <Button
                                        variant="outline"
                                        className="border-none"
                                   >
                                        Contact
                                   </Button>
                              </Link>
                         )}

                         <Separator className="w-40 " />
                         <Link href="/" onClick={() => setMenuOpen(false)}>
                              <Button
                                   variant={"outline"}
                                   className="border-none"
                              >
                                   Home
                              </Button>
                         </Link>

                         <Separator className="w-40 " />

                         {role === "admin" && (
                              <>
                                   <Link
                                        href="/admin"
                                        onClick={() => setMenuOpen(false)}
                                   >
                                        <button className="hover:text-sky-500 transition ease-in-out">
                                             Dashboard
                                        </button>
                                   </Link>
                                   <Separator className="w-40" />
                              </>
                         )}

                         <SignedIn>
                              <SignOutButton>
                                   <Button variant="destructive">Logout</Button>
                              </SignOutButton>
                         </SignedIn>

                         <SignedOut>
                              <SignInButton mode="modal">
                                   <Button variant="default">Sign In</Button>
                              </SignInButton>
                         </SignedOut>
                    </div>
               )}
          </nav>
     );
};

export default Navbar;
