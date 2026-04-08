import api from "./api";

export async function getMyGroups() {
  const res = await api.get("/api/auth/groups/myGroups");
  return res.data;
}

export async function createGroup(payload) {
  const res = await api.post("/api/auth/groups/createGroup", payload);
  return res.data;
}

