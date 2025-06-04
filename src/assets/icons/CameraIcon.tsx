import { FC } from "react";
import { IIcon } from "./types";

const CameraIcon: FC<IIcon> = ({
  color = "var(--mainText)",
  width = 38,
  stroke = 2,
}) => (
  <svg width={width} height={width} fill="none" viewBox="0 0 38 38">
    <path
      stroke={color}
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={stroke}
      d="M36.417 30.083a3.167 3.167 0 0 1 -3.167 3.167H4.75a3.167 3.167 0 0 1 -3.167 -3.167V12.667A3.167 3.167 0 0 1 4.75 9.5h6.333l3.167 -4.75h9.5l3.167 4.75h6.333a3.167 3.167 0 0 1 3.167 3.167z"
    />
    <path
      stroke={color}
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={stroke}
      d="M19 26.917a6.333 6.333 0 1 0 0 -12.667 6.333 6.333 0 0 0 0 12.667"
    />
  </svg>
);

export default CameraIcon;
