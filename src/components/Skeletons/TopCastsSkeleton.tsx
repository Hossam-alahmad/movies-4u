import Skeleton from "./Skeleton";

const TopCastsSkeleton = () => {
  return (
    <div className="mt-10 flex justify-between scrollbar-hide gap-4 overflow-y-hidden">
      {Array(7)
        .fill(0)
        .map((_item, index) => (
          <div key={index}>
            <Skeleton className="mb-4 w-[100px] h-[100px] lg:w-[150px] lg:h-[150px] rounded-full" />
            <Skeleton />
          </div>
        ))}
    </div>
  );
};

export default TopCastsSkeleton;
