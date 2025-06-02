import { ICamera } from "../model/camera";
import convertDefects, { DefectNode } from "./convertDefects";

interface CameraNode {
  camera_url: string;
  created_at: string;
  deleted_at: string | null;
  id: number;
  max_defects: number;
  name: string;
  status: string;
  uptime: string;
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
      uptime: camera.uptime,
      defects: defectNode ? convertDefects(defectNode) : [],
      link: camera.camera_url,
      deletedAt: camera.deleted_at || undefined,
      maxDefects: camera.max_defects || 0,
    };
  });
