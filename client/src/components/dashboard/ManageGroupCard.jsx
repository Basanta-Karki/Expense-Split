import React, { useState } from "react";
import {
  FaEllipsisV,
  FaEdit,
  FaShareAlt,
  FaTrash,
  FaUserPlus,
  FaMoneyBillWave,
} from "react-icons/fa";

const ManageGroupCard = ({ group }) => {
  const [openMenu, setOpenMenu] = useState(null);

  const toggleMenu = () => {
    setOpenMenu(openMenu === group.id ? null : group.id);
  };

  return (
    <div className="bg-slate-900/50 border border-slate-800 rounded-xl p-6 hover:border-slate-700 transition-all duration-300">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h4 className="text-lg font-bold text-white mb-1">{group.name}</h4>
          <p className="text-slate-400 text-sm">Group ID: {group.id}</p>
        </div>
        <div className="relative">
          <button
            onClick={toggleMenu}
            className="p-2 text-slate-400 hover:text-white transition-colors"
          >
            <FaEllipsisV className="w-5 h-5" />
          </button>

          {openMenu === group.id && (
            <>
              <div
                className="fixed inset-0 z-10"
                onClick={() => setOpenMenu(null)}
              />
              <div className="absolute right-0 top-full mt-2 w-48 bg-slate-800 border border-slate-700 rounded-lg shadow-xl z-20 overflow-hidden">
                <button className="w-full flex items-center gap-3 px-4 py-3 text-sm text-slate-300 hover:bg-slate-700 transition-colors">
                  <FaEdit className="w-4 h-4 text-blue-400" />
                  Edit Group
                </button>
                <button className="w-full flex items-center gap-3 px-4 py-3 text-sm text-slate-300 hover:bg-slate-700 transition-colors">
                  <FaShareAlt className="w-4 h-4 text-green-400" />
                  Share
                </button>
                <button className="w-full flex items-center gap-3 px-4 py-3 text-sm text-red-400 hover:bg-slate-700 transition-colors border-t border-slate-700">
                  <FaTrash className="w-4 h-4" />
                  Delete
                </button>
              </div>
            </>
          )}
        </div>
      </div>

      <div className="grid grid-cols-3 gap-3 mb-6">
        <div className="bg-slate-800/50 rounded-lg p-4 text-center border border-slate-700/50">
          <p className="text-2xl font-bold text-blue-400 mb-1">
            {group.members}
          </p>
          <p className="text-slate-400 text-xs">Members</p>
        </div>
        <div className="bg-slate-800/50 rounded-lg p-4 text-center border border-slate-700/50">
          <p className="text-2xl font-bold text-green-400 mb-1">
            ₹{group.perPerson}
          </p>
          <p className="text-slate-400 text-xs">Per Person</p>
        </div>
        <div className="bg-slate-800/50 rounded-lg p-4 text-center border border-slate-700/50">
          <p className="text-2xl font-bold text-orange-400 mb-1">
            ₹{group.totalExpenses}
          </p>
          <p className="text-slate-400 text-xs">Total</p>
        </div>
      </div>

      <div className="mb-6">
        <p className="text-slate-400 text-sm mb-3">Members ({group.members})</p>
        <div className="flex flex-wrap gap-2">
          {group.memberDetails.map((member) => (
            <div
              key={member.id}
              className="flex items-center gap-2 bg-slate-800/50 rounded-full px-3 py-2 border border-slate-700/50 hover:border-slate-600 transition-colors"
            >
              <span className="text-xl">{member.avatar}</span>
              <span className="text-sm text-white font-medium">
                {member.name}
              </span>
            </div>
          ))}
        </div>
      </div>

      <div className="flex gap-3">
        <button className="flex-1 flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white py-2.5 rounded-lg font-medium transition-all hover:shadow-lg hover:shadow-blue-500/25">
          <FaUserPlus className="w-4 h-4" />
          Add Member
        </button>
        <button className="flex-1 flex items-center justify-center gap-2 bg-slate-800 hover:bg-slate-700 text-white py-2.5 rounded-lg font-medium transition-all border border-slate-700">
          <FaMoneyBillWave className="w-4 h-4 text-green-400" />
          Settle Up
        </button>
      </div>
    </div>
  );
};

export default ManageGroupCard;
