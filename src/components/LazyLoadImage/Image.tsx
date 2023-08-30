import {
  LazyLoadImage,
  LazyLoadImageProps,
} from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/blur.css";
import "react-lazy-load-image-component/src/effects/black-and-white.css";
import "react-lazy-load-image-component/src/effects/opacity.css";
import "./style.css";

interface ImageProps extends LazyLoadImageProps {
  effect?: "blur" | "black-and-white" | "opacity";
}

const Image = ({ src, className, effect = "blur", ...rest }: ImageProps) => {
  return (
    <LazyLoadImage src={src} className={className} effect={effect} {...rest} />
  );
};
export default Image;
