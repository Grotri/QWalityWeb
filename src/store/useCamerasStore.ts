import { create } from "zustand";
import { IStoreStatus } from "../model/misc";
import { EErrors } from "../constants/errors";
import { ICamera } from "../model/camera";
import { onError, onSuccess, onWarning } from "../helpers/toast";
import { linkPattern } from "../constants/patterns";
import i18n from "../i18n";
import {
  changeCamera,
  createCamera,
  deleteCameraDefects,
  getCameras,
  moveCameraToTrash,
  permanentlyDeleteCameras,
  permanentlyDeleteCamerasByRange,
  restoreCameraFromTrash,
} from "../api/camera";
import convertCameras from "../utils/convertCameras";
import convertCamera from "../utils/convertCamera";
import {
  getDefects,
  moveDefectToTrash,
  permanentlyDeleteDefects,
  permanentlyDeleteDefectsByRange,
  restoreDefectFromTrash,
} from "../api/defects";
import { parseCustomDate } from "../helpers/formatDate";
import convertDefects, { DefectNode } from "../utils/convertDefects";

interface IErrors {
  name: string;
  link: string;
}

const initialErrors: IErrors = {
  name: "",
  link: "",
};

interface IUseCamerasStore extends IStoreStatus {
  cameras: ICamera[];
  errors: IErrors;
  activeSection: string | false;
  photoLoading: boolean;
  setActiveSection: (section: string | false) => void;
  setErrorsField: (field: keyof IErrors, error: string) => void;
  refreshErrors: () => void;
  fetchCameras: (withoutLoading?: boolean) => void;
  fetchDefects: () => void;
  validate: (name: string, link: string) => boolean;
  addCamera: (name: string, link: string) => void;
  editCamera: (camera: ICamera, onEdit: (camera: null) => void) => void;
  deleteCamera: (camera: ICamera) => void;
  recoverCamera: (cameraId: string) => void;
  deleteHistory: (cameraId: string) => void;
  deleteDefect: (cameraId: string, defectId: string) => void;
  recoverDefect: (cameraId: string, defectId: string) => void;
  clearTrashBin: () => void;
  clearTrashBinByDates: (startDate: Date | null, endDate: Date | null) => void;
  downloadDefectImage: (
    photoUrl: string,
    id: string,
    onClose: () => void
  ) => void;
}

const useCamerasStore = create<IUseCamerasStore>((set, get) => ({
  loading: false,
  photoLoading: false,
  error: null,
  activeSection: false,
  cameras: [],
  errors: { ...initialErrors },

  fetchCameras: async (withoutLoading) => {
    try {
      if (withoutLoading) {
        set({ error: null });
      } else {
        set({ loading: true, error: null });
      }
      const resCameras = await getCameras();
      const resDefects = await getDefects();
      set({
        cameras: convertCameras(resCameras.data, resDefects.data),
        loading: false,
        error: false,
      });
    } catch (error) {
      onError(i18n.t("failedToLoadCameraList"));
      console.error(error);
      set({ error, loading: false });
    }
  },

  fetchDefects: async () => {
    try {
      const resDefects = await getDefects();
      set({ error: null });
      set((state) => ({
        cameras: state.cameras.map((camera) => {
          const defectNode = resDefects.data.find(
            (def: DefectNode) => def.camera_id.toString() === camera.id
          );
          return {
            ...camera,
            defects: defectNode ? convertDefects(defectNode) : camera.defects,
          };
        }),
        error: false,
      }));
    } catch (error) {
      console.error(error);
      set({ error });
    }
  },

  setActiveSection: (section) => set({ activeSection: section }),

  setErrorsField: (field, error) =>
    set((state) => ({ errors: { ...state.errors, [field]: error } })),

  validate: (name, link) => {
    const newErrors: IErrors = {
      name: !name.trim() ? i18n.t(EErrors.required) : "",
      link: !link.trim()
        ? i18n.t(EErrors.required)
        : !linkPattern.test(link.trim())
        ? i18n.t(EErrors.link)
        : "",
    };

    set({ errors: newErrors });
    return Object.values(newErrors).every((error) => !error);
  },

  addCamera: async (name, link) => {
    const { validate, cameras } = get();

    if (validate(name, link)) {
      try {
        const request = await createCamera({
          name: name.trim(),
          camera_url: link.trim(),
        });
        set({
          cameras: [...cameras, convertCamera(request.data, link.trim())],
        });
        onSuccess(
          `${i18n.t("camera")} "${name}" ${i18n.t("cameraAddedSuccessfully")}`
        );
      } catch (error) {
        onError(i18n.t("cameraAddError"));
        console.log(error);
      }
    } else {
      onError(i18n.t(EErrors.fields));
    }
  },

  editCamera: async (camera, onEdit) => {
    const { validate, cameras } = get();
    const oldCamera = cameras.find((c) => c.id === camera.id);
    const newCamera: ICamera = {
      ...camera,
      title: camera.title.trim(),
      link: camera.link.trim(),
    };

    if (JSON.stringify(oldCamera) !== JSON.stringify(newCamera)) {
      if (validate(newCamera.title, newCamera.link)) {
        try {
          await changeCamera(newCamera.id, {
            name: newCamera.title,
            camera_url: newCamera.link,
            status: newCamera.online ? "active" : "non-active",
          });
          set({
            cameras: cameras.map((c) =>
              c.id === newCamera.id ? newCamera : c
            ),
          });
          onEdit(null);
          onSuccess(i18n.t("cameraDataEditedSuccessfully"));
        } catch (error) {
          onError(i18n.t("cameraEditError"));
          console.log(error);
        }
      } else {
        onError(i18n.t(EErrors.fields));
      }
    } else {
      onWarning(i18n.t(EErrors.noChanges));
    }
  },

  deleteCamera: async (camera) => {
    const { cameras } = get();
    try {
      const requestRes = await moveCameraToTrash(camera.id);
      set({
        cameras: cameras.map((c) =>
          c.id === camera.id
            ? { ...c, deletedAt: requestRes.data.deleted_at }
            : c
        ),
        errors: { ...initialErrors },
      });
      onSuccess(
        `${i18n.t("camera")} "${camera.title}" ${i18n.t("cameraMovedToTrash")}`
      );
    } catch (error) {
      onError(i18n.t("failedToDeleteCamera"));
      console.error(error);
    }
  },

  recoverCamera: async (cameraId: string) => {
    const { cameras } = get();
    await restoreCameraFromTrash(cameraId);
    set({
      cameras: cameras.map((c) =>
        c.id === cameraId ? { ...c, deletedAt: undefined } : c
      ),
    });
    onSuccess(i18n.t("cameraRestored"));
  },

  deleteHistory: async (id) => {
    const { cameras } = get();
    try {
      await deleteCameraDefects(id);
      set({
        cameras: cameras.map((camera: ICamera) =>
          camera.id === id
            ? { ...camera, defects: camera.defects.filter((d) => d.deletedAt) }
            : camera
        ),
        errors: { ...initialErrors },
      });
      onSuccess(i18n.t("cameraHistoryDeleted"));
    } catch (error) {
      onError(i18n.t("failedToDeleteCameraHistory"));
      console.error(error);
    }
  },

  deleteDefect: async (cameraId, defectId) => {
    const { cameras } = get();
    try {
      const requestRes = await moveDefectToTrash(defectId);
      set({
        cameras: cameras.map((c) =>
          c.id === cameraId
            ? {
                ...c,
                defects: c.defects.map((d) =>
                  d.id === defectId
                    ? { ...d, deletedAt: requestRes.data.deleted_at }
                    : d
                ),
              }
            : c
        ),
      });
      onSuccess(i18n.t("defectMovedToTrash"));
    } catch (error) {
      onError(i18n.t("failedToDeleteDefect"));
      console.error(error);
    }
  },

  recoverDefect: async (cameraId, defectId) => {
    const { cameras } = get();
    try {
      await restoreDefectFromTrash(defectId);
      set({
        cameras: cameras.map((c) =>
          c.id === cameraId
            ? {
                ...c,
                defects: c.defects.map((d) =>
                  d.id === defectId ? { ...d, deletedAt: undefined } : d
                ),
              }
            : c
        ),
      });
      onSuccess(i18n.t("defectRecovered"));
    } catch (error) {
      onError(i18n.t("failedToRestoreDefect"));
      console.error(error);
    }
  },

  clearTrashBin: async () => {
    const { cameras } = get();
    try {
      set({ loading: true, error: null });
      await permanentlyDeleteDefects();
      await permanentlyDeleteCameras();
      set({
        cameras: cameras
          .filter((camera) => !camera.deletedAt)
          .map((camera) => ({
            ...camera,
            defects: camera.defects.filter((defect) => !defect.deletedAt),
          })),
        loading: false,
        error: false,
      });
      onSuccess(i18n.t("trashCleared"));
    } catch (error) {
      onError(i18n.t("failedToClearTrash"));
      console.error(error);
      set({ error, loading: false });
    }
  },

  clearTrashBinByDates: async (startDate, endDate) => {
    const { cameras } = get();

    if (!startDate || !endDate) {
      onError(i18n.t(EErrors.chooseDates));
      return;
    }

    if (startDate > endDate) {
      onError(i18n.t(EErrors.timeDates));
      return;
    }

    const start = new Date(startDate);
    start.setHours(0, 0, 0, 0);

    const end = new Date(endDate);
    end.setHours(23, 59, 59, 999);

    try {
      set({ error: null });

      let foundSomething = false;

      const filteredCameras = cameras
        .map((camera) => {
          const filteredDefects = camera.defects.filter((defect) => {
            if (!defect.deletedAt) return true;

            const defectTimestamp = parseCustomDate(defect.deletedAt);
            const shouldDelete =
              defectTimestamp >= start.getTime() &&
              defectTimestamp <= end.getTime();

            if (shouldDelete) {
              foundSomething = true;
              return false;
            }

            return true;
          });

          return {
            ...camera,
            defects: filteredDefects,
          };
        })
        .filter((camera) => {
          if (!camera.deletedAt) return true;

          const deletedTimestamp = parseCustomDate(camera.deletedAt);
          const shouldDelete =
            deletedTimestamp >= start.getTime() &&
            deletedTimestamp <= end.getTime();

          if (shouldDelete) {
            foundSomething = true;
            return false;
          }

          return true;
        });

      if (!foundSomething) {
        onWarning(i18n.t("noDefectsFoundInPeriod"));
        return;
      }

      await permanentlyDeleteCamerasByRange({
        start_date: start.toISOString(),
        end_date: end.toISOString(),
      });
      await permanentlyDeleteDefectsByRange({
        start_date: start.toISOString(),
        end_date: end.toISOString(),
      });

      set({
        cameras: filteredCameras,
        error: false,
      });

      onSuccess(i18n.t("trashClearedForPeriod"));
    } catch (error) {
      onError(i18n.t("failedToClearTrashForPeriod"));
      console.error(error);
      set({ error });
    }
  },

  refreshErrors: () => {
    set({ errors: { ...initialErrors } });
  },

  downloadDefectImage: async (photoUrl, id, onClose) => {
    try {
      set({ photoLoading: true });
      const response = await fetch(photoUrl, { mode: "cors" });
      if (!response.ok) throw new Error("Не удалось скачать");

      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);

      const a = document.createElement("a");
      a.href = url;
      a.download = `defect_${id}.jpg`;
      document.body.appendChild(a);
      a.click();

      window.URL.revokeObjectURL(url);
      a.remove();
      set({ photoLoading: false });
    } catch (err) {
      console.error(err);
      set({ photoLoading: false });
      onWarning("Ошибка при скачивании изображения");
    } finally {
      onClose();
    }
  },
}));

export default useCamerasStore;
