import connectToDatabase from "../../../lib/mongodb";
import Review from "../../../models/Review";

export default async function handler(req, res) {
    if (req.method === 'GET') {
      try {
        await connectToDatabase();
        const reviews = await Review.find();
        return res.status(200).json(reviews);
      } catch (error) {
        return res.status(500).json({ message: 'Failed to fetch reviews', error: error.message });
      }
    } else if (req.method === 'POST') {
      try {
        await connectToDatabase();
        const review = new Review(req.body);
        await review.save();
        return res.status(201).json(review);
      } catch (error) {
        return res.status(500).json({ message: 'Failed to create review post', error: error.message });
      }
    } else {
      return res.status(405).json({ message: 'Method Not Allowed' });
    }
  }
  