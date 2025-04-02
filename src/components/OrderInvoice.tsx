"use client";

import { OrderHistory } from "@/app/actions/order/orderHistory";
import {
     AlertDialog,
     AlertDialogContent,
     AlertDialogFooter,
     AlertDialogHeader,
     AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import SkeletonTable from "./SkeletonTable";
import { format } from "date-fns";
import { useEffect } from "react";
import { motion } from "framer-motion";

import toast from "react-hot-toast";
import { CancelOrder } from "@/app/actions/order/cancelOrder";

type OrderInvoiceType = {
     isOpen: boolean;
     onClose: () => void;
};

function OrderInvoice({ isOpen, onClose }: OrderInvoiceType) {
     const { data, isLoading, isError, refetch } = useQuery({
          queryKey: ["orderHistory"],
          queryFn: () => OrderHistory(),
     });

     const queryClient = useQueryClient();



     const handleCancel = async (id: string) => {
          try {
               const res = await CancelOrder(id)

               if (res.success) {
                    toast.success("Order Cancelled")
                    queryClient.invalidateQueries({ queryKey: ["orderHistory"] });

               } else {
                    toast.error(res.message)
               }

          } catch (error) {
               console.log("Error in handleCancel", error)
          }
     }

     useEffect(() => {
          if (isOpen) {
               refetch();
          }
     }, [isOpen, refetch]);

     if (isLoading) return <SkeletonTable />;
     if (isError) return <p>Cannot fetch data</p>;

     return (
          <AlertDialog open={isOpen} onOpenChange={onClose}>
               <AlertDialogContent className="max-w-lg bg-white dark:bg-gray-900">
                    <AlertDialogHeader>
                         <AlertDialogTitle className="text-center">
                              Order History
                         </AlertDialogTitle>
                    </AlertDialogHeader>

                    <div className="max-h-[400px] overflow-y-auto px-2">
                         {data?.order.map((order, index) => (
                              <motion.div
                                   key={index}
                                   initial={{ opacity: 0, y: 20 }}
                                   animate={{ opacity: 1, y: 0 }}
                                   transition={{
                                        duration: 0.3,
                                        delay: index * 0.1,
                                   }}
                              >
                                   <Card className="w-full mt-5">
                                        <CardHeader>
                                             <CardTitle className="text-gray-400 text-center">
                                                  Order Invoice -{" "}
                                                  {format(
                                                       new Date(
                                                            order.createdAt
                                                       ),
                                                       "MMMM dd, yyyy"
                                                  )}
                                             </CardTitle>
                                        </CardHeader>
                                        <CardContent>
                                             <div className="grid grid-cols-1 md:grid-cols-4 gap-4 text-sm">
                                                  {/* Item Column */}
                                                  <div className="flex flex-col items-center sm:items-start">
                                                       <Label className="text-gray-400">
                                                            Item
                                                       </Label>
                                                       <p className="font-medium text-center sm:text-left mt-1">
                                                            {
                                                                 order.product
                                                                      .productName
                                                            }{" "}
                                                            (
                                                            {
                                                                 order.product
                                                                      .productSize
                                                            }
                                                            )
                                                       </p>
                                                  </div>

                                                  <div className="flex flex-col items-center">
                                                       <Label className="text-gray-400">
                                                            Price
                                                       </Label>
                                                       <p className="mt-1">
                                                            {order.product.price}
                                                       </p>
                                                  </div>

                                                  {/* Quantity Column */}
                                                  <div className="flex flex-col items-center">
                                                       <Label className="text-gray-400">
                                                            Qty
                                                       </Label>
                                                       <p className="mt-1">
                                                            {order.quantity}
                                                       </p>
                                                  </div>

                                                  {/* Total Amount Column */}
                                                  <div className="flex flex-col items-center">
                                                       <Label className="text-gray-400">
                                                            Total Amount
                                                       </Label>
                                                       <p className="mt-1 font-semibold md:mr-10">
                                                            ₱ {order.totalPrice}
                                                       </p>
                                                  </div>

                                                  {/* Status Column */}
                                                  <div className="flex flex-col items-center sm:items-start">
                                                       <Label className="text-gray-400">
                                                            Status
                                                       </Label>
                                                       <div className="mt-1 text-center sm:text-left">
                                                            {order.status ===
                                                                 "PENDING" && (
                                                                      <div className="flex flex-col gap-1">
                                                                           <span className="text-gray-500">
                                                                                Pending
                                                                           </span>

                                                                           <Button onClick={() => handleCancel(order.id)} size={"sm"} variant={"destructive"}>
                                                                                Cancel
                                                                           </Button>

                                                                      </div>

                                                                 )}
                                                            {order.status ===
                                                                 "CANCELLED" && (
                                                                      <span className="text-red-500">
                                                                           Cancelled
                                                                      </span>
                                                                 )}

                                                            {order.status ===
                                                                 "APPROVED" && (
                                                                      <span className="text-sky-500">
                                                                           Approved -
                                                                           waiting
                                                                           for
                                                                           delivery
                                                                      </span>
                                                                 )}
                                                            {order.status ===
                                                                 "DELIVERY" && (
                                                                      <span className="text-orange-500">
                                                                           Out for
                                                                           delivery -{" "}
                                                                           {
                                                                                order.deliverySched
                                                                           }
                                                                      </span>
                                                                 )}
                                                            {order.status ===
                                                                 "HISTORY" && (
                                                                      <span className="text-emerald-500 text-sm">
                                                                           Order
                                                                           received{" "}
                                                                           <br />{" "}
                                                                           {
                                                                                order.deliverySched
                                                                           }
                                                                      </span>
                                                                 )}
                                                            {order.status ===
                                                                 "DECLINED" && (
                                                                      <span className="text-red-500">
                                                                           Order not
                                                                           approved.
                                                                      </span>
                                                                 )}
                                                       </div>
                                                  </div>
                                             </div>
                                        </CardContent>
                                   </Card>
                              </motion.div>
                         ))}
                    </div>

                    <AlertDialogFooter className="flex items-end">
                         <Button
                              className="w-full sm:w-auto text-white bg-sky-600 hover:bg-sky-500"
                              onClick={onClose}
                         >
                              Go back
                         </Button>
                    </AlertDialogFooter>
               </AlertDialogContent>
          </AlertDialog>
     );
}

export default OrderInvoice;
