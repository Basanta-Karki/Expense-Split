import mongoose from "mongoose";

const splitSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  amount: Number,
});

const expenseSchema = new mongoose.Schema(
  {
    title: String,

    amount: {
      type: Number,
      required: true,
    },

    group: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Group",
    },

    paidBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },

    participants: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
    ],

    splits: [splitSchema], // who owes how much

    category: String,
  },
  { timestamps: true },
);

export default mongoose.model("Expense", expenseSchema);
