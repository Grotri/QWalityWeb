import api from "./index";

interface ICreateCameraParams {
  name: string;
  camera_url: string;
}

interface IEditCameraParams {
  name: string;
  camera_url: string;
  status: string;
  deleted_at?: string;
}

export const createCamera = async (payload: ICreateCameraParams) => {
  return await api.post("/cameras", payload);
};

export const getCameras = async () => {
  return await api.get("/cameras");
};

export const changeCamera = async (id: string, payload: IEditCameraParams) => {
  return await api.patch(`/cameras/${id}`, payload);
};
