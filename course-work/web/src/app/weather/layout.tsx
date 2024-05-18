"use client";

import { FC, PropsWithChildren } from "react";
import { Box } from "@mui/material";

import { Protected } from "@/components";

const WeatherLayout: FC<PropsWithChildren> = ({ children }) => {
  return (
    <Protected>
      <Box
        sx={{
          width: { xs: "95vw", md: "70vw" },
          marginX: "auto",
          marginY: "1em",
          justifyContent: "center",
        }}>
        {children}
      </Box>
    </Protected>
  );
};

export default WeatherLayout;
