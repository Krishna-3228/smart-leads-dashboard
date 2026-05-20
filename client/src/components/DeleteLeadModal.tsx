import { useState } from "react";

import toast from "react-hot-toast";

import { deleteLead } from "../services/lead.service";

type Props = {
  leadId: string;

  onClose: () => void;

  onLeadDeleted: () => void;
};

const DeleteLeadModal = ({
  leadId,
  onClose,
  onLeadDeleted,
}: Props) => {
  const [loading, setLoading] =
    useState(false);

  const handleDelete =
    async () => {
      try {
        setLoading(true);

        await deleteLead(leadId);

        toast.success(
          "Lead deleted"
        );

        onLeadDeleted();

        onClose();
      } catch (error) {
        toast.error(
          "Failed to delete lead"
        );
      } finally {
        setLoading(false);
      }
    };

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
      <div className="bg-white w-full max-w-md p-6 rounded-xl shadow-lg">
        <h2 className="text-2xl font-bold mb-4">
          Delete Lead
        </h2>

        <p className="text-gray-600 mb-6">
          Are you sure you want to delete this lead?
        </p>

        <div className="flex justify-end gap-3">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-lg border"
          >
            Cancel
          </button>

          <button
            onClick={handleDelete}
            disabled={loading}
            className="bg-red-500 text-white px-4 py-2 rounded-lg"
          >
            {loading
              ? "Deleting..."
              : "Delete"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeleteLeadModal;