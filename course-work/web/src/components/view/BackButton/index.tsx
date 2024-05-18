import React, { FunctionComponent } from "react";
import KeyboardBackspaceIcon from "@mui/icons-material/KeyboardBackspace";
import { Button } from "@mui/material";

export const BackButton: FunctionComponent = () => {
  const clickHandler = () => history.back();

  return (
    <Button onClick={clickHandler}>
      <KeyboardBackspaceIcon />
    </Button>
  );
};
