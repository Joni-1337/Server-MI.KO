import { ArrowDown, Terminal } from "lucide-react";
import { SmoothScrollLink } from "@/components/ui/SmoothScrollLink";
import { TermHint } from "@/components/ui/TermHint";

export function HeroSection() {  return (
    <section
      id="hero"
      aria-labelledby="hero-heading"
      className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden px-5 py-28 text-center md:items-stretch md:px-12 md:py-24 md:text-left lg:px-20"
    >
      <div className="absolute inset-0 grid-blueprint opacity-40" aria-hidden="true" />

      <div className="relative z-10 mx-auto flex w-full max-w-6xl flex-col items-center md:items-start">
        <p className="interactive-badge hero-badge mb-8 inline-flex max-w-full items-center gap-2 rounded-full border border-[#21262d] bg-[#12161a] px-4 py-2 font-mono text-xs tracking-widest text-[#89c8ff] uppercase sm:text-sm">
          <Terminal className="h-3.5 w-3.5 shrink-0" aria-hidden="true" />
          <span className="leading-snug">Веб-разработчик · mikodev.ru</span>
        </p>

        <h1
          id="hero-heading"
          className="hero-title w-full font-sans text-[1.75rem] leading-[1.15] font-bold tracking-tight sm:text-4xl md:text-6xl lg:text-7xl"
        >
          <span className="hero-line flex justify-center overflow-hidden md:justify-start">
            <span className="hero-line-inner inline-block">
              Разработка{" "}
              <TermHint
                term="иммерсивных"
                label="Иммерсивный"
                description="Сайты, которые вовлекают: анимации, глубина, плавные переходы и ощущение присутствия внутри интерфейса."
              />{" "}
              сайтов
            </span>          </span>
          <span className="hero-line flex justify-center overflow-hidden md:justify-start">
            <span className="hero-line-inner inline-block text-gradient-cyan">
              и цифровых интерфейсов
            </span>
          </span>
          <span className="hero-line flex justify-center overflow-hidden md:justify-start">
            <span className="hero-line-inner inline-block">
              от <span className="text-gradient-gold">MI.KO</span>
            </span>
          </span>
        </h1>

        <div className="hero-subtitle mt-8 max-w-2xl space-y-1 font-mono text-sm leading-relaxed text-[#8b949e] sm:text-base md:text-lg">
          <span className="hero-terminal-line">
            <span className="terminal-chevron text-[#89c8ff]">&gt;</span> Создание сайтов под ключ ·
            верстка · фронтенд · Next.js
          </span>
          <span className="hero-terminal-line">
            <span className="terminal-chevron text-[#89c8ff]">&gt;</span> Лендинги, каталоги,
            калькуляторы — от 30 000 ₽
          </span>
        </div>

        <div className="hero-cta mt-10 flex w-full flex-col items-center gap-4 sm:mt-12 md:flex-row md:flex-wrap md:items-center md:justify-start md:gap-6">
          <SmoothScrollLink
            href="#calculator"
            className="glow-btn-cyan group relative inline-flex w-full max-w-xs items-center justify-center gap-3 overflow-hidden rounded-none border border-[#89c8ff]/40 bg-[#89c8ff]/5 px-8 py-4 font-mono text-base tracking-wider text-[#89c8ff] uppercase sm:w-auto"
          >
            <span className="relative z-10">Рассчитать проект</span>
            <ArrowDown
              className="relative z-10 h-4 w-4 transition-transform group-hover:translate-y-1"
              aria-hidden="true"
            />
          </SmoothScrollLink>

          <SmoothScrollLink
            href="#cases"
            className="glow-link-gold font-mono text-sm tracking-widest text-[#8b949e] uppercase"
          >
            Смотреть кейсы ↓
          </SmoothScrollLink>
        </div>
      </div>

      <div
        className="hero-scroll-indicator absolute bottom-8 left-1/2 flex -translate-x-1/2 flex-col items-center gap-2"
        aria-hidden="true"
      >
        <span className="font-mono text-xs tracking-[0.3em] text-[#8b949e] uppercase">
          Scroll
        </span>
        <div className="scroll-line h-12 w-px bg-gradient-to-b from-[#89c8ff]/60 to-transparent" />
      </div>
    </section>
  );
}
