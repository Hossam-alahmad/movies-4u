import Switch from "./Switch";

type MovieListProps = {
  title: string;
  tabData: string[];
  changeTabHandler: (tab: string) => void;
};

const MoviesList = ({ title, tabData, changeTabHandler }: MovieListProps) => {
  return (
    <div className="py-10 px-4 text-secondary">
      <div className="flex justify-between items-center">
        <h4 className="text-[1.2rem] sm:text-2xl">{title}</h4>
        <Switch changeTabHandler={changeTabHandler} data={tabData} />
      </div>
    </div>
  );
};

export default MoviesList;
