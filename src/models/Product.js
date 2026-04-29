import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
  name: String,
  slug: String,
  description: String,

  // SEO fields
  seoTitle: {
    type: String,
    required: false,
  },

  seoDescription: {
    type: String,
    required: false,
  },
});

const Project =
  mongoose.models.Product || mongoose.model("Product", productSchema);

// module.exports = Project
export default Project;
