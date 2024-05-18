import React, { FC } from "react";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { CardHeader, IconButton } from "@mui/material";

interface HeaderParams {
  title: string;
  address: string;
  onOpenContextMenu: any;
}

export const Header: FC<HeaderParams> = ({ title, address, onOpenContextMenu }) => {
  return (
    <CardHeader
      action={
        <IconButton
          onClick={onOpenContextMenu}
          onTouchStart={(event) => event.stopPropagation()}
          onMouseDown={(event) => event.stopPropagation()}
          aria-label="settings">
          <MoreVertIcon />
        </IconButton>
      }
      title={title}
      subheader={address}
      subheaderTypographyProps={{
        position: "relative",
        maxWidth: "10em",
        overflow: "hidden",
        textOverflow: "ellipsis",
        whiteSpace: "nowrap",
      }}
      titleTypographyProps={{
        maxWidth: "7em",
        overflow: "hidden",
        textOverflow: "ellipsis",
        whiteSpace: "nowrap",
      }}
    />
  );
};
