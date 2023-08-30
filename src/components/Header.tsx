import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { icons } from "../utils/icons";
import Button from "./Button";
import { twMerge } from "tailwind-merge";

type ScrollProps = "show" | "hide" | "top";

const styleNavbar = {
  show: "bg-black-light",
  top: "bg-black/25 backdrop-blur-sm",
  hide: "-translate-y-full",
};

const Header = () => {
  const [show, setShow] = useState<ScrollProps>("top");
  const [showMenuItems, setShowMenuItems] = useState(false);
  const [isMobileScreen, setIsMobileScreen] = useState(
    window.outerWidth <= 656 ? true : false
  );
  const [lastScrollY, setLastScrollY] = useState(0);
  const location = useLocation();

  const showMenuItemsHandler = () => {
    setShow(!showMenuItems ? "show" : "top");
    setShowMenuItems(!showMenuItems);
  };
  const scrollEventHandler = () => {
    if (window.scrollY > 200 && !showMenuItems) {
      if (window.scrollY > lastScrollY) {
        setShow("hide");
      } else {
        setShow("show");
      }
    } else {
      setShow("top");
    }
    setLastScrollY(window.scrollY);
  };
  const screenSizeHandler = () => {
    setShowMenuItems(false);
    setIsMobileScreen(window.outerWidth <= 656 ? true : false);
  };
  useEffect(() => {
    window.addEventListener("resize", screenSizeHandler);
    return () => {
      window.removeEventListener("resize", screenSizeHandler);
    };
  }, []);
  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }, [location]);
  useEffect(() => {
    addEventListener("scroll", scrollEventHandler);
    return () => {
      removeEventListener("scroll", scrollEventHandler);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [lastScrollY]);

  return (
    <div
      className={`fixed z-[20] w-full   p-2 transition-all  text-secondary ${twMerge(
        "translate-y-0",
        showMenuItems ? styleNavbar.show : styleNavbar[show]
      )} `}
    >
      <div className="md:container mx-auto ">
        <div className="flex justify-between items-center">
          <Link to="/" className="text-4xl text-primary px-2">
            MOVIES 4U
          </Link>
          <ul
            className={`${
              isMobileScreen ? "menuitem-mobile" : ""
            } transition-all duration-300 flex justify-between  text-xl gap-2 ${
              showMenuItems
                ? "top-full"
                : isMobileScreen
                ? "-top-full -translate-y-full"
                : ""
            }`}
          >
            <li className="p-2 hover:text-primary">
              <Link to="/explore/movie" className="block">
                Movies
              </Link>
            </li>
            <li className="p-2 hover:text-primary">
              <Link to="/explore/tv" className="block">
                TV Shows
              </Link>
            </li>
          </ul>
          <Button
            onClick={showMenuItemsHandler}
            variant="transparent"
            className="block text-xl  cursor-pointer cur sm:hidden p-2"
          >
            {icons.menu}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Header;
