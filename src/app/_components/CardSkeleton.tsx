import React from "react";
import Skeleton from "./ui/Skeleton";

interface SkeletonProps {
  number: number;
}

const CardSkeleton: React.FC<SkeletonProps> = ({ number }) => {
  return (
    <div className="grid grid-cols-4 justify-items-center mt-2">
      {Array.from({ length: number }).map((_, idx) => (
        <div key={idx} className="flex flex-col gap-5 w-60">
          <Skeleton className="w-full h-[300px]" />
          <Skeleton className="w-full h-5" />
          <div className="flex justify-center items-center gap-3">
            <Skeleton className="w-full h-5" />
            <Skeleton className="w-full h-5" />
          </div>
        </div>
      ))}
    </div>
  );
};

export default CardSkeleton;
