import express from "express";
import {
  addExpense,
  getExpensesByGroup,
} from "../controllers/expenseController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/addexpense", protect, addExpense);
router.get("/:groupId", protect, getExpensesByGroup);

export default router;
