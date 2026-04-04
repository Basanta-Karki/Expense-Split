import React, { useState, useEffect } from "react";
import Sidebar from "./Layout/Sidebar";
import HeaderTop from "./layout/HeaderTop";
import ExpenseCard from "./expenses/ExpenseCard";
import AddExpenseModal from "./expenses/AddExpenseModal";
import ViewExpenseModal from "./expenses/ViewExpenseModal";

const Expenses = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedExpense, setSelectedExpense] = useState(null);
  const [isViewModalOpen, setIsViewModalOpen] = useState(false);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [filterCategory, setFilterCategory] = useState("all");

  const groups = [
    { id: 1, name: "College Friends" },
    { id: 2, name: "Roommates" },
    { id: 3, name: "Work Trip" },
  ];

  const members = [
    { id: 1, name: "Dinesh Karki", avatar: "🧑" },
    { id: 2, name: "Rahul", avatar: "👨" },
    { id: 3, name: "Priya", avatar: "👩" },
    { id: 4, name: "Amit", avatar: "🧑" },
  ];

  // ✅ Add current user state
  const [currentUser, setCurrentUser] = useState(null);

  useEffect(() => {
    // Get current user from localStorage or auth context
    const user = JSON.parse(localStorage.getItem("user"));
    setCurrentUser(user);
  }, []);

  const [expenses, setExpenses] = useState([
    {
      id: 1,
      title: "Lunch at Pizza Place",
      group: "College Friends",
      paidBy: "Dinesh Karki",
      paidByAvatar: "🧑",
      category: "Food & Dining",
      date: "Today",
      amount: 450,
      members: 2,
      icon: "🍽️",
      splitDetails: [
        { name: "Dinesh Karki", avatar: "🧑", amount: 225, isPaidBy: true },
        { name: "Rahul", avatar: "👨", amount: 225, isPaidBy: false },
      ],
    },
    {
      id: 2,
      title: "Movie tickets",
      group: "College Friends",
      paidBy: "Rahul",
      paidByAvatar: "👨",
      category: "Entertainment",
      date: "Yesterday",
      amount: 600,
      members: 2,
      icon: "🎬",
      splitDetails: [
        { name: "Dinesh Karki", avatar: "🧑", amount: 300, isPaidBy: false },
        { name: "Rahul", avatar: "👨", amount: 300, isPaidBy: true },
      ],
    },
  ]);

  const categories = [
    "all",
    "Food & Dining",
    "Entertainment",
    "Transport",
    "Groceries",
    "Shopping",
    "Bills",
  ];

  const filteredExpenses = expenses.filter((expense) => {
    const matchesSearch =
      expense.title?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      expense.group?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      expense.paidBy?.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory =
      filterCategory === "all" || expense.category === filterCategory;
    return matchesSearch && matchesCategory;
  });

  const handleAddExpense = (newExpense) => {
    setExpenses([newExpense, ...expenses]);
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
            {filteredExpenses.length > 0 ? (
              filteredExpenses.map((expense) => (
                <ExpenseCard
                  key={expense.id}
                  expense={expense}
                  onClick={() => {
                    setSelectedExpense(expense);
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
        expense={selectedExpense}
        isOpen={isViewModalOpen}
        onClose={() => setIsViewModalOpen(false)}
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
        onAdd={handleAddExpense}
        currentUserId={currentUser?._id}
        // Optional: Pass custom mock data
        mockGroups={[
          { _id: "g1", name: "College Friends", members: ["u1", "u2", "u3"] },
          { _id: "g2", name: "Roommates", members: ["u1", "u4"] },
        ]}
        mockUsers={[
          { _id: "u1", name: "Dinesh", email: "dinesh@test.com", avatar: "🧑" },
          { _id: "u2", name: "Rahul", email: "rahul@test.com", avatar: "👨" },
          { _id: "u3", name: "Priya", email: "priya@test.com", avatar: "👩" },
          { _id: "u4", name: "Amit", email: "amit@test.com", avatar: "🧑" },
        ]}
      />
    </div>
  );
};

export default Expenses;
