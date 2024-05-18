"use client"; // Error components must be Client Components

import { FC } from "react";
import { Button, Typography } from "@mui/material";
import { useRouter } from "next/navigation";

import { Center } from "@/components";

interface ErrorParams {
  error: Error;
}

const Error: FC<ErrorParams> = ({ error }) => {
  const router = useRouter();
  const handleClick = () => {
    console.log("click");
    router.push("/");
  };

  return (
    <Center direction="column">
      <Typography
        variant="h4"
        textAlign="center">
        {error.message}
      </Typography>
      <Button onClick={handleClick}>Go Home</Button>
    </Center>
  );
};

export default Error;
