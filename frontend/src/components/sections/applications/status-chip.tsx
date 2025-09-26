"use client";

import React from "react";
import { Badge } from "../../ui/badge";

export function StatusChip({ status }: { status: string }) {
  const color = getVariant(status);
  return <Badge variant={color === "default" ? "default" : "secondary"}>{status}</Badge>;
}

function getVariant(status: string): "default" | "secondary" {
  switch (status) {
    case "Shortlisted":
    case "OfferExtended":
    case "OfferAccepted":
      return "default";
    default:
      return "secondary";
  }
}


