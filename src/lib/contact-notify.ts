import {
  formatContactTelegramMessage,
  type ContactPayload,
} from "@/lib/contact-message";
import { getEmailErrorMessage, sendContactEmail } from "@/lib/email";
import { sendContactResend } from "@/lib/resend-email";
import { sendTelegramMessage } from "@/lib/telegram";
import { SITE_AUTHOR } from "@/lib/site";

export type ContactNotifyResult =
  | { ok: true; via: ("email" | "telegram" | "resend")[] }
  | { ok: false; error: string; status: number };

function isNotConfigured(error: unknown, code: string): boolean {
  return error instanceof Error && error.message === code;
}

function buildFailureMessage(emailError: unknown, telegramError: unknown): string {
  const emailMissing = isNotConfigured(emailError, "SMTP_NOT_CONFIGURED");
  const telegramMissing = isNotConfigured(telegramError, "TELEGRAM_NOT_CONFIGURED");

  if (!emailMissing && emailError) {
    return `${getEmailErrorMessage(emailError)} Или напишите напрямую: ${SITE_AUTHOR.email}`;
  }

  if (!telegramMissing) {
    return "Не удалось отправить заявку. Попробуйте позже.";
  }

  return `Форма временно недоступна. Напишите на ${SITE_AUTHOR.email}`;
}

export async function notifyContact(payload: ContactPayload): Promise<ContactNotifyResult> {
  const telegramMessage = formatContactTelegramMessage(payload);

  const [emailResult, telegramResult, resendResult] = await Promise.allSettled([
    sendContactEmail(payload),
    sendTelegramMessage(telegramMessage),
    sendContactResend(payload),
  ]);

  const via: ("email" | "telegram" | "resend")[] = [];
  if (emailResult.status === "fulfilled") via.push("email");
  if (telegramResult.status === "fulfilled") via.push("telegram");
  if (resendResult.status === "fulfilled") via.push("resend");

  if (via.length > 0) {
    if (emailResult.status === "rejected") {
      console.warn("[contact] Email не отправлен:", emailResult.reason);
    }
    if (telegramResult.status === "rejected") {
      console.warn("[contact] Telegram не отправлен:", telegramResult.reason);
    }
    if (resendResult.status === "rejected") {
      console.warn("[contact] Resend не отправлен:", resendResult.reason);
    }
    return { ok: true, via };
  }

  const emailError = emailResult.status === "rejected" ? emailResult.reason : null;
  const telegramError = telegramResult.status === "rejected" ? telegramResult.reason : null;
  const resendError = resendResult.status === "rejected" ? resendResult.reason : null;

  console.error("[contact] Все каналы недоступны:", { emailError, telegramError, resendError });

  return {
    ok: false,
    error: buildFailureMessage(emailError, telegramError),
    status: 502,
  };
}
