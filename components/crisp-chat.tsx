"use client";

import { useEffect } from "react";
import { Crisp } from "crisp-sdk-web";

export const CrispChat = () => {
  useEffect(() => {
    Crisp.configure("172d9af5-c2f9-4a72-b53a-c02a33b810ce");
  }, []);

  return null;
};
