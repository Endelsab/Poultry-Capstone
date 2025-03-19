import { motion, AnimatePresence } from "framer-motion";
import {
     Card,
     CardHeader,
     CardTitle,
     CardContent,
     CardFooter,
     CardDescription,
} from "@/components/ui/card";
import { icons, MinusIcon, PlusIcon } from "lucide-react";
import { Button } from "./ui/button";

function OrderCard() {
     return (
          <>
               <Card>
                    <CardHeader>
                         <CardTitle className="text-2xl text-emerald-400 text-center">
                              EggPress
                         </CardTitle>
                         <CardDescription className="text-center">
                              complete your order
                         </CardDescription>
                    </CardHeader>
                    <CardContent>
                         <div className="flex flex-col gap-5">
                              <div className="flex flex-col mt-5  dark:bg-gray-900 p-2 gap-3 rounded-md ">
                                   <h2>Shipping Address :</h2>
                                   <p className="text-sky-500">
                                        Philippines, Northen Samar , San Isidro
                                        , Palanit, purok 6, manggahan st.
                                   </p>
                                   <Button
                                        className="dark:bg-gray-900 hover:dark:bg-gray-800 "
                                        variant={"outline"}
                                   >
                                        Edit
                                   </Button>
                              </div>

                              <div className="flex flex-col mt-5 dark:bg-gray-900 p-2 gap-3 rounded-md ">
                                   <div className=" flex justify-between ">
                                        <h2>Item shipped :</h2>
                                        <div className="flex gap-16">
                                             <p>QTY</p>
                                             <span className="mr-4">Price</span>
                                        </div>
                                   </div>

                                   <div className="flex justify-between p-2">
                                        <div className="flex gap-5 items-center">
                                             <img
                                                  className="size-24 rounded-full"
                                                  src="/small.jpg"
                                                  alt="item"
                                             />
                                             <p className="text-sky-400 text-xl">
                                                  Egg Large
                                             </p>
                                        </div>

                                        <div className="flex text-sky-400 gap-7 mt-7">
                                             <div className="text-2xl   flex  justify-center gap-2">
                                                  <MinusIcon className="dark:text-white text-gray-500 hover:scale-150  size-4 mt-2 cursor-pointer" />{" "}
                                                  <span>1</span>
                                                  <PlusIcon className="dark:text-white hover:scale-150  text-gray-500 size-4 mt-2 cursor-pointer" />
                                             </div>
                                             <span className="text-2xl">
                                                  P 100
                                             </span>
                                        </div>
                                   </div>
                                   <Button
                                        variant={"outline"}
                                        className=" dark:bg-gray-900 w-20 ml-4 hover:dark:bg-gray-800 "
                                   >
                                        Add item
                                   </Button>
                                   <div className=" flex flex-col ml-7 items-end text-gray-400 justify-end w-11/12 ">
                                        <p className="mr-3">
                                             Subtotal - 1 item
                                        </p>
                                        <p className="mr-1">
                                             order total - P 100{" "}
                                        </p>
                                   </div>
                              </div>
                         </div>
                    </CardContent>
                    <CardFooter>
                         <div className="flex ml-10 justify-end w-11/12   gap-5">
                              <Button
                                   variant={"destructive"}
                                   className="hover:bg-red-500"
                              >
                                   cancel
                              </Button>
                              <Button className="bg-sky-500">
                                   Place order
                              </Button>
                         </div>
                    </CardFooter>
               </Card>
          </>
     );
}

export default OrderCard;
