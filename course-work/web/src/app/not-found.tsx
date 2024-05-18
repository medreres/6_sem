"use client";

import React, { FC } from "react";
import { Button, Stack, Typography } from "@mui/material";
import Image from "next/image";

import { SadCloud } from "@/assets";
import { Center } from "@/components";

const NotFound: FC = () => {
  return (
    <Center>
      <Stack
        gap={2}
        alignItems="center"
        justifyContent="center">
        <Typography variant="h5">Opps! Page you are looking for is not found!</Typography>
        <Button
          component={"a"}
          href="/"
          variant="outlined"
          color="primary"
          sx={{
            textDecoration: "none",
            color: "inherit",
          }}>
          Go Home
        </Button>
        <Image
          src={SadCloud}
          height={128}
          width={128}
          alt="sad cloud"
        />
      </Stack>
    </Center>
  );
};

export default NotFound;
