import { FC } from "react";
import { IIcon } from "./types";

const ProfileIcon: FC<IIcon> = ({
  width = 116,
  color = "var(--white)",
  stroke = 6,
  style,
}) => (
  <svg
    width={width}
    height={width}
    viewBox="0 0 116 116"
    fill="none"
    className={style}
  >
    <path
      stroke={color}
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={stroke}
      d="M96.667 101.5v-9.667A19.333 19.333 0 0 0 77.333 72.5H38.667a19.333 19.333 0 0 0-19.334 19.333v9.667m58-67.667c0 10.678-8.656 19.334-19.333 19.334-10.678 0-19.333-8.656-19.333-19.334C38.667 23.156 47.322 14.5 58 14.5c10.677 0 19.333 8.656 19.333 19.333Z"
    />
  </svg>
);

export default ProfileIcon;
