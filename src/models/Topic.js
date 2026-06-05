import mongoose from "mongoose";

const topicSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true,
    },
    slug: {
      type: String,
      required: true,
      unique: true,
    },
    // Self-reference to create a hierarchy
    parent: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Topic',
      default: null, // Top-level topics have no parent
    },

    meta: {
      title: String,
      description: String,
      keywords: String,
    }
  },
  {
    timestamps: true,
  }
);

const Topic = mongoose.models.Topic || mongoose.model("Topic", topicSchema);

export default Topic;