"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Modetoggle } from "./Modetoggle";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";

import {
    SignedIn,
    SignedOut,
    SignInButton,
    SignOutButton,
    UserButton,
    useUser,
} from "@clerk/nextjs";
import { BsCart3 } from "react-icons/bs";
import OrderInvoice from "./OrderInvoice";

const Navbar = () => {
    const { user } = useUser();
    const [role, setRole] = useState<string>("");

    useEffect(() => {
        if (user) {
            const userRole = user.publicMetadata?.role as string;
            setRole(userRole || "customer");
        } else {
            setRole("");
        }
    }, [user]);

    const [menuOpen, setMenuOpen] = useState(false);

    const [orderOpen, setOrderOpen] = useState(false);

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
                                className="border-none hover:scale-105 mr-2"
                            >
                                Dashboard
                            </Button>
                        </Link>
                    )}

                    {role === "customer" && (
                        <Button
                            variant={"outline"}
                            className="border-none hover:scale-110 "
                        >
                            <BsCart3 />
                        </Button>
                    )}

                    {role === "customer" && (
                        <Button
                            onClick={() => setOrderOpen(!orderOpen)}
                            variant={"outline"}
                            className="border-none hover:scale-110 "
                        >
                            Order
                        </Button>
                    )}
                    {role !== "admin" && (
                        <Link href="/contact">
                            <Button
                                variant="outline"
                                className="border-none hover:scale-110"
                            >
                                Contact
                            </Button>
                        </Link>
                    )}

                    {role !== "admin" && (
                        <Link href="/">
                            <Button
                                variant="outline"
                                className="border-none mr-2 hover:scale-105"
                            >
                                Home
                            </Button>
                        </Link>
                    )}

                    <SignedIn>
                        <UserButton />
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
                    {menuOpen ? <X size={28} /> : <Menu size={28} />}
                </button>
            </motion.div>

            {menuOpen && (
                <motion.div
                    initial={{ opacity: 0, x: 50, scale: 0.95 }}
                    animate={{ opacity: 1, x: 0, scale: 1 }}
                    exit={{ opacity: 0, x: 50, scale: 0.95 }}
                    transition={{
                        duration: 0.3,
                        ease: "easeInOut",
                        delay: 0.2,
                    }}
                    className="md:hidden flex gap-4 flex-col  items-center   p-6  border-t shadow-lg rounded-lg"
                >
                    <Modetoggle />

                    {role === "customer" && (
                        <motion.div
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                            className="flex "
                        >
                            <Button variant="outline" className="border-none">
                                <BsCart3 />
                            </Button>
                        </motion.div>
                    )}

                    {role === "customer" && (
                        <motion.div
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                            className="flex gap-2"
                        >
                            <Button
                                onClick={() => setOrderOpen(!orderOpen)}
                                variant="outline"
                                className="border-none"
                            >
                                Order
                            </Button>
                        </motion.div>
                    )}

                    {role !== "admin" && (
                        <motion.div
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                        >
                            <Link href="/contact">
                                <Button
                                    variant="outline"
                                    className="border-none"
                                >
                                    Contact
                                </Button>
                            </Link>
                        </motion.div>
                    )}

                    <SignedIn>
                        <motion.div
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                        >
                            <SignOutButton>
                                <Button
                                    size={"sm"}
                                    variant="destructive"
                                    className=" border-none ml-2 hover:bg-red-500"
                                >
                                    Logout
                                </Button>
                            </SignOutButton>
                        </motion.div>
                    </SignedIn>

                    <SignedOut>
                        <motion.div
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                        >
                            <SignInButton mode="modal">
                                <Button variant="default">Sign In</Button>
                            </SignInButton>
                        </motion.div>
                    </SignedOut>
                </motion.div>
            )}

            <OrderInvoice
                isOpen={orderOpen}
                onClose={() => setOrderOpen(false)}
            />
        </nav>
    );
};

export default Navbar;
