import { ICamera } from "../../../model/camera";

export interface ICameraSettingsModal {
  camera: ICamera | null;
  setCamera: (camera: ICamera | null) => void;
  isHistoryModalOpen: boolean | null;
  setIsHistoryModalOpen: (isOpen: boolean | null) => void;
}
