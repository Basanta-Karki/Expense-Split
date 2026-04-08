import React from "react";
import { IoMdArrowForward } from "react-icons/io";

const ExpenseCard = ({ expense, onClick }) => {
  return (
    <div
      onClick={onClick}
      className="bg-slate-900/50 border border-slate-800 rounded-xl p-4 hover:border-slate-700 transition-all duration-300 hover:shadow-lg hover:shadow-blue-500/5 cursor-pointer group"
    >
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4 flex-1 min-w-0">
          <div className="w-12 h-12 bg-slate-800 rounded-lg flex items-center justify-center text-2xl flex-shrink-0">
            {expense.icon}
          </div>
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 mb-1 flex-wrap">
              <h3 className="text-white font-semibold truncate">
                {expense.title}
              </h3>
              <span className="px-2 py-0.5 text-xs bg-blue-600/20 text-blue-400 border border-blue-600/30 rounded font-medium flex-shrink-0">
                {expense.group}
              </span>
            </div>
            <p className="text-slate-400 text-sm truncate">
              {expense.paidBy} • {expense.category} • {expense.date}
            </p>
          </div>
        </div>
        <div className="flex items-center gap-4 flex-shrink-0">
          <div className="text-right">
            <p className="text-xl font-bold text-white">
              NPR{expense.amount?.toLocaleString()}
            </p>
            <p className="text-slate-400 text-xs">{expense.members} members</p>
          </div>
          <IoMdArrowForward className="w-5 h-5 text-slate-400 group-hover:text-white group-hover:translate-x-1 transition-all" />
        </div>
      </div>
    </div>
  );
};

export default ExpenseCard;
