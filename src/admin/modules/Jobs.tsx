import { useEffect, useState } from "react";
import DataTable from "../components/DataTable";
import { supabase } from "../../lib/supabase";
import { getUserErrorMessage } from "../../lib/errors";
import { isSafeHttpUrl } from "../../lib/validation";
import type { Job } from "../../types/admin";
import { AdminNotice } from "../components/AdminNotice";

const Jobs: React.FC = () => {
  const [jobs, setJobs] = useState<Job[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingJob, setEditingJob] = useState<Job | null>(null);
  const [actionError, setActionError] = useState<string | null>(null);
  const [saving, setSaving] = useState(false);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    location: "",
    job_type: "Remote",
    salary: "",
    time: "",
    apply_url: "https://hmcoding.com/",
    active: true,
  });

  useEffect(() => {
    fetchJobs();
  }, []);

  const fetchJobs = async () => {
    try {
      setLoading(true);
      setError(null);

      const { data, error } = await supabase
        .from("jobs")
        .select("*")
        .order("created_at", { ascending: false });

      if (error) throw error;
      setJobs(data || []);
    } catch (err) {
      setError(getUserErrorMessage(err, "Unable to load jobs."));
    } finally {
      setLoading(false);
    }
  };

  const openAddModal = () => {
    setEditingJob(null);
    setFormData({
      title: "",
      description: "",
      location: "",
      job_type: "Remote",
      salary: "",
      time: "",
      apply_url: "https://hmcoding.com/",
      active: true,
    });
    setIsModalOpen(true);
  };

  const openEditModal = (job: Job) => {
    setEditingJob(job);
    setFormData({
      title: job.title,
      description: job.description,
      location: job.location,
      job_type: job.job_type || "Remote",
      salary: job.salary || "",
      time: job.time || "",
      apply_url: job.apply_url || "https://hmcoding.com/",
      active: job.active,
    });
    setIsModalOpen(true);
    setActionError(null);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!isSafeHttpUrl(formData.apply_url)) {
      setActionError("Apply URL must be a valid http or https link.");
      return;
    }

    try {
      setSaving(true);
      setActionError(null);
      if (editingJob) {
        const { error } = await supabase
          .from("jobs")
          .update(formData)
          .eq("id", editingJob.id);

        if (error) throw error;
        setJobs(jobs.map((j) => (j.id === editingJob.id ? { ...j, ...formData } : j)));
      } else {
        const { data, error } = await supabase
          .from("jobs")
          .insert([formData])
          .select()
          .single();

        if (error) throw error;
        if (data) setJobs([data, ...jobs]);
      }

      setIsModalOpen(false);
    } catch (err) {
      setActionError(getUserErrorMessage(err, "Unable to save this job."));
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this job?")) return;

    try {
      const { error } = await supabase
        .from("jobs")
        .delete()
        .eq("id", id);

      if (error) throw error;
      setJobs(jobs.filter((j) => j.id !== id));
    } catch (err) {
      setActionError(getUserErrorMessage(err, "Unable to delete this job."));
    }
  };

  const handleToggleActive = async (job: Job) => {
    try {
      const { error } = await supabase
        .from("jobs")
        .update({ active: !job.active })
        .eq("id", job.id);

      if (error) throw error;
      setJobs(jobs.map((j) => (j.id === job.id ? { ...j, active: !job.active } : j)));
    } catch (err) {
      setActionError(getUserErrorMessage(err, "Unable to update job status."));
    }
  };

  const columns = [
    { header: "Title", accessor: "title" as const },
    { header: "Location", accessor: "location" as const },
    {
      header: "Status",
      accessor: (row: Job) =>
        row.active ? (
          <span className="inline-flex rounded-full bg-green-500/10 px-2 py-1 text-xs font-medium text-green-400">
            Active
          </span>
        ) : (
          <span className="inline-flex rounded-full bg-red-500/10 px-2 py-1 text-xs font-medium text-red-400">
            Inactive
          </span>
        ),
    },
    {
      header: "Actions",
      accessor: (row: Job) => (
        <div className="flex gap-2">
          <button
            onClick={() => openEditModal(row)}
            className="rounded-lg bg-brand-cyan/10 px-3 py-1 text-xs font-medium text-brand-cyan transition hover:bg-brand-cyan/20"
          >
            Edit
          </button>
          <button
            onClick={() => handleToggleActive(row)}
            className="rounded-lg bg-yellow-500/10 px-3 py-1 text-xs font-medium text-yellow-400 transition hover:bg-yellow-500/20"
          >
            {row.active ? "Disable" : "Enable"}
          </button>
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
    return <AdminNotice message={error} onRetry={() => void fetchJobs()} />;
  }

  return (
    <div>
      <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <h2 className="text-2xl font-bold text-white">Jobs</h2>
        <div className="flex gap-2">
          <button
            onClick={() => void fetchJobs()}
            className="rounded-lg border border-gray-700 bg-gray-800 px-4 py-2 text-sm text-gray-300 transition hover:border-brand-cyan hover:text-white"
          >
            Refresh
          </button>
          <button
            onClick={openAddModal}
            className="rounded-lg bg-brand-gradient px-4 py-2 text-sm font-semibold text-white transition hover:scale-105 hover:shadow-neon-cyan"
          >
            Add Job
          </button>
        </div>
      </div>

      {actionError && <div className="mb-4"><AdminNotice message={actionError} /></div>}

      <DataTable
        data={jobs}
        columns={columns}
        loading={loading}
        emptyMessage="No jobs posted yet"
        keyExtractor={(job) => job.id}
      />

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm" role="presentation" onClick={() => setIsModalOpen(false)}>
          <div
            className="w-full max-w-2xl max-h-[90vh] overflow-y-auto rounded-2xl border border-gray-800 bg-gray-900 p-8"
            role="dialog"
            aria-modal="true"
            aria-labelledby="job-modal-title"
            onClick={(event) => event.stopPropagation()}
          >
            <div className="mb-6 flex items-center justify-between">
              <h3 id="job-modal-title" className="text-2xl font-bold text-white">
                {editingJob ? "Edit Job" : "Add New Job"}
              </h3>
              <button
                onClick={() => setIsModalOpen(false)}
                className="text-gray-400 transition hover:text-white"
                aria-label="Close job form"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="mb-2 block text-sm font-medium text-gray-300">
                  Job Title *
                </label>
                <input
                  type="text"
                  required
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  className="w-full rounded-lg border border-gray-700 bg-gray-800 px-4 py-3 text-white outline-none transition focus:border-brand-cyan focus:ring-2 focus:ring-brand-cyan/50"
                />
              </div>

              <div>
                <label className="mb-2 block text-sm font-medium text-gray-300">
                  Description *
                </label>
                <textarea
                  required
                  rows={4}
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  className="w-full rounded-lg border border-gray-700 bg-gray-800 px-4 py-3 text-white outline-none transition focus:border-brand-cyan focus:ring-2 focus:ring-brand-cyan/50"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">

                <div>
                  <label className="mb-2 block text-sm font-medium text-gray-300">
                    Location *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.location}
                    onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                    className="w-full rounded-lg border border-gray-700 bg-gray-800 px-4 py-3 text-white outline-none transition focus:border-brand-cyan focus:ring-2 focus:ring-brand-cyan/50"
                  />
                </div>
                <div>
                  <label className="mb-2 block text-sm font-medium text-gray-300">
                    Work Type *
                  </label>
                  <select
                    required
                    value={formData.job_type}
                    onChange={(e) => setFormData({ ...formData, job_type: e.target.value })}
                    className="w-full rounded-lg border border-gray-700 bg-gray-800 px-4 py-3 text-white outline-none transition focus:border-brand-cyan focus:ring-2 focus:ring-brand-cyan/50"
                  >
                    <option value="Remote">Remote</option>
                    <option value="Work from Office">Work from Office</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">


                <div>
                  <label className="mb-2 block text-sm font-medium text-gray-300">
                    Apply URL *
                  </label>
                  <input
                    type="url"
                    required
                    value={formData.apply_url}
                    onChange={(e) => setFormData({ ...formData, apply_url: e.target.value })}
                    className="w-full rounded-lg border border-gray-700 bg-gray-800 px-4 py-3 text-white outline-none transition focus:border-brand-cyan focus:ring-2 focus:ring-brand-cyan/50"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="mb-2 block text-sm font-medium text-gray-300">
                    Salary (Optional)
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. ₹5,00,000 - ₹8,00,000"
                    value={formData.salary}
                    onChange={(e) => setFormData({ ...formData, salary: e.target.value })}
                    className="w-full rounded-lg border border-gray-700 bg-gray-800 px-4 py-3 text-white outline-none transition focus:border-brand-cyan focus:ring-2 focus:ring-brand-cyan/50"
                  />
                </div>
                <div>
                  <label className="mb-2 block text-sm font-medium text-gray-300">
                    Time/Shift (Optional)
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. Full-time, Part-time"
                    value={formData.time}
                    onChange={(e) => setFormData({ ...formData, time: e.target.value })}
                    className="w-full rounded-lg border border-gray-700 bg-gray-800 px-4 py-3 text-white outline-none transition focus:border-brand-cyan focus:ring-2 focus:ring-brand-cyan/50"
                  />
                </div>
              </div>

              <div className="flex items-center gap-2">
                <input
                  type="checkbox"
                  id="active"
                  checked={formData.active}
                  onChange={(e) => setFormData({ ...formData, active: e.target.checked })}
                  className="h-4 w-4 rounded border-gray-700 bg-gray-800 text-brand-cyan focus:ring-2 focus:ring-brand-cyan/50"
                />
                <label htmlFor="active" className="text-sm font-medium text-gray-300">
                  Active (visible to users)
                </label>
              </div>

              <div className="flex gap-3 pt-4">
                <button
                  type="submit"
                  disabled={saving}
                  className="flex-1 rounded-lg bg-brand-gradient px-6 py-3 font-semibold text-white transition hover:scale-[1.02] hover:shadow-neon-cyan disabled:opacity-60"
                >
                  {saving ? "Saving..." : editingJob ? "Update Job" : "Add Job"}
                </button>
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="rounded-lg border border-gray-700 bg-gray-800 px-6 py-3 font-semibold text-gray-300 transition hover:border-gray-600 hover:text-white"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Jobs;