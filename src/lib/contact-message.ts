import { formatPrice } from "@/config/calculator";
import { escapeHtml } from "@/lib/escape-html";

export interface ContactPayload {
  name: string;
  contact: string;
  message?: string;
  quote: {
    totalPrice: number;
    totalWeeks: number;
    breakdown: { label: string; price: number }[];
    selections: {
      siteType: string;
      designLevel: string;
      selectedIntegrations: string[];
    };
  };
}

function getWeeksLabel(weeks: number): string {
  if (weeks === 1) return "неделя";
  if (weeks < 5) return "недели";
  return "недель";
}

function formatBreakdownPlain(quote: ContactPayload["quote"]): string {
  return quote.breakdown.map((item) => `• ${item.label} — ${formatPrice(item.price)}`).join("\n");
}

export function formatContactPlainText(payload: ContactPayload): string {
  const { name, contact, message, quote } = payload;
  const weeksLabel = getWeeksLabel(quote.totalWeeks);

  const lines = [
    "Новая заявка с сайта MI.KO",
    "",
    `Имя: ${name}`,
    `Контакт: ${contact}`,
  ];

  if (message?.trim()) {
    lines.push("", "Комментарий:", message.trim());
  }

  lines.push(
    "",
    "Расчёт:",
    formatBreakdownPlain(quote),
    "",
    `Итого: ${formatPrice(quote.totalPrice)}`,
    `Срок: ~${quote.totalWeeks} ${weeksLabel}`,
    "",
    new Date().toLocaleString("ru-RU", { timeZone: "Europe/Moscow" }),
  );

  return lines.join("\n");
}

export function formatContactTelegramMessage(payload: ContactPayload): string {
  const { name, contact, message, quote } = payload;
  const weeksLabel = getWeeksLabel(quote.totalWeeks);

  const breakdown = quote.breakdown
    .map((item) => `• ${escapeHtml(item.label)} — ${formatPrice(item.price)}`)
    .join("\n");

  const comment = message?.trim()
    ? `\n\n💬 <b>Комментарий:</b>\n${escapeHtml(message.trim())}`
    : "";

  return [
    "🆕 <b>Новая заявка с сайта MI.KO</b>",
    "",
    `👤 <b>Имя:</b> ${escapeHtml(name)}`,
    `📞 <b>Контакт:</b> ${escapeHtml(contact)}`,
    comment,
    "",
    "📋 <b>Расчёт:</b>",
    breakdown,
    "",
    `💰 <b>Итого:</b> ${formatPrice(quote.totalPrice)}`,
    `⏱ <b>Срок:</b> ~${quote.totalWeeks} ${weeksLabel}`,
    "",
    `🕐 ${new Date().toLocaleString("ru-RU", { timeZone: "Europe/Moscow" })}`,
  ]
    .filter(Boolean)
    .join("\n");
}
