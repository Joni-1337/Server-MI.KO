import { NextResponse } from "next/server";
import { type ContactPayload } from "@/lib/contact-message";
import { notifyContact } from "@/lib/contact-notify";
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

    const result = await notifyContact(payload);

    if (!result.ok) {
      return NextResponse.json({ error: result.error }, { status: result.status });
    }

    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ error: "Неверный формат данных" }, { status: 400 });
  }
}
