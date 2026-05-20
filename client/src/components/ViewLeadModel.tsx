import { useEffect, useState } from "react";
import { getLeadById } from "../services/lead.service";
import type { Lead } from "../types/lead";

type Props = {
  leadId: string;
  onClose: () => void;
};

const statusColors: Record<string, string> = {
  new: "bg-blue-100 text-blue-700",
  contacted: "bg-yellow-100 text-yellow-700",
  qualified: "bg-green-100 text-green-700",
  lost: "bg-red-100 text-red-700",
};

const Field = ({ label, value }: { label: string; value: React.ReactNode }) => (
  <div className="py-3 border-b border-gray-100 dark:border-gray-700 last:border-0">
    <p className="text-xs font-semibold text-gray-400 dark:text-gray-500 uppercase tracking-wider mb-1">{label}</p>
    <p className="text-sm font-medium text-gray-800 dark:text-gray-100">{value || "—"}</p>
  </div>
);

const ViewLeadModal = ({ leadId, onClose }: Props) => {
  const [lead, setLead] = useState<Lead | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchLead = async () => {
      try {
        setLoading(true);
        const data = await getLeadById(leadId);
        setLead(data.lead);
      } catch (error: any) {
        setError(error.response?.data?.message || "Failed to fetch lead");
      } finally {
        setLoading(false);
      }
    };
    fetchLead();
  }, [leadId]);

  return (
    <div
      className="fixed inset-0 bg-black/50 flex items-end sm:items-center justify-center z-50 p-0 sm:p-4"
      onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}
    >
      <div className="bg-white dark:bg-gray-800 w-full sm:max-w-md sm:rounded-xl rounded-t-2xl shadow-xl overflow-hidden max-h-[90vh] flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between px-5 py-4 border-b border-gray-100 dark:border-gray-700 flex-shrink-0">
          <h2 className="text-lg font-bold text-gray-900 dark:text-gray-100">Lead Details</h2>
          <button
            onClick={onClose}
            className="w-8 h-8 flex items-center justify-center rounded-lg text-gray-400 dark:text-gray-500 hover:bg-gray-100 dark:hover:bg-gray-700 hover:text-gray-600 dark:hover:text-gray-300 transition-colors"
            aria-label="Close"
          >
            ✕
          </button>
        </div>

        {/* Body */}
        <div className="px-5 py-4 overflow-y-auto flex-1">
          {loading ? (
            <div className="space-y-4">
              {[...Array(5)].map((_, i) => (
                <div key={i} className="py-3 border-b border-gray-100 dark:border-gray-700">
                  <div className="h-3 w-16 bg-gray-200 dark:bg-gray-700 rounded animate-pulse mb-2"></div>
                  <div className="h-4 w-40 bg-gray-200 dark:bg-gray-700 rounded animate-pulse"></div>
                </div>
              ))}
            </div>
          ) : error ? (
            <div className="py-8 text-center">
              <p className="text-sm text-red-500 dark:text-red-400">{error}</p>
            </div>
          ) : lead ? (
            <div>
              <Field label="Name" value={lead.name} />
              <Field label="Email" value={lead.email} />
              <Field
                label="Status"
                value={
                  <span className={`inline-block px-2.5 py-0.5 rounded-full text-xs font-medium capitalize ${statusColors[lead.status] ?? "bg-gray-100 text-gray-600"}`}>
                    {lead.status}
                  </span>
                }
              />
              <Field label="Source" value={<span className="capitalize">{lead.source}</span>} />
              <Field label="Created By" value={lead.createdBy?.name} />
              <Field label="Created At" value={new Date(lead.createdAt).toLocaleString()} />
            </div>
          ) : null}
        </div>

        {/* Footer */}
        <div className="px-5 py-4 border-t border-gray-100 dark:border-gray-700 flex-shrink-0">
          <button
            onClick={onClose}
            className="w-full py-2.5 text-sm font-medium text-gray-600 dark:text-gray-300 bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 rounded-lg transition-colors"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default ViewLeadModal;