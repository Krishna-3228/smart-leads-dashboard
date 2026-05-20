import { useEffect, useState } from "react";
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
} from "recharts";
import { getDashboardStats } from "../services/dashboard.service";

type Lead = {
  status: string;
  source: string;
};

// ── Colour tokens ──────────────────────────────────────────────
const STATUS_COLORS: Record<string, string> = {
  new: "#6366f1",       // indigo
  contacted: "#f59e0b", // amber
  qualified: "#10b981", // emerald
  lost: "#ef4444",      // red
};

const SOURCE_COLORS: Record<string, string> = {
  website: "#3b82f6",   // blue
  instagram: "#a855f7", // purple
  referral: "#14b8a6",  // teal
};

const PIE_FALLBACK  = "#94a3b8"; // slate-400
const BAR_FALLBACK  = "#94a3b8";

// ── Custom tooltip ─────────────────────────────────────────────
const CustomTooltip = ({
  active,
  payload,
}: {
  active?: boolean;
  payload?: any[];
}) => {
  if (!active || !payload?.length) return null;
  const { name, value } = payload[0];
  return (
    <div className="bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700 shadow-lg rounded-lg px-3 py-2 text-sm">
      <span className="font-semibold capitalize text-gray-800 dark:text-gray-100">{name}</span>
      <span className="ml-2 text-gray-500 dark:text-gray-400">{value} leads</span>
    </div>
  );
};

// ── Custom pie label ───────────────────────────────────────────
const renderPieLabel = ({
  cx,
  cy,
  midAngle,
  innerRadius,
  outerRadius,
  percent,
}: any) => {
  if (percent < 0.05) return null;
  const RADIAN = Math.PI / 180;
  const r = innerRadius + (outerRadius - innerRadius) * 0.55;
  const x = cx + r * Math.cos(-midAngle * RADIAN);
  const y = cy + r * Math.sin(-midAngle * RADIAN);
  return (
    <text
      x={x}
      y={y}
      fill="#fff"
      textAnchor="middle"
      dominantBaseline="central"
      className="text-xs font-bold"
      style={{ fontSize: 12, fontWeight: 700 }}
    >
      {`${(percent * 100).toFixed(0)}%`}
    </text>
  );
};

// ── Main component ─────────────────────────────────────────────
const DashboardPage = () => {
  const [stats, setStats] = useState({
    total: 0,
    new: 0,
    contacted: 0,
    qualified: 0,
    lost: 0,
  });

  const [pieData, setPieData]   = useState<{ name: string; value: number }[]>([]);
  const [barData, setBarData]   = useState<{ name: string; value: number }[]>([]);
  const [loading, setLoading]   = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        setLoading(true);
        const data  = await getDashboardStats();
        const leads: Lead[] = data.leads;

        // ── stat cards ──
        setStats({
          total:     leads.length,
          new:       leads.filter((l) => l.status === "new").length,
          contacted: leads.filter((l) => l.status === "contacted").length,
          qualified: leads.filter((l) => l.status === "qualified").length,
          lost:      leads.filter((l) => l.status === "lost").length,
        });

        // ── pie: status distribution ──
        const statusCount: Record<string, number> = {};
        leads.forEach((l) => {
          statusCount[l.status] = (statusCount[l.status] ?? 0) + 1;
        });
        setPieData(
          Object.entries(statusCount).map(([name, value]) => ({ name, value }))
        );

        // ── bar: source distribution ──
        const sourceCount: Record<string, number> = {};
        leads.forEach((l) => {
          if (l.source) {
            sourceCount[l.source] = (sourceCount[l.source] ?? 0) + 1;
          }
        });
        setBarData(
          Object.entries(sourceCount).map(([name, value]) => ({ name, value }))
        );
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, []);

  const cards = [
    {
      title: "Total Leads",
      value: stats.total,
      accent: "border-l-blue-500",
      valueColor: "text-blue-600",
      icon: (
        <svg className="w-5 h-5 text-blue-400" fill="none" stroke="currentColor" strokeWidth={1.8} viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z" />
        </svg>
      ),
    },
    {
      title: "New",
      value: stats.new,
      accent: "border-l-indigo-500",
      valueColor: "text-indigo-600",
      icon: (
        <svg className="w-5 h-5 text-indigo-400" fill="none" stroke="currentColor" strokeWidth={1.8} viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
        </svg>
      ),
    },
    {
      title: "Contacted",
      value: stats.contacted,
      accent: "border-l-amber-500",
      valueColor: "text-amber-600",
      icon: (
        <svg className="w-5 h-5 text-amber-400" fill="none" stroke="currentColor" strokeWidth={1.8} viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
        </svg>
      ),
    },
    {
      title: "Qualified",
      value: stats.qualified,
      accent: "border-l-emerald-500",
      valueColor: "text-emerald-600",
      icon: (
        <svg className="w-5 h-5 text-emerald-400" fill="none" stroke="currentColor" strokeWidth={1.8} viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      ),
    },
    {
      title: "Lost",
      value: stats.lost,
      accent: "border-l-red-500",
      valueColor: "text-red-600",
      icon: (
        <svg className="w-5 h-5 text-red-400" fill="none" stroke="currentColor" strokeWidth={1.8} viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      ),
    },
  ];

  // ── Chart skeleton ──────────────────────────────────────────
  const ChartSkeleton = () => (
    <div className="flex items-center justify-center h-56">
      <div className="w-40 h-40 rounded-full bg-gray-100 dark:bg-gray-700 animate-pulse" />
    </div>
  );

  return (
    <div className="space-y-8">
      {/* ── Header ── */}
      <div>
        <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-gray-100">Dashboard</h1>
        <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">Overview of your lead pipeline</p>
      </div>

      {/* ── Stat cards ── */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
        {loading
          ? [...Array(5)].map((_, i) => (
              <div
                key={i}
                className="bg-white dark:bg-gray-800 p-5 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700 border-l-4 border-l-gray-200 dark:border-l-gray-600"
              >
                <div className="h-3 w-20 bg-gray-200 dark:bg-gray-700 rounded animate-pulse mb-4" />
                <div className="h-7 w-12 bg-gray-200 dark:bg-gray-700 rounded animate-pulse" />
              </div>
            ))
          : cards.map((card) => (
              <div
                key={card.title}
                className={`bg-white dark:bg-gray-800 p-5 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700 border-l-4 ${card.accent} hover:shadow-md transition-shadow duration-200`}
              >
                <div className="flex items-center justify-between mb-3">
                  <p className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                    {card.title}
                  </p>
                  {card.icon}
                </div>
                <p className={`text-3xl font-bold ${card.valueColor}`}>
                  {card.value}
                </p>
              </div>
            ))}
      </div>

      {/* ── Charts row ── */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">

        {/* Pie chart – Status distribution */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700 p-6">
          <div className="mb-4">
            <h2 className="text-base font-bold text-gray-800 dark:text-gray-100">Status Distribution</h2>
            <p className="text-xs text-gray-400 dark:text-gray-500 mt-0.5">Lead breakdown by current status</p>
          </div>

          {loading ? (
            <ChartSkeleton />
          ) : pieData.length === 0 ? (
            <div className="flex items-center justify-center h-56 text-gray-400 dark:text-gray-500 text-sm">
              No data available
            </div>
          ) : (
            <ResponsiveContainer width="100%" height={260}>
              <PieChart>
                <Pie
                  data={pieData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={100}
                  paddingAngle={3}
                  dataKey="value"
                  labelLine={false}
                  label={renderPieLabel}
                >
                  {pieData.map((entry, index) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={STATUS_COLORS[entry.name] ?? PIE_FALLBACK}
                      stroke="none"
                    />
                  ))}
                </Pie>
                <Tooltip content={<CustomTooltip />} />
                <Legend
                  formatter={(value) => (
                    <span className="capitalize text-xs text-gray-600">{value}</span>
                  )}
                />
              </PieChart>
            </ResponsiveContainer>
          )}

          {/* Legend chips */}
          {!loading && pieData.length > 0 && (
            <div className="flex flex-wrap gap-2 mt-2 justify-center">
              {pieData.map((entry) => (
                <span
                  key={entry.name}
                  className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium bg-gray-50 dark:bg-gray-700 border border-gray-100 dark:border-gray-600"
                >
                  <span
                    className="w-2 h-2 rounded-full"
                    style={{ backgroundColor: STATUS_COLORS[entry.name] ?? PIE_FALLBACK }}
                  />
                  <span className="capitalize text-gray-600 dark:text-gray-300">{entry.name}</span>
                  <span className="font-bold text-gray-800 dark:text-gray-100">{entry.value}</span>
                </span>
              ))}
            </div>
          )}
        </div>

        {/* Bar chart – Source distribution */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700 p-6">
          <div className="mb-4">
            <h2 className="text-base font-bold text-gray-800 dark:text-gray-100">Source Distribution</h2>
            <p className="text-xs text-gray-400 dark:text-gray-500 mt-0.5">Where your leads are coming from</p>
          </div>

          {loading ? (
            <div className="flex items-end justify-center gap-4 h-56 px-6">
              {[60, 90, 45].map((h, i) => (
                <div
                  key={i}
                  className="flex-1 bg-gray-100 dark:bg-gray-700 rounded-t-lg animate-pulse"
                  style={{ height: `${h}%` }}
                />
              ))}
            </div>
          ) : barData.length === 0 ? (
            <div className="flex items-center justify-center h-56 text-gray-400 dark:text-gray-500 text-sm">
              No data available
            </div>
          ) : (
            <ResponsiveContainer width="100%" height={260}>
              <BarChart
                data={barData}
                margin={{ top: 8, right: 8, left: -20, bottom: 0 }}
                barSize={40}
              >
                <CartesianGrid
                  strokeDasharray="3 3"
                  vertical={false}
                  stroke="#f1f5f9"
                />
                <XAxis
                  dataKey="name"
                  tick={{ fontSize: 12, fill: "#6b7280" }}
                  axisLine={false}
                  tickLine={false}
                  tickFormatter={(v) => v.charAt(0).toUpperCase() + v.slice(1)}
                />
                <YAxis
                  allowDecimals={false}
                  tick={{ fontSize: 12, fill: "#6b7280" }}
                  axisLine={false}
                  tickLine={false}
                />
                <Tooltip content={<CustomTooltip />} cursor={{ fill: "#f8fafc" }} />
                <Bar dataKey="value" name="leads" radius={[6, 6, 0, 0]}>
                  {barData.map((entry, index) => (
                    <Cell
                      key={`bar-${index}`}
                      fill={SOURCE_COLORS[entry.name] ?? BAR_FALLBACK}
                    />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          )}

          {/* Legend chips */}
          {!loading && barData.length > 0 && (
            <div className="flex flex-wrap gap-2 mt-2 justify-center">
              {barData.map((entry) => (
                <span
                  key={entry.name}
                  className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium bg-gray-50 dark:bg-gray-700 border border-gray-100 dark:border-gray-600"
                >
                  <span
                    className="w-2 h-2 rounded-full"
                    style={{ backgroundColor: SOURCE_COLORS[entry.name] ?? BAR_FALLBACK }}
                  />
                  <span className="capitalize text-gray-600 dark:text-gray-300">{entry.name}</span>
                  <span className="font-bold text-gray-800 dark:text-gray-100">{entry.value}</span>
                </span>
              ))}
            </div>
          )}
        </div>

      </div>
    </div>
  );
};

export default DashboardPage;