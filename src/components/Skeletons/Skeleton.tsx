import { twMerge } from "tailwind-merge";

type SkeletonProps = {
  className?: string;
};
const Skeleton = ({ className }: SkeletonProps) => {
  return (
    <div
      className={`animate-pulse  ${twMerge(
        "h-[20px] rounded-md w-full bg-third-light/20",
        className
      )}`}
    ></div>
  );
};

export default Skeleton;
