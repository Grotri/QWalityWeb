import { ReactElement } from "react";

export interface IModal {
  children: ReactElement;
  isVisible: boolean;
  setIsVisible?: (visible: boolean) => void;
  onClose?: () => void;
}
