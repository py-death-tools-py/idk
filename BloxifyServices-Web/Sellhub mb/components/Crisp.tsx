"use client";
//@ts-ignore

import React, { useEffect } from "react";
import { Crisp } from "crisp-sdk-web";

const CrispApp = () => {
  useEffect(() => {
    if (typeof window !== "undefined") {
      Crisp.configure(`8bc8babd-a2ae-429c-9e7e-8fdc418e6574`);
    }
  }, []);

  return null;
};

export default CrispApp;
