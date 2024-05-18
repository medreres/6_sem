import React, { FC, PropsWithChildren } from "react";
import { Box } from "@mui/material";

interface CenterParams {
  direction?: "column" | "row";
}

export const Center: FC<PropsWithChildren<CenterParams>> = ({ children, direction }) => {
  return (
    <Box
      width="100%"
      height="50vh"
      display="flex"
      flexDirection={direction || "column"}
      justifyContent="center"
      alignItems="center">
      {children}
    </Box>
  );
};
