// import React, { useState } from "react";
// import Sidebar from "../components/Layout/Sidebar";
// import {
//   FaUser,
//   FaCamera,
//   FaSave,
//   FaLock,
//   FaEye,
//   FaEyeSlash,
// } from "react-icons/fa";
// import HeaderTop from "../components/layout/HeaderTop";
// import { toast } from "react-toastify";

// const Settings = () => {
//   const [searchQuery, setSearchQuery] = useState("");

//   // Profile form state
//   const [profileData, setProfileData] = useState({
//     fullName: "Dinesh Karki",
//     email: "dinesh@example.com",
//     profilePicture: null,
//   });

//   // Password form state
//   const [passwordData, setPasswordData] = useState({
//     currentPassword: "",
//     newPassword: "",
//     confirmPassword: "",
//   });

//   const [isSavingProfile, setIsSavingProfile] = useState(false);
//   const [isSavingPassword, setIsSavingPassword] = useState(false);
//   const [showCurrentPassword, setShowCurrentPassword] = useState(false);
//   const [showNewPassword, setShowNewPassword] = useState(false);
//   const [showConfirmPassword, setShowConfirmPassword] = useState(false);

//   // Profile handlers
//   const handleProfileChange = (e) => {
//     const { name, value } = e.target;
//     setProfileData((prev) => ({ ...prev, [name]: value }));
//   };

//   const handleProfilePictureChange = (e) => {
//     const file = e.target.files[0];
//     if (file) {
//       const reader = new FileReader();
//       reader.onloadend = () => {
//         setProfileData((prev) => ({ ...prev, profilePicture: reader.result }));
//       };
//       reader.readAsDataURL(file);
//     }
//   };

//   const handleSaveProfile = async (e) => {
//     e.preventDefault();
//     setIsSavingProfile(true);

//     // Simulate API call
//     setTimeout(() => {
//       setIsSavingProfile(false);
//       toast.success("Profile updated successfully!");
//     }, 1000);
//   };

//   // Password handlers
//   const handlePasswordChange = (e) => {
//     const { name, value } = e.target;
//     setPasswordData((prev) => ({ ...prev, [name]: value }));
//   };

//   const handleSavePassword = async (e) => {
//     e.preventDefault();

//     // Validation
//     if (passwordData.newPassword.length < 6) {
//       toast.error("New password must be at least 6 characters");
//       return;
//     }

//     if (passwordData.newPassword !== passwordData.confirmPassword) {
//       toast.error("New passwords do not match");
//       return;
//     }

//     if (!passwordData.currentPassword) {
//       toast.error("Please enter your current password");
//       return;
//     }

//     setIsSavingPassword(true);

//     // Simulate API call
//     setTimeout(() => {
//       setIsSavingPassword(false);
//       toast.success("Password changed successfully!");
//       // Reset password form
//       setPasswordData({
//         currentPassword: "",
//         newPassword: "",
//         confirmPassword: "",
//       });
//     }, 1000);
//   };

//   return (
//     <div className="flex h-screen bg-slate-950 text-white">
//       <Sidebar />
//       <main className="flex-1 overflow-y-auto">
//         <HeaderTop
//           searchQuery={searchQuery}
//           setSearchQuery={setSearchQuery}
//           title="Settings"
//         />

//         <div className="p-6 max-w-5xl">
//           {/* Page Header */}
//           <div className="mb-8">
//             <h1 className="text-3xl font-bold text-white mb-1">Settings</h1>
//             <p className="text-slate-400 text-sm">
//               Manage your account and preferences
//             </p>
//           </div>

//           {/* Profile Section */}
//           <div className="bg-slate-900/50 border border-slate-800 rounded-xl p-6 mb-6">
//             <h2 className="text-xl font-semibold text-white mb-6 flex items-center gap-2">
//               <FaUser className="text-blue-400" />
//               Profile
//             </h2>

//             {/* Profile Picture */}
//             <div className="flex items-start gap-6 mb-8 pb-8 border-b border-slate-800">
//               <div className="relative">
//                 <div className="w-20 h-20 bg-linear-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-3xl font-bold">
//                   {profileData.profilePicture ? (
//                     <img
//                       src={profileData.profilePicture}
//                       alt="Profile"
//                       className="w-full h-full rounded-full object-cover"
//                     />
//                   ) : (
//                     <FaUser className="text-white" />
//                   )}
//                 </div>
//                 <label className="absolute bottom-0 right-0 w-8 h-8 bg-blue-600 hover:bg-blue-700 rounded-full flex items-center justify-center cursor-pointer transition-colors">
//                   <FaCamera className="text-white text-xs" />
//                   <input
//                     type="file"
//                     accept="image/*"
//                     onChange={handleProfilePictureChange}
//                     className="hidden"
//                   />
//                 </label>
//               </div>
//               <div>
//                 <h3 className="text-lg font-semibold text-white mb-1">
//                   {profileData.fullName}
//                 </h3>
//                 <p className="text-slate-400 text-sm mb-3">
//                   {profileData.email}
//                 </p>
//                 <label className="inline-flex items-center px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded-lg text-sm font-medium cursor-pointer transition-colors">
//                   <FaCamera className="mr-2" />
//                   Change Profile Picture
//                   <input
//                     type="file"
//                     accept="image/*"
//                     onChange={handleProfilePictureChange}
//                     className="hidden"
//                   />
//                 </label>
//               </div>
//             </div>

//             {/* Profile Form Fields */}
//             <form onSubmit={handleSaveProfile} className="space-y-6">
//               <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//                 <div>
//                   <label className="block text-slate-300 text-sm font-medium mb-2">
//                     Full Name
//                   </label>
//                   <input
//                     type="text"
//                     name="fullName"
//                     value={profileData.fullName}
//                     onChange={handleProfileChange}
//                     className="w-full px-4 py-3 bg-slate-800/50 border border-slate-700 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all"
//                     placeholder="Enter your full name"
//                   />
//                 </div>

//                 <div>
//                   <label className="block text-slate-300 text-sm font-medium mb-2">
//                     Email
//                   </label>
//                   <input
//                     type="email"
//                     name="email"
//                     value={profileData.email}
//                     onChange={handleProfileChange}
//                     className="w-full px-4 py-3 bg-slate-800/50 border border-slate-700 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all"
//                     placeholder="Enter your email"
//                   />
//                 </div>
//               </div>

//               {/* Save Button */}
//               <div className="flex items-center gap-4 pt-4">
//                 <button
//                   type="submit"
//                   disabled={isSavingProfile}
//                   className="flex items-center gap-2 px-6 py-3 bg-blue-600 hover:bg-blue-700 disabled:bg-slate-700 text-white rounded-lg font-medium transition-all disabled:cursor-not-allowed"
//                 >
//                   <FaSave />
//                   {isSavingProfile ? "Saving..." : "Save Changes"}
//                 </button>
//                 <button
//                   type="button"
//                   onClick={() =>
//                     setProfileData({
//                       fullName: "Dinesh Karki",
//                       email: "dinesh@example.com",
//                       profilePicture: null,
//                     })
//                   }
//                   className="px-6 py-3 text-slate-400 hover:text-white transition-colors"
//                 >
//                   Cancel
//                 </button>
//               </div>
//             </form>
//           </div>

//           {/* Change Password Section */}
//           <div className="bg-slate-900/50 border border-slate-800 rounded-xl p-6 mb-6">
//             <h2 className="text-xl font-semibold text-white mb-6 flex items-center gap-2">
//               <FaLock className="text-blue-400" />
//               Change Password
//             </h2>

//             <form onSubmit={handleSavePassword} className="space-y-6">
//               <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//                 {/* Current Password */}
//                 <div>
//                   <label className="block text-slate-300 text-sm font-medium mb-2">
//                     Current Password
//                   </label>
//                   <div className="relative">
//                     <input
//                       type={showCurrentPassword ? "text" : "password"}
//                       name="currentPassword"
//                       value={passwordData.currentPassword}
//                       onChange={handlePasswordChange}
//                       className="w-full px-4 py-3 pr-10 bg-slate-800/50 border border-slate-700 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all"
//                       placeholder="Enter current password"
//                     />
//                     <button
//                       type="button"
//                       onClick={() =>
//                         setShowCurrentPassword(!showCurrentPassword)
//                       }
//                       className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-white transition-colors"
//                     >
//                       {showCurrentPassword ? <FaEyeSlash /> : <FaEye />}
//                     </button>
//                   </div>
//                 </div>

//                 {/* New Password */}
//                 <div>
//                   <label className="block text-slate-300 text-sm font-medium mb-2">
//                     New Password
//                   </label>
//                   <div className="relative">
//                     <input
//                       type={showNewPassword ? "text" : "password"}
//                       name="newPassword"
//                       value={passwordData.newPassword}
//                       onChange={handlePasswordChange}
//                       className="w-full px-4 py-3 pr-10 bg-slate-800/50 border border-slate-700 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all"
//                       placeholder="Enter new password"
//                     />
//                     <button
//                       type="button"
//                       onClick={() => setShowNewPassword(!showNewPassword)}
//                       className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-white transition-colors"
//                     >
//                       {showNewPassword ? <FaEyeSlash /> : <FaEye />}
//                     </button>
//                   </div>
//                   <p className="text-slate-400 text-xs mt-1">
//                     Must be at least 6 characters
//                   </p>
//                 </div>
//               </div>

//               {/* Confirm Password */}
//               <div>
//                 <label className="block text-slate-300 text-sm font-medium mb-2">
//                   Confirm New Password
//                 </label>
//                 <div className="relative">
//                   <input
//                     type={showConfirmPassword ? "text" : "password"}
//                     name="confirmPassword"
//                     value={passwordData.confirmPassword}
//                     onChange={handlePasswordChange}
//                     className="w-full px-4 py-3 pr-10 bg-slate-800/50 border border-slate-700 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all"
//                     placeholder="Confirm new password"
//                   />
//                   <button
//                     type="button"
//                     onClick={() => setShowConfirmPassword(!showConfirmPassword)}
//                     className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-white transition-colors"
//                   >
//                     {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
//                   </button>
//                 </div>
//               </div>

//               {/* Password Strength Indicator */}
//               {passwordData.newPassword && (
//                 <div className="space-y-1">
//                   <div className="flex items-center gap-2">
//                     <span className="text-slate-400 text-xs">Strength:</span>
//                     <div className="flex-1 h-2 bg-slate-700 rounded-full overflow-hidden">
//                       <div
//                         className={`h-full transition-all ${
//                           passwordData.newPassword.length < 6
//                             ? "w-1/4 bg-red-500"
//                             : passwordData.newPassword.length < 10
//                               ? "w-2/4 bg-yellow-500"
//                               : "w-full bg-green-500"
//                         }`}
//                       />
//                     </div>
//                   </div>
//                   <p className="text-slate-400 text-xs">
//                     {passwordData.newPassword.length < 6
//                       ? "Weak"
//                       : passwordData.newPassword.length < 10
//                         ? "Medium"
//                         : "Strong"}
//                   </p>
//                 </div>
//               )}

//               {/* Save Button */}
//               <div className="flex items-center gap-4 pt-4">
//                 <button
//                   type="submit"
//                   disabled={isSavingPassword}
//                   className="flex items-center gap-2 px-6 py-3 bg-blue-600 hover:bg-blue-700 disabled:bg-slate-700 text-white rounded-lg font-medium transition-all disabled:cursor-not-allowed"
//                 >
//                   <FaLock />
//                   {isSavingPassword ? "Updating..." : "Update Password"}
//                 </button>
//                 <button
//                   type="button"
//                   onClick={() =>
//                     setPasswordData({
//                       currentPassword: "",
//                       newPassword: "",
//                       confirmPassword: "",
//                     })
//                   }
//                   className="px-6 py-3 text-slate-400 hover:text-white transition-colors"
//                 >
//                   Cancel
//                 </button>
//               </div>
//             </form>
//           </div>

//           {/* Additional Settings Sections */}
//           <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//             {/* Notifications */}
//             <div className="bg-slate-900/50 border border-slate-800 rounded-xl p-6">
//               <h3 className="text-lg font-semibold text-white mb-4">
//                 Notifications
//               </h3>
//               <div className="space-y-3">
//                 <label className="flex items-center justify-between cursor-pointer">
//                   <span className="text-slate-300">Email Notifications</span>
//                   <input
//                     type="checkbox"
//                     className="w-5 h-5 rounded border-slate-600 bg-slate-800 text-blue-600 focus:ring-blue-500/20"
//                     defaultChecked
//                   />
//                 </label>
//                 <label className="flex items-center justify-between cursor-pointer">
//                   <span className="text-slate-300">Push Notifications</span>
//                   <input
//                     type="checkbox"
//                     className="w-5 h-5 rounded border-slate-600 bg-slate-800 text-blue-600 focus:ring-blue-500/20"
//                   />
//                 </label>
//               </div>
//             </div>

//             {/* Privacy */}
//             <div className="bg-slate-900/50 border border-slate-800 rounded-xl p-6">
//               <h3 className="text-lg font-semibold text-white mb-4">Privacy</h3>
//               <div className="space-y-3">
//                 <label className="flex items-center justify-between cursor-pointer">
//                   <span className="text-slate-300">Public Profile</span>
//                   <input
//                     type="checkbox"
//                     className="w-5 h-5 rounded border-slate-600 bg-slate-800 text-blue-600 focus:ring-blue-500/20"
//                     defaultChecked
//                   />
//                 </label>
//                 <label className="flex items-center justify-between cursor-pointer">
//                   <span className="text-slate-300">Show Email</span>
//                   <input
//                     type="checkbox"
//                     className="w-5 h-5 rounded border-slate-600 bg-slate-800 text-blue-600 focus:ring-blue-500/20"
//                   />
//                 </label>
//               </div>
//             </div>
//           </div>
//         </div>
//       </main>
//     </div>
//   );
// };

// export default Settings;
