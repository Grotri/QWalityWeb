import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  styled,
} from "@mui/material";

export const CustomAccordion = styled(Accordion)({
  backgroundColor: "var(--bg)",
  boxShadow: "none",
  border: "none",
  margin: 0,
  display: "flex",
  flexDirection: "column",
  "& .Mui-expanded": {
    minHeight: "0 !important",
    padding: 0,
  },
  "&.Mui-expanded": {
    margin: "0 !important",
  },
  "& .MuiAccordionSummary-content": {
    minHeight: "0 !important",
    margin: "8px 0 !important",
  },
});

export const CustomAccordionSummary = styled(AccordionSummary)({
  margin: "8px 0 !important",
  padding: 0,
});

export const CustomAccordionDetails = styled(AccordionDetails)({
  padding: 0,
});
