import type { CaseStudy } from "@/config/cases";
import { ArrowUpRight, Target, Lightbulb, TrendingUp } from "lucide-react";

interface CaseCardProps {
  caseStudy: CaseStudy;
  index: number;
}

const accentMap = {
  cyan: {
    border: "border-[#89c8ff]/20",
    tag: "text-[#89c8ff] border-[#89c8ff]/30 bg-[#89c8ff]/5",
    icon: "text-[#89c8ff]",
    metric: "text-[#89c8ff]",
    glow: "glow-cyan",
  },
  gold: {
    border: "border-[#f2d27a]/20",
    tag: "text-[#f2d27a] border-[#f2d27a]/30 bg-[#f2d27a]/5",
    icon: "text-[#f2d27a]",
    metric: "text-[#f2d27a]",
    glow: "glow-gold",
  },
};

export function CaseCard({ caseStudy, index }: CaseCardProps) {
  const accent = accentMap[caseStudy.accentColor];

  return (
    <article
      className={`case-card relative flex h-full w-full shrink-0 flex-col justify-center px-6 py-16 md:w-screen md:px-12 lg:px-20 ${accent.glow}`}
      data-index={index}
    >
      <div className="absolute inset-0 grid-blueprint-dense opacity-30" aria-hidden="true" />
      <div className="absolute top-0 right-0 left-0 tech-line" aria-hidden="true" />

      <div className="relative z-10 mx-auto w-full max-w-6xl">
        <header className="mb-10 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <div>
            <div className="mb-3 flex items-center gap-3">
              <span className="font-mono text-xs tracking-[0.3em] text-[#8b949e] uppercase">
                Кейс {String(index + 1).padStart(2, "0")}
              </span>
              <span className="font-mono text-xs text-[#8b949e]">/ {caseStudy.year}</span>
            </div>
            <h3 className="font-sans text-4xl font-bold tracking-tight md:text-5xl lg:text-6xl">
              {caseStudy.title}
            </h3>
            <p className="mt-2 font-mono text-sm text-[#8b949e] md:text-base">{caseStudy.subtitle}</p>
          </div>
          <div className="flex flex-wrap gap-2">
            {caseStudy.tags.map((tag) => (
              <span
                key={tag}
                className={`rounded-none border px-3 py-1 font-mono text-xs ${accent.tag}`}
              >
                {tag}
              </span>
            ))}
          </div>
        </header>

        <div className="grid gap-6 md:grid-cols-3">
          <div className={`torn-edge border bg-[#12161a] p-6 ${accent.border}`}>
            <div className="mb-4 flex items-center gap-2">
              <Target className={`h-4 w-4 ${accent.icon}`} />
              <h3 className="font-mono text-xs tracking-[0.2em] text-[#8b949e] uppercase">Задача</h3>
            </div>
            <p className="text-sm leading-relaxed text-[#c9d1d9] md:text-base">{caseStudy.task}</p>
          </div>

          <div className={`torn-edge border bg-[#12161a] p-6 ${accent.border}`}>
            <div className="mb-4 flex items-center gap-2">
              <Lightbulb className={`h-4 w-4 ${accent.icon}`} />
              <h3 className="font-mono text-xs tracking-[0.2em] text-[#8b949e] uppercase">Решение</h3>
            </div>
            <p className="text-sm leading-relaxed text-[#c9d1d9] md:text-base">{caseStudy.solution}</p>
          </div>

          <div className={`torn-edge border bg-[#12161a] p-6 ${accent.border}`}>
            <div className="mb-4 flex items-center gap-2">
              <TrendingUp className={`h-4 w-4 ${accent.icon}`} />
              <h3 className="font-mono text-xs tracking-[0.2em] text-[#8b949e] uppercase">Итог</h3>
            </div>
            <p className="text-sm leading-relaxed text-[#c9d1d9] md:text-base">{caseStudy.result}</p>
          </div>
        </div>

        {caseStudy.metrics && (
          <div className="mt-10 grid grid-cols-2 gap-x-6 gap-y-8 border-t border-[#21262d] pt-8 md:grid-cols-4 md:gap-8">
            {caseStudy.metrics.map((metric) => (
              <div key={metric.label} className="flex flex-col">
                <span
                  className={`min-h-[2rem] font-sans text-2xl leading-tight font-bold md:text-4xl ${accent.metric}`}
                >
                  {metric.value}
                </span>
                <span className="mt-1 font-mono text-xs tracking-wider text-[#8b949e] uppercase">
                  {metric.label}
                </span>
              </div>
            ))}
            <div className="flex flex-col">
              <a
                href={caseStudy.url}
                target="_blank"
                rel="noopener noreferrer"
                className={`group inline-flex min-h-[2rem] items-center gap-1 font-sans text-base leading-tight font-bold sm:text-xl md:text-2xl ${accent.metric} hover:opacity-80`}
              >
                Открыть сайт
                <ArrowUpRight className="h-4 w-4 shrink-0 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
              </a>
              <span className="mt-1 block h-4" aria-hidden="true" />
            </div>
          </div>
        )}
      </div>
    </article>
  );
}
