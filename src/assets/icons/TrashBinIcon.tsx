import { FC } from "react";
import { IIcon } from "./types";

const HelpIcon: FC<IIcon> = ({
  color = "var(--mainText)",
  stroke = 4,
  width = 48,
}) => {
  return (
    <svg width={width} height={width} fill="none" viewBox="0 0 48 48">
      <path
        stroke={color}
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={stroke}
        d="M6 12h4m0 0h32m-32 0v28a4 4 0 0 0 4 4h20a4 4 0 0 0 4 -4V12m-22 0V8a4 4 0 0 1 4 -4h8a4 4 0 0 1 4 4v4"
      />
    </svg>
  );
};

export default HelpIcon;
