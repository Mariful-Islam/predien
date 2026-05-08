import connectToDatabase from "../../../lib/mongodb";
import Topic from "../../../models/Topic";

export default async function handler(req, res) {
    
    const {slug} = req.query
    if (req.method === 'GET') {
      try {
        await connectToDatabase();
        const topic = await Topic.findOne({slug: slug});

        return res.status(200).json(topic);
      } catch (error) {
        return res.status(500).json({ message: 'Failed to fetch topic', error: error.message });
      }
    } else if (req.method === 'PUT') {
      try {
        await connectToDatabase();
        const updatedTopic = await Topic.findOneAndUpdate(
          { slug: slug },
          { $set: req.body },  // Update the fields with the new data from the request body
          { new: true } // Return the updated document
        );
  
        if (!updatedTopic) {
          return res.status(404).json({ message: 'Topic not found' });
        }
  
        return res.status(200).json(updatedTopic);
      } catch (error) {
        return res.status(500).json({ message: 'Failed to update topic', error: error.message });
      }
    } else if (req.method === 'DELETE') {
      try {
        await connectToDatabase();
        const result = await Topic.deleteOne({slug: slug});

        return res.status(200).json(result);
      } catch (error) {
        return res.status(500).json({ message: 'Failed to delete topic', error: error.message });
      }
    } else {
      return res.status(405).json({ message: 'Method Not Allowed' });
    }
  }

  