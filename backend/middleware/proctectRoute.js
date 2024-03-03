import jwt from "jsonwebtoken";
import User from "../models/userModel.js";

const proctectRoute = async (req, res, next) => {
  try {
    const token = req.cookies.jwt;
    if (!token) {
      return res.status(401).json({ error: "No Token Provided." });
    }
    const decode = jwt.verify(token, process.env.JWT_SECRET);
    if (!decode) {
      return res.status(401).json({ error: "Invalid Token." });
    }
    const user = await User.findById(decode.userId).select("-password");
    if (!user) {
      return res.status(401).json({ error: "User not found." });
    }
    req.user = user;
    next();
  } catch (error) {
    console.log("Error in Protect Route Middleware: ", error.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
export default proctectRoute;
