import React, { FC } from "react";
import { Alert, Button } from "@mui/material";

import { Snackbar } from "@/components";

import { useHistoryContext } from "../context";

export const Errors: FC = () => {
  const { history } = useHistoryContext();

  return (
    <>
      {history.map((history, index) => (
        <Snackbar key={index}>
          <Alert
            severity={history.severity}
            action={
              <>
                {history.action && (
                  <Button
                    onClick={history.action.action}
                    color="inherit"
                    size="small">
                    {history.action.label}
                  </Button>
                )}
              </>
            }>
            {history.message}
          </Alert>
        </Snackbar>
      ))}
    </>
  );
};
