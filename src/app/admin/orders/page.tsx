"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

import {
     Table,
     TableBody,
     TableCell,
     TableFooter,
     TableHead,
     TableHeader,
     TableRow,
} from "@/components/ui/table";
import { ChevronLeft, ChevronRight } from "lucide-react";

import {
     keepPreviousData,
     useQuery,
     useQueryClient,
} from "@tanstack/react-query";

import { motion } from "framer-motion";
import { useState } from "react";

import { Button } from "@/components/ui/button";
import SkeletonTable from "@/components/SkeletonTable";

import { BsFillPersonXFill } from "react-icons/bs";

import toast from "react-hot-toast";
import { GetOrder } from "@/app/actions/order/getOrder";

import {
     Select,
     SelectContent,
     SelectGroup,
     SelectItem,
     SelectLabel,
     SelectTrigger,
     SelectValue,
} from "@/components/ui/select";
import { ApproveOrder } from "@/app/actions/order/approvedOrder";
import SchedCard from "@/components/SchedCard";
import { OrderReceived } from "@/app/actions/order/orderRecieve";

function Orders() {
     const [page, setPage] = useState(1);

     const [status, setStatus] = useState("");

     const { data, isLoading, isError, isFetching } = useQuery({
          queryKey: ["orders", page, status],
          queryFn: () => GetOrder(page, 10, status),
          placeholderData: keepPreviousData,
          refetchOnWindowFocus: true,
     });

     console.log("status here : ", status);

     const [loading, setLoading] = useState(false);

     const queryClient = useQueryClient();

     const handleApprove = async (orderId: string) => {
          setLoading(true);
          try {
               const result = await ApproveOrder(orderId);

               if (result.success) {
                    toast.success(result.message);
                    queryClient.invalidateQueries({ queryKey: ["orders"] });
               } else {
                    toast.error(result.message);
               }
          } catch (error) {
               console.log("error in handleApprove", error);
          } finally {
               setLoading(false);
          }
     };

     const handleReceive = async (orderId: string) => {
          setLoading(true);

          try {
               const result = await OrderReceived(orderId);

               if (result.success) {
                    toast.success(result.message);
                    queryClient.invalidateQueries({ queryKey: ["orders"] });
               } else {
                    toast.error(result.message);
               }
          } catch (error) {
               console.log("error in handleReceive", error);
          } finally {
               setLoading(false);
          }
     };

     const [orderId, setOrderId] = useState("");

     if (isLoading) return <SkeletonTable />;

     if (isError || !data?.success) {
          return (
               <p className="text-center text-red-500">
                    Error: {data?.message || "Failed to load customers."}
               </p>
          );
     }

     return (
          <motion.div
               initial={{ opacity: 0, x: 50 }}
               animate={{ opacity: 1, x: 0 }}
               transition={{ duration: 0.5, ease: "easeOut", delay: 0.3 }}
          >
               <Card>
                    <CardHeader>
                         <div className="flex gap-4">
                              <CardTitle className="text-lg font-semibold text-sky-500">
                                   Orders
                              </CardTitle>
                              <div className="flex justify-between gap-4">
                                   <Select
                                        onValueChange={(value) =>
                                             setStatus(value)
                                        }
                                   >
                                        <SelectTrigger className="w-[180px]">
                                             <SelectValue placeholder="Select a status" />
                                        </SelectTrigger>
                                        <SelectContent>
                                             <SelectGroup>
                                                  <SelectLabel className="text-gray-500">
                                                       Status
                                                  </SelectLabel>
                                                  <SelectItem value="pending">
                                                       Pending
                                                  </SelectItem>
                                                  <SelectItem value="approved">
                                                       Approved
                                                  </SelectItem>
                                                  <SelectItem value="delivery">
                                                       Delivery
                                                  </SelectItem>
                                                  <SelectItem value="declined">
                                                       Declined
                                                  </SelectItem>
                                                  <SelectItem value="history">
                                                       History
                                                  </SelectItem>
                                             </SelectGroup>
                                        </SelectContent>
                                   </Select>
                              </div>
                         </div>
                    </CardHeader>
                    <CardContent className="overflow-x-auto">
                         <Table className="table-fixed w-full">
                              <TableHeader>
                                   <TableRow className="overflow-x-clip">
                                        <TableHead className="w-5">#</TableHead>
                                        <TableHead className="w-[130px] ml-2">
                                             Fullname
                                        </TableHead>
                                        <TableHead className="w-[200px] ">
                                             Email
                                        </TableHead>

                                        <TableHead className="w-[200px]">
                                             Address
                                        </TableHead>
                                        <TableHead className="w-[100px] text-center">
                                             Product name
                                        </TableHead>
                                        <TableHead className="w-[70px]">
                                             Size
                                        </TableHead>
                                        <TableHead className="w-[70px]">
                                             Quantity
                                        </TableHead>
                                        <TableHead className="w-[100px] text-center  ">
                                             Total amount
                                        </TableHead>
                                        <TableHead className="w-[180px] text-center">
                                             Action
                                        </TableHead>
                                   </TableRow>
                              </TableHeader>
                              <TableBody className="text-sm">
                                   {data?.orders?.map((order, index) => (
                                        <TableRow key={order.id}>
                                             <TableCell>
                                                  {(page - 1) * 10 + index + 1}.
                                             </TableCell>
                                             <TableCell>
                                                  {order.fullName}
                                             </TableCell>
                                             <TableCell>
                                                  {order.email}
                                             </TableCell>
                                             <TableCell>
                                                  {order.address}
                                             </TableCell>
                                             <TableCell className="text-center">
                                                  {order.product.productName}
                                             </TableCell>
                                             <TableCell>
                                                  {order.product.productSize}
                                             </TableCell>
                                             <TableCell className="text-center">
                                                  {order.quantity}
                                             </TableCell>
                                             <TableCell className="text-center">
                                                  ₱ {order.totalPrice}
                                             </TableCell>

                                             <TableCell>
                                                  <div className="flex gap-2 justify-center">
                                                       {order.status ===
                                                            "PENDING" && (
                                                            <>
                                                                 {" "}
                                                                 <Button
                                                                      size={
                                                                           "sm"
                                                                      }
                                                                      variant="destructive"
                                                                      className={`hover:bg-red-500 transition ease-in-out `}
                                                                 >
                                                                      <BsFillPersonXFill />
                                                                      Decline
                                                                 </Button>
                                                                 <Button
                                                                      onClick={() =>
                                                                           handleApprove(
                                                                                order.id
                                                                           )
                                                                      }
                                                                      className={`${loading ? "cursor-not-allowed disabled" : ""} hover:bg-sky-500 bg-sky-600 text-white font-sans `}
                                                                      size={
                                                                           "sm"
                                                                      }
                                                                 >
                                                                      Approve
                                                                 </Button>
                                                            </>
                                                       )}
                                                       {order.status ===
                                                            "APPROVED" && (
                                                            <>
                                                                 {" "}
                                                                 <Button
                                                                      onClick={() =>
                                                                           setOrderId(
                                                                                order.id
                                                                           )
                                                                      }
                                                                      size={
                                                                           "sm"
                                                                      }
                                                                      className=" text-center bg-sky-600 hover:bg-sky-400 text-white"
                                                                 >
                                                                      Schedule
                                                                 </Button>{" "}
                                                            </>
                                                       )}

                                                       {order.status ===
                                                            "DELIVERY" && (
                                                            <>
                                                                 {" "}
                                                                 <span>
                                                                      Delivery -{" "}
                                                                      {
                                                                           order.deliverySched
                                                                      }
                                                                 </span>
                                                                 <Button
                                                                      onClick={() =>
                                                                           handleReceive(
                                                                                order.id
                                                                           )
                                                                      }
                                                                      className={`bg-yellow-600 mt-3 text-black font-semibold  ${loading ? "cursor-not-allowed disabled:bg-gray-800" : ""}  `}
                                                                      size={
                                                                           "sm"
                                                                      }
                                                                 >
                                                                      Order
                                                                      recieved
                                                                 </Button>
                                                            </>
                                                       )}

                                                       {order.status ===
                                                            "HISTORY" && (
                                                            <span className="text-emerald-500">
                                                                 Order received{" "}
                                                                 <br />
                                                                 {
                                                                      order.deliverySched
                                                                 }
                                                            </span>
                                                       )}

                                                       {order.status ===
                                                            "DECLINED" && (
                                                            <Button
                                                                 disabled
                                                                 size={"sm"}
                                                                 variant={
                                                                      "outline"
                                                                 }
                                                                 className=" bg-gray-900"
                                                            >
                                                                 Declined order
                                                            </Button>
                                                       )}
                                                  </div>
                                             </TableCell>
                                        </TableRow>
                                   ))}
                              </TableBody>

                              <TableFooter className="bg-transparent">
                                   <TableRow>
                                        <TableCell
                                             colSpan={6}
                                             className="text-center"
                                        >
                                             <div className="flex justify-start items-center gap-4 mt-2">
                                                  <Button
                                                       variant="outline"
                                                       onClick={() =>
                                                            setPage((prev) =>
                                                                 Math.max(
                                                                      prev - 1,
                                                                      1
                                                                 )
                                                            )
                                                       }
                                                       disabled={
                                                            page === 1 ||
                                                            isFetching
                                                       }
                                                  >
                                                       <ChevronLeft className="w-4 h-4 cursor-pointer" />
                                                  </Button>
                                                  <span className="text-sm">
                                                       Page {page}
                                                  </span>
                                                  <Button
                                                       variant="outline"
                                                       onClick={() =>
                                                            setPage(
                                                                 (prev) =>
                                                                      prev + 1
                                                            )
                                                       }
                                                       disabled={
                                                            !data?.hasMore ||
                                                            isFetching
                                                       }
                                                  >
                                                       <ChevronRight className="w-4 h-4 cursor-pointer" />
                                                  </Button>
                                             </div>
                                        </TableCell>
                                   </TableRow>
                              </TableFooter>
                         </Table>
                    </CardContent>

                    <SchedCard
                         isOpen={!!orderId}
                         onClose={() => setOrderId("")}
                         orderId={orderId}
                    />
               </Card>
          </motion.div>
     );
}

export default Orders;
