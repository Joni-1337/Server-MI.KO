import { faqItems } from "@/config/faq";
import { SITE_AUTHOR, SITE_NAME, SITE_URL } from "@/lib/site";

export function JsonLd() {
  const personSchema = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: SITE_AUTHOR.name,
    alternateName: SITE_NAME,
    url: SITE_URL,
    jobTitle: "Веб-разработчик",
    knowsAbout: [
      "Веб-разработка",
      "Frontend",
      "Next.js",
      "Иммерсивный дизайн",
      "Верстка сайтов",
    ],
  };

  const serviceSchema = {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    name: `${SITE_NAME} — разработка сайтов под ключ`,
    url: SITE_URL,
    description:
      "Создание иммерсивных сайтов, лендингов, каталогов и веб-приложений для малого бизнеса.",
    areaServed: "RU",
    founder: {
      "@type": "Person",
      name: SITE_AUTHOR.name,
    },
  };

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqItems.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.answer,
      },
    })),
  };

  const websiteSchema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: SITE_NAME,
    url: SITE_URL,
    inLanguage: "ru-RU",
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(personSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }}
      />
    </>
  );
}
