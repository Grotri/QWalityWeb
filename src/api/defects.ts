import api from "./index";

interface IPermanentlyDeleteDefectsByRangeParams {
  start_date: string;
  end_date: string;
}

export const getDefects = async () => {
  return await api.get("/defects");
};

export const moveDefectToTrash = async (id: string) => {
  return await api.delete(`/defects/${id}/soft`);
};

export const restoreDefectFromTrash = async (id: string) => {
  return await api.patch(`/defects/${id}/restore`);
};

export const permanentlyDeleteDefectsByRange = async (
  params: IPermanentlyDeleteDefectsByRangeParams
) => {
  return await api.delete("/defects/permanently/range", { data: params });
};

export const permanentlyDeleteDefects = async () => {
  return await api.delete("/defects/permanently/all");
};
