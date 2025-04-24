import { FC } from "react";
import { IIcon } from "./types";
import Button from "../../components/atoms/Button";

const LeftIcon: FC<IIcon> = ({
  color = "var(--mainText)",
  width = 7,
  height = 11,
  stroke = 1,
  style,
  onClick,
}) => (
  <Button onPress={onClick} style={style}>
    <svg width={width} height={height} fill="none" viewBox="0 0 7 11">
      <path
        stroke={color}
        strokeLinecap="round"
        d="M6 10 1.067 6.3a1 1 0 0 1 0 -1.6L6 1"
        strokeWidth={stroke}
      />
    </svg>
  </Button>
);

export default LeftIcon;
