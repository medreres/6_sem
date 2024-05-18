"use client";

import { FC, PropsWithChildren, useEffect } from "react";
import { redirect } from "next/navigation";

import { useUserContext } from "@/features";

export const Protected: FC<PropsWithChildren> = ({ children }) => {
  const { authenticated } = useUserContext();

  useEffect(() => {
    if (authenticated === false) {
      redirect("/auth");
    }
  }, [authenticated]);

  return <>{children}</>;
};
