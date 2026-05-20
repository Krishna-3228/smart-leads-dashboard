import { useEffect, useState } from "react";
import { CSVLink } from "react-csv";

import CreateLeadModal from "../components/CreateLeadModal";
import EditLeadModal from "../components/EditLeadModal";
import ViewLeadModal from "../components/ViewLeadModel";
import DeleteLeadModal from "../components/DeleteLeadModal";

import { getLeads } from "../services/lead.service";
import { useAuth } from "../context/AuthContext";
import type { Lead } from "../types/lead";

const statusColors: Record<string, string> = {
  new: "bg-blue-100 text-blue-700",
  contacted: "bg-yellow-100 text-yellow-700",
  qualified: "bg-green-100 text-green-700",
  lost: "bg-red-100 text-red-700",
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
  const [showModal, setShowModal] = useState(false);
  const [deleteLeadId, setDeleteLeadId] = useState<string | null>(null);
  const [selectedLead, setSelectedLead] = useState<Lead | null>(null);
  const [viewLeadId, setViewLeadId] = useState<string | null>(null);

  const { user } = useAuth();

  // Debounce search
  useEffect(() => {
    const timer = setTimeout(() => setDebouncedSearch(search), 500);
    return () => clearTimeout(timer);
  }, [search]);

  // Reset page on filter change
  useEffect(() => { setPage(1); }, [debouncedSearch, status, source, sort]);

  const fetchLeads = async () => {
    try {
      setLoading(true);
      const data = await getLeads({ search: debouncedSearch, status, source, sort, page });
      setLeads(data.leads);
      setTotalPages(data.totalPages);
    } catch (err: any) {
      setError(err.response?.data?.message || "Failed to fetch leads");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchLeads(); }, [debouncedSearch, status, source, sort, page]);

  const selectClass = "w-full sm:w-auto border border-gray-200 bg-white p-2.5 rounded-lg text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 transition";

  const csvData = leads.map((lead) => ({
    Name: lead.name,
    Email: lead.email,
    Status: lead.status,
    Source: lead.source,
    CreatedAt: new Date(lead.createdAt).toLocaleString(),
  }));

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100">

      {/* ── Page header ── */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 p-4 sm:p-6 border-b border-gray-100">
        <h1 className="text-xl sm:text-2xl font-bold text-gray-900">Leads</h1>
        <div className="flex items-center gap-2 flex-wrap">
          <CSVLink
            data={csvData}
            filename="leads.csv"
            className="inline-flex items-center gap-2 bg-emerald-600 hover:bg-emerald-700 active:bg-emerald-800 text-white px-4 py-2.5 rounded-lg text-sm font-medium transition-colors duration-150 shadow-sm"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
            </svg>
            Export CSV
          </CSVLink>
          <button
            onClick={() => setShowModal(true)}
            className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 active:bg-blue-800 text-white px-4 py-2.5 rounded-lg text-sm font-medium transition-colors duration-150 shadow-sm"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
            </svg>
            Add Lead
          </button>
        </div>
      </div>

      {/* ── Filters ── */}
      <div className="p-4 sm:p-6 border-b border-gray-100">
        <div className="flex flex-col sm:flex-row flex-wrap gap-3">
          {/* Search – full width on mobile */}
          <div className="relative flex-1 min-w-0 sm:min-w-[200px] sm:max-w-xs">
            <svg className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-4.35-4.35M17 11A6 6 0 1 1 5 11a6 6 0 0 1 12 0z" />
            </svg>
            <input
              type="text"
              placeholder="Search name or email…"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full border border-gray-200 bg-white pl-9 pr-3 py-2.5 rounded-lg text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
            />
          </div>

          <select value={status} onChange={(e) => setStatus(e.target.value)} className={selectClass}>
            <option value="">All Status</option>
            <option value="new">New</option>
            <option value="contacted">Contacted</option>
            <option value="qualified">Qualified</option>
            <option value="lost">Lost</option>
          </select>

          <select value={source} onChange={(e) => setSource(e.target.value)} className={selectClass}>
            <option value="">All Sources</option>
            <option value="website">Website</option>
            <option value="instagram">Instagram</option>
            <option value="referral">Referral</option>
          </select>

          <select value={sort} onChange={(e) => setSort(e.target.value)} className={selectClass}>
            <option value="latest">Latest</option>
            <option value="oldest">Oldest</option>
          </select>
        </div>
      </div>

      {/* ── Table with horizontal scroll on mobile ── */}
      <div className="overflow-x-auto">
        <table className="w-full min-w-[640px] border-collapse text-sm">
          <thead>
            <tr className="bg-gray-50 border-b border-gray-100">
              <th className="text-left px-4 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">Name</th>
              <th className="text-left px-4 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">Email</th>
              <th className="text-left px-4 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">Status</th>
              <th className="text-left px-4 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">Source</th>
              <th className="text-left px-4 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">Created</th>
              <th className="text-left px-4 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">Actions</th>
            </tr>
          </thead>

          {loading ? (
            <tbody>
              {[...Array(5)].map((_, i) => (
                <tr key={i} className="border-b border-gray-100">
                  {[...Array(6)].map((_, j) => (
                    <td key={j} className="px-4 py-3">
                      <div className="h-4 bg-gray-200 rounded animate-pulse"></div>
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          ) : error ? (
            <tbody>
              <tr>
                <td colSpan={6} className="text-center py-12 text-red-500 text-sm">{error}</td>
              </tr>
            </tbody>
          ) : leads.length === 0 ? (
            <tbody>
              <tr>
                <td colSpan={6} className="text-center py-12">
                  <div className="flex flex-col items-center gap-2">
                    <svg className="w-10 h-10 text-gray-300" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                    <p className="text-base font-medium text-gray-600">No leads found</p>
                    <p className="text-sm text-gray-400">Try changing filters or create a new lead.</p>
                  </div>
                </td>
              </tr>
            </tbody>
          ) : (
            <tbody>
              {leads.map((lead) => (
                <tr key={lead._id} className="border-b border-gray-100 hover:bg-gray-50 transition-colors duration-100">
                  <td className="px-4 py-3 font-medium text-gray-800 whitespace-nowrap">{lead.name}</td>
                  <td className="px-4 py-3 text-gray-600 whitespace-nowrap">{lead.email}</td>
                  <td className="px-4 py-3">
                    <span className={`inline-block px-2.5 py-0.5 rounded-full text-xs font-medium capitalize ${statusColors[lead.status] ?? "bg-gray-100 text-gray-600"}`}>
                      {lead.status}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-gray-600 capitalize whitespace-nowrap">{lead.source}</td>
                  <td className="px-4 py-3 text-gray-500 whitespace-nowrap">
                    {new Date(lead.createdAt).toLocaleDateString()}
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => setViewLeadId(lead._id)}
                        className="px-3 py-1.5 bg-blue-50 hover:bg-blue-100 text-blue-700 border border-blue-200 rounded-lg text-xs font-medium transition-colors duration-150"
                      >
                        View
                      </button>
                      <button
                        onClick={() => setSelectedLead(lead)}
                        className="px-3 py-1.5 bg-amber-50 hover:bg-amber-100 text-amber-700 border border-amber-200 rounded-lg text-xs font-medium transition-colors duration-150"
                      >
                        Edit
                      </button>
                      {user?.role === "admin" && (
                        <button
                          onClick={() => setDeleteLeadId(lead._id)}
                          className="px-3 py-1.5 bg-red-50 hover:bg-red-100 text-red-600 border border-red-200 rounded-lg text-xs font-medium transition-colors duration-150"
                        >
                          Delete
                        </button>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          )}
        </table>
      </div>

      {/* ── Pagination ── */}
      <div className="flex items-center justify-between px-4 sm:px-6 py-4 border-t border-gray-100">
        <button
          onClick={() => setPage((p) => Math.max(p - 1, 1))}
          disabled={page === 1}
          className="px-4 py-2 text-sm bg-gray-100 hover:bg-gray-200 rounded-lg disabled:opacity-40 disabled:cursor-not-allowed transition-colors font-medium"
        >
          ← Previous
        </button>

        <span className="text-sm text-gray-500">
          Page <span className="font-semibold text-gray-700">{page}</span> of <span className="font-semibold text-gray-700">{totalPages}</span>
        </span>

        <button
          onClick={() => setPage((p) => Math.min(p + 1, totalPages))}
          disabled={page === totalPages}
          className="px-4 py-2 text-sm bg-gray-100 hover:bg-gray-200 rounded-lg disabled:opacity-40 disabled:cursor-not-allowed transition-colors font-medium"
        >
          Next →
        </button>
      </div>

      {/* ── Modals ── */}
      {showModal && (
        <CreateLeadModal onClose={() => setShowModal(false)} onLeadCreated={fetchLeads} />
      )}
      {selectedLead && (
        <EditLeadModal lead={selectedLead} onClose={() => setSelectedLead(null)} onLeadUpdated={fetchLeads} />
      )}
      {viewLeadId && (
        <ViewLeadModal
          leadId={viewLeadId}
          onClose={() => setViewLeadId(null)}
        />
      )}
      {deleteLeadId && (
        <DeleteLeadModal
          leadId={deleteLeadId}
          onClose={() => setDeleteLeadId(null)}
          onLeadDeleted={fetchLeads}
        />
      )}
    </div>
  );
};

export default LeadsPage;