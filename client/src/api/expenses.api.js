import api from "./api";

export async function getExpensesByGroup(groupId) {
  const res = await api.get(`/api/auth/expenses/${groupId}`);
  return res.data;
}

export async function addExpense(payload) {
  const res = await api.post("/api/auth/expenses/addexpense", payload);
  return res.data;
}

export async function getExpenseById(expenseId) {
  const res = await api.get(`/api/auth/expenses/expense/${expenseId}`);
  return res.data;
}

