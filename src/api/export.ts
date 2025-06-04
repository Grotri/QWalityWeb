import api from "./index";

interface IExportDataParams {
  start_date: string;
  end_date: string;
  format: string;
}

export const getExportReport = async (params: IExportDataParams) => {
  return await api.post("/export/report", params, {
    responseType: params.format === "csv" ? "text" : "blob",
  });
};

export const getExportLog = async (params: IExportDataParams) => {
  return await api.post("/export/logs", params, {
    responseType: params.format === "csv" ? "text" : "blob",
  });
};
