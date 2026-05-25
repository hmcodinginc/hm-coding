export type ReminderStatus = "Pending" | "Confirmed" | "Overdue";

export type ClientReminderStat = {
  label: string;
  value: string;
  detail: string;
  icon: string;
};

export type CustomerReminder = {
  name: string;
  company: string;
  reminder: string;
  due: string;
  status: ReminderStatus;
};

export type PaymentReminder = {
  client: string;
  amount: string;
  due: string;
  type: string;
};

export type NotificationPreview = {
  title: string;
  description: string;
  time: string;
};

export type LiveActivityStat = {
  value: string;
  label: string;
};
