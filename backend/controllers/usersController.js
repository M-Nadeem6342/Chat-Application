import User from "../models/userModel.js";

export const getUsersController = async (req, res) => {
  try {
    const loggedInUserId = req.user._id;

    // if logged in user is not to be shown in the sidebar then use this instead "User.find({_id:{$ne:loggedInUserId}})"
    const allUsers = await User.find().select("-password");
    res.status(200).json(allUsers);
  } catch (error) {
    console.error("Error in get users controller: ", error.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
