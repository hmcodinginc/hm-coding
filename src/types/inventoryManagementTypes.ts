export type InventoryMetric = {
  label: string;
  value: string;
  delta: string;
  icon: string;
};

export type WarehouseZone = {
  id: string;
  name: string;
  location: string;
  skus: number;
  unitsOnHand: number;
  capacity: number;
  pickRate: string;
  status: "optimal" | "congested" | "receiving";
};

export type LowStockAlert = {
  id: string;
  sku: string;
  product: string;
  onHand: number;
  reorderPoint: number;
  vendor: string;
  severity: "critical" | "warning" | "watch";
};

export type InventoryVendor = {
  id: string;
  name: string;
  category: string;
  leadTime: string;
  openPOs: number;
  onTimeRate: string;
  status: "preferred" | "active" | "review";
};

export type InventoryShipment = {
  id: string;
  carrier: string;
  origin: string;
  destination: string;
  eta: string;
  units: number;
  status: "in-transit" | "customs" | "delivered" | "delayed";
};

export type SkuAnalytic = {
  sku: string;
  category: string;
  turnoverDays: number;
  fillRate: string;
  margin: string;
};

export type InventoryActivity = {
  id: string;
  actor: string;
  action: string;
  detail: string;
  time: string;
  kind: "receive" | "pick" | "adjust" | "alert" | "ship";
};
