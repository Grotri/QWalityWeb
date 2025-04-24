import { FC } from "react";
import { IIcon } from "./types";

const SortIcon: FC<IIcon> = ({
  color = "var(--mainText)",
  width = 19,
  stroke = 2,
}) => (
  <svg width={width} height={width} fill="none" viewBox="0 0 19 19">
    <path
      stroke={color}
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={stroke}
      d="M14.25 15.833V7.917M9.5 15.833V3.167M4.75 15.833v-4.75"
    />
  </svg>
);

export default SortIcon;
