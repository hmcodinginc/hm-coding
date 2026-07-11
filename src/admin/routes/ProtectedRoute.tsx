// src/admin/routes/ProtectedRoute.tsx

import { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import type { ReactNode } from "react";
import { supabase } from "../../lib/supabase";

interface ProtectedRouteProps {
  children: ReactNode;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
  const [loading, setLoading] = useState(true);
  const [authorized, setAuthorized] = useState(false);

  useEffect(() => {
    const checkAccess = async () => {
      try {
        // Check current session
        const {
          data: { session },
        } = await supabase.auth.getSession();

        if (!session) {
          setAuthorized(false);
          return;
        }

        // Allow all authenticated users since profiles table does not exist
        setAuthorized(true);
      } catch (err) {
        console.error(err);
        setAuthorized(false);
      } finally {
        setLoading(false);
      }
    };

    checkAccess();
  }, []);

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-brand-surface">
        <p className="text-white text-lg">
          Checking authorization...
        </p>
      </div>
    );
  }

  if (!authorized) {
    return <Navigate to="/hm-portal-admin-dashboard/login" replace />;
  }

  return <>{children}</>;
};

export default ProtectedRoute;