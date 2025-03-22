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
import { Calendar } from "./ui/calendar";
import React from "react";
import { DeliverySched } from "@/app/actions/order/deliverySched";
import toast from "react-hot-toast";
import { format } from "date-fns";
import { useQueryClient } from "@tanstack/react-query";

type SchedCardType = {
     isOpen: boolean;
     onClose: () => void;
     orderId: string;
};

function SchedCard({ isOpen, onClose, orderId }: SchedCardType) {
     const [date, setDate] = React.useState<Date>(new Date());

     const queryClient = useQueryClient();

     const handleConfirm = async () => {
          try {
               const selectedDate = format(date ?? new Date(), "MMMM dd, yyyy");

               const result = await DeliverySched(orderId, selectedDate);

               if (result.success) {
                    toast.success(result.message);
                    queryClient.invalidateQueries({ queryKey: ["orders"] });
                    onClose();
               } else {
                    toast.error(result.message);
               }
          } catch (error) {
               console.log("Error in handleConfirm:", error);
          }
     };

     return (
          <AlertDialog
               open={isOpen}
               onOpenChange={(open) => !open && onClose()}
          >
               <AlertDialogContent>
                    <AlertDialogHeader>
                         <AlertDialogTitle>
                              Schedule for Delivery
                         </AlertDialogTitle>
                         <AlertDialogDescription asChild>
                              <div className="flex justify-center items-center mt-3">
                                   <Calendar
                                        mode="single"
                                        selected={date}
                                        onSelect={(selected) =>
                                             setDate(selected ?? new Date())
                                        }
                                        className="rounded-md border shadow"
                                   />
                              </div>
                         </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                         <AlertDialogCancel>Cancel</AlertDialogCancel>
                         <AlertDialogAction
                              onClick={handleConfirm}
                              className="hover:bg-sky-500 text-white bg-sky-700"
                         >
                              Confirm
                         </AlertDialogAction>
                    </AlertDialogFooter>
               </AlertDialogContent>
          </AlertDialog>
     );
}

export default SchedCard;
