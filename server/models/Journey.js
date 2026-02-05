import mongoose from "mongoose";

const journeySchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      index: true,
    },

    topic: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Topic",
      required: true,
      index: true,
    },

    content: {
      type: String,
      required: true,
      minlength: [50, "Journey must be at least 50 characters"],
      maxlength: [2000, "Journey cannot exceed 2000 characters"],
      trim: true,
    },

    /* future-safe fields (NOT used now)
    upvotes: {
      type: Number,
      default: 0,
    },
    */

    isEdited: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("Journey", journeySchema);