export type GymAnalyticsMetric = {
  label: string;
  value: string;
  delta: string;
  icon: string;
};

export type GymUpcomingClass = {
  id: string;
  name: string;
  trainer: string;
  room: string;
  time: string;
  enrolled: number;
  capacity: number;
  status: "open" | "waitlist" | "full";
};

export type GymTrainerBlock = {
  id: string;
  trainer: string;
  specialty: string;
  slots: string;
  clientsToday: number;
  nextSession: string;
};

export type GymMembershipTier = {
  tier: string;
  members: number;
  share: string;
  churnRisk: "low" | "medium" | "high";
  mrr: string;
};

export type GymAttendanceDay = {
  day: string;
  checkIns: number;
  peakHour: string;
  vsAvg: string;
};

export type GymRevenueSummary = {
  label: string;
  value: string;
  sub: string;
};

export type GymMemberActivity = {
  id: string;
  member: string;
  action: string;
  detail: string;
  time: string;
  kind: "check-in" | "booking" | "renewal" | "freeze" | "pt";
};
