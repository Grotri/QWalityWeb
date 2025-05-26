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
  uptime: "0 day, 0:0:0",
  defects: [],
  link,
});
