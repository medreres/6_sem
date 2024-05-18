import React, { FC, useCallback, useState } from "react";
import { faTrashCan } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Card, CardActionArea, CardContent, Grid, Grow, Menu, MenuItem, Typography } from "@mui/material";
import Link from "next/link";

import { useCity } from "@/features";

import { Description } from "./Body";
import { Footer } from "./Footer";
import { Header } from "./Header";
import { WeatherCardParams } from "./interfaces";

const TRANSITION_DELAY = 500;

export const WeatherCard: FC<WeatherCardParams> = ({ cityName, img, feelsLike, address, humidity, windSpeed }) => {
  const { removeCity } = useCity();

  const [contextMenu, setContextMenu] = useState<{
    mouseX: number;
    mouseY: number;
  } | null>(null);
  const [show, setShow] = useState<boolean>(true);

  const deleteHandler = () => {
    setShow(false);
    setTimeout(() => removeCity(address), TRANSITION_DELAY);
  };
  const handleClose = () => setContextMenu(null);

  const handleContextMenu = useCallback(
    (event: React.MouseEvent) => {
      event.preventDefault();
      event.stopPropagation();

      setContextMenu(
        contextMenu === null
          ? {
              mouseX: event.clientX + 2,
              mouseY: event.clientY - 6,
            }
          : // repeated contextmenu when it is already open closes it with Chrome 84 on Ubuntu
            // Other native context menus might behave different.
            // With this behavior we prevent contextmenu from the backdrop to re-locale existing context menus.
            null
      );
    },
    [contextMenu]
  );

  return (
    <Grid
      item
      xs={10}
      sm={5}
      md={4}
      lg={2}>
      <Grow
        in={show}
        timeout={TRANSITION_DELAY}
        unmountOnExit>
        <Card
          sx={{
            transition: "transform 0.2s ease-in-out",
            "&:hover": {
              transform: "translateY(-3%)",
            },
          }}>
          <CardActionArea
            component={Link}
            href={`/weather?city=${address}`}>
            <Header
              onOpenContextMenu={handleContextMenu}
              address={address}
              title={cityName}
            />
            <CardContent>
              <Description
                feelsLike={feelsLike}
                icon={img}
              />
              <Footer
                humidity={humidity}
                windSpeed={windSpeed}
              />
            </CardContent>
          </CardActionArea>
        </Card>
      </Grow>
      <Menu
        open={contextMenu !== null}
        onClose={handleClose}
        onClick={handleClose}
        anchorReference="anchorPosition"
        anchorPosition={contextMenu !== null ? { top: contextMenu.mouseY, left: contextMenu.mouseX } : undefined}>
        <MenuItem onClick={deleteHandler}>
          <Typography color="error.main">
            <FontAwesomeIcon icon={faTrashCan} /> Delete
          </Typography>
        </MenuItem>
      </Menu>
    </Grid>
  );
};
