import { useState } from "react";
import Carousel from "./Carousel";
import Button from "./Button";
import { icons } from "../utils/icons";
import Image from "./LazyLoadImage/Image";
import VideoPopup from "./VideoPopup";

type OfficialVideosProps = {
  loading: boolean;
  videos: {
    key: string;
    name: string;
    id: string;
  }[];
};

const OfficalVideos = ({ videos, loading }: OfficialVideosProps) => {
  const [popup, setPopup] = useState(false);
  const [videoId, setVideoId] = useState("");
  return !loading
    ? videos.length > 0 && (
        <div className="my-10">
          <h3 className="mb-4 text-[1.4rem] sm:text-3xl">Official Videos</h3>
          <Carousel>
            {videos.map((video) => {
              return (
                <div
                  key={video.id}
                  className="relative rounded-md overflow-hidden item w-full sm:w-1/2 h-[150px] lg:w-1/5 lg:h-[200px] bg-third-light/20  flex-shrink-0"
                >
                  <Image
                    src={`https://img.youtube.com/vi/${video.key}/mqdefault.jpg`}
                    alt={video.name}
                  />
                  <div className="absolute top-0 left-0 w-full h-full bg-black/30"></div>
                  <Button
                    onClick={() => {
                      setPopup(true);
                      setVideoId(video.key);
                    }}
                    className="absolute top-2/4 left-2/4 -translate-x-2/4 text-[50px] hover:text-primary -translate-y-2/4"
                  >
                    {icons.play}
                  </Button>
                </div>
              );
            })}
          </Carousel>
          <VideoPopup
            setShow={setPopup}
            setVideoId={setVideoId}
            videoId={videoId}
            show={popup}
          />
        </div>
      )
    : null;
};

export default OfficalVideos;
