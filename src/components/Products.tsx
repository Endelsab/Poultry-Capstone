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
import {
     ChevronLeft,
     ChevronRight,
     Edit,
     PlusIcon,
     SearchIcon,
     Trash2,
} from "lucide-react";

import { Button } from "./ui/button";

import { useQuery } from "@tanstack/react-query";
import { GetProducts } from "@/app/actions/product/getProduct";

import { motion } from "framer-motion";

export type Products = {
     id: string;
     productName: String;
     productSize: String;
     stock: number;
     price: number;
};

function Products() {
     const { data, isLoading, isError } = useQuery({
          queryKey: ["products"],
          queryFn: GetProducts,
     });

     if (isLoading) return <p className="text-center">Loading products...</p>;
     if (isError || !data?.success) {
          return (
               <p className="text-center text-red-500">
                    Error: {data?.message || "Failed to load products."}
               </p>
          );
     }

     return (
          <motion.div
               initial={{ opacity: 0, x: 50 }}
               animate={{ opacity: 1, x: 0 }}
               transition={{ duration: 0.8, ease: "easeOut", delay: 0.3 }}
          >
               <Card>
                    <CardHeader>
                         <div className="flex justify-between mr-3">
                              <CardTitle className="text-lg font-semibold">
                                   A List of products
                              </CardTitle>
                              <div className="flex justify-between gap-4">
                                   <Button className="text-white bg-emerald-700">
                                        <PlusIcon /> Add new product
                                   </Button>
                                   <div className="flex gap-2">
                                        <Input
                                             type="text"
                                             placeholder="Search product"
                                        />
                                        <Button variant={"outline"}>
                                             <SearchIcon size={"icon"} />
                                        </Button>
                                   </div>
                              </div>
                         </div>
                    </CardHeader>
                    <CardContent className="overflow-x-auto">
                         <Table className="table-fixed w-full  ">
                              <TableHeader>
                                   <TableRow>
                                        <TableHead className="w-10">
                                             #
                                        </TableHead>
                                        <TableHead className="w-60">
                                             Product Name
                                        </TableHead>
                                        <TableHead className="w-40">
                                             Size
                                        </TableHead>
                                        <TableHead className="w-40">
                                             Price
                                        </TableHead>
                                        <TableHead className="w-40">
                                             Stock
                                        </TableHead>
                                        <TableHead className="w-40">
                                             Action
                                        </TableHead>
                                   </TableRow>
                              </TableHeader>
                              <TableBody>
                                   {data?.products?.map((product, index) => (
                                        <TableRow key={product.id}>
                                             <TableCell>{index + 1}</TableCell>
                                             <TableCell>
                                                  {product.productName}
                                             </TableCell>
                                             <TableCell>
                                                  {product.productSize}
                                             </TableCell>
                                             <TableCell>
                                                  {product.price}
                                             </TableCell>
                                             <TableCell>
                                                  {product.stock}
                                             </TableCell>
                                             <TableCell>
                                                  <div className="flex gap-2 justify-end">
                                                       <Button variant="outline">
                                                            <Edit className="w-4 h-4 mr-1" />{" "}
                                                            Edit
                                                       </Button>
                                                       <Button
                                                            variant="destructive"
                                                            className="hover:bg-red-500 transition ease-in-out"
                                                       >
                                                            <Trash2 className="w-4 h-4 mr-1" />{" "}
                                                            Delete
                                                       </Button>
                                                  </div>
                                             </TableCell>
                                        </TableRow>
                                   ))}
                              </TableBody>

                              <TableFooter className="bg-transparent ">
                                   <TableRow>
                                        <TableCell
                                             colSpan={4}
                                             className="text-center "
                                        >
                                             <div className="flex  justify-start items-center gap-4 mt-2">
                                                  <Button variant="outline">
                                                       <ChevronLeft className="w-4 h-4 cursor-pointer" />
                                                  </Button>
                                                  <span className="text-sm">
                                                       page 1
                                                  </span>
                                                  <Button variant="outline">
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

export default Products;
