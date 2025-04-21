import Select, { components, DropdownIndicatorProps } from "react-select";
import { IDropdown, IDropdownData } from "./types";
import { FC } from "react";
import clsx from "clsx";
import styles from "./Dropdown.module.scss";
import { BottomIcon } from "../../../assets/icons";

const Dropdown: FC<IDropdown> = ({
  data,
  setValue,
  value,
  label,
  wrapperStyle,
  labelStyle,
  iconScale,
  controlBackgroundColor = "var(--textFieldInFolderBg)",
  controlHeight = "20px",
  fontSize = "16px",
  valueMargin = "8px",
  borderRadius = "6px",
}) => {
  const CustomDropdownIndicator = (
    props: DropdownIndicatorProps<IDropdownData, false>
  ) => {
    return (
      <components.DropdownIndicator {...props}>
        <BottomIcon
          scale={iconScale}
          cssStyle={{
            transform: props.selectProps.menuIsOpen
              ? "rotate(180deg)"
              : "rotate(0deg)",
            transition: "0.3s",
          }}
        />
      </components.DropdownIndicator>
    );
  };

  return (
    <div className={clsx(styles.wrapper, wrapperStyle)}>
      {label && <span className={clsx(styles.label, labelStyle)}>{label}</span>}
      <Select<IDropdownData>
        options={data}
        onChange={(item) => {
          if (item) {
            setValue(item.value);
          }
        }}
        value={data.find((item) => item.value === value)}
        components={{ DropdownIndicator: CustomDropdownIndicator }}
        isSearchable={false}
        styles={{
          control: (base, state) => ({
            ...base,
            backgroundColor: controlBackgroundColor,
            borderRadius: state.menuIsOpen
              ? `${borderRadius} ${borderRadius} 0 0`
              : borderRadius,
            border: "none",
            boxShadow: "none",
            minHeight: "20px",
            height: controlHeight,
            cursor: "pointer",
            padding: 0,
          }),
          valueContainer: (base) => ({
            ...base,
            padding: 0,
            height: controlHeight,
          }),
          input: (base) => ({
            ...base,
            margin: 0,
            padding: 0,
            height: controlHeight,
          }),
          singleValue: (base) => ({
            ...base,
            margin: `0 ${valueMargin}`,
            fontSize,
            lineHeight: "20px",
            fontWeight: 400,
            color: "var(--mainText)",
            fontFamily: "Segoe UI",
          }),
          option: (base, state) => ({
            ...base,
            transition: "0.3s",
            backgroundColor: state.isSelected
              ? "var(--blue2)"
              : state.isFocused
              ? "var(--blue2)"
              : "var(--modalBtns)",
            color: "var(--mainText)",
            fontFamily: "Segoe UI",
            fontSize,
            lineHeight: "20px",
            padding: valueMargin,
            cursor: "pointer",
          }),
          menu: (base) => ({
            ...base,
            backgroundColor: "var(--modalBtns)",
            borderRadius: "0 0 6px 6px",
            marginTop: 0,
            zIndex: 20,
          }),
          dropdownIndicator: (base) => ({
            ...base,
            padding: `0 ${valueMargin}`,
          }),
          indicatorSeparator: () => ({
            display: "none",
          }),
        }}
      />
    </div>
  );
};

export default Dropdown;
