import { useMutation, useQueryClient } from "@tanstack/react-query";

/**
 * Small wrapper around useMutation to keep "create" mutations consistent.
 * - Central place for invalidation
 * - Central place to plug common side-effects later (toasts, logging, etc.)
 */
export function useCreateApi({ mutationFn, invalidateQueryKeys = [], onSuccess }) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn,
    onSuccess: async (data, variables, context) => {
      await Promise.all(
        invalidateQueryKeys.map((queryKey) =>
          queryClient.invalidateQueries({ queryKey }),
        ),
      );
      onSuccess?.(data, variables, context);
    },
  });
}

