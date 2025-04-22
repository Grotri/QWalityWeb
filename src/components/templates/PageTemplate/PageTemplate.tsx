import { FC, PropsWithChildren, useState } from "react";
import styles from "./PageTemplate.module.scss";
import { BackIcon, LogoIcon } from "../../../assets/icons";
import { useNavigate } from "react-router-dom";
import { IPageTemplate } from "./types";
import clsx from "clsx";
import { menuItems } from "../../../constants/menuItems";

const PageTemplate: FC<PropsWithChildren & IPageTemplate> = ({
  backPath,
  headerTitle,
  canScroll = false,
  hasMenu = false,
  children,
}) => {
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);

  const handleOverlayClick = () => {
    setIsMenuOpen(false);
  };

  return (
    <div className={clsx(styles.wrapper, canScroll && styles.scrollWrapper)}>
      {(backPath || headerTitle) && (
        <div className={styles.header}>
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
        </div>
      )}
      {hasMenu && (
        <>
          <div
            className={clsx(styles.bgMenuOverlay, isMenuOpen && styles.visible)}
            onClick={handleOverlayClick}
          />
          <div className={styles.menuWrapper}>
            <input
              type="checkbox"
              className={styles.menuCheckbox}
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              checked={isMenuOpen}
            />
            <span className={styles.burgerLine} />
            <span className={styles.burgerLine} />
            <span className={styles.burgerLine} />
            <span
              className={clsx(
                styles.burgerTitle,
                isMenuOpen && styles.burgerTitleNone
              )}
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
      <main
        className={clsx(
          styles["main-wrapper"],
          canScroll && styles.mainWrapperScroll
        )}
      >
        {children}
      </main>
    </div>
  );
};

export default PageTemplate;
