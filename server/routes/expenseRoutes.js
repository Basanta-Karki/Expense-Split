import express from "express";
import {
  addExpense,
  getExpenseById,
  getExpensesByGroup,
} from "../controllers/expenseController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/addexpense", protect, addExpense);
// Must be before /:groupId so "expense" is not parsed as a groupId
router.get("/expense/:expenseId", protect, getExpenseById);
router.get("/:groupId", protect, getExpensesByGroup);

export default router;
