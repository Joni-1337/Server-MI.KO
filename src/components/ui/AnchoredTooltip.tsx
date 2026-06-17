"use client";

import {
  cloneElement,
  isValidElement,
  useCallback,
  useEffect,
  useId,
  useLayoutEffect,
  useRef,
  useState,
  type CSSProperties,
  type ReactElement,
} from "react";
import { createPortal } from "react-dom";
import { computeTooltipPosition, prefersCoarsePointer } from "@/lib/tooltip-position";

interface AnchoredTooltipProps {
  label: string;
  description: string;
  accent?: "cyan" | "gold";
  tooltipId?: string;
  touchToggle?: boolean;
  wrapperClassName?: string;
  children: ReactElement<{ className?: string; "aria-describedby"?: string }>;
}

export function AnchoredTooltip({
  label,
  description,
  accent = "cyan",
  tooltipId,
  touchToggle = false,
  wrapperClassName = "relative inline-flex max-w-full",
  children,
}: AnchoredTooltipProps) {
  const generatedId = useId();
  const id = tooltipId ?? generatedId;
  const wrapperRef = useRef<HTMLSpanElement>(null);
  const tooltipRef = useRef<HTMLDivElement>(null);
  const closeTimerRef = useRef<number | null>(null);
  const [visible, setVisible] = useState(false);
  const [pinned, setPinned] = useState(false);
  const [ready, setReady] = useState(false);
  const [coords, setCoords] = useState({ top: 0, left: 0, arrowLeft: 140 });

  const updatePosition = useCallback(() => {
    const wrapper = wrapperRef.current;
    const tooltip = tooltipRef.current;
    if (!wrapper || !tooltip) return;

    const triggerRect = wrapper.getBoundingClientRect();
    const tooltipRect = tooltip.getBoundingClientRect();
    const pos = computeTooltipPosition(
      triggerRect,
      tooltipRect.width || Math.min(300, window.innerWidth - 32),
      tooltipRect.height || 96,
    );

    setCoords({ top: pos.top, left: pos.left, arrowLeft: pos.arrowLeft });
  }, []);

  const open = useCallback(() => {
    if (closeTimerRef.current) {
      window.clearTimeout(closeTimerRef.current);
      closeTimerRef.current = null;
    }
    setVisible(true);
  }, []);

  const close = useCallback(() => {
    if (pinned) return;

    closeTimerRef.current = window.setTimeout(() => {
      setVisible(false);
      setReady(false);
      closeTimerRef.current = null;
    }, 120);
  }, [pinned]);

  useEffect(() => {
    return () => {
      if (closeTimerRef.current) {
        window.clearTimeout(closeTimerRef.current);
      }
    };
  }, []);

  useLayoutEffect(() => {
    if (!visible) {
      setReady(false);
      return;
    }

    updatePosition();
    const frame = requestAnimationFrame(() => {
      updatePosition();
      setReady(true);
    });

    return () => cancelAnimationFrame(frame);
  }, [visible, updatePosition, label, description]);

  useEffect(() => {
    if (!visible) return;

    const onReposition = () => updatePosition();
    window.addEventListener("scroll", onReposition, { passive: true });
    window.addEventListener("resize", onReposition);

    return () => {
      window.removeEventListener("scroll", onReposition);
      window.removeEventListener("resize", onReposition);
    };
  }, [visible, updatePosition]);

  useEffect(() => {
    if (!pinned) return;

    const onOutside = (event: MouseEvent | TouchEvent) => {
      const target = event.target as Node;
      if (!wrapperRef.current?.contains(target)) {
        setPinned(false);
        setVisible(false);
        setReady(false);
      }
    };

    document.addEventListener("mousedown", onOutside);
    document.addEventListener("touchstart", onOutside, { passive: true });

    return () => {
      document.removeEventListener("mousedown", onOutside);
      document.removeEventListener("touchstart", onOutside);
    };
  }, [pinned]);

  const handleTap = (event: React.MouseEvent) => {
    if (!touchToggle || !prefersCoarsePointer()) return;

    event.preventDefault();
    event.stopPropagation();

    setPinned((current) => {
      const next = !current;
      setVisible(next);
      if (!next) setReady(false);
      return next;
    });
  };

  const child = isValidElement(children)
    ? cloneElement(children, {
        "aria-describedby": visible ? id : undefined,
      })
    : children;

  const tooltipStyle: CSSProperties = {
    top: coords.top,
    left: coords.left,
    ["--arrow-left" as string]: `${coords.arrowLeft}px`,
  };

  const tooltip =
    visible && typeof document !== "undefined"
      ? createPortal(
          <div
            ref={tooltipRef}
            id={id}
            role="tooltip"
            data-placement="top"
            className={`calc-tooltip calc-tooltip-${accent} calc-tooltip-portal ${
              ready ? "is-visible" : "is-measuring"
            }`}
            style={tooltipStyle}
          >
            <span className="calc-tooltip-label">{label}</span>
            <p className="calc-tooltip-text">{description}</p>
          </div>,
          document.body,
        )
      : null;

  return (
    <span
      ref={wrapperRef}
      className={wrapperClassName}
      data-tooltip-open={visible ? "" : undefined}
      onMouseEnter={open}
      onMouseLeave={close}
      onFocus={open}
      onBlur={(event) => {
        if (!wrapperRef.current?.contains(event.relatedTarget as Node)) {
          setPinned(false);
          close();
        }
      }}
      onClick={handleTap}
    >
      {child}
      {tooltip}
    </span>
  );
}
