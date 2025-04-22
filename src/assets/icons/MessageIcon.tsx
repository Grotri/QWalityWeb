import { FC } from "react";
import { IIcon } from "./types";

const MessageIcon: FC<IIcon> = ({
  color = "var(--mainText)",
  width = 38,
  stroke = 3,
}) => (
  <svg width={width} height={width} fill="none" viewBox="0 0 38 38">
    <path
      stroke={color}
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={stroke}
      d="M33.25 23.75a3.167 3.167 0 0 1 -3.167 3.167h-19L4.75 33.25V7.917A3.167 3.167 0 0 1 7.917 4.75h22.166a3.167 3.167 0 0 1 3.167 3.167z"
    />
  </svg>
);

export default MessageIcon;
