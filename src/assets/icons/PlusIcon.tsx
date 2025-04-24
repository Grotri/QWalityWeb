import { FC } from "react";
import { IIcon } from "./types";

const PlusIcon: FC<IIcon> = ({
  color = "var(--mainText)",
  width = 40,
  stroke = 5,
}) => (
  <svg width={width} height={width} fill="none" viewBox="0 0 40 40">
    <path
      stroke={color}
      strokeLinecap="round"
      strokeWidth={stroke}
      d="M20 3v33.727M36.871 20H3"
    />
  </svg>
);

export default PlusIcon;
