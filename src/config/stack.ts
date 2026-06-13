export interface StackItem {
  name: string;
  level: number;
}

export interface StackBlock {
  id: string;
  title: string;
  subtitle: string;
  accent: "cyan" | "gold";
  items: StackItem[];
  highlights: string[];
}

export const stackBlocks: StackBlock[] = [
  {
    id: "frontend",
    title: "Frontend",
    subtitle: "Сайты, которые работают на клиента",
    accent: "cyan",
    highlights: [
      "Лендинги с формами заявки и записью",
      "Калькуляторы стоимости и конфигураторы",
      "Быстрая загрузка на мобильных",
    ],
    items: [
      { name: "Next.js / React", level: 90 },
      { name: "TypeScript", level: 88 },
      { name: "Tailwind CSS", level: 92 },
      { name: "GSAP / анимации", level: 85 },
      { name: "Адаптивная вёрстка", level: 95 },
    ],
  },
  {
    id: "backend",
    title: "Backend",
    subtitle: "Формы, заказы, интеграции",
    accent: "gold",
    highlights: [
      "Приём заявок и отправка в Telegram / email",
      "Корзина и оформление заказа без онлайн-оплаты",
      "Яндекс.Метрика и базовая SEO-разметка",
    ],
    items: [
      { name: "Next.js API Routes", level: 85 },
      { name: "Формы и валидация", level: 90 },
      { name: "Каталоги и фильтры", level: 88 },
      { name: "Telegram / WhatsApp", level: 82 },
      { name: "Деплой и поддержка", level: 80 },
    ],
  },
];
