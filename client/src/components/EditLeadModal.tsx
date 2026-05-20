import { useState } from "react";

import { updateLead } from "../services/lead.service";

type Lead = {
  _id: string;

  name: string;

  email: string;

  status: string;

  source: string;
};

type Props = {
  lead: Lead;

  onClose: () => void;

  onLeadUpdated: () => void;
};

const EditLeadModal = ({
  lead,
  onClose,
  onLeadUpdated,
}: Props) => {
  const [name, setName] =
    useState(lead.name);

  const [email, setEmail] =
    useState(lead.email);

  const [status, setStatus] =
    useState(lead.status);

  const [source, setSource] =
    useState(lead.source);

  const [loading, setLoading] =
    useState(false);

  const [error, setError] =
    useState("");

  const handleSubmit = async (
    e: React.FormEvent
  ) => {
    e.preventDefault();

    try {
      setLoading(true);

      setError("");

      await updateLead(lead._id, {
        name,
        email,
        status,
        source,
      });

      onLeadUpdated();

      onClose();
    } catch (error: any) {
      setError(
        error.response?.data?.message ||
          "Failed to update lead"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
      <div className="bg-white w-full max-w-md p-6 rounded-xl shadow-lg">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold">
            Edit Lead
          </h2>

          <button
            onClick={onClose}
            className="text-gray-500"
          >
            ✕
          </button>
        </div>

        <form
          onSubmit={handleSubmit}
          className="space-y-4"
        >
          <input
            type="text"
            value={name}
            onChange={(e) =>
              setName(
                e.target.value
              )
            }
            className="w-full border p-3 rounded-lg"
          />

          <input
            type="email"
            value={email}
            onChange={(e) =>
              setEmail(
                e.target.value
              )
            }
            className="w-full border p-3 rounded-lg"
          />

          <select
            value={status}
            onChange={(e) =>
              setStatus(
                e.target.value
              )
            }
            className="w-full border p-3 rounded-lg"
          >
            <option value="new">
              New
            </option>

            <option value="contacted">
              Contacted
            </option>

            <option value="qualified">
              Qualified
            </option>

            <option value="lost">
              Lost
            </option>
          </select>

          <select
            value={source}
            onChange={(e) =>
              setSource(
                e.target.value
              )
            }
            className="w-full border p-3 rounded-lg"
          >
            <option value="website">
              Website
            </option>

            <option value="instagram">
              Instagram
            </option>

            <option value="referral">
              Referral
            </option>
          </select>

          {error && (
            <p className="text-red-500 text-sm">
              {error}
            </p>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-yellow-500 text-white p-3 rounded-lg"
          >
            {loading
              ? "Updating..."
              : "Update Lead"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default EditLeadModal;