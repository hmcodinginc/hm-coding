import { useEffect, useState } from "react";
import DataTable from "../components/DataTable";
import { supabase } from "../../lib/supabase";
import { getUserErrorMessage } from "../../lib/errors";
import type { ContactMessage } from "../../types/admin";
import { AdminNotice } from "../components/AdminNotice";

const ContactMessages: React.FC = () => {
  const [messages, setMessages] = useState<ContactMessage[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [actionError, setActionError] = useState<string | null>(null);

  useEffect(() => {
    fetchMessages();
  }, []);

  const fetchMessages = async () => {
    try {
      setLoading(true);
      setError(null);

      const { data, error } = await supabase
        .from("contact_messages")
        .select("*")
        .order("created_at", { ascending: false });

      if (error) throw error;
      setMessages(data || []);
    } catch (err) {
      setError(getUserErrorMessage(err, "Unable to load messages."));
    } finally {
      setLoading(false);
    }
  };

  const handleEmail = (email: string) => {
    window.location.href = `mailto:${email}`;
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this message?")) return;

    try {
      const { error } = await supabase
        .from("contact_messages")
        .delete()
        .eq("id", id);

      if (error) throw error;
      setMessages(messages.filter((msg) => msg.id !== id));
    } catch (err) {
      setActionError(getUserErrorMessage(err, "Unable to delete this message."));
    }
  };

  const columns = [
    { header: "Name", accessor: "name" as const },
    { header: "Email", accessor: "email" as const },
    {
      header: "Subject",
      accessor: (row: ContactMessage) => row.subject || "General Inquiry",
    },
    {
      header: "Message",
      accessor: (row: ContactMessage) => (
        <span className="max-w-xs truncate block text-gray-300">
          {row.message || "N/A"}
        </span>
      ),
    },
    {
      header: "Date",
      accessor: (row: ContactMessage) =>
        new Date(row.created_at).toLocaleDateString(),
    },
    {
      header: "Actions",
      accessor: (row: ContactMessage) => (
        <div className="flex gap-2">
          <button
            onClick={() => handleEmail(row.email)}
            className="rounded-lg bg-brand-cyan/10 px-3 py-1 text-xs font-medium text-brand-cyan transition hover:bg-brand-cyan/20"
          >
            Email
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
    return <AdminNotice message={error} onRetry={() => void fetchMessages()} />;
  }

  return (
    <div>
      <div className="mb-6 flex items-center justify-between">
        <h2 className="text-2xl font-bold text-white">Contact Messages</h2>
        <button
          onClick={fetchMessages}
          className="rounded-lg border border-gray-700 bg-gray-800 px-4 py-2 text-sm text-gray-300 transition hover:border-brand-cyan hover:text-white"
        >
          Refresh
        </button>
      </div>

      {actionError && <div className="mb-4"><AdminNotice message={actionError} /></div>}

      <DataTable
        data={messages}
        columns={columns}
        loading={loading}
        emptyMessage="No contact messages yet"
        keyExtractor={(msg) => msg.id}
        expandableRow={(row) => (
          <div className="bg-gray-900/50 p-6 rounded-lg border border-gray-700/50 space-y-6">
            <div className="flex flex-wrap items-start justify-between gap-4 border-b border-gray-800 pb-4">
              <div>
                <h4 className="text-lg font-semibold text-brand-cyan">{row.name}</h4>
                <p className="text-sm text-gray-400">{row.email}</p>
                {row.subject && <p className="mt-1 text-xs text-brand-cyan">{row.subject}</p>}
              </div>
              <div className="text-right">
                <p className="text-xs text-gray-500 uppercase tracking-wider mb-1">Received On</p>
                <span className="text-sm font-medium text-gray-300">
                  {new Date(row.created_at).toLocaleString()}
                </span>
              </div>
            </div>

            <div className="rounded-lg bg-gray-800/30 p-5 border border-gray-700/50 overflow-hidden w-full">
              <p className="text-xs text-brand-cyan mb-3 uppercase tracking-wider font-semibold">Message Content</p>
              <p className="text-gray-200 whitespace-normal break-words break-all sm:break-words leading-relaxed">
                {row.message || "N/A"}
              </p>
            </div>
            
            <div className="flex justify-end gap-3 pt-2">
              <button
                onClick={() => handleEmail(row.email)}
                className="rounded-lg bg-brand-cyan px-4 py-2 text-sm font-medium text-black transition hover:opacity-90 shadow-neon-cyan"
              >
                Reply via Email
              </button>
            </div>
          </div>
        )}
      />
    </div>
  );
};

export default ContactMessages;