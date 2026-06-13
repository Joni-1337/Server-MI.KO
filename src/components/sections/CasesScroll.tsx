"use client";

import { useLayoutEffect, useRef } from "react";
import { gsap, registerGSAP } from "@/lib/gsap";

const MOBILE_BREAKPOINT = 768;

interface CasesScrollProps {
  children: React.ReactNode;
}

export function CasesScroll({ children }: CasesScrollProps) {
  const pinRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    registerGSAP();

    const pinWrap = pinRef.current;
    const track = trackRef.current;
    const progress = document.querySelector<HTMLDivElement>(".cases-progress-fill");
    if (!pinWrap || !track) return;

    const mm = gsap.matchMedia();

    mm.add(
      {
        isDesktop: `(min-width: ${MOBILE_BREAKPOINT}px)`,
        isMobile: `(max-width: ${MOBILE_BREAKPOINT - 1}px)`,
      },
      (context) => {
        const { isDesktop } = context.conditions as { isDesktop: boolean; isMobile: boolean };

        if (isDesktop) {
          const getDistance = () => Math.max(track.scrollWidth - window.innerWidth, 0);

          gsap.to(track, {
            x: () => -getDistance(),
            ease: "none",
            force3D: true,
            scrollTrigger: {
              trigger: pinWrap,
              pin: true,
              scrub: 0.35,
              anticipatePin: 0,
              fastScrollEnd: true,
              invalidateOnRefresh: true,
              end: () => `+=${getDistance()}`,
              onUpdate: (self) => {
                if (progress) {
                  progress.style.transform = `scaleX(${self.progress})`;
                }
              },
            },
          });
        } else {
          gsap.from(".case-card", {
            opacity: 0,
            duration: 0.6,
            stagger: 0.1,
            ease: "power2.out",
            scrollTrigger: {
              trigger: pinWrap,
              start: "top 85%",
              once: true,
            },
          });
        }
      },
    );

    return () => mm.revert();
  }, []);

  return (
    <div ref={pinRef} className="overflow-hidden">
      <div
        ref={trackRef}
        className="cases-track flex min-h-screen flex-col md:h-screen md:flex-row md:translate-z-0"
      >
        {children}
      </div>
    </div>
  );
}
