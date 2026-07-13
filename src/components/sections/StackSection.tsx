import { stackBlocks } from "@/config/stack";
import { StackAnimate } from "@/components/sections/StackAnimate";

const accentStyles = {
  cyan: {
    bar: "bg-[#89c8ff]",
    text: "text-[#89c8ff]",
    border: "border-[#89c8ff]/20",
  },
  gold: {
    bar: "bg-[#f2d27a]",
    text: "text-[#f2d27a]",
    border: "border-[#f2d27a]/20",
  },
};

export function StackSection() {
  return (
    <section
      id="stack"
      aria-labelledby="stack-heading"
      className="relative border-t border-[#21262d] bg-[#0d1117] px-6 py-24 md:px-12 lg:px-20"
    >
      <div className="absolute inset-0 grid-blueprint opacity-20" aria-hidden="true" />

      <div className="relative mx-auto max-w-6xl">
        <span className="section-eyebrow text-[#89c8ff]">
          Экспертиза
        </span>
        <h2 id="stack-heading" className="section-title">
          Технический стек и экспертиза
        </h2>
        <p className="section-lead max-w-2xl">
          Frontend и backend для сайтов и платформ под ключ: интерфейсы, личные кабинеты,
          подписки, формы заявок и серверная логика.
        </p>

        <StackAnimate>
          <div className="mt-14 grid gap-8 lg:grid-cols-2">
            {stackBlocks.map((block) => {
              const accent = accentStyles[block.accent];
              return (
                <article
                  key={block.id}
                  className={`glow-panel stack-block border bg-[#12161a] p-8 ${accent.border} ${
                    block.accent === "cyan" ? "glow-panel-cyan" : "glow-panel-gold"
                  }`}
                >
                  <h3 className={`font-sans text-3xl font-bold ${accent.text}`}>{block.title}</h3>
                  <p className="mt-2 font-mono text-base text-[#8b949e] md:text-lg">{block.subtitle}</p>

                  <ul className="mt-6 space-y-4">
                    {block.items.map((item) => (
                      <li key={item.name}>
                        <div className="mb-1.5 flex justify-between font-mono text-sm">
                          <span className="text-[#c9d1d9]">{item.name}</span>
                          <span className="text-[#8b949e]">{item.level}%</span>
                        </div>
                        <div className="h-1 overflow-hidden bg-[#21262d]">
                          <div
                            className={`stack-bar-fill h-full origin-left ${accent.bar}`}
                            style={{ width: `${item.level}%` }}
                          />
                        </div>
                      </li>
                    ))}
                  </ul>

                  <ul className="mt-8 space-y-2 border-t border-[#21262d] pt-6">
                    {block.highlights.map((h) => (
                      <li key={h} className="flex gap-2 font-mono text-sm text-[#8b949e]">
                        <span className={accent.text}>&gt;</span>
                        {h}
                      </li>
                    ))}
                  </ul>
                </article>
              );
            })}
          </div>
        </StackAnimate>
      </div>
    </section>
  );
}
