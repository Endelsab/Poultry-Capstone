import { Products } from "./Products";
import { Input } from "@/components/ui/input";
import {
     AlertDialog,
     AlertDialogAction,
     AlertDialogCancel,
     AlertDialogContent,
     AlertDialogDescription,
     AlertDialogFooter,
     AlertDialogHeader,
     AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { useState, useEffect } from "react";
import { UpdateProduct } from "@/app/actions/product/updateProduct";
import toast from "react-hot-toast";
import { useQueryClient } from "@tanstack/react-query";

function UpdateProductCard({
     product,
     onClose,
     isOpen,
}: {
     product: Products;
     onClose: () => void;
     isOpen: boolean;
}) {
     const [productName, setProductName] = useState(product.productName);
     const [productSize, setProductSize] = useState(product.productSize);
     const [stock, setStock] = useState(product.stock);
     const [price, setPrice] = useState(product.price);

     const [isUpdating, setIsUpdating] = useState(false);

     useEffect(() => {
          setProductName(product.productName);
          setProductSize(product.productSize);
          setStock(product.stock);
          setPrice(product.price);
     }, [product]);

     const queryClient = useQueryClient();

     const handleUpdate = async () => {
          setIsUpdating(true);

          const result = await UpdateProduct("", {
               productId: product.id,
               productName,
               productSize,
               stock,
               price,
          });

          if (result.success) {
               toast.success(result.message);
               queryClient.invalidateQueries({ queryKey: ["products"] });
               onClose();
          } else {
               toast.error(result.message);
          }

          setIsUpdating(false);
     };

     return (
          <AlertDialog open={isOpen} onOpenChange={onClose}>
               <AlertDialogContent className="bg-white shadow-lg rounded-lg dark:bg-gray-900">
                    <AlertDialogHeader>
                         <AlertDialogTitle className="text-center text-slate-900 dark:text-emerald-500 ">
                              Update Product
                         </AlertDialogTitle>
                         <AlertDialogDescription className="text-center">
                              Modify the product details below.
                         </AlertDialogDescription>
                    </AlertDialogHeader>
                    <div className="grid gap-4 py-4">
                         <div>
                              <label className="block text-sm font-medium text-gray-700">
                                   Product Name
                              </label>
                              <Input
                                   type="text"
                                   value={productName}
                                   onChange={(e) =>
                                        setProductName(e.target.value)
                                   }
                                   placeholder="Enter product name"
                              />
                         </div>

                         <div>
                              <label className="block text-sm font-medium text-gray-700">
                                   Product Size
                              </label>
                              <Input
                                   type="text"
                                   value={productSize}
                                   onChange={(e) =>
                                        setProductSize(e.target.value)
                                   }
                                   placeholder="Enter product size"
                              />
                         </div>

                         <div>
                              <label className="block text-sm font-medium text-gray-700">
                                   Stock
                              </label>
                              <Input
                                   type="number"
                                   value={stock}
                                   onChange={(e) =>
                                        setStock(Number(e.target.value))
                                   }
                                   placeholder="Enter stock quantity"
                              />
                         </div>

                         <div>
                              <label className="block text-sm font-medium text-gray-700">
                                   Price
                              </label>
                              <Input
                                   type="number"
                                   value={price}
                                   onChange={(e) =>
                                        setPrice(Number(e.target.value))
                                   }
                                   placeholder="Enter price"
                              />
                         </div>
                    </div>

                    <AlertDialogFooter>
                         <AlertDialogCancel disabled={isUpdating}>
                              Cancel
                         </AlertDialogCancel>
                         <AlertDialogAction
                              className=" hover:bg-emerald-600"
                              onClick={handleUpdate}
                              disabled={isUpdating}
                         >
                              {isUpdating ? "Updating..." : "Save changes "}
                         </AlertDialogAction>
                    </AlertDialogFooter>
               </AlertDialogContent>
          </AlertDialog>
     );
}

export default UpdateProductCard;
