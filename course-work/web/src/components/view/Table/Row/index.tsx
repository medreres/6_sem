import React, { FC, ReactNode } from "react";
import { ListItem } from "@mui/material";

const listItemStyle = {
  display: "flex",
  justifyContent: "space-between",
};

interface Params {
  children: ReactNode;
}

export const Row: FC<Params> = ({ children }) => {
  return <ListItem sx={listItemStyle}>{children}</ListItem>;
};
