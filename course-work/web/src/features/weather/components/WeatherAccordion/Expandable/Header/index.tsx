import React, { FC } from "react";
import { faWind } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Stack, Typography } from "@mui/material";
import Image from "next/image";

import { Precipitation } from "@/assets";

import { HeaderParams } from "../../interfaces";
import { Body } from "../Body";

export const Header: FC<HeaderParams> = ({ feelsLike, description, icon, precipitation, windSpeed }) => {
  return (
    <>
      <Body
        description={description}
        feelsLike={feelsLike}
        icon={icon}
      />
      <Stack direction="column">
        <Typography variant="body1">
          <Image
            src={Precipitation}
            alt="precipitation"
            width={32}
            height={32}
          />
          {precipitation}
        </Typography>
        <Typography variant="body1">
          <FontAwesomeIcon icon={faWind} /> {windSpeed} km/h
        </Typography>
      </Stack>
    </>
  );
};
