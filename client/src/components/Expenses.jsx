import React, { useMemo, useState, useEffect } from "react";
import Sidebar from "./Layout/Sidebar";
import HeaderTop from "./layout/HeaderTop";
import ExpenseCard from "./expenses/ExpenseCard";
import AddExpenseModal from "./expenses/AddExpenseModal";
import ViewExpenseModal from "./expenses/ViewExpenseModal";
import { useCreateExpenseApi, useExpensesByGroupQuery } from "../hooks/expenses/useExpensesApi";
import { toast } from "react-toastify";
import { useMyGroupsQuery } from "../hooks/groups/useGroupsApi";
import { getUserId } from "../utils/user";

const Expenses = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedExpenseId, setSelectedExpenseId] = useState(null);
  const [isViewModalOpen, setIsViewModalOpen] = useState(false);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [filterCategory, setFilterCategory] = useState("all");

  const [activeGroupId, setActiveGroupId] = useState(null);

  // ✅ Add current user state
  const [currentUser, setCurrentUser] = useState(null);

  useEffect(() => {
    // Get current user from localStorage or auth context
    const user = JSON.parse(localStorage.getItem("user"));
    setCurrentUser(user);
  }, []);

  const {
    data: myGroupsData,
    isLoading: isGroupsLoading,
    isError: isGroupsError,
    error: groupsError,
  } = useMyGroupsQuery();

  const groups = useMemo(() => myGroupsData?.groups || [], [myGroupsData]);

  // Initialize active group: prefer localStorage if it exists and is valid, else use first group
  useEffect(() => {
    if (!groups.length) return;

    const lastGroupId = localStorage.getItem("activeGroupId");
    const isValid = lastGroupId && groups.some((g) => g._id === lastGroupId);

    const nextGroupId = isValid ? lastGroupId : groups[0]._id;
    setActiveGroupId(nextGroupId);
    localStorage.setItem("activeGroupId", nextGroupId);
  }, [groups]);

  const { data, isLoading, isError, error } = useExpensesByGroupQuery(activeGroupId);
  const createExpense = useCreateExpenseApi(activeGroupId);

  const categories = [
    "all",
    "Food & Dining",
    "Entertainment",
    "Transport",
    "Groceries",
    "Shopping",
    "Bills",
  ];

  const expenses = useMemo(() => {
    const raw = data?.expenses || [];
    const groupNameForId = (groupRef) => {
      const gid = groupRef?._id ?? groupRef;
      const idStr = gid != null ? String(gid) : "";
      if (!idStr) return "Group";
      const found = groups.find((g) => String(g._id) === idStr);
      return found?.name ?? "Group";
    };

    // Map backend expense shape -> UI shape expected by ExpenseCard
    return raw.map((e) => {
      const members = Array.isArray(e.participants) ? e.participants.length : 0;
      const perPerson = members ? Number(e.amount) / members : 0;

      const categoryIcons = {
        "Food & Dining": "🍽️",
        Entertainment: "🎬",
        Transport: "⛽",
        Groceries: "🛒",
        Shopping: "🛍️",
        Bills: "📄",
        Others: "📦",
      };

      return {
        id: e._id,
        title: e.title,
        group: groupNameForId(e.group),
        paidBy: e.paidBy?.name || "Unknown",
        paidByAvatar: "🧑",
        category: e.category || "Others",
        date: e.createdAt ? new Date(e.createdAt).toLocaleDateString() : "",
        amount: Number(e.amount || 0),
        members,
        icon: categoryIcons[e.category] || "📦",
        splitDetails: (e.participants || []).map((p) => ({
          name: p?.name || "Member",
          avatar: "🧑",
          amount: perPerson,
          isPaidBy: false,
        })),
      };
    });
  }, [data, groups]);

  const filteredExpenses = useMemo(() => {
    return expenses.filter((expense) => {
      const matchesSearch =
        expense.title?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        expense.group?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        expense.paidBy?.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesCategory =
        filterCategory === "all" || expense.category === filterCategory;
      return matchesSearch && matchesCategory;
    });
  }, [expenses, filterCategory, searchQuery]);

  const normalizedGroupsForModal = useMemo(() => {
    // AddExpenseModal expects group.members to be an array of userIds
    return groups.map((g) => ({
      _id: g._id,
      name: g.name,
      members: (g.members || []).map((m) => (typeof m === "string" ? m : m._id)),
    }));
  }, [groups]);

  const normalizedUsersForModal = useMemo(() => {
    // AddExpenseModal expects users like { _id, name, email, avatar? }
    const byId = new Map();
    for (const g of groups) {
      for (const m of g.members || []) {
        const id = typeof m === "string" ? m : m._id;
        if (!id) continue;
        if (!byId.has(id)) {
          byId.set(id, {
            _id: id,
            name: typeof m === "string" ? "Member" : m.name,
            email: typeof m === "string" ? "" : m.email,
            avatar: "🧑",
          });
        }
      }
    }
    return Array.from(byId.values());
  }, [groups]);

  const handleGroupSelect = (e) => {
    const nextId = e.target.value;
    setActiveGroupId(nextId);
    localStorage.setItem("activeGroupId", nextId);
  };

  const handleCreateExpense = async (payload) => {
    if (!activeGroupId) {
      toast.error("Select a group first.");
      return;
    }

    try {
      await createExpense.mutateAsync(payload);
      toast.success("Expense created");
      setIsAddModalOpen(false);
    } catch (e) {
      toast.error(e?.response?.data?.message || e?.message || "Create failed");
    }
  };

  return (
    <div className="flex h-screen bg-slate-950 text-white">
      <Sidebar />
      <main className="flex-1 overflow-y-auto flex flex-col">
        <HeaderTop
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          title="Expenses"
        />

        <div className="p-6 flex-1">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
            <div>
              <h1 className="text-3xl font-bold text-white mb-1">Expenses</h1>
              <p className="text-slate-400 text-sm">
                Track all shared expenses across your groups
              </p>
            </div>
            <button
              onClick={() => setIsAddModalOpen(true)}
              className="flex items-center justify-center gap-2 px-4 py-2.5 bg-blue-600 hover:bg-blue-700 rounded-lg text-sm font-medium transition-all hover:shadow-lg hover:shadow-blue-500/25 w-full sm:w-auto"
            >
              + Add Expense
            </button>
          </div>

          <div className="flex flex-wrap items-center gap-3 mb-6">
            <div className="flex items-center gap-2 bg-slate-900/50 border border-slate-800 rounded-lg px-3 py-2">
              <span className="text-slate-400 text-sm">Group:</span>
              <select
                value={activeGroupId || ""}
                onChange={handleGroupSelect}
                disabled={isGroupsLoading || isGroupsError || !groups.length}
                className="bg-transparent text-sm text-white focus:outline-none cursor-pointer"
              >
                {groups.map((g) => (
                  <option key={g._id} value={g._id} className="bg-slate-900">
                    {g.name}
                  </option>
                ))}
              </select>
            </div>
            <div className="flex items-center gap-2 bg-slate-900/50 border border-slate-800 rounded-lg px-3 py-2">
              <span className="text-slate-400 text-sm">Filter:</span>
              <select
                value={filterCategory}
                onChange={(e) => setFilterCategory(e.target.value)}
                className="bg-transparent text-sm text-white focus:outline-none cursor-pointer"
              >
                {categories.map((cat) => (
                  <option key={cat} value={cat} className="bg-slate-900">
                    {cat === "all" ? "All Categories" : cat}
                  </option>
                ))}
              </select>
            </div>
            <p className="text-slate-400 text-sm">
              {filteredExpenses.length} expense
              {filteredExpenses.length !== 1 ? "s" : ""} found
            </p>
          </div>

          <div className="space-y-3">
            {isGroupsLoading ? (
              <div className="bg-slate-900/50 border border-slate-800 rounded-xl p-8 text-center">
                <p className="text-slate-400">Loading groups...</p>
              </div>
            ) : isGroupsError ? (
              <div className="bg-slate-900/50 border border-slate-800 rounded-xl p-8 text-center">
                <p className="text-slate-200 font-medium mb-1">Failed to load groups</p>
                <p className="text-slate-400 text-sm">
                  {groupsError?.response?.data?.message ||
                    groupsError?.message ||
                    "Unknown error"}
                </p>
              </div>
            ) : !activeGroupId ? (
              <div className="bg-slate-900/50 border border-slate-800 rounded-xl p-8 text-center">
                <p className="text-slate-200 font-medium mb-1">
                  No active group selected
                </p>
                <p className="text-slate-400 text-sm">
                  Create or join a group first.
                </p>
              </div>
            ) : isLoading ? (
              <div className="bg-slate-900/50 border border-slate-800 rounded-xl p-8 text-center">
                <p className="text-slate-400">Loading expenses...</p>
              </div>
            ) : isError ? (
              <div className="bg-slate-900/50 border border-slate-800 rounded-xl p-8 text-center">
                <p className="text-slate-200 font-medium mb-1">Failed to load</p>
                <p className="text-slate-400 text-sm">
                  {error?.response?.data?.message || error?.message || "Unknown error"}
                </p>
              </div>
            ) : filteredExpenses.length > 0 ? (
              filteredExpenses.map((expense) => (
                <ExpenseCard
                  key={expense.id}
                  expense={expense}
                  onClick={() => {
                    setSelectedExpenseId(expense.id);
                    setIsViewModalOpen(true);
                  }}
                />
              ))
            ) : (
              <div className="bg-slate-900/50 border border-slate-800 rounded-xl p-12 text-center">
                <p className="text-slate-400">No expenses found</p>
              </div>
            )}
          </div>
        </div>
      </main>
      <ViewExpenseModal
        expenseId={selectedExpenseId}
        isOpen={isViewModalOpen}
        onClose={() => {
          setIsViewModalOpen(false);
          setSelectedExpenseId(null);
        }}
      />
      {/* <AddExpenseModal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        onAdd={handleAddExpense}
        groups={groups}
        members={members}
      /> */}

      <AddExpenseModal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        onAdd={handleCreateExpense}
        currentUserId={getUserId(currentUser)}
        mockGroups={normalizedGroupsForModal}
        mockUsers={normalizedUsersForModal}
      />
    </div>
  );
};

export default Expenses;
