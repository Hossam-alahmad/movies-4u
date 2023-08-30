import ErrorPage from "../pages/404";
import Details from "../pages/details";
import Explore from "../pages/explore";
import Home from "../pages/home";
import SearchResult from "../pages/searchResult";

export const routes = [
  {
    id: "1",
    path: "/",
    index: true,
    element: <Home />,
  },
  {
    id: "2",
    path: "/:mediaType/:id",
    element: <Details />,
  },
  {
    id: "3",
    path: "/explore/:mediaType",
    element: <Explore />,
  },
  {
    id: "4",
    path: "/search/:query",
    element: <SearchResult />,
  },
  {
    id: "5",
    path: "*",
    element: <ErrorPage />,
  },
];
