export interface ContactMessage {
  id: string;
  name: string;
  email: string;
  message: string;
  created_at: string;
}

export interface Review {
  id: string;
  name: string;
  email?: string;
  rating: number;
  review_text: string;
  role?: string;
  initials?: string;
  approved: boolean;
  created_at: string;
}

export interface Job {
  id: string;
  title: string;
  description: string;
  location: string;
  apply_url: string;
  job_type?: string;
  salary?: string;
  time?: string;
  active: boolean;
  created_at: string;
}

export interface Application {
  id: string;
  name: string;
  email: string;
  phone?: string;
  job_id?: string;
  resume_url?: string;
  cover_letter?: string;
  status: string;
  created_at: string;
}

export interface DashboardStats {
  totalJobs: number;
  totalReviews: number;
  totalMessages: number;
  totalApplications: number;
}