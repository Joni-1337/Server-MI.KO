"use client";

import { useEffect, useRef, type RefObject } from "react";

interface InteractiveGridProps {
  boundaryRef: RefObject<HTMLElement | null>;
}

export function InteractiveGrid({ boundaryRef }: InteractiveGridProps) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    const boundary = boundaryRef.current;
    if (!el || !boundary) return;

    let frame = 0;
    let inView = true;
    let pointerInside = false;
    let hasMoved = false;
    let lastX = 0;
    let lastY = 0;

    const setActive = (active: boolean) => {
      el.style.opacity = active ? "0.6" : "0";
    };

    const isInside = (x: number, y: number) => {
      const rect = boundary.getBoundingClientRect();
      return x >= rect.left && x <= rect.right && y >= rect.top && y <= rect.bottom;
    };

    const updateGlow = (x: number, y: number) => {
      lastX = x;
      lastY = y;

      if (!hasMoved) {
        setActive(false);
        return;
      }

      pointerInside = isInside(x, y);

      if (!inView || !pointerInside) {
        setActive(false);
        return;
      }

      const rect = boundary.getBoundingClientRect();
      el.style.setProperty("--mx", `${x - rect.left}px`);
      el.style.setProperty("--my", `${y - rect.top}px`);
      setActive(true);
    };

    const observer = new IntersectionObserver(
      ([entry]) => {
        inView = entry.isIntersecting;
        updateGlow(lastX, lastY);
      },
      { threshold: 0.05 },
    );
    observer.observe(boundary);

    const onMove = (e: MouseEvent) => {
      hasMoved = true;
      if (frame) return;
      frame = requestAnimationFrame(() => {
        updateGlow(e.clientX, e.clientY);
        frame = 0;
      });
    };

    const onScroll = () => {
      if (!hasMoved || frame) return;
      frame = requestAnimationFrame(() => {
        updateGlow(lastX, lastY);
        frame = 0;
      });
    };

    const onLeave = () => {
      pointerInside = false;
      setActive(false);
    };

    window.addEventListener("mousemove", onMove, { passive: true });
    window.addEventListener("scroll", onScroll, { passive: true });
    document.addEventListener("mouseleave", onLeave);

    return () => {
      observer.disconnect();
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("scroll", onScroll);
      document.removeEventListener("mouseleave", onLeave);
      if (frame) cancelAnimationFrame(frame);
    };
  }, [boundaryRef]);

  return (
    <div
      ref={ref}
      className="pointer-events-none absolute inset-0 z-0 opacity-0 transition-opacity duration-300"
      style={
        {
          "--mx": "50%",
          "--my": "50%",
          backgroundImage: `
            radial-gradient(circle at 1px 1px, rgba(137, 200, 255, 0.07) 1px, transparent 0),
            radial-gradient(520px circle at var(--mx) var(--my), rgba(137, 200, 255, 0.09), transparent 65%)
          `,
          backgroundSize: "40px 40px, auto",
        } as React.CSSProperties
      }
      aria-hidden="true"
    />
  );
}
