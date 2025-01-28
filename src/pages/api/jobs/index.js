import connectToDatabase from "../../../lib/mongodb";
import Job from "../../../models/Job";

export default async function handler(req, res) {
    if (req.method === 'GET') {
      try {
        await connectToDatabase();
        const jobs = await Job.find();
        return res.status(200).json(jobs);
      } catch (error) {
        return res.status(500).json({ message: 'Failed to fetch blogs', error: error.message });
      }
    } else if (req.method === 'POST') {
      try {
        await connectToDatabase();
        const job = new Job(req.body);
        await job.save();
        return res.status(201).json(job);
      } catch (error) {
        return res.status(500).json({ message: 'Failed to create blog post', error: error.message });
      }
    } else {
      return res.status(405).json({ message: 'Method Not Allowed' });
    }
  }
  