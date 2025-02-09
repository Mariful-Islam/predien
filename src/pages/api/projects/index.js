import connectToDatabase from "../../../lib/mongodb";
import Project from "../../../models/Project"

export default async function handler(req, res) {
    if (req.method === 'GET') {
      try {
        await connectToDatabase();
        const {type} = req.query
        if(type){
          const projects = await Project.find({type}).select('-description');
          return res.status(200).json(projects);
        }else{
          const projects = await Project.find().select('-description');
          return res.status(200).json(projects);
        }
        
      } catch (error) {
        return res.status(500).json({ message: 'Failed to fetch projects', error: error.message });
      }
    } else if (req.method === 'POST') {
      try {
        await connectToDatabase();
        const project = new Project(req.body);
        await project.save();
        return res.status(201).json(project);
      } catch (error) {
        return res.status(500).json({ message: 'Failed to create project', error: error.message });
      }
    } else {
      return res.status(405).json({ message: 'Method Not Allowed' });
    }
  }
  