export type UserRole = "admin" | "user";

export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[];

export interface Database {
  public: {
    Tables: {
      profiles: {
        Row: {
          id: string;
          role: UserRole;
          email: string | null;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id: string;
          role?: UserRole;
          email?: string | null;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          role?: UserRole;
          email?: string | null;
          created_at?: string;
          updated_at?: string;
        };
        Relationships: [];
      };
      jobs: {
        Row: {
          id: string;
          title: string;
          description: string;
          location: string;
          experience: string | null;
          job_type: string | null;
          salary: string | null;
          time: string | null;
          apply_url: string;
          active: boolean;
          created_at: string;
        };
        Insert: {
          id?: string;
          title: string;
          description?: string;
          location?: string;
          experience?: string | null;
          job_type?: string | null;
          salary?: string | null;
          time?: string | null;
          apply_url?: string;
          active?: boolean;
          created_at?: string;
        };
        Update: {
          id?: string;
          title?: string;
          description?: string;
          location?: string;
          experience?: string | null;
          job_type?: string | null;
          salary?: string | null;
          time?: string | null;
          apply_url?: string;
          active?: boolean;
          created_at?: string;
        };
        Relationships: [];
      };
      reviews: {
        Row: {
          id: string;
          name: string;
          email: string | null;
          rating: number;
          review_text: string;
          role: string | null;
          initials: string | null;
          approved: boolean;
          created_at: string;
        };
        Insert: {
          id?: string;
          name: string;
          email?: string | null;
          rating?: number;
          review_text: string;
          role?: string | null;
          initials?: string | null;
          approved?: boolean;
          created_at?: string;
        };
        Update: {
          id?: string;
          name?: string;
          email?: string | null;
          rating?: number;
          review_text?: string;
          role?: string | null;
          initials?: string | null;
          approved?: boolean;
          created_at?: string;
        };
        Relationships: [];
      };
      contact_messages: {
        Row: {
          id: string;
          name: string;
          email: string;
          message: string;
          subject: string | null;
          created_at: string;
        };
        Insert: {
          id?: string;
          name: string;
          email: string;
          message: string;
          subject?: string | null;
          created_at?: string;
        };
        Update: {
          id?: string;
          name?: string;
          email?: string;
          message?: string;
          subject?: string | null;
          created_at?: string;
        };
        Relationships: [];
      };
    };
    Views: Record<string, never>;
    Functions: Record<string, never>;
    Enums: Record<string, never>;
    CompositeTypes: Record<string, never>;
  };
}
