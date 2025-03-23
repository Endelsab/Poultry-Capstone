"use client";

import { motion } from "framer-motion";
import {
     Card,
     CardHeader,
     CardTitle,
     CardContent,
     CardFooter,
     CardDescription,
} from "@/components/ui/card";
import { MinusIcon, PlusIcon } from "lucide-react";
import { Button } from "./ui/button";
import { useState } from "react";
import { Label } from "./ui/label";
import { Input } from "./ui/input";
import {
     AlertDialog,
     AlertDialogAction,
     AlertDialogContent,
     AlertDialogDescription,
     AlertDialogFooter,
     AlertDialogHeader,
     AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Textarea } from "./ui/textarea";
import { PlaceOrder } from "@/app/actions/order/placeOrder";
import toast from "react-hot-toast";
import { useUser } from "@clerk/nextjs";
import { useRouter } from "next/navigation";

type Products = {
     id: string;
     productName: string;
     productSize: string;
     img: string | null;
     stock: number;
     price: number;
};

function OrderCard({ product }: { product: Products }) {
     const { user, isLoaded } = useUser();

     if (!isLoaded) return <p>cannot load user</p>;
     const userId = user?.id;

     if (!userId) {
          toast.error("User not found. Please log in.");
          return;
     }

     const [quantity, setQuantity] = useState(1);

     const [fullname, setFullname] = useState("");
     const [email, setEmail] = useState("");
     const [address, setAddress] = useState(" Brgy, Purok and Street ");

     const [open, setOpen] = useState(false);

     const [loading, setLoading] = useState(false);

     const increaseQty = () => {
          if (quantity < product.stock) setQuantity(quantity + 1);
     };

     const decreaseQty = () => {
          if (quantity > 1) setQuantity(quantity - 1);
     };

     const router = useRouter();

     const handleSubmit = async () => {
          setLoading(true);

          try {
               const result = await PlaceOrder({
                    userId: userId,
                    productId: product.id,
                    quantity: quantity,
                    fullName: fullname,
                    email: email,
                    address: address,
               });

               if (result.success) {
                    toast.success(result.message);
                    router.push("/success");
               } else {
                    toast.error(result.message);
               }
          } catch (error) {
               console.log("error in handlesubmit in order placed", error);
          } finally {
               setLoading(false);
          }
     };

     return (
          <motion.div
               initial={{ opacity: 0, scale: 0.9 }}
               animate={{ opacity: 1, scale: 1 }}
               transition={{ duration: 0.8 }}
          >
               <Card>
                    <CardHeader>
                         <motion.div
                              initial={{ opacity: 0, y: -30 }}
                              animate={{ opacity: 1, y: 0 }}
                              transition={{ delay: 0.2, duration: 0.5 }}
                         >
                              <CardTitle className="text-2xl text-emerald-400 text-center">
                                   Check-Out
                              </CardTitle>
                              <CardDescription className="text-center mt-4">
                                   Complete your order
                              </CardDescription>
                         </motion.div>
                    </CardHeader>
                    <CardContent>
                         <div className="flex flex-col gap-5">
                              <motion.div
                                   className="flex flex-col mt-5 dark:bg-gray-900 p-2 gap-3 rounded-md"
                                   initial={{ opacity: 0 }}
                                   animate={{ opacity: 1 }}
                                   transition={{ delay: 0.4, duration: 0.5 }}
                              >
                                   <h2 className="text-gray-400 text-sm">
                                        Shipping Address:
                                   </h2>
                                   <div>
                                        <span className="text-sky-400 ">
                                             {fullname} <br />
                                             {email}
                                        </span>
                                        <p className="text-sky-500">
                                             {address}
                                        </p>

                                        <Button
                                             onClick={() => setOpen(!open)}
                                             variant={"outline"}
                                             className="w-full font-semibold mt-3 p-2 hover:dark:bg-gray-800 dark:bg-slate-900"
                                        >
                                             Edit
                                        </Button>
                                   </div>
                              </motion.div>

                              <AlertDialog open={open}>
                                   <AlertDialogContent className="bg-slate-200 rounded-md dark:bg-slate-900">
                                        <AlertDialogHeader>
                                             <AlertDialogTitle>
                                                  Please add your personal
                                                  details
                                             </AlertDialogTitle>
                                             <AlertDialogDescription asChild>
                                                  <div className="flex flex-col gap-3 pt-5">
                                                       <Label
                                                            className="text-start"
                                                            htmlFor="Fullname"
                                                       >
                                                            Fullname*
                                                       </Label>
                                                       <Input
                                                            value={fullname}
                                                            onChange={(e) =>
                                                                 setFullname(
                                                                      e.target
                                                                           .value
                                                                 )
                                                            }
                                                            className="mt-2 border-gray-900 dark:border-sky-900"
                                                            id="Fullname"
                                                       />
                                                       <Label
                                                            className="text-start"
                                                            htmlFor="email"
                                                       >
                                                            Email*
                                                       </Label>
                                                       <Input
                                                            value={email}
                                                            onChange={(e) =>
                                                                 setEmail(
                                                                      e.target
                                                                           .value
                                                                 )
                                                            }
                                                            type="email"
                                                            className="mt-2 border-gray-900 dark:border-sky-900"
                                                            id="email"
                                                       />
                                                       <Label
                                                            className="text-start"
                                                            htmlFor="address"
                                                       >
                                                            Address*
                                                       </Label>
                                                       <Textarea
                                                            className="border-gray-900 dark:border-sky-900"
                                                            value={address}
                                                            onChange={(e) =>
                                                                 setAddress(
                                                                      e.target
                                                                           .value
                                                                 )
                                                            }
                                                            id="address"
                                                       />
                                                  </div>
                                             </AlertDialogDescription>
                                        </AlertDialogHeader>
                                        <AlertDialogFooter>
                                             <AlertDialogAction
                                                  onClick={() => {
                                                       setFullname(fullname);
                                                       setEmail(email);
                                                       setAddress(address);
                                                       setOpen(false);
                                                  }}
                                             >
                                                  Save
                                             </AlertDialogAction>
                                        </AlertDialogFooter>
                                   </AlertDialogContent>
                              </AlertDialog>

                              <motion.div
                                   className="flex flex-col mt-5 dark:bg-gray-900 p-2 gap-3 rounded-md"
                                   initial={{ opacity: 0, x: -50 }}
                                   animate={{ opacity: 1, x: 0 }}
                                   transition={{ delay: 0.6, duration: 0.5 }}
                              >
                                   <div className="flex justify-between text-gray-400 ">
                                        <h2>Item Shipped:</h2>
                                        <div className="flex gap-12 mr-10 ">
                                             <p className="mr-3">QTY</p>
                                             <span className="">Price</span>
                                        </div>
                                   </div>

                                   <div className="flex justify-between p-2">
                                        <div className="flex gap-5 items-center">
                                             <motion.img
                                                  className="size-24 rounded-full"
                                                  src={
                                                       product.img ??
                                                       "/small.jpg"
                                                  }
                                                  alt={product.productName}
                                                  whileHover={{ scale: 1.05 }}
                                             />
                                             <p className="text-sky-400 text-md md:text-xl mr-10">
                                                  {product.productName} -{" "}
                                                  {product.productSize}
                                             </p>
                                        </div>

                                        <div className="flex  text-sky-400 gap-7 mt-7">
                                             <div className="text-2xl flex justify-center gap-2">
                                                  <motion.div
                                                       whileTap={{ scale: 0.9 }}
                                                  >
                                                       <MinusIcon
                                                            onClick={
                                                                 decreaseQty
                                                            }
                                                            className="dark:text-white text-gray-500 hover:scale-150 size-4 mt-2 cursor-pointer"
                                                       />
                                                  </motion.div>
                                                  <span>{quantity}</span>
                                                  <motion.div
                                                       whileTap={{ scale: 0.9 }}
                                                  >
                                                       <PlusIcon
                                                            onClick={
                                                                 increaseQty
                                                            }
                                                            className="dark:text-white hover:scale-150 text-gray-500 size-4 mt-2 cursor-pointer"
                                                       />
                                                  </motion.div>
                                             </div>
                                             <span className="text-lg  md:text-2xl">
                                                  ₱ {product.price}
                                             </span>
                                        </div>
                                   </div>

                                   <motion.div
                                        whileHover={{ scale: 1.05 }}
                                        whileTap={{ scale: 0.95 }}
                                   >
                                        <Button
                                             variant="outline"
                                             className="dark:bg-gray-900 w-20 ml-4 hover:dark:bg-gray-800"
                                        >
                                             Add item
                                        </Button>
                                   </motion.div>
                                   <div className="flex flex-col ml-7 items-end text-gray-400 justify-end w-11/12">
                                        <p>Payment method - COD</p>
                                        <p className="mr-3">
                                             Subtotal - {1 + quantity - 1} item
                                        </p>
                                        <p>
                                             Total amount - ₱{" "}
                                             {product.price * quantity}
                                        </p>
                                   </div>
                              </motion.div>
                         </div>
                    </CardContent>
                    <CardFooter>
                         <motion.div
                              className="flex ml-10 justify-end w-11/12 gap-5"
                              initial={{ opacity: 0, y: 20 }}
                              animate={{ opacity: 1, y: 0 }}
                              transition={{ delay: 0.8, duration: 0.5 }}
                         >
                              <motion.button
                                   className="bg-red-600  hover:bg-red-500 hover:cursor-not-allowed   text-white py-2 px-4 rounded relative"
                                   whileHover={{ x: -500 }}
                                   whileTap={{ scale: 0.95 }}
                                   transition={{
                                        type: "spring",
                                        stiffness: 100,
                                   }}
                              >
                                   Cancel
                              </motion.button>
                              <motion.button
                                   onClick={handleSubmit}
                                   className="bg-sky-700 hover:bg-sky-600 text-white py-2 px-4 rounded"
                                   whileTap={{ scale: 0.95 }}
                                   transition={{
                                        type: "spring",
                                        stiffness: 100,
                                   }}
                              >
                                   {loading ? "Loading..." : "Place order"}
                              </motion.button>
                         </motion.div>
                    </CardFooter>
               </Card>
          </motion.div>
     );
}

export default OrderCard;
