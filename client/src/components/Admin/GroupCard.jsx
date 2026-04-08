import React from "react";
import { FaUsers } from "react-icons/fa";

const GroupCard = ({
  name,
  description,
  members,
  totalExpense,
  settled,
  pending,
}) => {
  return (
    <div className="bg-[#1e293b] rounded-xl border border-[#334155] overflow-hidden hover:border-[#475569] transition-colors">
      {/* Card Header */}
      <div className="p-5 border-b border-[#334155] flex justify-between items-start">
        <div className="flex-1">
          <h3 className="text-white font-semibold text-base mb-1">{name}</h3>
          <p className="text-[#94a3b8] text-xs">{description}</p>
        </div>
        <span className="px-2.5 py-1 bg-blue-500/15 text-blue-400 border border-blue-500/30 rounded-full text-[10px] font-semibold">
          {members} Members
        </span>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 p-5">
        {/* Total Expense */}
        <div className="bg-[#162032] rounded-lg p-4 border border-[#334155]">
          <p className="text-[#94a3b8] text-xs mb-2">Total Expense</p>
          <h4 className="text-white text-xl font-bold">{totalExpense}</h4>
        </div>

        {/* Settled */}
        <div className="bg-emerald-500/10 rounded-lg p-4 border border-emerald-500/20">
          <p className="text-emerald-400 text-xs mb-2">Settled</p>
          <h4 className="text-emerald-400 text-xl font-bold">{settled}</h4>
        </div>

        {/* Pending */}
        <div className="bg-amber-500/10 rounded-lg p-4 border border-amber-500/20">
          <p className="text-amber-400 text-xs mb-2">Pending</p>
          <h4 className="text-amber-400 text-xl font-bold">{pending}</h4>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="p-5 border-t border-[#334155] flex gap-3">
        <button className="px-4 py-2 bg-blue-600 text-white rounded-lg text-xs font-medium hover:bg-blue-700 transition-colors">
          View Details
        </button>
        <button className="px-4 py-2 bg-[#334155] text-[#94a3b8] rounded-lg text-xs font-medium hover:bg-[#475569] transition-colors">
          Message Members
        </button>
      </div>
    </div>
  );
};

export default GroupCard;
