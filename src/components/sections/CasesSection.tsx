import { cases } from "@/config/cases";
import { CaseCard } from "@/components/cases/CaseCard";
import { CasesScroll } from "@/components/sections/CasesScroll";

export function CasesSection() {
  return (
    <section id="cases" aria-labelledby="cases-heading" className="relative bg-[#12161a]">
      <div className="bg-[#0d1117] px-6 py-10 md:px-12 lg:px-20">
        <div className="mx-auto flex max-w-6xl items-end justify-between">
          <div>
            <span className="section-eyebrow text-[#89c8ff]">
              Портфолио
            </span>
            <h2 id="cases-heading" className="section-title">
              Выполненные задачи / Портфолио
            </h2>
            <p className="section-lead max-w-xl">
              Кейсы веб-разработки: SaaS-платформы, лендинги, каталоги, калькуляторы и
              иммерсивные сайты — от EdTech до малого бизнеса.
            </p>
          </div>
          <span className="hidden font-mono text-base text-[#8b949e] md:block">
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
