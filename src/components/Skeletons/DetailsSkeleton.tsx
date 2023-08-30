import Skeleton from "./Skeleton";

const DetailsSkeleton = () => {
  return (
    <div className="details-skeleton">
      <div className="lg:grid lg:grid-cols-3 lg:gap-4">
        <Skeleton className="h-[400px] lg:h-full mb-10 lg:mb-0" />
        <div className="col-span-2 flex flex-col">
          <div className="item flex flex-col gap-4 mb-10">
            <Skeleton className="rounded-full" />
            <Skeleton className="rounded-full w-2/3" />
            <Skeleton className="rounded-full w-2/4" />
          </div>

          <div className="item flex flex-col gap-4 mb-10">
            <Skeleton className="rounded-full" />
            <Skeleton className="rounded-full w-2/3" />
            <Skeleton className="rounded-full" />
          </div>
          <div className="item flex flex-col gap-4 mb-10">
            <Skeleton className="rounded-full" />
            <Skeleton className="rounded-full w-2/3" />
            <Skeleton className="rounded-full" />
          </div>
          <div className="item flex flex-col gap-4 mb-10">
            <Skeleton className="rounded-full" />
            <Skeleton className="rounded-full w-2/3" />
            <Skeleton className="rounded-full w-1/4" />
          </div>
          <div className="item flex w-3/4 gap-4">
            <Skeleton className="h-[50px]" />
            <Skeleton className="h-[50px]" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default DetailsSkeleton;
