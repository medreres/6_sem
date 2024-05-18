import React, { FC, HTMLAttributes } from 'react'
import { Grid, Typography } from '@mui/material';
import Image from "next/image";

import { Placeholder } from '@/assets';
import { FindCityResponse } from '@/features';

export const RenderOption: FC<HTMLAttributes<HTMLLIElement>> = (props,option: FindCityResponse) => {
    return (
      <li
        {...props}
        key={option.address}>
        <Grid
          container
          alignItems="center">
          <Grid
            item
            sx={{ display: "flex", width: 44 }}>
            <Image
              height={32}
              width={32}
              alt="geolocation"
              src={Placeholder}
            />
          </Grid>
          <Grid
            item
            sx={{ width: "calc(100% - 44px)", wordWrap: "break-word" }}>
            <Typography
              variant="body2"
              color="text.secondary">
              {option.name}
            </Typography>
            <Typography
              variant="body2"
              color="text.secondary">
              {option.address}
            </Typography>
          </Grid>
        </Grid>
      </li>
    );
}
