"use client";

import { RoyalGateway } from "./RoyalGateway";
import { DigitalShowroom } from "./DigitalShowroom";

export function HomePageClient() {
  return (
    <>
      {/* The Digital Showroom (Now default on homepage) */}
      <DigitalShowroom />

      {/* The Royal Gateway (Navigation to other pages) */}
      <RoyalGateway />
    </>
  );
}
