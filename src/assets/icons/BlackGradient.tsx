import { FC } from "react";
import { IIcon } from "./types";
import { v4 as uuidv4 } from "uuid";

const BlackGradient: FC<IIcon> = ({ width = 100, style }) => {
  const clipId = uuidv4();

  return (
    <svg
      width={width}
      height={width}
      viewBox="0 0 130 130"
      fill="none"
      className={style}
    >
      <path fill={`url(#${clipId})`} d="M0 0h130v130H0z" />
      <defs>
        <radialGradient
          id={clipId}
          cx={0}
          cy={0}
          r={1}
          gradientTransform="rotate(-128.908 62.313 22.426)scale(89.9569)"
          gradientUnits="userSpaceOnUse"
        >
          <stop offset={0} stopColor="var(--bg)" stopOpacity={1} />
          <stop offset={1} stopColor="var(--bg)" stopOpacity={0} />
        </radialGradient>
      </defs>
    </svg>
  );
};

export default BlackGradient;
