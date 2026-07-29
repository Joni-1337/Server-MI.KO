import {
  formatContactTelegramMessage,
  type ContactPayload,
} from "@/lib/contact-message";
import { getEmailErrorMessage, sendContactEmail } from "@/lib/email";
import { sendTelegramMessage } from "@/lib/telegram";

export type ContactNotifyResult =
  | { ok: true; via: ("email" | "telegram")[] }
  | { ok: false; error: string; status: number };

function isNotConfigured(error: unknown, code: string): boolean {
  return error instanceof Error && error.message === code;
}

export async function notifyContact(payload: ContactPayload): Promise<ContactNotifyResult> {
  const telegramMessage = formatContactTelegramMessage(payload);

  const [emailResult, telegramResult] = await Promise.allSettled([
    sendContactEmail(payload),
    sendTelegramMessage(telegramMessage),
  ]);

  const via: ("email" | "telegram")[] = [];
  if (emailResult.status === "fulfilled") via.push("email");
  if (telegramResult.status === "fulfilled") via.push("telegram");

  if (via.length > 0) {
    if (emailResult.status === "rejected") {
      console.warn("[contact] Email не отправлен:", emailResult.reason);
    }
    if (telegramResult.status === "rejected") {
      console.warn("[contact] Telegram не отправлен:", telegramResult.reason);
    }
    return { ok: true, via };
  }

  const emailError = emailResult.status === "rejected" ? emailResult.reason : null;
  const telegramError = telegramResult.status === "rejected" ? telegramResult.reason : null;

  const emailMissing = isNotConfigured(emailError, "SMTP_NOT_CONFIGURED");
  const telegramMissing = isNotConfigured(telegramError, "TELEGRAM_NOT_CONFIGURED");

  if (emailMissing && telegramMissing) {
    console.error("[contact] Нет SMTP и Telegram в .env.local");
    return {
      ok: false,
      error: "Форма временно недоступна. Напишите на почту или в мессенджер.",
      status: 503,
    };
  }

  if (telegramMissing && emailError) {
    return {
      ok: false,
      error: getEmailErrorMessage(emailError),
      status: 502,
    };
  }

  if (emailMissing && telegramError) {
    console.error("[contact] Telegram send failed:", telegramError);
    return {
      ok: false,
      error: "Не удалось отправить заявку. Попробуйте позже.",
      status: 502,
    };
  }

  console.error("[contact] Email и Telegram недоступны:", { emailError, telegramError });
  return {
    ok: false,
    error: getEmailErrorMessage(emailError) ?? "Не удалось отправить заявку. Попробуйте позже.",
    status: 502,
  };
}
