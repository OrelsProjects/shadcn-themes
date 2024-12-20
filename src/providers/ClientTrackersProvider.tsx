"use client";

import { initEventTracker } from "@/eventTracker";
import { initLogger } from "@/logger";
import { useEffect, useRef } from "react";

export default function ClientTrackersProvider() {
  const isInitiatlizing = useRef(false);

  useEffect(() => {
    if (isInitiatlizing.current) {
      return;
    }
    isInitiatlizing.current = true;
    initLogger();
    initEventTracker();
    isInitiatlizing.current = false;
  }, []);
  return null;
}
