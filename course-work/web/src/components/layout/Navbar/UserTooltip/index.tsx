import React, { FC, useState } from "react";
import LogoutIcon from "@mui/icons-material/Logout";
import { Avatar, IconButton, Menu, Tooltip, Typography } from "@mui/material";

import { useUser } from "@/features";

import { MenuItem } from "../MenuItem";

export const UserTooltip: FC = () => {
  const { logout } = useUser();

  const [anchorElUser, setAnchorElUser] = useState<null | HTMLElement>(null);
  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => setAnchorElUser(event.currentTarget);
  const handleCloseUserMenu = () => setAnchorElUser(null);

  return (
    <>
      <Tooltip title="Open settings">
        <IconButton
          onClick={handleOpenUserMenu}
          sx={{ p: 0 }}>
          <Avatar sx={{ width: 38, height: 38 }}></Avatar>
        </IconButton>
      </Tooltip>

      <Menu
        sx={{ mt: "45px" }}
        id="menu-appbar"
        anchorEl={anchorElUser}
        anchorOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
        keepMounted
        transformOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
        open={Boolean(anchorElUser)}
        onClose={handleCloseUserMenu}>
        <MenuItem
          onClose={handleCloseUserMenu}
          onClick={logout}
          icon={<LogoutIcon color="error" />}
          text={<Typography color="error">Logout</Typography>}></MenuItem>
      </Menu>
    </>
  );
};
