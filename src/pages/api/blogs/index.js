import connectToDatabase from "../../../lib/mongodb";
import Blog from "../../../models/Blog";
import Cors from 'cors';

const URL = process.env.NODE_ENV === "production" ? "https://predien.vercel.app" : "http://localhost:3000"

// Initialize CORS middleware
const cors = Cors({
  methods: ['GET', 'POST'],  // Allow only GET and POST methods
  origin: URL,               // Allow all origins (use specific origins in production)
});

// Helper function to run the CORS middleware
function runMiddleware(req, res, fn) {
  return new Promise((resolve, reject) => {
    fn(req, res, (result) => {
      if (result instanceof Error) {
        return reject(result);
      }
      return resolve(result);
    });
  });
}

export default async function handler(req, res) {
  await runMiddleware(req, res, cors);
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
  