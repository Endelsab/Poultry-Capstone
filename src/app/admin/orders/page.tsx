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
import { BlockUser } from "@/app/actions/users/BlockUser";
import toast from "react-hot-toast";
import { GetOrder } from "@/app/actions/order/getOrder";

function Orders() {
     const [page, setPage] = useState(1);

     const { data, isLoading, isError, isFetching } = useQuery({
          queryKey: ["orders", page],
          queryFn: () => GetOrder(page, 10),
          placeholderData: keepPreviousData,
          refetchOnWindowFocus: true,
     });

     const [blocking, setBlocking] = useState(false);

     const queryClient = useQueryClient();

     const handleBlock = async (id: string) => {
          setBlocking(true);
          try {
               const result = await BlockUser(id);

               if (!result.success) {
                    toast.error(result.message);
               }
               toast.success(result.message);
               queryClient.invalidateQueries({ queryKey: ["customers"] });
          } catch (error) {
               console.log("error in handleBlock", error);
          } finally {
               setBlocking(false);
          }
     };

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
                         <div className="flex justify-between mr-3">
                              <CardTitle className="text-lg font-semibold text-sky-500">
                                   Orders
                              </CardTitle>
                              <div className="flex justify-between gap-4"></div>
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
                                                  {order.totalPrice}
                                             </TableCell>

                                             <TableCell>
                                                  <div className="flex gap-2 justify-end">
                                                       <Button
                                                            size={"sm"}
                                                            onClick={() =>
                                                                 handleBlock(
                                                                      order.id
                                                                 )
                                                            }
                                                            variant="destructive"
                                                            className={`hover:bg-red-500 transition ease-in-out `}
                                                       >
                                                            <BsFillPersonXFill />
                                                            {blocking ?
                                                                 "Declining..."
                                                            :    "Decline"}
                                                       </Button>

                                                       <Button size={"sm"}>
                                                            Approve
                                                       </Button>
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
               </Card>
          </motion.div>
     );
}

export default Orders;
