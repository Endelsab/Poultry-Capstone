import { Skeleton } from "@/components/ui/skeleton";

function SkeletonTable() {
     return (
          <div className="flex justify-center items-center min-h-[300px]">
               <div className="w-full max-w-lg p-6  shadow-md rounded-lg">
                    {/* Table Skeleton */}
                    <div className="flex flex-col gap-10">
                         <Skeleton className="h-12 w-full rounded-md bg-slate-800/40" />
                         <Skeleton className="h-12 w-full rounded-md bg-slate-800/40" />
                         <Skeleton className="h-12 w-full rounded-md bg-slate-800/40" />
                         <Skeleton className="h-12 w-full rounded-md bg-slate-800/40" />
                         <Skeleton className="h-12 w-full rounded-md bg-slate-800/40" />
                    </div>
               </div>
          </div>
     );
}

export default SkeletonTable;
