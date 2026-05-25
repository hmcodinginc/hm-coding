import type {
  InventoryActivity,
  InventoryMetric,
  InventoryShipment,
  InventoryVendor,
  LowStockAlert,
  SkuAnalytic,
  WarehouseZone,
} from "../types/inventoryManagementTypes";
import type { DemoHeroContent, DemoHeroInsight, DemoHeroWorkflowRow } from "../types/demoHeroTypes";

export const inventoryDemoHero: DemoHeroContent = {
  badgeLead: "Demo product",
  badgeTag: "Supply chain",
  title: "Northline Inventory OS",
  description:
    "Real-time stock, vendor POs, and shipment visibility across warehouses—without spreadsheet drift.",
  primaryCta: "Open control tower",
  secondaryCta: "Run cycle count",
};

export const inventoryHeroInsights: DemoHeroInsight[] = [
  { label: "Fill rate", value: "96.8%", detail: "7-day rolling · all DCs" },
  { label: "Inbound", value: "14", detail: "6 receiving · 8 in transit" },
];

export const inventoryHeroWorkflow: DemoHeroWorkflowRow[] = [
  { id: "SKU-8842", primary: "Nitrile gloves (L)", secondary: "42 on hand", meta: "SafeGuard Supply", status: "critical" },
  { id: "SKU-3310", primary: "Scanner cradle", secondary: "18 on hand", meta: "TechParts Global", status: "critical" },
  { id: "SKU-1094", primary: "Thermal labels 4×6", secondary: "96 on hand", meta: "LabelWorks", status: "warning" },
];

export const inventoryMetrics: InventoryMetric[] = [
  { label: "SKUs tracked", value: "4,218", delta: "+126 new this quarter", icon: "📦" },
  { label: "Fill rate (7d)", value: "96.8%", delta: "Backorders · 38 lines", icon: "📊" },
  { label: "Units on hand", value: "182k", delta: "Across 3 warehouses", icon: "🏭" },
  { label: "Inbound today", value: "14", delta: "6 receiving · 8 in transit", icon: "🚚" },
];

export const inventoryWarehouseZones: WarehouseZone[] = [
  {
    id: "WH-A1",
    name: "Zone A · Fast movers",
    location: "Dallas DC · Aisle 1–12",
    skus: 842,
    unitsOnHand: 62400,
    capacity: 72000,
    pickRate: "412 u/hr",
    status: "optimal",
  },
  {
    id: "WH-B2",
    name: "Zone B · Bulk storage",
    location: "Dallas DC · Racks 40–88",
    skus: 1204,
    unitsOnHand: 91800,
    capacity: 95000,
    pickRate: "186 u/hr",
    status: "congested",
  },
  {
    id: "WH-C3",
    name: "Zone C · Receiving dock",
    location: "Houston hub · Dock 3–5",
    skus: 318,
    unitsOnHand: 12400,
    capacity: 28000,
    pickRate: "Receiving",
    status: "receiving",
  },
];

export const inventoryLowStockAlerts: LowStockAlert[] = [
  {
    id: "AL-2201",
    sku: "SKU-8842",
    product: "Industrial nitrile gloves (L)",
    onHand: 42,
    reorderPoint: 200,
    vendor: "SafeGuard Supply Co.",
    severity: "critical",
  },
  {
    id: "AL-2202",
    sku: "SKU-3310",
    product: "Bluetooth scanner cradle",
    onHand: 18,
    reorderPoint: 60,
    vendor: "TechParts Global",
    severity: "critical",
  },
  {
    id: "AL-2203",
    sku: "SKU-1094",
    product: "Thermal label rolls 4×6",
    onHand: 96,
    reorderPoint: 150,
    vendor: "LabelWorks Inc.",
    severity: "warning",
  },
  {
    id: "AL-2204",
    sku: "SKU-5521",
    product: "Pallet wrap 18\" × 1500'",
    onHand: 210,
    reorderPoint: 240,
    vendor: "PackPro Distribution",
    severity: "watch",
  },
];

export const inventoryVendors: InventoryVendor[] = [
  {
    id: "V-104",
    name: "SafeGuard Supply Co.",
    category: "PPE & safety",
    leadTime: "5–7 days",
    openPOs: 3,
    onTimeRate: "98%",
    status: "preferred",
  },
  {
    id: "V-088",
    name: "TechParts Global",
    category: "Hardware & devices",
    leadTime: "12–14 days",
    openPOs: 2,
    onTimeRate: "91%",
    status: "active",
  },
  {
    id: "V-062",
    name: "LabelWorks Inc.",
    category: "Consumables",
    leadTime: "3–4 days",
    openPOs: 1,
    onTimeRate: "96%",
    status: "preferred",
  },
  {
    id: "V-041",
    name: "PackPro Distribution",
    category: "Packaging",
    leadTime: "7–10 days",
    openPOs: 4,
    onTimeRate: "87%",
    status: "review",
  },
];

export const inventoryShipments: InventoryShipment[] = [
  {
    id: "SHP-9021",
    carrier: "FedEx Freight",
    origin: "Columbus, OH",
    destination: "Dallas DC",
    eta: "May 26 · 2:00 PM",
    units: 4200,
    status: "in-transit",
  },
  {
    id: "SHP-9018",
    carrier: "Maersk Line",
    origin: "Rotterdam",
    destination: "Houston hub",
    eta: "May 28 · customs",
    units: 12800,
    status: "customs",
  },
  {
    id: "SHP-9015",
    carrier: "UPS Ground",
    origin: "Reno, NV",
    destination: "Dallas DC",
    eta: "Delivered · May 24",
    units: 860,
    status: "delivered",
  },
  {
    id: "SHP-9012",
    carrier: "XPO Logistics",
    origin: "Chicago, IL",
    destination: "Dallas DC",
    eta: "Delayed · May 27",
    units: 2100,
    status: "delayed",
  },
];

export const inventorySkuAnalytics: SkuAnalytic[] = [
  { sku: "SKU-8842", category: "PPE", turnoverDays: 12, fillRate: "78%", margin: "22%" },
  { sku: "SKU-2208", category: "Electronics", turnoverDays: 28, fillRate: "99%", margin: "31%" },
  { sku: "SKU-1094", category: "Consumables", turnoverDays: 9, fillRate: "94%", margin: "18%" },
  { sku: "SKU-7710", category: "Apparel", turnoverDays: 45, fillRate: "97%", margin: "26%" },
  { sku: "SKU-5521", category: "Packaging", turnoverDays: 18, fillRate: "91%", margin: "14%" },
];

export const inventoryActivityTimeline: InventoryActivity[] = [
  {
    id: "EV-441",
    actor: "Maria L.",
    action: "Received PO-8821",
    detail: "Dock 3 · 1,240 units · Zone C",
    time: "12m ago",
    kind: "receive",
  },
  {
    id: "EV-440",
    actor: "System",
    action: "Low stock alert fired",
    detail: "SKU-8842 below reorder point",
    time: "28m ago",
    kind: "alert",
  },
  {
    id: "EV-439",
    actor: "James K.",
    action: "Pick wave completed",
    detail: "Wave #118 · 86 lines · Zone A",
    time: "45m ago",
    kind: "pick",
  },
  {
    id: "EV-438",
    actor: "Ops API",
    action: "Shipment status updated",
    detail: "SHP-9012 marked delayed",
    time: "1h ago",
    kind: "ship",
  },
  {
    id: "EV-437",
    actor: "Priya S.",
    action: "Cycle count adjustment",
    detail: "SKU-3310 · +4 units reconciled",
    time: "2h ago",
    kind: "adjust",
  },
];

export const inventoryCtaContent = {
  eyebrow: "Supply chain control",
  title: "Keep stock, vendors, and shipments visible.",
  description:
    "Northline Inventory OS gives warehouse teams accurate SKU levels, alerts, and inbound visibility without spreadsheet drift.",
  primaryCta: "Request demo access",
  secondaryCta: "View product details",
};

export const inventoryProductDetails = {
  title: "Northline Inventory OS",
  intro:
    "An inventory control platform for operators managing multi-warehouse stock, vendors, and inbound logistics.",
  whatItDoes:
    "Monitors SKU levels, warehouse zones, vendor POs, low-stock exceptions, shipments, and operational activity across distribution centers.",
  workflowBenefits: [
    "Zone-level utilization and pick-rate visibility for capacity planning",
    "Low-stock alerts with severity and vendor context for faster replenishment",
    "Shipment tracking from in-transit through customs and delivery exceptions",
  ],
  businessAdvantages: [
    "Higher fill rates and fewer emergency transfers between warehouses",
    "Procurement sees vendor on-time performance and open PO load at a glance",
    "Finance and ops align on inbound timing without manual status emails",
  ],
  targetUsage:
    "Wholesale distributors, e-commerce fulfillment teams, and multi-DC operators with complex SKU catalogs.",
  implementationNote:
    "HM Coding can integrate ERP/WMS data, automate alerts, and build custom control-tower views for your network.",
} as const;
