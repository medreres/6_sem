"use client";

import { FC } from "react";
import { Box, CircularProgress, Typography } from "@mui/material";

import { Protected } from "@/components";
import { useCards, WeatherCards } from "@/features";

const Home: FC = () => {
  const { loading, cards } = useCards();


  return (
    <Protected>
      <Box
        width="100%"
        alignItems="center"
        flexDirection="column"
        display="flex">
        <Typography variant="h4">Your weather cards</Typography>
        {loading && <CircularProgress />}
        {!loading && <WeatherCards cards={cards} />}
      </Box>
    </Protected>
  );
};

export default Home;
