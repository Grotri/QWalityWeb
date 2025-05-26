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
  uptime: "1 day, 1:21:25",
  defects: [],
  link,
});
