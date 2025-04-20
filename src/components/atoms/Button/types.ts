import { ReactNode } from "react";

export interface IButton {
  children: ReactNode;
  onPress?: () => void;
  style?: string;
  color?:
    | "red"
    | "welcomeBlue"
    | "welcomeBrightBlue"
    | "blue"
    | "darkBlue"
    | "edge"
    | "management"
    | "blueTransparent"
    | "modal";
  customColor?: string;
  disabled?: boolean;
}
