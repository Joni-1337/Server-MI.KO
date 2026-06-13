import Link from "next/link";

export function Footer() {
  return (
    <footer className="border-t border-[#21262d] bg-[#0d1117] px-6 py-8 md:px-12 lg:px-20">
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-4 sm:flex-row">
        <Link
          href="#hero"
          className="font-mono text-xs tracking-widest text-[#89c8ff] uppercase"
        >
          MI<span className="text-[#f2d27a]">.</span>KO
        </Link>

        <p className="font-mono text-[10px] tracking-wider text-[#8b949e] uppercase">
          © {new Date().getFullYear()} MI.KO · сайты для малого бизнеса
        </p>
      </div>
    </footer>
  );
}
