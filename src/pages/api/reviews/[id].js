import connectToDatabase from "../../../lib/mongodb";
import Review from "../../../models/Review";



export default async function handler(req, res) {
    const {id} = req.query

    console.log(id)
    if (req.method === 'GET') {
      try {
        await connectToDatabase();
        const reviews = await Review.findById(id);

        return res.status(200).json(reviews);
      } catch (error) {
        return res.status(500).json({ message: 'Failed to fetch reviews', error: error.message });
      }
    }else if (req.method === 'PUT') {
      try {
        await connectToDatabase();
        const updatedreview = await Review.findOneAndUpdate(
          { _id: id },
          { $set: req.body },  // Update the fields with the new data from the request body
          { new: true } // Return the updated document
        );
  
        if (!updatedreview) {
          return res.status(404).json({ message: 'review not found' });
        }
  
        return res.status(200).json(updatedreview);
      } catch (error) {
        return res.status(500).json({ message: 'Failed to update project', error: error.message });
      }
    } else if (req.method === 'DELETE') {
      try {
        await connectToDatabase();
        const reviews = await Review.deleteOne({_id: id});

        return res.status(200).json(reviews);
      } catch (error) {
        return res.status(500).json({ message: 'Failed to delte review', error: error.message });
      }
    } else {
      return res.status(405).json({ message: 'Method Not Allowed' });
    }
  }
  