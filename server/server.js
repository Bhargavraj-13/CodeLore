import express from "express";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import authRoute from "./routes/authRoutes.js";
import cookieParser from "cookie-parser";
import cors from "cors";

dotenv.config();
const app = express();

// Middleware
app.use(express.json());
app.use(cookieParser());
app.use(cors({
  origin: "http://localhost:5173",  
  credentials: true,                
}));

// Connect to MongoDB
connectDB();

// Basic route
app.get("/", (req, res) => {
  res.send("API is running...");
});

app.use("/api/auth", authRoute);


const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port http://localhost:${PORT}`));
 