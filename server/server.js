import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import cors from "cors";

import connectDB from "./config/db.js";
import { notFound, errorHandler } from "./middleware/errorMiddleware.js";

import authRoute from "./routes/authRoutes.js";
import topicRoute from "./routes/topicRoutes.js";
import topicContentRoutes from "./routes/topicContentRoutes.js";
import searchRoutes from "./routes/searchRoutes.js";
import userTopicRoutes from "./routes/userTopicRoutes.js";
import profileRoutes from "./routes/profileRoutes.js";
import quizProgressRoutes from "./routes/quizProgressRoutes.js";
import codingProgressRoutes from "./routes/codingProgressRoutes.js";
import journeyRoutes from "./routes/journeyRoutes.js";
import quizRoutes from "./routes/quizRoutes.js";
import codingRoutes from "./routes/codingRoutes.js";
import codingRunRoutes from "./routes/codingRunRoutes.js";
import codingSubmitRoutes from "./routes/codingSubmitRoutes.js";
import examResultRoutes from "./routes/examResultRoutes.js";

dotenv.config();

const app = express();

// -> Middleware 
app.use(express.json());
app.use(cookieParser());
app.use(cors({
  origin: process.env.CLIENT_URL || "http://localhost:5173",
  credentials: true,
}));

// -> Database
connectDB();

// -> Health check
app.get("/", (req, res) => res.send("CodeLore API is running."));

// -> Routes
app.use("/api/auth",            authRoute);
app.use("/api/topics",          topicRoute);
app.use("/api/topics",          topicContentRoutes);
app.use("/api/search",          searchRoutes);
app.use("/api/user-topics",     userTopicRoutes);
app.use("/api/profile",         profileRoutes);
app.use("/api/quiz-progress",   quizProgressRoutes);
app.use("/api/coding-progress", codingProgressRoutes);
app.use("/api/journey",         journeyRoutes);
app.use("/api/quiz",            quizRoutes);
app.use("/api/coding",          codingRoutes);
app.use("/api/coding",          codingRunRoutes);
app.use("/api/coding-submit",   codingSubmitRoutes);
app.use("/api/exam",            examResultRoutes);

// -> Error handling 
app.use(notFound);
app.use(errorHandler);

// -> Start
const PORT = process.env.PORT || 5000;
app.listen(PORT, () =>
  console.log(`CodeLore server running on http://localhost:${PORT}`)
);
