import React, { FC } from "react";
import { Stack, Typography } from "@mui/material";
import Image from "next/image";

import { getForecastImage } from "@/features";

import { DescriptionParams } from "../interfaces";

export const Description: FC<DescriptionParams> = ({ feelsLike, icon }) => {
  return (
    <Stack
      direction="row"
      justifyContent="space-between"
      alignItems="center">
      <Stack direction="row">
        <Typography variant="h1">{feelsLike.toFixed(0)}</Typography>
        <Typography
          fontWeight={500}
          variant="subtitle1">
          &deg;C
        </Typography>
      </Stack>
      <Image
        alt={"weather icon"}
        src={getForecastImage(icon)}
        height={100}
        width={100}
      />
    </Stack>
  );
};
