import connectToDatabase from "../../../lib/mongodb";
import Product from '../../../models/Product'

export default async function handler(req, res) {
    if (req.method === 'GET') {
      try {
        await connectToDatabase();
        const {type} = req.query
        if(type){
          const products = await Product.find({type}).select('-description');
          return res.status(200).json(products);
        }else{
          const projects = await Product.find().select('-description');
          return res.status(200).json(projects);
        }
        
      } catch (error) {
        return res.status(500).json({ message: 'Failed to fetch products', error: error.message });
      }
    } else if (req.method === 'POST') {
      try {
        await connectToDatabase();
        const product = new Product(req.body);
        await product.save();
        return res.status(201).json(product);
      } catch (error) {
        return res.status(500).json({ message: 'Failed to create product', error: error.message });
      }
    } else {
      return res.status(405).json({ message: 'Method Not Allowed' });
    }
  }
  