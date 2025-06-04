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
  "&::before": {
    height: "0",
  },
  "& .MuiAccordionSummary-content": {
    minHeight: "0 !important",
    margin: "0 !important",
  },
});

export const CustomAccordionSummary = styled(AccordionSummary)({
  backgroundColor: "var(--subBg)",
  borderRadius: "12px",
  margin: "12px 0 0 0 !important",
  padding: "12px 20px",
  minHeight: "0 !important",
  transition: "0.3s",
  "&.Mui-expanded": {
    padding: "12px 20px",
    minHeight: "0 !important",
    borderRadius: "12px 12px 0 0",
  },
  "& .MuiAccordionSummary-expandIconWrapper": {
    transition: "transform 300ms cubic-bezier(0.4, 0, 0.2, 1) 0ms !important",
  },
  "@media (max-width: 424.89px)": {
    padding: "12px !important",
  },
});

export const CustomAccordionDetails = styled(AccordionDetails)({
  padding: 0,
});
