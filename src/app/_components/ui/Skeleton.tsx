import cn from "@/utils/className";

function Skeleton({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn(
        "animate-pulse rounded-md bg-white bg-opacity-30",
        className
      )}
      {...props}
    />
  );
}

export default Skeleton;
