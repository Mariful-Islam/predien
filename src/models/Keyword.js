// create keyword model
import mongoose from "mongoose";

const keywordSchema = new mongoose.Schema(
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
  },
  {
    timestamps: true, // Automatically add `createdAt` and `updatedAt`
  }
);

const Keyword = mongoose.models.Keyword || mongoose.model("Keyword", keywordSchema);

export default Keyword;