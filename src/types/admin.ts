export interface ContactMessage {
  id: string;
  name: string;
  email: string;
  message: string;
  subject: string | null;
  created_at: string;
}

export interface Review {
  id: string;
  name: string;
  email: string | null;
  rating: number;
  review_text: string;
  role: string | null;
  initials: string | null;
  approved: boolean;
  created_at: string;
}

export interface Job {
  id: string;
  title: string;
  description: string;
  location: string;
  experience: string | null;
  apply_url: string;
  job_type: string | null;
  salary: string | null;
  time: string | null;
  active: boolean;
  created_at: string;
}

export interface InternshipInquiry {
  id: string;
  name: string;
  email: string;
  message: string;
  subject: string;
  created_at: string;
}

export interface DashboardStats {
  totalJobs: number;
  totalReviews: number;
  totalMessages: number;
  totalApplications: number;
}
