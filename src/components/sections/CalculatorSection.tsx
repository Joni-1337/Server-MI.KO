"use client";

import { useMemo, useState } from "react";
import { Check, Loader2, Send } from "lucide-react";
import {
  calculateQuote,
  designLevels,
  formatPrice,
  formatPriceFrom,
  integrations,
  siteTypes,
  type CalculatorState,
} from "@/config/calculator";
import { MAX_COMMENT_LENGTH } from "@/config/contact-form";
import { CalculatorChip } from "@/components/calculator/CalculatorChip";

type FormStatus = "idle" | "loading" | "success" | "error";

export function CalculatorSection() {
  const [state, setState] = useState<CalculatorState>({
    siteType: siteTypes[0].id,
    designLevel: designLevels[0].id,
    selectedIntegrations: [],
  });

  const [name, setName] = useState("");
  const [contact, setContact] = useState("");
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState<FormStatus>("idle");
  const [errorText, setErrorText] = useState("");

  const quote = useMemo(() => calculateQuote(state), [state]);

  const toggleIntegration = (id: string) => {
    setState((prev) => ({
      ...prev,
      selectedIntegrations: prev.selectedIntegrations.includes(id)
        ? prev.selectedIntegrations.filter((i) => i !== id)
        : [...prev.selectedIntegrations, id],
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !contact.trim()) {
      setErrorText("Укажите имя и контакт для связи.");
      setStatus("error");
      return;
    }

    setStatus("loading");
    setErrorText("");

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: name.trim(),
          contact: contact.trim(),
          message: message.trim(),
          quote: {
            totalPrice: quote.totalPrice,
            totalWeeks: quote.totalWeeks,
            breakdown: quote.breakdown,
            selections: state,
          },
        }),
      });

      if (!res.ok) {
        const data = (await res.json()) as { error?: string };
        throw new Error(data.error ?? "Ошибка отправки");
      }

      setStatus("success");
    } catch (err) {
      setStatus("error");
      setErrorText(err instanceof Error ? err.message : "Не удалось отправить заявку");
    }
  };

  return (
    <section
      id="calculator"
      aria-labelledby="calculator-heading"
      className="relative border-t border-[#21262d] bg-[#0d1117] px-6 py-24 md:px-12 lg:px-20"
    >
      <div className="absolute inset-0 grid-blueprint opacity-15" aria-hidden="true" />

      <div className="relative mx-auto max-w-6xl">
        <span className="section-eyebrow text-[#89c8ff]">
          Калькулятор
        </span>
        <h2 className="section-title" id="calculator-heading">
          Рассчитать стоимость проекта
        </h2>
        <p className="section-lead max-w-2xl">
          Выберите параметры — стоимость и срок обновляются мгновенно. Это предварительная оценка,
          точная цена — после короткого брифа.
        </p>

        <div className="mt-12 grid gap-10 overflow-x-clip lg:grid-cols-5">
          <div className="space-y-8 overflow-visible lg:col-span-3">
            <fieldset className="overflow-visible">
              <legend className="label-caps mb-3 text-[#8b949e]">
                Тип сайта
              </legend>
              <div className="flex flex-wrap gap-2 overflow-visible">
                {siteTypes.map((opt) => (
                  <CalculatorChip
                    key={opt.id}
                    id={opt.id}
                    label={opt.label}
                    description={opt.description}
                    accent="cyan"
                    active={state.siteType === opt.id}
                    onClick={() => setState((s) => ({ ...s, siteType: opt.id }))}
                  />
                ))}
              </div>
            </fieldset>

            <fieldset className="overflow-visible">
              <legend className="label-caps mb-3 text-[#8b949e]">
                Сложность дизайна
              </legend>
              <div className="flex flex-wrap gap-2 overflow-visible">
                {designLevels.map((opt) => (
                  <CalculatorChip
                    key={opt.id}
                    id={opt.id}
                    label={opt.label}
                    description={opt.description}
                    accent="gold"
                    active={state.designLevel === opt.id}
                    onClick={() => setState((s) => ({ ...s, designLevel: opt.id }))}
                  />
                ))}
              </div>
            </fieldset>

            <fieldset className="overflow-visible">
              <legend className="label-caps mb-3 text-[#8b949e]">
                Дополнительно
              </legend>
              <div className="flex flex-wrap gap-2 overflow-visible">
                {integrations.map((opt) => (
                  <CalculatorChip
                    key={opt.id}
                    id={opt.id}
                    label={opt.label}
                    description={opt.description}
                    accent="cyan"
                    active={state.selectedIntegrations.includes(opt.id)}
                    onClick={() => toggleIntegration(opt.id)}
                  />
                ))}
              </div>
            </fieldset>
          </div>

          <div className="lg:col-span-2">
            <div className="glow-quote-panel sticky top-24 border border-[#21262d] bg-[#12161a] p-6">
              <p className="label-caps text-[#8b949e]">
                Предварительно
              </p>
              <p className="mt-2 font-sans text-4xl font-bold text-gradient-cyan md:text-5xl">
                {formatPriceFrom(quote.totalPrice)}
              </p>
              <p className="mt-1 font-mono text-base text-[#f2d27a]">
                ≈ {quote.totalWeeks} {quote.totalWeeks === 1 ? "неделя" : "недель"}
              </p>

              <ul className="mt-6 space-y-2 border-t border-[#21262d] pt-4">
                {quote.breakdown.map((item) => (
                  <li
                    key={item.label}
                    className="chip-text flex justify-between text-[#8b949e]"
                  >
                    <span>{item.label}</span>
                    <span>{formatPrice(item.price)}</span>
                  </li>
                ))}
              </ul>

              {status === "success" ? (
                <div className="mt-8 flex flex-col items-center gap-3 py-6 text-center">
                  <div className="flex h-12 w-12 items-center justify-center rounded-full border border-[#89c8ff]/40 bg-[#89c8ff]/10">
                    <Check className="h-6 w-6 text-[#89c8ff]" />
                  </div>
                  <p className="font-mono text-base text-[#89c8ff]">Заявка отправлена!</p>
                  <p className="text-sm text-[#8b949e]">Свяжусь с вами в течение 24 часов.</p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="mt-8 space-y-4">
                  <input
                    type="text"
                    placeholder="Имя"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="glow-input w-full border border-[#21262d] bg-[#0d1117] px-4 py-3 font-mono text-base outline-none focus:border-[#89c8ff]/50"
                  />
                  <input
                    type="text"
                    placeholder="Telegram / Email / Телефон"
                    value={contact}
                    onChange={(e) => setContact(e.target.value)}
                    className="glow-input w-full border border-[#21262d] bg-[#0d1117] px-4 py-3 font-mono text-base outline-none focus:border-[#89c8ff]/50"
                  />
                  <div>
                    <textarea
                      placeholder="Комментарий (необязательно)"
                      value={message}
                      maxLength={MAX_COMMENT_LENGTH}
                      onChange={(e) => setMessage(e.target.value)}
                      rows={3}
                      className="glow-input w-full resize-none border border-[#21262d] bg-[#0d1117] px-4 py-3 font-mono text-base outline-none focus:border-[#89c8ff]/50"
                    />
                    <p className="mt-1 text-right font-mono text-xs text-[#8b949e]">
                      {message.length}/{MAX_COMMENT_LENGTH}
                    </p>
                  </div>

                  {status === "error" && errorText && (
                    <p className="font-mono text-sm text-red-400">{errorText}</p>
                  )}

                  <button
                    type="submit"
                    disabled={status === "loading"}
                    className="glow-btn-cyan flex w-full items-center justify-center gap-2 border border-[#89c8ff]/40 bg-[#89c8ff]/5 py-3.5 font-mono text-sm tracking-wider text-[#89c8ff] uppercase disabled:opacity-50"
                  >
                    {status === "loading" ? (
                      <Loader2 className="h-4 w-4 animate-spin" />
                    ) : (
                      <Send className="h-4 w-4" />
                    )}
                    Отправить заявку
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
