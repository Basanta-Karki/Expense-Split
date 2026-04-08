import { useQuery } from "@tanstack/react-query";
import { addExpense, getExpenseById, getExpensesByGroup } from "../../api/expenses.api";
import { useCreateApi } from "../api/useCreateApi";

export function expensesKeys() {
  return {
    byGroup: (groupId) => ["expenses", groupId],
    detail: (expenseId) => ["expenses", "detail", expenseId],
  };
}

export function useExpensesByGroupQuery(groupId) {
  return useQuery({
    queryKey: expensesKeys().byGroup(groupId),
    queryFn: () => getExpensesByGroup(groupId),
    enabled: Boolean(groupId),
  });
}

export function useCreateExpenseApi(groupId) {
  return useCreateApi({
    mutationFn: addExpense,
    invalidateQueryKeys: groupId ? [expensesKeys().byGroup(groupId)] : [],
  });
}

export function useExpenseByIdQuery(expenseId, options = {}) {
  const { enabled = true, ...rest } = options;
  return useQuery({
    queryKey: expensesKeys().detail(expenseId),
    queryFn: () => getExpenseById(expenseId),
    enabled: Boolean(expenseId) && enabled,
    ...rest,
  });
}

