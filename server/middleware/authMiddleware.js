import jwt from "jsonwebtoken";
import User from "../models/User";

export const protect = async (req, res, next) => {
  let token;

  // 1️⃣ Check for token (Header or Cookie)
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    try {
      token = req.headers.authorization.split(" ")[1];

      // 2️⃣ Verify token
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      // 3️⃣ Attach user info (without password) to request
      req.user = await User.findById(decoded.id).select("-password");

      next(); // Continue to controller
    } catch (error) {
      console.error("Token verification failed:", error.message);
      return res.status(401).json({ message: "Not authorized, token invalid" });
    }
  }

  if (!token) {
    return res.status(401).json({ message: "Not authorized, no token provided" });
  }
};