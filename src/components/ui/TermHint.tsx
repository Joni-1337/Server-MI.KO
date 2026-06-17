"use client";

import { AnchoredTooltip } from "@/components/ui/AnchoredTooltip";

interface TermHintProps {
  term: string;
  label?: string;
  description: string;
  accent?: "cyan" | "gold";
  className?: string;
}

export function TermHint({
  term,
  label,
  description,
  accent = "cyan",
  className = "",
}: TermHintProps) {
  return (
    <AnchoredTooltip
      label={label ?? term}
      description={description}
      accent={accent}
      touchToggle
      wrapperClassName="relative inline"
    >
      <span tabIndex={0} className={`term-hint-trigger ${className}`}>
        {term}
      </span>
    </AnchoredTooltip>
  );
}
