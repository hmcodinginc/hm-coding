import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import StatCard from "../components/StatCard";
import { supabase } from "../../lib/supabase";
import { getUserErrorMessage } from "../../lib/errors";
import type { DashboardStats } from "../../types/admin";
import { AdminNotice } from "../components/AdminNotice";

const DashboardHome: React.FC = () => {
  const navigate = useNavigate();
  const [stats, setStats] = useState<DashboardStats>({
    totalJobs: 0,
    totalReviews: 0,
    totalMessages: 0,
    totalApplications: 0,
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchStats();
  }, []);

  const fetchStats = async () => {
    try {
      setLoading(true);
      setError(null);

      const [jobsResult, reviewsResult, messagesResult] = await Promise.all([
        supabase.from("jobs").select("*", { count: "exact", head: true }),
        supabase.from("reviews").select("*", { count: "exact", head: true }),
        supabase.from("contact_messages").select("id, subject"),
      ]);

      if (jobsResult.error) throw jobsResult.error;
      if (reviewsResult.error) throw reviewsResult.error;
      if (messagesResult.error) throw messagesResult.error;

      const inquiryCount = (messagesResult.data || []).filter((row) => {
        const subject = (row.subject || "").toLowerCase();
        return subject.includes("internship") || subject.includes("startup");
      }).length;

      setStats({
        totalJobs: jobsResult.count || 0,
        totalReviews: reviewsResult.count || 0,
        totalMessages: messagesResult.data?.length || 0,
        totalApplications: inquiryCount,
      });
    } catch (err) {
      setError(getUserErrorMessage(err, "Unable to load dashboard statistics."));
    } finally {
      setLoading(false);
    }
  };

  if (error) {
    return <AdminNotice message={error} onRetry={() => void fetchStats()} />;
  }

  return (
    <div>
      <h2 className="mb-6 text-2xl font-bold text-white">Dashboard Overview</h2>

      <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
        <StatCard
          title="Total Jobs"
          value={stats.totalJobs}
          loading={loading}
          icon={<span className="text-2xl">💼</span>}
          onClick={() => navigate("/hm-portal-admin-dashboard/jobs")}
        />
        <StatCard
          title="Total Reviews"
          value={stats.totalReviews}
          loading={loading}
          icon={<span className="text-2xl">⭐</span>}
          onClick={() => navigate("/hm-portal-admin-dashboard/reviews")}
        />
        <StatCard
          title="Contact Messages"
          value={stats.totalMessages}
          loading={loading}
          icon={<span className="text-2xl">💬</span>}
          onClick={() => navigate("/hm-portal-admin-dashboard/contact-messages")}
        />
        <StatCard
          title="Internship inquiries"
          value={stats.totalApplications}
          loading={loading}
          icon={<span className="text-2xl">📝</span>}
          onClick={() => navigate("/hm-portal-admin-dashboard/applications")}
        />
      </div>
    </div>
  );
};

export default DashboardHome;