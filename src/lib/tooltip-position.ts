export interface TooltipPosition {
  top: number;
  left: number;
  placement: "top";
  arrowLeft: number;
}

const VIEWPORT_PADDING = 16;
const TOOLTIP_GAP = 12;

export function computeTooltipPosition(
  triggerRect: DOMRect,
  tooltipWidth: number,
  tooltipHeight: number,
): TooltipPosition {
  const viewportWidth = window.innerWidth;
  const triggerCenterX = triggerRect.left + triggerRect.width / 2;

  let left = triggerCenterX - tooltipWidth / 2;
  left = Math.max(
    VIEWPORT_PADDING,
    Math.min(left, viewportWidth - VIEWPORT_PADDING - tooltipWidth),
  );

  let top = triggerRect.top - TOOLTIP_GAP - tooltipHeight;

  if (top < VIEWPORT_PADDING) {
    top = VIEWPORT_PADDING;
  }

  const arrowLeft = Math.max(20, Math.min(triggerCenterX - left, tooltipWidth - 20));

  return { top, left, placement: "top", arrowLeft };
}

export function prefersCoarsePointer(): boolean {
  if (typeof window === "undefined") return false;
  return window.matchMedia("(pointer: coarse)").matches;
}
