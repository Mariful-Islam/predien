import connectToDatabase from "../../../lib/mongodb";
import Project from "../../../models/Project"

export default async function handler(req, res) {
    
    const {slug} = req.query
    if (req.method === 'GET') {
      try {
        await connectToDatabase();
        const projects = await Project.findOne({slug: slug});

        return res.status(200).json(projects);
      } catch (error) {
        return res.status(500).json({ message: 'Failed to fetch projects', error: error.message });
      }
    } else if (req.method === 'DELETE') {
      try {
        await connectToDatabase();
        const projects = await Project.deleteOne({slug: slug});

        return res.status(200).json(projects);
      } catch (error) {
        return res.status(500).json({ message: 'Failed to delte projects', error: error.message });
      }
    } else {
      return res.status(405).json({ message: 'Method Not Allowed' });
    }
  }
  