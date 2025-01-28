import connectToDatabase from "../../../lib/mongodb";
import Job from "../../../models/Job";

export default async function handler(req, res) {
    
    const {slug} = req.query
    if (req.method === 'GET') {
      try {
        await connectToDatabase();
        const jobs = await Job.findOne({slug: slug});

        return res.status(200).json(jobs);
      } catch (error) {
        return res.status(500).json({ message: 'Failed to fetch blogs', error: error.message });
      }
    } else if (req.method === 'DELETE') {
      try {
        await connectToDatabase();
        const jobs = await Job.deleteOne({slug: slug});

        return res.status(200).json(jobs);
      } catch (error) {
        return res.status(500).json({ message: 'Failed to delte blog', error: error.message });
      }
    } else {
      return res.status(405).json({ message: 'Method Not Allowed' });
    }
  }
  