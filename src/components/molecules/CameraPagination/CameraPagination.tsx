import { FC } from "react";
import { ICameraPagination } from "./types";
import styles from "./CameraPagination.module.scss";
import { LeftIcon } from "../../../assets/icons";
import Button from "../../atoms/Button";
import clsx from "clsx";

const CameraPagination: FC<ICameraPagination> = ({
  total,
  current,
  onPageChange,
}) => {
  const pages = Math.ceil(total / 5);
  if (pages <= 1) return null;

  const createRange = () => {
    const range: (number | string)[] = [];
    const pagesToShow = 5;

    if (pages <= pagesToShow) {
      return Array.from({ length: pages }, (_, i) => i + 1);
    }

    range.push(1);

    const start = Math.max(2, current - 1);
    const end = Math.min(pages - 1, current + 1);

    if (start > 2) range.push("...");

    for (let i = start; i <= end; i++) {
      range.push(i);
    }

    if (end < pages - 1) range.push("...");

    range.push(pages);

    return range;
  };

  return (
    <div className={styles.pagination}>
      <LeftIcon
        onClick={() => onPageChange(Math.max(current - 1, 1))}
        style={clsx(current === 1 && styles.iconDisabled)}
      />
      {createRange().map((item, index) => (
        <Button
          key={index}
          onPress={() => {
            if (typeof item === "number") {
              onPageChange(item);
            }
          }}
        >
          <span
            className={clsx(
              styles.pageText,
              item === current && styles.pageTextActive,
              typeof item === "string" && styles.dots
            )}
          >
            {item}
          </span>
        </Button>
      ))}
      <LeftIcon
        onClick={() => onPageChange(Math.min(current + 1, pages))}
        style={clsx(styles.rightIcon, current === pages && styles.iconDisabled)}
      />
    </div>
  );
};

export default CameraPagination;
