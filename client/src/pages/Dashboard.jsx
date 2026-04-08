// import React, { useState, useEffect } from "react";
// import axios from "axios";
// import { FiUsers, FiPlus, FiTrendingUp, FiZap } from "react-icons/fi";
// import Header from "./Header";
// import { useNavigate } from "react-router-dom";

// const Dashboard = () => {
//   const [user, setUser] = useState(null);
//   const navigate = useNavigate();

//   // Sample groups data (replace with backend later)
//   const [groups] = useState([
//     {
//       id: 1,
//       name: "Weekend",
//       currency: "AUD",
//       members: 1,
//       description:
//         "hello world hello jdddddddddddddddddddddddddddddddddddddddddddddddddddddddddddd",
//     },
//     {
//       id: 2,
//       name: "basantaas",
//       currency: "AUD",
//       members: 1,
//       description: "hel nah",
//     },
//     {
//       id: 3,
//       name: "basanta karki",
//       currency: "AUD",
//       members: 4,
//       description: "hel its me basanta",
//     },
//   ]);

//   // ✅ Fetch logged-in user
//   useEffect(() => {
//     const fetchUser = async () => {
//       try {
//         const res = await axios.get("http://localhost:5000/api/auth/me", {
//           withCredentials: true,
//         });

//         console.log("USER FROM BACKEND:", res.data.user);

//         setUser(res.data.user);
//       } catch (error) {
//         console.error("Error fetching user:", error);
//       }
//     };

//     fetchUser();
//   }, []);

//   return (
//     <div className="min-h-screen bg-gray-50">
//       <Header />

//       {/* Main Content */}
//       <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
//         {/* Welcome Section */}
//         <div className="mb-8">
//           <h1 className="text-3xl font-bold text-gray-900">
//             Welcome, {user?.name || "User"}!
//           </h1>
//           <p className="mt-2 text-gray-600">
//             Manage your shared expenses and settle debts easily
//           </p>
//         </div>

//         {/* Action Buttons */}
//         <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
//           <button
//             onClick={() => navigate("/groups/create")}
//             className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 px-6 rounded-lg flex items-center justify-center gap-2 transition-colors cursor-pointer"
//           >
//             <FiPlus className="w-5 h-5" />
//             Create New Group
//           </button>
//           <button className="bg-white hover:bg-gray-50 text-gray-900 font-medium py-3 px-6 rounded-lg flex items-center justify-center gap-2 border border-gray-300 transition-colors">
//             <FiTrendingUp className="w-5 h-5" />
//             Add Expense
//           </button>
//           <button className="bg-white hover:bg-gray-50 text-gray-900 font-medium py-3 px-6 rounded-lg flex items-center justify-center gap-2 border border-gray-300 transition-colors">
//             <FiZap className="w-5 h-5" />
//             View Analytics
//           </button>
//         </div>

//         {/* Your Groups Section */}
//         <div className="mb-8">
//           <div className="flex justify-between items-center mb-6">
//             <h2 className="text-xl font-bold text-gray-900">Your Groups</h2>
//             <a
//               href="#"
//               className="text-blue-600 hover:text-blue-700 text-sm font-medium"
//             >
//               View All
//             </a>
//           </div>

//           {/* Groups Grid */}
//           {groups.length > 0 ? (
//             <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//               {groups.map((group) => (
//                 <div
//                   key={group.id}
//                   className="bg-white border border-gray-200 rounded-xl p-6 hover:shadow-lg transition-shadow"
//                 >
//                   <div className="flex justify-between items-start mb-3">
//                     <div>
//                       <h3 className="text-lg font-bold text-gray-900">
//                         {group.name}
//                       </h3>
//                       <p className="text-sm text-gray-600 mt-1">
//                         {group.members}{" "}
//                         {group.members === 1 ? "member" : "members"}
//                       </p>
//                     </div>
//                     <span className="text-xl font-bold text-blue-600">
//                       {group.currency}
//                     </span>
//                   </div>

//                   <p className="text-gray-600 text-sm mb-6 line-clamp-2">
//                     {group.description}
//                   </p>

//                   <button className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2.5 px-4 rounded-lg transition-colors">
//                     View Group
//                   </button>
//                 </div>
//               ))}
//             </div>
//           ) : (
//             <div className="bg-white border border-gray-200 rounded-xl p-12 text-center">
//               <div className="flex justify-center mb-4">
//                 <FiUsers className="w-12 h-12 text-gray-400" />
//               </div>
//               <h3 className="text-lg font-bold text-gray-900 mb-2">
//                 No groups yet
//               </h3>
//               <p className="text-gray-600 mb-6">
//                 Create your first group to start tracking expenses
//               </p>
//               <button className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-6 rounded-lg transition-colors">
//                 Create Group
//               </button>
//             </div>
//           )}
//         </div>

//         {/* Stats Cards */}
//         <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
//           <div className="bg-white border border-gray-200 rounded-xl p-6">
//             <p className="text-sm text-gray-600 mb-2">Total Groups</p>
//             <p className="text-3xl font-bold text-blue-600">{groups.length}</p>
//           </div>
//           <div className="bg-white border border-gray-200 rounded-xl p-6">
//             <p className="text-sm text-gray-600 mb-2">Total Members</p>
//             <p className="text-3xl font-bold text-green-600">
//               {groups.reduce((acc, group) => acc + group.members, 0)}
//             </p>
//           </div>
//           <div className="bg-white border border-gray-200 rounded-xl p-6">
//             <p className="text-sm text-gray-600 mb-2">Active Groups</p>
//             <p className="text-3xl font-bold text-purple-600">
//               {groups.length}
//             </p>
//           </div>
//         </div>
//       </main>
//     </div>
//   );
// };

// export default Dashboard;
