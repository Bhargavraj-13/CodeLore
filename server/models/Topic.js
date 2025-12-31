import mongoose from "mongoose";

const topicSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },

    description: {
      type: String,
      required: true,
      trim: true,
    },

    difficulty: {
      type: String,
      enum: ["Beginner", "Intermediate", "Advanced"],
      required: true,
    },

    contentKey: {
      type: String,
      required: true,
      unique: true,
    },

    thumbnail: {
      type: String,
      default: ""
    }
  },
  { timestamps: true }
);

export default mongoose.model("Topic", topicSchema);
