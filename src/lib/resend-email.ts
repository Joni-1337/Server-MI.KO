import {
  formatContactPlainText,
  type ContactPayload,
} from "@/lib/contact-message";

export async function sendContactResend(payload: ContactPayload): Promise<void> {
  const apiKey = process.env.RESEND_API_KEY?.trim();
  const to = process.env.NOTIFY_EMAIL?.trim().toLowerCase();

  if (!apiKey || !to) {
    throw new Error("RESEND_NOT_CONFIGURED");
  }

  const from =
    process.env.RESEND_FROM?.trim() ??
    "MI.KO Portfolio <onboarding@resend.dev>";

  const response = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      from,
      to: [to],
      reply_to: payload.contact.includes("@") ? payload.contact : undefined,
      subject: `Новая заявка — ${payload.name}`,
      text: formatContactPlainText(payload),
    }),
  });

  if (!response.ok) {
    const details = await response.text();
    console.error("[resend]", details);
    throw new Error("RESEND_SEND_FAILED");
  }
}
