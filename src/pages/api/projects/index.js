import connectToDatabase from "../../../lib/mongodb";
import Project from "../../../models/Project"

export default async function handler(req, res) {
    if (req.method === 'GET') {
      try {
        await connectToDatabase();
        const projects = await Project.find();
        return res.status(200).json(projects);
      } catch (error) {
        return res.status(500).json({ message: 'Failed to fetch blogs', error: error.message });
      }
    } else if (req.method === 'POST') {
      try {
        await connectToDatabase();
        const project = new Project(req.body);
        await project.save();
        return res.status(201).json(job);
      } catch (error) {
        return res.status(500).json({ message: 'Failed to create blog post', error: error.message });
      }
    } else {
      return res.status(405).json({ message: 'Method Not Allowed' });
    }
  }
  