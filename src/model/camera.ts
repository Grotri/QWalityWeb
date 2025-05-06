import { IDefect } from "./defect";

export interface ICamera {
  id: string;
  online: boolean;
  title: string;
  uptime: string;
  defects: IDefect[];
  link: string;
  deletedAt?: string;
}

export const initialCamera: ICamera = {
  id: "",
  online: true,
  title: "",
  uptime: "",
  defects: [],
  link: "",
};
