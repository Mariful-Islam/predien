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
    
    // SEO fields
    meta: {
      title: String,
      description: String,
      keywords: String,
    }
  },
  {
    timestamps: true, // Automatically add `createdAt` and `updatedAt`
  }
);

const Keyword = mongoose.models.Keyword || mongoose.model("Keyword", keywordSchema);

export default Keyword;