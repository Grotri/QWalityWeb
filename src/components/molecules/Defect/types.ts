import { IDefect } from "../../../model/defect";

export interface IDefectItem {
  defect: IDefect;
  textBtn?: string;
  onPress?: () => void;
  setSelectedDefect?: (defect: IDefect) => void;
  pressableIcon?: boolean;
}
