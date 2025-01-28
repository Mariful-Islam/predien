import connectToDatabase from "../../../lib/mongodb";
import Blog from "../../../models/Blog";

export default async function handler(req, res) {
    if (req.method === 'GET') {
      try {
        await connectToDatabase();
        const blogs = await Blog.find();
        return res.status(200).json(blogs);
      } catch (error) {
        return res.status(500).json({ message: 'Failed to fetch blogs', error: error.message });
      }
    } else if (req.method === 'POST') {
      try {
        await connectToDatabase();
        const blog = new Blog(req.body);
        await blog.save();
        return res.status(201).json(blog);
      } catch (error) {
        return res.status(500).json({ message: 'Failed to create blog post', error: error.message });
      }
    } else {
      return res.status(405).json({ message: 'Method Not Allowed' });
    }
  }
  