import connectToDatabase from "../../../lib/mongodb";
import Keyword from "../../../models/Keyword";

export default async function handler(req, res) {
    
    const {slug} = req.query
    if (req.method === 'GET') {
      try {
        await connectToDatabase();
        const keywords = await Keyword.findOne({slug: slug});

        return res.status(200).json(keywords);
      } catch (error) {
        return res.status(500).json({ message: 'Failed to fetch blogs', error: error.message });
      }
    } else if (req.method === 'PUT') {
      try {
        await connectToDatabase();
        const updatedKeyword = await Keyword.findOneAndUpdate(
          { slug: slug },
          { $set: req.body },  // Update the fields with the new data from the request body
          { new: true } // Return the updated document
        );
  
        if (!updatedKeyword) {
          return res.status(404).json({ message: 'Keyword not found' });
        }
  
        return res.status(200).json(updatedKeyword);
      } catch (error) {
        return res.status(500).json({ message: 'Failed to update Keyword', error: error.message });

      }} else if (req.method === 'DELETE') {
      try {
        await connectToDatabase();
        const keywords = await Keyword.deleteOne({slug: slug});

        return res.status(200).json(keywords);
      } catch (error) {
        return res.status(500).json({ message: 'Failed to delete Keyword', error: error.message });
      }
    } else {
      return res.status(405).json({ message: 'Method Not Allowed' });
    }
  }

  




// Do the same things for keyword
