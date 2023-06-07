"use client";
import React from "react";
import { Hydrate } from "react-query";

function HydrateClient(props: any) {
  return <Hydrate {...props} />;
}

export default HydrateClient;
