import jwt from "jsonwebtoken";
import User from "../models/User.js";

// Reuse your existing token generator (or define here)
const generateToken = (id) => {
  if (!process.env.JWT_SECRET) {
    throw new Error("JWT_SECRET is not defined");
  }
  return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: "7d" });
};

// ✅ Start Google OAuth (just triggers Passport)
export const googleAuth = (req, res, next) => {
  // This function is just for clarity; Passport handles the redirect
  next();
};

// ✅ Handle Google OAuth callback
export const googleCallback = async (req, res) => {
  try {
    const user = req.user; // Set by Passport after successful auth

    if (!user || !user._id) {
      return res.redirect(`${getFrontendUrl()}/login?error=auth_failed`);
    }

    // Generate JWT token
    const token = generateToken(user._id);

    // Set secure JWT cookie (matching your login() settings)
    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
      maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
      path: "/", // Ensure cookie is sent to all routes
    });

    // Redirect to frontend with success flag
    return res.redirect(`${getFrontendUrl()}/expense-tracker/dashboard`);
  } catch (error) {
    console.error("Google OAuth callback error:", error);
    return res.redirect(`${getFrontendUrl()}/login?error=server_error`);
  }
};

// ✅ Logout for OAuth users (clears JWT cookie)
export const oauthLogout = (req, res) => {
  res.clearCookie("token", {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
    path: "/",
  });

  // Return JSON for SPA frontend to handle navigation
  return res.json({
    success: true,
    message: "Logged out successfully",
  });
};

// ✅ Helper: Get frontend URL from env or default
const getFrontendUrl = () => {
  return (
    process.env.FRONTEND_URL ||
    (process.env.NODE_ENV === "production"
      ? "https://yourapp.com"
      : "http://localhost:5173")
  );
};
