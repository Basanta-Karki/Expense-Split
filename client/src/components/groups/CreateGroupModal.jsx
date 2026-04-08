import React, { useEffect, useState } from "react";
import { FaCheck, FaUserPlus } from "react-icons/fa";
import { IoMdClose, IoMdSearch } from "react-icons/io";
import { useSearchUsersQuery } from "../../hooks/users/useUsersApi";

const CreateGroupModal = ({
  isOpen,
  onClose,
  onCreate,
  groupName,
  setGroupName,
  selectedMembers,
  onAddMember,
  onRemoveMember,
}) => {
  const [search, setSearch] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");

  useEffect(() => {
    const t = setTimeout(() => setDebouncedSearch(search.trim()), 300);
    return () => clearTimeout(t);
  }, [search]);

  const { data, isFetching } = useSearchUsersQuery(debouncedSearch);
  const searchResults = data?.users ?? [];

  useEffect(() => {
    if (!isOpen) {
      setSearch("");
      setDebouncedSearch("");
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const handleCreate = () => {
    onCreate();
  };

  const handleClose = () => {
    onClose();
  };

  const handlePickUser = (user) => {
    onAddMember({
      _id: user._id,
      name: user.name,
      email: user.email,
    });
    setSearch("");
    setDebouncedSearch("");
  };

  const selectedIds = new Set(selectedMembers.map((m) => m._id));

  return (
    <>
      <div
        className="fixed inset-0 bg-slate-950/80 backdrop-blur-sm z-40 flex items-center justify-center p-4"
        onClick={handleClose}
      >
        <div
          className="bg-slate-900 border border-slate-800 rounded-2xl w-full max-w-lg shadow-2xl z-50 max-h-[90vh] overflow-y-auto"
          onClick={(e) => e.stopPropagation()}
        >
          <div className="flex items-center justify-between p-6 border-b border-slate-800">
            <h2 className="text-2xl font-bold text-white">Create New Group</h2>
            <button
              onClick={handleClose}
              className="p-2 text-slate-400 hover:text-white hover:bg-slate-800 rounded-lg transition-colors"
            >
              <IoMdClose className="w-6 h-6" />
            </button>
          </div>

          <div className="p-6 space-y-6">
            <div>
              <label className="block text-sm font-medium text-slate-300 mb-2">
                Group Name
              </label>
              <input
                type="text"
                value={groupName}
                onChange={(e) => setGroupName(e.target.value)}
                placeholder="e.g., Weekend Trip, Office Lunch"
                className="w-full px-4 py-3 bg-slate-800/50 border border-slate-700 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all"
                autoFocus
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-300 mb-2">
                Add members
              </label>
              <p className="text-slate-500 text-xs mb-2">
                Search by name or email (min. 2 characters). Your account is
                excluded from results.
              </p>
              <div className="relative">
                <IoMdSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 w-5 h-5" />
                <input
                  type="text"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  placeholder="Search users..."
                  className="w-full pl-10 pr-3 py-3 bg-slate-800/50 border border-slate-700 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:border-blue-500 text-sm"
                />
                {isFetching && debouncedSearch.length >= 2 && (
                  <div className="absolute right-3 top-1/2 -translate-y-1/2">
                    <div className="w-4 h-4 border-2 border-blue-500 border-t-transparent rounded-full animate-spin" />
                  </div>
                )}
              </div>

              {debouncedSearch.length >= 2 && searchResults.length > 0 && (
                <div className="mt-2 bg-slate-800 border border-slate-700 rounded-lg max-h-48 overflow-y-auto shadow-xl">
                  {searchResults.map((user) => (
                    <button
                      key={user._id}
                      type="button"
                      disabled={selectedIds.has(user._id)}
                      onClick={() => handlePickUser(user)}
                      className="w-full flex items-center gap-3 p-3 hover:bg-slate-700 transition-colors text-left border-b border-slate-700/50 last:border-0 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      <div className="w-9 h-9 rounded-full bg-linear-to-br from-blue-400 to-cyan-500 flex items-center justify-center text-sm shrink-0 text-white font-medium">
                        {user.name?.charAt(0)?.toUpperCase() || "?"}
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-white text-sm font-medium truncate">
                          {user.name}
                        </p>
                        <p className="text-slate-400 text-xs truncate">
                          {user.email}
                        </p>
                      </div>
                      {selectedIds.has(user._id) ? (
                        <FaCheck className="w-4 h-4 text-blue-400 shrink-0" />
                      ) : (
                        <FaUserPlus className="w-4 h-4 text-blue-400 shrink-0" />
                      )}
                    </button>
                  ))}
                </div>
              )}

              {debouncedSearch.length >= 2 &&
                !isFetching &&
                searchResults.length === 0 && (
                  <p className="text-slate-500 text-sm mt-2">No users found</p>
                )}
            </div>

            {selectedMembers.length > 0 && (
              <div>
                <p className="text-sm font-medium text-slate-300 mb-2">
                  Selected ({selectedMembers.length})
                </p>
                <div className="flex flex-wrap gap-2">
                  {selectedMembers.map((m) => (
                    <span
                      key={m._id}
                      className="inline-flex items-center gap-2 pl-3 pr-2 py-1.5 bg-slate-800/80 border border-slate-700 rounded-full text-sm text-white"
                    >
                      <span className="truncate max-w-[140px]">{m.name}</span>
                      <button
                        type="button"
                        onClick={() => onRemoveMember(m._id)}
                        className="p-0.5 text-slate-400 hover:text-red-400 rounded"
                        aria-label={`Remove ${m.name}`}
                      >
                        <IoMdClose className="w-4 h-4" />
                      </button>
                    </span>
                  ))}
                </div>
              </div>
            )}

            <p className="text-slate-400 text-sm">
              {selectedMembers.length} member(s) will be invited (you are added
              automatically).
            </p>
          </div>

          <div className="flex items-center justify-end gap-3 p-6 border-t border-slate-800">
            <button
              onClick={handleClose}
              className="px-6 py-2.5 bg-slate-800 hover:bg-slate-700 text-white rounded-lg font-medium transition-all border border-slate-700"
            >
              Cancel
            </button>
            <button
              onClick={handleCreate}
              disabled={!groupName.trim()}
              className="px-6 py-2.5 bg-blue-600 hover:bg-blue-700 disabled:bg-slate-700 disabled:text-slate-500 text-white rounded-lg font-medium transition-all disabled:cursor-not-allowed"
            >
              Create Group
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default CreateGroupModal;
