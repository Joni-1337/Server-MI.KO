"use client";

import { useLayoutEffect, useRef } from "react";
import { gsap, registerGSAP } from "@/lib/gsap";
import { InteractiveGrid } from "@/components/ui/InteractiveGrid";

interface HeroWithAnimationsProps {
  children: React.ReactNode;
}

export function HeroWithAnimations({ children }: HeroWithAnimationsProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    registerGSAP();
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

      tl.from(".hero-badge", {
        opacity: 0,
        duration: 0.6,
      })
        .from(
          ".hero-line-inner",
          {
            y: "110%",
            duration: 0.9,
            stagger: 0.08,
          },
          "-=0.3",
        )
        .from(
          ".hero-subtitle",
          {
            opacity: 0,
            duration: 0.6,
          },
          "-=0.4",
        )
        .from(
          ".hero-cta",
          {
            opacity: 0,
            duration: 0.6,
          },
          "-=0.3",
        )
        .from(
          ".hero-scroll-indicator",
          {
            opacity: 0,
            duration: 0.8,
          },
          "-=0.2",
        );
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={containerRef} className="relative">
      <InteractiveGrid boundaryRef={containerRef} />
      {children}
    </div>
  );
}
