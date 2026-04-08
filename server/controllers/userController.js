import User from "../models/User.js";

export const searchUsers = async (req, res) => {
  try {
    const { query } = req.query;

    if (!query || query.trim().length < 2) {
      return res.json({ success: true, users: [] });
    }

    const users = await User.find({
      $and: [
        { _id: { $ne: req.userId } }, // exclude current user (set by protect middleware)
        {
          $or: [
            { email: { $regex: query, $options: "i" } },
            { name: { $regex: query, $options: "i" } },
          ],
        },
      ],
    })
      .select("_id name email profile")
      .limit(10);

    res.json({ success: true, users });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getUserByEmail = async (req, res) => {
  try {
    const user = await User.findOne({
      email: req.params.email,
    }).select("_id name email profile");

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.json({ success: true, user });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
