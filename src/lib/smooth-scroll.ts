"use client";

import { gsap } from "gsap";
import { ScrollToPlugin } from "gsap/ScrollToPlugin";
import { registerGSAP } from "@/lib/gsap";

const NAV_OFFSET = 72;

let scrollPluginReady = false;

function ensureScrollPlugin() {
  if (scrollPluginReady) return;
  registerGSAP();
  gsap.registerPlugin(ScrollToPlugin);
  scrollPluginReady = true;
}

export function smoothScrollToHash(hash: string): void {
  if (typeof window === "undefined") return;

  const id = hash.replace(/^#/, "");
  const target = document.getElementById(id);
  if (!target) return;

  const offset = id === "hero" ? 0 : NAV_OFFSET;
  const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  if (reduced) {
    const top = target.getBoundingClientRect().top + window.scrollY - offset;
    window.scrollTo({ top, behavior: "auto" });
    window.history.pushState(null, "", hash);
    return;
  }

  ensureScrollPlugin();

  gsap.to(window, {
    duration: 1.15,
    scrollTo: { y: target, offsetY: offset, autoKill: true },
    ease: "power3.inOut",
    onComplete: () => {
      window.history.pushState(null, "", hash);
    },
  });
}
