// import React, { useState } from "react";
// import { IoMdClose } from "react-icons/io";
// import { FaChevronDown } from "react-icons/fa";

// const AddExpenseModal = ({ isOpen, onClose, onAdd, groups, members }) => {
//   const [formData, setFormData] = useState({
//     description: "",
//     amount: "",
//     category: "Food & Dining",
//     group: groups[0]?.name || "",
//     paidBy: members[0]?.name || "",
//   });

//   const categories = [
//     "Food & Dining",
//     "Entertainment",
//     "Transport",
//     "Groceries",
//     "Shopping",
//     "Bills",
//     "Others",
//   ];

//   if (!isOpen) return null;

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     if (!formData.description || !formData.amount) return;

//     onAdd({
//       ...formData,
//       amount: parseFloat(formData.amount),
//       id: Date.now(),
//       date: "Today",
//       members: 1,
//       icon: "📦",
//       splitDetails: [
//         {
//           name: formData.paidBy,
//           avatar: "🧑",
//           amount: parseFloat(formData.amount),
//           isPaidBy: true,
//         },
//       ],
//     });
//     onClose();
//     setFormData({
//       description: "",
//       amount: "",
//       category: "Food & Dining",
//       group: groups[0]?.name,
//       paidBy: members[0]?.name,
//     });
//   };

//   return (
//     <>
//       <div
//         className="fixed inset-0 bg-black/70 backdrop-blur-sm z-40 flex items-center justify-center p-4"
//         onClick={onClose}
//       >
//         <div
//           className="bg-slate-900 border border-slate-800 rounded-xl w-full max-w-md shadow-2xl z-50 max-h-[90vh] overflow-y-auto"
//           onClick={(e) => e.stopPropagation()}
//         >
//           <div className="flex items-center justify-between p-4 border-b border-slate-800 sticky top-0 bg-slate-900 rounded-t-xl z-10">
//             <h2 className="text-lg font-bold text-white">Add Expense</h2>
//             <button
//               onClick={onClose}
//               className="p-1.5 text-slate-400 hover:text-white hover:bg-slate-800 rounded-lg transition-colors"
//             >
//               <IoMdClose className="w-4 h-4" />
//             </button>
//           </div>

//           <form onSubmit={handleSubmit} className="p-4 space-y-4">
//             <div>
//               <label className="block text-slate-300 text-sm font-medium mb-2">
//                 Description
//               </label>
//               <input
//                 type="text"
//                 value={formData.description}
//                 onChange={(e) =>
//                   setFormData({ ...formData, description: e.target.value })
//                 }
//                 placeholder="e.g. Lunch at restaurant"
//                 className="w-full px-3 py-2.5 bg-slate-800/50 border border-slate-700 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:border-blue-500 text-sm"
//                 required
//               />
//             </div>
//             <div>
//               <label className="block text-slate-300 text-sm font-medium mb-2">
//                 Amount (NPR)
//               </label>
//               <input
//                 type="number"
//                 value={formData.amount}
//                 onChange={(e) =>
//                   setFormData({ ...formData, amount: e.target.value })
//                 }
//                 placeholder="0.00"
//                 step="0.01"
//                 min="0"
//                 className="w-full px-3 py-2.5 bg-slate-800/50 border border-slate-700 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:border-blue-500 text-sm"
//                 required
//               />
//             </div>
//             <div>
//               <label className="block text-slate-300 text-sm font-medium mb-2">
//                 Category
//               </label>
//               <div className="relative">
//                 <select
//                   value={formData.category}
//                   onChange={(e) =>
//                     setFormData({ ...formData, category: e.target.value })
//                   }
//                   className="w-full px-3 py-2.5 bg-slate-800/50 border border-slate-700 rounded-lg text-white focus:outline-none focus:border-blue-500 text-sm appearance-none"
//                 >
//                   {categories.map((cat) => (
//                     <option key={cat} value={cat}>
//                       {cat}
//                     </option>
//                   ))}
//                 </select>
//                 <FaChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 w-4 h-4 pointer-events-none" />
//               </div>
//             </div>
//             <div>
//               <label className="block text-slate-300 text-sm font-medium mb-2">
//                 Group
//               </label>
//               <div className="relative">
//                 <select
//                   value={formData.group}
//                   onChange={(e) =>
//                     setFormData({ ...formData, group: e.target.value })
//                   }
//                   className="w-full px-3 py-2.5 bg-slate-800/50 border border-slate-700 rounded-lg text-white focus:outline-none focus:border-blue-500 text-sm appearance-none"
//                 >
//                   {groups.map((g) => (
//                     <option key={g.id} value={g.name}>
//                       {g.name}
//                     </option>
//                   ))}
//                 </select>
//                 <FaChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 w-4 h-4 pointer-events-none" />
//               </div>
//             </div>
//             <div>
//               <label className="block text-slate-300 text-sm font-medium mb-2">
//                 Paid By
//               </label>
//               <div className="relative">
//                 <select
//                   value={formData.paidBy}
//                   onChange={(e) =>
//                     setFormData({ ...formData, paidBy: e.target.value })
//                   }
//                   className="w-full px-3 py-2.5 bg-slate-800/50 border border-slate-700 rounded-lg text-white focus:outline-none focus:border-blue-500 text-sm appearance-none"
//                 >
//                   {members.map((m) => (
//                     <option key={m.id} value={m.name}>
//                       {m.name}
//                     </option>
//                   ))}
//                 </select>
//                 <FaChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 w-4 h-4 pointer-events-none" />
//               </div>
//             </div>

//             <div className="flex gap-3 pt-2 sticky bottom-0 bg-slate-900">
//               <button
//                 type="button"
//                 onClick={onClose}
//                 className="flex-1 px-4 py-2.5 bg-slate-800 hover:bg-slate-700 text-white rounded-lg text-sm font-medium border border-slate-700"
//               >
//                 Cancel
//               </button>
//               <button
//                 type="submit"
//                 className="flex-1 px-4 py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-sm font-medium"
//               >
//                 Add Expense
//               </button>
//             </div>
//           </form>
//         </div>
//       </div>
//     </>
//   );
// };

// export default AddExpenseModal;

import React, { useState, useEffect, useRef } from "react";
import { IoMdClose, IoMdSearch } from "react-icons/io";
import { FaChevronDown, FaUserPlus, FaUsers } from "react-icons/fa";
import { toast } from "react-toastify";

const AddExpenseModal = ({
  isOpen,
  onClose,
  onAdd,
  currentUserId,
  mockGroups,
  mockUsers,
}) => {
  const [formData, setFormData] = useState({
    description: "",
    amount: "",
    category: "Food & Dining",
    group: "",
    paidBy: "",
  });

  const [groups, setGroups] = useState(mockGroups || []);
  const [groupMembers, setGroupMembers] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [selectedUsers, setSelectedUsers] = useState([]);
  const [isSearching, setIsSearching] = useState(false);
  const searchTimeoutRef = useRef(null);

  const categories = [
    "Food & Dining",
    "Entertainment",
    "Transport",
    "Groceries",
    "Shopping",
    "Bills",
    "Others",
  ];

  // Mock data for demonstration
  const MOCK_USERS = mockUsers || [
    {
      _id: "user1",
      name: "Dinesh Karki",
      email: "dinesh@example.com",
      avatar: "🧑",
    },
    { _id: "user2", name: "Rahul", email: "rahul@example.com", avatar: "👨" },
    { _id: "user3", name: "Priya", email: "priya@example.com", avatar: "👩" },
    { _id: "user4", name: "Amit", email: "amit@example.com", avatar: "🧑" },
    { _id: "user5", name: "Neha", email: "neha@example.com", avatar: "👩" },
    { _id: "user6", name: "Vikram", email: "vikram@example.com", avatar: "👨" },
    { _id: "user7", name: "Sneha", email: "sneha@example.com", avatar: "👩" },
  ];

  const MOCK_GROUPS = mockGroups || [
    {
      _id: "group1",
      name: "College Friends",
      members: ["user1", "user2", "user3", "user4"],
    },
    { _id: "group2", name: "Roommates", members: ["user1", "user3", "user5"] },
    { _id: "group3", name: "Work Trip", members: ["user1", "user6"] },
  ];

  useEffect(() => {
    if (isOpen) {
      // Use mock data instead of API calls
      setGroups(MOCK_GROUPS);
      if (MOCK_GROUPS.length > 0) {
        // Prefer existing selected group if still available
        const nextGroupId =
          formData.group && MOCK_GROUPS.some((g) => g._id === formData.group)
            ? formData.group
            : MOCK_GROUPS[0]._id;

        setFormData((prev) => ({ ...prev, group: nextGroupId }));
        loadGroupMembers(nextGroupId);
      }
    }
  }, [isOpen]);

  // When current user id arrives after mount (or changes), sync Paid by if they're in the group
  useEffect(() => {
    if (!currentUserId || groupMembers.length === 0) return;
    const ids = groupMembers.map((m) => String(m._id ?? m.id));
    if (ids.includes(String(currentUserId))) {
      setFormData((prev) =>
        prev.paidBy ? prev : { ...prev, paidBy: currentUserId },
      );
    }
  }, [currentUserId, groupMembers]);

  // Load group members from mock data
  const loadGroupMembers = (groupId) => {
    const group = MOCK_GROUPS.find((g) => g._id === groupId);
    if (group) {
      const members = MOCK_USERS.filter((user) =>
        group.members.includes(user._id),
      );
      setGroupMembers(members);
      // Auto-select all group members
      setSelectedUsers(members);
      // Set paidBy to current user if they're a member
      const memberIds = members.map((m) => String(m._id ?? m.id));
      if (
        currentUserId &&
        memberIds.includes(String(currentUserId))
      ) {
        setFormData((prev) => ({ ...prev, paidBy: currentUserId }));
      } else if (members.length > 0) {
        setFormData((prev) => ({
          ...prev,
          paidBy: String(members[0]._id ?? members[0].id),
        }));
      }
    }
  };

  // Handle group change
  const handleGroupChange = (e) => {
    const groupId = e.target.value;
    setFormData((prev) => ({ ...prev, group: groupId }));
    loadGroupMembers(groupId);
  };

  // Search users from mock data with debounce
  useEffect(() => {
    if (searchTimeoutRef.current) {
      clearTimeout(searchTimeoutRef.current);
    }

    if (searchQuery.trim().length >= 2) {
      searchTimeoutRef.current = setTimeout(() => {
        setIsSearching(true);
        // Filter mock users by name or email
        const results = MOCK_USERS.filter(
          (user) =>
            (user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
              user.email.toLowerCase().includes(searchQuery.toLowerCase())) &&
            !selectedUsers.find((selected) => selected._id === user._id),
        );
        setSearchResults(results);
        setIsSearching(false);
      }, 300);
    } else {
      setSearchResults([]);
    }

    return () => {
      if (searchTimeoutRef.current) {
        clearTimeout(searchTimeoutRef.current);
      }
    };
  }, [searchQuery, selectedUsers]);

  // Toggle user selection
  const toggleUserSelection = (user) => {
    setSelectedUsers((prev) => {
      const exists = prev.find((u) => u._id === user._id);
      if (exists) {
        return prev.filter((u) => u._id !== user._id);
      } else {
        return [...prev, user];
      }
    });
    setSearchQuery("");
    setSearchResults([]);
  };

  // Remove user from selection
  const removeUser = (userId) => {
    setSelectedUsers((prev) => prev.filter((u) => u._id !== userId));
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();

    if (!formData.description || !formData.amount) {
      toast.warning("Please fill in all required fields");
      return;
    }

    if (selectedUsers.length === 0) {
      toast.warning("Please select at least one person to split with");
      return;
    }

    // Backend expects:
    // { title, amount, groupId, participants: [userId], paidBy, category }
    // Splits are calculated on the server.
    const paidBy = formData.paidBy || currentUserId;
    if (!paidBy) {
      toast.warning("Select who paid for this expense.");
      return;
    }

    const payload = {
      title: formData.description,
      amount: parseFloat(formData.amount),
      groupId: formData.group,
      participants: selectedUsers.map((u) => u._id),
      paidBy,
      category: formData.category,
    };

    onAdd(payload);

    // Reset form
    setFormData({
      description: "",
      amount: "",
      category: "Food & Dining",
      group: MOCK_GROUPS[0]?._id || "",
      paidBy: "",
    });
    setSelectedUsers([]);
    setSearchQuery("");
    onClose();
    toast.success("Expense submitted!");
  };

  // Helper to get category icon
  const getCategoryIcon = (category) => {
    const icons = {
      "Food & Dining": "🍽️",
      Entertainment: "🎬",
      Transport: "⛽",
      Groceries: "🛒",
      Shopping: "🛍️",
      Bills: "📄",
    };
    return icons[category] || "📦";
  };

  if (!isOpen) return null;

  return (
    <>
      <div
        className="fixed inset-0 bg-black/70 backdrop-blur-sm z-40 flex items-center justify-center p-4"
        onClick={onClose}
      >
        <div
          className="bg-slate-900 border border-slate-800 rounded-xl w-full max-w-lg shadow-2xl z-50 max-h-[90vh] overflow-y-auto"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header */}
          <div className="flex items-center justify-between p-4 border-b border-slate-800 sticky top-0 bg-slate-900 rounded-t-xl z-10">
            <div>
              <h2 className="text-lg font-bold text-white">Add New Expense</h2>
              <p className="text-slate-400 text-xs mt-1">
                Add and split an expense with your group members
              </p>
            </div>
            <button
              onClick={onClose}
              className="p-1.5 text-slate-400 hover:text-white hover:bg-slate-800 rounded-lg transition-colors"
            >
              <IoMdClose className="w-5 h-5" />
            </button>
          </div>

          <form onSubmit={handleSubmit} className="p-4 space-y-4">
            {/* Description */}
            <div>
              <label className="block text-slate-300 text-sm font-medium mb-2">
                Description
              </label>
              <input
                type="text"
                value={formData.description}
                onChange={(e) =>
                  setFormData({ ...formData, description: e.target.value })
                }
                placeholder="e.g. Lunch at restaurant"
                className="w-full px-3 py-2.5 bg-slate-800/50 border border-slate-700 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:border-blue-500 text-sm"
                required
              />
            </div>

            {/* Amount */}
            <div>
              <label className="block text-slate-300 text-sm font-medium mb-2">
                Amount (NPR)
              </label>
              <input
                type="number"
                value={formData.amount}
                onChange={(e) =>
                  setFormData({ ...formData, amount: e.target.value })
                }
                placeholder="0.00"
                step="0.01"
                min="0"
                className="w-full px-3 py-2.5 bg-slate-800/50 border border-slate-700 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:border-blue-500 text-sm"
                required
              />
            </div>

            {/* Category */}
            <div>
              <label className="block text-slate-300 text-sm font-medium mb-2">
                Category
              </label>
              <div className="relative">
                <select
                  value={formData.category}
                  onChange={(e) =>
                    setFormData({ ...formData, category: e.target.value })
                  }
                  className="w-full px-3 py-2.5 bg-slate-800/50 border border-slate-700 rounded-lg text-white focus:outline-none focus:border-blue-500 text-sm appearance-none"
                >
                  {categories.map((cat) => (
                    <option key={cat} value={cat}>
                      {cat}
                    </option>
                  ))}
                </select>
                <FaChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 w-4 h-4 pointer-events-none" />
              </div>
            </div>

            {/* Group */}
            <div>
              <label className="block text-slate-300 text-sm font-medium mb-2">
                Group
              </label>
              <div className="relative">
                <select
                  value={formData.group}
                  onChange={handleGroupChange}
                  className="w-full px-3 py-2.5 bg-slate-800/50 border border-slate-700 rounded-lg text-white focus:outline-none focus:border-blue-500 text-sm appearance-none"
                >
                  {groups.map((g) => (
                    <option key={g._id} value={g._id}>
                      {g.name}
                    </option>
                  ))}
                </select>
                <FaChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 w-4 h-4 pointer-events-none" />
              </div>
            </div>

            {/* Paid By */}
            <div>
              <label className="block text-slate-300 text-sm font-medium mb-2">
                Paid By
              </label>
              <div className="relative">
                <select
                  value={formData.paidBy}
                  onChange={(e) =>
                    setFormData({ ...formData, paidBy: e.target.value })
                  }
                  className="w-full px-3 py-2.5 bg-slate-800/50 border border-slate-700 rounded-lg text-white focus:outline-none focus:border-blue-500 text-sm appearance-none"
                >
                  {groupMembers.map((m) => (
                    <option key={m._id} value={m._id}>
                      {m.name}
                    </option>
                  ))}
                </select>
                <FaChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 w-4 h-4 pointer-events-none" />
              </div>
            </div>

            {/* Split With - Enhanced Search (Mock Data) */}
            <div>
              <label className="block text-slate-300 text-sm font-medium mb-2">
                Split With
                <span className="text-slate-400 text-xs ml-1">
                  ({selectedUsers.length} selected)
                </span>
              </label>

              {/* Search Input */}
              <div className="relative mb-3">
                <div className="relative">
                  <IoMdSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 w-4 h-4" />
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search by name or email..."
                    className="w-full pl-10 pr-3 py-2.5 bg-slate-800/50 border border-slate-700 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:border-blue-500 text-sm"
                  />
                </div>

                {/* Loading Indicator */}
                {isSearching && (
                  <div className="absolute right-3 top-1/2 -translate-y-1/2">
                    <div className="w-4 h-4 border-2 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
                  </div>
                )}

                {/* Search Results Dropdown */}
                {searchResults.length > 0 && (
                  <div className="absolute z-20 w-full mt-1 bg-slate-800 border border-slate-700 rounded-lg max-h-60 overflow-y-auto shadow-xl">
                    {searchResults.map((user) => (
                      <button
                        key={user._id}
                        type="button"
                        onClick={() => toggleUserSelection(user)}
                        className="w-full flex items-center gap-3 p-3 hover:bg-slate-700 transition-colors text-left border-b border-slate-700/50 last:border-0"
                      >
                        <div className="w-8 h-8 bg-linear-to-br from-blue-400 to-cyan-500 rounded-full flex items-center justify-center text-sm shrink-0">
                          {user.avatar || user.name.charAt(0).toUpperCase()}
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-white text-sm font-medium truncate">
                            {user.name}
                          </p>
                          <p className="text-slate-400 text-xs truncate">
                            {user.email}
                          </p>
                        </div>
                        <FaUserPlus className="text-blue-400 w-4 h-4" />
                      </button>
                    ))}
                  </div>
                )}

                {searchQuery.trim().length >= 2 &&
                  searchResults.length === 0 &&
                  !isSearching && (
                    <div className="absolute z-20 w-full mt-1 bg-slate-800 border border-slate-700 rounded-lg p-3 text-center text-slate-400 text-sm">
                      No users found
                    </div>
                  )}
              </div>

              {/* Selected Users List */}
              <div className="space-y-2 max-h-48 overflow-y-auto pr-1">
                {selectedUsers.length > 0 ? (
                  selectedUsers.map((user) => (
                    <div
                      key={user._id}
                      className="flex items-center justify-between p-3 bg-slate-800/50 border border-slate-700/50 rounded-lg"
                    >
                      <div className="flex items-center gap-3 flex-1 min-w-0">
                        <input
                          type="checkbox"
                          checked={true}
                          onChange={() => toggleUserSelection(user)}
                          className="w-4 h-4 rounded border-slate-600 bg-slate-700 text-blue-600 focus:ring-blue-500/20 cursor-pointer"
                        />
                        <div className="w-8 h-8 bg-linear-to-br from-blue-400 to-cyan-500 rounded-full flex items-center justify-center text-sm shrink-0">
                          {user.avatar || user.name.charAt(0).toUpperCase()}
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-white text-sm font-medium truncate">
                            {user.name}
                          </p>
                          <p className="text-slate-400 text-xs truncate">
                            {user.email}
                          </p>
                        </div>
                      </div>
                      <button
                        type="button"
                        onClick={() => removeUser(user._id)}
                        className="ml-2 p-1 text-slate-400 hover:text-red-400 transition-colors"
                      >
                        <IoMdClose className="w-4 h-4" />
                      </button>
                    </div>
                  ))
                ) : (
                  <div className="text-center py-8 text-slate-400 text-sm border border-dashed border-slate-700 rounded-lg">
                    <FaUsers className="w-8 h-8 mx-auto mb-2 opacity-50" />
                    <p>Search and select users to split with</p>
                  </div>
                )}
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-3 pt-2 sticky bottom-0 bg-slate-900">
              <button
                type="button"
                onClick={onClose}
                className="flex-1 px-4 py-2.5 bg-slate-800 hover:bg-slate-700 text-white rounded-lg text-sm font-medium border border-slate-700"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={
                  !formData.description ||
                  !formData.amount ||
                  selectedUsers.length === 0
                }
                className="flex-1 px-4 py-2.5 bg-blue-600 hover:bg-blue-700 disabled:bg-slate-700 disabled:text-slate-500 text-white rounded-lg text-sm font-medium"
              >
                Add Expense
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default AddExpenseModal;
