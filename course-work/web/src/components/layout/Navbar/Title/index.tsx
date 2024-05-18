import React, { FC } from "react";
import Typography from "@mui/material/Typography";
import Image from "next/image";
import Link from "next/link";

import Favicon from "@/app/icon.png";

export const Title: FC = () => {
  return (
    <Typography
      display="flex"
      alignItems="center"
      variant="h6"
      noWrap
      component={Link}
      href="/"
      sx={{
        mr: 2,
        display: "flex",
        flexGrow: 2,
        fontWeight: 700,
        letterSpacing: ".3rem",
        color: "inherit",
        textDecoration: "none",
      }}>
      Weather
      <Image
        src={Favicon}
        alt="Sun"
        height={32}
        width={32}
      />
    </Typography>
  );
};
