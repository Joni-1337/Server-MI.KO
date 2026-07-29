import { escapeHtml } from "@/lib/escape-html";

export { escapeHtml };

export async function sendTelegramMessage(text: string): Promise<void> {
  const token = process.env.TELEGRAM_BOT_TOKEN ?? process.env.TEGRAM_BOT_TOKEN;
  const chatId = process.env.TELEGRAM_CHAT_ID ?? process.env.TEGRAM_CHAT_ID;

  if (!token || !chatId) {
    throw new Error("TELEGRAM_NOT_CONFIGURED");
  }

  const response = await fetch(`https://api.telegram.org/bot${token}/sendMessage`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      chat_id: chatId,
      text,
      parse_mode: "HTML",
      disable_web_page_preview: true,
    }),
  });

  if (!response.ok) {
    const details = await response.text();
    console.error("[telegram]", details);
    throw new Error("TELEGRAM_SEND_FAILED");
  }
}
