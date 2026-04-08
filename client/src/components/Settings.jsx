import React, { useState, useContext, useEffect } from "react";
import Sidebar from "../components/Layout/Sidebar";
import {
  FaUser,
  FaCamera,
  FaSave,
  FaLock,
  FaEye,
  FaEyeSlash,
  FaTrash,
} from "react-icons/fa";
import HeaderTop from "../components/layout/HeaderTop";
import { toast } from "react-toastify";
import axios from "axios";
import { AuthContext } from "../context/AuthContext";
import { generateUploadButton } from "@uploadthing/react";
import api, { backendUrl } from "../api/api";

const UploadButton = generateUploadButton({
  url: `${backendUrl}/api/uploadthing`,
});

const Settings = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const { user } = useContext(AuthContext);

  // Profile form state
  const [profileData, setProfileData] = useState({
    fullName: user?.name || "",
    email: user?.email || "",
  });

  // Password form state
  const [passwordData, setPasswordData] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  // UI states
  const [isSavingProfile, setIsSavingProfile] = useState(false);
  const [isSavingPassword, setIsSavingPassword] = useState(false);
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [profileImage, setProfileImage] = useState(null);
  const [isUploading, setIsUploading] = useState(false);

  // Initialize profile image from user context
  useEffect(() => {
    console.log("USER OBJECT:", user);
    if (user?.profile) {
      setProfileImage(`https://utfs.io/f/${user.profile}`);
    }
  }, [user]);

  // Profile handlers
  const handleProfileChange = (e) => {
    const { name, value } = e.target;
    setProfileData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSaveProfile = async (e) => {
    e.preventDefault();
    setIsSavingProfile(true);

    try {
      await api.put(
        "/api/auth/profile",
        {
          name: profileData.fullName,
          email: profileData.email,
        },
        {
          withCredentials: true,
          headers: { "Content-Type": "application/json" },
        },
      );
      toast.success("Profile updated successfully!");
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to update profile");
    } finally {
      setIsSavingProfile(false);
    }
  };

  // Password handlers
  const handlePasswordChange = (e) => {
    const { name, value } = e.target;
    setPasswordData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSavePassword = async (e) => {
    e.preventDefault();

    if (passwordData.newPassword.length < 6) {
      toast.error("New password must be at least 6 characters");
      return;
    }

    if (passwordData.newPassword !== passwordData.confirmPassword) {
      toast.error("New passwords do not match");
      return;
    }

    if (!passwordData.currentPassword) {
      toast.error("Please enter your current password");
      return;
    }

    setIsSavingPassword(true);

    try {
      const response = await api.put(
        "/api/auth/update-password",
        {
          currentPassword: passwordData.currentPassword,
          newPassword: passwordData.newPassword,
          confirmPassword: passwordData.confirmPassword,
        },
        {
          withCredentials: true,
          headers: { "Content-Type": "application/json" },
        },
      );

      if (response.data.success) {
        toast.success("Password changed successfully!");
        setPasswordData({
          currentPassword: "",
          newPassword: "",
          confirmPassword: "",
        });
      }
    } catch (error) {
      const message =
        error.response?.data?.message ||
        error.message ||
        "Failed to change password";
      toast.error(message);
    } finally {
      setIsSavingPassword(false);
    }
  };

  const handleRemoveImage = () => {
    setProfileImage(null);
    toast.info("Profile picture removed");
  };

  const getPasswordStrength = (password) => {
    if (password.length < 6)
      return { width: "w-1/4", color: "bg-red-500", label: "Weak" };
    if (password.length < 10)
      return { width: "w-2/4", color: "bg-yellow-500", label: "Medium" };
    return { width: "w-full", color: "bg-green-500", label: "Strong" };
  };

  return (
    <div className="flex h-screen bg-slate-950 text-white">
      <Sidebar />
      <main className="flex-1 overflow-y-auto">
        <HeaderTop
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          title="Settings"
        />

        <div className="p-6 max-w-5xl mx-auto">
          {/* Page Header */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-white mb-1">Settings</h1>
            <p className="text-slate-400 text-sm">
              Manage your account and preferences
            </p>
          </div>

          {/* Profile Section */}
          <div className="bg-slate-900/50 border border-slate-800 rounded-2xl p-6 mb-6 backdrop-blur-sm">
            <h2 className="text-xl font-semibold text-white mb-6 flex items-center gap-2">
              <FaUser className="text-blue-400" />
              Profile
            </h2>

            {/* Profile Picture Upload - Minimal Button Below Image */}
            <div className="flex flex-col items-center mb-8 pb-8 border-b border-slate-800">
              {/* Profile Image Container */}
              <div className="relative group mb-4">
                <div className="relative w-32 h-32 rounded-full overflow-hidden bg-linear-to-br from-blue-600/20 to-purple-600/20 border-2 border-slate-700 ring-4 ring-slate-800/50">
                  {profileImage ? (
                    <>
                      <img
                        src={profileImage}
                        alt="Profile"
                        className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                      />
                      {/* Hover Overlay - Remove Option */}
                      <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex items-center justify-center">
                        <button
                          onClick={handleRemoveImage}
                          className="p-2 bg-red-600/90 hover:bg-red-700 rounded-full transition-colors"
                          title="Remove image"
                        >
                          <FaTrash className="text-white text-sm" />
                        </button>
                      </div>
                    </>
                  ) : (
                    <div className="w-full h-full flex flex-col items-center justify-center text-slate-400">
                      <FaUser className="text-4xl mb-1 opacity-50" />
                      <span className="text-xs">No image</span>
                    </div>
                  )}
                </div>
              </div>

              {/* Minimal Upload Button - BELOW Image */}
              <div className="flex flex-col items-center gap-2">
                <UploadButton
                  endpoint="profileUploader"
                  input={{ user_id: user?._id }}
                  headers={{ "user-id": user?._id }}
                  onUploadBegin={() => setIsUploading(true)}
                  onClientUploadComplete={(res) => {
                    setIsUploading(false);
                    const filekey = res[0]?.key;
                    if (filekey) {
                      setProfileImage(`https://utfs.io/f/${filekey}`);
                      toast.success("Profile picture updated!");
                    }
                  }}
                  onUploadError={(error) => {
                    setIsUploading(false);
                    console.error(error);
                    toast.error(error.message || "Upload failed");
                  }}
                  className="ut-button bg-transparent! !hover:bg-slate-800 border-0! p-0! shadow-none!"
                  content={{
                    button: isUploading ? (
                      <div className="w-4 h-4 border-2 border-blue-400 border-t-transparent rounded-full animate-spin" />
                    ) : (
                      <button
                        type="button"
                        className="flex items-center gap-1.5 text-blue-400 hover:text-blue-300 text-sm font-medium transition-colors focus:outline-none"
                      >
                        <FaCamera className="text-base" />
                        Choose Photo
                      </button>
                    ),
                  }}
                />
                <p className="text-slate-600 text-[10px]">JPG, PNG • Max 5MB</p>
              </div>
            </div>

            {/* Profile Form */}
            <form onSubmit={handleSaveProfile} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-slate-300 text-sm font-medium mb-2">
                    Full Name
                  </label>
                  <input
                    type="text"
                    name="fullName"
                    value={profileData.fullName}
                    onChange={handleProfileChange}
                    className="w-full px-4 py-3 bg-slate-800/50 border border-slate-700 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all hover:border-slate-600"
                    placeholder="Enter your full name"
                  />
                </div>

                <div>
                  <label className="block text-slate-300 text-sm font-medium mb-2">
                    Email
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={profileData.email}
                    onChange={handleProfileChange}
                    className="w-full px-4 py-3 bg-slate-800/50 border border-slate-700 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all hover:border-slate-600"
                    placeholder="Enter your email"
                  />
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex items-center gap-4 pt-4">
                <button
                  type="submit"
                  disabled={isSavingProfile}
                  className="flex items-center gap-2 px-6 py-3 bg-linear-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 disabled:from-slate-700 disabled:to-slate-700 text-white rounded-xl font-medium transition-all disabled:cursor-not-allowed shadow-lg hover:shadow-blue-500/25"
                >
                  <FaSave />
                  {isSavingProfile ? "Saving..." : "Save Changes"}
                </button>
                <button
                  type="button"
                  onClick={() =>
                    setProfileData({
                      fullName: user?.name || "",
                      email: user?.email || "",
                    })
                  }
                  className="px-6 py-3 text-slate-400 hover:text-white transition-colors rounded-xl hover:bg-slate-800/50"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>

          {/* Change Password Section */}
          <div className="bg-slate-900/50 border border-slate-800 rounded-2xl p-6 mb-6 backdrop-blur-sm">
            <h2 className="text-xl font-semibold text-white mb-6 flex items-center gap-2">
              <FaLock className="text-blue-400" />
              Change Password
            </h2>

            <form onSubmit={handleSavePassword} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Current Password */}
                <div>
                  <label className="block text-slate-300 text-sm font-medium mb-2">
                    Current Password
                  </label>
                  <div className="relative">
                    <input
                      type={showCurrentPassword ? "text" : "password"}
                      name="currentPassword"
                      value={passwordData.currentPassword}
                      onChange={handlePasswordChange}
                      className="w-full px-4 py-3 pr-10 bg-slate-800/50 border border-slate-700 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all hover:border-slate-600"
                      placeholder="Enter current password"
                    />
                    <button
                      type="button"
                      onClick={() =>
                        setShowCurrentPassword(!showCurrentPassword)
                      }
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-white transition-colors p-1 rounded hover:bg-slate-700/50"
                      aria-label={
                        showCurrentPassword ? "Hide password" : "Show password"
                      }
                    >
                      {showCurrentPassword ? <FaEyeSlash /> : <FaEye />}
                    </button>
                  </div>
                </div>

                {/* New Password */}
                <div>
                  <label className="block text-slate-300 text-sm font-medium mb-2">
                    New Password
                  </label>
                  <div className="relative">
                    <input
                      type={showNewPassword ? "text" : "password"}
                      name="newPassword"
                      value={passwordData.newPassword}
                      onChange={handlePasswordChange}
                      className="w-full px-4 py-3 pr-10 bg-slate-800/50 border border-slate-700 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all hover:border-slate-600"
                      placeholder="Enter new password"
                    />
                    <button
                      type="button"
                      onClick={() => setShowNewPassword(!showNewPassword)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-white transition-colors p-1 rounded hover:bg-slate-700/50"
                      aria-label={
                        showNewPassword ? "Hide password" : "Show password"
                      }
                    >
                      {showNewPassword ? <FaEyeSlash /> : <FaEye />}
                    </button>
                  </div>
                  <p className="text-slate-500 text-xs mt-1 ml-1">
                    Must be at least 6 characters
                  </p>
                </div>
              </div>

              {/* Confirm Password */}
              <div>
                <label className="block text-slate-300 text-sm font-medium mb-2">
                  Confirm New Password
                </label>
                <div className="relative">
                  <input
                    type={showConfirmPassword ? "text" : "password"}
                    name="confirmPassword"
                    value={passwordData.confirmPassword}
                    onChange={handlePasswordChange}
                    className="w-full px-4 py-3 pr-10 bg-slate-800/50 border border-slate-700 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all hover:border-slate-600"
                    placeholder="Confirm new password"
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-white transition-colors p-1 rounded hover:bg-slate-700/50"
                    aria-label={
                      showConfirmPassword ? "Hide password" : "Show password"
                    }
                  >
                    {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
                  </button>
                </div>
              </div>

              {/* Password Strength Indicator */}
              {passwordData.newPassword && (
                <div className="space-y-2">
                  <div className="flex items-center gap-3">
                    <span className="text-slate-400 text-xs font-medium">
                      Strength:
                    </span>
                    <div className="flex-1 h-2 bg-slate-800 rounded-full overflow-hidden">
                      <div
                        className={`h-full transition-all duration-300 ${getPasswordStrength(passwordData.newPassword).color} ${getPasswordStrength(passwordData.newPassword).width}`}
                      />
                    </div>
                    <span
                      className={`text-xs font-medium ${
                        passwordData.newPassword.length < 6
                          ? "text-red-400"
                          : passwordData.newPassword.length < 10
                            ? "text-yellow-400"
                            : "text-green-400"
                      }`}
                    >
                      {getPasswordStrength(passwordData.newPassword).label}
                    </span>
                  </div>
                </div>
              )}

              {/* Action Buttons */}
              <div className="flex items-center gap-4 pt-4">
                <button
                  type="submit"
                  disabled={isSavingPassword}
                  className="flex items-center gap-2 px-6 py-3 bg-linear-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 disabled:from-slate-700 disabled:to-slate-700 text-white rounded-xl font-medium transition-all disabled:cursor-not-allowed shadow-lg hover:shadow-blue-500/25"
                >
                  {isSavingPassword ? (
                    <>
                      <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                      Updating...
                    </>
                  ) : (
                    <>
                      <FaLock />
                      Update Password
                    </>
                  )}
                </button>
                <button
                  type="button"
                  onClick={() =>
                    setPasswordData({
                      currentPassword: "",
                      newPassword: "",
                      confirmPassword: "",
                    })
                  }
                  className="px-6 py-3 text-slate-400 hover:text-white transition-colors rounded-xl hover:bg-slate-800/50"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>

          {/* Additional Settings */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Notifications */}
            <div className="bg-slate-900/50 border border-slate-800 rounded-2xl p-6 backdrop-blur-sm">
              <h3 className="text-lg font-semibold text-white mb-4">
                Notifications
              </h3>
              <div className="space-y-4">
                {[
                  { label: "Email Notifications", defaultChecked: true },
                  { label: "Push Notifications", defaultChecked: false },
                ].map((item) => (
                  <label
                    key={item.label}
                    className="flex items-center justify-between cursor-pointer group"
                  >
                    <span className="text-slate-300 group-hover:text-white transition-colors">
                      {item.label}
                    </span>
                    <div className="relative">
                      <input
                        type="checkbox"
                        defaultChecked={item.defaultChecked}
                        className="sr-only peer"
                      />
                      <div className="w-11 h-6 bg-slate-700 peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-blue-500/20 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-0.5 after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                    </div>
                  </label>
                ))}
              </div>
            </div>

            {/* Privacy */}
            <div className="bg-slate-900/50 border border-slate-800 rounded-2xl p-6 backdrop-blur-sm">
              <h3 className="text-lg font-semibold text-white mb-4">Privacy</h3>
              <div className="space-y-4">
                {[
                  { label: "Public Profile", defaultChecked: true },
                  { label: "Show Email", defaultChecked: false },
                ].map((item) => (
                  <label
                    key={item.label}
                    className="flex items-center justify-between cursor-pointer group"
                  >
                    <span className="text-slate-300 group-hover:text-white transition-colors">
                      {item.label}
                    </span>
                    <div className="relative">
                      <input
                        type="checkbox"
                        defaultChecked={item.defaultChecked}
                        className="sr-only peer"
                      />
                      <div className="w-11 h-6 bg-slate-700 peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-blue-500/20 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-0.5 after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                    </div>
                  </label>
                ))}
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Settings;
