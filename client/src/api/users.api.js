import api from "./api";

export async function searchUsers(query) {
  const res = await api.get("/api/auth/users/search", {
    params: { query: query.trim() },
  });
  return res.data;
}
