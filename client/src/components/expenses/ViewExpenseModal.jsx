import React, { useMemo } from "react";
import { IoMdClose } from "react-icons/io";
import { useExpenseByIdQuery } from "../../hooks/expenses/useExpensesApi";

function mapApiExpenseToView(raw) {
  const e = raw?.expense ?? raw;
  if (!e) return null;

  const participants = e.participants || [];
  const members = participants.length;
  const paidById = e.paidBy?._id?.toString?.() ?? e.paidBy?.toString?.();

  let splitDetails = [];
  if (Array.isArray(e.splits) && e.splits.length > 0) {
    splitDetails = e.splits.map((s) => {
      const uid = s.user?._id?.toString?.() ?? s.user?.toString?.();
      return {
        name: s.user?.name || "Member",
        avatar: "🧑",
        amount: Number(s.amount ?? 0),
        isPaidBy: paidById && uid === paidById,
      };
    });
  } else {
    const per = members ? Number(e.amount) / members : 0;
    splitDetails = participants.map((p) => ({
      name: p.name || "Member",
      avatar: "🧑",
      amount: per,
      isPaidBy:
        (p._id?.toString?.() ?? p.toString?.()) === paidById,
    }));
  }

  return {
    title: e.title,
    amount: Number(e.amount ?? 0),
    category: e.category || "Others",
    date: e.createdAt
      ? new Date(e.createdAt).toLocaleString()
      : "",
    paidBy: e.paidBy?.name || "Unknown",
    paidByAvatar: "🧑",
    members,
    splitDetails,
  };
}

const ViewExpenseModal = ({ expenseId, isOpen, onClose }) => {
  const { data, isLoading, isError, error } = useExpenseByIdQuery(expenseId, {
    enabled: Boolean(isOpen && expenseId),
  });

  const expense = useMemo(() => {
    if (!data?.success || !data?.expense) return null;
    return mapApiExpenseToView(data);
  }, [data]);

  if (!isOpen) return null;

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
              {isLoading
                ? "Loading…"
                : expense?.title || "Expense"}
            </h2>
            <button
              onClick={onClose}
              className="p-1.5 text-slate-400 hover:text-white hover:bg-slate-800 rounded-lg transition-colors"
            >
              <IoMdClose className="w-4 h-4" />
            </button>
          </div>

          <div className="p-4 space-y-4">
            {isLoading && (
              <p className="text-slate-400 text-sm text-center py-8">
                Loading expense…
              </p>
            )}

            {isError && (
              <p className="text-red-400 text-sm text-center py-4">
                {error?.response?.data?.message ||
                  error?.message ||
                  "Could not load expense"}
              </p>
            )}

            {!isLoading && !isError && expense && (
              <>
                <div className="grid grid-cols-2 gap-3">
                  <div className="bg-slate-800/50 rounded-lg p-3 border border-slate-700/50">
                    <p className="text-slate-400 text-xs mb-0.5">Total</p>
                    <p className="text-lg font-bold text-white">
                      NPR{expense.amount?.toLocaleString()}
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
                  <div className="space-y-2 max-h-40 overflow-y-auto pr-1">
                    {expense.splitDetails?.map((member, idx) => (
                      <div
                        key={idx}
                        className="bg-slate-800/50 rounded-lg p-3 border border-slate-700/50 flex items-center justify-between"
                      >
                        <div className="flex items-center gap-2 min-w-0">
                          <div
                            className={`w-8 h-8 rounded-full flex items-center justify-center text-sm shrink-0 ${member.isPaidBy ? "bg-gradient-to-br from-orange-400 to-pink-500" : "bg-gradient-to-br from-blue-400 to-cyan-500"}`}
                          >
                            {member.avatar}
                          </div>
                          <p className="text-white text-sm font-medium truncate">
                            {member.name}
                          </p>
                        </div>
                        <p className="text-sm font-bold text-blue-400 shrink-0 ml-2">
                          NPR{Number(member.amount || 0).toLocaleString()}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="bg-slate-800/50 rounded-lg p-3 border border-slate-700/50">
                  <p className="text-slate-400 text-xs mb-0.5">Date</p>
                  <p className="text-sm text-white font-medium">{expense.date}</p>
                </div>
              </>
            )}
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
