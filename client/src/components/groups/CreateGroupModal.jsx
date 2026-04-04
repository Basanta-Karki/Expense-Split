import React from "react";
import { FaCheck } from "react-icons/fa";
import { IoMdClose } from "react-icons/io";

const CreateGroupModal = ({
  isOpen,
  onClose,
  onCreate,
  groupName,
  setGroupName,
  selectedMembers,
  toggleMemberSelection,
  availableMembers,
}) => {
  if (!isOpen) return null;

  const handleCreate = () => {
    onCreate();
  };

  const handleClose = () => {
    onClose();
  };

  return (
    <>
      <div
        className="fixed inset-0 bg-slate-950/80 backdrop-blur-sm z-40 flex items-center justify-center p-4"
        onClick={handleClose}
      >
        <div
          className="bg-slate-900 border border-slate-800 rounded-2xl w-full max-w-lg shadow-2xl z-50"
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
              <label className="block text-sm font-medium text-slate-300 mb-3">
                Select Members
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {availableMembers.map((member) => (
                  <button
                    key={member.id}
                    onClick={() => toggleMemberSelection(member.id)}
                    className={`flex items-center gap-3 p-4 rounded-xl border transition-all duration-200 text-left ${
                      selectedMembers.includes(member.id)
                        ? "bg-blue-600/20 border-blue-500/50"
                        : "bg-slate-800/50 border-slate-700 hover:border-slate-600"
                    }`}
                  >
                    <span className="text-3xl">{member.avatar}</span>
                    <div className="flex-1 min-w-0">
                      <p className="text-white font-medium truncate">
                        {member.name}
                      </p>
                      <p className="text-slate-400 text-sm truncate">
                        {member.email}
                      </p>
                    </div>
                    {selectedMembers.includes(member.id) && (
                      <FaCheck className="w-5 h-5 text-blue-400 flex-shrink-0" />
                    )}
                  </button>
                ))}
              </div>
            </div>

            <p className="text-slate-400 text-sm">
              {selectedMembers.length} member(s) selected
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
              disabled={!groupName.trim() || selectedMembers.length === 0}
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
