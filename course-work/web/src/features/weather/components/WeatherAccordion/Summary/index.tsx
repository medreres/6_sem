import React, { FC } from "react";
import { faWind } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Box, Typography } from "@mui/material";
import Image from "next/image";

import { Humidity } from "@/assets";
import { getForecastImage } from "@/features/weather/utils";
import { formatDate } from "@/utils";

import { SummaryParams } from "../interfaces";

export const Summary: FC<SummaryParams> = ({ data, expanded }) => {
  return (
    <>
      {expanded && <Typography> {formatDate(data.timestamp)}</Typography>}
      {!expanded && (
        <Box
          display="flex"
          width="100%"
          justifyContent="space-between"
          alignItems="center">
          <Box
            display="flex"
            alignItems="center"
            gap={1}>
            <Typography>{formatDate(data.timestamp)}</Typography>
            <Typography>
              {data.temperature.max.toFixed(0)}° / {data.temperature.min.toFixed(0)}°
            </Typography>
            <Image
              src={getForecastImage(data.weather[0].icon)}
              height={32}
              width={32}
              alt={data.weather[0].main}
            />
            <Typography>{data.weather[0].main}</Typography>
          </Box>
          <Box
            display="flex"
            alignItems="center"
            gap={1}>
            <Box
              display="flex"
              alignItems="center">
              {data.humidity}
              <Image
                src={Humidity}
                height={16}
                width={16}
                alt={data.weather[0].main}
              />
            </Box>
            <Box
              display="flex"
              alignItems="center">
              <Typography variant="body1">
                {data.windSpeed} km/h <FontAwesomeIcon icon={faWind} />
              </Typography>
            </Box>
          </Box>
        </Box>
      )}
    </>
  );
};
