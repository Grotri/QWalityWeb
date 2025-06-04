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
    margin: "12px 0 !important",
  },
});

export const CustomAccordionSummary = styled(AccordionSummary)({
  margin: "12px 0 !important",
  padding: "0 20px !important",
  minHeight: "0 !important",
  "& .MuiAccordionSummary-expandIconWrapper": {
    transition: "transform 300ms cubic-bezier(0.4, 0, 0.2, 1) 0ms !important",
  },
  borderRadius: "12px",
  "@media (max-width: 424.89px)": {
    padding: "0 12px !important",
    margin: "0 !important",
  },
});

export const CustomAccordionDetails = styled(AccordionDetails)({
  padding: 0,
});
