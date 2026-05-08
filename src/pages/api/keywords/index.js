import connectToDatabase from "../../../lib/mongodb";
import Keyword from "../../../models/Keyword";

export default async function handler(req, res) {
    if (req.method === 'GET') {
      try {
        await connectToDatabase();
        const keywords = await Keyword.find();
        return res.status(200).json(keywords);
      } catch (error) {
        return res.status(500).json({ message: 'Failed to fetch keywords', error: error.message });
      }
    } else if (req.method === 'POST') {
      try {
        await connectToDatabase();
        const keyword = new Keyword(req.body);
        await keyword.save();
        return res.status(201).json(keyword);
      } catch (error) {
        return res.status(500).json({ message: 'Failed to create blog keyword', error: error.message });
      }
    } else {
      return res.status(405).json({ message: 'Method Not Allowed' });
    }
  }
  