export interface CalculatorOption {
  id: string;
  label: string;
  description: string;
  price: number;
  weeks: number;
}

export const siteTypes: CalculatorOption[] = [
  {
    id: "landing",
    label: "Лендинг + форма",
    description:
      "Одностраничный сайт с формой заявки. Быстрый запуск для услуг, мастеров и малого бизнеса.",
    price: 30_000,
    weeks: 1,
  },
  {
    id: "landing-calc",
    label: "Лендинг + калькулятор",
    description:
      "Лендинг с интерактивным расчётом цены — клиент сам выбирает опции и оставляет заявку.",
    price: 55_000,
    weeks: 2,
  },
  {
    id: "catalog",
    label: "Каталог + корзина",
    description:
      "Каталог товаров с корзиной и оформлением заказа. Для продаж через сайт без лишней сложности.",
    price: 75_000,
    weeks: 3,
  },
  {
    id: "premium",
    label: "Премиальный медиа-сайт",
    description:
      "Иммерсивный сайт с анимациями, сложной вёрсткой и уникальным визуалом под сильный бренд.",
    price: 100_000,
    weeks: 4,
  },
  {
    id: "saas",
    label: "SaaS + личные кабинеты",
    description:
      "Веб-платформа с регистрацией, ролями пользователей, дашбордом и подпиской. Для сервисов и EdTech.",
    price: 150_000,
    weeks: 6,
  },
];

export const designLevels: CalculatorOption[] = [
  {
    id: "template",
    label: "Базовый UI",
    description:
      "Чистая структура и аккуратный интерфейс без кастомного дизайна — быстрее и экономичнее.",
    price: 0,
    weeks: 0,
  },
  {
    id: "custom",
    label: "Кастомный дизайн",
    description:
      "Уникальный макет под ваш бренд: типографика, цвета и сетка без шаблонного вида.",
    price: 10_000,
    weeks: 0.5,
  },
  {
    id: "branded",
    label: "Бренд + анимации",
    description:
      "Фирменный стиль плюс плавные анимации и микровзаимодействия для премиального ощущения.",
    price: 20_000,
    weeks: 1,
  },
];

export const integrations: CalculatorOption[] = [
  {
    id: "booking",
    label: "Запись / заявки",
    description: "Форма записи или заявки с уведомлениями на почту или в Telegram.",
    price: 8_000,
    weeks: 0.25,
  },
  {
    id: "calculator",
    label: "Калькулятор цены",
    description: "Встроенный калькулятор на сайте — клиент видит стоимость до отправки заявки.",
    price: 12_000,
    weeks: 0.5,
  },
  {
    id: "catalog-extra",
    label: "Каталог товаров",
    description: "Расширенный каталог с фильтрами, карточками товаров и удобным поиском.",
    price: 15_000,
    weeks: 0.5,
  },
  {
    id: "orders",
    label: "Приём заказов",
    description: "Корзина, оформление заказа и уведомления о новых покупках.",
    price: 12_000,
    weeks: 0.5,
  },
  {
    id: "analytics",
    label: "Яндекс.Метрика",
    description: "Подключение Метрики: цели, воронки и понимание, откуда приходят клиенты.",
    price: 5_000,
    weeks: 0.25,
  },
  {
    id: "messengers",
    label: "Telegram / WhatsApp",
    description: "Кнопки и виджеты для быстрой связи в мессенджерах прямо с сайта.",
    price: 5_000,
    weeks: 0.25,
  },
  {
    id: "auth",
    label: "Личный кабинет",
    description: "Регистрация, вход, профиль и разграничение доступа по ролям.",
    price: 25_000,
    weeks: 1,
  },
  {
    id: "payments",
    label: "Онлайн-оплата",
    description: "Подключение платёжного шлюза: разовые платежи или подписка с пробным периодом.",
    price: 20_000,
    weeks: 1,
  },
];

export interface CalculatorState {
  siteType: string;
  designLevel: string;
  selectedIntegrations: string[];
}

export interface CalculatorResult {
  totalPrice: number;
  totalWeeks: number;
  breakdown: { label: string; price: number }[];
}

export function calculateQuote(state: CalculatorState): CalculatorResult {
  const site = siteTypes.find((s) => s.id === state.siteType) ?? siteTypes[0];
  const design = designLevels.find((d) => d.id === state.designLevel) ?? designLevels[0];

  const integrationItems = integrations.filter((i) =>
    state.selectedIntegrations.includes(i.id),
  );

  const breakdown = [
    { label: site.label, price: site.price },
    ...(design.price > 0 ? [{ label: design.label, price: design.price }] : []),
    ...integrationItems.map((i) => ({ label: i.label, price: i.price })),
  ];

  const totalPrice = breakdown.reduce((sum, item) => sum + item.price, 0);
  const totalWeeks =
    site.weeks +
    design.weeks +
    integrationItems.reduce((sum, i) => sum + i.weeks, 0);

  return { totalPrice, totalWeeks: Math.ceil(totalWeeks), breakdown };
}

export function formatPrice(value: number): string {
  return new Intl.NumberFormat("ru-RU", {
    style: "currency",
    currency: "RUB",
    maximumFractionDigits: 0,
  }).format(value);
}

export function formatPriceFrom(value: number): string {
  return `от ${formatPrice(value)}`;
}
