import type { Metadata } from "next";
import { SITE_LOCALE, SITE_NAME, SITE_URL } from "@/lib/site";

const title = "MI.KO | Разработка иммерсивных сайтов и веб-приложений под ключ";
const description =
  "Веб-разработчик Евгений Михалин (MI.KO). Иммерсивные сайты, SaaS-платформы с личными кабинетами и оплатой, лендинги, каталоги и калькуляторы под ключ на Next.js и TypeScript.";

const keywords = [
  "веб-разработчик",
  "создание сайтов",
  "фронтенд разработчик",
  "иммерсивный дизайн",
  "Next.js",
  "разработка интерфейсов",
  "Евгений Михалин",
  "mikodev",
  "заказать сайт",
  "верстка сайтов",
  "создание сайтов под ключ",
  "заказать иммерсивный сайт",
  "услуги фронтенд разработчика",
  "личный кабинет",
  "SaaS разработка",
  "подключение оплаты на сайт",
];

export const siteMetadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title,
  description,
  keywords,
  authors: [{ name: "Евгений Михалин", url: SITE_URL }],
  creator: "Евгений Михалин",
  publisher: SITE_NAME,
  alternates: {
    canonical: SITE_URL,
  },
  openGraph: {
    title,
    description,
    url: SITE_URL,
    siteName: SITE_NAME,
    locale: SITE_LOCALE,
    type: "website",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "MI.KO — разработка иммерсивных сайтов и веб-приложений",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title,
    description,
    images: ["/og-image.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  icons: {
    icon: [
      { url: "/miko-icon.png", type: "image/png" },
    ],
    apple: [
      { url: "/miko-icon.png", type: "image/png" },
    ],
    shortcut: "/miko-icon.png",
  },
};
