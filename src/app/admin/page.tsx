"use client";

import { useQuery } from "@tanstack/react-query";
import {
     LineChart,
     Line,
     XAxis,
     YAxis,
     Tooltip,
     ResponsiveContainer,
} from "recharts";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { motion } from "framer-motion";

import { GetSale } from "@/app/actions/order/sale";
import SkeletonTable from "@/components/SkeletonTable";

function Sale() {
     const { data, isLoading, isError } = useQuery({
          queryKey: ["lastWeekSales"],
          queryFn: GetSale,
     });

     if (isLoading) return <SkeletonTable />;
     if (isError) return <p>Cannot fetch sales data</p>;

     const formattedData = (data?.totalSale || []).map((sale) => ({
          date: new Date(sale.createdAt).toLocaleDateString("en-US", {
               weekday: "short",
          }),
          total: sale.totalPrice,
     }));

     return (
          <motion.div
               initial={{ opacity: 0, y: 20 }}
               animate={{ opacity: 1, y: 0 }}
               transition={{ duration: 0.6 }}
               className=" w-[1200px] "
          >
               <Card className="w-full h-full bg-white dark:bg-gray-950 shadow-lg p-4">
                    <CardHeader>
                         <CardTitle className="text-center text-gray-600 dark:text-gray-300">
                              Sales (Last 7 Days)
                         </CardTitle>
                    </CardHeader>
                    <CardContent className="h-[400px] w-full  ">
                         <ResponsiveContainer width="100%" height="100%">
                              <LineChart data={formattedData}>
                                   <XAxis dataKey="date" stroke="#8884d8" />
                                   <YAxis stroke="#8884d8" />
                                   <Tooltip />
                                   <Line
                                        type="monotone"
                                        dataKey="total"
                                        stroke="#3182ce"
                                        strokeWidth={3}
                                        dot={{ r: 5 }}
                                   />
                              </LineChart>
                         </ResponsiveContainer>
                    </CardContent>
               </Card>
          </motion.div>
     );
}

export default Sale;
