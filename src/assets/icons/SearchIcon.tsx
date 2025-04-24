import { FC } from "react";
import { IIcon } from "./types";

const SearchIcon: FC<IIcon> = ({
  color = "var(--mainText)",
  width = 29,
  stroke = 3,
}) => (
  <svg width={width} height={width} fill="none" viewBox="0 0 29 29">
    <path
      stroke={color}
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={stroke}
      d="m25.375 25.375 -5.256 -5.256m2.84 -6.827c0 5.338 -4.329 9.666 -9.667 9.666a9.667 9.667 0 1 1 9.667 -9.667Z"
    />
  </svg>
);

export default SearchIcon;
