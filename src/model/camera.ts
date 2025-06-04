import { IDefect } from "./defect";

export interface ICamera {
  id: string;
  online: boolean;
  title: string;
  uptime: string;
  defects: IDefect[];
  link: string;
  deletedAt?: string;
  maxDefects: number;
}

export const initialCamera: ICamera = {
  id: "",
  online: true,
  title: "",
  uptime: "",
  defects: [],
  link: "",
  maxDefects: 0,
};
