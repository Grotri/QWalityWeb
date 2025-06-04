import { FC } from "react";
import { IIcon } from "./types";
import { v4 as uuidv4 } from "uuid";

const SettingsIcon: FC<IIcon> = ({
  color = "var(--mainText)",
  width = 48,
  stroke = 3,
  style,
}) => {
  const clipId = uuidv4();

  return (
    <svg
      width={width}
      height={width}
      fill="none"
      viewBox="0 0 48 48"
      className={style}
    >
      <g
        stroke={color}
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={stroke}
        clipPath={`url(#${clipId})`}
      >
        <path d="M24 30a6 6 0 1 0 0-12 6 6 0 0 0 0 12" />
        <path d="M38.8 30a3.3 3.3 0 0 0 .66 3.64l.12.12a4 4 0 0 1-1.298 6.528 4 4 0 0 1-4.362-.868l-.12-.12a3.3 3.3 0 0 0-3.64-.66 3.3 3.3 0 0 0-2 3.02V42a4 4 0 1 1-8 0v-.18A3.3 3.3 0 0 0 18 38.8a3.3 3.3 0 0 0-3.64.66l-.12.12a4 4 0 0 1-6.528-1.298 4 4 0 0 1 .868-4.362l.12-.12a3.3 3.3 0 0 0 .66-3.64 3.3 3.3 0 0 0-3.02-2H6a4 4 0 1 1 0-8h.18A3.3 3.3 0 0 0 9.2 18a3.3 3.3 0 0 0-.66-3.64l-.12-.12a4 4 0 0 1 1.298-6.528 4 4 0 0 1 4.362.868l.12.12a3.3 3.3 0 0 0 3.64.66H18a3.3 3.3 0 0 0 2-3.02V6a4 4 0 1 1 8 0v.18a3.3 3.3 0 0 0 2 3.02 3.3 3.3 0 0 0 3.64-.66l.12-.12a4 4 0 0 1 6.528 1.298 4 4 0 0 1-.868 4.362l-.12.12a3.3 3.3 0 0 0-.66 3.64V18a3.3 3.3 0 0 0 3.02 2H42a4 4 0 1 1 0 8h-.18a3.3 3.3 0 0 0-3.02 2" />
      </g>
      <defs>
        <clipPath id={clipId}>
          <path fill={color} d="M0 0h48v48H0z" />
        </clipPath>
      </defs>
    </svg>
  );
};

export default SettingsIcon;
