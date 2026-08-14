import { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import type { ReactNode } from "react";
import { supabase } from "../../lib/supabase";
import { isCurrentUserAdmin } from "../../lib/auth";
import AccessDenied from "../pages/AccessDenied";

interface ProtectedRouteProps {
  children: ReactNode;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
  const [loading, setLoading] = useState(true);
  const [hasSession, setHasSession] = useState(false);
  const [authorized, setAuthorized] = useState(false);

  useEffect(() => {
    let active = true;

    const resolveAccess = async () => {
      try {
        const {
          data: { session },
        } = await supabase.auth.getSession();

        if (!session) {
          if (active) {
            setHasSession(false);
            setAuthorized(false);
          }
          return;
        }

        const admin = await isCurrentUserAdmin();
        if (active) {
          setHasSession(true);
          setAuthorized(admin);
        }
      } catch {
        if (active) {
          setHasSession(false);
          setAuthorized(false);
        }
      } finally {
        if (active) setLoading(false);
      }
    };

    void resolveAccess();

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange(() => {
      void resolveAccess();
    });

    return () => {
      active = false;
      subscription.unsubscribe();
    };
  }, []);

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-brand-surface">
        <p className="text-lg text-white">Checking authorization…</p>
      </div>
    );
  }

  if (!hasSession) {
    return <Navigate to="/hm-portal-admin-dashboard/login" replace />;
  }

  if (!authorized) {
    return <AccessDenied />;
  }

  return <>{children}</>;
};

export default ProtectedRoute;
