import React, { FC } from "react";
import { Box, Typography } from "@mui/material";
import Image, { StaticImageData } from "next/image";

interface CellParams {
  alt: string;
  img: StaticImageData;
  label: string;
  direction?: "row" | "row-reverse";
}

export const Cell: FC<CellParams> = ({ alt, img, label, direction }) => {
  return (
    <Box
      display="flex"
      flexDirection={direction || "row"}
      alignItems="center"
      justifyContent="center"
      gap={"5px"}>
      <Image
        height={32}
        width={32}
        alt={alt}
        src={img}
      />
      <Typography>{label}</Typography>
    </Box>
  );
};
