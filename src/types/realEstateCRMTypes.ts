export type EstateAnalyticsMetric = {
  label: string;
  value: string;
  delta: string;
  icon: string;
};

export type EstateListing = {
  id: string;
  address: string;
  agent: string;
  price: string;
  stage: "lead" | "showing" | "offer" | "closed";
  daysOnMarket: number;
};

export type EstateShowing = {
  id: string;
  property: string;
  client: string;
  time: string;
  agent: string;
};

export type EstatePipelineStage = {
  label: string;
  count: number;
  value: string;
};
