import React, { useState } from "react";
import Sidebar from "./Layout/Sidebar";
import HeaderTop from "./layout/HeaderTop";
import StatsGrid from "./Dashboard/StatsGrid";
import ChartsSection from "./Dashboard/ChartsSection";
import GroupSection from "./Groups/GroupSection";
import CreateGroupModal from "./Groups/CreateGroupModal";
import GroupDetailModal from "./Dashboard/GroupDetailModal";

const ExpenseDashboard = () => {
  const [viewMode, setViewMode] = useState("cards");
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [selectedGroup, setSelectedGroup] = useState(null);
  const [isDetailModalOpen, setIsDetailModalOpen] = useState(false);
  const [groupName, setGroupName] = useState("");
  const [selectedMembers, setSelectedMembers] = useState([1]);

  const availableMembers = [
    { id: 1, name: "Dinesh Karki", email: "dinesh@example.com", avatar: "🧑" },
    { id: 2, name: "Rahul", email: "rahul@example.com", avatar: "👨" },
    { id: 3, name: "Priya", email: "priya@example.com", avatar: "👩" },
    { id: 4, name: "Amit", email: "amit@example.com", avatar: "🧑" },
    { id: 5, name: "Neha", email: "neha@example.com", avatar: "👩" },
  ];

  const expenseTrendsData = [
    { name: "Week 1", amount: 750 },
    { name: "Week 2", amount: 1450 },
    { name: "Week 3", amount: 1100 },
    { name: "Week 4", amount: 2000 },
    { name: "Week 5", amount: 2400 },
    { name: "Week 6", amount: 2800 },
    { name: "Week 7", amount: 2100 },
  ];

  const categoryData = [
    { name: "Food & Dining", value: 4500, color: "#06b6d4" },
    { name: "Transport", value: 1500, color: "#8b5cf6" },
    { name: "Entertainment", value: 2800, color: "#10b981" },
    { name: "Others", value: 1200, color: "#f59e0b" },
  ];

  const groups = [
    {
      id: 1,
      name: "College Friends",
      totalExpenses: 2945,
      youOwe: 450,
      youAreOwed: 0,
      members: 4,
      perPerson: 736,
      memberDetails: [
        { id: 1, name: "Dinesh Karki", avatar: "🧑‍" },
        { id: 2, name: "Rahul", avatar: "👨" },
        { id: 3, name: "Priya", avatar: "👩" },
        { id: 4, name: "Amit", avatar: "🧑" },
      ],
      memberSettlements: [
        {
          name: "Dinesh Karki",
          email: "dinesh@example.com",
          avatar: "🧑",
          balance: -450,
        },
        {
          name: "Rahul",
          email: "rahul@example.com",
          avatar: "👨",
          balance: 200,
        },
        {
          name: "Priya",
          email: "priya@example.com",
          avatar: "👩",
          balance: 150,
        },
        { name: "Amit", email: "amit@example.com", avatar: "🧑", balance: 100 },
      ],
      recentExpenses: [
        {
          title: "Lunch at Pizza Place",
          amount: 450,
          paidBy: "Dinesh Karki",
          date: "Today",
        },
        {
          title: "Movie tickets",
          amount: 600,
          paidBy: "Rahul",
          date: "Yesterday",
        },
      ],
    },
    {
      id: 2,
      name: "Roommates",
      totalExpenses: 1200,
      youOwe: 0,
      youAreOwed: 400,
      members: 4,
      perPerson: 300,
      memberDetails: [
        { id: 1, name: "Dinesh Karki", avatar: "🧑" },
        { id: 2, name: "Priya", avatar: "👩" },
        { id: 3, name: "Amit", avatar: "🧑" },
        { id: 4, name: "Neha", avatar: "👩" },
      ],
      memberSettlements: [
        {
          name: "Dinesh Karki",
          email: "dinesh@example.com",
          avatar: "🧑‍",
          balance: 400,
        },
        {
          name: "Priya",
          email: "priya@example.com",
          avatar: "👩",
          balance: -100,
        },
        {
          name: "Amit",
          email: "amit@example.com",
          avatar: "🧑",
          balance: -150,
        },
        {
          name: "Neha",
          email: "neha@example.com",
          avatar: "👩",
          balance: -150,
        },
      ],
      recentExpenses: [
        {
          title: "Groceries",
          amount: 1200,
          paidBy: "Priya",
          date: "2 days ago",
        },
      ],
    },
    {
      id: 3,
      name: "Work Trip",
      totalExpenses: 3200,
      youOwe: 800,
      youAreOwed: 200,
      members: 2,
      perPerson: 1600,
      memberDetails: [
        { id: 1, name: "Dinesh Karki", avatar: "🧑‍" },
        { id: 2, name: "Neha", avatar: "👩" },
      ],
      memberSettlements: [
        {
          name: "Dinesh Karki",
          email: "dinesh@example.com",
          avatar: "🧑‍",
          balance: 750,
        },
        {
          name: "Neha",
          email: "neha@example.com",
          avatar: "👩",
          balance: -750,
        },
      ],
      recentExpenses: [
        {
          title: "Petrol for trip",
          amount: 1500,
          paidBy: "Dinesh Karki",
          date: "3 days ago",
        },
      ],
    },
  ];

  const stats = [
    {
      label: "Total Groups",
      value: "3",
      subtext: "Active expense groups",
      color: "text-green-400",
    },
    {
      label: "Total Spent",
      value: "₹7,245",
      subtext: "This month",
      color: "text-green-400",
    },
    {
      label: "You Owe",
      value: "₹1,250",
      subtext: "To settle balances",
      color: "text-red-400",
    },
    {
      label: "Members",
      value: "12",
      subtext: "Across all groups",
      color: "text-green-400",
    },
  ];

  const toggleMemberSelection = (memberId) => {
    setSelectedMembers((prev) =>
      prev.includes(memberId)
        ? prev.filter((id) => id !== memberId)
        : [...prev, memberId],
    );
  };

  const handleCreateGroup = () => {
    console.log("Creating group:", groupName, "with members:", selectedMembers);
    setIsCreateModalOpen(false);
    setGroupName("");
    setSelectedMembers([1]);
  };

  const handleViewDetails = (group) => {
    setSelectedGroup(group);
    setIsDetailModalOpen(true);
  };

  const handleCloseDetailModal = () => {
    setIsDetailModalOpen(false);
    setTimeout(() => setSelectedGroup(null), 300);
  };

  return (
    <div className="flex h-screen bg-slate-950 text-white">
      <Sidebar />

      <main className="flex-1 overflow-y-auto">
        <HeaderTop />

        <div className="p-6 space-y-6">
          <div className="bg-linear-to-r from-blue-600 to-blue-700 rounded-lg p-6">
            <h2 className="text-2xl font-bold mb-1">Welcome back, Dinesh!</h2>
            <p className="text-blue-100 text-sm">
              Track shared expenses with smart calculations and AI-powered
              insights
            </p>
          </div>

          <StatsGrid stats={stats} />

          <ChartsSection
            expenseTrendsData={expenseTrendsData}
            categoryData={categoryData}
          />

          <GroupSection
            viewMode={viewMode}
            setViewMode={setViewMode}
            groups={groups}
            onOpenCreateModal={() => setIsCreateModalOpen(true)}
            onViewDetails={handleViewDetails}
          />
        </div>
      </main>

      <CreateGroupModal
        isOpen={isCreateModalOpen}
        onClose={() => setIsCreateModalOpen(false)}
        onCreate={handleCreateGroup}
        groupName={groupName}
        setGroupName={setGroupName}
        selectedMembers={selectedMembers}
        toggleMemberSelection={toggleMemberSelection}
        availableMembers={availableMembers}
      />

      <GroupDetailModal
        group={selectedGroup}
        isOpen={isDetailModalOpen}
        onClose={handleCloseDetailModal}
      />
    </div>
  );
};

export default ExpenseDashboard;
