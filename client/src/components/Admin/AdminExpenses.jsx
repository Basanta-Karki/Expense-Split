import React from "react";
import DashboardHeader from "./DashboardHeader";
import ExpenseItem from "./ExpenseItem";

const AdminExpenses = () => {
  // Mock data for expenses
  const expenses = [
    {
      id: 1,
      title: "Hotel Booking",
      subtitle: "Europe Trip 2024 • 6 way split",
      amount: "₹12,500",
      time: "2 hours ago",
      status: "Settled",
    },
    {
      id: 2,
      title: "Dinner Bill",
      subtitle: "Office Lunch Fund • 8 way split",
      amount: "₹3,200",
      time: "4 hours ago",
      status: "Settled",
    },
    {
      id: 3,
      title: "Flight Tickets",
      subtitle: "Europe Trip 2024 • 6 way split",
      amount: "₹45,000",
      time: "6 hours ago",
      status: "Pending",
    },
    {
      id: 4,
      title: "Groceries",
      subtitle: "Roommates • 4 way split",
      amount: "₹2,100",
      time: "8 hours ago",
      status: "Settled",
    },
    {
      id: 5,
      title: "Entertainment",
      subtitle: "Movie Nights • 3 way split",
      amount: "₹1,500",
      time: "10 hours ago",
      status: "Pending",
    },
    {
      id: 6,
      title: "Taxi Fare",
      subtitle: "Weekend Getaway • 12 way split",
      amount: "₹4,800",
      time: "1 day ago",
      status: "Settled",
    },
  ];

  return (
    <div className="min-h-screen bg-[#0f172a] p-6 font-sans">
      <DashboardHeader activeTab="Expenses" />

      {/* Expenses Container */}
      <div className="bg-[#1e293b] rounded-xl border border-[#334155]">
        {/* Header with Filter/Export */}
        <div className="p-5 border-b border-[#334155] flex justify-between items-center">
          <h3 className="text-white font-semibold text-sm">All Expenses</h3>
          <div className="flex gap-2">
            <button className="flex items-center gap-1.5 px-3 py-1.5 bg-[#1e293b] text-[#94a3b8] rounded-lg border border-[#334155] text-xs hover:bg-[#334155] transition-colors">
              <svg
                className="w-3 h-3"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z"
                />
              </svg>
              Filter
            </button>
            <button className="flex items-center gap-1.5 px-3 py-1.5 bg-blue-600 text-white rounded-lg text-xs hover:bg-blue-700 transition-colors">
              <svg
                className="w-3 h-3"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"
                />
              </svg>
              Export
            </button>
          </div>
        </div>

        {/* Expense List */}
        <div className="p-5 space-y-3">
          {expenses.map((expense) => (
            <ExpenseItem key={expense.id} {...expense} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default AdminExpenses;
