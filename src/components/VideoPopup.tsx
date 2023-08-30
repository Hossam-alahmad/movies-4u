import { SetStateAction, Dispatch } from "react";

import Button from "./Button";
import ReactPlayer from "react-player";

type VideoPopup = {
  videoId: string;
  show: boolean;
  setShow: Dispatch<SetStateAction<boolean>>;
  setVideoId: Dispatch<SetStateAction<string>>;
};

const VideoPopup = ({ setVideoId, videoId, show, setShow }: VideoPopup) => {
  return (
    <>
      <div
        className={`overlay transition-all ${
          show ? "opacity-1 visible" : "opacity-0 invisible"
        } bg-black/60 w-full h-full fixed top-0 left-0`}
      ></div>
      <div
        className={`fixed  transition-all ${
          show ? "scale-100" : "scale-0"
        } top-2/4 left-2/4 -translate-x-2/4 -translate-y-2/4 video-popup w-11/12  h-[300px] md:h-2/4 md:w-3/4 lg:w-2/4`}
      >
        <Button
          onClick={() => {
            setShow(false);
            setVideoId("");
          }}
          size={"sm"}
          className="p-1"
        >
          Close
        </Button>
        <div className="h-full">
          <ReactPlayer
            url={`https://www.youtube.com/watch?v=${videoId}`}
            controls
            width="100%"
            height={"100%"}
          />
        </div>
      </div>
    </>
  );
};

export default VideoPopup;
