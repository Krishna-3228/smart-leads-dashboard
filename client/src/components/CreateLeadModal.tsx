import { useState } from "react";

import { createLead } from "../services/lead.service";

type Props = {
  onClose: () => void;

  onLeadCreated: () => void;
};

const CreateLeadModal = ({
  onClose,
  onLeadCreated,
}: Props) => {
  const [name, setName] = useState("");

  const [email, setEmail] = useState("");

  const [source, setSource] = useState("website");

  const [loading, setLoading] = useState(false);

  const [error, setError] = useState("");

  const handleSubmit = async (
    e: React.FormEvent
  ) => {
    e.preventDefault();

    try {
      setLoading(true);

      setError("");

      await createLead({
        name,
        email,
        source,
      });

      onLeadCreated();

      onClose();
    } catch (error: any) {
      setError(
        error.response?.data?.message ||
          "Failed to create lead"
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
            Add Lead
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
            placeholder="Name"
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
            placeholder="Email"
            value={email}
            onChange={(e) =>
              setEmail(
                e.target.value
              )
            }
            className="w-full border p-3 rounded-lg"
          />

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
            className="w-full bg-blue-600 text-white p-3 rounded-lg"
          >
            {loading
              ? "Creating..."
              : "Create Lead"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default CreateLeadModal;