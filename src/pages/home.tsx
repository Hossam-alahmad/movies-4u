import HeroSection from "../components/HeroSection";
import Popular from "../components/Popular";
import TopRated from "../components/TopRated";
import Trending from "../components/Trending";

const Home = () => {
  return (
    <div>
      <HeroSection />
      <div className="container mx-auto">
        <Trending />
        <Popular />
        <TopRated />
      </div>
    </div>
  );
};

export default Home;
