import mongoose from 'mongoose';

const BlogSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Title is required'],
  },
  slug: {
    type: String,
    required: [true, 'Slug is required'],
  },

  description: {
    type: String,
    required: [true, 'Description is required'],
  },

  meta: {
    title: String,
    description: String,
    keywords: String,
  },


  date: {
    type: Date,
    default: Date.now,
  },

  category: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Category',
    required: [false, 'Category is required'],
  },

  // topic
  topic: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Topic',
    required: [false, 'Topic is required'],
  },

  // keywords
  keywords: {
    type: [{
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Keyword'
    }],
    required: [false, 'Keywords are required'],
  },

  // image
  image: {
    type: String,
    required: [false, 'Image URL is required'],
  },

});

const Blog = mongoose.models.Blog || mongoose.model('Blog', BlogSchema);

export default Blog;
