import { useState } from "react";
import { createLead } from "../services/lead.service";
import toast from "react-hot-toast";

type Props = {
  onClose: () => void;
  onLeadCreated: () => void;
};

const inputClass = "w-full border border-gray-200 p-3 rounded-lg text-sm text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500 transition placeholder-gray-400";
const labelClass = "block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1.5";

const CreateLeadModal = ({ onClose, onLeadCreated }: Props) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [source, setSource] = useState("website");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      setLoading(true);
      setError("");
      await createLead({ name, email, source });
      toast.success("Lead created");
      onLeadCreated();
      onClose();
    } catch (err: any) {
      setError(err.response?.data?.message || "Failed to create lead");
      toast.error(
        err.response?.data?.message ||
        "Failed to create lead"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="fixed inset-0 bg-black/50 flex items-end sm:items-center justify-center z-50 p-0 sm:p-4"
      onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}
    >
      <div className="bg-white w-full sm:max-w-md sm:rounded-xl rounded-t-2xl shadow-xl overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between px-5 py-4 border-b border-gray-100">
          <h2 className="text-lg font-bold text-gray-900">Add Lead</h2>
          <button
            onClick={onClose}
            className="w-8 h-8 flex items-center justify-center rounded-lg text-gray-400 hover:bg-gray-100 hover:text-gray-600 transition-colors"
            aria-label="Close"
          >
            ✕
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="px-5 py-5 space-y-4">
          <div>
            <label className={labelClass}>Name</label>
            <input
              type="text"
              placeholder="Full name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className={inputClass}
              required
            />
          </div>

          <div>
            <label className={labelClass}>Email</label>
            <input
              type="email"
              placeholder="email@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className={inputClass}
              required
            />
          </div>

          <div>
            <label className={labelClass}>Source</label>
            <select
              value={source}
              onChange={(e) => setSource(e.target.value)}
              className={inputClass}
            >
              <option value="website">Website</option>
              <option value="instagram">Instagram</option>
              <option value="referral">Referral</option>
            </select>
          </div>

          {error && (
            <p className="text-red-500 text-sm bg-red-50 border border-red-100 rounded-lg px-3 py-2">
              {error}
            </p>
          )}

          <div className="flex gap-3 pt-1">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 py-3 text-sm font-medium text-gray-600 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading}
              className="flex-1 py-3 text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 disabled:opacity-60 rounded-lg transition-colors"
            >
              {loading ? "Creating…" : "Create Lead"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateLeadModal;