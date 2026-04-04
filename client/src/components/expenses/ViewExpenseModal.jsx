import React from "react";
import { IoMdClose } from "react-icons/io";

const ViewExpenseModal = ({ expense, isOpen, onClose }) => {
  if (!isOpen || !expense) return null;
  const perPerson = expense.amount / expense.members;

  return (
    <>
      <div
        className="fixed inset-0 bg-black/70 backdrop-blur-sm z-40 flex items-center justify-center p-4"
        onClick={onClose}
      >
        <div
          className="bg-slate-900 border border-slate-800 rounded-xl w-full max-w-md shadow-2xl z-50 max-h-[90vh] overflow-y-auto"
          onClick={(e) => e.stopPropagation()}
        >
          <div className="flex items-center justify-between p-4 border-b border-slate-800 sticky top-0 bg-slate-900 rounded-t-xl z-10">
            <h2 className="text-lg font-bold text-white truncate pr-2">
              {expense.title}
            </h2>
            <button
              onClick={onClose}
              className="p-1.5 text-slate-400 hover:text-white hover:bg-slate-800 rounded-lg transition-colors"
            >
              <IoMdClose className="w-4 h-4" />
            </button>
          </div>

          <div className="p-4 space-y-4">
            <div className="grid grid-cols-2 gap-3">
              <div className="bg-slate-800/50 rounded-lg p-3 border border-slate-700/50">
                <p className="text-slate-400 text-xs mb-0.5">Total</p>
                <p className="text-lg font-bold text-white">
                  ₹{expense.amount?.toLocaleString()}
                </p>
              </div>
              <div className="bg-slate-800/50 rounded-lg p-3 border border-slate-700/50">
                <p className="text-slate-400 text-xs mb-0.5">Category</p>
                <p className="text-sm font-semibold text-white truncate">
                  {expense.category}
                </p>
              </div>
            </div>

            <div>
              <p className="text-slate-400 text-xs mb-2">Paid By</p>
              <div className="bg-slate-800/50 rounded-lg p-3 border border-slate-700/50">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 bg-gradient-to-br from-orange-400 to-pink-500 rounded-full flex items-center justify-center text-sm">
                    {expense.paidByAvatar || "🧑"}
                  </div>
                  <p className="text-white text-sm font-medium">
                    {expense.paidBy}
                  </p>
                </div>
              </div>
            </div>

            <div>
              <p className="text-slate-400 text-xs mb-2">
                Split ({expense.members})
              </p>
              <div className="space-y-2 max-h-32 overflow-y-auto pr-1">
                {expense.splitDetails?.map((member, idx) => (
                  <div
                    key={idx}
                    className="bg-slate-800/50 rounded-lg p-3 border border-slate-700/50 flex items-center justify-between"
                  >
                    <div className="flex items-center gap-2">
                      <div
                        className={`w-8 h-8 rounded-full flex items-center justify-center text-sm ${member.isPaidBy ? "bg-gradient-to-br from-orange-400 to-pink-500" : "bg-gradient-to-br from-blue-400 to-cyan-500"}`}
                      >
                        {member.avatar}
                      </div>
                      <p className="text-white text-sm font-medium">
                        {member.name}
                      </p>
                    </div>
                    <p className="text-sm font-bold text-blue-400">
                      ₹{perPerson?.toFixed(0)}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-slate-800/50 rounded-lg p-3 border border-slate-700/50">
              <p className="text-slate-400 text-xs mb-0.5">Date</p>
              <p className="text-sm text-white font-medium">{expense.date}</p>
            </div>
          </div>

          <div className="p-4 border-t border-slate-800 sticky bottom-0 bg-slate-900 rounded-b-xl">
            <button
              onClick={onClose}
              className="w-full py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-sm font-medium transition-all"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default ViewExpenseModal;
