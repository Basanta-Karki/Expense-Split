import React from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from "recharts";
import DashboardHeader from "./DashboardHeader";
import ActivityItem from "./ActivityItem";

const SpendingTrendsChart = () => {
  const data = [
    { month: 0, split: 4200, settled: 3800, pending: 500 },
    { month: 1, split: 5100, settled: 4900, pending: 400 },
    { month: 2, split: 6300, settled: 5700, pending: 800 },
    { month: 3, split: 7100, settled: 6800, pending: 400 },
    { month: 4, split: 8200, settled: 7600, pending: 700 },
    { month: 5, split: 6800, settled: 6300, pending: 500 },
    { month: 6, split: 5500, settled: 5100, pending: 400 },
  ];

  return (
    <div className="bg-[#1e293b] rounded-xl p-5 border border-[#334155]">
      <h3 className="text-white font-semibold text-sm mb-4">
        Spending & Settlement Trends
      </h3>
      <ResponsiveContainer width="100%" height={240}>
        <LineChart data={data}>
          <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
          <XAxis dataKey="month" stroke="#64748b" tick={{ fontSize: 11 }} />
          <YAxis stroke="#64748b" tick={{ fontSize: 11 }} />
          <Tooltip
            contentStyle={{
              backgroundColor: "#1e293b",
              border: "1px solid #334155",
              borderRadius: "8px",
              color: "#e2e8f0",
            }}
          />
          <Legend wrapperStyle={{ fontSize: "12px" }} />
          <Line
            type="monotone"
            dataKey="split"
            stroke="#3b82f6"
            strokeWidth={2}
            dot={{ r: 3 }}
          />
          <Line
            type="monotone"
            dataKey="settled"
            stroke="#10b981"
            strokeWidth={2}
            dot={{ r: 3 }}
          />
          <Line
            type="monotone"
            dataKey="pending"
            stroke="#f59e0b"
            strokeWidth={2}
            dot={{ r: 3 }}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

const GroupDistributionChart = () => {
  const data = [
    { name: "Trip Friends", value: 62, color: "#10b981" },
    { name: "Roommates", value: 45, color: "#3b82f6" },
    { name: "Other", value: 15, color: "#8b5cf6" },
    { name: "Office", value: 28, color: "#f59e0b" },
  ];

  return (
    <div className="bg-[#1e293b] rounded-xl p-5 border border-[#334155]">
      <h3 className="text-white font-semibold text-sm mb-4">
        Group Types Distribution
      </h3>
      <ResponsiveContainer width="100%" height={240}>
        <PieChart>
          <Pie
            data={data}
            cx="50%"
            cy="50%"
            innerRadius={60}
            outerRadius={100}
            paddingAngle={4}
            dataKey="value"
            label={({ name, value }) => `${name}: ${value}`}
          >
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={entry.color} />
            ))}
          </Pie>
          <Tooltip
            contentStyle={{
              backgroundColor: "#1e293b",
              border: "1px solid #334155",
              borderRadius: "8px",
              color: "#e2e8f0",
            }}
          />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
};

const AdminDashboard = () => {
  const activities = [
    {
      title: "Hotel Booking",
      subtitle: "Europe Trip 2024 · Split across 6 members",
      amount: 12500,
      time: "2 hours ago",
      status: "Settled",
    },
    {
      title: "Dinner Bill",
      subtitle: "Office Lunch Fund · Split across 8 members",
      amount: 3200,
      time: "4 hours ago",
      status: "Settled",
    },
    {
      title: "Flight Tickets",
      subtitle: "Europe Trip 2024 · Split across 6 members",
      amount: 45000,
      time: "6 hours ago",
      status: "Pending",
    },
    {
      title: "Groceries",
      subtitle: "Roommates · Split across 4 members",
      amount: 2100,
      time: "8 hours ago",
      status: "Settled",
    },
    {
      title: "Entertainment",
      subtitle: "Movie Nights · Split across 3 members",
      amount: 1500,
      time: "10 hours ago",
      status: "Pending",
    },
  ];

  return (
    <div className="min-h-screen bg-[#0f172a] p-6 font-sans">
      <DashboardHeader activeTab="Overview" />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mb-6">
        <SpendingTrendsChart />
        <GroupDistributionChart />
      </div>

      <div className="bg-[#1e293b] rounded-xl p-5 border border-[#334155]">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-white font-semibold text-sm">
            Recent Expense Activity
          </h3>
          <button className="text-blue-400 text-xs font-medium hover:text-blue-300 transition-colors">
            View All
          </button>
        </div>
        <div className="space-y-2">
          {activities.map((activity, index) => (
            <ActivityItem key={index} {...activity} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
