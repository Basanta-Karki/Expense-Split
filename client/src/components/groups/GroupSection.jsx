import React from "react";
import { FaPlus, FaThLarge, FaList } from "react-icons/fa";
import CardViewGroup from "../Dashboard/CardViewGroup";
import ManageGroupCard from "../Dashboard/ManageGroupCard";

const GroupSection = ({
  viewMode,
  setViewMode,
  groups,
  onOpenCreateModal,
  onViewDetails,
}) => {
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-xl font-bold text-white">Your Groups</h3>
        <div className="flex items-center gap-2">
          <div className="flex bg-slate-800 rounded-lg p-1 border border-slate-700">
            <button
              onClick={() => setViewMode("cards")}
              className={`flex items-center gap-2 px-4 py-2 rounded-md text-sm font-medium transition-all ${
                viewMode === "cards"
                  ? "bg-blue-600 text-white"
                  : "text-slate-400 hover:text-white"
              }`}
            >
              <FaThLarge className="w-3 h-3" />
              Cards
            </button>
            <button
              onClick={() => setViewMode("manage")}
              className={`flex items-center gap-2 px-4 py-2 rounded-md text-sm font-medium transition-all ${
                viewMode === "manage"
                  ? "bg-blue-600 text-white"
                  : "text-slate-400 hover:text-white"
              }`}
            >
              <FaList className="w-3 h-3" />
              Manage
            </button>
          </div>
          <button
            onClick={onOpenCreateModal}
            className="flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded-lg text-sm font-medium transition-all hover:shadow-lg hover:shadow-blue-500/25"
          >
            <FaPlus className="w-3 h-3" />
            New Group
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {viewMode === "cards"
          ? groups.map((group) => (
              <CardViewGroup
                key={group.id}
                group={group}
                onViewDetails={onViewDetails}
              />
            ))
          : groups.map((group) => (
              <ManageGroupCard key={group.id} group={group} />
            ))}
      </div>
    </div>
  );
};

export default GroupSection;
