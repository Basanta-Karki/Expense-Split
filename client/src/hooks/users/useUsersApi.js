import { useQuery } from "@tanstack/react-query";
import { searchUsers } from "../../api/users.api";

export function userKeys() {
  return {
    search: (q) => ["users", "search", q],
  };
}

export function useSearchUsersQuery(query) {
  const q = (query || "").trim();
  return useQuery({
    queryKey: userKeys().search(q),
    queryFn: () => searchUsers(q),
    enabled: q.length >= 2,
    staleTime: 30_000,
  });
}
