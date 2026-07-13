import type { TextPart } from "@/components/ui/HighlightedText";

export type { TextPart };

export interface TimelineEntry {
  year: string;
  title: string;
  description: TextPart[];
  tag: string;
}

export const timeline: TimelineEntry[] = [
  {
    year: "2023",
    title: "Первые коммерческие сайты",
    description: [
      "Начал делать лендинги для локального бизнеса: формы заявок, прайсы, контакты. Понял, что владельцам нужен не «",
      { text: "красивый сайт", accent: "gold" },
      "», а ",
      { text: "поток клиентов", accent: "cyan" },
      ".",
    ],
    tag: "старт",
  },
  {
    year: "2024",
    title: "Калькуляторы и каталоги",
    description: [
      "Добавил ",
      { text: "интерактив", accent: "gold" },
      ": ",
      { text: "расчёт", accent: "cyan" },
      " стоимости услуг, конфигураторы товаров, ",
      { text: "корзины", accent: "cyan" },
      ". Клиенты стали получать заявки с уже заполненными параметрами.",
    ],
    tag: "рост",
  },
  {
    year: "2025",
    title: "Портфолио для малого бизнеса",
    description: [
      "Запустил проекты для кондитерской, клининг-сервиса, мастера маникюра и видеопродакшна. Каждый — под ",
      { text: "конкретную задачу", accent: "gold" },
      ", ",
      { text: "без лишнего", accent: "cyan" },
      ".",
    ],
    tag: "кейсы",
  },
  {
    year: "2026",
    title: "SaaS и личные кабинеты",
    description: [
      "Запустил ",
      { text: "СФЕРА", accent: "cyan" },
      " — платформу для подготовки к ЕГЭ с ",
      { text: "кабинетами", accent: "gold" },
      " преподавателя и ученика, аналитикой и ",
      { text: "подпиской", accent: "cyan" },
      ". Параллельно делаю лендинги и каталоги для малого бизнеса.",
    ],
    tag: "сейчас",
  },
];
