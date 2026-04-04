import express from "express";
import { searchUsers } from "../controllers/userController.js";

const router = express.Router();

// Search users by email or name
router.get("/search", searchUsers);

export default router;
