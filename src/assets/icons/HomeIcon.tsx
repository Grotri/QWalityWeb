import { FC } from "react";
import { IIcon } from "./types";

const HomeIcon: FC<IIcon> = ({
  color = "var(--mainText)",
  stroke = 4,
  width = 48,
}) => {
  return (
    <svg width={width} height={width} fill="none" viewBox="0 0 48 48">
      <path
        stroke={color}
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={stroke}
        d="M18 44V24h12v20M6 18 24 4l18 14v22a4 4 0 0 1-4 4H10a4 4 0 0 1-4-4z"
      />
    </svg>
  );
};

export default HomeIcon;
