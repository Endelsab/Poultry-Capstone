"use client";

import { useRouter } from "next/navigation";
import {
    Card,
    CardContent,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { SignedIn, SignOutButton } from "@clerk/nextjs";
import { Button } from "./ui/button";
import { motion } from "framer-motion";
import { FaUsers, FaShoppingCart, FaChartLine } from "react-icons/fa";
import { TbEggs } from "react-icons/tb";

export default function Sidebar() {
    const router = useRouter();

    const menuItems = [
        { name: "Products", icon: <TbEggs />, path: "/admin/products" },

        {
            name: "Orders",
            icon: <FaShoppingCart />,
            path: "/admin/orders",
        },
        { name: "Sales", icon: <FaChartLine />, path: "/admin" },
        {
            name: "Customers",
            icon: <FaUsers />,
            path: "/admin/customers",
        },
    ];

    return (
        <motion.div
            className="size-[200px]"
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: "easeOut", delay: 0.3 }}
        >
            <Card className="flex flex-col   shadow-lg rounded-2xl">
                <CardHeader>
                    <CardTitle className="text-center text-xl font-semibold">
                        Menu
                    </CardTitle>
                </CardHeader>

                <CardContent className="w-full">
                    <div className="flex flex-col items-center gap-4 mt-4 w-full">
                        {menuItems.map((item, index) => (
                            <motion.div
                                key={index}
                                className="flex items-center gap-3 w-full px-4 py-2 text-lg cursor-pointer rounded-lg transition-all "
                                whileTap={{ scale: 0.95 }}
                                onClick={() => router.push(item.path)}
                            >
                                <span className="text-sky-600 text-xl">
                                    {item.icon}
                                </span>
                                <span className="flex-grow hover:text-emerald-500 transition ease-out duration-200">
                                    {item.name}
                                </span>
                            </motion.div>
                        ))}
                    </div>
                </CardContent>

                <CardFooter className="w-full flex justify-center mt-4">
                    <SignedIn>
                        <SignOutButton>
                            <motion.div
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                className="w-full"
                            >
                                <Button
                                    variant="destructive"
                                    className="w-full hover:bg-red-500"
                                >
                                    Logout
                                </Button>
                            </motion.div>
                        </SignOutButton>
                    </SignedIn>
                </CardFooter>
            </Card>
        </motion.div>
    );
}
