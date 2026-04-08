import React from "react";
import { FaEye, FaEdit, FaTrash } from "react-icons/fa";

const UserTable = () => {
  const users = [
    {
      id: 1,
      name: "Dinesh Kumar",
      email: "dinesh@example.com",
      groups: 5,
      totalSplit: "₹12,450",
      joinDate: "2024-01-15",
      status: "Active",
    },
    {
      id: 2,
      name: "Priya Singh",
      email: "priya@example.com",
      groups: 3,
      totalSplit: "₹8,230",
      joinDate: "2024-01-20",
      status: "Active",
    },
    {
      id: 3,
      name: "Amit Patel",
      email: "amit@example.com",
      groups: 2,
      totalSplit: "₹4,150",
      joinDate: "2024-02-01",
      status: "Pending",
    },
    {
      id: 4,
      name: "Sarah Chen",
      email: "sarah@example.com",
      groups: 8,
      totalSplit: "₹25,680",
      joinDate: "2023-12-10",
      status: "Active",
    },
    {
      id: 5,
      name: "Raj Verma",
      email: "raj@example.com",
      groups: 1,
      totalSplit: "₹1,200",
      joinDate: "2024-01-25",
      status: "Inactive",
    },
  ];

  const getStatusStyle = (status) => {
    switch (status) {
      case "Active":
        return "bg-emerald-500/15 text-emerald-400 border-emerald-500/30";
      case "Pending":
        return "bg-amber-500/15 text-amber-400 border-amber-500/30";
      case "Inactive":
        return "bg-slate-500/15 text-slate-400 border-slate-500/30";
      default:
        return "bg-slate-500/15 text-slate-400 border-slate-500/30";
    }
  };

  return (
    <div className="bg-[#1e293b] rounded-xl border border-[#334155] overflow-hidden">
      <div className="p-5 border-b border-[#334155] flex justify-between items-center">
        <h3 className="text-white font-semibold text-sm">User Management</h3>
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
              d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z"
            />
          </svg>
          Filter
        </button>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-[#162032]">
            <tr>
              <th className="text-left text-[#94a3b8] text-xs font-medium px-5 py-3">
                Name
              </th>
              <th className="text-left text-[#94a3b8] text-xs font-medium px-5 py-3">
                Email
              </th>
              <th className="text-left text-[#94a3b8] text-xs font-medium px-5 py-3">
                Groups
              </th>
              <th className="text-left text-[#94a3b8] text-xs font-medium px-5 py-3">
                Total Split
              </th>
              <th className="text-left text-[#94a3b8] text-xs font-medium px-5 py-3">
                Join Date
              </th>
              <th className="text-left text-[#94a3b8] text-xs font-medium px-5 py-3">
                Status
              </th>
              <th className="text-left text-[#94a3b8] text-xs font-medium px-5 py-3">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[#334155]">
            {users.map((user) => (
              <tr
                key={user.id}
                className="hover:bg-[#162032] transition-colors"
              >
                <td className="px-5 py-4">
                  <span className="text-white text-sm font-medium">
                    {user.name}
                  </span>
                </td>
                <td className="px-5 py-4">
                  <span className="text-[#94a3b8] text-sm">{user.email}</span>
                </td>
                <td className="px-5 py-4">
                  <span className="text-white text-sm">{user.groups}</span>
                </td>
                <td className="px-5 py-4">
                  <span className="text-white text-sm font-medium">
                    {user.totalSplit}
                  </span>
                </td>
                <td className="px-5 py-4">
                  <span className="text-[#94a3b8] text-sm">
                    {user.joinDate}
                  </span>
                </td>
                <td className="px-5 py-4">
                  <span
                    className={`px-2.5 py-1 rounded-full text-[10px] font-semibold border ${getStatusStyle(user.status)}`}
                  >
                    {user.status}
                  </span>
                </td>
                <td className="px-5 py-4">
                  <div className="flex items-center gap-2">
                    <button className="p-1.5 text-blue-400 hover:bg-blue-500/10 rounded transition-colors">
                      <FaEye className="text-xs" />
                    </button>
                    <button className="p-1.5 text-emerald-400 hover:bg-emerald-500/10 rounded transition-colors">
                      <FaEdit className="text-xs" />
                    </button>
                    <button className="p-1.5 text-red-400 hover:bg-red-500/10 rounded transition-colors">
                      <FaTrash className="text-xs" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default UserTable;
