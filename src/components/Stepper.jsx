import { Fragment, useEffect, useState } from "react";
import { Box, Chip } from "@mui/material";
import { FlexRowCenter } from "components/flex-box";

// ========================================================

// ========================================================

const Stepper = ({
  selectedStep = 1,
  stepperList,
  onChange
}) => {
  const [selected, setSelected] = useState(selectedStep - 1);
  const handleStepClick = (step, ind) => () => {
    if (!step.disabled) {
      setSelected(ind);
      if (onChange) onChange(ind);
    }
  };
  useEffect(() => {
    setSelected(selectedStep - 1);
  }, [selectedStep]);
  return <FlexRowCenter flexWrap="wrap" my="-4px">
      {stepperList.map((step, ind) => <Fragment key={step.title}>
          <Chip disabled={step.disabled} label={`${ind + 1}. ${step.title}`} onClick={handleStepClick(step, ind)} sx={{
        backgroundColor: ind <= selected ? "warning.main" : "rgba(8, 12, 18, 0.35)",
        backdropFilter: "blur(8px)",
        border: "1px solid",
        borderColor: ind <= selected ? "rgba(255, 255, 255, 0.18)" : "rgba(255, 255, 255, 0.22)",
        color: ind <= selected ? "warning.contrastText" : "text.primary",
        p: "0.5rem 1rem",
        fontSize: "14px",
        fontWeight: 800,
        my: "4px",
        "&:hover:not(:disabled)": {
          backgroundColor: "warning.main",
          color: "warning.contrastText"
        },
        "&.Mui-disabled": {
          opacity: 0.55
        }
      }} />
          {ind < stepperList.length - 1 && <Box width="50px" height="4px" bgcolor={ind < selected ? "warning.main" : "rgba(255, 255, 255, 0.16)"} sx={{ borderRadius: 999 }} />}
        </Fragment>)}
    </FlexRowCenter>;
};
export default Stepper;
