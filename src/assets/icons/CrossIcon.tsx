import { FC } from "react";
import { IIcon } from "./types";

const CrossIcon: FC<IIcon> = ({
  color = "var(--mainText)",
  stroke = 3,
  width = 14,
  style,
  onClick,
}) => {
  return (
    <svg
      width={width}
      height={width}
      viewBox="0 0 14 14"
      fill="none"
      className={style}
      onClick={onClick}
    >
      <path
        stroke={color}
        strokeLinecap="round"
        strokeWidth={stroke}
        d="M2 11.88 11.88 2M2.04 2 12 11.96"
      />
    </svg>
  );
};

export default CrossIcon;
