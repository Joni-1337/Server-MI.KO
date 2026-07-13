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
      "Лендинги, SaaS-интерфейсы и личные кабинеты",
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
      "Личные кабинеты: роли, сессии, доступ по ключам",
      "Подписки и онлайн-оплата с пробным периодом",
      "Приём заявок, заказы, Telegram / email",
    ],
    items: [
      { name: "Next.js API Routes", level: 88 },
      { name: "Авторизация и роли", level: 85 },
      { name: "Оплата и подписки", level: 82 },
      { name: "Каталоги и фильтры", level: 88 },
      { name: "Деплой и поддержка", level: 82 },
    ],
  },
];
