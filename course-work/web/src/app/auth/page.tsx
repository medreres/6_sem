"use client";

import { FC, useEffect, useState } from "react";
import { Box, Tab, Tabs } from "@mui/material";
import { useRouter } from "next/navigation";

import { TabPanel } from "@/components";
import { LoginForm, RegisterForm, useUserContext } from "@/features";

const Page: FC = () => {
  const [tab, setTab] = useState<number>(0);
  const {
    data: { email },
    authenticated,
  } = useUserContext();
  const router = useRouter();

  const handleChange = (_event: React.SyntheticEvent, newValue: number) => {
    setTab(newValue);
  };

  useEffect(() => {
    // if user is authenticated, then redirect to home page
    if (authenticated) {
      router.push("/");
    }
  }, [authenticated, email, router]);

  return (
    <Box
      sx={{
        bgcolor: "background.paper",
        borderRadius: "15px",
        boxShadow: 24,
        p: 4,
        width: {
          xs: "100%",
          md: "30%",
        },
        height: "fit-content",
      }}>
      <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
        <Tabs
          centered
          value={tab}
          onChange={handleChange}
          aria-label="Auth tabs">
          <Tab label="Sign in" />
          <Tab label="Sign up" />
        </Tabs>
      </Box>

      <TabPanel index={tab}>
        {tab === 0 && <LoginForm />}
        {tab === 1 && <RegisterForm />}
      </TabPanel>
    </Box>
  );
};

export default Page;
