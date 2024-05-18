import React, { FC } from "react";
import { Box, Stack, Typography } from "@mui/material";

import { BackButton } from "@/components";
import { useUserContext, useWeather } from "@/features";

import { FollowButton } from "../FollowButton";

import { WeatherHeaderParams } from "./interfaces";

export const WeatherHeader: FC<WeatherHeaderParams> = ({ cityName }) => {
  const { toggleFavorite, isFavorite, favoriteLoading } = useWeather();
  const { authenticated } = useUserContext();

  return (
    <Box
      sx={{
        border: 1,
        borderBottom: 0,
        borderTopLeftRadius: "15px",
        borderTopRightRadius: "15px",
        borderColor: "grey.200",
      }}
      display="flex"
      justifyContent="space-between">
      <Box display="flex">
        <BackButton />
        <Stack direction="column">
          <Typography variant="h1">{cityName}</Typography>
        </Stack>
      </Box>

      {authenticated && (
        <Stack
          justifyContent="center"
          pr={3}>
          <FollowButton
            following={isFavorite}
            loading={favoriteLoading}
            onClick={toggleFavorite}
          />
        </Stack>
      )}
    </Box>
  );
};
