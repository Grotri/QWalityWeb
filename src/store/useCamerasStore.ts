import { create } from "zustand";
import { IStoreStatus } from "../model/misc";
import { initialCameras } from "../constants/cameras";
import { EErrors } from "../constants/errors";
import { v4 as uuidv4 } from "uuid";
import { ICamera } from "../model/camera";
import { onError, onSuccess, onWarning } from "../helpers/toast";

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
      onError("Не удалось загрузить список камер");
      console.error(error);
      set({ error, loading: false });
    }
  },

  setErrorsField: (field, error) =>
    set((state) => ({ errors: { ...state.errors, [field]: error } })),

  validate: (name, link) => {
    const newErrors: IErrors = {
      name: !name.trim() ? EErrors.required : "",
      link: !link.trim() ? EErrors.required : "",
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
        title: name,
        uptime: "0д 0ч 0м",
        defects: [],
        link,
      };

      try {
        set({
          loading: true,
          cameras: [...cameras, newCamera],
        });
        onSuccess(`Камера "${name}" успешно добавлена`);
      } catch (error) {
        console.log(error);
        onError("Произошла ошибка при добавлении камеры");
      } finally {
        set({ loading: false });
      }
    } else {
      onError(EErrors.fields);
    }
  },

  editCamera: (camera, onEdit) => {
    const { validate, cameras } = get();
    const oldCamera = cameras.find((c) => c.id === camera.id);

    if (JSON.stringify(oldCamera) !== JSON.stringify(camera)) {
      if (validate(camera.title, camera.link)) {
        try {
          set({
            loading: true,
            cameras: cameras.map((c) => (c.id === camera.id ? camera : c)),
          });
          onEdit(null);
          onSuccess("Данные камеры успешно отредактированы");
        } catch (error) {
          console.log(error);
          onError("Произошла ошибка при редактировании камеры");
        } finally {
          set({ loading: false });
        }
      } else {
        onError(EErrors.fields);
      }
    } else {
      onWarning(EErrors.noChanges);
    }
  },

  deleteCamera: (camera) => {
    const { cameras } = get();
    try {
      set({ loading: true, error: null });
      set({
        cameras: cameras.filter((c) => c.id !== camera.id),
        errors: { ...initialErrors },
        loading: false,
        error: false,
      });
      onSuccess(`Камера "${camera.title}" успешно удалена`);
    } catch (error) {
      onError("Не удалось удалить камеру");
      console.error(error);
      set({ error, loading: false });
    }
  },

  deleteHistory: (id) => {
    const { cameras } = get();
    try {
      set({ loading: true, error: null });
      set({
        cameras: cameras.map((camera: ICamera) =>
          camera.id === id ? { ...camera, defects: [] } : camera
        ),
        errors: { ...initialErrors },
        loading: false,
        error: false,
      });
      onSuccess(`История камеры успешно удалена`);
    } catch (error) {
      onError("Не удалось удалить историю камеры");
      console.error(error);
      set({ error, loading: false });
    }
  },

  deleteDefect: (cameraId, defectId) => {
    const { cameras } = get();
    try {
      set({ loading: true, error: null });
      set({
        cameras: cameras.map((c) =>
          c.id === cameraId
            ? {
                ...c,
                defects: c.defects.map((d) =>
                  d.id === defectId ? { ...d, isDeleted: true } : d
                ),
              }
            : c
        ),
        loading: false,
        error: false,
      });
      onSuccess("Дефект перемещен в корзину");
    } catch (error) {
      onError("Не удалось удалить дефект");
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
                  d.id === defectId ? { ...d, isDeleted: false } : d
                ),
              }
            : c
        ),
        loading: false,
        error: false,
      });
      onSuccess("Дефект восстановлен");
    } catch (error) {
      onError("Не удалось восстановить дефект");
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
          defects: c.defects.filter((d) => !d.isDeleted),
        })),
        loading: false,
        error: false,
      });
      onSuccess("Корзина очищена");
    } catch (error) {
      onError("Не удалось очистить корзину");
      console.error(error);
      set({ error, loading: false });
    }
  },

  clearTrashBinByDates: (startDate, endDate) => {
    const { cameras } = get();

    if (!startDate || !endDate) {
      onError(EErrors.chooseDates);
      return;
    }

    if (startDate > endDate) {
      onError(EErrors.timeDates);
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
          if (!defect.isDeleted) return true;

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
        onWarning("За выбранный период дефекты не найдены");
        set({ loading: false });
        return;
      }

      set({
        cameras: updatedCameras,
        loading: false,
        error: false,
      });

      onSuccess("Корзина за данный промежуток очищена");
    } catch (error) {
      onError("Не удалось очистить корзину за данный промежуток");
      console.error(error);
      set({ error, loading: false });
    }
  },

  refreshErrors: () => {
    set({ errors: { ...initialErrors } });
  },
}));

export default useCamerasStore;
