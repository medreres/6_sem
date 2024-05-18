import React, { useMemo } from "react";
import { Divider, List } from "@mui/material";
import { Box, Stack } from "@mui/system";

import { Cell, Row } from "@/components";

import { WeatherAccordionBodyParams } from "../interfaces";

import { formatData } from "./utils/index";
import { Header } from "./Header";

const style = {
  marginX: "auto",
  bgcolor: "background.paper",
  borderColor: "grey.500",
  padding: "15px",
  m: 1,
  border: 1,
  borderRadius: "15px",
};

export function Expandable(data: WeatherAccordionBodyParams) {
  const formattedData = useMemo(() => formatData(data), [data]);

  return (
    <Box
      width="100%"
      style={{
        margin: "0 auto",
      }}>
      <Stack
        direction="row"
        justifyContent="space-between"
        sx={{
          minWidth: "20em",
        }}>
        <Header
          description={data.description}
          feelsLike={data.feelsLike}
          icon={data.icon}
          windSpeed={data.windSpeed}
          precipitation={data.precipitation}
        />
      </Stack>
      <List sx={style}>
        {formattedData.map(([left, right], index) => (
          <div key={index}>
            <Row>
              <Cell
                label={left.label}
                value={left.value}
                position="start"
              />
              <Cell
                label={right.label}
                value={right.value}
                position="end"
              />
            </Row>
            {index !== formattedData.length - 1 && (
              <Divider
                sx={{
                  borderColor: "grey.500",
                }}
              />
            )}
          </div>
        ))}
      </List>
    </Box>
  );
}
