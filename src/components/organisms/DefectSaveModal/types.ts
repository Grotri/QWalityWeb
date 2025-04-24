import { IDefect } from "../../../model/defect";

export interface IDefectSaveModal {
  onClose: () => void;
  defect: IDefect | null;
}
