import { FC } from "react";
import { IIcon } from "./types";

const FilterIcon: FC<IIcon> = ({
  color = "var(--mainText)",
  width = 19,
  stroke = 1,
}) => (
  <svg width={width} height={width} fill="none" viewBox="0 0 19 19">
    <path
      stroke={color}
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={stroke}
      d="M17.417 2.375H1.583l6.334 7.49v5.177l3.166 1.583v-6.76z"
    />
  </svg>
);

export default FilterIcon;
