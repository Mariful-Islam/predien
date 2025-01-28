import mongoose from "mongoose";

// Define the schema
const JobSchema = new mongoose.Schema({
  job_title: {
    type: String,
    required: true,
  },
  slug: {
    type: String,
    required: true,
    unique: true,
  },
  description: {
    type: String,
    required: true,
  },
  salary_range: {
    type: String,
    required: true,
  },
  vacancy: {
    type: Number,
    required: true,
  },

  duration: {
    type: String,
    required: true,
  },

  location: {
    type: String,
    required: true,
  },

  post_date: {
    type: Date,
    default: Date.now,
  },
});

// Create the model
const Job = mongoose.models.Job || mongoose.model('Job', JobSchema);

module.exports = Job;
