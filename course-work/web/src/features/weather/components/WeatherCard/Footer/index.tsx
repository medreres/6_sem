import React, { FC, PropsWithChildren } from "react";
import { Stack } from "@mui/material";
import Image from "next/image";

import { Humidity, WindSpeed } from "@/assets";

import { Info } from "../Info";
import { BodyParams } from "../interfaces";

export const Footer: FC<PropsWithChildren<BodyParams>> = ({ humidity, windSpeed }) => {
  return (
    <Stack
      direction="row"
      justifyContent="space-evenly">
      <Info
        icon={
          <Image
            src={Humidity}
            alt="humidity"
            height={24}
            width={24}
          />
        }
        text={`${humidity}%`}
      />
      <Info
        icon={
          <Image
            src={WindSpeed}
            alt="wind"
            height={24}
            width={24}
          />
        }
        text={`${windSpeed.toFixed(1)}km/h`}
      />
    </Stack>
  );
};
