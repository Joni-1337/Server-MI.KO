import { timeline } from "@/config/timeline";
import { AboutAnimate } from "@/components/sections/AboutAnimate";
import { HighlightedText } from "@/components/ui/HighlightedText";
export function AboutSection() {
  return (
    <section
      id="about"
      aria-labelledby="about-heading"
      className="relative border-t border-[#21262d] bg-[#12161a] px-6 py-24 md:px-12 lg:px-20"
    >
      <div className="mx-auto max-w-6xl">
        <AboutAnimate>
          <div className="about-intro">
            <span className="section-eyebrow text-[#f2d27a]">
              О себе
            </span>
            <h2 id="about-heading" className="section-title">
              Сайты и SaaS-платформы под ключ
            </h2>
            <p className="section-lead max-w-2xl">
              <HighlightedText
                parts={[
                  "Меня зовут Евгений, я ",
                  { text: "веб-разработчик", accent: "cyan" },
                  " MI.KO. Делаю ",
                  { text: "иммерсивные", accent: "cyan" },
                  " лендинги, каталоги, ",
                  { text: "SaaS-платформы", accent: "gold" },
                  " с личными кабинетами и оплатой, калькуляторы и формы заявок. Работаю с Next.js, TypeScript и GSAP — от идеи до ",
                  { text: "production", accent: "gold" },
                  ".",
                ]}
              />
            </p>          </div>

          <div className="timeline-track relative mt-16">
            <div
              className="absolute top-0 bottom-0 left-[1.125rem] w-px bg-gradient-to-b from-[#89c8ff]/60 via-[#f2d27a]/40 to-transparent md:left-1/2 md:-translate-x-px"
              aria-hidden="true"
            />

            <div className="space-y-10">
              {timeline.map((entry, index) => {
                const isYearLeft = index % 2 === 0;

                const yearEl = (
                  <span className="font-mono text-5xl font-bold text-[#89c8ff]/30">
                    {entry.year}
                  </span>
                );

                const cardEl = (
                  <div className="torn-edge border border-[#21262d] bg-[#0d1117] p-6">
                    <span className="label-caps text-xs text-[#f2d27a] sm:text-sm">
                      {entry.tag}
                    </span>
                    <h3 className="mt-2 font-sans text-2xl font-bold md:text-[1.65rem]">{entry.title}</h3>
                    <p className="body-copy mt-3">
                      <HighlightedText parts={entry.description} />
                    </p>
                  </div>
                );

                return (
                  <article
                    key={entry.year}
                    className="timeline-item relative grid grid-cols-[auto_1fr] gap-x-4 gap-y-3 md:grid-cols-[1fr_auto_1fr] md:items-start md:gap-x-8"
                  >
                    <div className="col-start-2 md:hidden">{yearEl}</div>
                    <div className="col-start-2 md:hidden">{cardEl}</div>

                    <div className="hidden md:flex md:items-start md:justify-end md:pr-4">
                      {isYearLeft ? yearEl : cardEl}
                    </div>

                    <div className="relative col-start-1 row-start-1 flex justify-center md:col-start-2 md:row-auto md:pt-2">
                      <div
                        className="h-2 w-2 shrink-0 rounded-full bg-[#89c8ff] md:mt-1"
                        aria-hidden="true"
                      />
                    </div>

                    <div className="hidden md:flex md:items-start md:justify-start md:pl-4">
                      {isYearLeft ? cardEl : yearEl}
                    </div>
                  </article>
                );
              })}
            </div>
          </div>
        </AboutAnimate>
      </div>
    </section>
  );
}
