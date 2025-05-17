import { create } from "zustand";
import { IStoreStatus } from "../model/misc";
import { initialCameras } from "../constants/cameras";
import { EErrors } from "../constants/errors";
import { v4 as uuidv4 } from "uuid";
import { ICamera } from "../model/camera";
import { onError, onSuccess, onWarning } from "../helpers/toast";
import { linkPattern } from "../constants/patterns";
import i18n from "../i18n";

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
  setErrorsField: (field: keyof IErrors, error: string) => void;
  refreshErrors: () => void;
  fetchCameras: () => void;
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
}

const useCamerasStore = create<IUseCamerasStore>((set, get) => ({
  loading: false,
  error: null,
  cameras: [...initialCameras],
  errors: { ...initialErrors },

  fetchCameras: () => {
    try {
      set({ loading: true, error: null });
      const cameras = [...initialCameras];
      set({
        cameras,
        loading: false,
        error: false,
      });
    } catch (error) {
      onError(i18n.t("failedToLoadCameraList"));
      console.error(error);
      set({ error, loading: false });
    }
  },

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

  addCamera: (name, link) => {
    const { validate, cameras } = get();

    if (validate(name, link)) {
      const newCamera: ICamera = {
        id: uuidv4(),
        online: true,
        title: name.trim(),
        uptime: i18n.t("zeroTime"),
        defects: [],
        link: link.trim(),
      };

      try {
        set({
          loading: true,
          cameras: [...cameras, newCamera],
        });
        onSuccess(
          `${i18n.t("camera")} "${name}" ${i18n.t("cameraAddedSuccessfully")}`
        );
      } catch (error) {
        console.log(error);
        onError(i18n.t("cameraAddError"));
      } finally {
        set({ loading: false });
      }
    } else {
      onError(i18n.t(EErrors.fields));
    }
  },

  editCamera: (camera, onEdit) => {
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
          set({
            loading: true,
            cameras: cameras.map((c) =>
              c.id === newCamera.id ? newCamera : c
            ),
          });
          onEdit(null);
          onSuccess(i18n.t("cameraDataEditedSuccessfully"));
        } catch (error) {
          console.log(error);
          onError(i18n.t("cameraEditError"));
        } finally {
          set({ loading: false });
        }
      } else {
        onError(i18n.t(EErrors.fields));
      }
    } else {
      onWarning(i18n.t(EErrors.noChanges));
    }
  },

  deleteCamera: (camera) => {
    const { cameras } = get();
    const now = new Date().toISOString();

    try {
      set({ loading: true, error: null });
      set({
        cameras: cameras.map((c) =>
          c.id === camera.id ? { ...c, deletedAt: now } : c
        ),
        errors: { ...initialErrors },
        loading: false,
        error: false,
      });
      onSuccess(
        `${i18n.t("camera")} "${camera.title}" ${i18n.t("cameraMovedToTrash")}`
      );
    } catch (error) {
      onError(i18n.t("failedToDeleteCamera"));
      console.error(error);
      set({ error, loading: false });
    }
  },

  recoverCamera: (cameraId: string) => {
    const { cameras } = get();
    set({
      cameras: cameras.map((c) =>
        c.id === cameraId ? { ...c, deletedAt: undefined } : c
      ),
    });
    onSuccess(i18n.t("cameraRestored"));
  },

  deleteHistory: (id) => {
    const { cameras } = get();
    try {
      set({ loading: true, error: null });
      set({
        cameras: cameras.map((camera: ICamera) =>
          camera.id === id
            ? { ...camera, defects: camera.defects.filter((d) => d.deletedAt) }
            : camera
        ),
        errors: { ...initialErrors },
        loading: false,
        error: false,
      });
      onSuccess(i18n.t("cameraHistoryDeleted"));
    } catch (error) {
      onError(i18n.t("failedToDeleteCameraHistory"));
      console.error(error);
      set({ error, loading: false });
    }
  },

  deleteDefect: (cameraId, defectId) => {
    const { cameras } = get();
    const now = new Date().toISOString();

    try {
      set({ loading: true, error: null });
      set({
        cameras: cameras.map((c) =>
          c.id === cameraId
            ? {
                ...c,
                defects: c.defects.map((d) =>
                  d.id === defectId ? { ...d, deletedAt: now } : d
                ),
              }
            : c
        ),
        loading: false,
        error: false,
      });
      onSuccess(i18n.t("defectMovedToTrash"));
    } catch (error) {
      onError(i18n.t("failedToDeleteDefect"));
      console.error(error);
      set({ error, loading: false });
    }
  },

  recoverDefect: (cameraId, defectId) => {
    const { cameras } = get();
    try {
      set({ loading: true, error: null });
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
        loading: false,
        error: false,
      });
      onSuccess(i18n.t("defectRecovered"));
    } catch (error) {
      onError(i18n.t("failedToRestoreDefect"));
      console.error(error);
      set({ error, loading: false });
    }
  },

  clearTrashBin: () => {
    const { cameras } = get();
    try {
      set({ loading: true, error: null });
      set({
        cameras: cameras.map((c) => ({
          ...c,
          defects: c.defects.filter((d) => !d.deletedAt),
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

  clearTrashBinByDates: (startDate, endDate) => {
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
      set({ loading: true, error: null });

      let foundSomething = false;

      const updatedCameras = cameras.map((camera) => ({
        ...camera,
        defects: camera.defects.filter((defect) => {
          if (!defect.deletedAt) return true;

          const defectDate = new Date(defect.date);
          const shouldDelete = defectDate >= start && defectDate <= end;

          if (shouldDelete) {
            foundSomething = true;
            return false;
          }

          return true;
        }),
      }));

      if (!foundSomething) {
        onWarning(i18n.t("noDefectsFoundInPeriod"));
        set({ loading: false });
        return;
      }

      set({
        cameras: updatedCameras,
        loading: false,
        error: false,
      });

      onSuccess(i18n.t("trashClearedForPeriod"));
    } catch (error) {
      onError(i18n.t("failedToClearTrashForPeriod"));
      console.error(error);
      set({ error, loading: false });
    }
  },

  refreshErrors: () => {
    set({ errors: { ...initialErrors } });
  },
}));

export default useCamerasStore;
