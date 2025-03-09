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
import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { GetProducts } from "@/app/actions/product/getProduct";

import { motion } from "framer-motion";
import { useOptimistic, useState, useTransition } from "react";
import { DeleteProduct } from "@/app/actions/product/deleteProduct";
import toast from "react-hot-toast";
import DeleteDialog from "./DeleteDialog";
import SkeletonTable from "./SkeletonTable";

export type Products = {
     id: string;
     productName: string;
     productSize: string;
     stock: number;
     price: number;
};

function Products() {
     const [page, setPage] = useState(1);

     const { data, isLoading, isError, isFetching } = useQuery({
          queryKey: ["products", page],
          queryFn: () => GetProducts(page, 10),
          placeholderData: keepPreviousData,
     });

     const [optimisticProducts, setOptimisticProducts] = useOptimistic<
          Products[]
     >(data?.products || []);

     const [isPending, startTransition] = useTransition();

     const [showDialog, setShowDialog] = useState(false);

     const [productToDelete, setProductToDelete] = useState({
          id: "",
          productName: "",
          productSize: "",
     });

     const openDeleteDialog = (
          id: string,
          productName: string,
          productSize: string
     ) => {
          setProductToDelete({ id, productName, productSize });
          setShowDialog(true);
     };

     const closeDeleteDialog = () => {
          setProductToDelete({ id: "", productName: "", productSize: "" });
          setShowDialog(false);
     };

     const handleDelete = async (id: string) => {
          startTransition(() => {
               setOptimisticProducts((prev) =>
                    prev.filter((product) => product.id !== id)
               );
          });

          try {
               const result = await DeleteProduct(id);
               if (!result.success) {
                    toast.error(result.message);
               } else {
                    toast.success(result.message);
               }
          } catch (error) {
               console.log("error in delete product", error);
          }
          startTransition(() => {
               setOptimisticProducts(data?.products || []);
          });
     };

     if (isLoading) return <SkeletonTable />;

     if (isError || !data?.success) {
          return (
               <p className="text-center text-red-500">
                    Error: {data?.message || "Failed to load products."}
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
                                        A List of Products
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
                              <Table className="table-fixed w-full">
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
                                        {optimisticProducts.map(
                                             (product, index) => (
                                                  <TableRow key={product.id}>
                                                       <TableCell>
                                                            {(page - 1) * 10 +
                                                                 index +
                                                                 1}
                                                       </TableCell>
                                                       <TableCell>
                                                            {
                                                                 product.productName
                                                            }
                                                       </TableCell>
                                                       <TableCell>
                                                            {
                                                                 product.productSize
                                                            }
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
                                                                      onClick={() =>
                                                                           openDeleteDialog(
                                                                                product.id,
                                                                                product.productName,
                                                                                product.productSize
                                                                           )
                                                                      }
                                                                      variant="destructive"
                                                                      className={`hover:bg-red-500 transition ease-in-out ${isPending ? "cursor-not-allowed" : ""} `}
                                                                 >
                                                                      <Trash2 className="w-4 h-4 mr-1" />{" "}
                                                                      Delete
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
               <DeleteDialog
                    isOpen={showDialog}
                    onClose={closeDeleteDialog}
                    product={productToDelete}
                    handleDelete={handleDelete}
               />
          </>
     );
}

export default Products;
