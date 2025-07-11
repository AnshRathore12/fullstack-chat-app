import jwt from "jsonwebtoken"
import User from "../models/user.model.js"
import mongoose from "mongoose"
export const protectRoute = async (req, res, next) => {
  try {
    // Check if MongoDB is connected before proceeding
    if (mongoose.connection.readyState !== 1) {
      return res.status(503).json({ message: "Service Unavailable - Database not connected" });
    }

    const token = req.cookies.jwt;
    if (!token) {
      return res.status(401).json({ message: "Unauthorized - No Token Provided" });
    }
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    if (!decoded) {
      return res.status(401).json({ message: "Unauthorized - Invalid Token" });
    }
    const user = await User.findById(decoded.userId).select("-password");

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    req.user = user;
    next();
  } catch (error) {
    console.log("Error in protected middleware: ", error.message);
    res.status(500).json({ message: "Internal Server Error" });
  }
}; 
