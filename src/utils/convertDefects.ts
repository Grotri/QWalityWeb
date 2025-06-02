import { IDefect } from "../model/defect";

export interface Defect {
  confidence: number;
  defect_id: number;
  deleted_at: string | null;
  download_image_url: string;
  inspection_id: number;
  label: string;
  product_id: number;
  timestamp: string;
}

export interface DefectNode {
  camera_id: number;
  defects: Defect[];
}

export default (dataDefects: DefectNode): IDefect[] =>
  dataDefects.defects.map((defect) => ({
    id: defect.defect_id.toString(),
    name: defect.label,
    date: defect.timestamp,
    photo: defect.download_image_url,
    deletedAt: defect.deleted_at || undefined,
  }));
