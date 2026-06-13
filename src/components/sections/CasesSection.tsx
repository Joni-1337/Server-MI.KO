import { cases } from "@/config/cases";
import { CaseCard } from "@/components/cases/CaseCard";
import { CasesScroll } from "@/components/sections/CasesScroll";

export function CasesSection() {
  return (
    <section id="cases" aria-labelledby="cases-heading" className="relative bg-[#12161a]">
      <div className="bg-[#0d1117] px-6 py-10 md:px-12 lg:px-20">
        <div className="mx-auto flex max-w-6xl items-end justify-between">
          <div>
            <span className="font-mono text-xs tracking-[0.3em] text-[#89c8ff] uppercase">
              Портфолио
            </span>
            <h2 id="cases-heading" className="mt-1 font-sans text-2xl font-bold md:text-3xl">
              Выполненные задачи / Портфолио
            </h2>
            <p className="mt-2 max-w-md font-mono text-xs text-[#8b949e]">
              Кейсы веб-разработки: лендинги, каталоги, калькуляторы и иммерсивные сайты для
              малого бизнеса — Брянск и Россия.
            </p>
          </div>
          <span className="hidden font-mono text-xs text-[#8b949e] md:block">
            {String(cases.length).padStart(2, "0")} проектов
          </span>
        </div>
        <div className="cases-progress-track mx-auto mt-8 h-px max-w-6xl overflow-hidden bg-[#21262d]/80">
          <div
            className="cases-progress-fill h-full origin-left scale-x-0 bg-gradient-to-r from-[#89c8ff] to-[#f2d27a] will-change-transform"
            aria-hidden="true"
          />
        </div>
      </div>

      <CasesScroll>
        {cases.map((caseStudy, index) => (
          <CaseCard key={caseStudy.id} caseStudy={caseStudy} index={index} />
        ))}
      </CasesScroll>
    </section>
  );
}
