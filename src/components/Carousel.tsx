import { useRef } from "react";
import Button from "./Button";
import { icons } from "../utils/icons";
type CarouselProps = {
  children: React.ReactNode;
};
const Carousel = ({ children }: CarouselProps) => {
  const carouselContainer = useRef<HTMLDivElement>(null);
  const navigation = (dir: string) => {
    const container = carouselContainer.current;
    if (container) {
      const scrollAmount =
        dir === "left"
          ? container?.scrollLeft - container?.offsetWidth
          : container?.scrollLeft + container?.offsetWidth;
      container.scrollTo({
        left: scrollAmount,
        behavior: "smooth",
      });
    }
  };
  return (
    <div className="relative carousel text-white px-[20px]">
      <Button
        onClick={() => navigation("left")}
        className="absolute text-white z-10 top-[50%] left-4 -translate-y-2/4 bg-black/40 rounded-full h-[40px] w-[40px] p-2 transition-all hover:bg-black/60"
      >
        {icons.chevronLeft}
      </Button>
      <Button
        onClick={() => navigation("right")}
        className="absolute text-white  z-10 top-[50%] right-4 -translate-y-2/4 bg-black/40 rounded-full h-[40px] w-[40px] p-2 transition-all hover:bg-black/60"
      >
        {icons.chevronRight}
      </Button>
      <div
        ref={carouselContainer}
        className="carousel-items gap-[10px] md:-mx-[20px]  overflow-y-hidden scrollbar-hide flex h-full"
      >
        {children}
      </div>
    </div>
  );
};

export default Carousel;
