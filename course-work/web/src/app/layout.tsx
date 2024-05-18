"use client";

import { FC, PropsWithChildren } from "react";

import { Body } from "@/components/layout";

const RootLayout: FC<PropsWithChildren> = ({ children }) => {
  return (
    <html lang="en">
      <title>Weather</title>
      <Body>{children}</Body>
    </html>
  );
};

export default RootLayout;
