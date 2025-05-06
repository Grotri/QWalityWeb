import { FC, SyntheticEvent, useEffect, useState } from "react";
import { ICameraAccordion } from "./types";
import useCamerasStore from "../../../store/useCamerasStore";
import { ESortOptions } from "../CameraSortModal/enums";
import { ICameraFilter, initialCameraFilter } from "../CameraFilterModal/types";
import { IDefect } from "../../../model/defect";
import {
  CustomAccordion,
  CustomAccordionDetails,
  CustomAccordionSummary,
} from "./styles";
import {
  BottomIcon,
  CameraIcon,
  FilterIcon,
  SettingsIcon,
  SortIcon,
} from "../../../assets/icons";
import styles from "./CameraAccordion.module.scss";
import { filterDefects, sortDefects } from "./utils";
import Button from "../../atoms/Button";
import Defect from "../../molecules/Defect";
import clsx from "clsx";
import CameraPagination from "../../molecules/CameraPagination";
import CameraSettingsModal from "../CameraSettingsModal";
import CameraSortModal from "../CameraSortModal";
import CameraFilterModal from "../CameraFilterModal";
import DefectSaveModal from "../DefectSaveModal";
import useAuthStore from "../../../store/useAuthStore";

const CameraAccordion: FC<ICameraAccordion> = ({
  sections,
  selectedCamera,
  setSelectedCamera,
  isHistoryModalOpen,
  setIsHistoryModalOpen,
  isSortCameraModalOpen,
  setIsSortCameraModalOpen,
  isFilterCameraModalOpen,
  setIsFilterCameraModalOpen,
  selectedDefect,
  setSelectedDefect,
}) => {
  const DEFAULT_PAGE_CAPACITY = 5;
  const { deleteDefect } = useCamerasStore();
  const { user } = useAuthStore();
  const [activeSection, setActiveSection] = useState<string | false>(false);
  const [cameraPages, setCameraPages] = useState<Record<string, number>>({});
  const [sortModalCameraId, setSortModalCameraId] = useState<string | null>(
    null
  );
  const [cameraSortOptions, setCameraSortOptions] = useState<
    Record<string, keyof typeof ESortOptions>
  >({});
  const [filterModalCameraId, setFilterModalCameraId] = useState<string | null>(
    null
  );
  const [cameraFilterOptions, setCameraFilterOptions] = useState<
    Record<string, ICameraFilter>
  >({});

  const handleSectionChange =
    (section: string) => (_: SyntheticEvent, newExpanded: boolean) => {
      setActiveSection(newExpanded ? section : false);
    };

  const handlePageChange = (cameraId: string, newPage: number) => {
    setCameraPages({ ...cameraPages, [cameraId]: newPage });
  };

  const getPagedDefects = (
    defects: IDefect[],
    page: number,
    pageSize = DEFAULT_PAGE_CAPACITY
  ) => {
    const start = (page - 1) * pageSize;
    return defects.slice(start, start + pageSize);
  };

  const handleSortApply = (
    cameraId: string,
    selectedOption?: keyof typeof ESortOptions
  ) => {
    if (selectedOption) {
      setCameraSortOptions({
        ...cameraSortOptions,
        [cameraId]: selectedOption,
      });
    } else {
      const updatedSorts = Object.fromEntries(
        Object.entries(cameraSortOptions).filter(([key]) => key !== cameraId)
      );
      setCameraSortOptions(updatedSorts);
    }
  };

  const handleFilterApply = (cameraId: string, filter: ICameraFilter) => {
    if (JSON.stringify(filter) === JSON.stringify(initialCameraFilter)) {
      const updatedFilters = Object.fromEntries(
        Object.entries(cameraFilterOptions).filter(([key]) => key !== cameraId)
      );
      setCameraFilterOptions(updatedFilters);
    } else {
      setCameraFilterOptions({
        ...cameraFilterOptions,
        [cameraId]: filter,
      });
    }
    if (cameraPages[cameraId]) {
      handlePageChange(cameraId, 1);
    }
  };

  useEffect(() => {
    setActiveSection(false);
  }, [sections.length]);

  return (
    <div className={styles.wrapper}>
      {sections.map((camera) => {
        const defects = camera.defects.filter((defect) => !defect.deletedAt);
        const page = cameraPages[camera.id] || 1;
        const sortOption = cameraSortOptions[camera.id];
        const filterOption = cameraFilterOptions[camera.id];
        const sortedDefects = sortOption
          ? sortDefects(defects, sortOption)
          : defects;
        const filteredDefects = filterOption
          ? filterDefects(sortedDefects, filterOption)
          : sortedDefects;
        const pagedDefects = getPagedDefects(filteredDefects, page);

        return (
          <CustomAccordion
            key={camera.id}
            expanded={activeSection === camera.id}
            onChange={handleSectionChange(camera.id)}
          >
            <CustomAccordionSummary
              expandIcon={
                <BottomIcon scale={2.5} stroke={1.5} style={styles.arrowIcon} />
              }
            >
              <div className={styles.headerMain}>
                <div className={styles.cameraNameWrapper}>
                  <div className={styles.cameraName}>
                    <div className={styles.cameraIcon}>
                      <CameraIcon />
                    </div>
                    <span className={styles.cameraTitle}>{camera.title}</span>
                  </div>
                  <span className={styles.defectText}>
                    {defects.length}/100 дефектов
                  </span>
                  <span className={styles.defectText}>{defects.length}%</span>
                </div>
                <div className={styles.line} />
                <div className={styles.stateWrapper}>
                  <div className={styles.state}>
                    <div
                      className={styles.circle}
                      style={{
                        backgroundColor: camera.online
                          ? "var(--greenOnline)"
                          : "var(--red)",
                      }}
                    />
                    <span className={styles.stateName}>
                      {camera.online ? "Online" : "Offline"}
                    </span>
                  </div>
                  <span className={styles.uptime}>Аптайм {camera.uptime}</span>
                </div>
              </div>
            </CustomAccordionSummary>
            <CustomAccordionDetails>
              <div className={styles.contentWrapper}>
                {(user.role !== "user" || defects.length > 0) && (
                  <div className={styles.settingsWrapper}>
                    <div className={styles.settingsIcons}>
                      {user.role !== "user" && (
                        <Button
                          style={styles.icon}
                          onPress={() => {
                            setSelectedCamera(camera);
                          }}
                        >
                          <SettingsIcon width={19} />
                          <span>Настроить</span>
                        </Button>
                      )}
                      {defects.length > 0 && (
                        <>
                          <Button
                            style={clsx(
                              styles.icon,
                              sortOption && styles.activeIcon
                            )}
                            onPress={() => {
                              setSortModalCameraId(camera.id);
                              setIsSortCameraModalOpen(true);
                            }}
                          >
                            <SortIcon />
                            <span>Сортировать</span>
                          </Button>
                          <Button
                            style={clsx(
                              styles.icon,
                              filterOption && styles.activeIcon
                            )}
                            onPress={() => {
                              setFilterModalCameraId(camera.id);
                              setIsFilterCameraModalOpen(true);
                            }}
                          >
                            <FilterIcon />
                            <span>Фильтровать</span>
                          </Button>
                        </>
                      )}
                    </div>
                    <div className={styles.horizontalLine} />
                  </div>
                )}
                <div
                  className={styles.defects}
                  style={{
                    marginBottom:
                      filteredDefects.length <= DEFAULT_PAGE_CAPACITY
                        ? "8px"
                        : 0,
                  }}
                >
                  {filteredDefects.length > 0 ? (
                    pagedDefects.map((defect: IDefect) => (
                      <Defect
                        key={defect.id}
                        defect={defect}
                        textBtn={user.role !== "user" ? "Скрыть" : undefined}
                        setSelectedDefect={setSelectedDefect}
                        onPress={() => deleteDefect(camera.id, defect.id)}
                        pressableIcon
                      />
                    ))
                  ) : (
                    <span className={styles.noDefects}>
                      Дефектов не обнаружено
                    </span>
                  )}
                </div>
                <CameraPagination
                  total={filteredDefects.length}
                  current={page}
                  onPageChange={(newPage) =>
                    handlePageChange(camera.id, newPage)
                  }
                />
              </div>
            </CustomAccordionDetails>
          </CustomAccordion>
        );
      })}
      <CameraSettingsModal
        camera={selectedCamera}
        setCamera={setSelectedCamera}
        isHistoryModalOpen={isHistoryModalOpen}
        setIsHistoryModalOpen={setIsHistoryModalOpen}
      />
      <CameraSortModal
        initialOption={
          sortModalCameraId && cameraSortOptions[sortModalCameraId]
            ? cameraSortOptions[sortModalCameraId]
            : undefined
        }
        isOpen={isSortCameraModalOpen}
        setIsOpen={(isOpen) => {
          setIsSortCameraModalOpen(isOpen);
          if (!isOpen) {
            setSortModalCameraId(null);
          }
        }}
        onApply={(option) => {
          if (sortModalCameraId) {
            handleSortApply(sortModalCameraId, option);
          }
        }}
      />
      <CameraFilterModal
        isOpen={isFilterCameraModalOpen}
        setIsOpen={(isOpen) => {
          setIsFilterCameraModalOpen(isOpen);
          if (!isOpen) setFilterModalCameraId(null);
        }}
        initialFilter={
          filterModalCameraId && cameraFilterOptions[filterModalCameraId]
            ? cameraFilterOptions[filterModalCameraId]
            : { ...initialCameraFilter }
        }
        onApply={(filter) => {
          if (filterModalCameraId) {
            handleFilterApply(filterModalCameraId, filter);
          }
        }}
      />
      <DefectSaveModal
        defect={selectedDefect}
        onClose={() => setSelectedDefect(null)}
      />
    </div>
  );
};

export default CameraAccordion;
