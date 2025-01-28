import Cors from 'cors';
import connectToDatabase from "../../../lib/mongodb";
import Job from "../../../models/Job";


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
  // Run the CORS middleware before the actual handler logic
  await runMiddleware(req, res, cors);

  if (req.method === 'GET') {
    try {
      await connectToDatabase();
      const jobs = await Job.find();
      return res.status(200).json(jobs);
    } catch (error) {
      return res.status(500).json({ message: 'Failed to fetch jobs', error: error.message });
    }
  } else if (req.method === 'POST') {
    try {
      await connectToDatabase();
      const job = new Job(req.body);
      await job.save();
      return res.status(201).json(job);
    } catch (error) {
      return res.status(500).json({ message: 'Failed to create job post', error: error.message });
    }
  } else {
    return res.status(405).json({ message: 'Method Not Allowed' });
  }
}
