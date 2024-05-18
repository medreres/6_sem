import React, { FC } from "react";
import { Stack, Typography } from "@mui/material";
import Image from "next/image";

import { getForecastImage } from "@/features";

import { DescriptionParams } from "../../interfaces";

export const Body: FC<DescriptionParams> = ({ description, feelsLike, icon }) => {
  return (
    <Stack direction="column">
      <Typography
        variant="h3"
        sx={{
          fontSize: "15px",
        }}>
        Feels like
      </Typography>
      <Typography
        variant="h4"
        sx={{
          fontSize: "54px",
          fontWeight: "bold",
        }}>
        {feelsLike.toFixed(0)}°C
      </Typography>
      <Typography
        variant="h4"
        sx={{
          fontSize: "54px",
          fontWeight: "bold",
        }}>
        {description}
        <Image
          src={getForecastImage(icon)}
          height={64}
          width={64}
          alt={description}
        />
      </Typography>
    </Stack>
  );
};
