import React, { FC } from "react";
import { Box, FormControl, Grid, Paper, Stack, Typography } from "@mui/material";
import Image from "next/image";

import { SadCloud } from "@/assets";
import { Search } from "@/components";

import { WeatherCard } from "../WeatherCard";

import { WeatherCardsParams } from "./interfaces";

export const WeatherCards: FC<WeatherCardsParams> = ({ cards }) => {
  
  return (
    <Grid
      container
      width="100%"
      spacing={2}
      sx={{
        justifyContent: "center",
        alignItems: "center",
        marginY: 1,
      }}>
      {cards.length === 0 && (
        <Stack
          direction="column"
          alignItems="center"
          gap={1}>
          <Image
            src={SadCloud}
            height={128}
            width={128}
            alt="sad cloud"
          />
          <Paper>
            <Search />
          </Paper>
          <Typography
            variant="h4"
            maxWidth="70%"
            textAlign="center">
            Oops! It seems that you don&apos;t have any weathercards!
          </Typography>
          <Typography
            variant="body1"
            textAlign="center">
            To add some, search for a city in search bar
          </Typography>
        </Stack>
      )}
      {cards.map((card) => (
        <WeatherCard
          key={card.city.address}
          cityName={card.city.name}
          address={card.city.address}
          humidity={card.current.humidity}
          windSpeed={card.daily[0].windSpeed}
          feelsLike={card.current.feelsLike}
          img={card.current.weather[0].icon}
        />
      ))}
    </Grid>
  );
};
