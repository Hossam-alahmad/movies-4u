import { useAppSelector } from "../hooks/reduxHook";
import Carousel from "./Carousel";
import Image from "./LazyLoadImage/Image";
import TopCastsSkeleton from "./Skeletons/TopCastsSkeleton";

type TopCastsProps = {
  casts: {
    profile_path: string;
    name: string;
    cast_id: number;
  }[];
  loading: boolean;
};
const TopCasts = ({ casts, loading }: TopCastsProps) => {
  const { url } = useAppSelector((state) => state.home);
  return !loading ? (
    casts.length > 0 && (
      <div className="top-cast mt-10">
        <h3 className="mb-4">Top Cast</h3>
        {casts.length > 4 ? (
          <Carousel>
            {casts.map((c) => {
              return (
                <div
                  key={c.cast_id}
                  className="cast-item w-[100px] lg:w-[150px]  flex-shrink-0"
                >
                  <div className="img-box mb-4 w-full h-[100px] lg:h-[150px] rounded-full overflow-hidden ">
                    {" "}
                    {c.profile_path ? (
                      <Image
                        className="rounded-full "
                        src={url.profile + c.profile_path}
                      />
                    ) : (
                      <div className="w-full h-full bg-third-light/20"></div>
                    )}
                  </div>
                  <span className="text-center block">{c.name}</span>
                </div>
              );
            })}
          </Carousel>
        ) : (
          <div className="flex cast-list gap-4 scrollbar-hide overflow-y-hidden">
            {casts.map((c) => {
              return (
                <div
                  key={c.cast_id}
                  className="cast-item w-[100px] lg:w-[150px]  flex-shrink-0"
                >
                  <div className="img-box mb-4 w-full h-[100px] lg:h-[150px] rounded-full overflow-hidden ">
                    {" "}
                    {c.profile_path ? (
                      <Image
                        className="rounded-full "
                        src={url.profile + c.profile_path}
                      />
                    ) : (
                      <div className="w-full h-full bg-third-light/20"></div>
                    )}
                  </div>
                  <span className="text-center block">{c.name}</span>
                </div>
              );
            })}
          </div>
        )}
      </div>
    )
  ) : (
    <TopCastsSkeleton />
  );
};

export default TopCasts;
