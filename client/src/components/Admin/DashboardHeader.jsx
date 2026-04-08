import React from "react";
import {
  FaUsers,
  FaChartLine,
  FaDollarSign,
  FaExclamationTriangle,
  FaDownload,
  FaCog,
} from "react-icons/fa";
import StatCard from "./StatCard";

const DashboardHeader = ({ activeTab = "Overview" }) => {
  const tabs = [
    { name: "Overview", path: "/admin-dashboard" },
    { name: "Users", path: "/admin-dashboard/users" },
    { name: "Groups", path: "/admin-dashboard/groups" },
    { name: "Expenses", path: "/admin-dashboard/expenses" },
  ];

  const stats = [
    {
      icon: FaUsers,
      label: "Total Users",
      value: "2,450",
      trend: "+24%",
      trendUp: true,
      iconBg: "bg-blue-500",
    },
    {
      icon: FaChartLine,
      label: "Active Groups",
      value: "340",
      trend: "+12%",
      trendUp: true,
      iconBg: "bg-emerald-500",
    },
    {
      icon: FaDollarSign,
      label: "Total Split",
      value: "₹2.3Cr",
      trend: "+18%",
      trendUp: true,
      iconBg: "bg-blue-500",
    },
    {
      icon: FaExclamationTriangle,
      label: "Pending Settlements",
      value: "₹14.2L",
      trend: "-8%",
      trendUp: false,
      iconBg: "bg-orange-500",
    },
  ];

  return (
    <>
      {/* Header Section */}
      <div className="mb-6">
        <div className="flex justify-between items-start mb-4">
          <div>
            <h1 className="text-xl font-bold text-white">
              Admin Control Panel
            </h1>
            <p className="text-[#94a3b8] text-xs mt-0.5">
              Monitor users, groups, expenses & settlements
            </p>
          </div>
          <div className="flex gap-2">
            <button className="flex items-center gap-1.5 px-3 py-1.5 bg-[#1e293b] text-[#94a3b8] rounded-lg border border-[#334155] text-xs hover:bg-[#334155] transition-colors">
              <FaDownload className="text-[10px]" />
              Export Report
            </button>
            <button className="flex items-center gap-1.5 px-3 py-1.5 bg-blue-600 text-white rounded-lg text-xs hover:bg-blue-700 transition-colors">
              <FaCog className="text-[10px]" />
              Settings
            </button>
          </div>
        </div>

        {/* Navigation Tabs - Using Links for React Router */}
        <div className="flex gap-5 border-b border-[#334155]">
          {tabs.map((tab) => (
            <a
              key={tab.name}
              href={tab.path}
              className={`pb-2 text-xs font-medium transition-colors cursor-pointer ${
                tab.name === activeTab
                  ? "text-blue-400 border-b-2 border-blue-400"
                  : "text-[#64748b] hover:text-[#94a3b8]"
              }`}
            >
              {tab.name}
            </a>
          ))}
        </div>
      </div>

      {/* Stats Overview Section */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        {stats.map((stat, index) => (
          <StatCard key={index} {...stat} />
        ))}
      </div>
    </>
  );
};

export default DashboardHeader;
