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
        <span className="section-eyebrow text-[#f2d27a]">
          FAQ
        </span>
        <h2 id="faq-heading" className="section-title">
          Частые вопросы о разработке сайтов
        </h2>
        <p className="section-lead">
          Ответы на типичные вопросы о создании сайтов под ключ, иммерсивном дизайне и аналитике.
        </p>

        <div className="mt-10">
          <FaqAccordion items={faqItems} />
        </div>
      </div>
    </section>
  );
}
