import { useEffect, useState } from "react";
import DataTable from "../components/DataTable";
import { supabase } from "../../lib/supabase";
import { getUserErrorMessage } from "../../lib/errors";
import type { Review } from "../../types/admin";
import { AdminNotice } from "../components/AdminNotice";

const Reviews: React.FC = () => {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [actionError, setActionError] = useState<string | null>(null);

  useEffect(() => {
    fetchReviews();
  }, []);

  const fetchReviews = async () => {
    try {
      setLoading(true);
      setError(null);

      const { data, error } = await supabase
        .from("reviews")
        .select("*")
        .order("created_at", { ascending: false });

      if (error) throw error;
      setReviews(data || []);
    } catch (err) {
      setError(getUserErrorMessage(err, "Unable to load reviews."));
    } finally {
      setLoading(false);
    }
  };

  const handleApprove = async (id: string) => {
    try {
      const { error } = await supabase
        .from("reviews")
        .update({ approved: true })
        .eq("id", id);

      if (error) throw error;
      setReviews(reviews.map((r) => (r.id === id ? { ...r, approved: true } : r)));
    } catch (err) {
      setActionError(getUserErrorMessage(err, "Unable to approve this review."));
    }
  };

  const handleReject = async (id: string) => {
    try {
      const { error } = await supabase
        .from("reviews")
        .update({ approved: false })
        .eq("id", id);

      if (error) throw error;
      setReviews(reviews.map((r) => (r.id === id ? { ...r, approved: false } : r)));
    } catch (err) {
      setActionError(getUserErrorMessage(err, "Unable to reject this review."));
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this review?")) return;

    try {
      const { error } = await supabase
        .from("reviews")
        .delete()
        .eq("id", id);

      if (error) throw error;
      setReviews(reviews.filter((r) => r.id !== id));
    } catch (err) {
      setActionError(getUserErrorMessage(err, "Unable to delete this review."));
    }
  };

  const renderStars = (rating: number) => {
    return (
      <div className="flex items-center gap-1">
        {[1, 2, 3, 4, 5].map((star) => (
          <span
            key={star}
            className={star <= rating ? "text-yellow-400" : "text-gray-600"}
          >
            ★
          </span>
        ))}
      </div>
    );
  };

  const columns = [
    { header: "Name", accessor: "name" as const },
    { header: "Email", accessor: (row: Review) => row.email || "N/A" },
    {
      header: "Rating",
      accessor: (row: Review) => renderStars(row.rating),
    },
    {
      header: "Review",
      accessor: (row: Review) => (
        <span className="max-w-xs truncate block text-gray-300">
          {row.review_text || "N/A"}
        </span>
      ),
    },
    {
      header: "Role",
      accessor: (row: Review) => row.role || "N/A",
    },
    {
      header: "Initials",
      accessor: (row: Review) => row.initials || "N/A",
    },
    {
      header: "Date",
      accessor: (row: Review) =>
        new Date(row.created_at).toLocaleDateString(),
    },
    {
      header: "Status",
      accessor: (row: Review) =>
        row.approved ? (
          <span className="inline-flex rounded-full bg-green-500/10 px-2 py-1 text-xs font-medium text-green-400">
            Approved
          </span>
        ) : (
          <span className="inline-flex rounded-full bg-yellow-500/10 px-2 py-1 text-xs font-medium text-yellow-400">
            Pending
          </span>
        ),
    },
    {
      header: "Actions",
      accessor: (row: Review) => (
        <div className="flex gap-2">
          {!row.approved && (
            <button
              onClick={() => handleApprove(row.id)}
              className="rounded-lg bg-green-500/10 px-3 py-1 text-xs font-medium text-green-400 transition hover:bg-green-500/20"
            >
              Approve
            </button>
          )}
          {row.approved && (
            <button
              onClick={() => handleReject(row.id)}
              className="rounded-lg bg-yellow-500/10 px-3 py-1 text-xs font-medium text-yellow-400 transition hover:bg-yellow-500/20"
            >
              Reject
            </button>
          )}
          <button
            onClick={() => handleDelete(row.id)}
            className="rounded-lg bg-red-500/10 px-3 py-1 text-xs font-medium text-red-400 transition hover:bg-red-500/20"
          >
            Delete
          </button>
        </div>
      ),
    },
  ];

  if (error) {
    return <AdminNotice message={error} onRetry={() => void fetchReviews()} />;
  }

  return (
    <div>
      <div className="mb-6 flex items-center justify-between">
        <h2 className="text-2xl font-bold text-white">Reviews</h2>
        <button
          onClick={fetchReviews}
          className="rounded-lg border border-gray-700 bg-gray-800 px-4 py-2 text-sm text-gray-300 transition hover:border-brand-cyan hover:text-white"
        >
          Refresh
        </button>
      </div>

      {actionError && <div className="mb-4"><AdminNotice message={actionError} /></div>}

      <DataTable
        data={reviews}
        columns={columns}
        loading={loading}
        emptyMessage="No reviews yet"
        keyExtractor={(review) => review.id}
        expandableRow={(row) => (
          <div className="bg-gray-900/50 p-6 rounded-lg border border-gray-700/50 space-y-4">
            <div className="flex flex-wrap items-start justify-between gap-4">
              <div>
                <h4 className="text-lg font-semibold text-brand-cyan">{row.name}</h4>
                <p className="text-sm text-gray-400">{row.email || "No email provided"}</p>
              </div>
              <div className="text-right">
                <div className="mb-1">{renderStars(row.rating)}</div>
                <span className="text-xs font-medium text-gray-500">
                  {new Date(row.created_at).toLocaleString()}
                </span>
              </div>
            </div>

            <div className="rounded-lg bg-gray-800/50 p-4 border border-gray-700/50 overflow-hidden w-full">
              <p className="text-sm text-gray-400 mb-2">Message</p>
              <p className="text-gray-200 whitespace-normal break-words break-all sm:break-words">{row.review_text || "N/A"}</p>
            </div>

            <div className="grid grid-cols-2 gap-4 md:grid-cols-4 rounded-lg bg-gray-800/30 p-4 border border-gray-800">
              <div>
                <p className="text-xs text-gray-500 mb-1 uppercase tracking-wider">Role</p>
                <p className="text-sm font-medium text-gray-300">{row.role || "N/A"}</p>
              </div>
              <div>
                <p className="text-xs text-gray-500 mb-1 uppercase tracking-wider">Initials</p>
                <p className="text-sm font-medium text-gray-300">{row.initials || "N/A"}</p>
              </div>
              <div>
                <p className="text-xs text-gray-500 mb-1 uppercase tracking-wider">Status</p>
                <p className="text-sm font-medium text-gray-300">
                  {row.approved ? (
                    <span className="text-green-400">Approved</span>
                  ) : (
                    <span className="text-yellow-400">Pending</span>
                  )}
                </p>
              </div>
              <div>
                <p className="text-xs text-gray-500 mb-1 uppercase tracking-wider">Rating Count</p>
                <p className="text-sm font-medium text-gray-300">{row.rating} / 5</p>
              </div>
            </div>
          </div>
        )}
      />
    </div>
  );
};

export default Reviews;