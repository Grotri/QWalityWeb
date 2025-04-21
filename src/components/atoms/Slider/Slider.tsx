import ReactSlider from "@mui/material/Slider";
import { styled } from "@mui/material";
import { FC } from "react";
import { ISlider } from "./types";

const PrettoSlider = styled(ReactSlider)({
  color: "#52af77",
  height: 8,
  borderRadius: 6,
  padding: "6px 0 !important",
  "& .MuiSlider-track": {
    border: "none",
    backgroundColor: "#6289ED",
  },
  "& .MuiSlider-thumb": {
    height: 20,
    width: 20,
    backgroundColor: "#D9D9D9",
    boxShadow: "0px 0px 4px 1px rgba(0, 0, 0, 0.25)",
    "&:focus, &:hover, &.Mui-active, &.Mui-focusVisible": {
      boxShadow: "0px 0px 4px 1px rgba(0, 0, 0, 0.25)",
    },
    "&::before": {
      display: "none",
    },
  },
  "& .MuiSlider-valueLabel": {
    padding: 0,
    width: 50,
    height: 34,
    borderRadius: 4,
    backgroundColor: "#6289ED",
    transform: "translateY(3px) scale(-1) !important",
  },
  "& .MuiSlider-valueLabel > *": {
    transform: "scale(-1)",
  },
  "& .MuiSlider-rail": {
    backgroundColor: "var(--textFieldInFolderBg)",
  },
});

const Slider: FC<ISlider> = ({ value, onChange }) => (
  <PrettoSlider
    min={0}
    max={1}
    step={0.01}
    value={value}
    onChange={(_, val) => onChange(val as number)}
    valueLabelDisplay="on"
    valueLabelFormat={(value) => `${Math.round(value * 100)}%`}
  />
);

export default Slider;
