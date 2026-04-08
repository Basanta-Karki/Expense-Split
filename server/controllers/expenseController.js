import mongoose from "mongoose";
import Expense from "../models/Expense.js";
import Group from "../models/Group.js";
import { calculateEqualSplit } from "../utils/split.js";

// Helper: Validate ObjectId
const validateObjectId = (id, name = "ID") => {
  if (!mongoose.Types.ObjectId.isValid(id)) {
    throw new Error(`Invalid ${name}: ${id}`);
  }
  return new mongoose.Types.ObjectId(id);
};

// Add expense
export const addExpense = async (req, res) => {
  try {
    const { title, amount, groupId, participants, paidBy, category } = req.body;

    // Basic validation
    if (!title || !amount || !groupId || !participants || !paidBy) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    // Validate IDs
    const groupObjectId = validateObjectId(groupId, "groupId");
    const paidById = validateObjectId(paidBy, "paidBy");

    if (!Array.isArray(participants) || participants.length === 0) {
      return res
        .status(400)
        .json({ message: "Participants must be a non-empty array" });
    }

    const participantIds = participants.map((id, index) =>
      validateObjectId(id, `participants[${index}]`),
    );

    // Calculate splits
    const splits = calculateEqualSplit(amount, participantIds, paidById);

    // Create expense
    const expense = await Expense.create({
      title,
      amount,
      group: groupObjectId,
      paidBy: paidById,
      participants: participantIds,
      splits,
      category,
    });

    res.json({ success: true, expense });
  } catch (error) {
    console.error("Add expense error:", error);
    res.status(500).json({ message: error.message });
  }
};

// Get single expense by id (must be a member of the expense's group)
export const getExpenseById = async (req, res) => {
  try {
    const { expenseId } = req.params;
    validateObjectId(expenseId, "expenseId");

    const expense = await Expense.findById(expenseId)
      .populate("paidBy", "name email")
      .populate("participants", "name email")
      .populate("splits.user", "name email");

    if (!expense) {
      return res.status(404).json({ message: "Expense not found" });
    }

    const group = await Group.findById(expense.group);
    if (!group) {
      return res.status(404).json({ message: "Group not found" });
    }

    const uid = req.userId.toString();
    const isMember = group.members.some((m) => m.toString() === uid);
    if (!isMember) {
      return res.status(403).json({ message: "Not authorized to view this expense" });
    }

    res.json({ success: true, expense });
  } catch (error) {
    console.error("Get expense by id error:", error);
    res.status(500).json({ message: error.message });
  }
};

// Get expenses by group
export const getExpensesByGroup = async (req, res) => {
  try {
    const { groupId } = req.params;

    // Validate groupId
    const groupObjectId = validateObjectId(groupId, "groupId");

    const expenses = await Expense.find({ group: groupObjectId })
      .populate("paidBy", "name")
      .populate("participants", "name");

    res.json({ success: true, expenses });
  } catch (error) {
    console.error("Get expenses error:", error);
    res.status(500).json({ message: error.message });
  }
};
