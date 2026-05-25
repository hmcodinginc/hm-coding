export type PosAnalyticsMetric = {
  label: string;
  value: string;
  delta: string;
  icon: string;
};

export type PosOrderLine = {
  id: string;
  table: string;
  items: string;
  total: string;
  status: "open" | "fired" | "ready";
};

export type KitchenTicket = {
  id: string;
  course: string;
  items: string;
  time: string;
  station: "grill" | "fry" | "cold" | "dessert";
};

export type PosTransaction = {
  id: string;
  method: string;
  amount: string;
  time: string;
};

export type PosRevenueSummary = {
  label: string;
  value: string;
  sub: string;
};
