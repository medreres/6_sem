import React, { FC, ReactElement, useState } from "react";
import { Snackbar as SnackbarMUI } from "@mui/material";

import { HISTORY_LIFE } from "@/features/history/config";

interface Params {
  children: ReactElement;
  autoHideDuration?: number;
}

export const Snackbar: FC<Params> = ({ children, autoHideDuration }) => {
  const [shown, setShown] = useState(true);
  const toggle = () => setShown((prevState) => !prevState);

  return (
    <SnackbarMUI
      open={shown}
      autoHideDuration={autoHideDuration || HISTORY_LIFE}
      onClose={toggle}>
      {children}
    </SnackbarMUI>
  );
};
