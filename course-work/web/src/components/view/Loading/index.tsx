import React, { FC } from "react";
import { CircularProgress } from "@mui/material";

import { Center } from "../Center";

export const Loading: FC = () => {
  return (
    <Center>
      <CircularProgress />
    </Center>
  );
};
