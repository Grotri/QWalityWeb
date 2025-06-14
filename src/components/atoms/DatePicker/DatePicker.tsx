import { FC, useState } from "react";
import { IDatePicker } from "./types";
import styles from "./DatePicker.module.scss";
import dayjs, { Dayjs } from "dayjs";
import "dayjs/locale/ru";
dayjs.locale("ru");

import { LocalizationProvider, MobileDatePicker } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { formatDate } from "../../../helpers/formatDate";
import { useTranslation } from "react-i18next";

const DatePicker: FC<IDatePicker> = ({
  date,
  setDate,
  bgColor = "var(--dateAndListSelectsPopupBg)",
  height = "27px",
}) => {
  const { t } = useTranslation();
  const [show, setShow] = useState<boolean>(false);
  const [tempDate, setTempDate] = useState<Dayjs | null>(
    date ? dayjs(date) : null
  );

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="ru">
      <div className={styles.wrapper}>
        <div
          className={styles.datePicker}
          onClick={() => setShow(true)}
          style={{
            backgroundColor: bgColor,
            height,
          }}
        >
          <span className={styles.date}>
            {date ? formatDate(date) : "DD.MM.YYYY"}
          </span>
        </div>
        <MobileDatePicker
          open={show}
          value={tempDate}
          onChange={(newValue) => setTempDate(newValue)}
          onAccept={(newValue) => {
            if (newValue) {
              setDate(newValue.toDate());
            }
            setShow(false);
          }}
          onClose={() => setShow(false)}
          format="DD MMMM YYYY"
          localeText={{
            cancelButtonLabel: t("cancel"),
            toolbarTitle: t("selectDate"),
          }}
          slotProps={{
            textField: { style: { display: "none" } },
          }}
        />
      </div>
    </LocalizationProvider>
  );
};

export default DatePicker;
