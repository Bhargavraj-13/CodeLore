import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      trim: true,
      unique: true,
      minlength: 3,
    },

    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      match: /\S+@\S+\.\S+/,
    },

    password: {
      type: String,
      required: true,
      minlength: 6,
      select: false,
    },

    // ✅ MULTIPLE TOPICS
    topics: [
      {
        topicId: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Topic",
          required: true,
        },
        progress: {
          type: Number,
          default: 0,
        },
        completed: {
          type: Boolean,
          default: false,
        },
      },
    ],

    quizScore: {
      type: Number,
      default: null,
    },

    codingSolvedCount: {
      type: Number,
      default: 0,
    },

    solvedProblems: {
      type: [String],
      default: [],
    },

    lastAccessedAt: {
      type: Date,
      default: Date.now,
    },

    profilePic: {
      type: String,
      default: null,
    },

    role: {
      type: String,
      enum: ["user", "admin"],
      default: "user",
    },
  },
  { timestamps: true }
);

export default mongoose.model("User", userSchema);
