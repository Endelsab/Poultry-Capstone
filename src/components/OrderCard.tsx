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
import { useQueryClient } from "@tanstack/react-query";

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

     const [quantity, setQuantity] = useState(1);

     const [fullname, setFullname] = useState("");

     const [address, setAddress] = useState(" Brgy, Purok and Street ");

     const [open, setOpen] = useState(false);

     const [loading, setLoading] = useState(false);

     const router = useRouter();

     const queryClient = useQueryClient();

     if (!isLoaded) return <p>cannot load user</p>;
     const userId = user?.id;

     if (!userId) {
          toast.error("User not found. Please log in.");
          return;
     }

     const increaseQty = () => {
          if (quantity < product.stock) {
               setQuantity(quantity + 1);
          } else {
               toast.error("Insufficient stock");
          }
     };

     const decreaseQty = () => {
          if (quantity > 1) setQuantity(quantity - 1);
     };

     const handleSubmit = async () => {
          setLoading(true);

          try {
               const result = await PlaceOrder({
                    userId: userId,
                    productId: product.id,
                    quantity: quantity,
                    fullName: fullname,

                    address: address,
               });

               if (result.success) {
                    toast.success(result.message);
                    queryClient.invalidateQueries({ queryKey: ["orders"] });

                    router.push("/success");
               } else {
                    toast.error("Add your address.");
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
                                             {fullname}
                                        </span>
                                        <p className="text-sky-400">
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
                                             <AlertDialogTitle className="text-center">
                                                  Complete your details
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

                                                       setAddress(address);
                                                       setOpen(false);
                                                  }}
                                             >
                                                  Save
                                             </AlertDialogAction>
                                        </AlertDialogFooter>
                                   </AlertDialogContent>
                              </AlertDialog>
                         </div>

                         <Card className="w-full mt-5 dark:bg-gray-900 max-w-lg mx-auto    shadow-lg rounded-md ">
                              {/* Header */}
                              <CardHeader className="border-b pb-3 w-full ">
                                   <div className="flex justify-between md:gap-16 text-gray-500 text-sm md:text-base">
                                        <h2>Item Shipped</h2>
                                        <h2>QTY</h2>
                                        <h2>Price</h2>
                                   </div>
                              </CardHeader>
                              {/* Product Details */}
                              <CardContent className=" gap-4 py-4 ">
                                   <div className="flex justify-between  w-[280px] md:w-[350px]  text-center ">
                                        <div>
                                             <p className="text-sm md:text-lg font-semibold text-sky-500">
                                                  {product.productName} -{" "}
                                                  {product.productSize}
                                             </p>
                                        </div>

                                        <div className="flex ml-10 gap-2  ">
                                             <MinusIcon
                                                  onClick={decreaseQty}
                                                  className="size-4 md:size-5 mt-1 hover:scale-125"
                                             />

                                             <p className="text-xl md:text-2xl text-sky-400  ">
                                                  {quantity}
                                             </p>

                                             <PlusIcon
                                                  onClick={increaseQty}
                                                  className="size-4 md:size-5 mt-1 hover:scale-125"
                                             />
                                        </div>

                                        <div>
                                             {" "}
                                             <p className="md:text-xl text-sm text-sky-500 font-bold ml-7">
                                                  ₱ {product.price}
                                             </p>
                                        </div>
                                   </div>
                              </CardContent>
                              <CardFooter className="flex mt-7   flex-col items-center  border-t pt-3 text-gray-500 text-sm md:text-base">
                                   <p>
                                        Payment Method -{" "}
                                        <span className="font-medium">COD</span>
                                   </p>
                                   <p>Subtotal - {quantity} item(s)</p>
                                   <p className="text-lg font-semibold">
                                        Total Amount - ₱{" "}
                                        {product.price * quantity}
                                   </p>
                              </CardFooter>
                         </Card>
                    </CardContent>
                    <CardFooter>
                         <motion.div
                              className="flex mb-4 ml-10 justify-end w-11/12 gap-5"
                              initial={{ opacity: 0, y: 20 }}
                              animate={{ opacity: 1, y: 0 }}
                              transition={{ delay: 0.8, duration: 0.5 }}
                         >
                              <motion.button
                                   onClick={() => router.push("/")}
                                   className="bg-red-600   hover:bg-red-500   text-white py-2 px-4 rounded relative"
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
