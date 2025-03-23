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
import { useState, useEffect } from "react";
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
     const router = useRouter();

     // State hooks
     const [quantity, setQuantity] = useState(1);
     const [fullname, setFullname] = useState("");
     const [email, setEmail] = useState("");
     const [address, setAddress] = useState(
          "Country, Province, Municipality, Brgy, Purok and Street "
     );
     const [open, setOpen] = useState(false);
     const [loading, setLoading] = useState(false);

     // Redirect if user is not loaded
     useEffect(() => {
          if (!isLoaded) return;
          if (!user?.id) {
               toast.error("User not found. Please log in.");
          }
     }, [isLoaded, user]);

     const increaseQty = () => {
          setQuantity((prev) => Math.min(prev + 1, product.stock));
     };

     const decreaseQty = () => {
          setQuantity((prev) => Math.max(prev - 1, 1));
     };

     const handleSubmit = async () => {
          if (!user?.id) return; // Prevent API call if no user
          setLoading(true);

          try {
               const result = await PlaceOrder({
                    userId: user.id,
                    productId: product.id,
                    quantity,
                    fullName: fullname,
                    email,
                    address,
               });

               if (result.success) {
                    toast.success(result.message);
                    router.push("/success");
               } else {
                    toast.error(result.message);
               }
          } catch (error) {
               console.error("Error placing order:", error);
               toast.error("Something went wrong.");
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
                              {/* Shipping Address */}
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
                                             onClick={() => setOpen(true)}
                                             variant="outline"
                                             className="w-full font-semibold mt-3 p-2 hover:dark:bg-gray-800 dark:bg-slate-900"
                                        >
                                             Edit
                                        </Button>
                                   </div>
                              </motion.div>

                              {/* Address Edit Modal */}
                              <AlertDialog open={open}>
                                   <AlertDialogContent>
                                        <AlertDialogHeader>
                                             <AlertDialogTitle>
                                                  Please add your personal
                                                  details
                                             </AlertDialogTitle>
                                             <AlertDialogDescription asChild>
                                                  <div className="flex flex-col gap-3 pt-5">
                                                       <Label htmlFor="Fullname">
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
                                                            id="Fullname"
                                                       />
                                                       <Label htmlFor="email">
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
                                                            id="email"
                                                       />
                                                       <Label htmlFor="address">
                                                            Address*
                                                       </Label>
                                                       <Textarea
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
                                                  onClick={() => setOpen(false)}
                                             >
                                                  Save
                                             </AlertDialogAction>
                                        </AlertDialogFooter>
                                   </AlertDialogContent>
                              </AlertDialog>

                              {/* Product Details */}
                              <motion.div className="flex flex-col dark:bg-gray-900 p-2 gap-3 rounded-md">
                                   <div className="flex justify-between">
                                        <h2>Item Shipped:</h2>
                                        <div className="flex gap-12">
                                             <p>QTY</p>
                                             <span>Price</span>
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
                                             />
                                             <p className="text-sky-400 text-sm md:text-xl">
                                                  {product.productName} -{" "}
                                                  {product.productSize}
                                             </p>
                                        </div>
                                        <div className="flex text-sky-400 gap-7">
                                             <div className="text-2xl flex gap-2">
                                                  <MinusIcon
                                                       onClick={decreaseQty}
                                                       className="cursor-pointer"
                                                  />
                                                  <span>{quantity}</span>
                                                  <PlusIcon
                                                       onClick={increaseQty}
                                                       className="cursor-pointer"
                                                  />
                                             </div>
                                             <span className="text-lg">
                                                  ₱ {product.price}
                                             </span>
                                        </div>
                                   </div>
                              </motion.div>
                         </div>
                    </CardContent>
                    <CardFooter className="flex justify-end gap-5">
                         <Button variant="destructive">Cancel</Button>
                         <Button onClick={handleSubmit} disabled={loading}>
                              {loading ? "Processing..." : "Place Order"}
                         </Button>
                    </CardFooter>
               </Card>
          </motion.div>
     );
}

export default OrderCard;
