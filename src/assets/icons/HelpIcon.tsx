import { FC } from "react";
import { IIcon } from "./types";

const HelpIcon: FC<IIcon> = ({
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
        d="M18.18 18a6 6 0 0 1 11.66 2c0 4 -6 6 -6 6m0.16 8h0.02M44 24c0 11.046 -8.954 20 -20 20S4 35.046 4 24 12.954 4 24 4s20 8.954 20 20"
      />
    </svg>
  );
};

export default HelpIcon;
