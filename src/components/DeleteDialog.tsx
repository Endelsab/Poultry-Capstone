"use client";

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
import { Button } from "./ui/button";

type DeleteDialogProps = {
     isOpen: boolean;
     onClose: () => void;
     product: {
          id: string;
          productName: string;
          productSize: string;
     };

     handleDelete: (id: string) => void;
};

const DeleteDialog = ({
     isOpen,
     onClose,
     product,
     handleDelete,
}: DeleteDialogProps) => {
     return (
          <div className="flex items-center justify-center">
               <AlertDialog open={isOpen} onOpenChange={onClose}>
                    <AlertDialogContent className="bg-white rounded-md shadow-md dark:bg-gray-900">
                         <AlertDialogHeader>
                              <AlertDialogTitle className="text-red-500 text-sm">
                                   Are you sure you want to delete ?
                              </AlertDialogTitle>
                              <AlertDialogDescription className="text-2xl text-black dark:text-white">
                                   {product.productName} - {product.productSize}
                              </AlertDialogDescription>
                         </AlertDialogHeader>
                         <AlertDialogFooter>
                              <AlertDialogCancel onClick={onClose}>
                                   Cancel
                              </AlertDialogCancel>
                              <AlertDialogAction className="bg-red-900" asChild>
                                   <Button
                                        className="hover:bg-red-500 text-white font-semibold"
                                        variant={"destructive"}
                                        onClick={() => handleDelete(product.id)}
                                   >
                                        Confirm
                                   </Button>
                              </AlertDialogAction>
                         </AlertDialogFooter>
                    </AlertDialogContent>
               </AlertDialog>
          </div>
     );
};

export default DeleteDialog;
