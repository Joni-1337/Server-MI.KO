import { NextResponse } from "next/server";
import {
  formatContactTelegramMessage,
  type ContactPayload,
} from "@/lib/contact-message";
import { sendContactEmail, getEmailErrorMessage } from "@/lib/email";
import { sendTelegramMessage } from "@/lib/telegram";
import { MAX_COMMENT_LENGTH } from "@/config/contact-form";

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as ContactPayload;

    if (!body.name?.trim() || !body.contact?.trim()) {
      return NextResponse.json({ error: "Имя и контакт обязательны" }, { status: 400 });
    }

    if (!body.quote?.totalPrice) {
      return NextResponse.json({ error: "Некорректный расчёт" }, { status: 400 });
    }

    const message = body.message?.trim().slice(0, MAX_COMMENT_LENGTH);

    const payload: ContactPayload = {
      name: body.name.trim(),
      contact: body.contact.trim(),
      message: message || undefined,
      quote: body.quote,
    };

    try {
      await sendContactEmail(payload);
    } catch (err) {
      const code = err instanceof Error ? err.message : "";

      if (code === "SMTP_NOT_CONFIGURED") {
        console.error(
          "[contact] Добавьте SMTP_USER, SMTP_PASS и NOTIFY_EMAIL в .env.local",
        );
        return NextResponse.json(
          { error: "Форма временно недоступна. Напишите на почту или в мессенджер." },
          { status: 503 },
        );
      }

      console.error("[contact] Ошибка отправки email:", err);
      return NextResponse.json(
        { error: getEmailErrorMessage(err) },
        { status: 502 },
      );
    }

    try {
      await sendTelegramMessage(formatContactTelegramMessage(payload));
    } catch (err) {
      console.warn("[contact] Telegram не отправлен (заявка уже на почте):", err);
    }

    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ error: "Неверный формат данных" }, { status: 400 });
  }
}
