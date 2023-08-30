import { useEffect } from "react";
import { Route, Routes } from "react-router-dom";
import { routes } from "./utils/routes";
import Header from "./components/Header";
import Footer from "./components/Footer";
import { fetchDataFromApi } from "./utils/api/fetch";
import { useDispatch } from "react-redux";
import { getApiConfiguration, getGenres } from "./redux/slicers/home";

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchConfiguration = () => {
      fetchDataFromApi("/configuration")
        .then((res) => {
          const url = {
            backdrop: res.data.images.secure_base_url + "original",
            poster: res.data.images.secure_base_url + "original",
            profile: res.data.images.secure_base_url + "original",
          };
          dispatch(getApiConfiguration(url));
        })
        .catch((err) => console.log(err));
    };
    const fetchGeneresData = async () => {
      const endPoints = ["tv", "movie"];
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const allGenres: any = {};

      const data = await Promise.all(
        endPoints.map((url) => fetchDataFromApi(`/genre/${url}/list`))
      );
      data.map((item) =>
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        item.data.genres.map((genre: any) => (allGenres[genre.id] = genre))
      );
      dispatch(getGenres(allGenres));
    };
    fetchConfiguration();
    fetchGeneresData();
  }, []);

  return (
    <div className="movies-app">
      <Header />
      <Routes>
        {routes.map((route) => (
          <Route key={route.id} {...route} />
        ))}
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
