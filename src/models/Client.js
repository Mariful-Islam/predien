import mongoose from "mongoose";

// Define the schema for the review
const reviewSchema = new mongoose.Schema(
  {
    clientName: {
      type: String,
      required: true,
    },
    clientImage: {
      type: String, // This will store the URL or file path to the image
      required: true,
    },
    review: {
      type: String,
      required: true,
    },
    star: {
      type: Number,
      required: true,
      min: 1, // Minimum rating of 1
      max: 5, // Maximum rating of 5
    },
    imageUrl: {
      type: String, // URL for the uploaded image
      required: true,
    },
    filename: {
      type: String,
      required: true,
    },
    mimetype: {
      type: String,
      required: true,
    },
    size: {
      type: Number,
      required: true,
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
  },
  {
    timestamps: true, // Automatically add `createdAt` and `updatedAt`
  }
);

// Create and export the Review model
const Review = mongoose.models.Review || mongoose.model("Review", reviewSchema);

export default Review;
