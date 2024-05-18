import { FC, useState } from "react";
import React from "react";
import { Box, Tab, Tabs } from "@mui/material";
import Button from "@mui/material/Button";

import { Modal, TabPanel } from "@/components";

import { LoginForm } from "../LoginForm";
import { RegisterForm } from "../RegisterForm";

const style = {
  position: "absolute" as "absolute",
  top: "10%",
  left: "50%",
  transform: "translate(-50%)",
  width: 400,
  bgcolor: "background.paper",
  borderRadius: "15px",
  boxShadow: 24,
  p: 4,
};

export const AuthModal: FC = () => {
  const [open, setOpen] = useState(false);
  const toggleOpen = () => setOpen((prevState) => !prevState);

  const [value, setValue] = React.useState(0);

  const handleChange = (_event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  return (
    <div>
      <Button
        variant="text"
        color="inherit"
        onClick={toggleOpen}>
        Log In
      </Button>
      <Modal
        open={open}
        onClose={toggleOpen}>
        <Box sx={style}>
          <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
            <Tabs
              centered
              value={value}
              onChange={handleChange}
              aria-label="basic tabs example">
              <Tab label="Sign in" />
              <Tab label="Sign up" />
            </Tabs>
          </Box>
          <TabPanel index={0}>
            <LoginForm />
          </TabPanel>
          <TabPanel index={1}>
            <RegisterForm />
          </TabPanel>
        </Box>
      </Modal>
    </div>
  );
};
