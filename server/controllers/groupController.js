import Group from "../models/Group.js";

// Create group
export const createGroup = async (req, res) => {
  try {
    const { name, members } = req.body;

    const group = await Group.create({
      name,
      members: [...members, req.userId], // include creator
      createdBy: req.userId,
    });

    res.json({ success: true, group });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get all groups of user
export const getGroups = async (req, res) => {
  try {
    const groups = await Group.find({
      members: req.userId,
    }).populate("members", "name email");

    res.json({ success: true, groups });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
