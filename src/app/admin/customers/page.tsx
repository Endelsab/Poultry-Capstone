"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
     Table,
     TableBody,
     TableCell,
     TableFooter,
     TableHead,
     TableHeader,
     TableRow,
} from "@/components/ui/table";
import { ChevronLeft, ChevronRight, SearchIcon } from "lucide-react";

import {
     keepPreviousData,
     useQuery,
     useQueryClient,
} from "@tanstack/react-query";

import { motion } from "framer-motion";
import { useState } from "react";

import { useDebounce } from "use-debounce";
import { Button } from "@/components/ui/button";
import SkeletonTable from "@/components/SkeletonTable";
import { GetUsers } from "@/app/actions/users/GetUsers";
import { BsFillPersonXFill } from "react-icons/bs";
import { BlockUser } from "@/app/actions/users/BlockUser";
import toast from "react-hot-toast";

function Customers() {
     const [page, setPage] = useState(1);

     const [searchTerm, setSearchTerm] = useState("");
     const [debouncedSearch] = useDebounce(searchTerm, 500);

     const { data, isLoading, isError, isFetching } = useQuery({
          queryKey: ["customers", page, debouncedSearch],
          queryFn: () => GetUsers(page, 10, debouncedSearch),
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
          <>
               <motion.div
                    initial={{ opacity: 0, x: 50 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5, ease: "easeOut", delay: 0.3 }}
               >
                    <Card>
                         <CardHeader>
                              <div className="flex justify-between mr-3">
                                   <CardTitle className="text-lg font-semibold">
                                        A List of Customers
                                   </CardTitle>
                                   <div className="flex justify-between gap-4">
                                        <div className="flex gap-2">
                                             <Input
                                                  type="text"
                                                  placeholder="Search customer"
                                                  value={searchTerm}
                                                  onChange={(e) =>
                                                       setSearchTerm(
                                                            e.target.value
                                                       )
                                                  }
                                             />
                                             <Button variant={"outline"}>
                                                  <SearchIcon size={"icon"} />
                                             </Button>
                                        </div>
                                   </div>
                              </div>
                         </CardHeader>
                         <CardContent className="overflow-x-auto">
                              <Table className="table-fixed w-full">
                                   <TableHeader>
                                        <TableRow>
                                             <TableHead className="w-10">
                                                  #
                                             </TableHead>
                                             <TableHead className="w-80">
                                                  Username
                                             </TableHead>
                                             <TableHead className="w-80">
                                                  Email address
                                             </TableHead>

                                             <TableHead className="w-[100px] text-center">
                                                  Action
                                             </TableHead>
                                        </TableRow>
                                   </TableHeader>
                                   <TableBody>
                                        {data?.allCustomers?.map(
                                             (customer, index) => (
                                                  <TableRow key={customer.id}>
                                                       <TableCell>
                                                            {(page - 1) * 10 +
                                                                 index +
                                                                 1}
                                                       </TableCell>
                                                       <TableCell>
                                                            {customer.username}
                                                       </TableCell>
                                                       <TableCell>
                                                            {customer.email}
                                                       </TableCell>

                                                       <TableCell>
                                                            <div className="flex gap-2 justify-end">
                                                                 <Button size={"sm"}
                                                                      onClick={() =>
                                                                           handleBlock(
                                                                                customer.id
                                                                           )
                                                                      }
                                                                      variant="destructive"
                                                                      className={`hover:bg-red-500 transition ease-in-out `}
                                                                 >
                                                                      <BsFillPersonXFill />
                                                                      {(
                                                                           blocking
                                                                      ) ?
                                                                           "Blocking..."
                                                                      :    "Block"
                                                                      }
                                                                 </Button>
                                                            </div>
                                                       </TableCell>
                                                  </TableRow>
                                             )
                                        )}
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
                                                                 setPage(
                                                                      (prev) =>
                                                                           Math.max(
                                                                                prev -
                                                                                     1,
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
                                                                           prev +
                                                                           1
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
          </>
     );
}

export default Customers;
