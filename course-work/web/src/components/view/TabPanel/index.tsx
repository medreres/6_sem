import React, { FC } from "react";
import { Box } from "@mui/material";

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
}

export const TabPanel: FC<TabPanelProps> = (props) => {
  const { children, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}>
      <Box sx={{ p: 3 }}>{children}</Box>
    </div>
  );
};
