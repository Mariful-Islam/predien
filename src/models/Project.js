import mongoose from "mongoose";

// Define the schema
const ProjectSchema = new mongoose.Schema({
  project_name: {
    type: String,
    required: true,
  },
  slug: {
    type: String,
    required: true,
    unique: true,
  },
  brief:{
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  type: {
    type: String,
    required: true,
  },

  post_date: {
    type: Date,
    default: Date.now,
  },
});

// Create the model
const Project = mongoose.models.Project || mongoose.model('Project', ProjectSchema);

module.exports = Project;
