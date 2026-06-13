import { faqItems } from "@/config/faq";
import { FaqAccordion } from "@/components/sections/FaqAccordion";

export function FaqSection() {
  return (
    <section
      id="faq"
      aria-labelledby="faq-heading"
      className="relative border-t border-[#21262d] bg-[#12161a] px-6 py-24 md:px-12 lg:px-20"
    >
      <div className="absolute inset-0 grid-blueprint opacity-15" aria-hidden="true" />

      <div className="relative mx-auto max-w-4xl">
        <span className="font-mono text-xs tracking-[0.3em] text-[#f2d27a] uppercase">
          FAQ
        </span>
        <h2 id="faq-heading" className="mt-2 font-sans text-3xl font-bold md:text-4xl">
          Частые вопросы о разработке сайтов
        </h2>
        <p className="mt-4 font-mono text-sm text-[#8b949e]">
          Ответы на типичные вопросы о создании сайтов под ключ, иммерсивном дизайне и аналитике.
        </p>

        <div className="mt-10">
          <FaqAccordion items={faqItems} />
        </div>
      </div>
    </section>
  );
}
