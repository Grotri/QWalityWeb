import { FC } from "react";
import { IIcon } from "./types";

const BackIcon: FC<IIcon> = ({
  color = "var(--mainText)",
  width = 26,
  height = 38,
  stroke = 4,
}) => (
  <svg width={width} height={height} fill="none" viewBox="0 0 26 38">
    <path
      stroke={color}
      strokeLinecap="round"
      strokeWidth={stroke}
      d="M24 36 3.176 20.608a2 2 0 0 1 0 -3.216L24 2"
    />
  </svg>
);

export default BackIcon;
