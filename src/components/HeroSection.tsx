import { useState, useRef, useEffect } from "react";
import Button from "./Button";
import SearchInput from "./SearchInput";
import { useNavigate } from "react-router-dom";
import { fetchDataFromApi } from "../utils/api/fetch";
import { useAppSelector } from "../hooks/reduxHook";
import Image from "./LazyLoadImage/Image";

type QueryEventHandlerProps = React.KeyboardEvent<HTMLInputElement> &
  React.ChangeEvent<HTMLInputElement>;

const HeroSection = () => {
  const [background, setBackground] = useState("");
  const [loading, setLoading] = useState(true);
  const { url } = useAppSelector((state) => state.home);
  const searchRef = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();

  // fetch upcoming movies
  useEffect(() => {
    const fetchUpComingMovies = () => {
      setLoading(true);
      fetchDataFromApi("/movie/upcoming")
        .then((res) => {
          const bg =
            url.backdrop +
            res.data.results[Math.floor(Math.random() * 20)].backdrop_path;
          setBackground(bg);
        })
        .catch((err) => console.log(err));
      setTimeout(() => {
        setLoading(false);
      }, 1000);
    };
    fetchUpComingMovies();
  }, [url]);

  // search for movies
  const searchQueryHandler = (e: QueryEventHandlerProps) => {
    if (e.key === "Enter" && e.target.value.length > 0) {
      navigate("/search/" + e.target.value.toLowerCase());
    }
  };
  const searchClickHandler = () => {
    if (searchRef.current && searchRef.current.value) {
      navigate("/search/" + searchRef.current.value.toLowerCase());
    }
  };
  return (
    <div className="relative hero-banner h-[550px]">
      {!loading && (
        <div className="backdrop-img  w-full top-0 left-0 absolute h-full opacity-50 overflow-hidden">
          <Image src={background} />
        </div>
      )}
      <div className="overlay-layer absolute bottom-0 left-0 w-full h-2/4 bg-gradient-to-t from-third to-transparent"></div>
      <div className="container mx-auto h-full">
        <div className="hero-content relative z-10 p-4 h-full flex flex-col items-center justify-center">
          <div className="text-white text-center">
            <h1 className="mb-2 text-3xl lg:text-5xl">Welcome to Movies 4u</h1>
            <p className="mb-10">
              Millions of movies,Tv shows and people to discover. Explore Now
            </p>
          </div>
          <div className="w-full md:w-3/4 lg:w-2/4">
            <SearchInput
              ref={searchRef}
              name="search"
              className="rounded-full p-4"
              placeholder="Search for a movie or tv show..."
              onKeyUp={searchQueryHandler}
            >
              <Button
                variant="gradient"
                bgColor={"gradient-primary"}
                size="md"
                className="absolute w-[100px] lg:w-[150px] text-white top-0 right-0 rounded-r-full h-full"
                onClick={searchClickHandler}
              >
                Search
              </Button>
            </SearchInput>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
