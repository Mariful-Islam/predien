import connectToDatabase from "../../../lib/mongodb";
import Product from '../../../models/Product'

export default async function handler(req, res) {
    const {slug} = req.query
    if (req.method === 'GET') {
      try {
        await connectToDatabase();
        const products = await Product.findOne({slug: slug});

        return res.status(200).json(products);
      } catch (error) {
        return res.status(500).json({ message: 'Failed to fetch projects', error: error.message });
      }
    } else if (req.method === 'PUT') {
      try {
        await connectToDatabase();
        const updatedProduct = await Product.findOneAndUpdate(
          { slug: slug },
          { $set: req.body },  // Update the fields with the new data from the request body
          { new: true } // Return the updated document
        );
  
        if (!updatedProduct) {
          return res.status(404).json({ message: 'Project not found' });
        }
  
        return res.status(200).json(updatedProduct);
      } catch (error) {
        return res.status(500).json({ message: 'Failed to update project', error: error.message });
      }
    } else if (req.method === 'DELETE') {
      try {
        await connectToDatabase();
        const products = await Product.deleteOne({slug: slug});

        return res.status(200).json(products);
      } catch (error) {
        return res.status(500).json({ message: 'Failed to delte projects', error: error.message });
      }
    } else {
      return res.status(405).json({ message: 'Method Not Allowed' });
    }
  }
  