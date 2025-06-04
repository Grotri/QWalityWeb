import api from "./index";

interface ICreateCameraParams {
  name: string;
  camera_url: string;
}

interface IEditCameraParams {
  name: string;
  camera_url: string;
  status: string;
}

interface IpermanentlyDeleteCamerasByRangeParams {
  start_date: string;
  end_date: string;
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

export const moveCameraToTrash = async (id: string) => {
  return await api.delete(`/cameras/${id}/soft`);
};

export const restoreCameraFromTrash = async (id: string) => {
  return await api.patch(`/cameras/${id}/restore`);
};

export const deleteCameraDefects = async (id: string) => {
  return await api.post(`/cameras/${id}/soft-clean`);
};

export const permanentlyDeleteCamerasByRange = async (
  params: IpermanentlyDeleteCamerasByRangeParams
) => {
  return await api.delete("/cameras/permanently/range", { data: params });
};

export const permanentlyDeleteCameras = async () => {
  return await api.delete("/cameras/permanently/all");
};
