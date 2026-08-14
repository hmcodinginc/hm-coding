import { supabase } from "./supabase";
import type { UserRole } from "../types/database";

export async function getCurrentUserRole(): Promise<UserRole | null> {
  const {
    data: { session },
  } = await supabase.auth.getSession();

  if (!session?.user) return null;

  const { data, error } = await supabase
    .from("profiles")
    .select("role")
    .eq("id", session.user.id)
    .maybeSingle();

  if (error || !data) return null;
  return data.role;
}

export async function isCurrentUserAdmin(): Promise<boolean> {
  const role = await getCurrentUserRole();
  return role === "admin";
}
