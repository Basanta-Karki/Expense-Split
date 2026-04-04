import express from "express";
import { createGroup, getGroups } from "../controllers/groupController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/createGroup", protect, createGroup);
router.get("/myGroups", protect, getGroups);

export default router;
