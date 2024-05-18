import React, { FC } from "react";
import { Stack, Typography } from "@mui/material";

import { InfoParams } from "../interfaces";

export const Info: FC<InfoParams> = ({ text, icon }) => {
  return (
    <Stack alignItems="center">
      {icon}
      <Typography
        variant="body2"
        color="text.secondary">
        {text}
      </Typography>
    </Stack>
  );
};
