import React, { useMemo, useState } from "react";
import Sidebar from "./Layout/Sidebar";
import HeaderTop from "./layout/HeaderTop";
import StatsGrid from "./Dashboard/StatsGrid";
import ChartsSection from "./Dashboard/ChartsSection";
import GroupSection from "./groups/GroupSection";
import CreateGroupModal from "./groups/CreateGroupModal";
import GroupDetailModal from "./Dashboard/GroupDetailModal";
import { toast } from "react-toastify";
import { useCreateGroupApi, useMyGroupsQuery } from "../hooks/groups/useGroupsApi";

const ExpenseDashboard = () => {
  const [viewMode, setViewMode] = useState("cards");
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [selectedGroup, setSelectedGroup] = useState(null);
  const [isDetailModalOpen, setIsDetailModalOpen] = useState(false);
  const [groupName, setGroupName] = useState("");
  const [selectedMembers, setSelectedMembers] = useState([]);

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

  const { data: myGroupsData } = useMyGroupsQuery();
  const createGroupApi = useCreateGroupApi();

  const groups = useMemo(() => {
    const raw = myGroupsData?.groups || [];

    // Map backend groups -> existing UI card shape (placeholder totals until you add group analytics endpoints)
    return raw.map((g) => {
      const membersArr = g.members || [];
      const memberDetails = membersArr.map((m, idx) => ({
        id: m._id || String(idx),
        name: m.name || "Member",
        avatar: "🧑",
      }));

      const memberSettlements = membersArr.map((m) => ({
        name: m.name || "Member",
        email: m.email || "",
        avatar: "🧑",
        balance: 0,
      }));

      return {
        id: g._id,
        name: g.name,
        totalExpenses: 0,
        youOwe: 0,
        youAreOwed: 0,
        members: membersArr.length,
        perPerson: 0,
        memberDetails,
        memberSettlements,
        recentExpenses: [],
      };
    });
  }, [myGroupsData]);

  const addMember = (user) => {
    setSelectedMembers((prev) =>
      prev.some((m) => m._id === user._id) ? prev : [...prev, user],
    );
  };

  const removeMember = (userId) => {
    setSelectedMembers((prev) => prev.filter((m) => m._id !== userId));
  };

  const stats = [
    {
      label: "Total Groups",
      value: String(groups.length),
      subtext: "Active expense groups",
      color: "text-green-400",
    },
    {
      label: "Total Spent",
      value: "NPR7,245",
      subtext: "This month",
      color: "text-green-400",
    },
    {
      label: "You Owe",
      value: "NPR1,250",
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

  const handleCreateGroup = async () => {
    try {
      const res = await createGroupApi.mutateAsync({
        name: groupName,
        members: selectedMembers.map((m) => m._id),
      });

      const createdId = res?.group?._id;
      if (createdId) localStorage.setItem("activeGroupId", createdId);

      toast.success("Group created");
      setIsCreateModalOpen(false);
      setGroupName("");
      setSelectedMembers([]);
    } catch (e) {
      toast.error(e?.response?.data?.message || e?.message || "Create group failed");
    }
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
        onAddMember={addMember}
        onRemoveMember={removeMember}
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
