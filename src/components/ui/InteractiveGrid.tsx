"use client";

import { useEffect, useRef } from "react";

export function InteractiveGrid() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    let frame = 0;
    let visible = true;

    const observer = new IntersectionObserver(
      ([entry]) => {
        visible = entry.isIntersecting;
      },
      { threshold: 0.05 },
    );
    observer.observe(el);

    const onMove = (e: MouseEvent) => {
      if (!visible || frame) return;
      frame = requestAnimationFrame(() => {
        el.style.setProperty("--mx", `${e.clientX}px`);
        el.style.setProperty("--my", `${e.clientY}px`);
        frame = 0;
      });
    };

    window.addEventListener("mousemove", onMove, { passive: true });
    return () => {
      observer.disconnect();
      window.removeEventListener("mousemove", onMove);
      if (frame) cancelAnimationFrame(frame);
    };
  }, []);

  return (
    <div
      ref={ref}
      className="pointer-events-none absolute inset-0 z-0 opacity-60"
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
