import { useState } from "react";
import { buttonVariant } from "./Button";
import { twMerge } from "tailwind-merge";

type SwitchProps = {
  data: string[];
  changeTabHandler: (tab: string) => void;
};

const Switch = ({ data, changeTabHandler }: SwitchProps) => {
  const [left, setLeft] = useState(0);
  const [selectedTab, setSelectedTab] = useState(0);

  const tabClickHandler = (index: number) => {
    setSelectedTab(index);
    setLeft(index * 100);
    setTimeout(() => {
      changeTabHandler(data[index]);
    }, 300);
  };
  return (
    <div className="px-1 lg:py-1 lg:px-2   bg-secondary  rounded-full ">
      <div className="relative flex items-center text-sm">
        <span
          style={{
            left,
          }}
          className={twMerge(
            buttonVariant({
              variant: "gradient",
              bgColor: "gradient-primary",
              className: "absolute lg:py-4 w-2/4 h-3/4 rounded-full",
            })
          )}
        />
        {data.map((item, index) => {
          return (
            <span
              onClick={() => tabClickHandler(index)}
              className={`relative transition-all  cursor-pointer p-2 min-w-[100px] text-center  z-10   ${
                selectedTab === index ? "text-secondary" : "text-black"
              }`}
              key={index}
            >
              {item}
            </span>
          );
        })}
      </div>
    </div>
  );
};

export default Switch;
