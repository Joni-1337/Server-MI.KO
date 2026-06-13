"use client";

import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useEffect } from "react";

let isRegistered = false;

export function registerGSAP(): void {
  if (typeof window === "undefined" || isRegistered) return;

  gsap.registerPlugin(ScrollTrigger);
  ScrollTrigger.config({
    limitCallbacks: true,
    ignoreMobileResize: true,
  });

  isRegistered = true;
}

export function useGSAPContext(): void {
  useEffect(() => {
    registerGSAP();

    const onRefresh = () => ScrollTrigger.refresh();
    window.addEventListener("load", onRefresh);

    return () => {
      window.removeEventListener("load", onRefresh);
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, []);
}

export { gsap, ScrollTrigger };
