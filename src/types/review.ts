// src/types/review.ts
export interface Review {
  id: string; // UUID
  name: string;
  email: string;
  role: string;
  initials: string;
  rating: number;
  text: string;
  timestamp: string; // ISO string
}
