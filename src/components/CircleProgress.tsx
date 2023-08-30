import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";

type CircleProgressProps = {
  value: number;
  maxValue?: number;
  minValue?: number;
};
const CircleProgress = ({
  value,
  maxValue = 10,
  minValue = 0,
  ...rest
}: CircleProgressProps) => {
  const average = Math.floor((maxValue + minValue) / 2);
  const moreThanHalf = maxValue - Math.floor((maxValue + minValue) / 3);
  return (
    <CircularProgressbar
      {...rest}
      value={value}
      maxValue={maxValue}
      minValue={minValue}
      strokeWidth={5}
      text={value.toString()}
      styles={buildStyles({
        textColor:
          value <= average
            ? "#ef4444"
            : value > average && value <= moreThanHalf
            ? "#ff920b"
            : "#983cd1",
        // Colors
        pathColor:
          value <= average
            ? "#ef4444"
            : value > average && value <= moreThanHalf
            ? "#ff920b"
            : "#983cd1",
      })}
    />
  );
};

export default CircleProgress;
