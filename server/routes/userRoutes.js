import express from "express";
import { searchUsers } from "../controllers/userController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

// Search users by email or name
router.get("/search", protect, searchUsers);

export default router;
