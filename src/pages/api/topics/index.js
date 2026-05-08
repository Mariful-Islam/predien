import connectToDatabase from "../../../lib/mongodb";
import Topic from "../../../models/Topic";

export default async function handler(req, res) {
    if (req.method === 'GET') {
      try {
        await connectToDatabase();
        const topics = await Topic.find();
        return res.status(200).json(topics);
      } catch (error) {
        return res.status(500).json({ message: 'Failed to fetch topics', error: error.message });
      }
    } else if (req.method === 'POST') {
      try {
        await connectToDatabase();
        const topic = new Topic(req.body);
        await topic.save();
        return res.status(201).json(topic);
      } catch (error) {
        return res.status(500).json({ message: 'Failed to create blog topic', error: error.message });
      }
    } else {
      return res.status(405).json({ message: 'Method Not Allowed' });
    }
  }
  