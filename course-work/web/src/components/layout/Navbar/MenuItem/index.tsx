import React, { FC } from "react";
import { ListItemIcon, ListItemText, MenuItem as MuiMenuItem } from "@mui/material";

import { MenuItemParams } from "../interfaces";

export const MenuItem: FC<MenuItemParams> = ({ icon, text, onClick, onClose, LinkComponent, href }) => {
  const Body = () => (
    <MuiMenuItem
      onClick={() => {
        onClose();
        onClick && onClick();
      }}>
      <ListItemIcon>{icon}</ListItemIcon>
      <ListItemText>{text}</ListItemText>
    </MuiMenuItem>
  );

  return (
    <>
      {LinkComponent && (
        <LinkComponent
          href={href || ""}
          style={{
            textDecoration: "none",
            color: "inherit",
          }}>
          <Body />
        </LinkComponent>
      )}
      {!LinkComponent && <Body />}
    </>
  );
};
