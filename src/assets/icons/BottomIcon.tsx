import { FC } from "react";
import { IIcon } from "./types";

const BottomIcon: FC<IIcon> = ({
  color = "var(--mainText)",
  stroke = 2,
  cssStyle,
  scale = 1,
}) => {
  const baseWidth = 12;
  const baseHeight = 9;

  const width = baseWidth * scale;
  const height = baseHeight * scale;

  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 12 9"
      fill="none"
      style={cssStyle}
    >
      <path
        stroke={color}
        strokeLinecap="round"
        strokeWidth={stroke}
        d="M11 1 6.814 6.86a1 1 0 0 1-1.628 0L1 1"
      />
    </svg>
  );
};

export default BottomIcon;
