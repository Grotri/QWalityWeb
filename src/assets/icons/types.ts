import { CSSProperties } from "@mui/material";

export interface IIcon {
  style?: string;
  cssStyle?: CSSProperties;
  color?: string;
  height?: number;
  width?: number;
  opacity?: number;
  onClick?: () => void;
  stroke?: number;
  isActive?: boolean;
  scale?: number;
}
