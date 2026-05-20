import {
  useEffect,
  useState,
} from "react";

import { getLeadById } from "../services/lead.service";

import type { Lead } from "../types/lead";

type Props = {
  leadId: string;

  onClose: () => void;
};

const ViewLeadModal = ({
  leadId,
  onClose,
}: Props) => {
  const [lead, setLead] =
    useState<Lead | null>(null);

  const [loading, setLoading] =
    useState(true);

  const [error, setError] =
    useState("");

  useEffect(() => {
    const fetchLead =
      async () => {
        try {
          setLoading(true);

          const data =
            await getLeadById(
              leadId
            );

          setLead(data.lead);
        } catch (error: any) {
          setError(
            error.response?.data
              ?.message ||
              "Failed to fetch lead"
          );
        } finally {
          setLoading(false);
        }
      };

    fetchLead();
  }, [leadId]);

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
      <div className="bg-white w-full max-w-md p-6 rounded-xl shadow-lg">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold">
            Lead Details
          </h2>

          <button
            onClick={onClose}
            className="text-gray-500"
          >
            ✕
          </button>
        </div>

        {loading ? (
          <p>Loading...</p>
        ) : error ? (
          <p className="text-red-500">
            {error}
          </p>
        ) : lead ? (
          <div className="space-y-4">
            <div>
              <p className="text-sm text-gray-500">
                Name
              </p>

              <p className="font-medium">
                {lead.name}
              </p>
            </div>

            <div>
              <p className="text-sm text-gray-500">
                Email
              </p>

              <p className="font-medium">
                {lead.email}
              </p>
            </div>

            <div>
              <p className="text-sm text-gray-500">
                Status
              </p>

              <p className="font-medium capitalize">
                {lead.status}
              </p>
            </div>

            <div>
              <p className="text-sm text-gray-500">
                Source
              </p>

              <p className="font-medium capitalize">
                {lead.source}
              </p>
            </div>

            <div>
              <p className="text-sm text-gray-500">
                Created By
              </p>

              <p className="font-medium">
                {
                  lead.createdBy
                    ?.name
                }
              </p>
            </div>

            <div>
              <p className="text-sm text-gray-500">
                Created At
              </p>

              <p className="font-medium">
                {new Date(
                  lead.createdAt
                ).toLocaleString()}
              </p>
            </div>
          </div>
        ) : null}
      </div>
    </div>
  );
};

export default ViewLeadModal;