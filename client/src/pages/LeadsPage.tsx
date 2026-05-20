import { useEffect, useState } from "react";

import { getLeads } from "../services/lead.service";

type Lead = {
  _id: string;

  name: string;
  email: string;
  status: string;
  source: string;

  createdAt: string;
};

const LeadsPage = () => {
  const [leads, setLeads] = useState<Lead[]>([]);

  const [loading, setLoading] = useState(true);

  const [error, setError] = useState("");

  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("");
  const [source, setSource] = useState("");
  const [sort, setSort] = useState("latest");

  const [debouncedSearch, setDebouncedSearch] = useState("");

  const [page, setPage] = useState(1);

  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearch(search);
    }, 500);

    return () => clearTimeout(timer);
  }, [search]);

  useEffect(() => {
    const fetchLeads = async () => {
      try {
        setLoading(true);

        const data = await getLeads({
          search: debouncedSearch,
          status,
          source,
          sort,
          page,
        });

        setLeads(data.leads);
        setTotalPages(data.totalPages);
      } catch (error: any) {
        setError(
          error.response?.data?.message ||
          "Failed to fetch leads"
        );
      } finally {
        setLoading(false);
      }
    };

    fetchLeads();
  }, [debouncedSearch, status, source, sort, page]);

  useEffect(() => {
    setPage(1);
  }, [
    debouncedSearch,
    status,
    source,
    sort,
  ]);




  return (
    <div className="bg-white p-6 rounded-lg shadow">
      <h1 className="text-2xl font-bold mb-6">
        Leads
      </h1>

      <div className="flex flex-wrap gap-4 mb-6">
        <input
          type="text"
          placeholder="Search by name or email"
          value={search}
          onChange={(e) =>
            setSearch(e.target.value)
          }
          className="border p-2 rounded-lg"
        />

        <select
          value={status}
          onChange={(e) =>
            setStatus(e.target.value)
          }
          className="border p-2 rounded-lg"
        >
          <option value=""> All Status </option>
          <option value="new"> New </option>
          <option value="contacted"> Contacted </option>
          <option value="qualified"> Qualified </option>
          <option value="lost"> Lost </option>
        </select>

        <select
          value={source}
          onChange={(e) =>
            setSource(e.target.value)
          }
          className="border p-2 rounded-lg"
        >
          <option value=""> All Sources </option>
          <option value="website"> Website </option>
          <option value="instagram"> Instagram </option>
          <option value="referral"> Referral </option>
        </select>

        <select
          value={sort}
          onChange={(e) =>
            setSort(e.target.value)
          }
          className="border p-2 rounded-lg"
        >
          <option value="latest"> Latest </option>
          <option value="oldest"> Oldest </option>
        </select>
      </div>


      <table className="w-full border-collapse">
        <thead>
          <tr className="border-b">
            <th className="text-left p-3"> Name </th>
            <th className="text-left p-3">
              Email
            </th>

            <th className="text-left p-3">
              Status
            </th>

            <th className="text-left p-3">
              Source
            </th>

            <th className="text-left p-3">
              Created At
            </th>
          </tr>
        </thead>
        {loading ? (
          <tbody>
            <tr>
              <td
                colSpan={5}
                className="text-center py-8 text-gray-500"
              >
                Loading leads...
              </td>
            </tr>
          </tbody>
        ) : error ? (
          <tbody>
            <tr>
              <td
                colSpan={5}
                className="text-center py-8 text-red-500"
              >
                {error}
              </td>
            </tr>
          </tbody>
        ) : leads.length === 0 ? (
          <tbody>
            <tr>
              <td
                colSpan={5}
                className="text-center py-8 text-gray-500"
              >
                No leads found.
              </td>
            </tr>
          </tbody>
        ) : (
          <tbody>
            {leads.map((lead) => (
              <tr
                key={lead._id}
                className="border-b"
              >
                <td className="p-3">
                  {lead.name}
                </td>

                <td className="p-3">
                  {lead.email}
                </td>

                <td className="p-3 capitalize">
                  {lead.status}
                </td>

                <td className="p-3 capitalize">
                  {lead.source}
                </td>

                <td className="p-3">
                  {new Date(
                    lead.createdAt
                  ).toLocaleDateString()}
                </td>
              </tr>
            ))}
          </tbody>
        )}
      </table>
      <div className="flex justify-between items-center mt-6">
        <button
          onClick={() =>
            setPage((prev) =>
              Math.max(prev - 1, 1)
            )
          }
          disabled={page === 1}
          className="px-4 py-2 bg-gray-200 rounded-lg disabled:opacity-50"
        >
          Previous
        </button>

        <p className="text-sm text-gray-600">
          Page {page} of {totalPages}
        </p>

        <button
          onClick={() =>
            setPage((prev) =>
              Math.min(
                prev + 1,
                totalPages
              )
            )
          }
          disabled={page === totalPages}
          className="px-4 py-2 bg-gray-200 rounded-lg disabled:opacity-50"
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default LeadsPage;