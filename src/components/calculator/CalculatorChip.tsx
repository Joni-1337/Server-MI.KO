"use client";

import { AnchoredTooltip } from "@/components/ui/AnchoredTooltip";

type ChipAccent = "cyan" | "gold";

interface CalculatorChipProps {
  id: string;
  label: string;
  description: string;
  accent: ChipAccent;
  active: boolean;
  onClick: () => void;
}

const activeClass: Record<ChipAccent, string> = {
  cyan: "glow-chip-active-cyan",
  gold: "glow-chip-active-gold",
};

const idleClass: Record<ChipAccent, string> = {
  cyan: "glow-chip-idle-cyan",
  gold: "glow-chip-idle-gold",
};

export function CalculatorChip({
  id,
  label,
  description,
  accent,
  active,
  onClick,
}: CalculatorChipProps) {
  return (
    <AnchoredTooltip
      label={label}
      description={description}
      accent={accent}
      tooltipId={`calc-tip-${id}`}
    >
      <button
        type="button"
        onClick={onClick}
        className={`glow-chip chip-text border px-5 py-2.5 ${
          active ? activeClass[accent] : idleClass[accent]
        }`}
      >
        {label}
      </button>
    </AnchoredTooltip>
  );
}
