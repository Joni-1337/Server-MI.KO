export interface CalculatorOption {
  id: string;
  label: string;
  price: number;
  weeks: number;
}

export const siteTypes: CalculatorOption[] = [
  { id: "landing", label: "Лендинг + форма", price: 30_000, weeks: 1 },
  { id: "landing-calc", label: "Лендинг + калькулятор", price: 55_000, weeks: 2 },
  { id: "catalog", label: "Каталог + корзина", price: 75_000, weeks: 3 },
  { id: "premium", label: "Премиальный медиа-сайт", price: 100_000, weeks: 4 },
];

export const designLevels: CalculatorOption[] = [
  { id: "template", label: "Базовый UI", price: 0, weeks: 0 },
  { id: "custom", label: "Кастомный дизайн", price: 10_000, weeks: 0.5 },
  { id: "branded", label: "Бренд + анимации", price: 20_000, weeks: 1 },
];

export const integrations: CalculatorOption[] = [
  { id: "booking", label: "Запись / заявки", price: 8_000, weeks: 0.25 },
  { id: "calculator", label: "Калькулятор цены", price: 12_000, weeks: 0.5 },
  { id: "catalog-extra", label: "Каталог товаров", price: 15_000, weeks: 0.5 },
  { id: "orders", label: "Приём заказов", price: 12_000, weeks: 0.5 },
  { id: "analytics", label: "Яндекс.Метрика", price: 5_000, weeks: 0.25 },
  { id: "messengers", label: "Telegram / WhatsApp", price: 5_000, weeks: 0.25 },
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
