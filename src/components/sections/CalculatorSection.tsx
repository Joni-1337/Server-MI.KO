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
        <span className="font-mono text-xs tracking-[0.3em] text-[#89c8ff] uppercase">
          Калькулятор
        </span>
        <h2 className="mt-2 font-sans text-3xl font-bold md:text-4xl" id="calculator-heading">
          Рассчитать стоимость проекта
        </h2>
        <p className="mt-4 max-w-2xl font-mono text-sm text-[#8b949e]">
          Выберите параметры — стоимость и срок обновляются мгновенно. Это предварительная оценка,
          точная цена — после короткого брифа.
        </p>

        <div className="mt-12 grid gap-10 lg:grid-cols-5">
          <div className="space-y-8 lg:col-span-3">
            <fieldset>
              <legend className="mb-3 font-mono text-xs tracking-wider text-[#8b949e] uppercase">
                Тип сайта
              </legend>
              <div className="flex flex-wrap gap-2">
                {siteTypes.map((opt) => (
                  <button
                    key={opt.id}
                    type="button"
                    onClick={() => setState((s) => ({ ...s, siteType: opt.id }))}
                    className={`border px-4 py-2 font-mono text-xs transition-colors ${
                      state.siteType === opt.id
                        ? "border-[#89c8ff] bg-[#89c8ff]/10 text-[#89c8ff]"
                        : "border-[#21262d] text-[#8b949e] hover:border-[#89c8ff]/40"
                    }`}
                  >
                    {opt.label}
                  </button>
                ))}
              </div>
            </fieldset>

            <fieldset>
              <legend className="mb-3 font-mono text-xs tracking-wider text-[#8b949e] uppercase">
                Сложность дизайна
              </legend>
              <div className="flex flex-wrap gap-2">
                {designLevels.map((opt) => (
                  <button
                    key={opt.id}
                    type="button"
                    onClick={() => setState((s) => ({ ...s, designLevel: opt.id }))}
                    className={`border px-4 py-2 font-mono text-xs transition-colors ${
                      state.designLevel === opt.id
                        ? "border-[#f2d27a] bg-[#f2d27a]/10 text-[#f2d27a]"
                        : "border-[#21262d] text-[#8b949e] hover:border-[#f2d27a]/40"
                    }`}
                  >
                    {opt.label}
                  </button>
                ))}
              </div>
            </fieldset>

            <fieldset>
              <legend className="mb-3 font-mono text-xs tracking-wider text-[#8b949e] uppercase">
                Дополнительно
              </legend>
              <div className="flex flex-wrap gap-2">
                {integrations.map((opt) => {
                  const active = state.selectedIntegrations.includes(opt.id);
                  return (
                    <button
                      key={opt.id}
                      type="button"
                      onClick={() => toggleIntegration(opt.id)}
                      className={`border px-4 py-2 font-mono text-xs transition-colors ${
                        active
                          ? "border-[#89c8ff] bg-[#89c8ff]/10 text-[#89c8ff]"
                          : "border-[#21262d] text-[#8b949e] hover:border-[#89c8ff]/40"
                      }`}
                    >
                      {opt.label}
                    </button>
                  );
                })}
              </div>
            </fieldset>
          </div>

          <div className="lg:col-span-2">
            <div className="sticky top-24 border border-[#21262d] bg-[#12161a] p-6">
              <p className="font-mono text-xs tracking-wider text-[#8b949e] uppercase">
                Предварительно
              </p>
              <p className="mt-2 font-sans text-4xl font-bold text-gradient-cyan">
                {formatPriceFrom(quote.totalPrice)}
              </p>
              <p className="mt-1 font-mono text-sm text-[#f2d27a]">
                ≈ {quote.totalWeeks} {quote.totalWeeks === 1 ? "неделя" : "недель"}
              </p>

              <ul className="mt-6 space-y-2 border-t border-[#21262d] pt-4">
                {quote.breakdown.map((item) => (
                  <li
                    key={item.label}
                    className="flex justify-between font-mono text-xs text-[#8b949e]"
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
                  <p className="font-mono text-sm text-[#89c8ff]">Заявка отправлена!</p>
                  <p className="text-xs text-[#8b949e]">Свяжусь с вами в течение 24 часов.</p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="mt-8 space-y-4">
                  <input
                    type="text"
                    placeholder="Имя"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full border border-[#21262d] bg-[#0d1117] px-4 py-3 font-mono text-sm outline-none focus:border-[#89c8ff]/50"
                  />
                  <input
                    type="text"
                    placeholder="Telegram / Email / Телефон"
                    value={contact}
                    onChange={(e) => setContact(e.target.value)}
                    className="w-full border border-[#21262d] bg-[#0d1117] px-4 py-3 font-mono text-sm outline-none focus:border-[#89c8ff]/50"
                  />
                  <div>
                    <textarea
                      placeholder="Комментарий (необязательно)"
                      value={message}
                      maxLength={MAX_COMMENT_LENGTH}
                      onChange={(e) => setMessage(e.target.value)}
                      rows={3}
                      className="w-full resize-none border border-[#21262d] bg-[#0d1117] px-4 py-3 font-mono text-sm outline-none focus:border-[#89c8ff]/50"
                    />
                    <p className="mt-1 text-right font-mono text-[10px] text-[#8b949e]">
                      {message.length}/{MAX_COMMENT_LENGTH}
                    </p>
                  </div>

                  {status === "error" && errorText && (
                    <p className="font-mono text-xs text-red-400">{errorText}</p>
                  )}

                  <button
                    type="submit"
                    disabled={status === "loading"}
                    className="flex w-full items-center justify-center gap-2 border border-[#89c8ff]/40 bg-[#89c8ff]/5 py-3 font-mono text-xs tracking-wider text-[#89c8ff] uppercase transition-colors hover:bg-[#89c8ff]/10 disabled:opacity-50"
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
