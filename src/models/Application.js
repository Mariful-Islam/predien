import mongoose from "mongoose";

// Define the schema
const ApplicationSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  slug: {
    type: String,
    required: true,
    unique: true,
  },
  email: {
    type: String,
    required: true,
  },
  phone: {
    type: String,
    required: true,
  },
  address: {
    type: String,
    required: true,
  },
  department: {
    type: String,
    required: true,
  },
  university: {
    type: String,
    required: true,
  },
  cover_letter: {
    type: String,
    required: true,
  },

  post_date: {
    type: Date,
    default: Date.now,
  },
});


const Application = mongoose.models.Application || mongoose.model('Application', ApplicationSchema);

module.exports = Application;
