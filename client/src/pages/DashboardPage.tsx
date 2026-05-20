import {
  useEffect,
  useState,
} from "react";

import { getDashboardStats } from "../services/dashboard.service";

type Lead = {
  status: string;
};

const DashboardPage = () => {
  const [stats, setStats] =
    useState({
      total: 0,
      new: 0,
      contacted: 0,
      qualified: 0,
      lost: 0,
    });

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats =
      async () => {
        try {
          setLoading(true);
          const data =
            await getDashboardStats();

          const leads: Lead[] =
            data.leads;

          setStats({
            total: leads.length,

            new: leads.filter(
              (lead) =>
                lead.status ===
                "new"
            ).length,

            contacted:
              leads.filter(
                (lead) =>
                  lead.status ===
                  "contacted"
              ).length,

            qualified:
              leads.filter(
                (lead) =>
                  lead.status ===
                  "qualified"
              ).length,

            lost: leads.filter(
              (lead) =>
                lead.status ===
                "lost"
            ).length,
          });
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
    },

    {
      title: "New Leads",
      value: stats.new,
    },

    {
      title: "Contacted",
      value: stats.contacted,
    },

    {
      title: "Qualified",
      value: stats.qualified,
    },

    {
      title: "Lost",
      value: stats.lost,
    },
  ];

  return (
    <div>
      <h1 className="text-3xl font-bold mb-8">
        Dashboard
      </h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6">
        {loading
          ? [...Array(5)].map(
            (_, i) => (
              <div
                key={i}
                className="bg-white p-6 rounded-xl shadow"
              >
                <div className="h-4 w-24 bg-gray-200 rounded animate-pulse mb-4"></div>

                <div className="h-8 w-16 bg-gray-200 rounded animate-pulse"></div>
              </div>
            )
          )
          : cards.map((card) => (
            <div
              key={card.title}
              className="bg-white p-6 rounded-xl shadow"
            >
              <p className="text-gray-500 text-sm mb-2">
                {card.title}
              </p>

              <h2 className="text-3xl font-bold">
                {card.value}
              </h2>
            </div>
          ))}
      </div>
    </div>
  );
};

export default DashboardPage;