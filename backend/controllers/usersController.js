import User from "../models/userModel.js";

export const getUsersController = async (req, res) => {
  try {
    const loggedInUserId = req.user._id;

    // if logged in user is not to be shown in the sidebar then use this instead "User.find({_id:{$ne:loggedInUserId}})"
    const filteredUsers = await User.find({
      _id: { $ne: loggedInUserId },
    }).select("-password");
    res.status(200).json(filteredUsers);
  } catch (error) {
    console.error("Error in get users controller: ", error.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
