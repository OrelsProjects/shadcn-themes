"use client";

import React from "react";
import NextTopLoader from "nextjs-toploader";

const isMobilePhone = () => {
  if (typeof navigator !== "undefined") {
    return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
      navigator?.userAgent,
    );
  }
};

export default function TopLoaderProvider() {
  return (
    !isMobilePhone() && (
      <NextTopLoader
        color="hsl(var(--primary))"
        initialPosition={0.08}
        crawlSpeed={150}
        height={3}
        crawl={true}
        showSpinner={false}
        easing="ease"
        speed={1500}
        shadow="0 0 10px hsl(var(--primary)),0 0 5px hsl(var(--primary))"
      />
    )
  );
}
