import { SvgIcon } from "@mui/material";
import React from "react";

const Instagram = props => {
  return (
    <SvgIcon {...props} viewBox="0 0 24 24">
      <rect
        x="4"
        y="4"
        width="16"
        height="16"
        rx="4"
        ry="4"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
      />
      <circle cx="12" cy="12" r="3.6" fill="none" stroke="currentColor" strokeWidth="1.8" />
      <circle cx="17.2" cy="6.8" r="1.1" fill="currentColor" />
    </SvgIcon>
  );
};

export default Instagram;
