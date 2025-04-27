import { FC, PropsWithChildren, useState } from "react";
import styles from "./PageTemplate.module.scss";
import {
  BackIcon,
  LogoIcon,
  ProfileIcon,
  SearchIcon,
  SettingsIcon,
} from "../../../assets/icons";
import { useNavigate } from "react-router-dom";
import { IPageTemplate } from "./types";
import clsx from "clsx";
import { menuItems } from "../../../constants/menuItems";
import { ERoutes } from "../../../router/routes";
import Input from "../../atoms/Input/Input";
import SettingsModal from "../../organisms/SettingsModal";

const PageTemplate: FC<PropsWithChildren & IPageTemplate> = ({
  backPath,
  headerTitle,
  canScroll = false,
  hasMenu = false,
  isMainPage = false,
  centralized = false,
  search,
  setSearch,
  children,
}) => {
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);
  const [isSettingsOpen, setIsSettingsOpen] = useState<boolean>(false);

  const handleOverlayClick = () => {
    setIsMenuOpen(false);
  };

  return (
    <div className={clsx(styles.wrapper, canScroll && styles.scrollWrapper)}>
      {(backPath || headerTitle || hasMenu || isMainPage) && (
        <div className={clsx(styles.header, canScroll && styles.headerShadow)}>
          {backPath && (
            <div
              className={styles.backIcon}
              onClick={() => {
                if (backPath) {
                  navigate(backPath);
                }
              }}
            >
              <BackIcon />
            </div>
          )}
          {headerTitle && (
            <div className={styles.titleWrapper}>
              <span className={styles.title}>{headerTitle}</span>
            </div>
          )}
          {hasMenu && (
            <>
              <div
                className={clsx(
                  styles.bgMenuOverlay,
                  isMenuOpen && styles.visible
                )}
                onClick={handleOverlayClick}
              />
              <div className={styles.menuWrapper}>
                <input
                  type="checkbox"
                  className={styles.menuCheckbox}
                  checked={isMenuOpen}
                  onClick={() => setIsMenuOpen(!isMenuOpen)}
                />
                <span className={styles.burgerLine} />
                <span className={styles.burgerLine} />
                <span className={styles.burgerLine} />
                <span
                  className={clsx(
                    styles.burgerTitle,
                    isMenuOpen && styles.burgerTitleNone
                  )}
                  onClick={() => setIsMenuOpen(!isMenuOpen)}
                >
                  Меню
                </span>
                <div className={styles.menu}>
                  <LogoIcon />
                  <div className={styles.menuItems}>
                    {menuItems.map(({ icon: Icon, path, title }) => (
                      <div
                        className={styles.menuItem}
                        onClick={() => {
                          navigate(path);
                          setIsMenuOpen(false);
                        }}
                      >
                        <Icon />
                        <span className={styles.menuItemTitle}>{title}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </>
          )}
          {isMainPage && (
            <Input
              value={search || ""}
              placeholder="Поиск..."
              onChangeText={(text: string) => {
                if (setSearch) {
                  setSearch(text);
                }
              }}
              iconRight={<SearchIcon />}
              className={styles.inputWrapper}
              inputClassName={styles.input}
              inputFieldClassName={styles.inputText}
            />
          )}
          {isMainPage && (
            <div className={styles.mainPageIcons}>
              <div
                className={styles.mainPageIcon}
                onClick={() => navigate(ERoutes.profile)}
              >
                <ProfileIcon width={48} />
                <span className={styles.mainPageIconTitle}>Профиль</span>
              </div>
              <div
                className={styles.mainPageIcon}
                onClick={() => setIsSettingsOpen(!isSettingsOpen)}
              >
                <SettingsIcon
                  width={48}
                  stroke={2.5}
                  style={clsx(
                    styles.settingsIcon,
                    isSettingsOpen && styles.settingsIconRotated
                  )}
                />
                <span className={styles.mainPageIconTitle}>Настройки</span>
              </div>
            </div>
          )}
          <SettingsModal
            isOpen={isSettingsOpen}
            setIsOpen={setIsSettingsOpen}
          />
        </div>
      )}
      <main
        className={clsx(
          styles.mainWrapper,
          canScroll && styles.mainWrapperScroll,
          centralized && styles.mainWrapperCentralized
        )}
      >
        {children}
      </main>
    </div>
  );
};

export default PageTemplate;
