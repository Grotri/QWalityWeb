import { ICamera } from "../model/camera";

interface CameraNode {
  id: number;
  name: string;
  status: string;
}

export default (data: CameraNode, link: string): ICamera => ({
  id: data.id.toString(),
  online: data.status === "active",
  title: data.name,
  uptime: "0д 0ч 0м",
  defects: [],
  link,
  maxDefects: 0,
});
