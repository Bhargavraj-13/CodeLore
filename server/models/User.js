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

    topics: [
      {
        topicId: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Topic",
          required: true,
        },

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

        completed: {
          type: Boolean,
          default: false,
        },

        lastAccessedAt: {
          type: Date,
          default: Date.now,
        },
      },
    ],

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
