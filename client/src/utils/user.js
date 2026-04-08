/** Login/API may return Mongo id as `_id` or `id`. */
export function getUserId(user) {
  if (!user || typeof user !== "object") return "";
  return user._id ?? user.id ?? "";
}
