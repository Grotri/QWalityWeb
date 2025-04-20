import { FC } from "react";
import { IIcon } from "./types";

const EyeIcon: FC<IIcon> = ({
  color = "var(--mainText)",
  width = 24,
  height = 24,
  stroke = 2,
  onClick,
  isActive,
}) =>
  isActive ? (
    <svg
      width={width}
      height={height}
      fill="none"
      viewBox="0 0 24 24"
      onClick={onClick}
    >
      <path
        stroke={color}
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={stroke}
        d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8"
      />
      <path
        stroke={color}
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={stroke}
        d="M12 15a3 3 0 1 0 0-6 3 3 0 0 0 0 6"
      />
    </svg>
  ) : (
    <svg
      width={width}
      height={height}
      fill="none"
      viewBox="0 0 24 24"
      onClick={onClick}
    >
      <g clipPath="url(#a)">
        <path
          stroke={color}
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={stroke}
          d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9 9 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24M1 1l22 22"
        />
      </g>
      <defs>
        <clipPath id="a">
          <path fill="#fff" d="M0 0h24v24H0z" />
        </clipPath>
      </defs>
    </svg>
  );

export default EyeIcon;
