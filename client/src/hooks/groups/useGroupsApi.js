import { useQuery } from "@tanstack/react-query";
import { createGroup, getMyGroups } from "../../api/groups.api";
import { useCreateApi } from "../api/useCreateApi";

export function groupKeys() {
  return {
    my: () => ["groups", "my"],
  };
}

export function useMyGroupsQuery() {
  return useQuery({
    queryKey: groupKeys().my(),
    queryFn: getMyGroups,
  });
}

export function useCreateGroupApi() {
  return useCreateApi({
    mutationFn: createGroup,
    invalidateQueryKeys: [groupKeys().my()],
  });
}

