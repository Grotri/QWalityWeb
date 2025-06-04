import api from "./index";

interface IExportDataParams {
  start_date: string;
  end_date: string;
  format: string;
}

interface IDeleteExportLogsParams {
  start_date: string;
  end_date: string;
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

export const deleteExportLogs = async (params: IDeleteExportLogsParams) => {
  return await api.delete("/export/logs", { data: params });
};
