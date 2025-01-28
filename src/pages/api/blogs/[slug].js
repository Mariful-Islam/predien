import connectToDatabase from "../../../lib/mongodb";
import Blog from "../../../models/Blog";
import Cors from 'cors';

const URL = process.env.NODE_ENV === "production" ? "https://predien.vercel.app" : "http://localhost:3000"

// Initialize CORS middleware
const cors = Cors({
  methods: ['GET', 'POST', 'DELETE'],  // Allow only GET and POST methods
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
    const {slug} = req.query
    if (req.method === 'GET') {
      try {
        await connectToDatabase();
        const blogs = await Blog.findOne({slug: slug});

        return res.status(200).json(blogs);
      } catch (error) {
        return res.status(500).json({ message: 'Failed to fetch blogs', error: error.message });
      }
    } else if (req.method === 'DELETE') {
      try {
        await connectToDatabase();
        const blogs = await Blog.deleteOne({slug: slug});

        return res.status(200).json(blogs);
      } catch (error) {
        return res.status(500).json({ message: 'Failed to delte blog', error: error.message });
      }
    } else {
      return res.status(405).json({ message: 'Method Not Allowed' });
    }
  }
  