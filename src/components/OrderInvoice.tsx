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
import { useQuery } from "@tanstack/react-query";
import SkeletonTable from "./SkeletonTable";

type OrderInvoiceType = {
     isOpen: boolean;
     onClose: () => void;
};

function OrderInvoice({ isOpen, onClose }: OrderInvoiceType) {
     const { data, isLoading, isError } = useQuery({
          queryKey: ["orderHistory"],
          queryFn: () => OrderHistory(),

          refetchOnWindowFocus: true,
     });

     if (isLoading) return <SkeletonTable />;
     if (isError) return <p>Cannot fetch data</p>;

     return (
          <AlertDialog open={isOpen} onOpenChange={onClose}>
               <AlertDialogContent className="max-w-md bg-white dark:bg-gray-900">
                    <AlertDialogHeader>
                         <AlertDialogTitle className="text-center">
                              Order History
                         </AlertDialogTitle>
                    </AlertDialogHeader>

                    <div className="max-h-[400px] overflow-y-auto px-2">
                         {data?.order.map(
                              (
                                   order,
                                   index // Example: 10 orders for testing
                              ) => (
                                   <Card key={index} className="w-full mt-5">
                                        <CardHeader>
                                             <CardTitle className="text-gray-400">
                                                  Order Invoice -{" "}
                                                  {order.deliverySched}
                                             </CardTitle>
                                        </CardHeader>
                                        <CardContent>
                                             <div className="flex text-sm justify-between mt-4 w-full items-center">
                                                  <div className="flex flex-col ">
                                                       <Label
                                                            htmlFor="item "
                                                            className="text-gray-400"
                                                       >
                                                            Item
                                                       </Label>
                                                       <p
                                                            id="item"
                                                            className="mt-5"
                                                       >
                                                            {
                                                                 order.product
                                                                      .productName
                                                            }
                                                            {
                                                                 order.product
                                                                      .productSize
                                                            }
                                                       </p>
                                                  </div>

                                                  <div>
                                                       <p className="text-gray-400">
                                                            Qty{" "}
                                                       </p>
                                                       <p className="text-center mt-5">
                                                            {order.quantity}
                                                       </p>
                                                  </div>
                                                  <div>
                                                       <p className="text-gray-400">
                                                            Total Amount{" "}
                                                       </p>
                                                       <p className="ml-5 mt-5">
                                                            ₱ {order.totalPrice}
                                                       </p>
                                                  </div>
                                                  <div>
                                                       <p className="ml-7 mb-5 text-gray-400">
                                                            Status{" "}
                                                       </p>
                                                       {order.status ===
                                                            "PENDING" && (
                                                            <p className="text-gray-500">
                                                                 Pending
                                                            </p>
                                                       )}

                                                       {order.status ===
                                                            "APPROVED" && (
                                                            <p className="text-sky-500">
                                                                 Approved -
                                                                 waiting for
                                                                 delivery
                                                            </p>
                                                       )}
                                                       {order.status ===
                                                            "DELIVERY" && (
                                                            <p className="text-orange-500">
                                                                 Your item is
                                                                 out for
                                                                 delivery
                                                            </p>
                                                       )}

                                                       {order.status ===
                                                            "HISTORY" && (
                                                            <p className="text-emerald-500">
                                                                 Order received
                                                            </p>
                                                       )}
                                                       {order.status ===
                                                            "DECLINED" && (
                                                            <p className="text-red-500">
                                                                 Your order is
                                                                 not approved.
                                                            </p>
                                                       )}
                                                  </div>
                                             </div>
                                        </CardContent>
                                   </Card>
                              )
                         )}
                    </div>

                    <AlertDialogFooter className="flex items-end">
                         <Button
                              className="mr-8 text-black bg-sky-600 hover:bg-sky-500"
                              onClick={() => onClose()}
                         >
                              Go back
                         </Button>
                    </AlertDialogFooter>
               </AlertDialogContent>
          </AlertDialog>
     );
}

export default OrderInvoice;
