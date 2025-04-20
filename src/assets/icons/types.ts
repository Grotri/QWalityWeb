export interface IIcon {
  style?: string;
  color?: string;
  height?: number;
  width?: number;
  opacity?: number;
  onClick?: () => void;
  stroke?: number;
  disabled?: boolean;
  isActive?: boolean;
}
