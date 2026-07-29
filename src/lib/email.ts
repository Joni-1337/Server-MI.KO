import nodemailer from "nodemailer";
import {
  formatContactPlainText,
  type ContactPayload,
} from "@/lib/contact-message";

function resolveSmtpHost(user: string, explicitHost?: string): string {
  if (explicitHost) return explicitHost;

  const domain = user.split("@")[1] ?? "";

  if (["mail.ru", "inbox.ru", "bk.ru", "list.ru", "internet.ru"].includes(domain)) {
    return "smtp.mail.ru";
  }

  if (domain === "yandex.ru" || domain === "ya.ru" || domain.endsWith(".yandex.ru")) {
    return "smtp.yandex.ru";
  }

  return "smtp.yandex.ru";
}

function getSmtpConfig() {
  const user = process.env.SMTP_USER?.trim().toLowerCase();
  const host = resolveSmtpHost(user ?? "", process.env.SMTP_HOST?.trim());
  const port = Number(process.env.SMTP_PORT ?? "465");
  const pass = process.env.SMTP_PASS?.trim().replace(/\s/g, "").replace(/^["']|["']$/g, "");
  const to = (process.env.NOTIFY_EMAIL ?? user)?.trim().toLowerCase();

  if (!user || !pass || !to) {
    return null;
  }

  return { host, port, user, pass, to };
}

function createTransporter(config: NonNullable<ReturnType<typeof getSmtpConfig>>) {
  const useSsl = config.port === 465;

  return nodemailer.createTransport({
    host: config.host,
    port: config.port,
    secure: useSsl,
    requireTLS: !useSsl,
    auth: {
      user: config.user,
      pass: config.pass,
    },
    connectionTimeout: 15_000,
    greetingTimeout: 15_000,
    socketTimeout: 20_000,
  });
}

function getEmailErrorMessage(error: unknown): string {
  const err = error as { code?: string; response?: string };
  const user = process.env.SMTP_USER?.trim().toLowerCase() ?? "";
  const host = resolveSmtpHost(user, process.env.SMTP_HOST?.trim());

  if (err.code === "EAUTH") {
    if (host.includes("mail.ru")) {
      return "Ошибка входа в Mail.ru. Проверьте пароль для внешних приложений в настройках почты.";
    }
    return "Ошибка входа в почту. Проверьте SMTP-пароль в настройках Vercel или подключите Telegram / Resend.";
  }

  if (err.code === "ETIMEDOUT" || err.code === "ESOCKET") {
    return "Не удалось подключиться к почте. Попробуйте позже.";
  }

  return "Не удалось отправить заявку. Попробуйте позже.";
}

export async function sendContactEmail(payload: ContactPayload): Promise<void> {
  const config = getSmtpConfig();

  if (!config) {
    throw new Error("SMTP_NOT_CONFIGURED");
  }

  const text = formatContactPlainText(payload);
  const mail = {
    from: `"MI.KO Portfolio" <${config.user}>`,
    to: config.to,
    replyTo: payload.contact.includes("@") ? payload.contact : undefined,
    subject: `Новая заявка — ${payload.name}`,
    text,
  };

  const transporter = createTransporter(config);

  try {
    await transporter.sendMail(mail);
    return;
  } catch (firstError) {
    const err = firstError as { code?: string };
    console.error("[email] SMTP send failed:", firstError);

    // Иногда помогает 587 вместо 465
    if (err.code === "EAUTH" || config.port === 465) {
      const fallback = createTransporter({ ...config, port: 587 });
      try {
        await fallback.sendMail(mail);
        return;
      } catch (fallbackError) {
        console.error("[email] SMTP fallback 587 failed:", fallbackError);
        throw firstError;
      }
    }

    throw firstError;
  }
}

export { getEmailErrorMessage };
