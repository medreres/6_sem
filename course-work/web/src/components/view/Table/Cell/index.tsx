import React, { FC, ReactNode } from "react";
import { Stack, Typography } from "@mui/material";

interface Params {
  label: ReactNode;
  value: ReactNode;
  position: "start" | "end";
}

export const Cell: FC<Params> = ({ label, value, position }) => {
  return (
    <Stack
      direction="column"
      alignItems={`flex-${position}`}>
      <Typography variant="caption">{label}</Typography>
      {value}
    </Stack>
  );
};
