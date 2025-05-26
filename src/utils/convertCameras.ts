import { ICamera } from "../model/camera";
import convertDefects, { DefectNode } from "./convertDefects";

interface CameraNode {
  camera_url: string;
  created_at: string;
  id: number;
  name: string;
  status: string;
}

export default (
  dataCameras: CameraNode[],
  dataDefects: DefectNode[]
): ICamera[] =>
  dataCameras.map((camera: CameraNode) => {
    const defectNode = dataDefects.find((def) => def.camera_id === camera.id);

    return {
      id: camera.id.toString(),
      online: camera.status === "active",
      title: camera.name,
      uptime:
        defectNode &&
        defectNode.defects.length > 0 &&
        defectNode.defects[0].uptime
          ? defectNode.defects[0].uptime
          : "0 day, 0:0:0",
      defects: defectNode ? convertDefects(defectNode) : [],
      link: camera.camera_url,
    };
  });
