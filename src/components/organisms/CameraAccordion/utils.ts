import { IDefect } from "../../../model/defect";
import { EDefectFilterOptions } from "../CameraFilterModal/enums";
import { ICameraFilter } from "../CameraFilterModal/types";
import { ESortOptions } from "../CameraSortModal/enums";

export const sortDefects = (
  defects: IDefect[],
  sortOption: keyof typeof ESortOptions
): IDefect[] => {
  switch (sortOption) {
    case "type":
      return [...defects].sort((a, b) => a.name.localeCompare(b.name));
    case "typeDown":
      return [...defects].sort((a, b) => b.name.localeCompare(a.name));
    case "date":
      return [...defects].sort(
        (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
      );
    case "dateDown":
      return [...defects].sort(
        (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime()
      );
    default:
      return defects;
  }
};

export const filterDefects = (
  defects: IDefect[],
  filters: ICameraFilter
): IDefect[] => {
  if (!filters) return defects;

  const { option, startDate, endDate, isDateFilter } = filters;

  if (isDateFilter) {
    const start = new Date(startDate || new Date());
    start.setHours(0, 0, 0, 0);

    const end = new Date(endDate || new Date());
    end.setHours(23, 59, 59, 999);

    return defects.filter((defect) => {
      const defectDate = new Date(defect.date);
      return defectDate >= start && defectDate <= end;
    });
  }

  if (option === "other") {
    const knownTypes = Object.values(EDefectFilterOptions).filter(
      (val) => val !== EDefectFilterOptions.other
    );

    return defects.filter((defect) => {
      return !knownTypes.some((type) => type === defect.name);
    });
  }

  const expectedName =
    EDefectFilterOptions[option as keyof typeof EDefectFilterOptions];
  return defects.filter((defect) => defect.name === expectedName);
};
