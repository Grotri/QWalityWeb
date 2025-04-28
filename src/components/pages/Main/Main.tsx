import { FC, SyntheticEvent, useEffect, useState } from "react";
import useCamerasStore from "../../../store/useCamerasStore";
import { ICamera } from "../../../model/camera";
import { IDefect } from "../../../model/defect";
import styles from "./Main.module.scss";
import {
  CustomAccordion,
  CustomAccordionDetails,
  CustomAccordionSummary,
} from "./styles";
import AddCameraModal from "../../organisms/AddCameraModal";
import { BottomIcon, PlusIcon } from "../../../assets/icons";
import BottomFixIcon from "../../molecules/BottomFixIcon";
import CameraAccordion from "../../organisms/CameraAccordion";
import useAuthStore from "../../../store/useAuthStore";
import { useCameraLimits } from "../../../helpers/useCameraLimits";
import { onError } from "../../../helpers/toast";

const Main: FC<{ search: string }> = ({ search }) => {
  const { cameras: camerasInfo } = useCamerasStore();
  const cameraLimits = useCameraLimits();
  const { user } = useAuthStore();
  const [cameras, setCameras] = useState<ICamera[]>([]);
  const [isAddCameraModalOpen, setIsAddCameraModalOpen] =
    useState<boolean>(false);
  const [selectedCamera, setSelectedCamera] = useState<ICamera | null>(null);
  const [isHistoryModalOpen, setIsHistoryModalOpen] = useState<boolean | null>(
    null
  );
  const [isSortCameraModalOpen, setIsSortCameraModalOpen] =
    useState<boolean>(false);
  const [isSortOflCameraModalOpen, setIsSortOflCameraModalOpen] =
    useState<boolean>(false);
  const [isFilterCameraModalOpen, setIsFilterCameraModalOpen] =
    useState<boolean>(false);
  const [isFilterCameraOflModalOpen, setIsFilterCameraOflModalOpen] =
    useState<boolean>(false);
  const [selectedDefect, setSelectedDefect] = useState<IDefect | null>(null);
  const [activeSection, setActiveSection] = useState<string | false>(false);

  const onlineCameras = cameras.filter((camera) => camera.online);
  const offlineCameras = cameras.filter((camera) => !camera.online);

  const sections = [
    { title: `Online (${onlineCameras.length})`, cameras: onlineCameras },
    { title: `Offline (${offlineCameras.length})`, cameras: offlineCameras },
  ];

  const handleSectionChange =
    (section: string) => (_: SyntheticEvent, newExpanded: boolean) => {
      setActiveSection(newExpanded ? section : false);
    };

  useEffect(() => {
    setCameras([...camerasInfo]);
    setIsAddCameraModalOpen(false);
  }, [camerasInfo]);

  return (
    <div className={styles.wrapper}>
      {sections.map((section, index) => {
        const filteredCameras = section.cameras.filter((camera) =>
          camera.title.toLowerCase().includes(search.toLowerCase())
        );
        return (
          <CustomAccordion
            key={section.title}
            expanded={activeSection === section.title}
            onChange={handleSectionChange(section.title)}
          >
            <CustomAccordionSummary
              expandIcon={<BottomIcon scale={2.5} stroke={1.5} />}
            >
              <div className={styles.header}>
                <span className={styles.headerText}>{section.title}</span>
              </div>
            </CustomAccordionSummary>
            <CustomAccordionDetails>
              {filteredCameras.length === 0 ? (
                <div className={styles.emptyList}>
                  <span className={styles.emptyText}>
                    {!section.cameras.length
                      ? "Камер в данной категории нет"
                      : "Нет камер по заданному поиску"}
                  </span>
                </div>
              ) : (
                <CameraAccordion
                  sections={filteredCameras}
                  selectedCamera={selectedCamera}
                  setSelectedCamera={setSelectedCamera}
                  isHistoryModalOpen={isHistoryModalOpen}
                  setIsHistoryModalOpen={setIsHistoryModalOpen}
                  isSortCameraModalOpen={
                    index === 0
                      ? isSortCameraModalOpen
                      : isSortOflCameraModalOpen
                  }
                  setIsSortCameraModalOpen={
                    index === 0
                      ? setIsSortCameraModalOpen
                      : setIsSortOflCameraModalOpen
                  }
                  isFilterCameraModalOpen={
                    index === 0
                      ? isFilterCameraModalOpen
                      : isFilterCameraOflModalOpen
                  }
                  setIsFilterCameraModalOpen={
                    index === 0
                      ? setIsFilterCameraModalOpen
                      : setIsFilterCameraOflModalOpen
                  }
                  selectedDefect={selectedDefect}
                  setSelectedDefect={setSelectedDefect}
                />
              )}
            </CustomAccordionDetails>
          </CustomAccordion>
        );
      })}
      <AddCameraModal
        isOpen={isAddCameraModalOpen}
        setIsOpen={setIsAddCameraModalOpen}
      />
      {user.role !== "user" && (
        <BottomFixIcon
          icon={<PlusIcon />}
          text="Добавить камеру"
          onPress={() => {
            if (camerasInfo.length < cameraLimits) {
              setIsAddCameraModalOpen(true);
            } else {
              onError("Достигнут лимит камер");
            }
          }}
        />
      )}
    </div>
  );
};

export default Main;
