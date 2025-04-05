import { ApproveOrder } from "@/app/actions/order/approvedOrder";
import { DeclineOrder } from "@/app/actions/order/declineOrder";
import { OrderReceived } from "@/app/actions/order/orderRecieve";
import { useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import toast from "react-hot-toast";

function OrderAction() {
  const [loading, setLoading] = useState(false);

  const queryClient = useQueryClient();

  const handleApprove = async (orderId: string) => {
    setLoading(true);
    try {
      const result = await ApproveOrder(orderId);

      if (result.success) {
        toast.success(result.message);
        queryClient.invalidateQueries({ queryKey: ["orders"] });
        queryClient.invalidateQueries({
          queryKey: ["orderHistory"],
        });
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

  const handleDecline = async (orderId: string) => {
    setLoading(true);

    try {
      const result = await DeclineOrder(orderId);

      if (result.success) {
        toast.success(result.message);
        queryClient.invalidateQueries({ queryKey: ["orders"] });
      } else {
        toast.error(result.message);
      }
    } catch (error) {
      console.log("error in handleDecline", error);
    } finally {
      setLoading(false);
    }
  };

  return { loading, handleApprove, handleReceive, handleDecline };
}

export default OrderAction;
