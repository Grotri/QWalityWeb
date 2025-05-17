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
import { useTranslation } from "react-i18next";

const Main: FC<{ search: string }> = ({ search }) => {
  const { t } = useTranslation();
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
    {
      id: "online",
      title: `${t("online")} (${onlineCameras.length})`,
      cameras: onlineCameras,
    },
    {
      id: "offline",
      title: `${t("offline")} (${offlineCameras.length})`,
      cameras: offlineCameras,
    },
  ];

  const handleSectionChange =
    (sectionId: string) => (_: SyntheticEvent, newExpanded: boolean) => {
      setActiveSection(newExpanded ? sectionId : false);
    };

  useEffect(() => {
    setCameras([...camerasInfo.filter((c) => !c.deletedAt)]);
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
            key={section.id}
            expanded={activeSection === section.id}
            onChange={handleSectionChange(section.id)}
          >
            <CustomAccordionSummary
              expandIcon={
                <BottomIcon scale={2.5} stroke={1.5} style={styles.arrowIcon} />
              }
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
                      ? t("noCamerasInCategory")
                      : t("noCamerasFound")}
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
          text={t("addCamera")}
          onPress={() => {
            if (cameras.length < cameraLimits) {
              setIsAddCameraModalOpen(true);
            } else {
              onError(t("camerasLimitReached"));
            }
          }}
          customBtn={styles.bottomBtn}
        />
      )}
    </div>
  );
};

export default Main;
