"use client";

import React, { FC, useState } from "react";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { Accordion, AccordionDetails, AccordionSummary } from "@mui/material";

import { Expandable } from "./Expandable";
import { WeatherAccordionParams } from "./interfaces";
import { Summary } from "./Summary";

export const WeatherAccordion: FC<WeatherAccordionParams> = ({ defaultExpanded, data }) => {
  const [expanded, setExpanded] = useState(defaultExpanded);
  const toggleExpanded = () => setExpanded((expanded) => !expanded);

  return (
    <Accordion
      disableGutters={true}
      onChange={toggleExpanded}
      expanded={expanded}
      defaultExpanded={defaultExpanded}>
      <AccordionSummary
        expandIcon={<ExpandMoreIcon />}
        aria-controls="panel1a-content"
        id="panel1a-header">
        <Summary
          expanded={expanded}
          data={data}
        />
      </AccordionSummary>
      <AccordionDetails>
        <Expandable
          description={data.weather[0].main}
          icon={data.weather[0].icon}
          minTemp={data.temperature.min}
          maxTemp={data.temperature.max}
          timestamp={data.timestamp}
          uvi={data.uvi}
          feelsLike={data.temperature.day}
          humidity={data.humidity}
          precipitation={data.precipitation}
          sunrise={data.sunrise}
          sunset={data.sunset}
          windSpeed={data.windSpeed}
        />
      </AccordionDetails>
    </Accordion>
  );
};
