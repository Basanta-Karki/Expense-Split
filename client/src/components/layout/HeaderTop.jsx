// import React from "react";
// import { FaBell, FaSearch } from "react-icons/fa";

// const HeaderTop = () => {
//   return (
//     <header className="bg-slate-900 border-b border-slate-800 p-4">
//       <div className="flex items-center justify-between">
//         <div className="flex-1 max-w-md">
//           <div className="relative">
//             <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-4 h-4" />
//             <input
//               type="text"
//               placeholder="Search..."
//               className="w-full pl-10 pr-4 py-2 bg-slate-800 border border-slate-700 rounded-lg text-sm focus:outline-none focus:border-blue-500"
//             />
//           </div>
//         </div>
//         <div className="flex items-center gap-4">
//           <button className="p-2 text-slate-400 hover:text-white transition-colors relative">
//             <FaBell className="w-5 h-5" />
//             <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
//           </button>
//           <div className="flex items-center gap-3">
//             <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-sm font-bold">
//               DK
//             </div>
//             <div className="hidden md:block">
//               <p className="text-sm font-medium">Dinesh kkki</p>
//               <p className="text-xs text-slate-400">Pro Member</p>
//             </div>
//           </div>
//         </div>
//       </div>
//     </header>
//   );
// };

// export default HeaderTop;

import React, { useContext } from "react";
import { FaBell, FaSearch } from "react-icons/fa";
import { AuthContext } from "../../context/AuthContext";

const HeaderTop = () => {
  const { user } = useContext(AuthContext);

  // Generate initials from name
  const initials = user?.name
    ? user.name
        .split(" ")
        .map((n) => n[0])
        .join("")
        .toUpperCase()
    : "U";

  // Profile image from UploadThing
  const profileImage = user?.profile
    ? `https://utfs.io/f/${user.profile}`
    : null;

  return (
    <header className="bg-slate-900 border-b border-slate-800 p-4">
      <div className="flex items-center justify-between">
        {/* Search */}
        <div className="flex-1 max-w-md">
          <div className="relative">
            <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-4 h-4" />
            <input
              type="text"
              placeholder="Search..."
              className="w-full pl-10 pr-4 py-2 bg-slate-800 border border-slate-700 rounded-lg text-sm focus:outline-none focus:border-blue-500"
            />
          </div>
        </div>

        {/* Right section */}
        <div className="flex items-center gap-4">
          {/* Notifications */}
          <button className="p-2 text-slate-400 hover:text-white transition-colors relative">
            <FaBell className="w-5 h-5" />
            <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
          </button>

          {/* Profile */}
          <div className="flex items-center gap-3">
            {/* Avatar */}
            <div className="w-8 h-8 rounded-full overflow-hidden bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-sm font-bold">
              {profileImage ? (
                <img
                  src={profileImage}
                  alt="profile"
                  className="w-full h-full object-cover"
                />
              ) : (
                <span className="text-white">{initials}</span>
              )}
            </div>

            {/* Name & Role */}
            <div className="hidden md:block">
              <p className="text-sm font-medium">{user?.name || "User"}</p>
              <p className="text-xs text-slate-400"> Member</p>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default HeaderTop;
