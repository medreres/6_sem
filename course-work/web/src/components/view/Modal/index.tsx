import React, { FunctionComponent, JSXElementConstructor, ReactElement, ReactNode } from "react";
import { Backdrop } from "@mui/material";
import MuiModal from "@mui/material/Modal";

interface ModalParams {
  open: boolean;
  onClose: () => void;
  children: ReactElement<any, string | JSXElementConstructor<any>>;
}

export const Modal: FunctionComponent<ModalParams> = ({ onClose, open, children }) => {
  return (
    <MuiModal
      aria-labelledby="transition-modal-title"
      aria-describedby="transition-modal-description"
      open={open}
      onClose={onClose}
      closeAfterTransition
      slots={{ backdrop: Backdrop }}
      slotProps={{
        backdrop: {
          timeout: 500,
        },
      }}>
      {children}
    </MuiModal>
  );
};
