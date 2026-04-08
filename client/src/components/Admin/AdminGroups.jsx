import React from "react";
import DashboardHeader from "./DashboardHeader";
import GroupCard from "./GroupCard";

const AdminGroups = () => {
  const groups = [
    {
      id: 1,
      name: "Roommates",
      description: "Created by Dinesh Kumar • Shared apartment expenses",
      members: 4,
      totalExpense: "₹45,230",
      settled: "₹42,100",
      pending: "₹3,130",
    },
    {
      id: 2,
      name: "Europe Trip 2024",
      description: "Created by Sarah Chen • Group vacation to Europe",
      members: 6,
      totalExpense: "₹98,500",
      settled: "₹95,200",
      pending: "₹3,300",
    },
    {
      id: 3,
      name: "Office Lunch Fund",
      description: "Created by Priya Singh • Office team lunches",
      members: 12,
      totalExpense: "₹52,100",
      settled: "₹51,800",
      pending: "₹300",
    },
    {
      id: 4,
      name: "Weekend Getaway",
      description: "Created by Amit Patel • Weekend trip to hills",
      members: 8,
      totalExpense: "₹67,800",
      settled: "₹60,500",
      pending: "₹7,300",
    },
    {
      id: 5,
      name: "Birthday Party",
      description: "Created by Neha Sharma • Birthday celebration",
      members: 15,
      totalExpense: "₹42,000",
      settled: "₹42,000",
      pending: "₹0",
    },
  ];

  return (
    <div className="min-h-screen bg-[#0f172a] p-6 font-sans">
      <DashboardHeader activeTab="Groups" />

      {/* Filter and Actions Bar */}
      <div className="flex justify-between items-center mb-6">
        <div className="flex gap-2">
          <button className="px-4 py-2 bg-blue-600 text-white rounded-lg text-xs font-medium hover:bg-blue-700 transition-colors">
            All Groups
          </button>
          <button className="px-4 py-2 bg-[#1e293b] text-[#94a3b8] rounded-lg border border-[#334155] text-xs font-medium hover:bg-[#334155] transition-colors">
            Active
          </button>
          <button className="px-4 py-2 bg-[#1e293b] text-[#94a3b8] rounded-lg border border-[#334155] text-xs font-medium hover:bg-[#334155] transition-colors">
            Completed
          </button>
        </div>
        <button className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg text-xs font-medium hover:bg-blue-700 transition-colors">
          <svg
            className="w-4 h-4"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 4v16m8-8H4"
            />
          </svg>
          Create Group
        </button>
      </div>

      {/* Groups List */}
      <div className="space-y-4">
        {groups.map((group) => (
          <GroupCard key={group.id} {...group} />
        ))}
      </div>
    </div>
  );
};

export default AdminGroups;
