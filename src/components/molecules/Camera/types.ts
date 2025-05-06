import { ICamera } from "../../../model/camera";

export interface ICameraItem {
  camera: ICamera;
  onPress: () => void;
}
