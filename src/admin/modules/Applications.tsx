import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import DataTable from "../components/DataTable";
import { AdminNotice } from "../components/AdminNotice";
import { supabase } from "../../lib/supabase";
import { getUserErrorMessage } from "../../lib/errors";
import { isSafeHttpUrl } from "../../lib/validation";
import type { InternshipInquiry, Job } from "../../types/admin";

const Applications: React.FC = () => {
  const [jobs, setJobs] = useState<Job[]>([]);
  const [inquiries, setInquiries] = useState<InternshipInquiry[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [query, setQuery] = useState("");

  const fetchData = async () => {
    try {
      setLoading(true);
      setError(null);

      const [jobsResult, messagesResult] = await Promise.all([
        supabase.from("jobs").select("*").order("created_at", { ascending: false }),
        supabase.from("contact_messages").select("*").order("created_at", { ascending: false }),
      ]);

      if (jobsResult.error) throw jobsResult.error;
      if (messagesResult.error) throw messagesResult.error;

      setJobs(jobsResult.data || []);
      const internshipMessages = (messagesResult.data || [])
        .filter((row) => {
          const subject = (row.subject || "").toLowerCase();
          return subject.includes("internship") || subject.includes("startup");
        })
        .map((row) => ({
          id: row.id,
          name: row.name,
          email: row.email,
          message: row.message,
          subject: row.subject || "Inquiry",
          created_at: row.created_at,
        }));
      setInquiries(internshipMessages);
    } catch (err) {
      setError(getUserErrorMessage(err, "Unable to load applications overview."));
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    void fetchData();
  }, []);

  const filteredJobs = useMemo(() => {
    const value = query.trim().toLowerCase();
    if (!value) return jobs;
    return jobs.filter(
      (job) =>
        job.title.toLowerCase().includes(value) ||
        job.location.toLowerCase().includes(value) ||
        (job.apply_url || "").toLowerCase().includes(value),
    );
  }, [jobs, query]);

  const columns = [
    { header: "Role", accessor: "title" as const },
    { header: "Location", accessor: "location" as const },
    {
      header: "Status",
      accessor: (row: Job) => (row.active ? "Active" : "Hidden"),
    },
    {
      header: "Apply destination",
      accessor: (row: Job) =>
        isSafeHttpUrl(row.apply_url) ? (
          <a
            href={row.apply_url}
            target="_blank"
            rel="noopener noreferrer"
            className="text-brand-cyan underline-offset-2 hover:underline"
            onClick={(event) => event.stopPropagation()}
          >
            External link
          </a>
        ) : (
          <span className="text-yellow-400">Missing or invalid URL</span>
        ),
    },
  ];

  if (error) {
    return <AdminNotice message={error} onRetry={() => void fetchData()} />;
  }

  return (
    <div className="space-y-10">
      <div>
        <h2 className="text-2xl font-bold text-white">Applications</h2>
        <p className="mt-2 max-w-3xl text-sm text-gray-400">
          Job applications are collected through each listing&apos;s external apply URL. Internship and
          startup inquiries submitted on this website appear below from contact messages.
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        <div className="rounded-xl border border-gray-800 bg-gray-900 p-5">
          <p className="text-xs uppercase tracking-wider text-gray-500">Job listings</p>
          <p className="mt-2 text-2xl font-bold text-white">{jobs.length}</p>
        </div>
        <div className="rounded-xl border border-gray-800 bg-gray-900 p-5">
          <p className="text-xs uppercase tracking-wider text-gray-500">Active listings</p>
          <p className="mt-2 text-2xl font-bold text-white">{jobs.filter((job) => job.active).length}</p>
        </div>
        <div className="rounded-xl border border-gray-800 bg-gray-900 p-5">
          <p className="text-xs uppercase tracking-wider text-gray-500">Internship / startup inquiries</p>
          <p className="mt-2 text-2xl font-bold text-white">{inquiries.length}</p>
        </div>
      </div>

      <section>
        <div className="mb-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <h3 className="text-lg font-semibold text-white">External job apply links</h3>
          <input
            type="search"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Search roles"
            className="w-full rounded-lg border border-gray-700 bg-gray-800 px-3 py-2 text-sm text-white sm:max-w-xs"
            aria-label="Search job listings"
          />
        </div>
        <DataTable
          data={filteredJobs}
          columns={columns}
          loading={loading}
          emptyMessage="No job listings yet. Add roles in Jobs."
          keyExtractor={(job) => job.id}
        />
        <p className="mt-3 text-xs text-gray-500">
          Manage listings in <Link to="/hm-portal-admin-dashboard/jobs" className="text-brand-cyan">Jobs</Link>.
        </p>
      </section>

      <section>
        <h3 className="mb-4 text-lg font-semibold text-white">Internship and startup inquiries</h3>
        {inquiries.length === 0 && !loading ? (
          <div className="rounded-xl border border-gray-800 bg-gray-900 p-8 text-center text-gray-400">
            No internship or startup inquiries yet.
          </div>
        ) : (
          <ul className="space-y-3">
            {inquiries.map((item) => (
              <li key={item.id} className="rounded-xl border border-gray-800 bg-gray-900 p-5">
                <div className="flex flex-wrap items-start justify-between gap-3">
                  <div>
                    <p className="font-semibold text-white">{item.name}</p>
                    <p className="text-sm text-gray-400">{item.email}</p>
                  </div>
                  <span className="rounded-full bg-brand-cyan/10 px-3 py-1 text-xs text-brand-cyan">
                    {item.subject}
                  </span>
                </div>
                <p className="mt-3 whitespace-pre-wrap text-sm text-gray-300">{item.message}</p>
                <p className="mt-3 text-xs text-gray-500">{new Date(item.created_at).toLocaleString()}</p>
              </li>
            ))}
          </ul>
        )}
      </section>
    </div>
  );
};

export default Applications;
