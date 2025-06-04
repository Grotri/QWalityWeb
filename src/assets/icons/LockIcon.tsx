import { FC } from "react";
import { IIcon } from "./types";

const LockIcon: FC<IIcon> = ({
  color = "var(--white)",
  width = 70,
  stroke = 4,
}) => (
  <svg width={width} height={width} fill="none" viewBox="0 0 50 50">
    <path
      stroke={color}
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={stroke}
      d="M14 22v-8a10 10 0 0 1 20 0v8m-24 0h28a4 4 0 0 1 4 4v14a4 4 0 0 1 -4 4H10a4 4 0 0 1 -4 -4V26a4 4 0 0 1 4 -4"
    />
  </svg>
);

export default LockIcon;
